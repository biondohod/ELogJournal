export const baseToBlobDownload = (data, name) => {
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
  const fileName = name || "downloaded_file";

  // Создаем ссылку и кликаем по ней
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
