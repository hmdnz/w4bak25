import React from "react";
import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const routeTo = useNavigate();
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      {/* <MdSignalWifiStatusbarConnectedNoInternet1 size={"6rem"} /> */}
      <div className="text-center">
        <h1 style={{ fontSize: "100px", fontWeight: "bold" }}>OOPS!</h1>
        <h3>404 - Page Not Found.</h3>
        <p>
          The page you are looking does not exist. <br />
          If you think something is broken, report a problem.
        </p>
      </div>
      <button className="app_button" onClick={() => routeTo("/")}>
        Return Home
      </button>
    </div>
  );
}

export default NotFound;
