import React from "react";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";

function NoInternet() {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <MdSignalWifiStatusbarConnectedNoInternet1 size={"6rem"} />
      <div className="text-center">
        <h3>Connect to the Internet</h3>
        <p>You're offline. Check your connection.</p>
      </div>
      <button className="app_button" onClick={() => window.location.reload()}>
        Retry
      </button>
      <div className="internet" style={{ zIndex: 1 }}>
        <p className="m-0">No Internet connection</p>
      </div>
    </div>
  );
}

export default NoInternet;
