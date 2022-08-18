import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLeftView } from "../../redux/appSlice";
import SecurityImg from "../../images/security.png";
import "./security.css";

const Security = () => {
  const dispatch = useDispatch();
  const { themeBg } = useSelector((state) => state.app);
  return (
    <div className="left setting">
      <div className="setting-header">
        <BiArrowBack
          className="icon"
          onClick={() => dispatch(setLeftView("setting"))}
          style={{ cursor: "pointer" }}
        />
        <h4>Security</h4>
      </div>
      <div className="setting-header-offset"></div>
      <img
        src={SecurityImg}
        alt=".."
        style={{ height: 130, width: 130, margin: "5px 0px 5px 150px" }}
      />
      <p
        style={{
          margin: "16px 20px",
          fontSize: 17,
          color: themeBg.color,
          lineHeight: 1.6,
        }}
      >
        Messages and call in end-to-end encrypted stay between you and the
        people you choose. Not even WhatsApp can read or listen to them.{" "}
        <span style={{ color: themeBg.color }}>Learn more</span>
      </p>
      <div className="security-details">
        <input type="checkbox" />
        <div className="security-detail">
          <span>Show security notification on this computer</span>
          <span>
            Get notified when security code changes for a contact's phone. If
            you have multiple devices, this settings must be enabled on the
            device where you want to get notification.{" "}
            <span style={{ color: themeBg.color, fontSize: 14 }}>
              Learn more
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Security;
