import React, { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputComponent from '../../inputComponent';
import DropDownSelection from '../../../selectfield/dropDownSelection';
import RemoveDiv from '../../rightScreen/removeDiv';
import { workHistory, workStatus } from '../../../../services/apiurl';
import { history } from '../../personal/scehma';
import { postData } from '../../../../services/apicall';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import Toaster from '../../../toast';
import { PersonalContext } from '../../personalController';
import Footer from '../../rightScreen/footer';
import DatePickerComponent from '../../../datepicker/index';
import { hrCalendar } from '../../../imagepath';
import moment from 'moment';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../../commonMethod';
import { ErrorMessage, Errorcode } from '../../../../assets/constants/config';

const AddWorkHistory = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    GetJobDetails,
    setEditData,
    userID,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const [id, setId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [workStatusOption, setWorkStatusOption] = useState([]);
  const [ToDate, setToDate] = useState('');
  const disabledDate = current => {
    return current && current < moment(fromDate).startOf('day');
  };
  const disabledToDate = current => {
    return current && current > moment(ToDate).endOf('day');
  };

  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(history) });

  const resetData = () => {
    setId('');
    setValue('Department', '');
    setValue('Grade', '');
    setValue('Role', '');
    setValue('start', '');
    setValue('end', '');
    setValue('Status', {});
  };
  const initialData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('Department', editData?.department, validateError);
      setValue('Grade', editData?.grade, validateError);
      setValue('Role', editData?.role, validateError);
      setValue('start', moment(editData?.position_start), validateError);
      setValue(
        'end',
        editData?.position_end != '' ? moment(editData?.position_end) : '',
        validateError,
      );
      setFromDate(editData?.position_start);
      setToDate(editData?.position_end);
      workStatusOption?.find(
        ele =>
          ele.value == editData?.work_status &&
          setValue('Status', ele, validateError),
      );
    } else {
      resetData();
    }
  };

  useEffect(() => {
    editData && initialData();
  }, [editData, workStatusOption]);

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      role: data?.Role,
      grade: data?.Grade,
      work_status: data?.Status?.value,
      department: data?.Department,
      position_start: getUserPreferedDateFormatToSave(fromDate),
      position_end: getUserPreferedDateFormatToSave(ToDate),
    };
    dispatch(showLoader());
    postData(workHistory.Add, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      GetJobDetails();
      resetData();
    });
  };
  const onEditSubmit = data => {
    const payload = {
      user_id: userID,
      id: id,
      role: data?.Role,
      grade: data?.Grade,
      work_status: data?.Status?.value,
      department: data?.Department,
      position_start: getUserPreferedDateFormatToSave(fromDate),
      position_end: getUserPreferedDateFormatToSave(ToDate),
    };
    dispatch(showLoader());
    postData(workHistory.Update, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      GetJobDetails();
      resetData();
    });
  };
  useEffect(() => {
    postData(workStatus, '', data => {
      const workStatusOpt = data?.map(item => {
        return {
          label: item?.work_status,
          value: item?.work_status,
        };
      });
      setWorkStatusOption(workStatusOpt);
    });
  }, []);

  const onDelete = () => {
    dispatch(showLoader());
    postData(workHistory.Delete, { id: id }, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setEditData([]);
      resetData();
      GetJobDetails();
    });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="emergency_tab"
      role="tabpanel"
      aria-labelledby="emergency-tab"
    >
      <div
        className="personal-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <Controller
            name="Role"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Job Title"
                name="Role"
                placeholder=""
                Optional=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['Role']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="Grade"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Grade"
                name="Grade"
                placeholder=""
                Optional=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['Grade']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <label>{findLabelText('Status', 'Status', 'Hr')}</label>
          <Controller
            name="Status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                options={workStatusOption}
                minWidth="100px"
                height="35px"
                Value={value}
                backgroundColor="#FFF"
                onChange={value => {
                  onChange(value);
                  trigger('Status');
                }}
                placeholder=""
              />
            )}
          />
          <Error>{errors?.['Status']?.['value']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="Department"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Department"
                name="Department"
                placeholder=""
                Optional=""
                onChange={val => {
                  onChange(val);
                  if (isDirty == true || isValid == true) {
                    setAnyOneRequired(false);
                  }
                }}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['Department']?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>
                  {findLabelText('Position_start', 'Position start', 'Hr')}
                </label>
                <Controller
                  name="start"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="start"
                      handleChange={value => {
                        setFromDate(value);
                      }}
                      disabledFutureDate={disabledToDate}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                      placeholder="select date"
                    />
                  )}
                />
                <Error>{errors?.['start']?.message}</Error>
              </div>
            </li>
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>
                  {findLabelText('Position_end', 'Position end', 'Hr')}
                </label>
                <Controller
                  name="end"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="end"
                      handleChange={value => {
                        setToDate(value);
                      }}
                      disabledFutureDate={disabledDate}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                      placeholder="select date"
                    />
                  )}
                />
                <Error>{errors?.['end']?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        {id && <RemoveDiv name={'Work History'} confirmDelete={onDelete} />}
      </div>
      <Footer
        handleSubmit={handleSubmit(
          Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
        )}
        isDirty={isDirty}
        isValid={true}
        resetData={initialData}
      />
    </div>
  );
};

export default AddWorkHistory;
