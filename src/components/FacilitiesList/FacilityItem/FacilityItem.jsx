import React from "react";
import { Link } from "react-router-dom";

const FacilityItem = ({ item }) => {
  return (
    <li>
      <Link to="/facility/1" className="facility-item">
        <p className="facility-item__title">{item.name}</p>
        <p className="facility-item__address">{item.address}</p>
      </Link>
    </li>
  );
};

export default FacilityItem;
