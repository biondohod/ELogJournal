import { Link } from "react-router-dom";
import FacilityItem from "./FacilityItem/FacilityItem";
import "./facilitiesList.scss";
import { useFacilities } from "../../query/queries";
import Loader from "../Loader/Loader";
const FacilitiesList = () => {
  const { data: items, isLoading } = useFacilities();

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }
  return (
    <div className="facilities">
      <Link to="/facility/create" className="button facilities__button">
        Добавить объект
      </Link>
      <ul className="facilities__list">
        {items.map((item) => (
          <FacilityItem key={item.id} item={item} />
        ))}
      </ul>
      <button className="button">Показать еще</button>
    </div>
  );
};

export default FacilitiesList;
