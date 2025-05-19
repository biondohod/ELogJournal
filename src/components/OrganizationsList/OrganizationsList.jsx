import { Link } from "react-router-dom";
import "./organizationsList.scss";
import OrganizationItem from "./OrganizationItem/OrganizationItem";

const OrganizationsList = ({ items }) => (
  <div className="organizations">
    <Link to="/organizations/create" className="button organizations__button">
      Добавить организацию
    </Link>
    <ul className="organizations__list">
      {items.map((org) => (
        <OrganizationItem key={org.id} org={org} />
      ))}
    </ul>
    <button className="button">Показать еще</button>
  </div>
);

export default OrganizationsList;
