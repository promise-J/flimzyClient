import React from 'react'
import './modal.css'
import ProfilePic from '../../images/profileBlank.png'
import { useSelector } from 'react-redux'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const ProfilePopUp = ({imgPop}) => {
    const PF = REACT_APP_BACKEND_URL
    const {showImg} = useSelector(state=> state.chat)

    return (
        <div className='profile-pop-up' style={{display: !showImg ? 'none' : 'flex'}}>
        {/* <div className='profile-pop-up' > */}
            <img style={{height: 400, width: 400}} src={imgPop ? PF + '/images/' + imgPop : ProfilePic} alt='..' />
        </div>
    )
}

export default ProfilePopUp