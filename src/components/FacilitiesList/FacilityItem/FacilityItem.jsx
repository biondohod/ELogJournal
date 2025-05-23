import React from "react";
import { Link } from "react-router-dom";

const FacilityItem = ({ item }) => {
  return (
    <li className="facility-item">
      <Link to={`/facility/${item.id}`}>
        <p className="facility-item__title">{item.shortName}</p>
      </Link>
      <p className="facility-item__address">{item.address}</p>
      <Link to={`/facility/edit/${item.id}`} className="button button--blue">
        Редактировать
      </Link>
    </li>
  );
};

export default FacilityItem;
