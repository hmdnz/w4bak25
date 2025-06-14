import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { BsPlus } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { PiCarSimpleLight } from "react-icons/pi";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/21.SVG";

import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useSelector } from "react-redux";

export default function NavigationMenu() {
  const [dropdown, setDropdown] = useState(false);

  //nav dropdown function
  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const loggedInUser = useSelector((state) => state?.auth?.user);

  const logout = () => {
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
  };

  const navigate = useNavigate();

  var data = localStorage.getItem("access_token");
  const parsedData = JSON.parse(data);
  const profilePicture = parsedData?.profile_picture;
  return (
    <div>
      <Row className="m-0 navbar_ shadow-sm">
        {/* {JSON.stringify(data)} */}
        <Col lg={3} md={3} sm={3} xs={3} className="d-flex align-items-center">
          <img
            className="mobile_logo"
            src="https://res.cloudinary.com/dx5ilizca/image/upload/v1700895319/Galaxy__2_-removebg-preview_w1jyje.png"
            onClick={() => navigate("/")}
            alt="Wenyfour logo"
            style={{ width: "10rem", cursor: "pointer" }}
          />
        </Col>
        <Col
          lg={9}
          md={9}
          sm={9}
          xs={9}
          className="d-flex align-items-center justify-content-end"
          style={{ gap: 10 }}
        >
          <button
            className="app_button pub_web"
            onClick={() => navigate(`/publish-ride`)}
          >
            Publish a ride
          </button>
          {/* <button
            className="app_button pub_mob"
            onClick={() => navigate(`/publish-ride`)}
          >
            <BsPlus />
          </button> */}

          <AiOutlineBell
            style={{ margin: 0, cursor: "pointer" }}
            size="1.6rem"
            className="notification_icon text-secondary"
          />
          <BsPlus
            style={{ margin: 0, cursor: "pointer" }}
            // size="1.6rem"
            className="publish_icon"
            onClick={() => navigate("/publish-ride")}
          />
          {profilePicture ? (
            <img
              src={profilePicture}
              className="result profile"
              alt="profile_pic"
              style={{ width: 30, cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
              className="result profile"
              alt="profile_pic"
              style={{ width: 30, cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
          )}
          <Dropdown
            className="profile_dropdown_body"
            toggle={showDropdown}
            isOpen={dropdown}
          >
            <DropdownToggle className="pb-4" data-toggle="dropdown" tag="span">
              <MdOutlineKeyboardArrowDown
                size={30}
                className="text-secondary"
                style={{ cursor: "pointer" }}
              />
            </DropdownToggle>
            <DropdownMenu className="shadow profile_dropdown p-3">
              <div
                onClick={() => {
                  navigate("/published-rides");
                  showDropdown();
                }}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>
                  {/* <PiCarSimpleLight className="text-secondary" /> */}
                  Published Rides{" "}
                </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <hr />
              <div
                onClick={() => {
                  navigate("/my-vehicles");
                  showDropdown();
                }}
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>
                  {/* <PiCarSimpleLight className="text-secondary" /> */}
                  My Vehicles{" "}
                </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                onClick={() => {
                  navigate("/my-bookings");
                  showDropdown();
                }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>My Bookings </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              {/* <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
              >
                <div>Chats </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div> */}
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/payments");
                  showDropdown();
                }}
              >
                <div>Payments </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/wallet");
                  showDropdown();
                }}
              >
                <div>Wallet </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={() => {
                  navigate("/settings");
                  showDropdown();
                }}
              >
                <div>
                  {/* <TbLogout className="text-secondary" /> */}
                  Settings{" "}
                </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div
                style={{ gap: 10 }}
                className="profile_drop_item d-flex justify-content-between align-items-center"
                onClick={logout}
              >
                <div>
                  {/* <TbLogout className="text-secondary" /> */}
                  Logout{" "}
                </div>
                <div>
                  <MdKeyboardArrowRight
                    size={30}
                    className="text-secondary"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
