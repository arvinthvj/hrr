import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SampleCsvDownloadFilename,
  SampleCsvDownloadPath,
  ValidationMessages,
} from './constant';
import { Card, Col } from 'antd';
import { getCSVFileFroms3Bucket } from '../../services/s3Bucket';

export const AssetBulkUpload = ({
  CancelBulkUpload,
  handleFileValidate,
  setModelLoader,
  HeadName,
  sampleDownload = '',
  asset_type,
  openBulkUpload,
}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState({ name: '', type: '' });
  const [resdata, setResData] = useState('');

  const handleFileUpload = e => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile?.type == 'text/csv' ||
      selectedFile?.type == 'application/vnd.ms-excel' ||
      selectedFile?.type == 'application/csv'
    ) {
      setFileName({
        ...fileName,
        name: selectedFile?.name,
        type: 'success',
      });
      setFile(selectedFile);
    } else
      setFileName({
        ...fileName,
        name: selectedFile
          ? ValidationMessages.csvFileTypeError
          : ValidationMessages.noFileError,
        type: 'error',
      });
  };
  const ValidationReport = (data = '') => {
    setResData(data);
  };
  const downloadCsvTemplate = () => {
    // const url =
    //   sampleDownload === "user"
    //     ? SampleCsvDownloadPath.user
    //     : asset_type == 1
    //     ? SampleCsvDownloadPath.workspace
    //     : asset_type == 2
    //     ? SampleCsvDownloadPath.room
    //     : SampleCsvDownloadPath.parking;
    // const link = document.createElement("a");
    // link.href = url;
    // link.download =
    //   sampleDownload === "user" ? "User-sample.csv" : "Asset-sample.csv";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    const csvFileName =
      sampleDownload === 'user'
        ? SampleCsvDownloadFilename.user
        : asset_type == 1
        ? SampleCsvDownloadFilename.workspace
        : asset_type == 2
        ? SampleCsvDownloadFilename.room
        : SampleCsvDownloadFilename.parking;
    getCSVFileFroms3Bucket(csvFileName, data => {
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download =
          sampleDownload === 'user' ? 'User-sample.csv' : 'Asset-sample.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };
  return (
    <div
      className={` col-xl-3 col-sm-12 new-location-plus left-right-space book-right-card-user main-space-remove-left  ${'d-flex locations-create locations-create-right active book-right-card main-space-remove-left'} `}
      style={{
        maxWidth: '100vw',
        position: 'absolute',
      }}
    >
      <div className="card location-right-hight asset-bulk-card w-100 p-0">
        <div className="location-set">
          <div className="location-back-head">
            <h2>{HeadName}</h2>
          </div>
          <div className="location-btn-head">
            <button
              className="btn btn-primary validate-btn"
              // to="#"
              disabled={fileName?.type === 'success' ? false : true}
              onClick={() => {
                file && handleFileValidate(file, ValidationReport);
              }}
              data-bs-toggle="modal"
              data-bs-target="#bulkupload-modal"
            >
              Validate
            </button>
            <Link
              className="btn link-cancels"
              to="#"
              onClick={CancelBulkUpload}
            >
              Cancel
            </Link>
          </div>
        </div>
        <div className="asset-inner">
          <div className="form-group">
            <div className="download-set-up">
              <h6>
                <Link to="#" onClick={downloadCsvTemplate}>
                  Download CSV template
                </Link>
              </h6>
              <div className="settings-template-btn">
                <label className="file-upload image-upbtn">
                  Select file
                  <input
                    type="file"
                    accept="text/csv,application/vnd.ms-excel,application/csv"
                    onChange={e => {
                      handleFileUpload(e);
                    }}
                  />
                </label>
              </div>
              <p className={fileName?.type === 'error' ? 'text-danger' : ''}>
                {fileName?.name ? fileName?.name : 'No file chosen'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
