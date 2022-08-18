import React from "react";
import { BiArrowBack } from "react-icons/bi";
import {useDispatch, useSelector} from 'react-redux'
import { setLeftView } from "../../redux/appSlice";
import "./friendPanel.css";
import SingleFriendPanel from "./SingleFriendPanel";

const FriendPanel = ({socket}) => {
  const dispatch = useDispatch()
  const { userList } = useSelector((state) => state.user);

  return (
    <div className="friendPanel left">
      <div className="setting-header">
        <BiArrowBack
          className="icon"
          onClick={() => dispatch(setLeftView("chat"))}
          style={{ cursor: "pointer" }}
        />
        <h4>Find Friends</h4>
      </div>
      <div className="setting-header-offset"></div>
      <div className="friendPanel-body">
        {userList.map((user) => (
          <SingleFriendPanel user={user} key={user._id} socket={socket} />
        ))}
      </div>
    </div>
  );
};

export default FriendPanel;
