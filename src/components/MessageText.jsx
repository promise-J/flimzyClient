import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRightView } from "../redux/appSlice";
import { setRepliedMessage, setSelectedMessage } from "../redux/messageSlice";
import { makeRequest } from "../utils/apiCalls";

const MessageText = ({
  msg,
  labelAll,
  setLabelAll,
  selectedLabel,
  setSelectedLabel,
  setMessages,
  setReplyMode,
  replyMode,
}) => {
  const { user } = useSelector((state) => state.user);
  // const { themeBg } = useSelector(state => state.app)
  const [msgOption, setMsgOption] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.onclick = (e) => {
      // console.log(e.target['class'], msgOption, 'from window')
      // msgOption && setMsgOption(false)
    };
  }, [msgOption]);

  const addToLabel = (e, id) => {
    if (e.target.checked) {
      if (selectedLabel.includes(id)) {
        setSelectedLabel((state) => state.filter((sid) => sid !== id));
      } else {
        setSelectedLabel((state) => [...state, id]);
      }
    } else {
      setSelectedLabel((state) => state.filter((sid) => sid !== id));
    }
  };

  const formatDate = (data) =>
    new Intl.DateTimeFormat("default", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(data));

  const deleteMessage = async (id) => {
    try {
      const res = await makeRequest.post("/message/delete", { message: id });
      if (res.status === 200) {
        setMessages((messages) => messages.filter((msg) => msg._id !== id));
        setLabelAll(false);
        toast.success("Message Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={msg._id}
      className={
        user._id === msg.sender._id ? "message-box own" : "message-box other"
      }
      style={{ width: labelAll ? "100%" : "fit-content" }}
    >
      <img
        style={{
          height: 18,
          width: 18,
          borderRadius: "50%",
          position: "absolute",
          bottom: 0,
          right: user._id === msg.sender._id && -15,
          left: user._id !== msg.sender._id && -15,
        }}
        src={user._id === msg.sender._id ? user?.picture : msg.sender.picture}
        alt="pro"
      />
      {msg?.replyMessage && (
        <div
          style={{
            background: "rgb(34, 56, 66)",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: 12,
            borderRadius: 8,
            borderLeft: "teal 6px solid",
            height: 50,
            width: "fit-content",
            margin: 5,
          }}
        >
          <b>{msg?.replyMessage?.sender?.username}</b>
          <i style={{ margin: "-10px 0" }}>{msg?.replyMessage?.content}</i>
        </div>
      )}
      {labelAll && (
        <input
          onChange={(e) => addToLabel(e, msg._id)}
          className="checkLabel"
          type="checkbox"
        />
      )}
      <div style={{ padding: 4 }}>
        <i
          onClick={() => {
            setMsgOption(true);
            labelAll && setLabelAll(false);
          }}
          className="fa fa-angle-down"
          id="arrow-drop"
          aria-hidden="true"
        ></i>
        {msgOption && (
          <div
            className="message-pop"
            style={{
              left: user._id === msg.sender._id && -130,
              right: user._id !== msg.sender._id && -130,
              top: -50,
            }}
          >
            <MdOutlineCancel
              className="icon"
              onClick={() => {
                setMsgOption(false);
              }}
            />
            <li
              onClick={() => {
                dispatch(setSelectedMessage(msg));
                dispatch(setRightView("messageInfo"));
                setMsgOption(false);
              }}
            >
              Message info
            </li>
            <li
              onClick={() => {
                setReplyMode(true);
                dispatch(setRepliedMessage(msg));
                setMsgOption(false);
              }}
            >
              Reply
            </li>
            <li
              onClick={() => {
                setLabelAll(true);
                setMsgOption(false);
              }}
            >
              Edit label
            </li>
            <li onClick={() => deleteMessage(msg._id)}>Delete</li>
          </div>
        )}
      </div>
      {msg.img && (
        <img style={{ width: "100%", borderRadius: 10 }} src={msg.img} alt="hope" />
      )}
      {msg.content}
      <span style={{ marginBottom: 5, fontSize: 9 }}>
        {formatDate(msg.createdAt)}
      </span>
    </div>
  );
};

export default MessageText;
