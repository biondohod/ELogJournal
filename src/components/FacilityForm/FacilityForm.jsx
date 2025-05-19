import { useForm } from "react-hook-form";
import "./FacilityForm.scss";

const FacilityForm = ({ mode = "create", onSubmit: onSubmitProp }) => {
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
          Название объекта <sup>*</sup>
        </label>
        <input
          type="text"
          id="name"
          className="facility-form__input-field"
          {...register("name", { required: "Введите название объекта" })}
        />
        {errors.name && (
          <span className="facility-form__error">{errors.name.message}</span>
        )}
      </div>
      <div className="facility-form__input">
        <label htmlFor="address" className="facility-form__label">
          Адрес объекта <sup>*</sup>
        </label>
        <input
          type="text"
          id="address"
          className="facility-form__input-field"
          {...register("address", { required: "Введите адрес объекта" })}
        />
        {errors.address && (
          <span className="facility-form__error">{errors.address.message}</span>
        )}
      </div>
      <div className="facility-form__input">
        <label htmlFor="description" className="facility-form__label">
          Описание объекта
        </label>
        <textarea
          id="description"
          className="facility-form__textarea"
          {...register("description")}
        ></textarea>
      </div>
      <button
        type="submit"
        className={`button ${
          mode === "edit" ? "button--blue" : "button--white"
        }`}
      >
        {mode === "create" ? "Добавить объекта " : "Сохранить"}
      </button>
    </form>
  );
};

export default FacilityForm;
