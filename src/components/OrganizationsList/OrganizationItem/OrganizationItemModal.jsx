import { useForm } from "react-hook-form";
import { useUserByIds } from "../../../query/queries";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const OrganizationItemModal = ({ ids, organizationName, onClose }) => {
  const { data, isPending } = useUserByIds(ids);
  const renderContent = () => {
    if (ids.length === 0) {
      return <p className="modal__message">Пользователи не найдены.</p>;
    }
    if (isPending) {
      return <Loader />;
    }
    if (!data || data.length === 0) {
      return <p className="modal__message">Пользователи не найдены.</p>;
    }
    return (
      <ul className="user-list">
        {data.map((user) => (
          <li key={user.id} className="user-list__item">
            <p className="user-list__name">{user.name}</p>
            <p className="user-list__email">{user.email}</p>
            <Link
              to={`/profile/${user.id}`}
              className="user-list__profile"
            ></Link>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__title">
          Список пользователей в организации {organizationName}
        </p>
        <button className="modal__close" onClick={onClose}></button>
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizationItemModal;
