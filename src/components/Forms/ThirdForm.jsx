import React from 'react'
import {toast} from 'react-toastify'

const ThirdForm = ({registerUser, setRegisterUser}) => {
    const {about, imgPrev} = registerUser



    const handleImgChange = async (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
          setRegisterUser({...registerUser, imgPrev: ''})
          toast.error('File is too large')
          return setRegisterUser({...registerUser, picture: null})
        } else if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
          toast.error('Image format not allowed')
          setRegisterUser({...registerUser, imgPrev: ''})
          return setRegisterUser({...registerUser, picture: null})
        } else {
          return setRegisterUser({...registerUser, picture: file, imgPrev: URL.createObjectURL(file) })
        }
      }


      console.log(registerUser, 'the prev')
    return (
        <form>
              <div className="formItem">
                <label>About You</label>
                <input value={about} onChange={(e)=> setRegisterUser({...registerUser, about: e.target.value})} type="text" placeholder='E.g Software Engr. | Product Designer | Gospel Addict' />
            </div>
            <div className="formItem">
                <label>Select an Image</label>
                <input onChange={handleImgChange} type="file" />
            </div>
            {imgPrev && <img src={imgPrev} alt='i' />}
        </form>
    )
}

export default ThirdForm