import "./FacilityForm.scss";
const FacilityForm = ({ mode = "create" }) => {
  return (
    <form className="facility-form">
      <div className="facility-form__input">
        <label htmlFor="name" className="facility-form__label">
          Название объекта <sup>*</sup>
        </label>
        <input type="text" id="name" className="facility-form__input-field" />
      </div>
      <div className="facility-form__input">
        <label htmlFor="address" className="facility-form__label">
          Адрес объекта <sup>*</sup>
        </label>
        <input
          type="text"
          id="address"
          className="facility-form__input-field"
        />
      </div>
      <div className="facility-form__input">
        <label htmlFor="description" className="facility-form__label">
          Описание объекта
        </label>
        <textarea
          id="description"
          className="facility-form__textarea"
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
