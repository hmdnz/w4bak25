import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";
import BackButton from "./BackButton";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "../helpers/helpers";

export default function Invoice() {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    if (xtoken) {
      setLoading(true);
      axios
        .get(`${api}/transactions/${userData?.user_id}/transactions/${id}`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          console.log(response?.data);
          setInvoice(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error fetching data", err);
        });
    }
  }, []);
  const price = invoice?.amount / invoice?.seats;
  return (
    <div className="p-3 mt-5">
      <BackButton headingText={"Payment details"} />
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
          <Col md={3}></Col>
          <Col md={6}>
            <Card className="mb-3 mt-3 results_card shadow-sm p-3">
              {/* {JSON.stringify(invoice)} */}
              <div className="d-flex justify-content-between invoice_head">
                <div>
                  <img
                    src="https://res.cloudinary.com/dx5ilizca/image/upload/v1712325838/Galaxy__5_-removebg-preview_wqf14f.png"
                    alt="Wenyfour logo"
                    style={{ width: 150, marginTop: 50, margin: 10 }}
                  />
                </div>

                <div className="text-end text_">
                  <p className="m-0">Wenyfour</p>
                  {/* <p style={{ fontSize: 12 }} className="m-0">
                      45 Small Scale Industrial Layout <br />
                      Sharada, Kano, Nigeria <br />
                      +234 901 866 1696
                    </p> */}
                  <p style={{ fontSize: 12 }} className="m-0">
                    wenyfour@gmail.com
                  </p>
                </div>
              </div>
              <hr />
              <div className="p-3">
                <div>
                  <h5 className="mb-3">
                    <b>Invoice {invoice?.transactionid}</b>
                  </h5>
                  <h6>Invoiced to</h6>
                  <h6 className="m-0">{userData?.name}</h6>
                  <p className="small text-secondary">{userData?.email}</p>
                </div>
                <div>
                  <h6 className="m-0">Date</h6>
                  <p className="small text-secondary">
                    {" "}
                    {moment(invoice?.timestamp).format("D/M/YYYY")}
                  </p>
                </div>
                {/* <Table className="mt-5" bordered responsiveF>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "transparent" }}>
                        Description
                      </th>
                      <th style={{ backgroundColor: "transparent" }}>Price</th>
                      <th style={{ backgroundColor: "transparent" }}>Seat</th>
                      <th style={{ backgroundColor: "transparent" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">Ride Booking</td>
                      <td className="p-3">₦ {price}</td>
                      <td className="p-3">{invoice?.seats}</td>
                      <td className="p-3">₦ {invoice?.amount}</td>
                    </tr>
                  </tbody>
                </Table> */}

                <div className="">
                  <Table borderless responsive={true} hover>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "transparent" }}>
                          Description
                        </th>
                        <th style={{ backgroundColor: "transparent" }}>
                          Price
                        </th>
                        <th style={{ backgroundColor: "transparent" }}>Seat</th>
                        <th style={{ backgroundColor: "transparent" }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="">Ride Booking</td>
                        <td className="">₦ {price}</td>
                        <td className="">{invoice?.seats}</td>
                        <td className="">₦ {invoice?.amount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <p
                  className="text-secondary invoice_f mt-5"
                  style={{ fontSize: 12 }}
                >
                  Copyright © {moment().format("YYYY")} Wenyfour. All rights
                  reserved.
                </p>
              </div>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    </div>
  );
}
