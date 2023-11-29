import React from 'react';
import { postDatawithtoken } from '../../../services/apiservice';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import Toaster from '../../../components/toast';
import { useDispatch } from 'react-redux';
import { TenantBulkUpload } from '../../../services/apiurl';
import { getData } from '../../../services/apicall';
import { findLabelText } from '../../../components/commonMethod';
import { TenantLabelText } from '../../../components/tenantComponent/constants';
export const UploadCSV = ({
  isActive,
  setIsActive,
  tenantId,
  editDetails,
  csvTemplate,
  setValidationDetails,
  setShowValidationModalFlag,
}) => {
  const dispatch = useDispatch();
  const uploadCsvFile = async e => {
    const csvFile = e.target.files[0];
    if (csvFile.name.includes('.csv') || csvFile.name.includes('.xlsx')) {
      dispatch(showLoader());
      handleImageUploadtoS3Bucket(
        csvFile,
        'csv',
        data => {
          const formData = new FormData();
          formData.append('file', data);
          formData.append('tenant_email', editDetails.tenant_email);
          formData.append('tenant_id', editDetails.tenant_id);
          formData.append('tenant_name', editDetails?.name);
          postDatawithtoken(TenantBulkUpload, formData)
            .then(res => {
              getData(
                res.data.data,
                (successData, responce) => {
                  Toaster(res.data.code, res.data.message);
                  if (res.data.code == '200') {
                    setValidationDetails(successData);
                    setShowValidationModalFlag(true);
                  } else {
                    setValidationDetails({});
                    setShowValidationModalFlag(false);
                  }
                },
                res,
              );
              dispatch(hideLoader());
            })
            .catch(err => {
              Toaster('500', 'Something went worng');
              dispatch(hideLoader());
            });
        },
        '',
        'tenant',
        editDetails?.name + '_' + editDetails.tenant_id,
      );
    } else {
      dispatch(hideLoader());
      Toaster('500', 'its not a xlsx or csv file');
    }
  };
  return (
    <div>
      <div className="super-admin-table-checkbox sidebar-checkbox">
        <label className="super_admin_custom_check d-inline-flex align-items-center">
          <input
            type="checkbox"
            name="active"
            onChange={() => {
              if (isActive) {
                setIsActive(false);
              } else {
                setIsActive(true);
              }
            }}
            checked={isActive}
          />
          {findLabelText(
            TenantLabelText.Active,
            TenantLabelText.Active,
            TenantLabelText.Common_Values,
          )}
          <span className="super_admin_checkmark" />
        </label>
      </div>
      {tenantId ? (
        <div className="form-group">
          <div className="download-set-up">
            <a
              href={csvTemplate}
              target="_blank"
              className="downloadcsv"
              rel="noreferrer"
              download={'Template.csv'}
            >
              <h6>
                {findLabelText(
                  TenantLabelText.Download_template,
                  TenantLabelText.Download_template,
                  TenantLabelText.Common_Values,
                )}
              </h6>
            </a>
            <div className="settings-template-btn">
              <label>
                {findLabelText(
                  TenantLabelText.Upload_data_file,
                  TenantLabelText.Upload_data_file,
                  TenantLabelText.Common_Values,
                )}
                <input type="file" id="csv" onChange={uploadCsvFile} />
              </label>
            </div>
            <p>
              {findLabelText(
                TenantLabelText.No_file_uploaded,
                TenantLabelText.No_file_uploaded,
                TenantLabelText.Common_Values,
              )}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export const preparSuccessData = (
  success,
  details,
  startDate,
  endDate,
  selectedLoginType,
) => {
  const list = success;
  list['tenant_id'] = success.id;
  list['initial_config'] = details.initialConfiguration;
  list['plan'] = details.plan;
  list['first_name'] = details.firstName;
  list['last_name'] = details.lastName;
  list['server_location'] = details.serverLocations;
  list['login_type'] = details.loginType;
  list['start_date'] = startDate;
  list['end_date'] = endDate;
  list['mobile_identity_provider'] =
    selectedLoginType?.name == 'SSO' ? details.mobileIdentityProvider : {};
  list['web_identity_provider'] =
    selectedLoginType?.name == 'SSO' ? details.webIdentityProvider : {};
  list['calendar_integration'] = details.calendarIntegration;
  list['total_user'] = success?.total_user ? success?.total_user : 0;
  list['total_workspaces'] = success?.total_workspaces
    ? success?.total_workspaces
    : 0;
  list['total_rooms'] = success?.total_rooms ? success?.total_rooms : 0;
  list['total_parking'] = success?.total_parking ? success?.total_parking : 0;
  return list;
};

export const SSOCheck = ({ setIsSSOLoginAudit, isSSOLoginAudit }) => {
  return (
    <div>
      <div className="form-group">
        <label className="settings-radio-label">
          {findLabelText(
            TenantLabelText.SSO_login_audit_enabled,
            TenantLabelText.SSO_login_audit_enabled,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="settings-radio-btns">
          <label className="super_admin_custom_radio">
            <input
              type="radio"
              onChange={() => {
                setIsSSOLoginAudit(!isSSOLoginAudit);
              }}
              checked={isSSOLoginAudit ? true : false}
            />
            <span className="super_admin_checkmark" />
            {findLabelText(
              TenantLabelText.Yes,
              TenantLabelText.Yes,
              TenantLabelText.Common_Values,
            )}
          </label>
          <label className="super_admin_custom_radio">
            <input
              type="radio"
              onChange={() => {
                setIsSSOLoginAudit(!isSSOLoginAudit);
              }}
              checked={isSSOLoginAudit ? false : true}
            />
            <span className="super_admin_checkmark" />
            {findLabelText(
              TenantLabelText.No,
              TenantLabelText.No,
              TenantLabelText.Common_Values,
            )}
          </label>
        </div>
      </div>
    </div>
  );
};
