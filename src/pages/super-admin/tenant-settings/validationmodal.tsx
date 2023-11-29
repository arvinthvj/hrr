import React from 'react';
import { Link } from 'react-router-dom';
import {
  return_icon1,
  return_icon2,
  return_icon3,
} from '../../../components/imagepath';
import { Modal } from 'react-bootstrap';
import { findLabelText } from '../../../components/commonMethod';
import { TenantLabelText } from '../../../components/tenantComponent/constants';
export const ValidationModal = ({ showValidationModal, details, close }) => {
  return (
    <Modal
      show={showValidationModal}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div
        className="validation-modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-header">
          <h4>
            {findLabelText(
              TenantLabelText.file_validation,
              TenantLabelText.file_validation,
              TenantLabelText.Common_Values,
            )}
          </h4>
          <button
            onClick={() => {
              close();
            }}
            type="button"
            className="close me-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="feather-x" />
          </button>
        </div>
        <div className="modal-body">
          <div className="return-info">
            <div className="return-content">
              <h6>
                {findLabelText(
                  TenantLabelText.Out_of_total,
                  TenantLabelText.Out_of_total,
                  TenantLabelText.Common_Values,
                )}
                {details?.overall?.total_entries}
                {findLabelText(
                  TenantLabelText.entries_uploaded,
                  TenantLabelText.entries_uploaded,
                  TenantLabelText.Common_Values,
                )}
              </h6>
              <ul className="nav return-list">
                <li>
                  <p>
                    <img src={return_icon1} alt="icon" />{' '}
                    {details?.overall?.success_entries}
                    {findLabelText(
                      TenantLabelText.are_successful,
                      TenantLabelText.are_successful,
                      TenantLabelText.Common_Values,
                    )}
                    <span>
                      {findLabelText(
                        TenantLabelText.While,
                        TenantLabelText.While,
                        TenantLabelText.Common_Values,
                      )}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    <img src={return_icon2} alt="icon" />{' '}
                    {details?.overall?.invalid_entries}{' '}
                    {findLabelText(
                      TenantLabelText.entries_invalid,
                      TenantLabelText.entries_invalid,
                      TenantLabelText.Common_Values,
                    )}
                    <span>&amp;</span>
                  </p>
                </li>
                <li>
                  <p>
                    <img src={return_icon3} alt="icon" />{' '}
                    {details?.overall?.already_exist_entries}{' '}
                    {findLabelText(
                      TenantLabelText.entries_system,
                      TenantLabelText.entries_system,
                      TenantLabelText.Common_Values,
                    )}
                  </p>
                </li>
              </ul>
              <p className="upload-check">
                {findLabelText(
                  TenantLabelText.re_upload,
                  TenantLabelText.re_upload,
                  TenantLabelText.Common_Values,
                )}
              </p>
            </div>
            <div className="return-btn">
              <Link to="#" className="btn super-admin-btn-primary">
                {findLabelText(
                  TenantLabelText.Return,
                  TenantLabelText.Return,
                  TenantLabelText.Common_Values,
                )}
              </Link>
              <p>
                {findLabelText(
                  TenantLabelText.further_breakdown,
                  TenantLabelText.further_breakdown,
                  TenantLabelText.Common_Values,
                )}
              </p>
            </div>
          </div>
          <div className="file-validation-info">
            {details?.others && Object.keys(details.others).length > 0
              ? Object.keys(details.others).map((obj, index) => {
                  const data = details.others[obj];
                  const success = data?.success_entries
                    ? data?.success_entries
                    : 0;
                  const total = data?.total_entries ? data?.total_entries : 0;
                  const invalid = data?.invalid_entries
                    ? data?.invalid_entries
                    : 0;
                  const alreadyExist = data?.already_exist_entries
                    ? data?.already_exist_entries
                    : 0;
                  return (
                    <div key={index} className="validation-details">
                      <div
                        className={
                          index % 2 == 0
                            ? 'validation-left'
                            : 'validation-right'
                        }
                      >
                        <div className="return-info">
                          <div className="return-content">
                            <h4>{obj}</h4>
                            <h6>
                              {findLabelText(
                                TenantLabelText.Out_of_total,
                                TenantLabelText.Out_of_total,
                                TenantLabelText.Common_Values,
                              )}
                              {total}
                              {findLabelText(
                                TenantLabelText.entries_uploaded,
                                TenantLabelText.entries_uploaded,
                                TenantLabelText.Common_Values,
                              )}
                            </h6>
                            <ul className="return-list">
                              <li>
                                <div className="return-details">
                                  <span className="return-icon">
                                    <img src={return_icon1} alt="icon" />
                                  </span>
                                  <p>
                                    {success}
                                    {findLabelText(
                                      TenantLabelText.aresuccessful,
                                      TenantLabelText.aresuccessful,
                                      TenantLabelText.Common_Values,
                                    )}
                                    <span>
                                      {findLabelText(
                                        TenantLabelText.While,
                                        TenantLabelText.While,
                                        TenantLabelText.Common_Values,
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="return-details">
                                  <span className="return-icon">
                                    <img src={return_icon2} alt="icon" />
                                  </span>
                                  <p>
                                    {invalid}
                                    {findLabelText(
                                      TenantLabelText.entries_invalid,
                                      TenantLabelText.entries_invalid,
                                      TenantLabelText.Common_Values,
                                    )}
                                    <span>&amp;</span>
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="return-details">
                                  <span className="return-icon">
                                    <img src={return_icon3} alt="icon" />
                                  </span>
                                  <p>
                                    {alreadyExist}
                                    {findLabelText(
                                      TenantLabelText.entries_system,
                                      TenantLabelText.entries_system,
                                      TenantLabelText.Common_Values,
                                    )}
                                  </p>
                                </div>
                              </li>
                            </ul>
                            <p className="upload-check">
                              {findLabelText(
                                TenantLabelText.reportfile,
                                TenantLabelText.reportfile,
                                TenantLabelText.Common_Values,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ValidationModal;
