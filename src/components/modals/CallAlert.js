import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaller, setReceivingCall } from "../../redux/callSlice";
import "./modal.css";

const CallAlert = ({socket}) => {
    const dispatch = useDispatch()
    const {caller} = useSelector(state=> state.call)

  return (
    <div className="callAlert">
      <span>Incoming call from promise</span>
      <div className="callAlertAction">
        <button onClick={()=> dispatch(setReceivingCall(true))}>Accept</button>
        <button onClick={
            ()=>{
                dispatch(setReceivingCall(false))
                dispatch(setCaller(null))
                socket.emit('rejectCall', caller.from._id)
            } 
            }>Reject</button>
      </div>
    </div>
  );
};

export default CallAlert;
