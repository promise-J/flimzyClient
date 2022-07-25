import React, { useEffect, useState } from 'react'
import './chatView.css'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequest } from '../utils/apiCalls'
import GroupModal from '../components/modals/GroupModal'
import ChatSidebar from '../components/ChatSidebar'
import { ProfileSidebar } from '../components/ProfileSidebar'
import RightSidebar from '../components/RightSidebar'
import MessageSection from '../components/MessageSection'
import MessageInfoSidebar from '../components/MessageInfoSidebar'
import { setUsers } from '../redux/userSlice'
import { endChatLoad, setChatObject, setChats, setHeaderToggle, setShowImg, startChatLoad } from '../redux/chatSlice'
import LoadAnimate from '../components/LoadAnimate'
import io from 'socket.io-client'
import { toast } from 'react-toastify';
import Setting from '../components/Setting'
import Privacy from '../components/privacy/Privacy'
import Notification from '../components/notification/Notification'
import Security from '../components/security/Security'
import ThemeModal from '../components/modals/ThemeModal'
import ChatWallpaper from '../components/chatWallpaper/ChatWallpaper'
import RequestAccount from '../components/requestAccount/RequestAccount'
import Help from '../components/help/Help'
import CallPage from './CallPage'
import StatusPage from './StatusPage'

const END_POINT = process.env.REACT_APP_BACKEND_URL


const ChatView = () => {

    const dispatch = useDispatch()
    const [openProfile, setOpenProfile] = useState(false)
    const [leftToggleHeader, setLeftToggleHeader] = useState(false)
    const [socket, setSocket] = useState(io(END_POINT))
    const [notifications, setNotifications] = useState([])


    const { chatId, user } = useSelector(state => state.user)
    const { rightView, showTheme, leftView, colorPallete, callMode, statusMode } = useSelector(state => state.app)
    const { showGroupModal, showImg, chatLoading, headerToggle } = useSelector(state => state.chat)

    // const [socket, setSocket] = useState(null)
    useEffect(() => {
        const initSocket = () => {
            let sock = io(END_POINT)
            socket.emit('setup', user)
            socket === null && setSocket(sock)
        }
        user && initSocket()
    }, [user, socket])
    
    useEffect(()=>{
        socket.on('receive message', (newMessage) => {
            if (chatId !== newMessage.chat._id) {
                //send a notification to the user
                setNotifications([...notifications, newMessage])
            }
        })
    })
    // console.log(notifications, 'chatview')
    

    useEffect(() => {
        const userChats = async () => {
            dispatch(startChatLoad())
            const res = await makeRequest.get('/chat')
            dispatch(setChats(res.data))
            dispatch(endChatLoad())
        }
        userChats()
    }, [dispatch])

    useEffect(() => {
        const getSingleChat = async () => {
            const res = await makeRequest.get(`/chat/chat/${chatId}`)
            setChatObject(res.data)
            dispatch(setChatObject(res.data))
        }
        if (chatId) {
            getSingleChat()
        }
    }, [chatId, dispatch])

    useEffect(() => {
        
        const getListUsers = async () => {
            try {
                const res = await makeRequest.get('/user/getUsers')
                dispatch(setUsers(res.data))
            } catch (error) {
                if (error?.response?.data?.name === 'TokenExpiredError') {
                    localStorage.removeItem('secretToken')
                    toast.success('Token Expired, You will be logged out')
                    window.location.href = '/'
                }
            }
        }
        getListUsers()
    }, [dispatch])


    const closeAll = () => {
        if (leftToggleHeader) {
            setLeftToggleHeader(false)
        }
        if(showImg){
            dispatch(setShowImg(false))
        }
        if(headerToggle){
            dispatch(setHeaderToggle(false))
        }
    }

    if (chatLoading) {
        return <LoadAnimate />
    }
    // linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
    // url('images/background.jpg')
    return (
        <>
        <div className="container" onClick={closeAll}>
            {showGroupModal && <GroupModal />}
            {showTheme && <ThemeModal />}
            {leftView ==='setting' ? <Setting /> : 
            leftView === 'profile' ? <ProfileSidebar /> : 
            leftView==='privacy' ? <Privacy /> :  leftView==='notification' ?
             <Notification /> : leftView==='security' ? <Security />  : leftView==='chatWallpaper' ?
              <ChatWallpaper /> : leftView==='requestAccount' ? <RequestAccount /> : leftView==='help' ? <Help /> 
             : <ChatSidebar setNotifications={setNotifications} notifications={notifications} socket={socket} />}
            <div className="right" style={{ flex: rightView !== null ? '50%' : '70%', zIndex: 23, background: colorPallete && colorPallete }}>
                {chatId ?
                    <MessageSection notifications={notifications} setNotifications={setNotifications} socket={socket} user={user} setOpenProfile={setOpenProfile} openProfile={openProfile} />
                    :
                    <>
                        <div style={{ height: 'calc(100%)', width: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 style={{ color: 'white', fontSize: 49 }}>Welcome To Flimzy</h2>
                            <p style={{ color: 'white', opacity: 0.7, fontSize: 20 }}>No chat is selected</p>
                        </div>

                        {/* <div className='right-container'>
            </div> */}
                    </>
                }
            </div>
            {rightView === 'messageInfo' ? <MessageInfoSidebar /> : rightView === 'profile' ?
                <RightSidebar /> : null
            }
        </div>
        {callMode && <CallPage />}
        {statusMode && <StatusPage />}
        </>
    )
}

export default ChatView