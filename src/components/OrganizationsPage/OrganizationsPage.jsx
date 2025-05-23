import { useState } from "react";
import "./organizationsPage.scss";
import SearchFilter from "../SearchFilter/SearchFilter";
import OrganizationsList from "../OrganizationsList/OrganizationsList";
import { useOrganizations } from "../../query/queries";
import Loader from "../Loader/Loader";

const OrganizationsPage = () => {
  const { data: organizations = [], isLoading } = useOrganizations();
  const [searchValue, setSearchValue] = useState("");
  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchValue.toLowerCase())
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
        name="Список организаций"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <OrganizationsList items={filtered} />
    </>
  );
};

export default OrganizationsPage;
