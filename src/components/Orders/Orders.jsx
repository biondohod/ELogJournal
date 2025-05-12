const Orders = () => {
  return (
    <div className="table__wrapper">
      <table className="table table--orders">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="table__head-row">
            <th className="table__header">Название</th>
            <th className="table__header">Дата добавления</th>
            <th className="table__header table__cell--center"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__row">
            <td className="table__cell">Приказ №1</td>
            <td className="table__cell">01.01.2025</td>
            <td className="table__cell table__cell--center">
              <button className="table__save"></button>
            </td>
          </tr>
          <tr className="table__row">
            <td className="table__cell">Приказ №2</td>
            <td className="table__cell">05.01.2025</td>
            <td className="table__cell table__cell--center">
              <button className="table__save"></button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="button button--blue">Загрузить</button>
    </div>
  );
};

export default Orders;
