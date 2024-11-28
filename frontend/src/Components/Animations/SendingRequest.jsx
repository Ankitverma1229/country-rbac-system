import React from "react";
import "./sendingRequestStyle.css";

const SendingRequestAnimation = () => {
  return (
    <div className="sending-request-page bg-yellow-400">
      <div className="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="text-3xl">
        Sending Request for <i>Admin</i> Role....
      </h1>
    </div>
  );
};

export default SendingRequestAnimation;
