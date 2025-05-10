import FacilityItem from "./FacilityItem/FacilityItem";
import "./facilitiesList.scss";
const FacilitiesList = () => {
  const items = [
    { id: 1, name: "Название объекта", address: "ул Советская 100" },
    { id: 2, name: "Название объекта", address: "ул Советская 100" },
    { id: 3, name: "Название объекта", address: "ул Советская 100" },
    { id: 4, name: "Название объекта", address: "ул Советская 100" },
  ];
  return (
    <div className="facilities">
      <button className="facilities__button">Добавить объект</button>
      <ul className="facilities__list">
        {items.map((item) => (
          <FacilityItem key={item.id} item={item} />
        ))}
      </ul>
      <button className="facilities__button">Показать еще</button>
    </div>
  );
};

export default FacilitiesList;
