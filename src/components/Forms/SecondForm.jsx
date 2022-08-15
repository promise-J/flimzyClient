import React, { useState } from 'react'
import {MdOutlineVisibility, MdOutlineVisibilityOff} from 'react-icons/md'

const SecondForm = ({registerUser, setRegisterUser}) => {
    const {email, password, cPassword} = registerUser
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)


    return (
      <form>
        <div className="formItem">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, email: e.target.value })
            }
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="formItem" style={{ position: "relative" }}>
          {showPassword ? (
            <MdOutlineVisibility
              onClick={()=> setShowPassword(false)}
              style={{
                position: "absolute",
                top: 40,
                right: "35%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          ) : (
            <MdOutlineVisibilityOff
              onClick={() => setShowPassword(true)}
              style={{
                position: "absolute",
                top: 40,
                right: "35%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          )}
          <label>Password</label>
          <input
            value={password}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, password: e.target.value })
            }
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
        </div>
        <div className="formItem" style={{ position: "relative" }}>
          {showCPassword ? (
            <MdOutlineVisibility
              onClick={() => setShowCPassword(false)}
              style={{
                position: "absolute",
                top: 40,
                right: "35%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          ) : (
            <MdOutlineVisibilityOff
              onClick={() => setShowCPassword(true)}
              style={{
                position: "absolute",
                top: 40,
                right: "35%",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
          )}
          <label>Confirm Password</label>
          <input
            value={cPassword}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, cPassword: e.target.value })
            }
            type={showCPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
        </div>
      </form>
    );
}

export default SecondForm