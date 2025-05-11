import { useState } from "react";
import UserItem from "../UserItem/UserItem";
import "./adminPage.scss";
const AdminPage = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="admin">
      <div className="admin__container">
        <p className="title">Пользователи</p>
        <div className="admin__search">
          <input
            type="text"
            className="admin__input"
            placeholder="Поиск по почте пользователя"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="admin__btn"></button>
        </div>
      </div>
      <div className="admin__wrapper">
        <ul className="admin__list">
          <UserItem />
          <UserItem />
          <UserItem />
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
