import { useState } from "react";
import "./searchFilter.scss";
const SearchFilter = ({ name }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="facil-filters">
      <p className="title">{name}</p>
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

export default SearchFilter;
