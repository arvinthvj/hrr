import React, { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputComponent from '../../inputComponent';
import DropDownSelection from '../../../selectfield/dropDownSelection';
import RemoveDiv from '../../rightScreen/removeDiv';
import { compensation, hrJobsPayType } from '../../../../services/apiurl';
import { compensationBonus } from '../../personal/scehma';
import { postData } from '../../../../services/apicall';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import Toaster from '../../../toast';
import { PersonalContext } from '../../personalController';
import Footer from '../../rightScreen/footer';
import DatePickerComponent from '../../../datepicker/index';
import { hrCalendar } from '../../../imagepath';
import moment from 'moment';
import { ErrorMessage, Errorcode } from '../../../../assets/constants/config';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../../commonMethod';

const AddCompensation = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    GetJobDetails,
    userID,
    rightSidebarHeight,
    setEditData,
  } = useContext(PersonalContext);
  const [payType, setPayType] = useState([]);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(compensationBonus) });

  const initialData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('Rate', editData?.rate, validateError);
      setValue('date', moment(editData?.effective_date), validateError);
      setDate(editData?.effective_date);
      setValue('Overtime', editData?.over_time, validateError);
      setValue('reason', editData?.change_reason, validateError);
      payType?.find(
        ele =>
          ele?.value == editData?.pay_type &&
          setValue('type', ele, validateError),
      );
    } else {
      resetData();
    }
  };

  useEffect(() => {
    editData && initialData();
  }, [editData, payType]);

  const resetData = () => {
    setId('');
    setValue('type', {});
    setValue('Rate', '');
    setValue('date', '');
    setValue('Overtime', '');
    setValue('reason', '');
  };

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      pay_type: data?.type.value,
      rate: data?.Rate,
      effective_date: getUserPreferedDateFormatToSave(date),
      over_time: data?.Overtime,
      change_reason: data?.reason,
    };
    dispatch(showLoader());
    postData(compensation.Add, payload, (data, res) => {
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
      pay_type: data?.type.value,
      rate: data?.Rate,
      effective_date: getUserPreferedDateFormatToSave(date),
      over_time: data?.Overtime,
      change_reason: data?.reason,
    };
    dispatch(showLoader());
    postData(compensation.Update, payload, (data, res) => {
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
  const onDelete = () => {
    dispatch(showLoader());
    postData(compensation?.Delete, { id: id }, (data, res) => {
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

  useEffect(() => {
    postData(hrJobsPayType, '', data => {
      const type = data?.map(item => {
        return {
          id: item?.id,
          label: item?.pay_type,
          value: item?.pay_type,
        };
      });
      setPayType(type);
    });
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="emergency_tab"
      role="tabpanel"
      aria-labelledby="emergency-tab"
    >
      <div
        className="personal-time-card-body personal-time-card-body-compensation"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <label>{findLabelText('Pay_type', 'Pay type', 'Hr')}</label>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                options={payType}
                minWidth="105px"
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
          <Error>{errors?.['type']?.['value']?.message}</Error>
        </div>
        <div className="form-group tab-form-group rate-form-group">
          <Controller
            name="Rate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Rate"
                name="Rate"
                placeholder=""
                Optional=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['Rate']?.message}</Error>
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
                      handleChange={val => {
                        setDate(val);
                      }}
                      // disabledFutureDate={disabledToDate}
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
        <div className="form-group tab-form-group rate-form-group">
          <Controller
            name="Overtime"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Overtime (H)"
                name="Overtime"
                placeholder=""
                Optional=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={5}
              />
            )}
          />
          <Error>{errors?.['Overtime']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="reason"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Change reason"
                name="reason"
                placeholder=""
                Optional=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['reason']?.message}</Error>
        </div>
        {id && (
          <RemoveDiv
            name={'Compensation & Bonus(es)'}
            confirmDelete={onDelete}
          />
        )}
      </div>
      <Footer
        handleSubmit={handleSubmit(
          Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
        )}
        isDirty={isDirty}
        isValid={isValid}
        resetData={initialData}
      />
    </div>
  );
};

export default AddCompensation;
