import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import profile from "../assets/images/profile.png";
import moment from "moment";
import BackButton from "./BackButton";
import { IoIosArrowForward } from "react-icons/io";

export default function Wallet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/transactions/${userData?.user_id}/transactions`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response?.data);
          setInvoices(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, []);
  return (
    <div className="p-3 mt-5">
      {/* <BackButton headingText={"Wallet"} /> */}
      <BackButton headingText={"Coming soon..."} />
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
        <Row className="m-0">
          {/* <Col md={3}></Col>
          <Col md={6}>
            <div className="text-center mt-3">
              <p>Set up your account to get paid by Wenyfour</p>
              <button className="app_button">Add account</button>
            </div>
            <Card className="mb-3 mt-3 results_card shadow-sm p-3">
              <div className="text-center">
                <p className="m-0 mt-3 text-secondary">Main balance</p>

                <h6 className="wal_bal">₦ 12,000</h6>
              </div>

              <p className="mt-5 small pay_des">
                Shoprite Kano to FUD Jigawa on May 12, 2024
              </p>
              <div className="">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={profile}
                        className="result profile"
                        alt="profile_pic"
                        style={{ marginRight: 20 }}
                      />
                    </div>
                    <div>
                      <p style={{ margin: 0 }}>Yasir Yakasai</p>
                      <p style={{ color: "grey", fontSize: 12, margin: 0 }}>
                        ysquare.theimperial@gmail.com
                      </p>
                      <p
                        className="m-0"
                        style={{ color: "grey", fontSize: 12, margin: 0 }}
                      >
                        +2349018661696
                      </p>
                    </div>
                  </div>
                  <div>
                    <b>₦6,000</b>
                  </div>
                </div>
                <hr className="hr" />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={profile}
                        className="result profile"
                        alt="profile_pic"
                        style={{ marginRight: 20 }}
                      />
                    </div>
                    <div>
                      <p style={{ margin: 0 }}>Yasir Yakasai</p>
                      <p style={{ color: "grey", fontSize: 12, margin: 0 }}>
                        ysquare.theimperial@gmail.com
                      </p>
                      <p
                        className="m-0"
                        style={{ color: "grey", fontSize: 12, margin: 0 }}
                      >
                        +2349018661696
                      </p>
                    </div>
                  </div>
                  <div>
                    <b>₦6,000</b>
                  </div>
                </div>
                <hr className="hr" />
              </div>
              <div className="text-center mt-3">
                <button className="app_button">Edit account</button>
              </div>
            </Card>
          </Col>
          <Col md={3}></Col> */}
        </Row>
      )}
    </div>
  );
}
