import React, { useEffect, useState } from "react";

export default function Payment() {
  const formData = {
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  };
  const [payment, setPayment] = useState(formData);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // console.log(payment);
  };

  return (
    <div className="p-3">
      <h4>Payment</h4>
      <div>
        <label className="label">Card Number</label>
        <input
          className="input_field"
          type="number"
          name="cardNumber"
          value={payment.cardNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label">CVV</label>
        <input
          className="input_field"
          type="number"
          name="cvv"
          value={payment.cvv}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="label">Expiry</label>
        <input
          className="input_field"
          type="month"
          name="month"
          value={payment.month}
          onChange={handleChange}
        />
      </div>

      <button className="app_button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
