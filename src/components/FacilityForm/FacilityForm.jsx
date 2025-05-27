import { useForm } from "react-hook-form";
import "./facilityForm.scss";
import { useOrganizations } from "../../query/queries";
import { useEffect, useMemo } from "react";

const FacilityForm = ({
  mode = "create",
  onSubmit: onSubmitProp,
  isPending,
  defaultValues = {},
}) => {
  const { data: organizations = [] } = useOrganizations();
  const processedDefaultValues = useMemo(
    () => ({
      shortName: defaultValues?.shortName || "",
      fullName: defaultValues?.fullName || "",
      address: defaultValues?.address || "",
      organizationId: defaultValues?.organization?.id || "",
    }),
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: processedDefaultValues });

  useEffect(() => {
    reset(processedDefaultValues);
  }, []);

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
        <label htmlFor="shortName" className="facility-form__label">
          Название объекта(короткое) <sup>*</sup>
        </label>
        <input
          type="text"
          id="shortName"
          className="facility-form__input-field"
          {...register("shortName", { required: "Введите название объекта" })}
        />
        {errors.shortName && (
          <span className="facility-form__error">
            {errors.shortName.message}
          </span>
        )}
      </div>
      <div className="facility-form__input">
        <label htmlFor="fullName" className="facility-form__label">
          Название объекта(полное) <sup>*</sup>
        </label>
        <input
          type="text"
          id="fullName"
          className="facility-form__input-field"
          {...register("fullName", { required: "Введите название объекта" })}
        />
        {errors.fullName && (
          <span className="facility-form__error">
            {errors.fullName.message}
          </span>
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
        <label htmlFor="organizationId" className="facility-form__label">
          Организация <sup>*</sup>
        </label>
        <select
          id="organizationId"
          className="facility-form__input-field"
          {...register("organizationId", { required: "Выберите организацию" })}
          defaultValue=""
        >
          {mode === "create" && <option value="">Не указано</option>}
          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </select>
        {errors.organizationId && (
          <span className="facility-form__error">
            {errors.organizationId.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={`button ${
          mode === "edit" ? "button--blue" : "button--white"
        }`}
        disabled={isPending}
      >
        {mode === "create" ? "Добавить объект" : "Сохранить"}
      </button>
    </form>
  );
};

export default FacilityForm;
