import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import './notification.css'

const Notification = () => {
    const dispatch = useDispatch()

    return (
        <div className='left notification'>
            <div className="setting-header" style={{ background: 'inherit' }}>
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
                <h4>Notification</h4>
            </div>
            <div className="setting-header-offset"></div>
            <div className="notif-item">
                <input type="checkbox" />
                <span>Mute all notifications</span>
            </div>
            <div className="notif-item">
                <input type="checkbox" />
                <span>Sounds</span>
            </div>
            <div className="notif-item">
                <input type="checkbox" />
                <span>Desktop Alert</span>
            </div>
        </div>
    )
}

export default Notification