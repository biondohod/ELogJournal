import { Link } from "react-router-dom";
import { prettyDate } from "../../helpers/prettyDate";
import "./userItem.scss";
import { useEditFacility } from "../../query/mutations";

const roles = [
  { id: 0, value: "NoRole", name: "Нет роли" },
  { id: 1, value: "Admin", name: "Администратор" },
  { id: 2, value: "Customer", name: "Заказчик" },
  { id: 3, value: "Operator", name: "Производитель работ" },
  { id: 4, value: "AuthorSupervision", name: "Авторский надзор" },
  { id: 5, value: "Observer", name: "Обозреватель" },
];

const UserItemRole = ({
  user,
  role,
  facilityId,
  constructionSiteUserRoles,
}) => {
  const { mutateAsync: editFacility, isPending } = useEditFacility();
  const defaultRoleValue = role
    ? roles.find((r) => r.value === role)?.value
    : user.role;

  // ...existing code...
  const handleRoleChange = async (e) => {
    const selectedValue = e.target.value;
    const selectedRole = roles.find((r) => r.value === selectedValue);
    const roleValue = selectedRole?.value;

    // Определяем, была ли у пользователя роль до этого
    const hadRole = !!role && role !== "NoRole";
    const isNoRole = selectedValue === "NoRole";

    // Найти объект роли пользователя для получения корректного id
    let roleObjId;
    if (Array.isArray(constructionSiteUserRoles)) {
      const found = constructionSiteUserRoles.find(
        (item) => item.userId === user.id
      );
      if (found) roleObjId = found.id;
    }

    // Формируем userRoles только с нужными массивами
    const userRoles = {};

    if (isNoRole) {
      // В remove нужен id объекта роли, а не user.id
      if (roleObjId) userRoles.remove = [roleObjId];
    } else if (hadRole) {
      // В update нужен id объекта роли, а не user.id
      if (roleObjId) {
        userRoles.update = [
          {
            role: roleValue,
            id: roleObjId,
          },
        ];
      }
    } else {
      userRoles.add = [
        {
          userId: user.id,
          role: roleValue,
        },
      ];
    }

    // Отправляем запрос на изменение facility с новыми ролями
    await editFacility({
      id: facilityId,
      data: { userRoles },
    });
  };
  // ...existing code...

  return (
    <div className="user">
      <div className="user__container">
        <p className="user__text">
          {user?.name} {user?.surname} {user?.patronymic}
        </p>
        <p className="user__small-text">Email: {user?.email}</p>
        <p className="user__small-text">
          Дата регистрации: {prettyDate(user?.updateInfo?.createdAt)}
        </p>
      </div>
      <div className="user__select">
        <label className="user__label">
          <p className="user__text">Роль:</p>
          <select
            name="userRole"
            id="userRole"
            className="user__role"
            value={defaultRoleValue || ""}
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="user__buttons">
        <Link to={`/profile/${user.id}`} className="user__profile"></Link>
        {/* <button className="user__delete"></button> */}
      </div>
    </div>
  );
};

export default UserItemRole;
