import React, { useState } from 'react'
import { makeRequest } from '../utils/apiCalls'
import { toast } from 'react-toastify'
import './homepage.css'
import EachFAQ from '../components/EachFAQ'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Homepage = () => {

    const [message, setMessage] = useState('')

    const handleSend = async () => {
        try {
            if (message) {
                const res = await makeRequest.post('/sendmail/enquiry', { to: 'chiemelapromise30@gmail.com', from: 'Anonymous', subject: 'Enquiry mail from Flimzy', message })
                setMessage('')
                toast.success('Mail sent!')
            }
        } catch (error) {

        }
    }


    return (
        <div className='homepage'>
           <Header />
            <div className="header-offset"></div>
            <main>
                <div className="firstSection">
                    <div className="firstSectionImage">
                        <img data-aos='fade-down' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzyJpczba-dMWmGeA6Qujjd1PYKGWiqxZpAA&usqp=CAU" alt="welcome" />
                    </div>
                    <div className="firstSectionText">
                        <h1>Welcome To <span>Flimzy App.</span> Lets Help You get Started</h1>
                    </div>
                </div>
                <div className="secondSection">
                    <h1>What you should know about Flimzy App.</h1>
                    <div className="secondSectionContainer">
                        <img src="https://www.just.edu.jo/Units_and_offices/Offices/IRO/PublishingImages/Pages/ISNConnect-/cassia.connectlogo.png" alt="" />
                        <div className="secondSectionContainerText">
                            <p>Flimzy App was built to help in proper communications between peers. It is connects users from different part of the countries. It simplifies communications of ideas, text, and messages from one user to another.
                                <span style={{ color: 'rgb(147, 240, 147)' }}>It was built strictly for desktop/laptop. We are working on the mobile view.</span></p>
                        </div>
                    </div>
                </div>
                <div className="thirdSection">
                    <h1>How to get started</h1>
                    <div className="thirdSectionItems">
                        <div className="thirdSectionItem">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtfDb0d13gOJ8V4qW16jgMaoHOT7Y3sbr7-g&usqp=CAU" alt="signup" />
                            <Link to='/starting' style={{ color: 'inherit', textDecoration: 'none' }}>
                                <p>Sign Up</p>
                            </Link>
                        </div>
                        <div className="thirdSectionItem">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu18N-OZOiQIuEc7bH-2YyBbwWn6U0sgvaWQ&usqp=CAU" alt="signup" />
                            <Link to='/signup' style={{ color: 'inherit', textDecoration: 'none' }}>
                                <p>Sign In</p>
                            </Link >
                        </div>
                        <div className="thirdSectionItem">
                            <img src="https://www.digicert.com/account/images/login-shield.png" alt="signup" />
                            <p>Verify Your account</p>
                        </div>
                        <div className="thirdSectionItem">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhNmmZTZ3Ex65fOCa6IWECdMUZOH9tPkaQQ&usqp=CAU" alt="signup" />
                            <p>Get Connected</p>
                        </div>
                    </div>
                </div>
                <div className="fourthSection">
                    <h1>Frequently asked questions</h1>
                    <EachFAQ />
                    <EachFAQ />
                    <EachFAQ />
                    <EachFAQ />
                </div>
                <div className="fifthSection">
                    <h1>What are you waiting For?</h1>
                    <Link to='/starting'><button>Sign up now!</button></Link>
                    <div className="enquiry">
                        <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Send us an email' />
                        <button onClick={handleSend}>Send</button>
                    </div>
                    <p>&copy; copy right 2022 FlimzyApp.</p>
                </div>
            </main>
        </div>
    )
}

export default Homepage