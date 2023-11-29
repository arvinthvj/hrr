import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { getImageFroms3Bucket } from '../../services/s3Bucket';
import { return_icon1, return_icon2, return_icon3 } from '../imagepath';
import { Modal } from 'react-bootstrap';

interface BulkUploadProps {
  data: Object | any;
  modelLoader: any;
  cancel?: CallableFunction | any;
  confirm?: CallableFunction | any;
  header: string;
  content?: string;
  proceedButton?: string;
  cancelButton?: string;
  warning?: any;
}

export const BulkUploadValidationModel: React.FC<BulkUploadProps> = ({
  data = '',
  modelLoader,
  cancel,
  confirm,
  header,
  proceedButton = 'Upload',
  cancelButton = 'Cancel',
}) => {
  const dispatch = useDispatch();

  const handleDownload = async () => {
    data &&
      getImageFroms3Bucket(
        data?.validation_file_path,
        'csv',
        data => {
          const link: any = document.createElement('a');
          link.href = data;
          link.setAttribute('download', 'validation_report.csv');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        },
        false,
        '',
      );
  };
  useEffect(() => {
    modelLoader ? dispatch(showLoader()) : dispatch(hideLoader());
  }, [modelLoader]);
  return (
    <Modal
      className="modal main-modal main-modal-info fade modal-dialog modal-dialog-centered modal-lg"
      show={true}
      centered
      data-keyboard="false"
      data-backdrop="static"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4>{header}</h4>
          <button
            type="button"
            className="close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={cancel}
          >
            <i className="feather-x"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="return-info">
            <div className="return-content">
              <h6>{`Out of a total of ${
                data ? data?.total_entries || '0' : '...'
              } entries you have uploaded...`}</h6>
              <ul className="nav return-list">
                <li>
                  <p>
                    <img src={return_icon1} alt="icon" />{' '}
                    {`${
                      data ? data?.success_entries || '0' : '...'
                    } are successful`}
                    <span> While</span>
                  </p>
                </li>
                <li>
                  <p>
                    <img src={return_icon2} alt="icon" />{' '}
                    {` ${
                      data ? data?.invalid_entries || '0' : '...'
                    } are entries are invalid  `}
                    <span> &amp;</span>
                  </p>
                </li>
                <li>
                  <p>
                    <img src={return_icon3} alt="icon" />{' '}
                    {`${
                      data ? data?.already_exist_entries || '0' : '...'
                    } entries already exist in our system`}
                  </p>
                </li>
              </ul>
              <p className="upload-check">
                If you wish to make changes and re-upload, click:
              </p>
            </div>
            <div className="return-btn">
              <Link
                to="#"
                id="CloseBulkUploadModel"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={cancel}
              >
                {cancelButton}
              </Link>
              <button
                // to="#"
                className="btn btn-primary upload-btn"
                disabled={data?.success_entries > 0 ? false : true}
                onClick={data?.success_entries > 0 ? confirm : () => {}}
              >
                {proceedButton}
              </button>
            </div>
            <div className="return-validation">
              <p>For more information:</p>
              <Link to="#" onClick={handleDownload}>
                Download validation report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
