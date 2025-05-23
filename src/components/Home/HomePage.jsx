import { useState } from "react";
import { useFacilities } from "../../query/queries";
import FacilitiesList from "../FacilitiesList/FacilitiesList";
import Loader from "../Loader/Loader";
import SearchFilter from "../SearchFilter/SearchFilter";

const HomePage = () => {
  const { data: items = [], isLoading } = useFacilities();
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = items.filter((item) =>
    item.shortName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }
  return (
    <>
      <SearchFilter
        name="Список объектов"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FacilitiesList items={filteredItems} />
    </>
  );
};

export default HomePage;
