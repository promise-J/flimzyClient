import React from 'react'

const FirstForm = ({setRegisterUser, registerUser}) => {
    const {username} = registerUser

    
    return (
        <form>
            <div className="formItem">
                <label>Username</label>
                <input value={username} onChange={(e)=> setRegisterUser({...registerUser, username: e.target.value})} type="text" />
            </div>
            <div className="formItem">
                <label style={{fontWeight: 600}}>Sex</label>
                <div style={{display: 'flex'}}>
                    Male
                <input onChange={(e)=> setRegisterUser({...registerUser, gender: e.target.value})}  type="radio" name='sex' value='male' />
                {/* <label>Male</label> */} 
                Female
                <input onChange={(e)=> setRegisterUser({...registerUser, gender: e.target.value})}  type="radio" name='sex' value='female' />
                {/* <label>Female</label> */}
                </div>
            </div>
        </form>
    )
}

export default FirstForm