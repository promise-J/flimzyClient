import React from 'react'
import { BiArrowBack, BiHelpCircle } from 'react-icons/bi'
import { setLeftView } from '../../redux/appSlice'
import SecurityImg from '../../images/security.png'
import { useDispatch } from 'react-redux'
import { FaUsers } from 'react-icons/fa'
import { FcDocument } from 'react-icons/fc'


const Help = () => {
    const dispatch = useDispatch()
    const contact = 'Please contact us for further enquires on FlimzyApp@chat.com or call us on our mobile number +2348111158225'
    const terms = 'We provide, and always strive to improve, ways for you to communicate with other WhatsApp users including through messages, voice and video calls, sending images and video, showing your status, and sharing your location with others when you choose. We may provide a convenient platform that enables you to send and receive money to or from other users across our platform. WhatsApp works with partners, service providers, and affiliated companies to help us provide ways for you to connect with their services.'
    const help = 'Please contact us for further enquires on FlimzyApp@chat.com or call us on our mobile number +2348111158225'

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
            <div className="item-list" title={help}>
                <BiHelpCircle className='icon' />
                <span className='item-text'>Help Center</span>
            </div>
            <div className="item-list" title={contact}>
                <FaUsers className='icon' />
                <span className='item-text'>Contact Us</span>
            </div>
            <div className="item-list" title={terms}>
                <FcDocument className='icon' />
                <span className='item-text'>Terms</span>
            </div>
        </div>
    )
}

export default Help