import axios from "axios";
import { useState } from "react";
import { Col, Modal, Row } from "reactstrap";
import { api } from "../helper/apis";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/wenyfour-black.PNG";
export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${api}/auth/users/forgot/password/reset`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response?.data?.message === "User data unchanged") {
          setEmailError("User with this email doest not exist!");
        } else {
          toggleModal();
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="text-center mt-5">
        <img
          src="https://res.cloudinary.com/dx5ilizca/image/upload/v1700895319/Galaxy__2_-removebg-preview_w1jyje.png"
          alt="Wenyfour logo"
          style={{ width: 200 }}
        />
        <h4
          className="page_title text-center mt-4"
          style={{ fontWeight: 900, fontSize: 40 }}
        >
          New password
        </h4>
      </div>
      {/* <CompHeader header={"Verify your email"}> */}

      <Row className="m-0">
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-3">
            <p className="m-0" style={{ fontWeight: "" }}>
              Please provide the email linked to your account and a new
              password.
            </p>
          </div>
          <div>
            {/* {JSON.stringify(email + password + cPassword)} */}
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label className="label">Email</label>
                <input
                  required
                  minLength={2}
                  className="input_field"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label">New password</label>
                <input
                  required
                  minLength={2}
                  className="input_field"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label">Confirm new password</label>
                <input
                  required
                  minLength={2}
                  className="input_field"
                  type="password"
                  name="cPassword"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <p style={{ fontSize: 12 }} className="text-danger">
                {emailError}
              </p>

              <div className="text-center mt-3">
                {password !== cPassword ||
                password === "" ||
                cPassword === "" ? (
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
            </form>
          </div>
        </Col>
        <Col md={4}></Col>
        <Modal size="sm" isOpen={modal}>
          <div className="p-3 text-center">
            <p className="small">New password created successfully.</p>
            <button className="app_button" onClick={() => navigate("/auth")}>
              Login
            </button>
          </div>
        </Modal>
      </Row>
    </>
  );
}
