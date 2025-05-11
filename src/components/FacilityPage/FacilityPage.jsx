import AccountSheets from "../AccoutSheets/AccountSheets";
import FacilityForm from "../FacilityForm/FacilityForm";
import Orders from "../Orders/Orders";
import RegisterSheets from "../RegisterSheets/RegisterSheets";
import Tabs from "../Tabs/Tabs";
import WorkQuestions from "../WorkQuestions/WorkQuestions";
import "./facilityPage.scss";
const FacilityPage = () => {
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
  return (
    <div className="facility-page">
      <div className="facility-page__container">
        <p className="title">Объект "Название объекта"</p>
        <FacilityForm mode="edit" />
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default FacilityPage;
