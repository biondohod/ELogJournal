import { useState } from "react";
import { Link } from "react-router-dom";
import FacilityItem from "./FacilityItem/FacilityItem";
import "./facilitiesList.scss";
import { SHOW_COUNT } from "../../consts/consts";
import { usePermissionsGlobal } from "../../query/queries";

const FacilitiesList = ({ items = [] }) => {
  const [visibleCount, setVisibleCount] = useState(SHOW_COUNT);
  const { data: permissions } = usePermissionsGlobal();

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + SHOW_COUNT);
  };

  const isShowMoreVisible = items.length > visibleCount;

  return (
    <div className="facilities">
      {permissions?.constructionSitePermission?.canCreate && (
        <Link to="/facility/create" className="button facilities__button">
          Добавить объект
        </Link>
      )}
      <ul className="facilities__list">
        {items.slice(0, visibleCount).map((item) => (
          <FacilityItem key={item.id} item={item} />
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

export default FacilitiesList;
