import { prettyDate } from "../../../helpers/prettyDate";
import { useFileById } from "../../../query/queries";

const OrderItem = ({ order }) => {
  const { data, isLoading } = useFileById(order?.file?.id);

  const handleDownload = () => {
    if (!data) return;
    // Преобразуем base64 в Blob
    const byteCharacters = atob(data.fileContents);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: data.contentType });

    // Имя файла
    const fileName = order?.file?.fileName || "downloaded_file";

    // Создаем ссылку и кликаем по ней
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <tr className="table__row">
      <td className="table__cell">{order?.file?.fileName}</td>
      <td className="table__cell">{prettyDate(order?.file?.uploadDate)}</td>
      <td className="table__cell table__cell--center">
        <button
          className="table__save"
          onClick={handleDownload}
          disabled={isLoading}
        ></button>
      </td>
    </tr>
  );
};

export default OrderItem;
