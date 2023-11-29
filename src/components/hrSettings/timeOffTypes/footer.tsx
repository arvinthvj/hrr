import React from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../../services/apicall';
import { timeOffTypes } from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const SettingsFooter = ({
  handleSubmit,
  setIsopened,
  listData,
  isDirty,
  isValid,
  editData,
  setCancel,
}) => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    const payload = {
      name: data?.Name,
      leave_type: data?.leaveType?.value,
      country: data?.countryList?.value,
      comp_off: data?.annual,
      annual_allowance: data?.allowance,
      timeoff_year_start: data?.date,
      roll_forward: data?.roll_forward,
      paid_timeoff: data?.paid ? data?.paid : 'Yes',
      approval: data?.approval,
      description: data?.Description,
      status: data?.active == true ? '1' : '0',
    };
    if (editData?.id) {
      payload['id'] = editData?.id;
    }
    const url = editData?.id ? timeOffTypes?.Update : timeOffTypes?.Add;
    dispatch(showLoader());
    postData(url, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      setIsopened(false);
      listData();
    });
  };
  return (
    <div className="personal-footer tab-footer">
      <Link
        to="#"
        className="btn"
        onClick={() => {
          setCancel(Math.random());
          setIsopened(false);
        }}
      >
        {findLabelText('Cancel', 'Cancel', 'HR_Management')}
      </Link>
      <Link
        to="#"
        className={`btn btn-primary ${!isDirty || !isValid ? 'disable' : ''}`}
        onClick={
          !isDirty || !isValid
            ? () => {
                return;
              }
            : handleSubmit(onSubmit)
        }
      >
        {findLabelText('Save', 'Save', 'HR_Management')}
      </Link>
    </div>
  );
};

export default SettingsFooter;
