import { useState } from "react";
import UserItem from "../UserItem/UserItem";
import "./adminPage.scss";
import { useUserList } from "../../query/queries";

const AdminPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data = [] } = useUserList();

  // Фильтрация пользователей по email
  const filteredUsers = data.filter((user) => {
    const search = searchValue.toLowerCase();
    return (
      user.email?.toLowerCase().includes(search) ||
      user.name?.toLowerCase().includes(search) ||
      user.surname?.toLowerCase().includes(search) ||
      user.patronymic?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin">
      <div className="admin__container">
        <p className="title">Пользователи</p>
        <div className="admin__search">
          <input
            type="text"
            className="admin__input"
            placeholder="Поиск пользователей"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="admin__btn"></button>
        </div>
      </div>
      <div className="admin__wrapper">
        <ul className="admin__list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="admin__item">
              <UserItem user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
