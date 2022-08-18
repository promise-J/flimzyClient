import React, { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { ImBlocked } from "react-icons/im";
import { MdDelete, MdNotifications } from "react-icons/md";
import { RiThumbDownLine } from "react-icons/ri";
import { TbCircleDotted } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { BsToggleOff } from "react-icons/bs";
import { BiLockAlt } from "react-icons/bi";
import ProfilePic from "../images/profileBlank.png";
import { useDispatch, useSelector } from "react-redux";
import { setRightView } from "../redux/appSlice";
import { makeRequest } from "../utils/apiCalls";
import { setChatId, setUserFriends } from "../redux/userSlice";
import { toast } from "react-toastify";
import { setChats } from "../redux/chatSlice";
// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const RightSidebar = ({socket}) => {
  const dispatch = useDispatch();
  const { rightView } = useSelector((state) => state.app);
  const { chatId, user: currentUser, userFriends } = useSelector((state) => state.user);
  const { chatList, chatObject } = useSelector((state) => state.chat);

  const [otherUser, setOtherUser] = useState("");
  // const PF = REACT_APP_BACKEND_URL

  useEffect(() => {
    if (!chatObject?.isGroup) {
      setOtherUser(
        chatObject.users
          .map((usr) => usr._id)
          .filter((s) => s !== currentUser._id)[0]
      );
    }
  }, [chatObject, currentUser?._id]);

  const deleteChat = async (chatId) => {
    try {
      await makeRequest.delete(`/chat/${chatId}?userId=${otherUser}`);
      const newList = chatList.filter((cl) => cl._id !== chatId);
      dispatch(setChats(newList));
      toast.success("Chat Deleted");
      dispatch(setUserFriends(userFriends.filter(usr=> usr !== otherUser)))
      socket.emit('delete chat', {otherUser, currentUser: currentUser._id, chatId})
      dispatch(setRightView(null));
      dispatch(setChatId(null));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(chatObject.users.map(usr=> usr._id).filter(s=> s!==currentUser._id)[0], 'the object',currentUser._id)

  const groupName = () => {
    if (!chatObject?.isGroup) {
      return chatObject?.users.filter(
        (user) => user.username !== currentUser?.username
      )[0];
    } else {
      return chatObject?.chatName;
    }
  };

  return (
    <div
      className="sidebar"
      style={{ display: rightView === "profile" ? "block" : "none" }}
    >
      <div className="sidebar-header">
        <span
          className="sidebar-cancel"
          onClick={() => dispatch(setRightView(null))}
        >
          x
        </span>
        <span className="sidebar-header-info">Contact Info</span>
      </div>
      <div className="sidebar-first">
        <img
          src={chatObject?.isGroup ? ProfilePic : groupName()?.picture}
          alt=""
        />
        <h2>{groupName()?.username}</h2>
        <p>08129493748</p>
      </div>
      <div className="sidebar-second">
        <span>about</span>
        <p>Chat only, no calls please</p>
      </div>
      <div className="sidebar-third">
        <FiStar />
        <span>Starred Messages</span>
        <IoIosArrowForward
          style={{ position: "absolute", top: 30, right: 20 }}
        />
      </div>
      <div className="sidebar-fourth">
        <MdNotifications />
        <span style={{ marginLeft: 20 }}>Mute Notifications</span>
        <BsToggleOff
          style={{ position: "absolute", top: 30, right: 40, fontSize: 24 }}
        />
      </div>
      <div className="sidebar-fifth">
        <TbCircleDotted />
        <div>
          <h5>Disappearing Messages</h5>
          <span>Off</span>
        </div>
        <IoIosArrowForward
          style={{ position: "absolute", top: 30, right: 20 }}
        />
      </div>
      <div
        className="sidebar-fifth"
        style={{ borderBottom: "10px solid rgb(20, 20, 20)" }}
      >
        <BiLockAlt />
        <div>
          <h5>Encryption</h5>
          <span style={{ fontSize: 13 }}>
            Messages are end-to-end encrypted. Click here to verify
          </span>
        </div>
      </div>
      <div className="sidebar-sixth">
        <ImBlocked />
        <h5>Block {groupName()?.username}</h5>
      </div>
      <div
        className="sidebar-sixth"
        style={{ borderBottom: "10px solid rgb(20, 20, 20)" }}
      >
        <RiThumbDownLine />
        <h5>Report {groupName()?.username}</h5>
      </div>
      <div
        className="sidebar-sixth"
        style={{ borderBottom: "70px solid rgb(20, 20, 20)" }}
      >
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => deleteChat(chatId)}
        />
        <h5>Delete {groupName()?.username}</h5>
      </div>
    </div>
  );
};

export default RightSidebar;
