import { useForm } from "react-hook-form";
// import "./organizationForm.scss";

const OrganizationForm = ({ mode = "create", onSubmit: onSubmitProp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (onSubmitProp) {
      onSubmitProp(data);
    } else {
      // Для примера: выводим данные в консоль
      console.log(data);
    }
  };

  return (
    <form className="facility-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="facility-form__input">
        <label htmlFor="name" className="facility-form__label">
          Название организации <sup>*</sup>
        </label>
        <input
          type="text"
          id="name"
          className="facility-form__input-field"
          {...register("name", { required: "Введите название организации" })}
        />
        {errors.name && (
          <span className="facility-form__error">{errors.name.message}</span>
        )}
      </div>
      <button
        type="submit"
        className={`button ${
          mode === "edit" ? "button--blue" : "button--white"
        }`}
      >
        {mode === "create" ? "Добавить организацию " : "Сохранить"}
      </button>
    </form>
  );
};

export default OrganizationForm;
