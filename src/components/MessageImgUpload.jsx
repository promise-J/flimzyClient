import React from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const MessageImgUpload = ({ uploadImage, setUploadImage }) => {
  const { themeBg } = useSelector((state) => state.app);

  return (
    <div
      className="right-container"
      style={{
        background: themeBg.bg,
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "40px 0px 20px 0px",
      }}
    >
      <MdCancel
        // onClick={() => setUploadImage({ sendImage: false})}
        style={{
          position: "absolute",
          top: 25,
          left: 25,
          color: "white",
          fontSize: 35,
          cursor: "pointer",
        }}
      />
      <img
        style={{ height: 420, width: 450 }}
        src={uploadImage.imgPrev}
        alt="man"
      />
      {/* <input type="text" placeholder='Enter a comment' style={{width: '80%', padding: '15px', marginTop: 30, borderRadius: 10}} /> */}
      {/* <MdSend title='Send Image' style={{transform: 'rotate(-45deg)',color: 'white', position: 'absolute', bottom: 40, right: 40, fontSize: 44, cursor: 'pointer'}} /> */}
    </div>
  );
};

export default MessageImgUpload;
