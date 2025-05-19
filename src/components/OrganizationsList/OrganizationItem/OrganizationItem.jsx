const OrganizationItem = ({ org }) => {
  return (
    <li className="organization-item">
      <p className="organization-item__title">{org.name}</p>
      <p className="organization-item__title">
        Пользователей: {org.userIds.length}
      </p>
    </li>
  );
};

export default OrganizationItem;
