import React from "react";

const FacilityItem = ({ item }) => {
  return (
    <li className="facility-item">
      <p className="facility-item__title">{item.name}</p>
      <p className="facility-item__address">{item.address}</p>
    </li>
  );
};

export default FacilityItem;
