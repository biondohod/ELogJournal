import { useForm } from "react-hook-form";
import FileUploadInput from "../FileUploadInput/FileUploadInput";
import { useState, useEffect } from "react";
import { useEditRecordSheet, useUploadFile } from "../../query/mutations";

const AccountModalEdit = ({ id, sheetId, onClose, item }) => {
  // Сохраняем новые файлы и id удалённых файлов
  const [deviationFiles, setDeviationFiles] = useState([]);
  const [directionFiles, setDirectionFiles] = useState([]);
  const [removedDeviationFileIds, setRemovedDeviationFileIds] = useState([]);
  const [removedDirectionFileIds, setRemovedDirectionFileIds] = useState([]);

  // Инициализация дефолтных файлов
  useEffect(() => {
    setDeviationFiles(item?.deviationFiles || []);
    setDirectionFiles(item?.directionFiles || []);
  }, [item]);

  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: editRecordSheet } = useEditRecordSheet(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Определяем, файл это новый или уже существующий
  const isNewFile = (file) => file instanceof File;

  // Удаление файла
  const handleRemoveDeviationFile = (index) => {
    const file = deviationFiles[index];
    if (!isNewFile(file)) {
      setRemovedDeviationFileIds((prev) => [...prev, file.id]);
    }
    setDeviationFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveDirectionFile = (index) => {
    const file = directionFiles[index];
    if (!isNewFile(file)) {
      setRemovedDirectionFileIds((prev) => [...prev, file.id]);
    }
    setDirectionFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Загрузка новых файлов и получение их id
  const uploadFilesAndGetIds = async (files) => {
    const ids = [];
    for (const file of files) {
      if (isNewFile(file)) {
        const res = await uploadFile(file);
        ids.push(res.fileId);
      }
    }
    return ids;
  };

  const onSubmit = async (formData) => {
    const deviationFilesAdd = await uploadFilesAndGetIds(deviationFiles);
    const directionFilesAdd = await uploadFilesAndGetIds(directionFiles);

    const data = {
      // ...другие поля формы, если нужны
      deviationFilesIds: {
        add: deviationFilesAdd,
        remove: removedDeviationFileIds,
      },
      directionFilesIds: {
        add: directionFilesAdd,
        remove: removedDirectionFileIds,
      },
    };
    await editRecordSheet({ id: item?.id, data });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__title">Редактирование записи</p>
        <button className="modal__close" onClick={onClose}></button>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="modal__form-wrapper">
            <FileUploadInput
              files={deviationFiles}
              onFilesChange={setDeviationFiles}
              label="Файлы по отступлениям"
              onRemove={handleRemoveDeviationFile}
            />
            <FileUploadInput
              files={directionFiles}
              onFilesChange={setDirectionFiles}
              label="Файлы по указаниям"
              onRemove={handleRemoveDirectionFile}
            />
          </div>
          <button type="submit" className="button button--blue">
            Редактировать запись
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountModalEdit;
// ...existing code...
