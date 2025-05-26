import { baseToBlobDownload } from "../../../helpers/baseToBlobDownload";
import { prettyDate } from "../../../helpers/prettyDate";
import { useFileById } from "../../../query/queries";

const OrderItem = ({ order }) => {
  const { data, isLoading } = useFileById(order?.file?.id);

  return (
    <tr className="table__row">
      <td className="table__cell">{order?.file?.fileName}</td>
      <td className="table__cell">{prettyDate(order?.file?.uploadDate)}</td>
      <td className="table__cell table__cell--center">
        <button
          className="table__save"
          onClick={() => baseToBlobDownload(data, order?.file?.fileName)}
          disabled={isLoading}
        ></button>
      </td>
    </tr>
  );
};

export default OrderItem;
