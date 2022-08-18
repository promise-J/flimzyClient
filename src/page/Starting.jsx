import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FirstForm from '../components/Forms/FirstForm'
import SecondForm from '../components/Forms/SecondForm'
import ThirdForm from '../components/Forms/ThirdForm'
import Header from '../components/Header'
import './starting.css'
import {TiTickOutline} from 'react-icons/ti'
import {imgRequest} from '../utils/apiCalls'
const PF = process.env.REACT_APP_BACKEND_URL


const Starting = () => {
    const navigate = useNavigate()
    const initialState = {
        picture: null,
        email: '',
        username: '',
        about: '',
        password: '',
        cPassword: '',
        gender: '',
        imgPrev: ''
    }
    const [registerUser, setRegisterUser] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const { password, cPassword, picture, gender, about, username, email } = registerUser

    const [regStage, setRegState] = useState(1)
    const prevStage = () => {
        if (regStage <= 1) return
        setRegState(state => state - 1)
    }
    const nextStage = async () => {
        if(regStage===2 && cPassword !== password){
            return toast.error('Passwords must match to continue')
        }
        if (regStage >= 3) {
            if (cPassword !== password) return toast.error('Passwords must match')
            if(!username || !password || !email || !gender || !about) return toast.error('Field must not be empty')
            const formData = new FormData()
            formData.append('file', picture)
            try {
                if (picture) {
                    setLoading(true)
                    const res = await imgRequest.post(PF + '/img', formData)
                    if (res.status === 200) {
                        await axios.post(PF + '/user/register', {
                            email,
                            username,
                            about,
                            gender,
                            password,
                            picture: res.data.secure_url
                        })
                        setLoading(false)
                        toast.success('Welcome on board')
                        setRegisterUser(initialState)
                        navigate('/signup')
                    }
                } else {
                    setLoading(true)
                    await axios.post(PF + '/user/register', {
                        email,
                        username,
                        about,
                        gender,
                        password,
                    })
                    setLoading(false)
                    toast.success('Welcome on board')
                    setRegisterUser(initialState)
                    navigate('/signup')
                }
            } catch (error) {
                console.log(error, 'the bastard')
                setLoading(false)
                setRegState(2)
                toast.error(error.response.data)
            }
        } else {
            setRegState(state => state + 1)
        }
    }
    return (
        <div className='homepage starting'>
            <Header />
            <div className="header-offset"></div>
            <main>
                <h1>Let's Get To know You. Getting started</h1>
                <div className="stages">
                    <div style={{ animation: loading && 'animate1 1.5s forwards linear', background: regStage >= 1 && 'green', color: regStage >= 1 && 'white' }} className="stage" onClick={() => setRegState(1)}>1</div>
                    <div style={{ background: regStage >= 2 && 'green', color: regStage >= 2 && 'white' }} className="stage" onClick={() => setRegState(2)}>2</div>
                    <div style={{ animation: loading && 'animate3 1.5s forwards linear',background: regStage > 2 && 'green', color: regStage > 2 && 'white' }} className="stage" onClick={() => setRegState(3)}>{loading ? <TiTickOutline style={{fontSize: 40, animation: 'tickBlink infinite 1s'}} /> : 3}</div>
                </div>
                <div className="contentFormContainer">
                    <button onClick={prevStage}>Prev</button>
                    <button onClick={nextStage}>Next</button>
                    {
                        regStage === 1 ? <FirstForm setRegisterUser={setRegisterUser} registerUser={registerUser} /> : regStage === 2 ?
                            <SecondForm setRegisterUser={setRegisterUser} registerUser={registerUser} />
                            : <ThirdForm setRegisterUser={setRegisterUser} registerUser={registerUser} />
                    }
                </div>
            </main>
        </div>
    )
}

export default Starting