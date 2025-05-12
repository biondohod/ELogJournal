import { useState } from "react";
import "./accountSheets.scss";
import AccountModal from "../AccountModal/AccountModal";
const AccountSheets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  return (
    <>
      <div className="table__wrapper">
        <table className="table table--account">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="table__head-row">
              <th className="table__header table__cell--center">Дата</th>
              <th className="table__header table__cell--center">
                Выявленные отступления от проектно-сметной документации,
                нарушения требований строительных норм и правил и технических
                условий по производству строительно-монтажных работ
              </th>
              <th className="table__header table__cell--center">
                Указания об устранении выявленных отступлений или нарушений и
                сроки их выполнения
              </th>
              <th className="table__header table__cell--center">
                Подпись специалиста, осуществляющего авторский надзор,
                выполняющего запись (фамилия, инициалы, должность)
              </th>
              <th className="table__header table__cell--center">
                С записью ознакомлен представитель: а) подрядчика; б) заказчика
                (фамилия, инициалы, должность, дата)
              </th>
              <th className="table__header table__cell--center">
                Отметка о выполнении указаний: а) подрядчика; б) заказчика
                (фамилия, инициалы, должность, дата)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="table__row">
              <td className="table__cell table__cell--center">13.09.2025</td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
            </tr>
            <tr className="table__row">
              <td className="table__cell table__cell--center">13.09.2025</td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
              <td className="table__cell table__cell--center">
                Текст текст текст Текст текст текст
              </td>
            </tr>
          </tbody>
        </table>
        <button className="button button--blue" onClick={handleOpenModal}>
          Добавить
        </button>
      </div>
      {isModalOpen && <AccountModal onClose={handleCloseModal} />}
    </>
  );
};

export default AccountSheets;
