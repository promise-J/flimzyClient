import React from 'react'
import { MdCancel } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setStatusMode } from '../redux/appSlice'
import './statusPage.css'

const StatusPage = () => {
    const dispatch = useDispatch()
    return (
        <div className='container callPage'>
            <div className="callPage-wrapper">
                <MdCancel onClick={()=> dispatch(setStatusMode())} style={{color: 'white', top: 30, right: 40, position: 'absolute', fontSize: 30, cursor: 'pointer'}} />
                <div className="statusBody">
                    <h1>Status</h1>
                </div>
            </div>
        </div>
    )
}

export default StatusPage