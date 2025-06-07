import React from "react";
import { prettyDate } from "../../helpers/prettyDate";

const RegisterSheetItem = ({ item }) => {
  return (
    <tr className="table__row">
      <td className="table__cell">{item?.organizationName}</td>
      <td className="table__cell">
        {item?.name} {item?.surname} {item?.patronymic}
      </td>
      <td className="table__cell table__cell--center">
        {prettyDate(item?.arrivalDate)}
      </td>
      <td className="table__cell table__cell--center">
        {prettyDate(item?.departureDate)}
      </td>
      <td className="table__cell table__cell--center">{item?.signature}</td>
    </tr>
  );
};

export default RegisterSheetItem;
