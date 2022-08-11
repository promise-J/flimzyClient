import React, { useEffect } from 'react'
import { BiArrowBack, BiImageAdd, BiSave, BiUpload } from 'react-icons/bi'
import { GrCircleInformation } from 'react-icons/gr'
import { BiPencil } from 'react-icons/bi'
import { BsTelephone } from 'react-icons/bs'
import ProfilePic from '../images/profileBlank.png'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../redux/appSlice'
import { useState } from 'react'
import { makeRequest } from '../utils/apiCalls'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setUser } from '../redux/userSlice'
import { MdCancel } from 'react-icons/md'



export const ProfileSidebar = () => {
    const PF = process.env.REACT_APP_BACKEND_URL

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [about, setAbout] = useState('')
    const [editAbout, setEditAbout] = useState(false)
    const [newImg, setNewImg] = useState(null)
    const [imgPrev, setImgPrev] = useState(null)

    const handleChangeImg = (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
            toast.error('File is too large')
            return setNewImg(null)
        } else if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            toast.error('Image format not allowed')
            return setNewImg(null)
        } else {
            setImgPrev(URL.createObjectURL(file))
            setNewImg(file)
        }
    }
    console.log(user?.about, 'about user')

    useEffect(()=>{
        setAbout(user?.about)
    },[user?.about])

    const updateAbout = async()=>{
        setEditAbout(false)
        const res = await makeRequest.put('/user/updateUser', {about})
        console.log(res.data)
        if(res.status===200){
            dispatch(setUser(res.data))
            return toast.success('About updated')
        } 
    }

    const handleSubmitImg = async (e) => {
        const formData = new FormData()
        formData.append('file', newImg)
        const res = await axios.post(PF + '/img', formData)
        console.log(res.data, 'the updated image')
        if (res.status === 200) {
            const newUser = await makeRequest.put('/user/updateUser', { picture: res.data.secure_url })
            dispatch(setUser(newUser.data))
            toast.success('Image upload Successful')
        }

    }

    return (
        <div className='left profile-sidebar'>
            <div style={{ zIndex: 40 }} className="profile-sidebar-header">
                <div className="nav">
                    <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('chat'))} />
                    <span>Profile</span>
                </div>
            </div>
            <div className="profile-sidebar-header-offset"></div>
            <div className="profile-sidebar-img" style={{ position: 'relative' }}>
                {newImg &&
                    <>
                        <BiUpload onClick={handleSubmitImg} title='Upload Image' style={{ position: 'absolute', fontSize: 25, cursor: 'pointer', right: '3%', bottom: '29%', color: 'white' }} />
                        <MdCancel title='Remove Image' style={{ color: 'white', cursor: 'pointer', fontSize: 25, position: 'absolute', right: '10%', bottom: '29%' }} onClick={() => {
                            setNewImg(null)
                            setImgPrev(null)
                        }} />
                    </>
                }
                <div className="profile-edit-img" style={{ display: imgPrev && 'flex', background: imgPrev && 'transparent' }}>
                    {imgPrev ?
                        <>
                            <img src={imgPrev} alt='upload img' style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                        </>
                        : <>
                            <label htmlFor="profile-img">
                                <BiImageAdd style={{ cursor: 'pointer', fontSize: 50, color: 'green' }} />
                            </label>
                            <input onChange={handleChangeImg} style={{ display: 'none' }} type="file" id='profile-img' />
                        </>}
                </div>
                <img style={{ cursor: 'pointer' }} className='image' src={user ? user?.picture : ProfilePic} alt='..' />
            </div>
            <p>About and Phone Number</p>
            <div style={{ alignItems: 'center', justifyContent: 'center' }} className="profile-details">
                <GrCircleInformation style={{ cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, left: 18, color: 'white', opacity: 0.5 }} />
                {/* <BiPencil style={{cursor: 'pointer',fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5}} /> */}
                {/* <span style={{margin: '0 26px', padding: '0 10px', color: 'white'}}>Your about will come here: Tell us about yourself, what you do and what you intend doing in the future</span> */}
                {!editAbout ? <div style={{color: 'white', height: '100%', width: '85%', padding: 10}}>{user?.about}</div>:
                <textarea style={{ resize: 'none', border: editAbout ? '1px solid gray' : 'none', background: 'transparent', color: 'white', width: '85%', height: 'fit-content', padding: 10, fontSize: 18, outline: 'none', borderRadius: 10, minHeight: 100 }} type="text" value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    disabled={!editAbout}
                />}
                {!editAbout ? <BiPencil title='Edit About' onClick={() => setEditAbout(true)}
                    style={{ cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5 }}
                />
                    : <BiSave
                        title='Save About'
                        style={{ cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5 }}
                        onClick={updateAbout} />}
            </div>
            <div className="profile-details">
                <BsTelephone style={{ cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, left: 18, color: 'white', opacity: 0.5 }} />
                <span style={{ margin: '0 26px', padding: '0 10px', color: 'white' }}>{user.username} {" | "} {user.email}</span>
                <BiPencil title='This feature is disabled at the moment, try again later' style={{ cursor: 'pointer', fontSize: 22, position: 'absolute', top: 10, right: 18, color: 'white', opacity: 0.5 }} />
            </div>
            <div className="profile-details">
                <span style={{ color: 'white' }}>Your phone number can be edited from your app on your mobile Phone.</span>
            </div>
        </div>
    )
}
