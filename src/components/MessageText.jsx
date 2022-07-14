import React, { useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setRightView } from '../redux/appSlice'
import { setSelectedMessage } from '../redux/messageSlice'
import { makeRequest } from '../utils/apiCalls'

const MessageText = ({
    msg,
     labelAll,
      setLabelAll,
      selectedLabel,
      setSelectedLabel,
      setMessages
    }) => {

  const {user} = useSelector(state=> state.user)
  const [msgOption, setMsgOption] = useState(false)
  const dispatch = useDispatch()

  const addToLabel = (e, id)=>{
    if(e.target.checked){
        if(selectedLabel.includes(id)){
            setSelectedLabel(state=> state.filter(sid=> sid!== id))
        }else{
            setSelectedLabel(state=> [...state, id])
        }
    }else{
        setSelectedLabel(state=> state.filter(sid=> sid!== id))
    }
  }

  
  const formatDate = (data) => new Intl.DateTimeFormat('default',
  {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
  }).format(new Date(data));

  const deleteMessage = async(id)=>{
    try {
        const res = await makeRequest.post('/message/delete', {message: id})
        if(res.status===200){
            setMessages(messages=> messages.filter(msg=> msg._id!==id))
            setLabelAll(false)
            toast.success('Message Deleted')
        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div key={msg._id} className={user._id===msg.sender._id ? "message-box own" : "message-box other"}
     style={{width: labelAll ? '100%' : 'fit-content'}}>
    {
    msgOption && <div 
    style={{left: user._id!==msg.sender._id && '130%'}}
     className='message-pop'>
      <MdOutlineCancel className='icon' onClick={()=> setMsgOption(false)} />
      <li onClick={()=>{
         dispatch(setSelectedMessage(msg))
         dispatch(setRightView('messageInfo'))
         setMsgOption(false)
    }}>Message info</li>
      <li>Reply</li>
      <li onClick={()=>{
         setLabelAll(true)
         setMsgOption(false)
        }}>Edit label</li>
      <li onClick={()=> deleteMessage(msg._id)}>Delete</li>
    </div>
    }
    {labelAll && <input onChange={(e)=> addToLabel(e, msg._id)} className='checkLabel' type='checkbox' />}
     <i onClick={()=>{
         setMsgOption(true)
         labelAll && setLabelAll(false)
         }} 
         className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
     {msg.content}
     <span style={{marginBottom: 5, fontSize: 9}}>
      {formatDate(msg.createdAt)}
      </span>
 </div>
  )
}

export default MessageText