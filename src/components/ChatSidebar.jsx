import React, { useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsChatLeftTextFill, BsFilter } from 'react-icons/bs'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdSearch } from 'react-icons/io'
import ChatList from './ChatList'
import { logout } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { setLeftView, setStatusMode } from '../redux/appSlice'
import {  setHeaderToggle, setShowGroupModal } from '../redux/chatSlice'
import ProfilePopUp from './modals/ProfilePopUp'
import AllUsersView from './AllUsersView'
import FriendRequest from './FriendRequest'



const Sidebar = ({ socket, notifications, setNotifications }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const [searchName, setSearchName] = useState('')
    const { user } = useSelector(state => state.user)
    const { chatList, headerToggle, popImg } = useSelector(state => state.chat)


    const logoutRequest = () => {
        localStorage.removeItem('secretToken')
        dispatch(logout())
        navigate('/signup')
    }

   
    // const result = chatList.forEach(chat=> chat.users.filter(user=> console.log(user, 'me')))
    // console.log(result, 'result here')
    console.log(chatList, 'chat list')

    return (
        <div className="left">
            <div className="left-header" style={{ position: 'relative' }}>
                <ProfilePopUp imgPop={popImg} />
                <img title='Your Profile' style={{ cursor: 'pointer' }} onClick={() => dispatch(setLeftView('profile'))} src={user?.picture} alt="..." />
                <div className="left-header-icons">
                    <Link to='/status'>
                    <HiOutlineStatusOnline style={{fontSize: 26}} title='Create Status' onClick={()=> dispatch(setStatusMode())} className='fa' />
                    </Link>
                    <BsChatLeftTextFill className='fa' style={{ fontSize: 24 }} />
                    <BiDotsVerticalRounded style={{fontSize: 26}} title='See more' className='fa' onClick={() => dispatch(setHeaderToggle(!headerToggle))} />
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
                    chatList?.length < 1 ? <p style={{color: 'white', margin: '10px 0 10px 20px'}}>Choose a user to chat below</p> : chatList?.filter(user => user?.chatName?.toLowerCase().includes(searchName.toLowerCase())).map(chat => (
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
                <AllUsersView socket={socket} searchName={searchName} />
                <FriendRequest socket={socket} searchName={searchName} />
            </div>
        </div>
    )
}

export default Sidebar