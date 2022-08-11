import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStatusArray, setCurrentStatusSlide, setStatusIndex } from '../redux/statusSlice'
// import Img from '../images/profileBlank.png'


const SingleStatusPost = ({status, idx}) => {
    const dispatch = useDispatch()

    const handleViewStatus = ()=>{
        // console.log(status.value)
        dispatch(setStatusIndex(idx + 1))
        dispatch(setCurrentStatusSlide(status.value[0]))
        dispatch(setCurrentStatusArray(status.value))
    }

    return (
        <div className="status-post" onClick={handleViewStatus}>
            <div className="status-image">
                <img src={status?._id?.picture} alt='status' />
                {/* <span>Hello world</span> */}
            </div>
            <div className="status-desc" style={{position: 'relative'}}>
                <span>{status?._id?.username}</span>
                <span>Today at 4:30 AM</span>
                <span style={{position: 'absolute', right: 10, color: 'white', fontSize: 14}}>{status.value.length} Updates</span>
            </div>
        </div>
    )
}

export default SingleStatusPost