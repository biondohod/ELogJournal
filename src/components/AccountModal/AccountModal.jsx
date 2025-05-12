import { useForm } from "react-hook-form";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import { useState } from "react";
const AccountModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const [file, setFile] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setValue("file", selectedFile);
    if (selectedFile) {
      clearErrors("file");
    }
  };

  const onSubmit = (data) => {
    // Здесь можно обработать данные формы
    console.log(data);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__title">Создание записи</p>
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__form-wrapper">
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                Выявленные отступления от проектно-сметной документации,
                нарушения требований строительных норм и правил и технических
                условий по производству строительно-монтажных работ<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  className="modal__input modal__input--textarea"
                  {...register("deviations", { required: true })}
                />
                {errors.deviations && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                Указания об устранении выявленных отступлений или нарушений и
                сроки их выполнения<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  className="modal__input modal__input--textarea"
                  {...register("deadlines", { required: true })}
                />
                {errors.deadlines && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                Подпись специалиста, осуществляющего авторский надзор,
                выполняющего запись (фамилия, инициалы, должность)<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  className="modal__input modal__input--textarea"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                С записью ознакомлен представитель: а) подрядчика; б) заказчика
                (фамилия, инициалы, должность, дата)<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  className="modal__input modal__input--textarea"
                  {...register("agreement", { required: true })}
                />
                {errors.agreement && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                Отметка о выполнении указаний: а) подрядчика; б) заказчика
                (фамилия, инициалы, должность, дата)<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  type="text"
                  className="modal__input modal__input--textarea"
                  {...register("mark", { required: true })}
                />
                {errors.mark && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <FileUploadInput onFileChange={handleFileChange} />
          </div>
          <button type="submit" className="button button--blue">
            Создать запись
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
