import { useForm } from "react-hook-form";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import { useState } from "react";
import { useAddRecordSheet, useUploadFile } from "../../query/mutations";

const AccountModal = ({ id, sheetId, onClose }) => {
  const [deviationFiles, setDeviationFiles] = useState([]);
  const [directionFiles, setDirectionFiles] = useState([]);
  const { mutateAsync: uploadFile, isPending: isPendingUploadFile } =
    useUploadFile();
  const { mutateAsync: addRecordSheet, isPending: isPendingRecordSheet } =
    useAddRecordSheet(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadFilesAndGetIds = async (files) => {
    const ids = [];
    for (const file of files) {
      const res = await uploadFile(file);
      ids.push(res.fileId);
    }
    return ids;
  };

  const onSubmit = async (formData) => {
    const deviationFilesIds = await uploadFilesAndGetIds(deviationFiles);
    const directionFilesIds = await uploadFilesAndGetIds(directionFiles);

    const data = {
      ...formData,
      deviationFilesIds,
      directionFilesIds,
      recordSheetId: sheetId,
    };
    await addRecordSheet(data);
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
            <FileUploadInput
              files={deviationFiles}
              onFilesChange={setDeviationFiles}
              label="Файлы по отступлениям"
            />
            <label className="modal__label modal__label--account">
              <p className="modal__text">
                Указания об устранении выявленных отступлений или нарушений и
                сроки их выполнения<sup>*</sup>
              </p>
              <div className="modal__input-container">
                <textarea
                  className="modal__input modal__input--textarea"
                  {...register("directions", { required: true })}
                />
                {errors.directions && (
                  <span className="modal__error">Обязательное поле</span>
                )}
              </div>
            </label>
            <FileUploadInput
              files={directionFiles}
              onFilesChange={setDirectionFiles}
              label="Файлы по указаниям"
            />
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
