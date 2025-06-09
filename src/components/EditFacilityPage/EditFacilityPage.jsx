import { useNavigate, useParams } from "react-router-dom";
import { useEditFacility } from "../../query/mutations";
import FacilityForm from "../FacilityForm/FacilityForm";
import { useFacilityById, useUserList } from "../../query/queries";
import Loader from "../Loader/Loader";
import { useState } from "react";
import UserItemRole from "../UserItem/UserItemRole";
const EditFacilityPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data = [] } = useUserList();
  const { id } = useParams();
  const { data: facility, isLoading } = useFacilityById(id);
  const { mutateAsync: editFacility, isPending } = useEditFacility();
  const navigate = useNavigate();

  const filteredUsers = data.filter((user) => {
    const search = searchValue.toLowerCase();
    return (
      user.email?.toLowerCase().includes(search) ||
      user.name?.toLowerCase().includes(search) ||
      user.surname?.toLowerCase().includes(search) ||
      user.patronymic?.toLowerCase().includes(search)
    );
  });

  const onSubmit = async (data) => {
    try {
      await editFacility({ id, data });
      navigate("/");
    } catch (error) {
      console.error("Error creating facility:", error);
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }
  console.log(facility.constructionSiteUserRoles);

  return (
    <div className="create">
      <p className="title">Редактирование объекта</p>
      <FacilityForm
        onSubmit={onSubmit}
        mode="edit"
        isPending={isPending}
        defaultValues={facility}
      />
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
            {filteredUsers.map((user) => {
              // Найти роль пользователя по userId в facility.constructionSiteUserRoles
              let userRole = undefined;
              if (facility?.constructionSiteUserRoles) {
                const found = Object.values(
                  facility?.constructionSiteUserRoles
                ).find((item) => item.userId === user.id);
                if (found) userRole = found.role;
              }
              return (
                <li key={user.id} className="admin__item">
                  <UserItemRole
                    user={user}
                    role={userRole}
                    facilityId={facility?.id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditFacilityPage;
