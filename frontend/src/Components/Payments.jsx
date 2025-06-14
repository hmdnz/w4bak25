import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/path.png";
import { api } from "../helper/apis";
import axios from "axios";
import moment from "moment";
import BackButton from "./BackButton";
import { IoIosArrowForward } from "react-icons/io";

export default function Payments() {
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
      <BackButton headingText={"Payments"} />
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
              {/* {JSON.stringify(invoices)} */}
              <div className="">
                <Table borderless responsive={true} hover>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "transparent" }}>#</th>
                      <th style={{ backgroundColor: "transparent" }}>TXN ID</th>
                      <th style={{ backgroundColor: "transparent" }}>
                        Paid at
                      </th>
                      <th style={{ backgroundColor: "transparent" }}>Amount</th>
                      <th style={{ backgroundColor: "transparent" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices?.map((item, index) => (
                      <tr onClick={() => navigate(`/invoice?id=${item?.id}`)}>
                        <th
                          style={{ backgroundColor: "transparent" }}
                          scope="row"
                        >
                          {index + 1}
                        </th>
                        <td style={{ backgroundColor: "transparent" }}>
                          {item?.transactionid}
                        </td>
                        <td style={{ backgroundColor: "transparent" }}>
                          {moment(item?.timestamp).format("D/M/YYYY")}
                        </td>
                        <td style={{ backgroundColor: "transparent" }}>
                          {item?.amount}
                        </td>
                        <td style={{ backgroundColor: "transparent" }}>
                          {item?.status}
                        </td>

                        <td style={{ backgroundColor: "transparent" }}>
                          <IoIosArrowForward size="1.5rem" color="grey" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center" style={{ fontSize: 13 }}>
                  {invoices.length === 0 ? (
                    <span>You don't have any invoice yet</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    </div>
  );
}
