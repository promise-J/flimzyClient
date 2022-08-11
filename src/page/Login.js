import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeRequest } from '../utils/apiCalls'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'
import {Link} from 'react-router-dom'

// import {useSelector} from 'react-redux'



const Login = () => {

  const dispatch = useDispatch()
  const initialLogin = {
    loginEmail: '',
    loginPassword: '',
  }

  const [loginDetails, setLoginDetails] = useState(initialLogin)

  const { loginEmail, loginPassword } = loginDetails


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await makeRequest.post('/user/login', { email: loginEmail, password: loginPassword })
      if (res.status === 200) {
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
    <div className='login'>
      <div className='login-main-wrapper'>
        <div className='login-img'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCxybDVEB_XWzQzD4At5ofl3jpqlXixQjaA&usqp=CAU' alt='' />
          <Link to='/'><p>Flimzy Connection</p></Link>
        </div>
        <div className='login-wrapper'>
          <div className='login-body' >
              <form onSubmit={handleLogin}>
                <p>Login</p>
                <input type='text' placeholder='Email here' value={loginEmail} onChange={(e) => setLoginDetails({ ...loginDetails, loginEmail: e.target.value })} />
                <input type='text' placeholder='password' value={loginPassword} onChange={(e) => setLoginDetails({ ...loginDetails, loginPassword: e.target.value })} />
                <button disabled={!loginEmail || !loginPassword} >Login</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login