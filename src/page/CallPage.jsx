import React from 'react'
import { useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setCallMode } from '../redux/appSlice'
import './callPage.css'

const CallPage = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })

            .then((currentStream) => {
                console.log(currentStream, 'from here')
                //set the stream

                //we can also create a reference to this stream so it can directly be

                // used inside a component using the useRef hook

            });
    }, [])
    console.log(navigator)
    return (
        <div className='container callPage'>
            <div className="callPage-wrapper">
                <MdCancel onClick={()=> dispatch(setCallMode())} style={{color: 'white', top: 30, right: 40, position: 'absolute', fontSize: 30, cursor: 'pointer'}} />
            </div>
        </div>
    )
}

export default CallPage