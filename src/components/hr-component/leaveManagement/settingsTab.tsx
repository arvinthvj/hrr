import React, { useContext, useState } from 'react';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { adjustLeave } from '../personal/scehma';
import { PersonalContext } from '../personalController';
import { Allowance } from '../constants';
import InputComponent from '../inputComponent';
import DatePickerComponent from '../../datepicker/index';
import { hrCalendar } from '../../imagepath';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  ErrorMessage,
  Errorcode,
  leaveKeys,
  sectionNames,
} from '../../../assets/constants/config';
import { postData } from '../../../services/apicall';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import { adjustLeaveApi } from '../../../services/apiurl';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../commonMethod';

const SettingsTab = ({ leaveTypeList }) => {
  const {
    Error,
    getListData,
    rightSidebarHeight,
    userID,
    allFieldPermissionType,
  } = useContext(PersonalContext);
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(adjustLeave) });

  const resetData = () => {
    setValue('type', {});
    setValue('allowance', {});
    setValue('notes', '');
    setValue('date', '');
    setValue('Days', '');
  };
  const onSubmit = data => {
    const payload = {
      user_id: userID,
      timeoff_type: data?.type?.id,
      adjust_allowance_type: data?.allowance?.value,
      allowance_days: data?.Days,
      effective_date: getUserPreferedDateFormatToSave(date),
      comments: data?.notes,
    };
    dispatch(showLoader());
    postData(adjustLeaveApi, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
        getListData();
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      resetData();
    });
  };
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj => obj.section_name == sectionNames.leave && obj.field_name == key,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };
  return (
    <>
      <div
        className="card-body personal-card-body book-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div>
          <div className="form-group tab-form-group">
            <label>{findLabelText('Type', 'Type', 'Hr')}</label>
            <Controller
              name="type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DropDownSelection
                  options={leaveTypeList}
                  minWidth="75px"
                  height="35px"
                  Value={value}
                  backgroundColor="#FFF"
                  onChange={value => {
                    onChange(value);
                    trigger('type');
                  }}
                  placeholder=""
                />
              )}
            />
            <Error>{errors?.['type']?.message}</Error>
          </div>
          <div className="form-group tab-form-group mb-0">
            <label>
              {findLabelText('adjust_allowance', 'Adjust allowance', 'Hr')}
            </label>
            <div className="tab-inner-form-group tab-inner-book">
              <div className="form-group tab-form-group tab-book-select">
                <Controller
                  name="allowance"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DropDownSelection
                      options={Allowance}
                      minWidth="78px"
                      height="35px"
                      Value={value}
                      backgroundColor="#FFF"
                      onChange={value => {
                        onChange(value);
                        trigger('allowance');
                      }}
                      placeholder=""
                    />
                  )}
                />
              </div>
              <div className="form-group tab-form-group tab-book-group-input">
                <Controller
                  name="Days"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <InputComponent
                      Label=""
                      name="Days"
                      maxLength={4}
                      placeholder=""
                      Optional=""
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="form-group tab-form-group book-form-group-days">
                <span>{findLabelText('Days', 'Days', 'Hr')}</span>
              </div>
              <Error>{errors?.['Days']?.message}</Error>
            </div>
            <Error>{errors?.['allowance']?.message}</Error>
          </div>
          <div className="form-group tab-form-group tab-inner-group">
            <ul className="nav">
              <li>
                <div className="form-group tab-form-group inside-calandar-image">
                  <label>
                    {findLabelText('Effective_date', 'Effective date', 'Hr')}
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DatePickerComponent
                        suffixIcon={<img src={hrCalendar} alt="" />}
                        name="date"
                        handleChange={value => {
                          setDate(value);
                        }}
                        onChange={onChange}
                        trigger={trigger}
                        value={value}
                      />
                    )}
                  />
                  <Error>{errors?.['date']?.message}</Error>
                </div>
              </li>
            </ul>
          </div>
          <div className="form-group tab-form-group tab-description">
            <label>{findLabelText('Comment', 'Comment', 'Hr')}</label>
            <Controller
              name="notes"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <textarea
                    maxLength={301}
                    value={value}
                    placeholder={'Optional \n\n\n\n Max 300 characters'}
                    className="form-control-text-area"
                    onChange={e => {
                      onChange(e);
                      trigger('notes');
                    }}
                  />
                </>
              )}
            />
            <Error>{errors?.['notes']?.message}</Error>
          </div>
        </div>
      </div>
      <div className="book-time-footer">
        <div className="personal-footer">
          <Link to="#" className="btn" onClick={() => resetData()}>
            {findLabelText('Cancel', 'Cancel', 'Hr')}
          </Link>
          {findIndex(leaveKeys.AdjustLeave) == '2' && (
            <Link
              to="#"
              className={`btn btn-primary ${
                !isDirty || !isValid ? 'disable' : ''
              }`}
              onClick={handleSubmit(onSubmit)}
            >
              {findLabelText('Save', 'Save', 'Hr')}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
