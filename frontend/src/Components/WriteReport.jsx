import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
export default function WriteReport() {
  const navigate = useNavigate();
  const query = useQuery();

  const type = query.get("report_type");
  const [reportData, setReportData] = useState("");
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/
  return (
    <div className="p-3 mt-5">
     <h4 className="text-center page_title" style={{ fontWeight: 900, fontSize: 40 }}>
        Tell us more?
      </h4>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-4">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {type !== "Other" ? (
                <p className="m-0" style={{ fontWeight: "" }}>
                  {type}
                </p>
              ) : (
                ""
              )}

              <textarea
                className="input_field textarea_"
                name=""
                onChange={(e) => setReportData(e.target.value)}
                id=""
                cols="30"
                rows="10"
                placeholder="Start writing here..."
              ></textarea>
              <div className="mt-4 text-center">
                {reportData && (
                  <button className="app_button">Send Report</button>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
