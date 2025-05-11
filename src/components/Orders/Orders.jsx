import "./orders.scss";

const Orders = () => {
  return (
    <table className="orders-table">
      <thead>
        <tr className="orders-table__head-row">
          <th className="orders-table__header orders-table__cell--wide">
            Название
          </th>
          <th className="orders-table__header orders-table__cell--date">
            Дата добавления
          </th>
          <th className="orders-table__header orders-table__cell--actions"></th>
        </tr>
      </thead>
      <tbody>
        <tr className="orders-table__row">
          <td className="orders-table__cell orders-table__cell--wide">
            Приказ №1
          </td>
          <td className="orders-table__cell orders-table__cell--date">
            01.01.2025
          </td>
          <td className="orders-table__cell orders-table__cell--actions">
            <button className="orders-table__save"></button>
          </td>
        </tr>
        <tr className="orders-table__row">
          <td className="orders-table__cell orders-table__cell--wide">
            Приказ №2
          </td>
          <td className="orders-table__cell orders-table__cell--date">
            05.01.2025
          </td>
          <td className="orders-table__cell orders-table__cell--actions">
            <button className="orders-table__save"></button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Orders;
