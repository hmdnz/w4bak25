import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";
import BackButton from "./BackButton";

export default function YourRides() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [rides, setRides] = useState([]);

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/rides/published/rides`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // Modify dates before setting the state
          const modifiedRides = response.data.map((obj) => {
            const parts = obj.date.split("-");
            obj.date = parts[0] + "-" + parts[2] + "-" + parts[1];
            return obj;
          });

          setRides(modifiedRides);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, []);

  rides.forEach((obj) => {
    const parts = obj.date.split("-");
    obj.date = parts[0] + "-" + parts[2] + "-" + parts[1];
  });

  return (
    <div className="p-3 mt-5">
      {/* <h4
        className="text-center page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Published rides
      </h4> */}
      <BackButton headingText={"Published rides"} />
      <Row className="">
        <Col md={3}></Col>
        <Col md={6}>
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
            <>
              {/* {JSON.stringify(rides)} */}
              {rides?.map((item, index) => (
                <Card
                  key={index}
                  className="mb-3 mt-3 results_card shadow-sm p-3"
                  onClick={() => navigate(`/ride-requests?ride_id=${item?.id}`)}
                >
                  <div className="d-flex justify-content-between">
                    <p className="rides_avail" style={{ float: "right" }}>
                      <b>N{item?.seat_price}</b>
                    </p>
                    <p>
                      <b>{moment(item?.date).format("DD MMMM")}</b>
                    </p>
                  </div>
                  <div className="d-flex" style={{ gap: 10 }}>
                    <div>
                      <p className="rides_avail">
                        <b>
                          {moment(item?.time, "HH:mm:ss").format("HH:mm A")}
                        </b>
                      </p>

                      {/* <p className="rides_avail">12:30 AM</p> */}
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
                </Card>
              ))}
              {rides.length === 0 ? (
                <div className="text-center mt-5 mb-5">
                  <span className="">
                    You don't have any published ride(s) yet
                  </span>

                  <div className="text-center mt-5">
                    <button
                      className="app_button p-3"
                      onClick={() => navigate("/create-new-car")}
                    >
                      Publish a ride
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
