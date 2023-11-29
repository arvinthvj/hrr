import React from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../../services/apicall';
import { timeOffProfiles } from '../../../services/apiurl';
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
  datas,
}) => {
  const dispatch = useDispatch();
  const onSubmit = data => {
    const timeoffTypeIds = data?.leaveType?.split(',').map(id => Number(id));
    const filteredData = datas.filter(item => timeoffTypeIds.includes(item.id));
    const commaSeparatedNames = filteredData.map(item => item.name).join(', ');
    const payload = {
      name: data?.Name,
      timeoff_types: data?.leaveType,
      timeoff_type_name: commaSeparatedNames,
      description: data?.Description,
      status: data?.active == true ? '1' : '0',
      vacation_default: data?.vacation?.id,
      sick_default: data?.sick?.id,
      outofoffice_default: data?.outofoffice?.id,
    };
    if (editData?.id) {
      payload['id'] = editData?.id;
    }
    const url = editData?.id ? timeOffProfiles?.Update : timeOffProfiles?.Add;
    dispatch(showLoader());
    postData(url, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else if (res?.data?.code == 204) {
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
