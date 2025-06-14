import { MdArrowForwardIos, MdOutlineDeleteOutline } from "react-icons/md";
import { FiKey, FiTrash } from "react-icons/fi";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosLink } from "react-icons/io";
import {
  TiDeleteOutline,
  TiLockClosedOutline,
  TiUserOutline,
} from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import BackButton from "./BackButton";
export default function Settings() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"Settings"}> */}
      <BackButton headingText={"Settings"} />
      <Row className="m-0">
        <Col md={4}></Col>
        <Col md={4} className="">
          <div className="mt-2">
            {/* <div
              className="d-flex gap-3 align-items-center justify-content-between settings_menu"
              style={{cursor:'pointer'}}
              onClick={() => routeTo("/account-info")}
            >
              <div className="d-flex align-items-center gap-3">
                <TiUserOutline size="1.5rem" color="grey" />
                <div>
                  <p className="m-0">
                    <b>Account information</b>
                  </p>
                  <p className="m-0 small" style={{ color: "grey" }}>
                    Access your personal information, including phone number and
                    email.
                  </p>
                </div>
              </div>
              <IoIosArrowForward size="1.5rem" color="grey" />
            </div> */}
            <div
              className="d-flex gap-3 align-items-center justify-content-between settings_menu"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/change-password")}
            >
              <div className="d-flex align-items-center gap-3">
                <TiLockClosedOutline size="1.5rem" color="grey" />
                <div>
                  <p className="m-0">
                    <b>Change your password </b>
                  </p>
                  <p className="m-0 small" style={{ color: "grey" }}>
                    Update your password whenever you want.
                  </p>
                </div>
              </div>
              <IoIosArrowForward size="1.5rem" color="grey" />
            </div>{" "}
            <div
              className="d-flex gap-3 mt-3 align-items-center justify-content-between settings_menu"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/delete-account")}
            >
              <div className="d-flex align-items-center gap-3">
                <TiDeleteOutline size="1.5rem" color="grey" />
                <div>
                  <p className="m-0">
                    <b>Delete account</b>
                  </p>
                  <p className="m-0 small" style={{ color: "grey" }}>
                    Get instructions on how to delete your account.
                  </p>
                </div>
              </div>
              <IoIosArrowForward size="1.5rem" color="grey" />
            </div>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
