import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { api } from "../helper/apis";
import { useQuery } from "../helpers/helpers";
import BackButton from "./BackButton";

export default function EditCar() {
  const query = useQuery();
  const car_id = query.get(`id`);
  const brand = query.get(`brand`);
  const c_type = query.get(`type`);
  const c_license = query.get(`license`);
  const color = query.get(`color`);
  const model = query.get(`model`);

  const formData = {
    brand: brand,
    c_license: c_license,
    c_type: c_type,
    color: color,
    model: model,
  };
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const [editVehicle, setEditVehicle] = useState(formData);

  const handleChange = (e) => {
    setEditVehicle({ ...editVehicle, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editVehicle.c_type === "-") {
      alert("Please fill all the inputs!");
    } else {
      setLoading(true);
      axios
        .put(
          `${api}/cars/update/${car_id}/car`,
          {
            brand: editVehicle.brand,
            c_license: editVehicle.c_license,
            c_type: editVehicle.c_type,
            color: editVehicle.color,
            model: editVehicle.model,
          },
          {
            headers: {
              "x-token": xtoken,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          if (response?.status === 200) {
            navigate("/my-vehicles");
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      // console.log(editVehicle);
    }
  };

  return (
    <div className="mt-5">
      {/* <CompHeader header={"Edit vehicle"}> */}
      <BackButton headingText={"Edit vehicle"} />
      <Row className="m-0">
        <Col md={4}></Col>
        <Col md={4}>
          <div className="mt-3">
            {/* {JSON.stringify(editVehicle)} */}
            {/* {JSON.stringify(xtoken)} */}
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mt-3">
                  <label className="label">Car brand</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="brand"
                    value={editVehicle.brand}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Car model</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="model"
                    value={editVehicle.model}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Vehicle type</label>
                  <select
                    className="input_field"
                    name="c_type"
                    required
                    value={editVehicle.c_type}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Coupe</option>
                    <option>Sports Car</option>
                    <option>Minivan</option>
                    <option>Van</option>
                    <option>Bus</option>
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Car color</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="color"
                    value={editVehicle.color}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Driver license number</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="c_license"
                    value={editVehicle.c_license}
                    onChange={handleChange}
                  />
                </Col>
                <div className="text-center mt-3">
                  {loading ? (
                    <button
                      disabled={loading}
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
                    >
                      Save
                    </button>
                  )}
                </div>
              </Row>
            </form>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
      {/* </CompHeader> */}
    </div>
  );
}
