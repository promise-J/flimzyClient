import React from "react";
import { makeRequest } from "../../utils/apiCalls";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SingleFriendPanel = ({ user, socket }) => {
  const { userFriends } = useSelector((state) => state.user);

  const addChat = async (chatId, chatSender) => {
    try {
      // const res = await makeRequest.get(`/chat/${chatId}?chatSender=${chatSender}`)
      const res = await makeRequest.put(`/user/sendRequest/${chatId}`);
      if (res.status === 200) {
        socket.emit("send friend request", { chatId, data: res.data });
        toast.success(`Request sent to ${chatSender}`);
      } else {
        toast.info(`You already added ${chatSender}`);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="friendPanel-user">
      <img src={user?.picture} alt="" />
      <div className="friendPanel-user-about">
        <span style={{ fontWeight: 600, fontSize: 14 }}>{user?.username}</span>
        <span style={{ flex: 1, fontSize: 12 }}>{user?.about}</span>
        {userFriends.includes(user._id) ? (
          <span style={{ fontSize: 11 }}>Already Connected 🌟</span>
        ) : (
          <button onClick={() => addChat(user?._id, user?.username)}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleFriendPanel;
