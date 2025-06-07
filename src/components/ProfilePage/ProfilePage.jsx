import { useParams } from "react-router-dom";
import "./profilePage.scss";
import { useOrganizationById, useUserById } from "../../query/queries";
import Loader from "../Loader/Loader";
import { prettyDate } from "../../helpers/prettyDate";

const ProfilePage = () => {
  const id = useParams().id;
  const { data, isLoading } = useUserById(id);
  const orgId = data?.organizationId;

  // Не вызываем useOrganizationById, если нет orgId
  const orgQuery = useOrganizationById(orgId);
  const organization = orgQuery.data;
  const isOrgLoading = orgId ? orgQuery.isPending : false;

  if (isLoading || isOrgLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }

  if (!data) {
    return <div className="title">Пользователь не найден</div>;
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Профиль пользователя</h2>
        <div className="profile__row">
          <span className="profile__label">ФИО</span>
          <span className="profile__value">
            {data.surname} {data.name} {data.patronymic}
          </span>
        </div>
        <div className="profile__row">
          <span className="profile__label">Email</span>
          <span className="profile__value">{data.email}</span>
        </div>
        <div className="profile__row">
          <span className="profile__label">Организация</span>
          <span className="profile__value">
            {data.organizationName || organization.name || "-"}
          </span>
        </div>
        <div className="profile__row">
          <span className="profile__label">Телефон</span>
          <span className="profile__value">{data.phone || "-"}</span>
        </div>
        <div className="profile__row">
          <span className="profile__label">Дата регистрации</span>
          <span className="profile__value">
            {prettyDate(data.updateInfo?.createdAt)}
          </span>
        </div>
        <div className="profile__row">
          <span className="profile__label">Последнее обновление</span>
          <span className="profile__value">
            {prettyDate(data.updateInfo?.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
