import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Modal } from "reactstrap";
import { api } from "../helper/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BsArrowLeft, BsX, BsXCircleFill } from "react-icons/bs";
import BackButton from "./BackButton";
import numeral from "numeral";
import { nigeriaStates } from "./States";
import Places from "./Places";

export default function PublishRide() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const formData = {
    date: "",
    dropoff_location: "",
    from_location: "",
    gender: "",
    pickup_location: "",
    seat_price: "",
    seats: "",
    time: "",
    to_location: "",
    car_id: "",
  };
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState("");
  const [publishRide, setPublishRide] = useState(formData);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const navigate = useNavigate();

  const handleModal = () => {
    setModal(!modal);
  };

  const handleModal1 = (e) => {
    e.preventDefault();
    setModal1(!modal1);

    if (xtoken) {
      setLoading3(true);
      axios
        .get(`${api}/cars/${publishRide?.car_id}/car`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setCarName(response?.data?.brand);
          setLoading3(false);
        })
        .catch((err) => {
          setLoading3(false);
          // console.log("error fetching data", err);
        });
    }
  };

  const handleChange = (e) => {
    setPublishRide({ ...publishRide, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(publishRide);
    e.preventDefault();
    if (
      publishRide.car_id === "" ||
      publishRide.time === "" ||
      publishRide.seats == ""
    ) {
      alert("Please fill all the inputs!");
    } else {
      setLoading2(true);
      axios
        .post(
          `${api}/rides/create`,
          {
            date: moment(publishRide.date).format("YYYY-DD-MM"),
            dropoff_location: publishRide.dropoff_location,
            from_location: publishRide.from_location,
            gender: publishRide.gender,
            pickup_location: publishRide.pickup_location,
            seat_price: publishRide.seat_price,
            seats: publishRide.seats,
            time: publishRide.time,
            to_location: publishRide.to_location,
            car_id: publishRide.car_id,
          },
          {
            headers: {
              "x-token": xtoken,
            },
          }
        )
        .then((response) => {
          // console.log(response?.status);
          if (response?.status === 201) {
            navigate("/published-rides");
          }
          setLoading2(false);
        })
        .catch((e) => {
          // console.log(e);
          setLoading2(false);
        });
      // console.log(publishRide);
    }
  };

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/cars/check/user/cars`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response.data.status);
          if (response.data.status === false) {
            // navigate("/signup-message");
            handleModal();
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  }, []);

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/cars/user/all`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setCars(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  }, []);

  //Calculating max days
  function calculateMaxDate() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 7);

    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = maxDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  // Calculating min days
  function calculateMinDate() {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setDate(currentDate.getDate() - 0);

    // Ensure minimum day is 0
    if (minDate.getDate() < 0) {
      minDate.setDate(0);
    }

    const year = minDate.getFullYear();
    let month = minDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = minDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  // const options = [];
  // for (let h = 0; h < 24; h++) {
  //   for (let m = 1; m < 60; m += 10) {
  //     const hour = (h < 10 ? "0" : "") + h;
  //     const minute = (m < 10 ? "0" : "") + m;
  //     const time = hour + ":" + minute;
  //     options.push(<option key={time}>{time}</option>);
  //   }
  // }

  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 10) {
      let hour = h % 12 || 12; // Convert 0 to 12
      const minute = (m < 10 ? "0" : "") + m;
      const ampm = h < 12 ? "AM" : "PM";
      hour = (hour < 10 ? "0" : "") + hour;
      const time = hour + ":" + minute + " " + ampm;
      options.push(<option key={time}>{time}</option>);
    }
  }

  return (
    <div className="p-3 mt-5">
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
          <BackButton headingText={"Publish a ride"} />
          {/* <Places /> */}
          {/* {JSON.stringify(publishRide)} */}
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
            <form onSubmit={handleModal1}>
              <div className="text-center">
                <p style={{ fontSize: 13, color: "#0d6efd" }}>
                  You can only publish ride 7 days ahead of your trip
                </p>
              </div>
              <Row>
                <Col md={6} className="mt-3">
                  {/* {JSON.stringify(cars)} */}
                  {/* {JSON.stringify(loggedInUser)} */}
                  <label className="label">When are you leaving?</label>

                  <input
                    className="input_field"
                    type="date"
                    min={calculateMinDate()}
                    max={calculateMaxDate()}
                    name="date"
                    value={publishRide.date}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Passenger's pickup time</label>

                  <input
                    className="input_field"
                    type="time"
                    name="time"
                    value={publishRide.time}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6} className="mt-3">
                  {/* <label className="label">Leaving from</label> */}
                  {/* <select
                    required
                    className="input_field"
                    name="from_location"
                    value={publishRide.from_location}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    {nigeriaStates.map((item, index) => (
                      <option>{item.name}</option>
                    ))}
                  </select> */}
                  <Places
                    label="Leaving from"
                    name="from_location"
                    value={publishRide.from_location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  {/* <label className="label">Going to</label> */}
                  {/* <select
                    required
                    className="input_field"
                    name="to_location"
                    value={publishRide.to_location}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    {nigeriaStates.map((item, index) => (
                      <option>{item.name}</option>
                    ))}
                  </select> */}
                  <Places
                    label="Going to"
                    name="to_location"
                    value={publishRide.to_location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Exact meeting point</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="pickup_location"
                    value={publishRide.pickup_location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Exact drop-off point</label>
                  <input
                    className="input_field"
                    required
                    type="text"
                    name="dropoff_location"
                    value={publishRide.dropoff_location}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6} className="mt-3">
                  <label className="label">Price per seat</label>
                  <input
                    className="input_field"
                    required
                    type="number"
                    name="seat_price"
                    value={publishRide.seat_price}
                    onChange={handleChange}
                  />
                  {/* <select
                    required
                    className="input_field"
                    name="seat_price"
                    value={publishRide.seat_price}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    {publishRide.from_location === "Jigawa" &&
                    publishRide.to_location === "Kano" ? (
                      <>
                    <option>1540</option>
                    </>
                    ) : publishRide.from_location === "Kano" &&
                      publishRide.to_location === "Jigawa" ? (
                      <>
                    <option>1540</option>
                    </>
                    ) : (
                      ""
                    )}
                    {publishRide.from_location === "Abuja" &&
                    publishRide.to_location === "Kano" ? (
                      <>
                        <option>7000</option>
                      </>
                    ) : publishRide.from_location === "Kano" &&
                      publishRide.to_location === "Abuja" ? (
                      <>
                        <option>7000</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select> */}
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Select a car</label>
                  <select
                    className="input_field"
                    name="car_id"
                    value={publishRide.car_id}
                    onChange={handleChange}
                  >
                    <option value="">-</option>
                    {cars.map((car) => (
                      <option value={car.id} key={car.id}>
                        {car.brand} {car.model}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Number of Seats</label>
                  <select
                    className="input_field"
                    name="seats"
                    value={publishRide.seats}
                    onChange={handleChange}
                  >
                    {publishRide.car_id &&
                    cars.find((car) => car.id === publishRide.car_id).c_type ===
                      "Sedan" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "SUV" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "Bus" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                      </>
                    ) : publishRide.car_id &&
                      cars.find((car) => car.id === publishRide.car_id)
                        .c_type === "Sports Car" ? (
                      <>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </Col>
                <div className="mt-3">
                  <button className="app_button p-3" style={{ width: "100%" }}>
                    Review
                  </button>
                </div>
              </Row>
            </form>
          )}
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12}></Col>
      </Row>
      <Modal size="sm" isOpen={modal}>
        <div className="p-3 text-center">
          <p className="small">You don't have registered car(s) yet.</p>

          <button
            className="app_button p-3"
            onClick={() => navigate("/create-new-car")}
          >
            Create one here
          </button>
        </div>
      </Modal>
      <Modal size="md" isOpen={modal1}>
        <div className="p-3">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <p className="m-0">
              <b>Please review your ride.</b>
            </p>
            <BsX className="back_button" size="2.5rem" onClick={handleModal1} />
          </div>
          <div>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Ride date
            </p>
            <p>{publishRide?.date}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Pickup time
            </p>
            <p>{publishRide?.time}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Leaving from
            </p>
            <p>{publishRide?.from_location}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Going to
            </p>
            <p>{publishRide?.to_location}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Meeting point
            </p>
            <p>{publishRide?.pickup_location}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Drop-off point
            </p>
            <p>{publishRide?.dropoff_location}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Price
            </p>
            <p>₦ {publishRide?.seat_price}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              Vehicle
            </p>
            {loading3 ? "..." : <p>{carName}</p>}
          </div>
          {loading2 ? (
            <button
              disabled={loading2}
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
              onClick={handleSubmit}
            >
              Publish
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
