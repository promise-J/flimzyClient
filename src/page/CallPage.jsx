import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiVideo } from "react-icons/bi";
import { MdCall, MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCallMode } from "../redux/callSlice";
import "./callpage.css";
import Peer from "simple-peer";

const CallPage = ({ socket }) => {
  const dispatch = useDispatch();
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [calling, setCalling] = useState(false)
  const userVideo = useRef();
  const partnerVideo = useRef();
  const { partnerId, receivingCall, caller } = useSelector(
    (state) => state.call
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    // socket.on('hey', (data)=> {
    //     // setReceivingCall(true)
    //     // setCaller(data.from)
    //     console.log(data.signal, ' from the home hey')
    //     setCallerSignal(data.signal)
    // })
  }, []);

  const callPeer = (id) => {
    setCalling(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("videoCallUser", {
        userToCall: partnerId,
        signalData: data,
        from: user,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (data) => {
        setCallAccepted(true);
        setCalling(false)
        peer.signal(data.signal);
    });
  };

  const receiveCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signalData: data, to: caller?.from });
    });

    peer.on("stream", (stream) => {
        if(partnerVideo.current){
            partnerVideo.current.srcObject = stream;
        }
    });
    
    if(caller.signal){
        peer.signal(caller.signal);
    }
  };

  return (
    <div className="call-page">
      <div className="call-page-header">
        <MdCall className="fa" />
        <h1>Start a Call</h1>
        <BiVideo onClick={() => callPeer(partnerId)} className="fa" />
        <MdCallEnd
          className="fa fae"
          onClick={() => dispatch(setCallMode(false))}
        />
      </div>
      <div className="call-page-body">
        <div className="user-video">
          <video ref={userVideo} autoPlay playsInline />
        </div>
        <div className="caller-video">
            <video ref={partnerVideo} autoPlay playsInline />
        </div>
        {(receivingCall && !callAccepted) && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Incoming Call from{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}>
                {caller?.from?.username}
              </span>
            </span>
            <div className="acceptPanelButton">
              <MdCallEnd className="accept-fa" onClick={receiveCall} />
              <MdCallEnd className="accept-fa fae" />
            </div>
          </div>
        )}
        {calling && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Connecting{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}>
                ...
              </span>
            </span>
            <div className="acceptPanelButton">
              {/* <MdCallEnd className="accept-fa" onClick={receiveCall} /> */}
              <MdCallEnd className="accept-fa fae" />
            </div>
          </div>
        )}
        {callAccepted && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Connected{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}>
              </span>
            </span>
            <div className="acceptPanelButton">
              {/* <MdCallEnd className="accept-fa" onClick={receiveCall} /> */}
              <MdCallEnd className="accept-fa fae" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPage;
