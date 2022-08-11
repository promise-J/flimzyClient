import React, {useEffect, useState} from 'react'
import { MdCancel, MdPhonelinkSetup } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setStatusMode } from '../redux/appSlice'
import './statusPage.css'
import Img from '../images/profileBlank.png'
import { makeRequest } from '../utils/apiCalls'
import SingleStatusPost from '../components/SingleStatusPost'
import NoStatus from '../components/NoStatus'
import ViewStatus from '../components/ViewStatus'
import CreateStatus from '../components/CreateStatus'
import { Link } from 'react-router-dom'
import { setAllStatus, createStatus, setStatusIndex } from '../redux/statusSlice'

const StatusPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.user)
    const { statusIndex, createStatus: cState} = useSelector(state=> state.status)
    const [statuses, setStatuses] = useState([])
    const [userStatuses, setUserStatuses] = useState(null)

    useEffect(()=>{
        const fetchStatuses = async()=>{
            const res = await makeRequest.get('/status')
            const userStatus = res.data.filter(status=> status?._id?._id===user?._id)[0]
            // const otherStatus = res.data.filter(status=> status?._id?._id!==user?._id)
            setUserStatuses(userStatus)
            setStatuses(res.data)
        }
        fetchStatuses()
    },[user?._id])

    useEffect(()=>{
        dispatch(setAllStatus(statuses.filter(status=> status._id._id !== user?._id)))
    },[dispatch, statuses, user])

    
    
    return (
        <div className='container statusPage'>
            <div className="status-wrapper">
                <Link to='/chat'>
                <MdCancel onClick={() => dispatch(setStatusMode())} style={{ color: 'white', top: 8, right: 40, position: 'absolute', fontSize: 30, cursor: 'pointer' }} />
                </Link>
                <div className="statusBody">
                    <div className="status-sidebar">
                        <div className="status-sidebar-header">
                            <div className="user-img">
                                <img style={{cursor: 'pointer'}} title={user?.username + ' Status'} src={userStatuses ? user?.picture : Img} alt="user" />
                            </div>
                            <div className="user-status">
                                    <span>My status</span>
                                    {userStatuses ?
                                        <span><b>{userStatuses?.value.length}</b>  {"  "}  Status Updates</span>:
                                        <span>No Updates</span>
                                    }
                            </div>
                            <div className="add-status">
                                <MdPhonelinkSetup onClick={()=>{
                                    dispatch(createStatus(!cState))
                                    dispatch(setStatusIndex(0))
                                } 
                                } title='Create Status' style={{fontSize: 25, color: 'white', cursor: 'pointer'}} />
                            </div>
                        </div>
                        <div className="status-sidebar-body">
                            <p>Recent</p>
                            {statuses.filter((sta)=> sta?._id._id !== user?._id).map((status, idx)=>(
                                <SingleStatusPost idx={idx} status={status} key={status?._id?._id} />
                            ))
                            }
                        </div>
                    </div>
                    {
                        !statusIndex && !cState ? <NoStatus /> : cState ? <CreateStatus /> : <ViewStatus />
                    }
                    {/* <NoStatus /> */}
                    {/* <ViewStatus /> */}
                    {/* <CreateStatus /> */}
                </div>
            </div>
        </div>
    )
}

export default StatusPage