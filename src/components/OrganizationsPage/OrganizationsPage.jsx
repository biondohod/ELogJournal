import { useState } from "react";
import "./organizationsPage.scss";
import SearchFilter from "../SearchFilter/SearchFilter";
import OrganizationsList from "../OrganizationsList/OrganizationsList";

// Пример данных организаций
const organizations = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "ООО Ромашка",
    userIds: [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    ],
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    name: "АО Василёк",
    userIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa8"],
  },
];

const OrganizationsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <SearchFilter name="Список организаций" />
      <OrganizationsList items={filtered} />
    </>
  );
};

export default OrganizationsPage;
