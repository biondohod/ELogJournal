import { useState, useRef } from "react";
import "./fileUploadInput.scss";

const FileUploadInput = ({ onFileChange }) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    onFileChange(null);
    inputRef.current.value = "";
  };

  return (
    <div className="upload">
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="*"
        id="file-upload"
      />
      {!file ? (
        <button
          type="button"
          className="upload__button upload__text"
          onClick={() => inputRef.current.click()}
        >
          Прикрепить файл
        </button>
      ) : (
        <div className="upload__file-info">
          <span className="upload__text">{file.name}</span>
          <button
            type="button"
            className="upload__delete"
            onClick={handleRemove}
          ></button>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
