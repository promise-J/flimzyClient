import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addChatList, setShowGroupModal } from "../../redux/chatSlice";
import { makeRequest } from "../../utils/apiCalls";
import "./modal.css";

const GroupModal = () => {
  const dispatch = useDispatch();
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { userList } = useSelector((state) => state.user);
  const { themeBg } = useSelector((state) => state.app);

  const addMembers = (user) => {
    if (!groupMembers.find((mem) => mem.id === user._id)) {
      setGroupMembers([
        ...groupMembers,
        { username: user.username, id: user._id },
      ]);
    } else {
      toast.error("User added already");
    }
  };

  const removeUser = (id) => {
    setGroupMembers(groupMembers.filter((mem) => mem.id !== id));
  };

  const alreadyAdded = (id) => {
    return groupMembers.find((mem) => mem.id === id);
  };

  const createGroup = async () => {
    if (groupName === "") {
      return toast.error("Please give the group a name");
    }
    if (groupMembers.length < 2) {
      return toast.error("Group must be at least 2 members");
    }
    const res = await makeRequest.post("/chat/group", {
      name: groupName,
      users: groupMembers.map((mem) => mem.id),
    });
    if (res.status === 200) {
      dispatch(setShowGroupModal(false));
      dispatch(addChatList(res.data));
      return toast.success(`Group ${groupName} created!`);
    }
  };

  return (
    <div
      className="group-modal"
      style={{
        background: themeBg.bg,
        padding: 15,
        height: 500,
        width: 500,
        position: "absolute",
        top: 50,
        left: "20%",
        boxShadow: "1px 1px 3px rgb(66, 65, 65)",
        zIndex: 40,
        borderRadius: 20,
      }}
    >
      <span
        onClick={() => dispatch(setShowGroupModal(false))}
        style={{
          cursor: "pointer",
          color: themeBg.color,
          opacity: 0.6,
          position: "absolute",
          top: 20,
          right: 25,
        }}
      >
        <MdOutlineCancel style={{ fontSize: 20 }} />{" "}
      </span>
      <h2 style={{ color: "gray", textAlign: "center", marginTop: 30 }}>
        ADD NEW GROUP
      </h2>
      <input
        type="text"
        onChange={(e) => setGroupName(e.target.value)}
        value={groupName}
        placeholder="Enter Group Name"
        style={{
          background: "transparent",
          width: "100%",
          padding: 8,
          border: "1px solid rgb(32, 50, 75)",
          outline: "none",
          color: "gray",
          fontSize: 16,
        }}
      />
      <div className="addedUser">
        {groupMembers.length < 1 ? (
          <p>Click atleast two users to create a group</p>
        ) : (
          groupMembers.map((member) => (
            <p key={member.id}>
              {member.username}{" "}
              <span onClick={() => removeUser(member.id)}>
                <MdOutlineCancel
                  style={{
                    fontSize: 20,
                    color: "white",
                    background: "red",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </p>
          ))
        )}
      </div>
      <div
        className="chatList"
        style={{
          border: "1px solid rgb(32, 50, 75)",
          height: "50%",
          width: "100%",
          marginTop: 10,
        }}
      >
        {userList.map((user) => (
          <li key={user._id}>
            {user?.username}{" "}
            {!alreadyAdded(user._id) ? (
              <span className="add" onClick={() => addMembers(user)}>
                add
              </span>
            ) : (
              <span className="remove" onClick={() => removeUser(user._id)}>
                Remove
              </span>
            )}
          </li>
        ))}
      </div>
      <button onClick={createGroup}>Create</button>
    </div>
  );
};

export default GroupModal;
