import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import profile from "../assets/images/profile.png";
import { api } from "../helper/apis";
import numeral from "numeral";
import icon from "../assets/images/path.png";
import { PiUsersFour } from "react-icons/pi";
import moment from "moment";
import { AiFillCar, AiOutlineUser } from "react-icons/ai";
import BackButton from "./BackButton";
export default function MyBookings() {
  const [loading, setLoading] = useState(false);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [rideDetails, setRideDetails] = useState([]);
  const [ridersArray, setRidersArray] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const userId = userData?.user_id;

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/rides/${userId}/ordered/ride`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          setLoading(false);
          // console.log(response?.data);
          setRideDetails(response?.data);
        })
        // Iterate through the response array

        .catch((err) => {
          setLoading(false);
          // console.log("error fetching ride data", err);
        });
    }
  }, []);

  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"My Bookings"}> */}
      <BackButton headingText={"My Bookings"} />
      <Row className="m-0">
        {/* {JSON.stringify(rideDetails)} */}
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
        {loading ? (
          <div
            class="text-center mt-5 d-flex align-items-center justify-content-center gap-2"
            style={{ color: "#0d6efd" }}
          >
            <span
              style={{ width: "2rem", height: "2rem" }}
              class="spinner-border"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        ) : (
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            {/* {JSON.stringify(rideDetails)} */}
            {/* {JSON.stringify(ridersArray)} */}
            {rideDetails.map((item, index) => (
              <div className="mt-5" key={index}>
                <div className="d-flex justify-content-between">
                  <p>
                    <b>{moment(item?.date).format("MMM DD, YYYY")}</b>
                  </p>

                  <p className="rides_avail">
                    <b style={{ color: "#0d6efd" }}>
                      ₦{numeral(item?.seat_price).format("0,0")}
                    </b>
                  </p>
                </div>
                <div>
                  {/* <Row>
                    <Col md={9} sm={10} xs={10}> */}
                  <div className="d-flex" style={{ gap: 10 }}>
                    <div>
                      <p className="rides_avail">
                        <b>
                          {moment(item?.time, "HH:mm:ss").format("HH:mm A")}
                        </b>
                      </p>
                    </div>
                    <div>
                      <img src={icon} style={{ width: 12 }} />
                    </div>
                    <div>
                      <p className="rides_avail">
                        <span style={{ color: "grey" }}>
                          {item?.pickup_location},
                        </span>{" "}
                        {item?.from_location}
                      </p>
                      <p className="rides_avail">
                        <span style={{ color: "grey" }}>
                          {item?.dropoff_location},
                        </span>{" "}
                        {item?.to_location}
                      </p>
                    </div>
                  </div>
                  {/* </Col>
                    <Col md={3} sm={2} xs={2} className=""></Col>
                  </Row> */}

                  <div className="divider mb-3"></div>
                  <div className="car_info_div">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <AiFillCar
                        color="#0D6EFD"
                        size="1.5rem"
                        className="m-0"
                      />
                      <p className="m-0">
                        <b>Vehicle Info</b>
                      </p>
                    </div>
                    <p className="m-0" style={{ fontSize: 12 }}>
                      <span className="text-secondary" >
                        Model -{" "}
                      </span>
                      {item?.car_model}
                    </p>
                    <p className="m-0" style={{ fontSize: 12 }}>
                      <span className="text-secondary" >
                        Color -{" "}
                      </span>
                      {item?.car_color}
                    </p>
                    <p className="m-0" style={{ fontSize: 12 }}>
                      <span className="text-secondary" >
                        Type -{" "}
                      </span>
                      {item?.car_type}
                    </p>
                    {/* {ridersArray[0].map((item, index) => ( */}
                    {/*  */}
                    {/* // ))} */}
                    {/* {ridersArray.length === 0 ? (
                        <div className="text-center">
                          <p>
                            This ride has not been reserved by anyone so far.
                          </p>
                        </div>
                      ) : (
                        ""
                      )} */}
                  </div>
                  {/* <div className="divider mb-3 mt-3"></div> */}
                  {/* <div className="divider mb-3"></div> */}
                  <div className="car_info_div mt-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <AiOutlineUser
                        color="#0D6EFD"
                        size="1.5rem"
                        className="m-0"
                      />
                      <p className="m-0">
                        <b>Driver Info</b>
                      </p>
                    </div>
                    <p className="m-0" style={{ fontSize: 12 }}>
                      {" "}
                      <span className="text-secondary" >
                        Full Name -{" "}
                      </span>
                      {item?.driver_name}
                    </p>
                    <p className="m-0" style={{ fontSize: 12 }}>
                      {" "}
                      <span className="text-secondary" >
                        Phone Number -{" "}
                      </span>
                      {item?.driver_phone}
                    </p>
                    {/* {ridersArray[0].map((item, index) => ( */}
                    {/*  */}
                    {/* // ))} */}
                  </div>
                  {/* <div className="divider mb-3 mt-3"></div> */}
                  <hr style={{ marginTop: 50, marginBottom: 50 }} />
                </div>
              </div>
            ))}
            {rideDetails.length === 0 ? (
              <div className="text-center mt-3">
                <p>You did not order any ride yet.</p>
              </div>
            ) : (
              ""
            )}
          </Col>
        )}
        <Col xl={3} lg={3} md={3} sm={12} xs={12}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
