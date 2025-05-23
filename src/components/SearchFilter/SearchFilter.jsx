import "./searchFilter.scss";
const SearchFilter = ({ name, value, onChange }) => {
  return (
    <div className="facil-filters">
      <p className="title">{name}</p>
      <div className="facil-filters__search">
        <input
          type="text"
          className="facil-filters__input"
          placeholder="Поиск по названию"
          value={value}
          onChange={onChange}
        />
        <button className="facil-filters__btn"></button>
      </div>
    </div>
  );
};

export default SearchFilter;
