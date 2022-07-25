import React, { useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { IoIosArrowUp, IoMdSearch } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { makeRequest } from '../utils/apiCalls'
import ProfilePic from '../images/profileBlank.png'
import ChatList from './ChatList'
import { AiOutlineDown } from 'react-icons/ai'
import { logout } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { setCallMode, setLeftView } from '../redux/appSlice'
import { addChatList, setHeaderToggle, setShowGroupModal } from '../redux/chatSlice'
import ProfilePopUp from './modals/ProfilePopUp'
import { FaVideo } from 'react-icons/fa'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL



const Sidebar = ({ socket, notifications, setNotifications }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showExtra, setShowExtra] = useState(false)
    const [searchName, setSearchName] = useState('')
    const { user, userList } = useSelector(state => state.user)
    const { chatList, headerToggle, popImg } = useSelector(state => state.chat)
    const PF = REACT_APP_BACKEND_URL


    const logoutRequest = () => {
        localStorage.removeItem('secretToken')
        dispatch(logout())
        navigate('/')
    }

    const addChat = async (chatId, chatSender) => {
        try {
            const res = await makeRequest.get(`/chat/${chatId}?chatSender=${chatSender}`)
            if (res.status === 200) {
                dispatch(addChatList(res.data))
                toast.success('User Added')
            } else {
                toast.info(`You already added ${chatSender}`)
            }
        } catch (error) {
            toast.error(error.response.data)
        }
    }
    // const result = chatList.forEach(chat=> chat.users.filter(user=> console.log(user, 'me')))
    // console.log(result, 'result here')

    return (
        <div className="left">
            <div className="left-header" style={{ position: 'relative' }}>
                <ProfilePopUp imgPop={popImg} />
                <img title='Your Profile' style={{ cursor: 'pointer' }} onClick={() => dispatch(setLeftView('profile'))} src={PF + '/images/' + user?.picture} alt="..." />
                <div className="left-header-icons">
                    <HiOutlineStatusOnline title='Create Status' className='fa' />
                    <FaVideo title='Start a video call' onClick={()=> dispatch(setCallMode())} className='fa' />
                    {/* <BsChatLeftTextFill className='fa' style={{ fontSize: 16 }} /> */}
                    <BiDotsVerticalRounded title='See more' className='fa' onClick={() => dispatch(setHeaderToggle(!headerToggle))} />
                </div>
                <ul style={{ display: headerToggle ? 'block' : 'none' }}>
                    <li onClick={() => {dispatch(setShowGroupModal(true)); dispatch(setHeaderToggle(false))}}>New Group</li>
                    <li onClick={() => {dispatch(setLeftView('profile')); dispatch(setHeaderToggle(false))}}>Profile</li>
                    <li onClick={() => {dispatch(setLeftView('setting')); dispatch(setHeaderToggle(false))}}>Settings</li>
                    <li onClick={logoutRequest}>Log out</li>
                </ul>
            </div>
            <div className="left-header-search">
                <div className="left-header-search-item">
                    <IoMdSearch className='fa' />
                    <input onChange={(e) => setSearchName(e.target.value)} type="text" value={searchName} />
                    <span className="right-header-online"></span>
                    <BsFilter className='fa' />
                </div>
            </div>
            <div className="left-header-container">
                {/* <div className="left-header-chat">
                    <span className="chat-time unseen">7:59 PM</span>
                    <div className="animate-chat">
                        <i className="fa fa-thumb-tack pin" aria-hidden="true"></i>
                        <span className="notif-message">2</span>
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt="" />
                    <div className="left-header-chat-details">
                        <span className="chat-name">Sir Oliver (Snr. DEV)</span>
                        <div className="chat-snippet">

                            <span className="last-message">Congratulations on your new Job...</span>
                        </div>
                    </div>
                </div> */}
                {
                    chatList.length < 1 ? <p style={{color: 'white', margin: '10px 0 10px 20px'}}>Choose a user to chat below</p> : chatList.filter(user => user.chatName.toLowerCase().includes(searchName.toLowerCase())).map(chat => (
                        <ChatList
                            setNotifications={setNotifications}
                            notifications={notifications}
                            socket={socket}
                            chat={chat} key={chat?._id}
                        />
                    ))
                }

                {/* <div className="left-header-chat">
                    <span className="chat-time unseen">10:23 AM</span>
                    <div className="animate-chat">
                        <span className="notif-message">2</span>
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic}alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Victor</span>
                        <div className="chat-snippet">
                            <span className="last-message">I will be back in an hour time</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time unseen">6/9/2022</span>
                    <div className="animate-chat">
                        <span className="notif-message">2</span>
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic}alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Favour Johnson</span>
                        <div className="chat-snippet">
                            <span className="last-message">Hope you arrived safely, i forgot to t...</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time unseen">6/8/2022</span>
                    <div className="animate-chat">
                        <span className="notif-message">2</span>
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Lynes</span>
                        <div className="chat-snippet">
                            <span className="last-message">There is power in your lips, surely...</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time">26/3/2022</span>
                    <div className="animate-chat">
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Sweet heart🧡</span>
                        <div className="chat-snippet">
                            <span className="last-message seen">I will love you till the end of time bec...</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time">1/2/2021</span>
                    <div className="animate-chat">
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">My Mum</span>
                        <div className="chat-snippet">
                            <div className="chat-seen">
                                <BiCheckDouble className='fa' style={{fontSize: 22}} />
                                {/* <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-check" aria-hidden="true"></i> 
                            </div>
                            <span className="last-message">No problem Ma.</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time">11/2/2020</span>
                    <div className="animate-chat">
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">0904958384</span>
                        <div className="chat-snippet">
                            <span className="last-message seen">It's your friend. We met at the spag...</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time">6/2/2019</span>
                    <div className="animate-chat">
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Precious J.</span>
                        <div className="chat-snippet">
                            <span className="last-message seen">The stand i bought is okay...</span>
                        </div>
                    </div>
                </div>
                <div className="left-header-chat">
                    <span className="chat-time">11/2/2018</span>
                    <div className="animate-chat">
                        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
                    </div>
                    <img src={ProfilePic} alt=""/>
                    <div className="left-header-chat-details">
                        <span className="chat-name">Comedy club</span>
                        <div className="chat-snippet">
                            <div className="chat-seen">
                            <BiCheckDouble className='fa' style={{fontSize: 22}} />
                                {/* <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-check" aria-hidden="true"></i> *
                            </div>
                            <span className="last-message">In the evening of the yesterday, I...</span>
                        </div>
                    </div>
                </div> */}
                <div style={{ margin: 10, width: '93%', display: 'flex', alignItems: 'center', padding: 8, justifyContent: 'space-between' }}>
                    <p style={{ color: 'white', opacity: 0.6 }}>Invite a friend</p>
                    {!showExtra ?
                        <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(true)}><AiOutlineDown /> </span> :
                        <span style={{ color: 'white', opacity: 0.6, cursor: 'pointer' }} onClick={() => setShowExtra(false)}><IoIosArrowUp /> </span>
                    }
                </div>
                <div style={{ width: '100%', display: showExtra ? 'block' : 'none', transition: '0.3s all ease-in-out' }}>
                    {userList.filter(user => user.username.toLowerCase().includes(searchName)).map(user => (
                        <div key={user?._id} className="left-header-chat">
                            <img src={ProfilePic} alt="" />
                            <div className="left-header-chat-details">
                                <span className="chat-name">{user?.username}</span>
                            </div>
                            <span style={{ background: 'green', color: 'white', padding: '2px 10px', marginRight: 18, fontSize: 10, borderRadius: 4 }} onClick={() => addChat(user._id, user?.username)}>Add</span>
                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Sidebar