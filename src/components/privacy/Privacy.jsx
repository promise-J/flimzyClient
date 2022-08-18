import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import './privacy.css'

const Privacy = () => {
    const {themeBg} = useSelector(state=>state.app)
    const dispatch = useDispatch()

    return (
        <div className='left privacy'>
            <div className="setting-header" style={{ paddingLeft: 20, background: themeBg.bg, color: themeBg.color }}>
                <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
                <h4>Privacy</h4>
            </div>
            <div className="setting-header-offset"></div>
            <p style={{ color: themeBg.color, marginBottom: 15, marginLeft: 30 }}>Who can see my personal info</p>
            {/* <div className="privacy-item">
                <div className="privacy-item-text">
                    <span>Last Seen</span>
                    <span>Nobody</span>
                </div>
                <IoIosArrowForward />
            </div> */}
            <div className="privacy-item">
                <div className="privacy-item-text">
                    <span>Profile Photo</span>
                    <span>Everyone</span>
                </div>
                <IoIosArrowForward />
            </div>
            <div className="privacy-item">
                <div className="privacy-item-text">
                    <span>Last Seen</span>
                    <span>Nobody</span>
                </div>
                <IoIosArrowForward />
            </div>
            <div className="privacy-item">
                <div className="privacy-item-text">
                    <span>About</span>
                    <span>Everyone</span>
                </div>
                <IoIosArrowForward />
            </div>
            <div className="privacy-item">
                <div className="privacy-item-text">
                    <span>Read Receipt</span>
                    <span>If turned off, you won't send or receive read receipt. Read receipt are always sent to group chat</span>
                </div>
                <input style={{ height: 20, width: 20 }} type='checkbox' />
            </div>
            <div className="privacy-disappear">
                <p style={{ color: themeBg.color, marginLeft: 30}}>Disappearing messages</p>
                <div className="privacy-item">
                    <div className="privacy-item-text">
                        <span>Default message timer</span>
                        <span>Off</span>
                    </div>
                    <IoIosArrowForward />
                </div>
            </div>
            <div className="privacy-disappear" style={{marginBottom: 50, height: 150}}>
                <div className="privacy-item">
                    <div className="privacy-item-text">
                        <span>Groups</span>
                        <span>453 contacts excluded</span>
                    </div>
                    <IoIosArrowForward />
                </div>
                <div className="privacy-item" >
                    <div className="privacy-item-text">
                        <span>Blocked Contact</span>
                        <span>5</span>
                    </div>
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}

export default Privacy