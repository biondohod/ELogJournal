import { useParams } from "react-router-dom";
import AccountSheets from "../AccoutSheets/AccountSheets";
import FacilityForm from "../FacilityForm/FacilityForm";
import Orders from "../Orders/Orders";
import RegisterSheets from "../RegisterSheets/RegisterSheets";
import Tabs from "../Tabs/Tabs";
import WorkQuestions from "../WorkQuestions/WorkQuestions";
import "./facilityPage.scss";
import { useFacilityById } from "../../query/queries";
import Loader from "../Loader/Loader";
const FacilityPage = () => {
  const { id } = useParams();
  const { data: facility, isLoading } = useFacilityById(id);

  const tabs = [
    { label: "Приказы", name: "Orders", content: <Orders /> },
    {
      label: "Регистрационный лист объекта посещения",
      name: "RegisterSheets",
      content: <RegisterSheets />,
    },
    {
      label: "Учетные листы",
      name: "AccountSheets",
      content: <AccountSheets />,
    },
    {
      label: "Рабочие вопросы",
      name: "WorkQuestions",
      content: <WorkQuestions />,
    },
  ];

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader size={86} />
      </div>
    );
  }

  return (
    <div className="facility-page">
      <div className="facility-page__container">
        <p className="title">Объект {facility.shortName}</p>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default FacilityPage;
