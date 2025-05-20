import { useForm } from "react-hook-form";
import "./organizationForm.scss";

const OrganizationForm = ({
  mode = "create",
  onSubmit: onSubmitProp,
  isPending,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (onSubmitProp) {
      onSubmitProp(data);
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
          autoComplete="off"
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
        disabled={isPending}
      >
        {mode === "create" ? "Добавить организацию " : "Сохранить"}
      </button>
    </form>
  );
};

export default OrganizationForm;
