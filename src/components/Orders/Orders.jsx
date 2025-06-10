import { useRef } from "react";
import { useEditFacility, useUploadFile } from "../../query/mutations";
import OrderItem from "./OrderItem/OrderItem";
import { usePermissionsFacility } from "../../query/queries";

const Orders = ({ id, orders }) => {
  const { mutateAsync: uploadFile, isPending: isPenidingUpload } =
    useUploadFile();
  const { mutateAsync: editFacility, isPending: isPendingEdit } =
    useEditFacility();
  const { data: permissions } = usePermissionsFacility(id);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const res = await uploadFile(file);
      const currentUserId = localStorage.getItem("currentUserId");
      const processedData = {
        ...res,
        userInChargeId: currentUserId,
      };

      const data = {
        orders: {
          add: [processedData],
        },
      };

      await editFacility({ id, data });
    }
  };

  return (
    <div className="table__wrapper">
      <div className="table__container">
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
            {orders.map((order) => {
              return <OrderItem order={order} key={order?.id} />;
            })}
          </tbody>
        </table>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="*"
      />
      {permissions?.canUpdateOrders ||
        (permissions?.canUpdate && (
          <button
            className="button button--blue"
            disabled={isPenidingUpload || isPendingEdit}
            onClick={handleButtonClick}
            type="button"
          >
            Загрузить
          </button>
        ))}
    </div>
  );
};

export default Orders;
