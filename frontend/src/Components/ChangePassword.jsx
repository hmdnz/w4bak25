import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../helper/apis";
import BackButton from "./BackButton";
export default function ChangePassword() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [cPEroor, setCPError] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const toggleModal = () => {
    setModal(!modal);
  };
  const formData = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [changeP, setChangeP] = useState(formData);

  const handleChange = (e) => {
    setChangeP({ ...changeP, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        `${api}/auth/users/reset/password`,
        {
          password: changeP.currentPassword,
          new_password: changeP.newPassword,
        },
        {
          headers: {
            "x-token": xtoken,
          },
        }
      )
      .then((response) => {
        console.log(response?.status);
        setLoading(false);
        toggleModal();
      })
      .catch((e) => {
        console.log(e);
        setCPError("Incorrect current password!");
        setLoading(false);
      });
  };

  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"Create vehicle"}> */}

      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <BackButton headingText={"Create vehicle"} />
          <div className="mt-3">
            {/* {JSON.stringify(changeP)} */}
            {/* {JSON.stringify(xtoken)} */}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={12} className="mt-3">
                  <label className="label">Current password</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="password"
                    name="currentPassword"
                    value={changeP.currentPassword}
                    onChange={handleChange}
                  />
                  {loading ? (
                    <p style={{ fontSize: 12 }} className="text-danger">
                      {cPEroor}
                    </p>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={12} className="mt-3">
                  <label className="label">New password</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="password"
                    name="newPassword"
                    value={changeP.newPassword}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={12} className="mt-3">
                  <label className="label">Confirm new password</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="password"
                    name="confirmNewPassword"
                    value={changeP.confirmNewPassword}
                    onChange={handleChange}
                  />
                </Col>

                <div className="text-center mt-3">
                  {changeP.newPassword !== changeP.confirmNewPassword ||
                  changeP.newPassword === "" ||
                  changeP.confirmNewPassword === "" ? (
                    ""
                  ) : (
                    <>
                      {loading ? (
                        <button
                          disabled={loading}
                          className="app_button p-3"
                          style={{ width: "100%" }}
                        >
                          <div
                            class="text-centerd-flex align-items-center justify-content-center gap-2"
                            style={{ color: "white" }}
                          >
                            <span
                              style={{ width: "1rem", height: "1rem" }}
                              class="spinner-border"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </div>
                        </button>
                      ) : (
                        <button
                          className="app_button p-3"
                          style={{ width: "100%" }}
                        >
                          Save
                        </button>
                      )}
                    </>
                  )}
                </div>
              </Row>
            </form>
          </div>
          <Modal size="sm" isOpen={modal}>
            <div className="p-3 text-center">
              <p className="small">Password changed successfully.</p>
              <button
                className="app_button"
                onClick={() => navigate("/settings")}
              >
                OK
              </button>
            </div>
          </Modal>
        </Col>
        <Col md={4}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
