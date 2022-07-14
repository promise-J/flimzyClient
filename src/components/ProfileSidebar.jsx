import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {GrCircleInformation} from 'react-icons/gr'
import {BiPencil} from 'react-icons/bi'
import {BsTelephone} from 'react-icons/bs'
import ProfilePic from '../images/profileBlank.png'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../redux/appSlice'
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL




export const ProfileSidebar = () => {
 
  const PF = REACT_APP_BACKEND_URL
  const dispatch = useDispatch()
  const {user} = useSelector(state=> state.user)

  return (
    <div className='left profile-sidebar'>
        <div className="profile-sidebar-header">
            <div className="nav">
                <BiArrowBack className='icon' onClick={()=> dispatch(setLeftView('chat'))} />
                <span>Profile</span>
            </div>
        </div>
        <div className="profile-sidebar-header-offset"></div>
        <div className="profile-sidebar-img">
            <img style={{cursor: 'pointer'}} className='image' src={user ? PF+user?.picture : ProfilePic} alt='..' />
        </div>
        <p>About and Phone Number</p>
        <div className="profile-details">
            <GrCircleInformation style={{cursor: 'pointer',fontSize: 22, position: 'absolute', top: 10, left: 18, color: 'white', opacity: 0.5}} />
            <span style={{margin: '0 26px', padding: '0 10px'}}>Your about will come here: Tell us about yourself, what you do and what you intend doing in the future</span>
            <BiPencil style={{cursor: 'pointer',fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5}} />
        </div>
        <div className="profile-details">
            <BsTelephone style={{cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, left: 18, color: 'white', opacity: 0.5}} />
            <span style={{margin: '0 26px', padding: '0 10px', color: 'white'}}>Promise@gmail.com</span>
            <BiPencil style={{cursor: 'pointer',fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5}} />
        </div>
        <div className="profile-details">
            <span style={{color: 'white'}}>Your phone number can be edited from your app on your mobile Phone.</span>
        </div>
    </div>
  )
}
