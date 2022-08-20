import React, { useEffect, useState } from "react";
import ProfilePic from "../images/profileBlank.png";
import { IoMdSearch } from "react-icons/io";
import { BiMicrophone } from "react-icons/bi";
import {
  MdAttachFile,
  MdCancel,
  MdDelete,
  MdOutlineClear,
  MdSend,
} from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { makeRequest } from "../utils/apiCalls";
import { FiStar } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { setRightView } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
// import { setNotifications } from '../redux/chatSlice'
import { setRepliedMessage, setSingleLoad } from "../redux/messageSlice";
// import { FaVideo } from 'react-icons/fa'
import EmojiPicker from "./EmojiPicker";
import MessageBody from "./MessageBody";
import { FcCancel } from "react-icons/fc";
import { setChatId } from "../redux/userSlice";
import axios from "axios";
import { FaVideo } from "react-icons/fa";
import { setCallMode, setPartnerId } from "../redux/callSlice";

const PF = process.env.REACT_APP_BACKEND_URL;

// import io from 'socket.io-client'

// import ScrollableFeed from 'react-scrollable-feed'

const MessageSection = ({ user, socket, setNotifications, notifications }) => {
  const dispatch = useDispatch();
  const { rightView, themeBg } = useSelector((state) => state.app);
  const { user: currentUser, chatId } = useSelector((state) => state.user);
  const { messageLoad, singleLoad, repliedMessage } = useSelector(
    (state) => state.message
  );
  const { chatObject, chatSwitch } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [labelAll, setLabelAll] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadImage, setUploadImage] = useState({
    img: null,
    imgPrev: "",
  });
  const [emojiMode, setEmojiMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    let done = true;
    if (done) {
      socket.on("typing", (data) => {
          console.log(data.chatId, chatId)
           data.chatId===chatId ? setIsTyping(true) : setIsTyping(false);
      });
      socket.on("stop typing", () => setIsTyping(false));
      socket.on("receive message", (newMessage) => {
        console.log(newMessage.chat._id === chatId);
        if (chatId === newMessage.chat._id) {
          setMessages([...messages, newMessage]);
        } else {
          console.log("not the same chat");
        }
      });
    }
    return () => {
      done = false;
    };
  },[chatId, messages, socket]);

  useEffect(()=>{
    setIsTyping(false)
  },[chatId])

  useEffect(() => {
    const getChatMessages = async () => {
      // setMsgLoad(true);
      const res = await makeRequest.get(`/message/${chatId}`);
      socket.emit("join room", chatId);
      setMessages(res.data);
      // setMsgLoad(false);
    };
    if (chatId) {
      getChatMessages();
    }
  }, [chatId, dispatch, messageLoad, socket]);

  const handleImgChange = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      setUploadImage({ img: null, imgPrev: "" });
      toast.error("File is too large");
    } else if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png"
    ) {
      toast.error("Image format not allowed");
      return setUploadImage({ imgPrev: "", img: null });
    } else {
      return setUploadImage({
        imgPrev: URL.createObjectURL(file),
        img: file,
      });
    }
  };

  useEffect(()=>{
  dispatch(setPartnerId(chatObject?.users?.filter((usr) => usr._id !== user._id)[0]._id));
  },[user, dispatch, chatObject])

  const submitMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    const formData = new FormData();
    formData.append("file", uploadImage?.img);
    console.log(uploadImage, "form data");
    try {
      let res;
      if (uploadImage.img) {
        const resImg = await axios.post(PF + "/img", formData);
        res = await makeRequest.post("/message", {
          chat: chatObject._id,
          content: message,
          replyMessage: repliedMessage?._id && repliedMessage?._id,
          img: resImg.data.secure_url,
          imgPrev: uploadImage.imgPrev,
        });
        setUploadImage({ img: null, imgPrev: "" });
      } else {
        res = await makeRequest.post("/message", {
          chat: chatObject._id,
          content: message,
          replyMessage: repliedMessage?._id && repliedMessage?._id,
        });
      }
      setMessages([...messages, res.data]);
      setMessage("");
      emojiMode && setEmojiMode(false);
      dispatch(setSingleLoad(!singleLoad));
      setReplyMode(false);
      dispatch(setRepliedMessage(null));
      socket && socket.emit("new message", res.data);
      socket && socket.emit("stop typing", chatObject, currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async () => {
    try {
      const res = await makeRequest.post("/message/delete", {
        messages: selectedLabel,
      });
      if (res.status === 200) {
        setMessages((messages) =>
          messages.filter((msg) => !selectedLabel.includes(msg._id))
        );
        setLabelAll(false);
        toast.success("Message Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const groupName = () => {
    if (!chatObject?.isGroup) {
      return chatObject?.users.filter(
        (user) => user.username !== currentUser?.username
      )[0]?.username;
    } else {
      return chatObject?.chatName;
    }
  };

  const getPicture = () => {
    const result = chatObject?.users.filter(
      (user) => user._id !== currentUser._id
    )[0].picture;
    return result;
  };

  return (
    <>
      <div
        className="right-header"
        style={{ background: themeBg.bg, color: themeBg.color }}
      >
        <div
          className="right-header-details"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setRightView("profile"))}
        >
          <img
            src={
              chatObject?.isGroup || !getPicture() ? ProfilePic : getPicture()
            }
            alt=""
          />
          <div className="right-header-detail">
            <span>{chatSwitch ? 'loading' : groupName()}</span>
            <span>{isTyping ? "typing" : ""}</span>
          </div>
        </div>
        <div className="right-header-icons" style={{ position: "relative" }}>
          <FaVideo onClick={()=> dispatch(setCallMode(true))} title='Start a video call' className='fa' />
          <input
            style={{
              background: themeBg.bg,
              color: themeBg.color,
              display: showSearch ? "block" : "none",
              outline: "none",
              border:
                themeBg.bg === "black" ? "white 1px gray" : "black 1px black",
              borderRadius: 10,
              padding: "4px 0 4px 27px",
            }}
            type="text"
            placeholder="Search messages"
            onChange={(e) => setSearchMessage(e.target.value)}
            value={searchMessage}
          />
          <IoMdSearch
            className="fa"
            style={{
              color: themeBg.color,
              position: showSearch && "absolute",
              left: showSearch && -10,
            }}
            onClick={() => setShowSearch(!showSearch)}
          />
          <FcCancel
            style={{ color: themeBg.color }}
            onClick={() => dispatch(setChatId(null))}
            className="fa"
          />
        </div>
      </div>
      {/* <ScrollableFeed> */}
      {!uploadImage?.img ? (
        <MessageBody
          searchMessage={searchMessage}
          labelAll={labelAll}
          setLabelAll={setLabelAll}
          messages={messages}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setMessages={setMessages}
          setReplyMode={setReplyMode}
        />
      ) : (
        <div style={{ position: "relative", width: "100%", height: "80%" }}>
          <MdCancel
            onClick={() =>
              setUploadImage({ sendImage: false, img: null, imgPrev: "" })
            }
            style={{
              position: "absolute",
              top: 50,
              left: 60,
              fontSize: 40,
              cursor: "pointer",
            }}
          />
          <img
            src={uploadImage.imgPrev}
            style={{ height: "100%", width: "90%", objectFit: "contain" }}
            alt="upload"
          />
        </div>
        // <MessageImgUpload setUploadImage={setUploadImage} uploadImage={uploadImage} />
      )}
      {!labelAll && !replyMode ? (
        <div
          className="right-input-section"
          style={{
            width: rightView !== null ? "46.4%" : "70%",
            borderTop:
              themeBg.bg === "black" ? "gray 1px solid" : "black 1px solid",
          }}
        >
          <BsEmojiSmile
            className="fa"
            onClick={() => setEmojiMode(!emojiMode)}
          />
          {emojiMode && <EmojiPicker className="fa" setMessage={setMessage} />}
          <label htmlFor="file">
            <MdAttachFile
              className="fa"
              style={{ transform: "rotate(45deg)" }}
            />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleImgChange}
          />
          <form
            onSubmit={submitMessage}
            style={{ background: themeBg.bg === "black" ? "white" : "black" }}
            className="input-section"
          >
            <input
              value={message}
              onChange={(e) => {
                e.target.value.length > 0 ? socket.emit("typing", chatObject, currentUser) : socket.emit('stop typing', chatObject, currentUser);
                setMessage(e.target.value);
              }}
              type="text"
              style={{
                // color: "white",
                color: themeBg.color === "black" ? "white" : "black",
                fontWeight: 600,
              }}
              placeholder="Type a message"
            />
            <span className="online"></span>
          </form>
          <MdSend
            onClick={submitMessage}
            className="fa"
            style={{ transform: "rotate(-45deg)" }}
          />
          <BiMicrophone className="fa" />
        </div>
      ) : replyMode ? (
        <div
          className="right-input-section"
          style={{
            width: rightView !== null ? "46.4%" : "70%",
            borderTop:
              themeBg.bg === "black" ? "gray 1px solid" : "black 1px solid",
          }}
        >
          <div
            style={{
              background: themeBg.bg,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              position: "absolute",
              width: "102.7%",
              left: 0,
              height: 70,
              bottom: 50,
            }}
          >
            <div
              style={{
                height: "76%",
                display: "flex",
                paddingLeft: 20,
                flexDirection: "column",
                borderLeft: "teal 7px solid",
                width: "88%",
                borderRadius: 7,
              }}
            >
              <b style={{ color: "teal" }}>
                {repliedMessage?.sender._id === user._id
                  ? "You"
                  : repliedMessage?.sender?.username}
              </b>
              <span style={{ color: themeBg.color, opacity: 0.9 }}>
                {repliedMessage?.content}
              </span>
            </div>
            <MdCancel
              onClick={() => setReplyMode(false)}
              style={{
                fontSize: 27,
                margin: "0px 20px",
                color: themeBg.color,
                cursor: "pointer",
              }}
            />
          </div>
          <BsEmojiSmile
            style={{ color: themeBg.color }}
            className="fa"
            onClick={() => setEmojiMode(!emojiMode)}
          />
          {emojiMode && (
            <EmojiPicker
              style={{ color: themeBg.color }}
              className="fa"
              setMessage={setMessage}
            />
          )}
          <MdAttachFile
            className="fa"
            style={{ transform: "rotate(45deg)", color: "black" }}
          />
          <form onSubmit={submitMessage} className="input-section">
            <input
              value={message}
              onChange={(e) => {
                socket.emit("typing", chatId);
                setMessage(e.target.value);
              }}
              type="text"
              style={{ color: themeBg.bg === "black" ? "white" : "black" }}
              placeholder="Type a message"
            />
            <span className="online"></span>
          </form>
          <MdSend
            onClick={submitMessage}
            className="fa"
            style={{ transform: "rotate(-45deg)" }}
          />
          <BiMicrophone style={{ color: themeBg.color }} className="fa" />
        </div>
      ) : (
        <div className="right-input-section label-details">
          <div className="left-label-details">
            <MdOutlineClear
              className="icon"
              onClick={() => {
                setLabelAll(false);
                setSelectedLabel([]);
              }}
            />
            <span>{selectedLabel.length} selected</span>
          </div>
          <div className="right-label-details">
            <MdDelete onClick={deleteMessage} className="icon" />
            <FiStar className="icon" />
            <RiShareForwardLine className="icon" />
          </div>
        </div>
      )}
      {/* </ScrollableFeed> */}
    </>
  );
};

export default MessageSection;
