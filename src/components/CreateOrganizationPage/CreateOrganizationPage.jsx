import OrganizationForm from "../OrganizationForm/OrganizationForm";
import "./createOrganizationPage.scss";
const CreateOrganizationPage = () => {
  return (
    <div className="create">
      <p className="title">Создание организации</p>
      <OrganizationForm mode="create" />
    </div>
  );
};

export default CreateOrganizationPage;
