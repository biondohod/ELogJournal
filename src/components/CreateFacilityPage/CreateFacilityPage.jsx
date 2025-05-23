import { useNavigate } from "react-router-dom";
import { useAddFacility } from "../../query/mutations";
import FacilityForm from "../FacilityForm/FacilityForm";
const CreateFacilityPage = () => {
  const { mutateAsync: addFacility, isPending } = useAddFacility();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { shortName, fullName, address, organizationId } = data;
      await addFacility({
        shortName,
        fullName,
        address,
        organizationId,
        subOrganizationId: organizationId,
        userIds: [localStorage.getItem("currentUserId")],
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating facility:", error);
    }
  };
  return (
    <div className="create">
      <p className="title">Создание объекта</p>
      <FacilityForm onSubmit={onSubmit} mode="create" isPending={isPending} />
    </div>
  );
};

export default CreateFacilityPage;
