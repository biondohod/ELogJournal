import "./userItem.scss";
const UserItem = () => {
  return (
    <div className="user">
      <div className="user__container">
        <p className="user__text">Пупкин Василий Афанасьевич</p>
        <p className="user__small-text">Email: pupkinvasya@mail.ru</p>
        <p className="user__small-text">Дата регистрации:13.09.2025</p>
      </div>
      <div className="user__select">
        <p className="user__text">Права:</p>
        <select name="role" className="user__role user__text">
          <option value="" defaultChecked>
            не задано
          </option>
          <option value="admin">Администратор</option>
          <option value="user">Пользователь</option>
          <option value="moderator">Модератор</option>
        </select>
      </div>
      <p className="user__text user__organization">Наименование организации</p>
      <div className="user__buttons">
        <button className="user__profile"></button>
        <button className="user__delete"></button>
      </div>
    </div>
  );
};

export default UserItem;
