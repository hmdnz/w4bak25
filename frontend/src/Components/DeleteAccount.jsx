import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { api } from "../helper/apis";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/actions";
import axios from "axios";
import BackButton from "./BackButton";
export default function DeleteAccount() {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const handleDelete = () => {
    if (xtoken) {
      setLoading(true);
      try {
        axios
          .delete(`${api}/auth/users/${loggedInUser?.user_id}/delete`, {
            headers: {
              "x-token": xtoken,
            },
          })
          .then((response) => {
            // console.log(response);
            setLoading(false);
            if (response.error) {
              console.log(error);
            } else {
              const keysToRemove = ["access_token", "user_data"];
              // Loop through the keys and remove each item
              keysToRemove.forEach((key) => {
                localStorage.removeItem(key);
              });
              localStorage.removeItem("access_token");
              if (!localStorage.getItem("access_token" && "user_data")) {
                navigate("/auth");
                window.location.reload();
              }
            }
          });
      } catch (error) {
        4;
        console.log(error);
      }
    }
  };
  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"Delete Account"}> */}
      <BackButton headingText={"Delete Account"} />
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-3">
            <div className="mt-4">
              <p style={{ fontSize: 14 }}>
                {/* {JSON.stringify(xtoken)} */}
                Are you sure want to delete your account?
              </p>
              <b style={{ fontSize: 14 }}>Please consider the following</b>
              <p style={{ fontSize: 14, margin: 0 }}>
                You'll lose access to your account and all data.
              </p>
              <p style={{ fontSize: 14 }}>
                Account recovery won't be possible.
              </p>
              <div>
                <label
                  htmlFor="confirmText"
                  className="label"
                  style={{ fontWeight: "bold" }}
                >
                  To confirm, type "Delete my account" in the box below
                </label>
                <input
                  id="confirmText"
                  type="text"
                  className="input_field mb-3"
                  onChange={(e) => setConfirmText(e.target.value)}
                  value={confirmText}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button className="app_button" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                {loading ? (
                  <button disabled={loading} className={"danger_button"}>
                    Deleting...
                  </button>
                ) : (
                  <button
                    disabled={confirmText !== "Delete my account"}
                    className={
                      confirmText === "Delete my account"
                        ? "danger_button"
                        : "inactive_danger_button"
                    }
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
