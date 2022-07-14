import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setRightView } from '../redux/appSlice'
import { setSelectedMessage } from '../redux/messageSlice'
import MessageText from './MessageText'


const MessageInfoSidebar = () => {
  const dispatch = useDispatch()
  const { rightView } = useSelector(state => state.app)
  const { user } = useSelector(state => state.user)
  const { selectedMessage } = useSelector(state => state.message)

  const formatDate = (data) => new Intl.DateTimeFormat('default',
  {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
  }).format(new Date(data));

  const resetBar = ()=>{
    dispatch(setSelectedMessage(null))
    dispatch(setRightView(null))
  }

  return (
    <div className='sidebar' style={{ display: rightView === 'messageInfo' ? 'block' : 'none' }}>
            <MdOutlineCancel onClick={resetBar} className='icon' style={{position: 'absolute', top: 30, left: 20, color: 'white', fontSize: 22, cursor: 'pointer'}} />
      <h1 style={{ textAlign: 'center', color: 'white', marginTop: 10, fontWeight: 100 }}>Message Info</h1>
      {/* <div style={{ background: 'white', padding: 15 }}> */}
        <div className={user._id === selectedMessage.sender._id ? "message-box own" : "message-box other"}
         style={{background: user._id === selectedMessage.sender._id ?'rgb(0,92,75)' : 'rgb(32,44,51)',
          margin: '50px 5px 20px 40px', 
          width: '80%', 
          borderRadius: '4px', 
          padding: 15,
          position: 'relative',
          color: 'white'
          }} >
          {selectedMessage?.content}
          <span style={{ marginBottom: 5, fontSize: 9, position: 'absolute', bottom: 3, right: 5 }}>
            {formatDate(selectedMessage.createdAt)}
          </span>
        </div>
      {/* </div> */}
    </div>
  )
}

export default MessageInfoSidebar