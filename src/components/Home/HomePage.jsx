import { useFacilities } from "../../query/queries";
import FacilitiesList from "../FacilitiesList/FacilitiesList";
import Loader from "../Loader/Loader";
import SearchFilter from "../SearchFilter/SearchFilter";

const HomePage = () => {
  const { data: items, isLoading } = useFacilities();
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }
  return (
    <>
      <SearchFilter name={"Список объектов"} />
      <FacilitiesList items={items} />
    </>
  );
};

export default HomePage;
