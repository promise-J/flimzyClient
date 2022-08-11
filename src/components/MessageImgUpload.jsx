import React from 'react'
import { FaPlane } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import Img from '../images/whatHome.jpg'

const MessageImgUpload = () => {
  return (
    <div className='right-container' style={{background: 'rgb(17,27,33)', position: 'relative', display: 'flex', alignItems: 'center', flexDirection: 'column',padding: '40px 0px 20px 0px'}}>
        <MdCancel style={{position: 'absolute', top: 25, left: 25, color: 'white', fontSize: 35, cursor: 'pointer'}} />
        <img style={{height: 450, width: 450}} src={Img} alt='man' />
        <input type="text" placeholder='Enter a comment' style={{width: '80%', padding: '15px', marginTop: 30, borderRadius: 10}} />
        <FaPlane title='Send Image' style={{transform: 'rotate(-45deg)',color: 'white', position: 'absolute', bottom: 40, right: 40, fontSize: 44, cursor: 'pointer'}} />
    </div>
  )
}

export default MessageImgUpload