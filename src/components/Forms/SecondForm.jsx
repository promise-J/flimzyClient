import React from 'react'

const SecondForm = ({registerUser, setRegisterUser}) => {
    const {email, password, cPassword} = registerUser


    return (
        <form>
            <div className="formItem">
                <label>Email</label>
                <input value={email} onChange={(e)=> setRegisterUser({...registerUser, email: e.target.value})}  type="text" placeholder='Email' />
            </div>
            <div className="formItem">
                <label>Password</label>
                <input value={password} onChange={(e)=> setRegisterUser({...registerUser, password: e.target.value})}  type="text" placeholder='Password' />
            </div>
            <div className="formItem">
                <label>Confirm Password</label>
                <input value={cPassword} onChange={(e)=> setRegisterUser({...registerUser, cPassword: e.target.value})}  type="text" placeholder='Confirm Password' />
            </div>
          
            
        </form>
    )
}

export default SecondForm