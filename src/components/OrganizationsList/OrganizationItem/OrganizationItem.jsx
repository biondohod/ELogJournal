import { useState } from "react";
import { Link } from "react-router-dom";
import OrganizationItemModal from "./OrganizationItemModal";

const OrganizationItem = ({ org }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <li className="organization-item">
        <p className="organization-item__title">{org.name}</p>
        <p
          className="organization-item__title organization-item__title--hover"
          onClick={handleOpenModal}
        >
          Пользователей: {org.userIds.length}
        </p>
        <Link
          to={`/organizations/edit/${org.id}`}
          className="button button--blue"
        >
          Редактировать
        </Link>
      </li>
      {openModal && (
        <OrganizationItemModal
          organizationName={org?.name}
          ids={org?.userIds}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default OrganizationItem;
