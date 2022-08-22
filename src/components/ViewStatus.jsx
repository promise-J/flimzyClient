import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdCancel, MdEmojiEmotions, MdSend } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStatusArray, setStatusIndex } from '../redux/statusSlice'
import { useEffect } from 'react'
import StatusIndicatorBar from './StatusIndicatorBar'

const ViewStatus = () => {
    const dispatch = useDispatch()
    const { statusIndex, allStatus, currentStatusArray } = useSelector(state => state.status)
    const [rendering, setRendering] = useState(null)
    const [rendLength, setRendLength] = useState(0)
    const [rendIndex, setRendIndex] = useState(0)

    // const [counter, setCounter] = useState(0)

    useEffect(() => {
        setRendLength(currentStatusArray?.length)
        setRendering(currentStatusArray[rendIndex])
    }, [currentStatusArray, rendIndex])

    useEffect(() => {
        setRendIndex(0)
    }, [currentStatusArray])

    useEffect(() => {
        const jumpBack = () => {
            dispatch(setCurrentStatusArray(allStatus[statusIndex - 1]?.value))
        }
        return jumpBack()
    }, [statusIndex, allStatus, rendLength, dispatch])

    const goToNext = () => {
        // setRendering(currentStatusArray[rendIndex + 1])
        if (rendIndex >= rendLength - 1 && statusIndex < allStatus?.length) {
            dispatch(setStatusIndex(statusIndex + 1))
        }
        if((rendIndex < currentStatusArray?.length - 1) && statusIndex <= allStatus?.length){
            setRendIndex(idx => idx + 1)
        }
    }

    const goToPrev = () => {
        if (rendIndex <= 0 && statusIndex !== 1) {
            dispatch(setStatusIndex(statusIndex - 1))
        }
        if (rendIndex < 0) {
            return
        }
        if (rendIndex > 0) {
            return setRendIndex(idx => idx - 1)
        }
        // setRendering(currentStatusArray[rendIndex - 1])
    }

    //   runTimer()
    return (
        <div className='status-main view-status'>
            <MdCancel style={{ color: 'white', top: 80, right: 40, position: 'absolute', fontSize: 30, cursor: 'pointer' }} />
            <div className="view-status-top">
                <div className="view-status-top-container">
                    <FaAngleLeft onClick={goToPrev} style={{ color: 'white', opacity: 0.5, cursor: 'pointer', fontSize: 38, position: 'absolute', left: 25, top: '50%' }} />
                    <FaAngleRight onClick={goToNext} style={{ color: 'white', opacity: 0.5, cursor: 'pointer', fontSize: 38, position: 'absolute', right: 25, top: '50%' }} />
                    <div className="view-status-progress">
                        {
                            new Array(rendLength).fill('*').map((v, idx) => (
                                <StatusIndicatorBar rendIndex={rendIndex} key={idx} idx={idx} />
                            ))
                        }
                    </div>
                    {/* <img src={Img} alt="" /> */}
                    {rendering?.statusText && <div style={{ background: rendering?.color }} className="view-status-main-text">
                        {rendering?.statusText}
                    </div>}
                </div>
                {false && <div className="view-status-top-text">
                    <p>What God can not do does not exist. I am glad</p>
                </div>}
            </div>
            <div className="view-status-bottom">
                <MdEmojiEmotions title='Add Emoji' style={{ fontSize: 35, cursor: 'pointer', marginRight: 25, color: 'gray' }} />
                <input type="text" placeholder='Add A Comment' />
                <MdSend title='Comment' style={{ fontSize: 35, cursor: 'pointer', marginLeft: 25, color: 'gray' }} />
            </div>
        </div>
    )
}

export default ViewStatus