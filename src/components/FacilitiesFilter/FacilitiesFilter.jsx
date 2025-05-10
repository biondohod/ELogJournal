import { useState } from "react";
import "./facilitiesFilter.scss";
const FacilitiesFilter = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="facil-filters">
      <p className="facil-filters__title">Список объектов</p>
      <div className="facil-filters__search">
        <input
          type="text"
          className="facil-filters__input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="facil-filters__btn"></button>
      </div>
    </div>
  );
};

export default FacilitiesFilter;
