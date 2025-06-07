import { useState } from "react";
import "./accountSheets.scss";
import AccountModal from "../AccountModal/AccountModal";
import AccountModalEdit from "../AccountModal/AccountModalEdit";
import AccountSheetItem from "./AccountSheetItem/AccountSheetItem";

const AccountSheets = ({ id, sheet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleOpenModal = () => {
    setEditItem(null);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    document.body.style.overflow = "";
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className="table__wrapper">
        <div className="table__container">
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
                <AccountSheetItem
                  item={item}
                  key={item.id}
                  id={id}
                  onEdit={() => handleEditClick(item)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <button className="button button--blue" onClick={handleOpenModal}>
          Добавить
        </button>
      </div>
      {isModalOpen &&
        (editItem ? (
          <AccountModalEdit
            onClose={handleCloseModal}
            id={id}
            sheetId={sheet?.id}
            item={editItem}
          />
        ) : (
          <AccountModal
            onClose={handleCloseModal}
            id={id}
            sheetId={sheet?.id}
          />
        ))}
    </>
  );
};

export default AccountSheets;
