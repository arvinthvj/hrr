import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputComponent from '../../hr-component/inputComponent';
import { Controller } from 'react-hook-form';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { postData } from '../../../services/apicall';
import {
  countryListAPI,
  leaveTypesApi,
  timeOffTypes,
} from '../../../services/apiurl';
import DatePickerComponent from '../../datepicker/index';
import moment from 'moment';
import DeleteModel from '../deleteModel';
import { global } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const CreateTimeOffSettings = ({
  control,
  trigger,
  errors,
  setValue,
  editData,
  setIsopened,
  listData,
  cancel,
}) => {
  const Error = styled.p({
    color: 'red',
  });

  const [countryList, setCountryList] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [error, setError] = useState({
    allowance: false,
    roll_forward: false,
    Description: false,
    name: false,
  });

  const getCountryList = () => {
    postData(countryListAPI, { status: '1' }, (data, res) => {
      if (res?.data?.code == 200) {
        const options = data?.map(item => ({
          label: item?.country_name,
          value: item?.country_name,
        }));
        setCountryList(options);
      }
    });
  };
  const getLeaveType = () => {
    postData(leaveTypesApi, '', (data, res) => {
      if (res?.data?.code == 200) {
        const option = data?.map(item => ({
          label: item?.leave_type,
          value: item?.leave_type,
        }));
        setLeaveType(option);
      }
    });
  };
  useEffect(() => {
    const validateError = {
      shouldValidate: true,
    };

    if (Object.keys(editData)?.length > 0) {
      editData?.status == 1
        ? setValue('active', true)
        : setValue('active', false);
      setValue('Name', editData?.name, validateError);
      setValue('annual', editData?.comp_off, validateError);
      setValue('paid', editData?.paid_timeoff, validateError);
      setValue('approval', editData?.approval, validateError);
      setValue('allowance', editData?.annual_allowance, validateError);
      setValue('roll_forward', editData?.roll_forward, validateError);
      setValue('Description', editData?.description, validateError);
      setValue('date', moment(editData?.timeoff_year_start));
      countryList?.find(
        ele =>
          ele.value == editData?.country &&
          setValue('countryList', ele, validateError),
      );
      leaveType?.find(
        ele =>
          ele.value == editData?.leave_type &&
          setValue('leaveType', ele, validateError),
      );
    } else {
      resetData();
    }
  }, [editData, countryList, leaveType]);

  useEffect(() => {
    resetData();
  }, [cancel]);

  const resetData = () => {
    setValue('Name', '');
    setValue('annual', 'Yes');
    setValue('paid', 'Yes');
    setValue('approval', 'Manual');
    setValue('allowance', '');
    setValue('roll_forward', '');
    setValue('Description', '');
    setValue('date', '');
    setValue('active');
    setValue('countryList', {});
    setValue('leaveType', {});
  };

  useEffect(() => {
    getCountryList();
    getLeaveType();
  }, []);

  return (
    <div className="personal-time-card-body personal-card-body edit-time-card-body">
      <div className="tab-content" id="myTabContentone">
        {/* Edit Time */}
        <div
          className="tab-pane fade show active"
          id="edit_time"
          role="tabpanel"
          aria-labelledby="edit-time"
        >
          <div className="form-group tab-form-group">
            <label className="custom_check d-inline-flex align-items-center">
              <Controller
                name="active"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="checkbox"
                    name="active"
                    onChange={onChange}
                    value={value}
                    checked={value}
                  />
                )}
              />
              {findLabelText('Active', 'Active', 'HR_Management')}{' '}
              <span className="checkmark" />
            </label>
          </div>
          <div className="form-group tab-form-group">
            <Controller
              name="Name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  module="HR_Management"
                  Label="Name"
                  name="Name"
                  placeholder=""
                  defaultFunc={false}
                  onChange={e => {
                    if (e.target.value.length > 50) {
                      setError({ ...error, name: true });
                      setTimeout(() => {
                        setError({ ...error, name: false });
                      }, 2000);
                    } else {
                      onChange(e);
                    }
                  }}
                  trigger={trigger}
                  value={value}
                  maxLength={50}
                />
              )}
            />
            {error.name ? (
              <Error>Maximum number of 50 characters exceeded</Error>
            ) : (
              <Error>{errors?.['Name']?.message}</Error>
            )}
          </div>
          <div className="form-group tab-form-group">
            <label>
              {findLabelText('Leave_type', 'Leave type', 'HR_Management')}
            </label>
            <Controller
              name="leaveType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DropDownSelection
                  options={leaveType}
                  minWidth="100px"
                  height="35px"
                  Value={value}
                  backgroundColor="#FFF"
                  onChange={value => {
                    onChange(value);
                    trigger('leaveType');
                  }}
                  placeholder=""
                />
              )}
            />
            <Error>{errors?.['leaveType']?.message}</Error>
          </div>
          <div className="form-group tab-form-group">
            <label>
              {findLabelText('Country', 'Country', 'HR_Management')}
            </label>
            <Controller
              name="countryList"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DropDownSelection
                  options={countryList}
                  minWidth="100px"
                  height="35px"
                  Value={value}
                  backgroundColor="#FFF"
                  onChange={value => {
                    onChange(value);
                    trigger('countryList');
                  }}
                  placeholder=""
                />
              )}
            />
            <Error>{errors?.['countryList']?.message}</Error>
          </div>
          <div className="form-group tab-form-group">
            <label>
              Time taken to come off annual total (
              {findLabelText('Come_off', 'Come off', 'HR_Management')})
            </label>
            <div className="tab-radio-btns">
              <label className="custom_radio">
                <Controller
                  name="annual"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="annual"
                      value="Yes"
                      checked={value == 'Yes' ? true : false}
                      onChange={onChange}
                      defaultChecked={true}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('Yes', 'Yes', 'HR_Management')}
              </label>
              <label className="custom_radio">
                <Controller
                  name="annual"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="annual"
                      value="No"
                      checked={value == 'No' ? true : false}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('No', 'No', 'HR_Management')}
              </label>
            </div>
          </div>
          <div className="form-group tab-form-group tab-leave-days">
            <Controller
              name="allowance"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  module="HR_Management"
                  Label="Annual allowance (days)"
                  name="allowance"
                  placeholder=""
                  defaultFunc={false}
                  onChange={e => {
                    if (e.target.value.length > 2) {
                      setError({ ...error, allowance: true });
                      setTimeout(() => {
                        setError({ ...error, allowance: false });
                      }, 2000);
                    } else {
                      onChange(e);
                    }
                  }}
                  trigger={trigger}
                  value={value}
                />
              )}
            />
            {error.allowance ? (
              <Error>Provide allowance in number of days (0 - 99)</Error>
            ) : (
              <Error>{errors?.['allowance']?.message}</Error>
            )}
          </div>
          <div className="form-group tab-form-group tab-leave-time">
            <label>Time off year start</label>
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePickerComponent
                  suffixIcon=""
                  name="date"
                  handleChange={() => {
                    return;
                  }}
                  onChange={onChange}
                  trigger={trigger}
                  value={value}
                  placeholder="Select Date"
                  format="DD/MMM"
                />
              )}
            />
            <Error>{errors?.['date']?.message}</Error>
          </div>
          <div className="form-group tab-form-group tab-leave-days">
            <Controller
              name="roll_forward"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  module="HR_Management"
                  langName="Roll_forward"
                  Label="Roll forward (days)"
                  name="roll_forward"
                  placeholder=""
                  defaultFunc={false}
                  onChange={e => {
                    if (e.target.value.length > 2) {
                      setError({ ...error, roll_forward: true });
                      setTimeout(() => {
                        setError({ ...error, roll_forward: false });
                      }, 2000);
                    } else {
                      onChange(e);
                    }
                  }}
                  trigger={trigger}
                  value={value}
                />
              )}
            />
            {error.roll_forward ? (
              <Error>Provide allowance in number of days (0 - 99)</Error>
            ) : (
              <Error>{errors?.['roll_forward']?.message}</Error>
            )}
          </div>
          <div className="form-group tab-form-group">
            <label>
              Paid time off ({findLabelText('PTO', 'PTO', 'HR_Management')})
            </label>
            <div className="tab-radio-btns">
              <label className="custom_radio">
                <Controller
                  name="paid"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="paid"
                      value="Yes"
                      checked={value == 'Yes' ? true : false}
                      onChange={onChange}
                      defaultChecked={true}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('Yes', 'Yes', 'HR_Management')}
              </label>
              <label className="custom_radio">
                <Controller
                  name="paid"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="paid"
                      value="No"
                      checked={value == 'No' ? true : false}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('No', 'No', 'HR_Management')}
              </label>
            </div>
          </div>
          <div className="form-group tab-form-group">
            <label>
              {findLabelText('Approval', 'Approval', 'HR_Management')}
            </label>
            <div className="tab-radio-btns">
              <label className="custom_radio">
                <Controller
                  name="approval"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="approval"
                      value="Manual"
                      checked={value == 'Manual' ? true : false}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('Manual', 'Manual', 'HR_Management')}
              </label>
              <label className="custom_radio">
                <Controller
                  name="approval"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="radio"
                      name="approval"
                      value="Automatic"
                      checked={value == 'Automatic' ? true : false}
                      onChange={onChange}
                    />
                  )}
                />
                <span className="checkmark" />{' '}
                {findLabelText('Automatic', 'Automatic', 'HR_Management')}
              </label>
            </div>
          </div>
          <div className="form-group tab-form-group tab-description">
            <label>
              {findLabelText('Description', 'Description', 'HR_Management')}
            </label>
            <Controller
              name="Description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <textarea
                  value={value}
                  onChange={val => {
                    if (val.target.value.length > 300) {
                      setError({ ...error, Description: true });
                      setTimeout(() => {
                        setError({ ...error, Description: false });
                      }, 2000);
                      return;
                    }
                    onChange(val);
                    trigger('Description');
                  }}
                  name="Description"
                  className="form-control"
                  placeholder={'Optional \n\n\n\n Max 300 characters'}
                />
              )}
            />
            {error.Description ? (
              <Error>
                {
                  global.validationLabel.hrModuleValidation
                    .CharactersExceeded300
                }
              </Error>
            ) : (
              <Error>{errors?.['Description']?.message}</Error>
            )}
          </div>
          {Object.keys(editData)?.length > 0 && (
            <DeleteModel
              name={editData?.name}
              api={timeOffTypes.Delete}
              payload={{ id: editData?.id }}
              setIsopened={setIsopened}
              listData={listData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTimeOffSettings;
