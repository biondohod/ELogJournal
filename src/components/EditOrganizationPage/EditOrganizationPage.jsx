import { useNavigate, useParams } from "react-router-dom";
import OrganizationForm from "../OrganizationForm/OrganizationForm";
import { useEditOrganization } from "../../query/mutations";
import { useOrganizationById } from "../../query/queries";
import Loader from "../Loader/Loader";

const EditOrganizationPage = () => {
  const id = useParams().id;
  const { data, isLoading } = useOrganizationById(id);
  const { mutateAsync: editOrganization, isPending } = useEditOrganization();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { name } = data;
      await editOrganization({ id, data: { name } });
      navigate("/organizations");
    } catch (error) {
      console.error("Error editing organization:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }
  return (
    <div className="create">
      <p className="title">Редактирование организации</p>
      <OrganizationForm
        mode="edit"
        onSubmit={onSubmit}
        isPending={isPending}
        defaultValues={data}
      />
    </div>
  );
};

export default EditOrganizationPage;
