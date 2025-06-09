import { useState } from "react";
import { Link } from "react-router-dom";
import "./organizationsList.scss";
import OrganizationItem from "./OrganizationItem/OrganizationItem";
import { SHOW_COUNT } from "../../consts/consts";
import { usePermissionsGlobal } from "../../query/queries";

const OrganizationsList = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(SHOW_COUNT);
  const { data: permissions } = usePermissionsGlobal();

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + SHOW_COUNT);
  };

  const isShowMoreVisible = items.length > visibleCount;

  return (
    <div className="organizations">
      {permissions?.organizationPermission?.canCreate && (
        <Link
          to="/organizations/create"
          className="button organizations__button"
        >
          Добавить организацию
        </Link>
      )}
      <ul className="organizations__list">
        {items.slice(0, visibleCount).map((org) => (
          <OrganizationItem key={org.id} org={org} />
        ))}
      </ul>
      {isShowMoreVisible && (
        <button className="button" onClick={handleShowMore}>
          Показать еще
        </button>
      )}
    </div>
  );
};

export default OrganizationsList;
