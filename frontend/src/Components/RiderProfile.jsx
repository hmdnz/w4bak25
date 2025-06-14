import React, { useEffect } from "react";
//https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png
import { Col, Row } from "reactstrap";
import { MdAddCall, MdArrowForwardIos } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
import moment from "moment";
import dobToAge from "dob-to-age";
function RiderProfile() {
  const query = useQuery();
  const name = query.get("name");
  const email = query.get("email");
  const about = query.get("about");
  const dob = query.get("dob");
  const phone = query.get("phone");
  const created_at = query.get("created_at");
  const picture = query.get("picture");
  const navigate = useNavigate();
  /*useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth");
    }
  }, []);*/
  return (
    <div className="p-3 mt-5">
      <Row className="mt-4">
        <Col md={3}></Col>
        <Col md={6} className="">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="m-0">{name}</h4>
              <p>{dobToAge(dob)} y/o</p>
            </div>
            <div>
              {picture === null ?
                <img
                  src={picture}
                  className="result profile"
                  alt="profile_pic"
                  style={{ width: 70 }}
                />
                :
                <img
                  src="https://res.cloudinary.com/dx5ilizca/image/upload/v1692800347/profile_epnaqt.png"
                  className="result profile"
                  alt="profile_pic"
                  style={{ width: 70 }}
                />
              }
            </div>
          </div>
          {/* <div className="d-flex mt-4 align-item-center justify-content-between">
            <div>
              <p>5/5 - 1 rating</p>
            </div>
            <div>
              <MdArrowForwardIos
                size="1.2rem"
                className="arrow "
              />
            </div>
          </div> */}
          <hr className="hr" />
          <div className="mt-3 mb-3 d-flex align-items-center gap-2">
            <BsShieldFillCheck color="#0D6EFD" size="1.3rem" className="m-0" />
            <p className="m-0">Confirmed email</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdAddCall color="#0D6EFD" size="1.3rem" className="m-0" />{" "}
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={`tel:${phone}`}
            >
              Contact {name}
            </a>
          </div>
          <div className="mt-3 divider"></div>
          <div className="mt-3">
            <h6 className="">About {name}</h6>
            <p className="small"> {about}</p>
          </div>
          <div className="mt-3 mb-3 divider"></div>
          {/* <p>2 rides published</p> */}
          <div className="d-flex align-items-center gap-2">
            <AiOutlineCalendar color="#0D6EFD" size="1.3rem" />
            <p className="m-0">
              Joined {moment(created_at).format("MMMM, YYYY")}
            </p>
          </div>
          <div className="mt-3 divider"></div>
          <p
            className="report_text mt-3"
            onClick={() => navigate(`/report-ride`)}
          >
            Report Ride
          </p>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default RiderProfile;
