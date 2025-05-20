import { useNavigate } from "react-router-dom";
import { useAddOrganization } from "../../query/mutations";
import OrganizationForm from "../OrganizationForm/OrganizationForm";
const CreateOrganizationPage = () => {
  const { mutateAsync: addOrganization, isPending } = useAddOrganization();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await addOrganization(data);
      navigate("/organizations");
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };
  return (
    <div className="create">
      <p className="title">Создание организации</p>
      <OrganizationForm
        mode="create"
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default CreateOrganizationPage;
