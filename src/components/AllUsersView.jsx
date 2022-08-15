import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import ProfilePic from '../images/profileBlank.png'
import { AiOutlineDown } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { makeRequest } from '../utils/apiCalls'
import { toast } from 'react-toastify'



const AllUsersView = ({searchName}) => {
    const [showExtra, setShowExtra] = useState(false)
    // const dispatch = useDispatch()

    const { userList } = useSelector(state => state.user)

    const addChat = async (chatId, chatSender) => {
        try {
            // const res = await makeRequest.get(`/chat/${chatId}?chatSender=${chatSender}`)
            const res = await makeRequest.put(`/user/sendRequest/${chatId}`)
            if (res.status === 200) {
                toast.success(`Request sent to ${chatSender}`)
            } else {
                toast.info(`You already added ${chatSender}`)
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }


    return (
        <>
            <div style={{ margin: 10, width: '93%', display: 'flex', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>
                <p style={{ color: 'white', opacity: 0.6 }}>Invite a friend</p>
                {!showExtra ?
                    <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(true)}><AiOutlineDown /> </span> :
                    <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(false)}><IoIosArrowUp /> </span>
                }
            </div>
            <div style={{ width: '100%', display: showExtra ? 'block' : 'none', transition: '0.3s all ease-in-out' }}>
                {userList.length > 0 && userList.filter(user => user?.username?.toLowerCase().includes(searchName)).map(user => (
                    <div key={user?._id} className="left-header-chat">
                        <img src={ProfilePic} alt="" />
                        <div className="left-header-chat-details">
                            <span className="chat-name">{user?.username}</span>
                        </div>
                        <span style={{ background: 'green', color: 'white', padding: '2px 10px', marginRight: 18, fontSize: 10, borderRadius: 4 }} onClick={() => addChat(user._id, user?.username)}>Invite</span>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default AllUsersView