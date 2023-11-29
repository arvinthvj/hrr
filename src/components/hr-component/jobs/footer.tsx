import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../../services/apicall';
import { hrJobsWorkInformationAdd } from '../../../services/apiurl';
import Toaster from '../../toast';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import { PersonalContext } from '../personalController';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../commonMethod';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const FormFooter = ({
  handleSubmit,
  isDirty,
  errors,
  setCancel,
  removeDisabled,
  setRemoveDisabled,
}) => {
  const dispatch = useDispatch();
  const { GetJobDetails, getUserPersonalDetails, userID } =
    useContext(PersonalContext);

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      employee_id: data?.employee_id,
      country_code: data?.countrycode1?.value,
      company_phone: data?.companyPhone,
      company_phone_ext: data?.Extension,
      company_mobile: data?.phoneNumber,
      company_mobile_ext: data?.countrycode2?.value,
      work_email: data?.Email,
      grade: data?.Grade,
      work_status: data?.Status?.value,
      probation_end: getUserPreferedDateFormatToSave(data?.Probation),
      notice_period: data?.notice,
      timeoff_profile: data?.profile?.id,
      work_calender: data?.calendar?.value,
      cost_center: data?.Cost,
      work_location: data?.Location,
      work_street: data?.Street,
      work_suburb: data?.Suburb,
      work_city: data?.City,
      work_state: data?.State,
      work_region: data?.Region,
      work_country: data?.Country,
    };
    dispatch(showLoader());
    postData(hrJobsWorkInformationAdd, payload, getResponse);
  };
  const getResponse = (data, res) => {
    if (res?.data?.code == 200) {
      Toaster(res?.data?.code, res?.data?.message);
    } else if (res?.data?.code == 204) {
      Toaster(res?.data?.code, res?.data?.message);
    } else {
      Toaster(Errorcode, ErrorMessage);
    }
    dispatch(hideLoader());
    getUserPersonalDetails();
    GetJobDetails();
    setRemoveDisabled(false);
  };
  return (
    <div className="personal-footer">
      <Link
        to="#"
        className="btn"
        onClick={() => {
          setCancel(Math.random());
        }}
      >
        {findLabelText('Cancel', 'Cancel', 'Hr')}
      </Link>
      <Link
        to="#"
        className={`btn btn-primary ${
          (!isDirty || Object.keys(errors).length > 0) && !removeDisabled
            ? 'disable'
            : ''
        }`}
        onClick={
          (!isDirty || Object.keys(errors).length > 0) && !removeDisabled
            ? () => {
                return;
              }
            : handleSubmit(onSubmit)
        }
      >
        {findLabelText('Save', 'Save', 'Hr')}
      </Link>
    </div>
  );
};

export default FormFooter;
