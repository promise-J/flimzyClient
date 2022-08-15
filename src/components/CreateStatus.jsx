import React, { useState } from 'react'
import { IoMdColorPalette } from 'react-icons/io'
import { makeRequest } from '../utils/apiCalls'
import { MdSend } from 'react-icons/md'
import {toast} from 'react-toastify'
import './createStatus.css'
import { createStatus } from '../redux/statusSlice'
import { useDispatch } from 'react-redux'


const CreateStatus = () => {
    const dispatch = useDispatch()
    const colors = [
        'lime',
        'orange',
        'rgb(21, 37, 48)',
        'yellow',
        'crimson',
        'purple',
        'green',
        'goldenrod',
        'gray',
        'blue'
    ]

    const [selectedColor, setSelectedColor] = useState(randomRange(0, 9))
    const [statusText, setStatusText] = useState('')
    // const [emojiMode, setEmojiMode] = useState(false)

    function randomRange(myMin, myMax) {
        return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
      }

    const changeColor = ()=>{
        if(selectedColor >= colors.length - 1){
            return setSelectedColor(0)
        }
        setSelectedColor(value=> value + 1)
    }

    const handleChange = (e)=>{
        if(e.target.value.length > 150){
          toast.warning('Word limit reached')
          return
        }else{
            setStatusText(e.target.value)
        }
    }

    const handleStatusCreation = async ()=>{
        if(statusText.length < 1) return
        console.log({statusText, color: colors[selectedColor]})
        const res = await makeRequest.post('/status', {statusText, color: colors[selectedColor]})
        setStatusText('')
        dispatch(createStatus(false))
        if(res.status===200) return toast.success('Status Created')
    }


  return (
    <div className='createStatus'>
        {/* <MdCancel style={{ color: 'white', top: 20, right: 40, position: 'absolute', fontSize: 30, cursor: 'pointer' }} /> */}
        <div className="createStatusWrapper"
         style={{background: `${colors[selectedColor]}`}}
         >
            {/* {emojiMode && <EmojiPicker className='fa' setStatusText={setStatusText} />} */}
            <div className="createStatusTextWrapper">
            {statusText}
            </div>
        </div>
        <div className="create-status-bottom">
            <IoMdColorPalette onClick={changeColor} title='Change color' style={{fontSize: 35, cursor: 'pointer', marginRight: 25, color: `${colors[selectedColor]}`}} />
            {/* <MdEmojiEmotions onClick={()=> setEmojiMode(!emojiMode)} title='Add Emoji' style={{fontSize: 35, cursor: 'pointer', marginRight: 25, color: 'gray'}} /> */}
            <input value={statusText} onChange={(e)=> handleChange(e)} type="text" placeholder='Add A Comment' />
            <MdSend onClick={handleStatusCreation} title='Create Status' style={{fontSize: 35, cursor: 'pointer', marginLeft: 25, color: 'gray'}} />
        </div>
    </div>
  )
}

export default CreateStatus