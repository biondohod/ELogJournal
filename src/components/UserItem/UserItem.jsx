import { Link } from "react-router-dom";
import { prettyDate } from "../../helpers/prettyDate";
import { useEditUser } from "../../query/mutations";
import { useOrganizations } from "../../query/queries";
import "./userItem.scss";
const UserItem = ({ user }) => {
  const { data: organizations = [] } = useOrganizations();
  const { mutateAsync: editUser } = useEditUser();

  const hasOrg =
    organizations.find((org) => org.id === user.organizationId) !== undefined;

  const handleChange = async (e) => {
    const { value } = e.target;
    try {
      await editUser({
        id: user.id,
        data: {
          organizationId: value,
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
        <Link to={`/profile/${user?.id}`} className="user__text">
          {user?.name}
        </Link>
        <p className="user__small-text">Email: {user?.email}</p>
        <p className="user__small-text">
          Дата регистрации: {prettyDate(user?.updateInfo?.createdAt)}
        </p>
      </div>
      <div className="user__select">
        <p className="user__text">Организация:</p>
        <select
          name="role"
          className="user__role user__text"
          defaultValue={hasOrg ? user.organizationId : ""}
          onChange={handleChange}
        >
          {!hasOrg && <option value="">Не указано</option>}
          {sortedOrganizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </select>
      </div>
      <p className="user__text user__organization">{user?.organizationName}</p>
      <div className="user__buttons">
        <button className="user__profile"></button>
        <button className="user__delete"></button>
      </div>
    </div>
  );
};

export default UserItem;
