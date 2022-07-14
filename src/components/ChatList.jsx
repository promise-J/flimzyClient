import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChatId } from '../redux/userSlice'
import ProfilePic from '../images/profileBlank.png'
import { makeRequest } from '../utils/apiCalls'
import {format} from 'timeago.js'
import { setPopImg, setShowImg } from '../redux/chatSlice'
// import { setSelectedChatCompare } from '../redux/chatSlice'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const ChatList = ({chat, socket}) => {
    const imgRef = useRef(null)
    const dispatch = useDispatch()
    const {user: currentUser} = useSelector(state=> state.user)
    const {singleLoad} = useSelector(state=> state.message)
    const [lastMsg, setLastMsg] = useState('')
    const PF = REACT_APP_BACKEND_URL
    

    // useEffect(()=>{
    //     notifications.forEach(notif=>{
    //     })
    // },[chatNotif, notifications])
    // console.log(imgRef.current)
    
    useEffect(()=>{
            const getChat = async()=>{
                try {
                    const res = await makeRequest.get(`/chat/chat/${chat._id}`)
                    setLastMsg(res.data?.latestMessage?.content)
                } catch (error) {
                    console.log(error)
                }
            }
            getChat()
        },[singleLoad, chat])
    

    const selectChat = (chatId) => {
        dispatch(setChatId(chatId))
    }

    
    const groupName = ()=>{
        if(!chat.isGroup){
            return chat.users.filter(user=> user._id !== currentUser?._id)[0]
        }else{
            return chat.chatName
        }
    }

    const formatDate = (data) => new Intl.DateTimeFormat('default',
  {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
  }).format(new Date(data));

  const getTimeAgo = ()=>{
      const result = Math.floor((new Date(Date.now()).getTime() - new Date(chat.updatedAt).getTime())/(1000 * 60 * 60 * 24))
      if(result<1) return {value: formatDate(chat.updatedAt), result}
      if(result > 1 && result < 3){
        return {value: 'yesterday', result}
      }
      if(result >= 3) return {value : format(chat.updatedAt), result}
  }

  const displayImg = ()=>{
    dispatch(setPopImg(imgRef.current.src))
    dispatch(setShowImg(true))
  }


  return (
    <div key={chat._id} className="left-header-chat">
    <span className="chat-time unseen">{getTimeAgo()?.value}</span>
    {/* <div className="animate-chat">
        <i className="fa fa-thumb-tack pin" aria-hidden="true"></i>
        {/* <span className="notif-message">2</span> 
        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
    </div> 
    */}
    <img ref={imgRef} onClick={displayImg} src={chat.isGroup ? `${ProfilePic}` : `${PF}${groupName().picture}`} alt="" />
    <div onClick={() => selectChat(chat._id)} className="left-header-chat-details">
        <span className="chat-name">{chat.isGroup ? groupName() : groupName().username}</span>
        <div className="chat-snippet">
            <span className="last-message">{!lastMsg ? chat?.latestMessage?.content : lastMsg }</span>
        </div>
    </div>
</div>
  )
}

export default ChatList