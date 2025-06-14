import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, restoreUserFromLocalStorage } from "../redux/actions";
import moment from "moment";
import { api } from "../helper/apis";
import { Col, Row } from "reactstrap";
import axios from "axios";
import { useQuery } from "../helpers/helpers";
import BackButton from "./BackButton";
export default function EditProfile() {
  const query = useQuery();
  const name = query.get(`name`);
  const email = query.get(`email`);
  const about = query.get(`about`);
  const date_of_birth = query.get(`dob`);
  const phone = query.get(`phone`);
  const initialFormData = {
    name: name,
    email: email,
    phone: phone,
    date_of_birth: date_of_birth,
    about: about,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  useEffect(() => {
    // Check localStorage for user data
    const userData = JSON.parse(localStorage.getItem("access_token"));
    if (userData) {
      // Dispatch loginSuccess action to restore user data
      const { email, access_token, token_type, name, user_id } = userData;
      dispatch(loginSuccess(email, access_token, token_type, name, user_id));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .put(`${api}/auth/users/${loggedInUser?.user_id}/update`, formData, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.error) {
            alert(error);
          } else {
            navigate("/profile");
            // console.log(response);
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="p-3 mt-5">
      {/* <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Edit profile
      </h4> */}
      <BackButton headingText={"Edit profile"} />
      <form onSubmit={handleSubmit}>
        {/* {JSON.stringify(formData)} */}
        <Row>
          <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
          <Col xl={4} lg={4} md={4} sm={12} xs={12}>
            <Row>
              <Col md={12} className="mt-3">
                <label className="label">Name</label>
                <input
                  className="input_field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Col>
              {/* <Col md={12} className="mt-3">
                <label className="label">Email</label>
                <input
                  className="input_field"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col> */}
              <Col md={12} className="mt-3">
                <label className="label">Phone</label>
                <input
                  className="input_field"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={12} className="mt-3">
                <label className="label">DOB</label>
                <input
                  className="input_field"
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={12} className="mt-3">
                <label className="label">About</label>
                <textarea
                  style={{ resize: "none" }}
                  name="about"
                  className="input_field"
                  id=""
                  value={formData.about}
                  onChange={handleChange}
                  cols="20"
                  rows="5"
                ></textarea>
              </Col>
              <div className="mt-3">
                {loading ? (
                  <button
                    className="app_button p-3"
                    style={{ width: "100%" }}
                    disabled
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
                  <button className="app_button p-3" style={{ width: "100%" }}>
                    Save
                  </button>
                )}
              </div>
            </Row>
          </Col>
        </Row>
      </form>

      {/* <div className="m-0 text-center mt-3"></div> */}
    </div>
  );
}
