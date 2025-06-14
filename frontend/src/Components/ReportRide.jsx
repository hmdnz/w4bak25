import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
export default function ReportRide() {
  const navigate = useNavigate();
  const reportTypes = [
    {
      name: "A scam activity",
    },
    { name: " Suspicious Activity" },
    { name: "Inappropriate content" },
    { name: "Other" },
  ];
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/
  return (
    <div className="p-3 mt-5">
      <h4
        className="text-center web_rep page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        What would you like to report?
      </h4>
      <h4
        className="text-center mob_rep page_title"
        style={{ fontWeight: 900, fontSize: 40 }}
      >
        Report
      </h4>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-3">
            {reportTypes.map((item, index) => (
              <div
                key={index}
                className="mt-4 d-flex align-items-center justify-content-between ride_details_user"
                onClick={() =>
                  navigate(`/write-report?report_type=${item.name}`)
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className="m-0" style={{ fontWeight: "" }}>
                    {item.name}
                  </p>
                </div>
                <div>
                  <MdArrowForwardIos size="1.2rem" className="arrow" />
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
