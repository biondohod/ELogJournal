import { useState } from "react";
import "./accountSheets.scss";
import AccountModal from "../AccountModal/AccountModal";
import AccountSheetItem from "./AccountSheetItem/AccountSheetItem";
const AccountSheets = ({ id, sheet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("AccountSheets", id, sheet);

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
                Прилагаемые к выявленным отступлениям и нарушениям документы
              </th>
              <th className="table__header table__cell--center">
                Указания об устранении выявленных отступлений или нарушений и
                сроки их выполнения
              </th>
              <th className="table__header table__cell--center">
                Прилагаемые к указаниям об устранении отступлений документы
              </th>
              <th className="table__header table__cell--center">
                Подпись специалиста
              </th>
              <th className="table__header table__cell--center">
                Подпись заказчика
              </th>
            </tr>
          </thead>
          <tbody>
            {sheet?.items?.map((item) => (
              <AccountSheetItem item={item} key={item.id} id={id} />
            ))}
          </tbody>
        </table>
        <button className="button button--blue" onClick={handleOpenModal}>
          Добавить
        </button>
      </div>
      {isModalOpen && (
        <AccountModal onClose={handleCloseModal} id={id} sheetId={sheet?.id} />
      )}
    </>
  );
};

export default AccountSheets;
