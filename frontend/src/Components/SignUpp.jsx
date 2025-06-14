import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { login, loginFailure, signup } from "../redux/actions";
// import logo from "../assets/images/41.SVG";
import { api } from "../helper/apis";
import axios from "axios";

export default function SignUpp() {
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState(true);
  const navigate = useNavigate();
  const switchTab = () => {
    setTab(!tab);
  };
  const dispatch = useDispatch();
  const [_email, _setEmail] = useState("");
  const [_password, _setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nin, setNin] = useState("");
  const [errorMessage_, setErrorMessage_] = useState("");
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login(_email, _password));
      if (loggedInUser || localStorage.getItem("access_token")) {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        // setErrorMessage("Incorrect username or password"); // Set error message for incorrect login
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${api}/auth/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone: phone,
        password: password,
        nin: nin,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data?.detail) {
          setErrorMessage_(data?.detail);
          // console.log("Sent", data);
        } else {
          navigate("/signup-message");
          // console.log(data);
        }
        // setErrorMessage_("");
      })
      .catch((error) => {
        console.error("Error...:", error);
      });
  };
  useEffect(() => {
    return () => {
      dispatch(loginFailure(null));
    };
  }, [dispatch]);
  return (
    <div className="mb-3">
      <Row className="m-0 mt-5">
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          {/* <h4 className="" style={{ fontWeight: 900, fontSize: 40 }}>
            wenyfour
          </h4> */}
          <div className="text-center mb-5">
            <a href="https://wenyfour.com">
              <img
                src="https://res.cloudinary.com/dx5ilizca/image/upload/v1700895319/Galaxy__2_-removebg-preview_w1jyje.png"
                alt="enyfour logo"
                style={{ width: 200 }}
              />
            </a>
          </div>
          <div className="d-flex justify-content-between" style={{ gap: 30 }}>
            <p className={tab ? "bold" : "not_bold"} onClick={switchTab}>
              Login
            </p>
            <p className={!tab ? "bold" : "not_bold"} onClick={switchTab}>
              Register
            </p>
            {/* {JSON.stringify(errorMessage_)} */}
          </div>
          {tab ? (
            <form onSubmit={handleLogin}>
              <div className="mt-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input_field"
                  id="email"
                  required
                  type="email"
                  value={_email}
                  onChange={(e) => _setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input_field"
                  id="password"
                  required
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  value={_password}
                  onChange={(e) => _setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p style={{ color: "red", fontSize: 13 }}>{errorMessage}</p>
              )}
              <div
                className="d-flex justify-content-between mt-3"
                style={{ fontSize: 13 }}
              >
                <label
                  className="m-0 d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input type="checkbox" onClick={handleTogglePassword} />
                  {showPassword ? "Hide" : "Show"} Password
                </label>
                <p
                  className="forgot_p m-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/forgotten-password")}
                >
                  Forgotten Password?
                </p>
              </div>
              {!loading ? (
                <button className="app_button auth mt-3 p-3">Sign In</button>
              ) : (
                <button className="app_button auth mt-3 p-3" disabled>
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
              )}
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              {/* {JSON.stringify(email + name + phone + password+ nin)} */}
              <Row>
                <Col md={6}>
                  <div className="mt-3">
                    <label className="label" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      className="input_field"
                      id="fullName"
                      required
                      type="text"
                      minLength={3}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mt-3">
                    <label className="label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="input_field"
                      id="phone"
                      required
                      type="tel"
                      minLength={9}
                      // pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="mt-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input_field"
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Row>
                <Col md={6}>
                  <div className="mt-3">
                    <label className="label" htmlFor="nin">
                      NIN
                    </label>
                    <input
                      className="input_field"
                      id="nin"
                      required
                      type="number"
                      value={nin}
                      onChange={(e) => setNin(e.target.value)}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mt-3">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="input_field"
                      id="password"
                      required
                      minLength={5}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Col>
                <label
                  className="m-0 mt-3 d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <input type="checkbox" onClick={handleTogglePassword} />
                  {showPassword ? "Hide" : "Show"} Password
                </label>
              </Row>
              {/* {JSON.stringify(errorMessage_ + "llll")} */}
              {errorMessage_ && (
                <p className="mt-3" style={{ color: "red", fontSize: 13 }}>
                  {"Registration failed: " + errorMessage_ + "!"}
                </p>
              )}
              <div className="mt-3">
                <p
                  className="forgot_p m-0"
                  style={{ color: "grey", fontSize: 12 }}
                >
                  {/* <input type="checkbox" /> */}
                  By clicking "Sign Up," you agree to our{" "}
                  <span style={{ color: "#0d6efd", cursor: "pointer" }}>
                    <a
                      style={{ textDecoration: "none" }}
                      rel="noreferrer"
                      target="_blank"
                      href="https://www.wenyfour.com/terms-and-conditions"
                    >
                      Terms and Conditions,{" "}
                    </a>
                    <a
                      style={{ textDecoration: "none" }}
                      rel="noreferrer"
                      target="_blank"
                      href="https://www.wenyfour.com/privacy-policy"
                    >
                      Privacy Policy, Cookies,{" "}
                    </a>
                  </span>
                  and SMS notifications, with the option to unsubscribe anytime.
                </p>
              </div>
              {!loading ? (
                <button className="app_button auth mt-3 p-3">Sign Up</button>
              ) : (
                <button className="app_button auth mt-3 p-3" disabled>
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
              )}
            </form>
          )}
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
      </Row>
    </div>
  );
}
