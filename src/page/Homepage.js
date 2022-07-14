import React, { useState } from 'react'
import './homepage.css'
import HomeImg from '../images/whatHome.jpg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeRequest} from '../utils/apiCalls'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {login} from '../redux/userSlice'
const PF = process.env.REACT_APP_BACKEND_URL

// import {useSelector} from 'react-redux'



const Homepage = () => {

  const dispatch = useDispatch()
  const [formDisplay, setFormDisplay] = useState('login')
  const initialLogin = {
    loginEmail: '',
    loginPassword: '',
  }

  const initialRegister = {
    registerEmail: '',
    registerUsername: '',
    registerImg: null,
    registerPassword: ''
  }

  const [loginDetails, setLoginDetails] = useState(initialLogin)
  const [registerDetails, setRegisterDetails] = useState(initialRegister)

  const {loginEmail, loginPassword} = loginDetails 
  const {registerEmail, registerUsername, registerPassword, registerImg} = registerDetails 


  const handleRegister = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', registerImg)
    try {
      const res = await axios.post(PF + '/imageupload', formData)
      if(res.status===200){
        await axios.post(PF+'/user/register', {
           email: registerEmail,
           username: registerUsername,
           password: registerPassword,
           picture: res.data
          })
          toast.success('Welcome on board')
          setRegisterDetails(initialRegister)
          setFormDisplay('login')
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const res = await makeRequest.post('/user/login', {email: loginEmail, password: loginPassword})
      if(res.status===200){
        dispatch(login(res.data.user))
        localStorage.setItem('secretToken', res.data.token)
        toast.success('Login Success')
        window.location.href = '/chat'
      }
    } catch (error) {
      toast.error(error.response.data)
      console.log(error)
    }
  }


  return (
    <div className='home'>
      <div className='home-main-wrapper'>
        <div className='home-img'>
          <img src={HomeImg} alt='' />
          <p>WhatsApp Connection</p>
        </div>
        <div className='home-wrapper'>
          <div className='home-header'>
            <button className={formDisplay === 'login' ? "active" : ""} onClick={()=> setFormDisplay('login')}>Login</button>
            <button className={formDisplay==='register' ? 'active' : ""} onClick={()=> setFormDisplay('register')}>Register</button>
          </div>
          <div className='home-body' >
            {formDisplay==='login' ?
            <form onSubmit={handleLogin}>
              <p>Login</p>
              <input type='text' placeholder='Email here' value={loginEmail} onChange={(e)=> setLoginDetails({...loginDetails, loginEmail: e.target.value})} />
              <input type='text' placeholder='password' value={loginPassword} onChange={(e)=> setLoginDetails({...loginDetails, loginPassword: e.target.value})} />
              <button disabled={!loginEmail || !loginPassword} >Login</button>
            </form> :
            <form onSubmit={handleRegister}>
              <p>Register</p>
              <input type='text' placeholder='Username here' value={registerUsername} onChange={(e)=> setRegisterDetails({...registerDetails, registerUsername: e.target.value})} />
              <input type='text' placeholder='Email here' value={registerEmail} onChange={(e)=> setRegisterDetails({...registerDetails, registerEmail: e.target.value})} />
              <input type='text' placeholder='password' value={registerPassword} onChange={(e)=> setRegisterDetails({...registerDetails, registerPassword: e.target.value})} />
              <input type='file' onChange={(e)=> setRegisterDetails({...registerDetails, registerImg: e.target.files[0]})} />
              <button disabled={!registerUsername || !registerEmail || !registerPassword || !registerImg} >Register</button>
            </form>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage