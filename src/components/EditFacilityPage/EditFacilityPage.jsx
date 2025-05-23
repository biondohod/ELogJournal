import { useNavigate, useParams } from "react-router-dom";
import { useEditFacility } from "../../query/mutations";
import FacilityForm from "../FacilityForm/FacilityForm";
import { useFacilityById } from "../../query/queries";
import Loader from "../Loader/Loader";
const EditFacilityPage = () => {
  const { id } = useParams();
  const { data: facility, isLoading } = useFacilityById(id);
  const { mutateAsync: editFacility, isPending } = useEditFacility();
  const navigate = useNavigate();

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
  return (
    <div className="create">
      <p className="title">Редактирование объекта</p>
      <FacilityForm
        onSubmit={onSubmit}
        mode="edit"
        isPending={isPending}
        defaultValues={facility}
      />
    </div>
  );
};

export default EditFacilityPage;
