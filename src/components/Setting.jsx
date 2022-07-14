import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { BsInfoSquare, BsKeyboard, BsNewspaper } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLockOutline, MdOutlineHelpOutline, MdSecurity } from 'react-icons/md'
import { WiDayLightWind } from 'react-icons/wi'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView, setShowTheme } from '../redux/appSlice'
import './setting.css'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const Setting = () => {
    const about = 'This is where your status is supposed to go so enjoy'

    const PF = REACT_APP_BACKEND_URL

    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.user)

    return (
        <div className='left setting profile-sidebar'>
            <div className="setting-header">
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('chat'))} style={{ cursor: 'pointer' }} />
                <h4>Setting</h4>
            </div>
            <div className="setting-header-offset"></div>
            <div className="setting-about-display">
                <div className='about-img'>
                <img src={PF + user.picture} alt=".." />
                </div>
                <div className="about-text">
                    <span className="username">{user?.username}</span>
                    <span className='text'>{about.slice(0, 35) + '...'}</span>
                </div>
            </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('notification'))}>
                    <IoMdNotificationsOutline className='icon' />
                    <span className='item-text'>Notification</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('privacy'))}>
                    <MdLockOutline className='icon' />
                    <span className='item-text'>Privacy</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('security'))}>
                    <MdSecurity className='icon' />
                    <span className='item-text'>Security</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setShowTheme(true))} >
                    <WiDayLightWind className='icon' />
                    <span className='item-text'>Theme</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('chatWallpaper'))}>
                    <BsNewspaper className='icon' />
                    <span className='item-text'>Chat wallpaper</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('requestAccount'))}>
                    <BsInfoSquare className='icon' />
                    <span className='item-text'>Request Account Info</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('chatWallpaper'))}>
                    <BsKeyboard className='icon' />
                    <span className='item-text'>Keyboard shortcuts</span>
                </div>
                <div className="item-list" onClick={() => dispatch(setLeftView('help'))}>
                    <MdOutlineHelpOutline className='icon' />
                    <span className='item-text'>Help</span>
                </div>
        </div>
    )
}

export default Setting