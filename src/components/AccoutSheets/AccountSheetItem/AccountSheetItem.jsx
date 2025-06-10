import { prettyDate } from "../../../helpers/prettyDate";
import { useState, useEffect } from "react";
import { useFileById, usePermissionsFacility } from "../../../query/queries";
import { baseToBlobDownload } from "../../../helpers/baseToBlobDownload";
import { useEditRecordSheet } from "../../../query/mutations";

const AccountSheetItem = ({ id, item, onEdit }) => {
  const [activeFile, setActiveFile] = useState(null);
  const { data: fileData, isLoading } = useFileById(activeFile?.id);
  const { mutateAsync: editSheet, isPending } = useEditRecordSheet(id);
  const { data: permissions } = usePermissionsFacility(id);

  // Скачивание файла при получении данных
  useEffect(() => {
    if (fileData && activeFile) {
      baseToBlobDownload(fileData, activeFile.fileName);
      setActiveFile(null);
    }
  }, [fileData, activeFile]);

  const handleFileClick = (file) => {
    setActiveFile({ id: file.id, fileName: file.fileName });
  };

  const handleSignatureClick = async () => {
    const data = {
      representativeId: localStorage.getItem("currentUserId"),
    };
    try {
      await editSheet({ id: item.id, data });
    } catch (error) {
      console.error("Ошибка при добавлении подписи:", error);
    }
  };

  return (
    <tr className="table__row">
      <td className="table__cell table__cell--center">
        {prettyDate(item?.date)}
      </td>
      <td className="table__cell table__cell">{item?.deviations}</td>
      <td className="table__cell">
        <div className="table__cell--flex">
          {item?.deviationFiles?.length > 0
            ? item.deviationFiles.map((file) => (
                <button
                  key={file.id}
                  className="account__file"
                  onClick={() => handleFileClick(file)}
                  disabled={isLoading && activeFile?.id === file.id}
                >
                  {file.fileName}
                </button>
              ))
            : "-"}
          {(permissions?.recordSheetItemPermission?.canUpdateDeviations ||
            permissions?.canUpdate) && (
            <button
              className="button button--blue table__button"
              onClick={onEdit}
            >
              Редактировать
            </button>
          )}
        </div>
      </td>
      <td className="table__cell table__cell">{item?.directions}</td>
      <td className="table__cell">
        <div className="table__cell--flex">
          {item?.directionFiles?.length > 0
            ? item.directionFiles.map((file) => (
                <button
                  key={file.id}
                  className="account__file"
                  onClick={() => handleFileClick(file)}
                  disabled={isLoading && activeFile?.id === file.id}
                >
                  {file.fileName}
                </button>
              ))
            : "-"}
          {(permissions?.recordSheetItemPermission?.canUpdateDirections ||
            permissions?.canUpdate) && (
            <button
              className="button button--blue table__button"
              onClick={onEdit}
            >
              Редактировать
            </button>
          )}
        </div>
      </td>
      <td className="table__cell table__cell--center">
        {item?.specialistSignature || "-"}
      </td>
      <td className="table__cell table__cell--center">
        <div className="table__cell--flex">
          {item?.representativeSignature ||
            (permissions?.recordSheetItemPermission
              ?.canUpdateRepresentativeId || permissions?.canUpdate ? (
              <button
                className="button button--blue table__button"
                onClick={handleSignatureClick}
              >
                Подписать
              </button>
            ) : (
              <span>-</span>
            ))}
        </div>
      </td>
    </tr>
  );
};

export default AccountSheetItem;
