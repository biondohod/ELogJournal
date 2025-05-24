import { useForm } from "react-hook-form";

const WorkAnswerModal = ({ onClose, isPending, onSubmitProp }) => {
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
        <p className="modal__title">Добавление ответа</p>
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__form-wrapper">
            <label className="modal__label modal__label--account">
              <p className="modal__text">Текст ответа</p>
              <div className="modal__input-container">
                <textarea
                  type="text"
                  className="modal__input modal__input--textarea"
                  {...register("answer", { required: true })}
                />
                {errors.answer && (
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
            Добавить ответ
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkAnswerModal;
