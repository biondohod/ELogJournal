import { Link } from "react-router-dom";
import { prettyDate } from "../../helpers/prettyDate";
import { useEditUser } from "../../query/mutations";
import { useOrganizations } from "../../query/queries";
import "./userItem.scss";
import OrganizationSelect from "../OrganizationSelect/OrganizationSelect";
const UserItem = ({ user }) => {
  const { data: organizations = [] } = useOrganizations();
  const { mutateAsync: editUser } = useEditUser();

  const handleAdminCheckbox = async (e) => {
    const isChecked = e.target.checked;
    const roleNumber = isChecked ? 2 : 1;
    console.log("User ID:", user.id, "Role number:", roleNumber);
    await editUser({
      id: user.id,
      data: {
        userRole: roleNumber,
      },
    });
  };

  const handleChange = async (organizationId) => {
    try {
      await editUser({
        id: user.id,
        data: {
          organizationId,
        },
      });
    } catch (error) {
      console.error("Error updating user organization:", error);
    }
  };

  const sortOrganizations = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const sortedOrganizations = [...organizations].sort(sortOrganizations);

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
        <p className="user__text">Организация:</p>
        <OrganizationSelect
          className="user__role"
          value={user.organizationId}
          onChange={handleChange}
          name="organizationId"
        />
      </div>
      <p className="user__text user__organization">{user?.organizationName}</p>
      <div className="user__buttons">
        <Link to={`/profile/${user.id}`} className="user__profile"></Link>
        <label className="user__checkbox-label">
          <input
            type="checkbox"
            name="isUserAdmin"
            id={`isUserAdmin-${user.id}`}
            className="user__checkbox"
            checked={user.userRole === "Admin"}
            onChange={handleAdminCheckbox}
          />
          Сделать админом
          <span className="user__custom-checkbox"></span>
        </label>
      </div>
    </div>
  );
};

export default UserItem;
