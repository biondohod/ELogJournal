import FacilityForm from "../FacilityForm/FacilityForm";
import "./createFacilityPage.scss";
const CreateFacilityPage = () => {
  return (
    <div className="create">
      <p className="title">Создание объекта</p>
      <FacilityForm />
    </div>
  );
};

export default CreateFacilityPage;
