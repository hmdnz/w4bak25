import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "reactstrap";
import icon from "../assets/images/path.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../helpers/helpers";
import moment from "moment";
import numeral from "numeral";
import axios from "axios";
import { api } from "../helper/apis";
import BackButton from "./BackButton";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
export default function BookRide() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const loggedInUser = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const query = useQuery();
  const ride_id = query.get("ride_id");
  const date = query.get("date");
  if (date) {
    const originalDate = date;
    var parts = originalDate?.split("-");
    var rearrangedDate = parts[0] + "-" + parts[2] + "-" + parts[1];
  }
  const time = query.get("time");
  const from = query.get("from");
  const pickup_from = query.get("pickup_from");
  const to = query.get("to");
  const drop_off_at = query.get("drop_off_at");
  const seats = query.get("seats");
  const noOfSeats = parseInt(seats);
  const price = query.get("price");

  // const [invoiceData, setInvoiceData] = useState({
  //   amount: "",
  //   message: "",
  //   name: "",
  //   seats: "",
  //   status: "",
  //   timestamp: "",
  //   transactionid: "",
  //   trxn_referenceid: "",
  // });

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      axios
        .get(`${api}/auth/users/me`, {
          headers: {
            "x-token": xtoken,
          },
        })
        .then((response) => {
          setLoading(false);
          setProfileData(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          setLoading(false);
          // console.log("error fetching data", err);
        });
    }
  }, [loggedInUser]);

  const totalPrice = (
    <p className="m-0 rides_avail" style={{ fontWeight: 700 }}>
      ₦{numeral(price * seats).format("0,0")}
    </p>
  );

  const totalPriceInKobo = price * seats * 100;

  const config = {
    reference: new Date().getTime().toString(),
    email: profileData?.email,
    amount: totalPriceInKobo,
    // publicKey: "pk_test_8af7fb12b568ccb4597bdddae81c9896d08273b3",
    // publicKey: "sk_test_3a40c72fa301d3244a2de6c394812bc4174529a5",
    publicKey: "pk_live_d5d6ae6d5fa8f04db058bc0754242f23f4f7d0b6",
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    //BOOKING RIDE
    axios
      .put(
        `${api}/rides/${ride_id}/book/ride`,
        {
          no_seats: noOfSeats,
        },
        {
          headers: {
            "x-token": xtoken,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          //CREATING INVOICE
          axios
            .post(
              `${api}/transactions/create`,
              {
                amount: price * seats,
                message: reference?.message,
                name: profileData?.name,
                seats: seats,
                status: reference?.status,
                timestamp: moment().format(),
                transactionid: reference?.transaction,
                trxn_referenceid: reference?.trxref,
              },
              {
                headers: {
                  "x-token": xtoken,
                },
              }
            )
            .then((response) => {
              // console.log(response);
              if (response.status === 201) {
                handleModal();
              }
            })
            .catch((e) => console.log(e));
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      }),
      console.log(reference);
  };
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const userData = JSON.parse(localStorage.getItem("access_token"));
  const xtoken = userData?.access_token;

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="app_button mt-3"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay
        </button>
      </div>
    );
  };

  const createInvoice = () => {
    axios.post(`${api}/transactions/create`);
  };
  return (
    <div className="p-3 mt-5">
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="">
          <BackButton headingText={"Review and book"} />
          {/* {JSON.stringify(profileData)} */}
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
            <>
              <p className="rides_avail mt-5" style={{ fontWeight: 700 }}>
                {moment(rearrangedDate).format("ddd, DD MMMM")} at{" "}
                {moment(time, "HH:mm:ss").format("HH:mm A")}
              </p>
              <div className="d-flex" style={{ gap: 10 }}>
                <div>
                  <img src={icon} style={{ width: 20 }} />
                </div>
                <div>
                  <p className="rides_avail m-0" style={{ fontWeight: "bold" }}>
                    {pickup_from}
                  </p>
                  <p
                    className="rides_avail"
                    style={{ fontSize: 13, color: "" }}
                  >
                    {from}
                  </p>
                  <p className="rides_avail m-0" style={{ fontWeight: "bold" }}>
                    {drop_off_at}
                  </p>
                  <p
                    className="rides_avail"
                    style={{ fontSize: 13, color: "" }}
                  >
                    {to}
                  </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <p className="m-0" style={{}}>
                  Total price for {seats} passenger(s)
                </p>
                {totalPrice}
              </div>
              <div className="text-center mt-3">
                {/* <PaystackButton className="app_button" {...componentProps} /> */}
                <PaystackHookExample />
              </div>
            </>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
      <Modal size="sm" isOpen={modal}>
        <div className="p-3 text-center">
          <p className="small">Ride booked successfully.</p>
          <button
            className="app_button"
            onClick={() => navigate("/my-bookings")}
          >
            View ordered ride(s)
          </button>
        </div>
      </Modal>
    </div>
  );
}
