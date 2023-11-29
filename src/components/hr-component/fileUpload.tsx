import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';

const FileUpload = ({ files, handleFileInputChange, removeImage }) => {
  const fileInputRef = useRef(null);
  return (
    <div className="form-group tab-form-group tab-files">
      {files.length > 0 &&
        files.map((obj, index) => {
          return (
            obj != '' && (
              <div key={index} className="tab-files-text">
                <p>{obj}</p>
                <Link
                  to="#"
                  className="btn"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                    removeImage(index);
                  }}
                >
                  <i className="far fa-trash-can" />
                </Link>
              </div>
            )
          );
        })}

      <div className="tab-file-upload">
        <label>
          <i className="fas fa-plus" />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
          />
        </label>
        <div className="tab-file-upload-content">
          <p>
            {findLabelText('Maximum_file_size', 'Maximum file size', 'Hr')}: 1
            MB
          </p>
          <p>
            {findLabelText('Accepted_formats', 'Accepted formats', 'Hr')}: PDF,
            JPEG
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
