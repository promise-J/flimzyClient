import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLeftView } from "../../redux/appSlice";
import { toast } from "react-toastify";
import { makeRequest } from "../../utils/apiCalls";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { addChatList } from "../../redux/chatSlice";
import { setUserRequest } from "../../redux/userSlice";
import { useState } from "react";

const FriendRequest = ({ socket }) => {
  const dispatch = useDispatch();
  const { userRequest, user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const addChat = async (chatId, chatSender) => {
    try {
      const res = await makeRequest.get(
        `/chat/${chatId}?chatSender=${chatSender}`
      );
      console.log(res.data, 'supposed chat created')
      if (res.status === 200) {
        setLoading(true);
        await makeRequest.put(`/user/populate/friend/${chatId}`);
        dispatch(addChatList(res.data));
        dispatch(
          setUserRequest(userRequest.filter((usr) => usr._id !== chatId))
        );
        dispatch(setLeftView("chat"));
        socket && socket.emit("chat created", { chat: res.data, user: user._id });
        setLoading(false);
        toast.success("Connection created");
        socket && socket.emit("request accepted", chatId);
      } else {
        toast.info(`You already added ${chatSender}`);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const removeChat = async (chatId) => {
    try {
      const res = await makeRequest.put(`/user/rejectRequest/${chatId}`);
      dispatch(setUserRequest(userRequest.filter((usr) => usr._id !== chatId)));
      if (res.status === 200) {
        // dispatch(addChatList(res.data))
        toast.success("Request Rejected");
      } else {
        toast.info(`You already`);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="friendPanel left">
      <div className="setting-header">
        <BiArrowBack
          className="icon"
          onClick={() => dispatch(setLeftView("chat"))}
          style={{ cursor: "pointer" }}
        />
        <h4>See Friend Request</h4>
      </div>
      <div className="setting-header-offset"></div>
      <div className="friendPanel-body">
        {userRequest.map((user) => (
          <div key={user?._id} className="friendPanel-user">
            <img src={user?.picture} alt="" />
            <div className="friendPanel-user-about">
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                {user?.username}
              </span>
              <span style={{ flex: 1, fontSize: 12 }}>{user?.about}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: 3,
                }}
              >
                {loading ? (
                  <p style={{fontSize: 10, animation: 'requestAction 1.2s infinite'}}>Please wait</p>
                ) : (
                  <>
                    <BsCheck2Circle
                      className="act"
                      onClick={() => addChat(user?._id, user?.username)}
                    />
                    <MdOutlineCancel
                      className="act"
                      style={{ color: "red" }}
                      onClick={() => removeChat(user?._id)}
                    />
                  </>
                )}
              </div>
              {/* <button onClick={() => addChat(user?._id, user?.username)}>
                Connect
              </button> */}
              {/* <span style={{ fontSize: 11 }}>Already Connected 🌟</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
