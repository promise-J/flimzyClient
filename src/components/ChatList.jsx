import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatId } from "../redux/userSlice";
import ProfilePic from "../images/profileBlank.png";
import { makeRequest } from "../utils/apiCalls";
import { format } from "timeago.js";
import { setPopImg, setShowImg } from "../redux/chatSlice";
// import { setSelectedChatCompare } from '../redux/chatSlice'
// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ChatList = ({ chat, notifications, setNotifications }) => {
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { chatSwitch } = useSelector((state) => state.chat);
  const { singleLoad } = useSelector((state) => state.message);
  const [lastMsg, setLastMsg] = useState("");
  // const PF = REACT_APP_BACKEND_URL

  // useEffect(()=>{
  //     notifications.forEach(notif=>{
  //     })
  // },[chatNotif, notifications])
  // console.log(imgRef.current)

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await makeRequest.get(`/chat/messages/${chat._id}`);
        setLastMsg(res.data[res.data.length - 1].content);
      } catch (error) {
        console.log(error);
      }
    };
    let done = true;
    if (done) {
      getChat();
    }
    return ()=>{
        done = false
    }
  }, [singleLoad, chat, notifications]);

  const selectChat = (chatId) => {
    // dispatch(setChatSwitch(true))
    dispatch(setChatId(chatId));
    // dispatch(setChatSwitch(false))
    setNotifications(
      notifications.filter((notif) => notif.chat._id !== chat._id)
    );
  };

  const groupName = () => {
    if (!chat.isGroup) {
      return chat.users.filter((user) => user._id !== currentUser?._id)[0];
    } else {
      return chat.chatName;
    }
  };

  const formatDate = (data) =>
    new Intl.DateTimeFormat("default", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(data));

  const getTimeAgo = () => {
    const result = Math.floor(
      (new Date(Date.now()).getTime() - new Date(chat.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (result < 1) return { value: formatDate(chat.updatedAt), result };
    if (result > 1 && result < 3) {
      return { value: "yesterday", result };
    }
    if (result >= 3) return { value: format(chat.updatedAt), result };
  };

  const displayImg = () => {
    dispatch(setPopImg(imgRef.current.src));
    dispatch(setShowImg(true));
  };

  const displayNotif = () => {
    return notifications.filter((notif) => notif.chat._id === chat._id).length;
  };

  return (
    <div key={chat._id} className="left-header-chat">
      <span className="chat-time unseen">{getTimeAgo()?.value}</span>
      <div className="animate-chat">
        {/* <i className="fa fa-thumb-tack pin" aria-hidden="true"></i> */}
        {displayNotif() > 0 && (
          <span className="notif-message">{displayNotif()}</span>
        )}
        <i className="fa fa-angle-down" id="arrow-drop" aria-hidden="true"></i>
      </div>
      <img
        ref={imgRef}
        onClick={displayImg}
        src={chat.isGroup ? `${ProfilePic}` : `${groupName().picture}`}
        alt={groupName()?.username}
      />
      <div
        onClick={() => selectChat(chat._id)}
        className="left-header-chat-details"
      >
        <span className="chat-name">
          {chat.isGroup ? groupName() : groupName().username}
        </span>
        <div className="chat-snippet">
          <span className="last-message">
            {chatSwitch ? 'Loading' : lastMsg}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
