import React from 'react'
import './modal.css'
import ProfilePic from '../../images/profileBlank.png'
import { useSelector } from 'react-redux'


const ProfilePopUp = ({imgPop}) => {
    const {showImg} = useSelector(state=> state.chat)
    const {themeBg} = useSelector(state=> state.app)

    return (
        <div className='profile-pop-up' style={{display: !showImg ? 'none' : 'flex', background: themeBg.bg}}>
        {/* <div className='profile-pop-up' > */}
            <img style={{height: 400, width: 400}} src={imgPop ? imgPop : ProfilePic} alt='..' />
        </div>
    )
}

export default ProfilePopUp