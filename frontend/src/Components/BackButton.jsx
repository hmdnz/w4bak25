import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function BackButton({ headingText }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center gap-4 justify-content-center mb-3">
      <BsArrowLeft
        className="back_button"
        size="2.5rem"
        onClick={() => navigate(-1)}
      />
      <h4 className="page_title m-0" style={{ fontWeight: 900, fontSize: 40 }}>
        {headingText}
      </h4>
    </div>
  );
}

export default BackButton;
