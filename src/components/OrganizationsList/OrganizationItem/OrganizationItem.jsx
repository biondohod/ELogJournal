import { Link } from "react-router-dom";

const OrganizationItem = ({ org }) => {
  return (
    <li className="organization-item">
      <p className="organization-item__title">{org.name}</p>
      <p className="organization-item__title">
        Пользователей: {org.userIds.length}
      </p>
      <Link
        to={`/organizations/edit/${org.id}`}
        className="button button--blue"
      >
        Редактировать
      </Link>
    </li>
  );
};

export default OrganizationItem;
