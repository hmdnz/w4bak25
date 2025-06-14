import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Row, Modal } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../helper/apis";
import { MdArrowForwardIos } from "react-icons/md";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BackButton from "./BackButton";
export default function MyVehicles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [vehicles, setVehicles] = useState([]);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [modal, setModal] = useState(false);

  const handleModal = (id) => {
    setVehicleToDelete(id);
    setModal(!modal);
  };

  const getVehicles = () => {
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
          setVehicles(response?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  };
  useEffect(() => {
    getVehicles();
  }, []);

  const handleDeleteVehicle = () => {
    setLoading(true);
    if (vehicleToDelete) {
      axios
        .delete(`${api}/cars/${vehicleToDelete}/delete`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          // console.log(response);
          setLoading(false);
          if (response?.status === 200) {
            // navigate("/my-vehicles");
            handleModal();
            getVehicles();
          }
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  };
  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"My Vehicles"}> */}
      <Row className="">
        <Col md={4}></Col>
        <Col md={4}>
          <BackButton headingText={"My Vehicles"} />
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
            <div className="mt-5">
              {vehicles?.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between ride_details_user"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      className="m-0"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {item?.brand} {item?.model}
                    </p>
                    <p>{item?.color}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div>
                      <AiOutlineEdit
                        size="1.2rem"
                        className="arrow"
                        onClick={() =>
                          navigate(
                            `/edit-car?id=${item?.id}&brand=${item?.brand}&model=${item?.model}&type=${item?.c_type}&color=${item?.color}&license=${item?.c_license}`
                          )
                        }
                      />
                    </div>
                    <div>
                      <AiOutlineDelete
                        size="1.2rem"
                        className="arrow"
                        onClick={() => handleModal(item?.id)}
                      />
                    </div>
                  </div>
                  <Modal size="sm" toggle={handleModal} isOpen={modal}>
                    <div className="p-3">
                      <p>Are you sure you want to delete this vehicle?</p>
                      <div className="d-flex justify-content-between">
                        <button className="app_button" onClick={handleModal}>
                          Cancel
                        </button>
                        {/* {JSON.stringify(item?.id)} */}
                        {loading ? (
                          <button
                            className="danger_button"
                            onClick={handleDeleteVehicle}
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
                            className="danger_button"
                            onClick={handleDeleteVehicle}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              ))}

              {vehicles.length === 0 ? (
                <div className="text-center mb-5">
                  <span className="">
                    You don't have registered vehicle(s) yet
                  </span>
                </div>
              ) : (
                ""
              )}
              <div className="text-center">
                <button
                  className="app_button p-3"
                  onClick={() => navigate("/create-new-car")}
                >
                  Add new vehicle
                </button>
              </div>
            </div>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
