import React, { useEffect, useRef, useState } from "react";
import "./chatView.css";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../utils/apiCalls";
import GroupModal from "../components/modals/GroupModal";
import ChatSidebar from "../components/ChatSidebar";
import { ProfileSidebar } from "../components/ProfileSidebar";
import RightSidebar from "../components/RightSidebar";
import MessageSection from "../components/MessageSection";
import MessageInfoSidebar from "../components/MessageInfoSidebar";
import { addUserRequest, setChatId, setUsers } from "../redux/userSlice";
import Peer from "simple-peer";
import {
  addChatList,
  setChatLoad,
  setChatObject,
  setChats,
  setHeaderToggle,
  setShowImg,
} from "../redux/chatSlice";
import LoadAnimate from "../components/LoadAnimate";
// import io from "socket.io-client";
import { toast } from "react-toastify";
import Setting from "../components/Setting";
import Privacy from "../components/privacy/Privacy";
import Notification from "../components/notification/Notification";
import Security from "../components/security/Security";
import ThemeModal from "../components/modals/ThemeModal";
import ChatWallpaper from "../components/chatWallpaper/ChatWallpaper";
import RequestAccount from "../components/requestAccount/RequestAccount";
import Help from "../components/help/Help";
import FriendPanel from "../components/friendPanel/FriendPanel";
import FriendRequest from "../components/friendRequestPanel/FriendRequest.jsx";
import CallPage from "./CallPage";
import { setCaller, setCallMode, setPeer } from "../redux/callSlice";
import CallAlert from "../components/modals/CallAlert";
import RingTone from "../audio/tecno.mp3";
// import StatusPage from './StatusPage'

// const END_POINT = process.env.REACT_APP_BACKEND_URL;
// const END_POINT = 'http://localhost:5000'

const ChatView = ({ socket }) => {
  const ringToneRef = useRef(null);
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const [leftToggleHeader, setLeftToggleHeader] = useState(false);
  //   const [socket, setSocket] = useState(io(END_POINT));
  const [notifications, setNotifications] = useState([]);

  const { chatId, user } = useSelector((state) => state.user);
  const { rightView, showTheme, leftView, themeBg } = useSelector(
    (state) => state.app
  );
  const { showGroupModal, showImg, chatLoading, headerToggle, chatList } =
    useSelector((state) => state.chat);
  const { callMode, receivingCall, caller, answered } = useSelector(
    (state) => state.call
  );

  console.log(answered, 'the answered state')

  useEffect(() => {
    let done = true;
    if (done) {
      const peer = new Peer({
        // initiator: true,
        trickle: false,
        channelName: user?._id,
      });
      dispatch(setPeer(peer));
    }

    return () => {
      done = false;
    };
  }, [user, dispatch]);

  useEffect(() => {
    socket.on("receive message", (newMessage) => {
      if (chatId !== newMessage.chat._id) {
        //send a notification to the user
        setNotifications([...notifications, newMessage]);
      }
    });
  });

  useEffect(() => {
    const userChats = async () => {
      dispatch(setChatLoad(true));
      const res = await makeRequest.get("/chat");
      dispatch(setChats(res.data));
      dispatch(setChatLoad(false));
    };
    userChats();
  }, [dispatch]);

  useEffect(() => {}, []);

  useEffect(() => {
    const getSingleChat = async () => {
      const res = await makeRequest.get(`/chat/chat/${chatId}`);
      setChatObject(res.data);
      dispatch(setChatObject(res.data));
    };
    if (chatId) {
      getSingleChat();
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    const getListUsers = async () => {
      try {
        const res = await makeRequest.get("/user/getUsers");
        // const reqs = await makeRequest.get("/user/get/request");
        dispatch(setUsers(res.data));
      } catch (error) {
        if (error?.response?.data?.name === "TokenExpiredError") {
          localStorage.removeItem("secretToken");
          toast.success("Token Expired, You will be logged out");
          window.location.href = "/";
        }
      }
    };
    getListUsers();
  }, [dispatch]);

  useEffect(() => {
    socket.on("notify friend request", (data) => {
      socket && dispatch(addUserRequest(data.data.requester));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    socket &&
      socket.on("receive delete request", (data) => {
        dispatch(setChats(chatList.filter((cl) => cl._id !== data.chatId)));
        if (chatId === data.chatId) {
          dispatch(setChatId(null));
        }
      });
  }, [socket, chatList, dispatch, chatId]);

  useEffect(() => {
    socket &&
      socket.on("chat creation feedback", (data) => {
        dispatch(addChatList(data.chat));
        console.log(data, "from new chat feed back");
      });
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("hey", (data) => {
      // console.log(data, "the hey");
      // dispatch(setReceivingCall(true));
      dispatch(setCaller(data));
      // dispatch(setCallSignal(data.signal));
    });

    socket.on("rejectedCall", () => {
      console.log(
        "call is rejected ooooooooooooooooooooooooooooooooooooooooooooo"
      );
      dispatch(setCallMode(false));
    });
  }, [dispatch, socket]);

  const closeAll = () => {
    if (leftToggleHeader) {
      setLeftToggleHeader(false);
    }
    if (showImg) {
      dispatch(setShowImg(false));
    }
    if (headerToggle) {
      dispatch(setHeaderToggle(false));
    }
  };

  if (chatLoading) {
    return <LoadAnimate />;
  }

  const handleTone = () => {
    if (caller) {
      ringToneRef?.current?.play();
    } else if(answered) {
      ringToneRef?.current?.pause();
    }else{
      ringToneRef?.current?.pause();
    }
  };

  handleTone()
  // linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
  // url('images/background.jpg')
  return (
    <>
      <div
        className="container"
        style={{ background: themeBg.bg, color: themeBg.color }}
        onClick={closeAll}
      >
        {showGroupModal && <GroupModal />}
        {showTheme && <ThemeModal />}
        {caller && <CallAlert socket={socket} />}
        {leftView === "setting" ? (
          <Setting />
        ) : leftView === "profile" ? (
          <ProfileSidebar />
        ) : leftView === "privacy" ? (
          <Privacy />
        ) : leftView === "notification" ? (
          <Notification />
        ) : leftView === "security" ? (
          <Security />
        ) : leftView === "chatWallpaper" ? (
          <ChatWallpaper />
        ) : leftView === "requestAccount" ? (
          <RequestAccount />
        ) : leftView === "help" ? (
          <Help />
        ) : leftView === "find friends" ? (
          <FriendPanel socket={socket} />
        ) : leftView === "see request" ? (
          <FriendRequest />
        ) : (
          <ChatSidebar
            setNotifications={setNotifications}
            notifications={notifications}
            socket={socket}
          />
        )}
        <div
          className="right"
          style={{
            flex: rightView !== null ? "50%" : "70%",
            zIndex: 23,
            background: themeBg.bg,
          }}
        >
          {chatId ? (
            <MessageSection
              notifications={notifications}
              setNotifications={setNotifications}
              socket={socket}
              user={user}
              setOpenProfile={setOpenProfile}
              openProfile={openProfile}
            />
          ) : (
            <>
              <div
                style={{
                  height: "calc(100%)",
                  width: "100%",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: themeBg.color, fontSize: 49 }}>
                  Welcome To Flimzy
                </h2>
                <p style={{ color: "white", opacity: 0.7, fontSize: 20 }}>
                  No chat is selected
                </p>
              </div>

              {/* <div className='right-container'>
            </div> */}
            </>
          )}
        </div>
        {rightView === "messageInfo" ? (
          <MessageInfoSidebar />
        ) : rightView === "profile" ? (
          <RightSidebar socket={socket} />
        ) : null}
      </div>
      {(callMode || receivingCall) && <CallPage socket={socket} />}
      {/* {l && <CallEnded socket={socket} />} */}
      <audio ref={ringToneRef} src={RingTone} />
    </>
  );
};

export default ChatView;
