import React, { useEffect, useState, useRef } from 'react'
import ProfilePic from '../images/profileBlank.png'
import { IoMdSearch } from 'react-icons/io'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BiMicrophone } from 'react-icons/bi'
import { MdAttachFile, MdDelete, MdOutlineClear } from 'react-icons/md'
import { BsEmojiSmile } from 'react-icons/bs'
import { makeRequest } from '../utils/apiCalls'
import MessageText from './MessageText'
import { FiStar } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { setRightView } from '../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifications } from '../redux/chatSlice'
import { setSingleLoad } from '../redux/messageSlice'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

// import io from 'socket.io-client'


// import ScrollableFeed from 'react-scrollable-feed'

const MessageSection = ({ user, socket }) => {
    const PF = REACT_APP_BACKEND_URL
    const dispatch = useDispatch()
    const { rightView, colorPallete } = useSelector(state => state.app)
    const { user: currentUser, chatId } = useSelector(state => state.user)
    const { messageLoad, singleLoad } = useSelector(state => state.message)
    const { chatObject } = useSelector(state => state.chat)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [labelAll, setLabelAll] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [msgLoad, setMsgLoad] = useState(false)
    // const [socket, setSocket] = useState(null)
    // const [socketConnected, setSocketConnected] = useState(false)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", bottom: 0 })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        socket.on('typing', ()=> message && setIsTyping(true))
        socket.on('stop typing', ()=>setIsTyping(false))
        socket.on('receive message', (newMessage) => {
            if (chatId !== newMessage.chat._id) {
                //send a notification to the user
                dispatch(setNotifications(newMessage))
            } else {
                setMessages([...messages, newMessage])
            }
        })
    })
    // console.log(notifications, 'alert')

    useEffect(() => {
        const getChatMessages = async () => {
            setMsgLoad(true)
            const res = await makeRequest.get(`/message/${chatId}`)
            socket.emit('join room', chatId)
            setMessages(res.data)
            setMsgLoad(false)
        }
        if (chatId) {
            getChatMessages()
        }
    }, [chatId, dispatch, messageLoad, socket])

    const submitMessage = async (e) => {
        e.preventDefault()
        try {
            const res = await makeRequest.post('/message', { chat: chatObject._id, content: message })
            setMessage('')
            setMessages([...messages, res.data])
            dispatch(setSingleLoad(!singleLoad))
            socket.emit('new message', res.data)
            socket.emit('stop typing', chatId)
        } catch (error) {
            console.log(error)
        }
    }


    const deleteMessage = async () => {
        try {

            const res = await makeRequest.post('/message/delete', { messages: selectedLabel })
            if (res.status === 200) {
                setMessages(messages => messages.filter(msg => !selectedLabel.includes(msg._id)))
                setLabelAll(false)
                toast.success('Message Deleted')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const groupName = () => {
        if (!chatObject?.isGroup) {
            return chatObject?.users.filter(user => user.username !== currentUser?.username)[0]?.username
        } else {
            return chatObject?.chatName
        }
    }

    const getPicture = ()=>{
        const result = chatObject?.users.filter(user=> user._id!==currentUser._id)[0].picture
        return result
    }
    console.log(getPicture())

    return (
        <>
            <div className="right-header" >
                <div className="right-header-details" style={{ cursor: 'pointer' }} onClick={() => dispatch(setRightView('profile'))}>
                    <img src={chatObject?.isGroup || !getPicture() ? ProfilePic : PF+ '/images/' + getPicture()} alt="" />
                    <div className="right-header-detail">
                        <span>{groupName()}</span>
                        <span>{isTyping ? 'typing' : ''}</span>
                    </div>
                </div>
                <div className="right-header-icons">
                    <IoMdSearch className='fa' />
                    <BiDotsVerticalRounded className='fa' />
                </div>
            </div>
            {/* <ScrollableFeed> */}
            <div className="right-container" style={{backgroundImage: colorPallete && `linear-gradient(to bottom, ${colorPallete},gray, url('images/background.jpg')`}} ref={messagesEndRef} >
                <p><i className="fa fa-lock" aria-hidden="true"></i>Messages are end-to-end encrypted. No one outside of this chat, not even whatsApp, can read or listen to them. Click to learn more.</p>
                {msgLoad ? <p>Loading...</p> : messages.map(msg => (
                    <MessageText
                        // ref={messagesEndRef}
                        key={msg._id}
                        msg={msg}
                        labelAll={labelAll}
                        setLabelAll={setLabelAll}
                        selectedLabel={selectedLabel}
                        setSelectedLabel={setSelectedLabel}
                        setMessages={setMessages}
                    />
                ))
                }
            </div>
            {!labelAll ?
                <div className="right-input-section" style={{ width: rightView !== null ? '46.4%' : '70%' }}>
                    <BsEmojiSmile className='fa' />
                    <MdAttachFile className='fa' style={{ transform: "rotate(45deg)" }} />
                    <form onSubmit={submitMessage} className="input-section">
                        <input value={message} onChange={e => {
                            socket.emit('typing', chatId)
                            setMessage(e.target.value)
                        }
                        } type="text" placeholder="Type a message" />
                        <span className="online"></span>
                    </form>
                    <BiMicrophone className='fa' />
                </div> :
                <div className='right-input-section label-details'>
                    <div className="left-label-details">
                        <MdOutlineClear className='icon' onClick={() => {
                            setLabelAll(false)
                            setSelectedLabel([])
                        }} />
                        <span>{selectedLabel.length} selected</span>
                    </div>
                    <div className="right-label-details">
                        <MdDelete onClick={deleteMessage} className='icon' />
                        <FiStar className='icon' />
                        <RiShareForwardLine className='icon' />
                    </div>
                </div>
            }
            {/* </ScrollableFeed> */}
        </>
    )
}

export default MessageSection