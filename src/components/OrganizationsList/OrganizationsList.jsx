import { useState } from "react";
import { Link } from "react-router-dom";
import "./organizationsList.scss";
import OrganizationItem from "./OrganizationItem/OrganizationItem";
import { useOrganizations } from "../../query/queries";
import Loader from "../Loader/Loader";

const SHOW_COUNT = 4;

const OrganizationsList = () => {
  const { data: items = [], isLoading } = useOrganizations();
  const [visibleCount, setVisibleCount] = useState(SHOW_COUNT);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + SHOW_COUNT);
  };

  const isShowMoreVisible = items.length > visibleCount;

  return (
    <div className="organizations">
      <Link to="/organizations/create" className="button organizations__button">
        Добавить организацию
      </Link>
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
