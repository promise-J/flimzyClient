import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import './notification.css'

const Notification = () => {
    const dispatch = useDispatch()
    const {userRequest} = useSelector(state=> state.user)
    const {themeBg} = useSelector(state=> state.app)

    return (
        <div className='left notification'>
            <div className="setting-header" style={{ background: themeBg.bg }}>
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('chat'))} style={{ cursor: 'pointer' }} />
                <h4>Notification</h4>
            </div>
            <div className="setting-header-offset"></div>
            <div className="notification-body">
                {
                    userRequest.map(req=> (
                <div className="notification-item">
                    <p>Chidera sent you a request to be connected so i am yet to see if you will reject the connection request or you will not</p>
                    <button>Remove</button>
                </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notification