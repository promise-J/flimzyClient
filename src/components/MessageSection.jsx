import React, { useEffect, useState } from 'react'
import ProfilePic from '../images/profileBlank.png'
import { IoMdSearch } from 'react-icons/io'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BiMicrophone } from 'react-icons/bi'
import { MdAttachFile, MdCancel, MdDelete, MdOutlineClear } from 'react-icons/md'
import { BsEmojiSmile } from 'react-icons/bs'
import { makeRequest } from '../utils/apiCalls'
import { FiStar } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { setCallMode, setRightView } from '../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { setNotifications } from '../redux/chatSlice'
import { setRepliedMessage, setSingleLoad } from '../redux/messageSlice'
import { FaVideo } from 'react-icons/fa'
import EmojiPicker from './EmojiPicker'
import MessageBody from './MessageBody'
import MessageImgUpload from './MessageImgUpload'


// import io from 'socket.io-client'


// import ScrollableFeed from 'react-scrollable-feed'

const MessageSection = ({ user, socket, setNotifications, notifications }) => {
    const dispatch = useDispatch()
    const { rightView } = useSelector(state => state.app)
    const { user: currentUser, chatId } = useSelector(state => state.user)
    const { messageLoad, singleLoad, repliedMessage } = useSelector(state => state.message)
    const { chatObject } = useSelector(state => state.chat)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [labelAll, setLabelAll] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [msgLoad, setMsgLoad] = useState(false)
    const [emojiMode, setEmojiMode] = useState(false)
    const [replyMode, setReplyMode] = useState(false)
    // const [messageImg, setMessageImg] = useState(null)

    // console.log(chatObject, 'chatObject')

    useEffect(() => {
        socket.on('typing', () => message && setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
        socket.on('receive message', (newMessage) => {
            if (chatId === newMessage.chat._id) {
                setMessages([...messages, newMessage])
            }
        })
    })



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
        if (!message) return
        const formData = new FormData()
        // formData.append('image', messageImg)
        try {
            if(repliedMessage){
                const res = await makeRequest.post('/message', { chat: chatObject._id, content: message, replyMessage: repliedMessage._id })
                setMessage('')
                emojiMode && setEmojiMode(false)
                setMessages([...messages, res.data])
                dispatch(setSingleLoad(!singleLoad))
                setReplyMode(false)
                dispatch(setRepliedMessage(null))
                socket && socket.emit('new message', res.data)
                socket && socket.emit('stop typing', chatId)
            }else{
                const res = await makeRequest.post('/message', { chat: chatObject._id, content: message })
                setMessage('')
                emojiMode && setEmojiMode(false)
                setMessages([...messages, res.data])
                dispatch(setSingleLoad(!singleLoad))
                socket && socket.emit('new message', res.data)
                socket && socket.emit('stop typing', chatId)
            }
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

    const getPicture = () => {
        const result = chatObject?.users.filter(user => user._id !== currentUser._id)[0].picture
        return result
    }

    return (
        <>
            <div className="right-header" >
                <div className="right-header-details" style={{ cursor: 'pointer' }} onClick={() => dispatch(setRightView('profile'))}>
                    <img src={chatObject?.isGroup || !getPicture() ? ProfilePic : getPicture()} alt="" />
                    <div className="right-header-detail">
                        <span>{groupName()}</span>
                        <span>{isTyping ? 'typing' : ''}</span>
                    </div>
                </div>
                <div className="right-header-icons">
                    <FaVideo title='Start a video call' className='fa' />
                    <IoMdSearch className='fa' />
                    <BiDotsVerticalRounded className='fa' />
                </div>
            </div>
            {/* <ScrollableFeed> */}
            {true ?
                <MessageBody
                    msgLoad={msgLoad}
                    labelAll={labelAll}
                    setLabelAll={setLabelAll}
                    messages={messages}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    setMessages={setMessages}
                    setReplyMode={setReplyMode}
                /> : 
                <MessageImgUpload />
            }
            {false ? null : !labelAll && !replyMode ? <div className="right-input-section" style={{ width: rightView !== null ? '46.4%' : '70%' }}>
                <BsEmojiSmile className='fa' onClick={() => setEmojiMode(!emojiMode)} />
                {emojiMode && <EmojiPicker className='fa' setMessage={setMessage} />}
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
            </div>
                : replyMode ?
                    <div className="right-input-section" style={{ width: rightView !== null ? '46.4%' : '70%' }}>
                        <div style={{ background: 'rgb(32, 44, 51)', display: 'flex', justifyContent: 'end', alignItems: 'center', position: 'absolute', width: '101%', left: 0, height: 70, bottom: 60 }}>
                            <div style={{ height: '76%', display: 'flex', paddingLeft: 20, flexDirection: 'column', borderLeft: 'teal 7px solid', width: '88%', borderRadius: 7 }}>
                                <b style={{ color: 'teal' }}>{repliedMessage?.sender._id === user._id ? 'You' : repliedMessage?.sender?.username}</b>
                                <span style={{ color: 'white', opacity: 0.9 }}>{repliedMessage?.content}</span>
                            </div>
                            <MdCancel onClick={() => setReplyMode(false)} style={{ fontSize: 27, margin: '0px 20px', color: 'white', cursor: 'pointer' }} />
                        </div>
                        <BsEmojiSmile className='fa' onClick={() => setEmojiMode(!emojiMode)} />
                        {emojiMode && <EmojiPicker className='fa' setMessage={setMessage} />}
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