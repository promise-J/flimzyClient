import React from 'react'
import { BiArrowBack, BiHelpCircle } from 'react-icons/bi'
import { setLeftView } from '../../redux/appSlice'
import SecurityImg from '../../images/security.png'
import { useDispatch } from 'react-redux'
import { FaUsers } from 'react-icons/fa'
import { FcDocument } from 'react-icons/fc'


const Help = () => {
    const dispatch = useDispatch()

    return (
        <div className='left setting'>
            <div className="setting-header">
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
                <h4>Help</h4>
            </div>
            <div className="setting-header-offset"></div>
            <img src={SecurityImg} alt=".." style={{ height: 130, width: 130, margin: '5px 0px 5px 150px' }} />
            <p style={{ margin: '16px 170px', fontSize: 17, color: 'white', lineHeight: 1.6 }}><span style={{ color: 'teal' }}>Version 2.2224.8</span>
            </p>
            <div className="item-list" onClick={() => dispatch(setLeftView('notification'))}>
                <BiHelpCircle className='icon' />
                <span className='item-text'>Help Center</span>
            </div>
            <div className="item-list" onClick={() => dispatch(setLeftView('notification'))}>
                <FaUsers className='icon' />
                <span className='item-text'>Contact Us</span>
            </div>
            <div className="item-list" onClick={() => dispatch(setLeftView('notification'))}>
                <FcDocument className='icon' />
                <span className='item-text'>Terms</span>
            </div>
        </div>
    )
}

export default Help