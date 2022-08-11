import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import ProfilePic from '../images/profileBlank.png'
import { AiOutlineDown } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequest } from '../utils/apiCalls'
import { addChatList, setChats } from '../redux/chatSlice'
import { toast } from 'react-toastify'
import { setUserRequest } from '../redux/userSlice'



const FriendRequest = () => {
    const [showExtra, setShowExtra] = useState(false)
    const dispatch = useDispatch()

    const { userRequest, socket } = useSelector(state => state.user)

    const addChat = async (chatId, chatSender) => {
        try {
            const res = await makeRequest.get(`/chat/${chatId}?chatSender=${chatSender}`)
            if (res.status === 200) {
                dispatch(addChatList(res.data))
                toast.success('User Added')
                socket && socket.emit('friend request', chatId)
            } else {
                toast.info(`You already added ${chatSender}`)
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    const removeChat = async (chatId) => {
        try {
            console.log(chatId, 'to delete')
            const res = await makeRequest.put(`/user/rejectRequest/${chatId}`)
            dispatch(setUserRequest(userRequest.filter(usr=> usr._id !== chatId)))
            console.log(res, 'respond')
            if (res.status === 200) {
                // dispatch(addChatList(res.data))
                toast.success('Request Rejected')
            } else {
                toast.info(`You already`)
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }


    return (
        <>
            <div style={{ margin: 10, width: '93%', display: 'flex', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>
                <p style={{ color: 'white', opacity: 0.6 }}>Friend's Request</p>
                {!showExtra ?
                    <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(true)}><AiOutlineDown /> </span> :
                    <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(false)}><IoIosArrowUp /> </span>
                }
            </div>
            <div style={{ width: '100%', display: showExtra ? 'block' : 'none', transition: '0.3s all ease-in-out' }}>
                {userRequest?.length > 0 ? userRequest?.map(user => (
                    <div key={user._id} className="left-header-chat">
                        <img src={user?.picture} alt={user?.username} />
                        <div className="left-header-chat-details">
                            <span className="chat-name">{user?.username}</span>
                        </div>
                        <span style={{ background: 'green', color: 'white', padding: '2px 10px', marginRight: 18, fontSize: 10, borderRadius: 4 }} onClick={() => addChat(user._id, user?.username)}>Accept</span>
                        <span style={{ background: 'green', color: 'white', padding: '2px 10px', marginRight: 18, fontSize: 10, borderRadius: 4 }} onClick={() => removeChat(user._id)}>Reject</span>
                    </div>
                ))
                : <p style={{color: 'gray', margin: '10px 30px'}}>No Connection request</p>}
            </div>
        </>
    )
}

export default FriendRequest