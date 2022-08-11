import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setLeftView } from '../../redux/appSlice'
import SecurityImg from '../../images/security.png'
import './requestAccount.css'
import { makeRequest } from '../../utils/apiCalls'
import { toast } from 'react-toastify'


const RequestAccount = () => {
  const {user} = useSelector(state=> state.user)
  const initialOptions = {
    to: '',
    from: 'chiemelapromise30@gmail.com',
    subject: 'Account information request',
    message: `Hello ${user?.username}, Welcome to Flimzy App.
    Your username is: ${user?.username}.
    Your email is: ${user?.email}
    `
  }
  const dispatch = useDispatch()
  const [options, setOptions] = useState(initialOptions)
  const {to} = options

  const verifyUser = async()=>{
    try {
      const res = await makeRequest.post('/sendmail', options)
      toast.success(res.data)
      setOptions(initialOptions)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='left setting requestAccount'>
      <div className="setting-header">
        <BiArrowBack className='icon' onClick={() => dispatch(setLeftView('setting'))} style={{ cursor: 'pointer' }} />
        <h4>Request Account Info</h4>
      </div>
      <div className="setting-header-offset"></div>
      <img src={SecurityImg} alt=".." style={{ height: 130, width: 130, margin: '5px 0px 5px 150px' }} />
      <p style={{ margin: '16px 20px', fontSize: 17, color: 'white', lineHeight: 1.6 }}>Messages and call in end-to-end encrypted stay between you and the people you choose.
        Not even WhatsApp can read or listen to them. <span style={{ color: 'teal' }}>Learn more</span>
      </p>
      <div className='security-details'>
        <input type="checkbox" />
        <div className='security-detail'>
          <span>Show security notification on this computer</span>
          <span>Get notified when security code changes for a contact's phone. If you have multiple devices,
            this settings must be enabled on the device where you want to get notification. <span style={{ color: 'teal', fontSize: 14 }}>Learn more</span></span>
        </div>
      </div>
      <div className="input-section">
        <input value={to} onChange={(e)=> setOptions({...options, to: e.target.value})} type="text" placeholder='Enter Email' />
        <button onClick={verifyUser}>Request</button>
      </div>
    </div>
  )
}

export default RequestAccount