import { useForm } from "react-hook-form";

const RegisterModal = ({ onClose, isPending, onSubmitProp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSubmitProp(data);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__title">Создание записи</p>
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__form-wrapper">
            <label className="modal__label">
              <p className="modal__text">Дата приезда</p>
              <div className="modal__input-container">
                <input
                  type="date"
                  className="modal__input"
                  {...register("arrivalDate", { required: true })}
                />
                {errors.arrivalDate && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <label className="modal__label">
              <p className="modal__text">Дата отъезда</p>
              <div className="modal__input-container">
                <input
                  type="date"
                  className="modal__input"
                  {...register("departureDate", { required: true })}
                />
                {errors.departureDate && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
          </div>
          <button
            type="submit"
            className="button button--blue"
            disabled={isPending}
          >
            Создать запись
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
