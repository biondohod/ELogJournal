import { useRef } from "react";
import "./fileUploadInput.scss";

const FileUploadInput = ({ files, onFilesChange, label }) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFilesChange([...(files || []), ...selectedFiles]);
    inputRef.current.value = "";
  };

  const handleRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="upload">
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="*"
        multiple
      />
      <button
        type="button"
        className="upload__button upload__text"
        onClick={() => inputRef.current.click()}
      >
        {label || "Прикрепить файл"}
      </button>
      {files && files.length > 0 && (
        <div>
          {files.map((file, idx) => (
            <div className="upload__file-info" key={idx}>
              <span className="upload__text">{file.name}</span>
              <button
                type="button"
                className="upload__delete"
                onClick={() => handleRemove(idx)}
              ></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
