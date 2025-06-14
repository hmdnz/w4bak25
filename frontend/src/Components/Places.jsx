// import React, { useState, useRef } from "react";
// import { LoadScript, Autocomplete } from "@react-google-maps/api";

// const libraries = ["places"]; // Required to load the Places API

// export default function Places() {
//   const [address, setAddress] = useState("");
//   const autocompleteRef = useRef(null);

//   const onLoad = (autocomplete) => {
//     autocompleteRef.current = autocomplete;
//   };

//   const onPlaceChanged = () => {
//     if (autocompleteRef.current) {
//       const place = autocompleteRef.current.getPlace();
//       setAddress(place.formatted_address || "");
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyAj33qrewfLPF7nIFExbxNeWbKsRrg8baA"
//       libraries={libraries}
//     >
//       <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//         <input
//           className="input_field"
//           type="text"
//           placeholder="Enter a location"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           style={{ width: "300px", height: "40px" }}
//         />
//       </Autocomplete>
//     </LoadScript>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const Places = ({ label, name, value, onChange, className }) => {
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      onChange({ target: { name, value: place.formatted_address || "" } });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAj33qrewfLPF7nIFExbxNeWbKsRrg8baA"
      libraries={libraries}
    >
      <div className="">
        <label className="label">{label}</label>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            className="input_field"
            name={name}
            value={value}
            onChange={onChange}
            // placeholder={`Enter ${label.toLowerCase()}`}
          />
        </Autocomplete>
      </div>
    </LoadScript>
  );
};

export default Places;
