import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiVideo, BiVideoOff } from "react-icons/bi";
import { MdCall, MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAnswered, setCaller, setCallMode, setReceivingCall } from "../redux/callSlice";
import "./callpage.css";
import Peer from "simple-peer";
import { TbSwitchHorizontal } from "react-icons/tb";
import Img from "../images/profileBlank.png";
import DialAudio from "../audio/dial.mp3";
import { toast } from "react-toastify";

const CallPage = ({ socket }) => {
  const dispatch = useDispatch();
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [calling, setCalling] = useState(false);
  const [showFace, setShowFace] = useState(true);
  const [switchVideo, setSwitchVideo] = useState(false);
  const [partnerSwitchVideo, setPartnerSwitchVideo] = useState(false);
  const [attemptCall, setAttemptCall] = useState(false);
  const [callee, setCallee] = useState(null);
  const [partnerImage, setPartnerImage] = useState("");
  const audioRef = useRef();
  const userVideo = useRef();
  const userPeer = useRef();
  const partnerPeer = useRef();
  const partnerVideo = useRef();
  const { partnerId, receivingCall, caller } = useSelector(
    (state) => state.call
  );
  const { user } = useSelector((state) => state.user);
  const { chatObject } = useSelector((state) => state.chat);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    setCallee(chatObject?.users.filter((usr) => usr._id !== user._Id)[0]);

    socket.on("switchVideo", (data) => {
      setPartnerImage(data.image);
      setPartnerSwitchVideo(!partnerSwitchVideo);
    });
  }, [socket, partnerSwitchVideo, user, chatObject]);

  if(calling){
    audioRef?.current.play()
  }else{
    audioRef?.current?.pause()
  }

  const callPeer = (id) => {
    setAttemptCall(true);
    setCalling(true);
    userPeer.current = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    setTimeout(() => {
      setCalling(false);
      toast.error("User is not answering");
      rejectCall();
    }, 30000);

    userPeer.current.on("signal", (data) => {
      socket.emit("videoCallUser", {
        userToCall: partnerId,
        signalData: data,
        from: user,
      });
    });

    userPeer.current.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (data) => {
      setCallAccepted(true);
      setCalling(false);
      userPeer.current.signal(data.signal);
    });

    socket.on("rejectedCall", () => {
      dispatch(setCallMode(false));
      userPeer?.current?.destroy();
      partnerPeer?.current?.destroy();
      window.location.href = "/chat";
    });
  };

  const receiveCall = () => {
    dispatch(setAnswered(true))
    setCallAccepted(true);
    partnerPeer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    partnerPeer.current.on("signal", (data) => {
      socket.emit("acceptCall", { signalData: data, to: caller?.from });
    });

    partnerPeer.current.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    if (caller.signal) {
      partnerPeer.current.signal(caller.signal);
    }

    socket.on("rejectedCall", () => {
      dispatch(setCallMode(false));
      window.location.href = "/chat";
    });
  };

  const rejectCall = () => {
    if (caller) {
      dispatch(setReceivingCall(false));
      dispatch(setCaller(null));
      socket.emit("rejectCall", caller.from._id);
      window.location.href = "/chat";
    } else {
      dispatch(setCallMode(false));
      socket.emit("rejectCall", user._id);
      window.location.href = "/chat";
    }
  };

  const toggleShowFace = () => {
    setShowFace(!showFace);
    if (caller) {
      socket.emit("switchVideo", {
        user: caller?.from?._id,
        value: !showFace,
        image: user?.picture,
      });
    } else {
      socket.emit("switchVideo", {
        user: callee?._id,
        value: !showFace,
        image: user?.picture,
      });
    }
  };

  const handleSwitchVideo = () => {
    setSwitchVideo(!switchVideo);
  };

  return (
    <div className="call-page">
      <div className="call-page-header">
        {!caller ? (
          <>
            {/* <MdCall
              className="fa"
              style={{ display: attemptCall ? "none" : "block" }}
            /> */}
            <h1 style={{ display: attemptCall ? "none" : "block" }}>
              Start a Call
            </h1>
            <BiVideo
              style={{ display: attemptCall ? "none" : "block" }}
              onClick={() => callPeer(partnerId)}
              className="fa"
            />
          </>
        ) : null}
        <MdCallEnd className="fa fae" onClick={rejectCall} />
        <audio src={DialAudio} ref={audioRef} />
      </div>
      <div className="call-page-body">
        <div className={switchVideo ? "caller-video" : "user-video"}>
          <video
            style={{ display: showFace ? "block" : "none" }}
            ref={userVideo}
            autoPlay
            playsInline
          />
          <img
            style={{ display: showFace ? "none" : "block" }}
            src={user?.picture}
            alt={user?.username}
          />
        </div>
        <div className={switchVideo ? "user-video" : "caller-video"}>
          <video
            ref={partnerVideo}
            style={{ display: partnerSwitchVideo ? "none" : "block" }}
            autoPlay
            playsInline
          />
          <img
            src={partnerImage ? partnerImage : Img}
            alt={caller?.from?.username}
            style={{ display: partnerSwitchVideo ? "block" : "none" }}
          />
        </div>
        <div className="show-status">
          <BiVideoOff
            className="fa"
            onClick={toggleShowFace}
            style={{
              display: callAccepted ? "block" : "none",
              background: showFace ? "green" : "white",
              color: showFace ? "white" : "black",
            }}
          />
          <TbSwitchHorizontal
            className="fa"
            onClick={handleSwitchVideo}
            // style={{ fontSize: 30, cursor: "pointer", color: "white", background: 'green', padding: 5, borderRadius: '50%' }}
          />
        </div>
        {receivingCall && !callAccepted && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Incoming Call from{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}>
                {caller?.from?.username}
              </span>
            </span>
            <div className="acceptPanelButton">
              <MdCallEnd className="accept-fa" onClick={receiveCall} />
              <MdCallEnd className="accept-fa fae" onClick={rejectCall} />
            </div>
          </div>
        )}
        {calling && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Connecting{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}>...</span>
            </span>
            <div className="acceptPanelButton">
              {/* <MdCallEnd className="accept-fa" onClick={receiveCall} /> */}
              <MdCallEnd className="accept-fa fae" onClick={rejectCall} />
            </div>
          </div>
        )}
        {callAccepted && (
          <div className="acceptPanel">
            <span style={{ fontSize: 14 }}>
              Connected{" "}
              <span style={{ color: "limegreen", fontSize: 24 }}></span>
            </span>
            <div className="acceptPanelButton">
              {/* <MdCallEnd className="accept-fa" onClick={receiveCall} /> */}
              <MdCallEnd className="accept-fa fae" onClick={rejectCall} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPage;
