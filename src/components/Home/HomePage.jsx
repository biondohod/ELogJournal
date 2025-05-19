import FacilitiesList from "../FacilitiesList/FacilitiesList";
import SearchFilter from "../SearchFilter/SearchFilter";

const HomePage = () => {
  return (
    <>
      <SearchFilter name={"Список объектов"} />
      <FacilitiesList />
    </>
  );
};

export default HomePage;
