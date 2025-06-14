import React, { useEffect, useState } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { Col, Row } from "reactstrap";
import icon from "../assets/images/path.png";
import profile from "../assets/images/profile.png";
import { AiFillCar, AiFillStar } from "react-icons/ai";
import { MdArrowForwardIos, MdAddCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
import axios from "axios";
import { api } from "../helper/apis";
import moment from "moment";
import numeral from "numeral";
import BackButton from "./BackButton";
export default function RideDetails() {
  const query = useQuery();
  const ride_id = query.get("id");
  const car_id = query.get("car_id");
  const driver_id = query.get("driver_id");
  const seats = query.get("seats");

  const [rideDetails, setRideDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [driverDetails, setDriverDetails] = useState({});

  const [loadingRideDetails, setLoadingRideDetails] = useState(false);
  const [loadingVehicleDetails, setLoadingVehicleDetails] = useState(false);
  const [loadingDriverDetails, setLoadingDriverDetails] = useState(false);

  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const navigate = useNavigate();

  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/
  const getRideDetails = () => {
    if (xtoken) {
      setLoadingRideDetails(true);
      axios
        .get(`${api}/rides/${ride_id}/ride`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response);
          setRideDetails(response?.data);
          setLoadingRideDetails(false);
        })
        .catch((err) => {
          setLoadingRideDetails(false);
          // console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getRideDetails();
  }, []);
  const getVehicleDetails = () => {
    if (xtoken) {
      setLoadingVehicleDetails(true);
      axios
        .get(`${api}/cars/${car_id}/car`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response);
          setVehicleDetails(response?.data);
          setLoadingVehicleDetails(false);
        })
        .catch((err) => {
          setLoadingVehicleDetails(false);
          // console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getVehicleDetails();
  }, []);

  const getDriverDetails = () => {
    if (xtoken) {
      setLoadingDriverDetails(true);
      axios
        .get(`${api}/auth/users/${driver_id}/user`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response);
          setDriverDetails(response?.data);
          setLoadingDriverDetails(false);
        })
        .catch((err) => {
          setLoadingDriverDetails(false);
          // console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getDriverDetails();
  }, []);

  if (rideDetails?.date) {
    const originalDate = rideDetails?.date;
    var parts = originalDate?.split("-");

    var rearrangedDate = parts[0] + "-" + parts[2] + "-" + parts[1];
  }
  return (
    <div className="p-3 mt-5">
      {/* {JSON.stringify(rideDetails)} */}
      {loadingRideDetails ? (
        <div className="text-center">
          <p>Loading ride date...</p>
        </div>
      ) : (
        // <h4
        //   className="text-center page_title"
        //   style={{ fontWeight: 900, fontSize: 40 }}
        // >
        //   {moment(rideDetails?.date).format("ddd, DD MMMM")}
        // </h4>
        <BackButton
          headingText={moment(rearrangedDate).format("ddd, MMMM DD")}
        />
      )}
      {/* {JSON.stringify(rideDetails?.date)} */}
      <Row className="mt-5">
        <Col md={3}></Col>
        <Col md={6} className="">
          {loadingRideDetails ? (
            <div className="text-center">
              <p>Loading ride details...</p>
            </div>
          ) : (
            <>
              <div className="d-flex" style={{ gap: 10 }}>
                <div>
                  <p style={{ fontWeight: "bold" }}>
                    {moment(rideDetails?.time, "HH:mm:ss").format("HH:mm A")}
                  </p>
                  {/* <p className="rides_avail">12:30 AM</p> */}
                </div>
                <div>
                  <img src={icon} style={{ width: 13 }} />
                </div>
                <div>
                  <p className="rides_avail">
                    {rideDetails?.pickup_location}, {rideDetails?.from_location}
                  </p>
                  <p className="rides_avail">
                    {rideDetails?.dropoff_location}, {rideDetails?.to_location}
                  </p>
                  {/* <p
                    className="rides_avail"
                    style={{ fontSize: 13, color: "" }}
                  >
                    {rideDetails?.to_location}
                  </p> */}
                </div>
              </div>
              <div className="divider"></div>
              <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <p className="m-0" style={{}}>
                  Total price for {seats} passenger(s)
                </p>
                <p className="m-0 rides_avail" style={{ fontWeight: 700 }}>
                  ₦{numeral(rideDetails?.seat_price * seats).format("0,0")}
                </p>
              </div>
            </>
          )}
          <div className="divider"></div>
          <div>
            {/* {JSON.stringify(driverDetails)} */}
            <Row className="mt-3">
              <Col md={12}>
                {loadingDriverDetails ? (
                  <div className="text-center">
                    <p>Loading driver details</p>
                  </div>
                ) : (
                  <>
                    <div
                      className="d-flex align-items-center justify-content-between ride_details_user"
                      onClick={() =>
                        navigate(
                          `/rider-profile?name=${driverDetails?.name}&email=${driverDetails?.phone}&phone=${driverDetails?.phone}&created_at=${driverDetails?.created_at}&dob=${driverDetails?.date_of_birth}&about=${driverDetails?.about}&picture=${driverDetails?.picture}`
                        )
                      }
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p className="m-0" style={{ fontWeight: "bold" }}>
                          {driverDetails?.name}{" "}
                        </p>
                        {/* <span className="">
                      <AiFillStar
                        color="#0D6EFD"
                        size="1.3rem"
                        className="m-0"
                      />{" "}
                      5/5 - 2 ratings
                    </span> */}
                      </div>
                      <div>
                        {driverDetails?.picture === null ? (
                          <img
                            src={profile}
                            className="result profile"
                            alt="profile_pic"
                            style={{ marginRight: 20 }}
                          />
                        ) : (
                          <img
                            src={driverDetails?.picture}
                            className="result profile"
                            alt="profile_pic"
                            style={{ marginRight: 20 }}
                          />
                        )}
                        <MdArrowForwardIos size="1.2rem" className="arrow" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="">
                        <BsShieldFillCheck
                          color="#0D6EFD"
                          size="1.3rem"
                          className="m-0"
                        />{" "}
                        Verified User
                      </span>
                    </div>
                    <hr className="hr" />
                    <div className="mt-3">
                      {/* <a href="tel:+1234567890">Call Us</a> */}
                      <span className="">
                        <MdAddCall
                          color="#0D6EFD"
                          size="1.3rem"
                          className="m-0"
                        />{" "}
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          href={`tel:${driverDetails?.phone}`}
                        >
                          Contact {driverDetails?.name}
                        </a>
                      </span>
                    </div>
                  </>
                )}
                <hr className="hr" />
                <div className="mt-3">
                  <span className="">
                    <AiFillCar color="#0D6EFD" size="1.3rem" className="m-0" />{" "}
                    {vehicleDetails?.brand} {vehicleDetails?.model} -{" "}
                    {vehicleDetails?.color}{" "}
                    <span className="text-secondary">
                      {vehicleDetails?.c_type}
                    </span>
                    <br />
                  </span>
                </div>
                <div className="divider mt-3"></div>
                <p
                  className="report_text mt-3"
                  onClick={() => navigate("/report-ride")}
                >
                  Report Ride
                </p>
                <div className="mt-3 text-center">
                  <button
                    className="app_button"
                    onClick={() =>
                      navigate(
                        `/book-ride?ride_id=${rideDetails?.id}&from=${rideDetails?.from_location}&pickup_from=${rideDetails?.pickup_location}&to=${rideDetails?.to_location}&drop_off_at=${rideDetails?.dropoff_location}&date=${rideDetails?.date}&time=${rideDetails?.time}&seats=${seats}&price=${rideDetails?.seat_price}`
                      )
                    }
                  >
                    Continue
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
