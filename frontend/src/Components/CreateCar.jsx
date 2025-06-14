import { MdArrowForwardIos } from "react-icons/md";
import CompHeader from "../CustomComponents/CompHeder";
import { useNavigate } from "react-router-dom";
import { Col, Modal, Row } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../helper/apis";
import BackButton from "./BackButton";
export default function CreateCar() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;
  const toggleModal = () => {
    setModal(!modal);
  };
  const formData = {
    brand: "",
    c_license: "",
    c_type: "",
    color: "",
    model: "",
  };
  const [createCar, setCreateCar] = useState(formData);

  const handleChange = (e) => {
    setCreateCar({ ...createCar, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createCar.c_type === "") {
      alert("Please fill all the inputs!");
    } else {
      setLoading(true);
      axios
        .post(
          `${api}/cars/create`,
          {
            brand: createCar.brand,
            c_license: createCar.c_license,
            c_type: createCar.c_type,
            color: createCar.color,
            model: createCar.model,
          },
          {
            headers: {
              "x-token": xtoken,
            },
          }
        )
        .then((response) => {
          // console.log(response?.status);
          if (response?.status === 201) {
            navigate("/my-vehicles");
          }
          setLoading(false);
        })
        .catch((e) => {
          // console.log(e);
          setLoading(false);
        });
      // console.log(createCar);
    }
  };

  return (
    <div className="p-3 mt-5">
      {/* <CompHeader header={"Create vehicle"}> */}

      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <BackButton headingText={"Create vehicle"} />
          <div className="mt-3">
            {/* {JSON.stringify(createCar)} */}
            {/* {JSON.stringify(xtoken)} */}
            <form onSubmit={handleSubmit}>
              <Row>
                {/* <Col md={6} className="mt-3">
                  <label className="label">Vehicle brand</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="brand"
                    value={createCar.brand}
                    onChange={handleChange}
                  />
                </Col> */}
                <Col md={6} className="mt-3">
                  <label className="label">Vehicle brand</label>
                  <select
                    className="input_field"
                    name="brand"
                    required
                    value={createCar.brand}
                    onChange={handleChange}
                  >
                    <option value="">-</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Ford">Ford</option>
                    <option value="Honda">Honda</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Cadillac">Cadillac</option>
                    <option value="GMC">GMC</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Audi">Audi</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Kia">Kia</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Vehicle model</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="model"
                    value={createCar.model}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Vehicle type</label>
                  <select
                    className="input_field"
                    name="c_type"
                    required
                    value={createCar.c_type}
                    onChange={handleChange}
                  >
                    <option>-</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    {/* <option>Coupe</option> */}
                    <option>Sports Car</option>
                    {/* <option>Minivan</option> */}
                    {/* <option>Van</option> */}
                    <option>Bus</option>
                  </select>
                </Col>
                <Col md={6} className="mt-3">
                  <label className="label">Vehicle color</label>
                  <input
                    required
                    minLength={2}
                    className="input_field"
                    type="text"
                    name="color"
                    value={createCar.color}
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
                    value={createCar.c_license}
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
                      Create
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
