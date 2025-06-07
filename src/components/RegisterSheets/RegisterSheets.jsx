import { useState } from "react";
import "./registerSheets.scss";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useAddRegistrationSheet } from "../../query/mutations";
import RegisterSheetItem from "./RegisterSheetItem";
const RegisterSheets = ({ id, sheet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync: addRegistrationSheet, isPending } =
    useAddRegistrationSheet(id);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        registrationSheetId: sheet?.id,
        id: id,
      };
      await addRegistrationSheet(formattedData);
    } catch (error) {
      console.error("Ошибка при добавлении регистрационного листа:", error);
    }
  };

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
        <table className="table table--register">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="table__head-row">
              <th className="table__header">Наименование организации</th>
              <th className="table__header">Фамилия, имя, отчество</th>
              <th className="table__header">Дата приезда</th>
              <th className="table__header">Дата отъезда</th>
              <th className="table__header table__cell--center">
                Подпись представителя заказчика
              </th>
            </tr>
          </thead>
          <tbody>
            {sheet?.items?.map((item) => (
              <RegisterSheetItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
        <button className="button button--blue" onClick={handleOpenModal}>
          Добавить
        </button>
      </div>
      {isModalOpen && (
        <RegisterModal
          isPending={isPending}
          onClose={handleCloseModal}
          onSubmitProp={onSubmit}
        />
      )}
    </>
  );
};

export default RegisterSheets;
