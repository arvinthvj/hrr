import React, { useContext, useEffect, useState } from 'react';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { postData } from '../../../services/apicall';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import {
  addHrPension,
  deleteHrPension,
  updateHrPension,
} from '../../../services/apiurl';
import Toaster from '../../toast';
import { HR_BENEFIT_SECTION_NAME } from '../benefits/constants';
import InputComponent from '../inputComponent';
import { pensionSchema } from '../benefits/schema';
import DatePickerComponent from '../../datepicker/index';
import { hrCalendar } from '../../imagepath';
import moment from 'moment';
import { getUserPreferedDateFormatToSave } from '../../commonMethod';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const Pension = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    EditComponent,
    getHrPensionData,
    userID,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(pensionSchema) });

  useEffect(() => {
    updateData();
  }, [editData]);

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('provider', editData?.provider, validateError);
      setValue('id_number', editData?.id_number, validateError);
      setValue(
        'effective_from',
        moment(editData?.effective_from),
        validateError,
      );
      setValue('employee_pays', editData?.employee_pays, validateError);
      setValue('company_pays', editData?.company_pays, validateError);
      setValue('link', editData?.link, validateError);
      setFromDate(editData?.effective_from);
    } else {
      resetData();
    }
  };

  const resetData = () => {
    setId('');
    setValue('provider', '');
    setValue('id_number', '');
    setValue('effective_from', '');
    setValue('employee_pays', '');
    setValue('company_pays', '');
    setValue('link', '');
  };

  const onEditSubmit = data => {
    const payload = {
      user_id: userID,
      provider: data?.provider,
      id_number: data?.id_number,
      effective_from: getUserPreferedDateFormatToSave(fromDate),
      employee_pays: data?.employee_pays,
      company_pays: data?.company_pays,
      link: data?.link,
    };
    if (id) payload['id'] = id;
    dispatch(showLoader());
    postData(updateHrPension, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrPensionData();
      checkIsOpned(false);
      resetData();
      EditComponent('', {});
    });
  };

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      provider: data?.provider,
      id_number: data?.id_number,
      effective_from: getUserPreferedDateFormatToSave(fromDate),
      employee_pays: data?.employee_pays,
      company_pays: data?.company_pays,
      link: data?.link,
    };
    dispatch(showLoader());
    postData(addHrPension, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrPensionData();
      checkIsOpned(false);
      resetData();
      EditComponent('', {});
    });
  };

  return (
    <div>
      <div
        className="personal-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <Controller
            name="provider"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Provider"
                name="provider"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['provider']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="id_number"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="ID"
                name="id_number"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['id_number']?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Effective From</label>
                <Controller
                  name="effective_from"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="effective_from"
                      handleChange={value => {
                        setFromDate(value);
                      }}
                      // disabledFutureDate={disabledToDate}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['effective_from']?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group tab-form-group pay-group">
          <label>Employee Pays</label>
          <div className="pay-group-inner">
            <Controller
              name="employee_pays"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  name="employee_pays"
                  placeholder=""
                  Label=""
                  onChange={onChange}
                  trigger={trigger}
                  value={value}
                  maxLength={5}
                />
              )}
            />
            <span>%</span>
          </div>
          <div>
            <Error>{errors?.['employee_pays']?.message}</Error>
          </div>
        </div>
        <div className="form-group tab-form-group pay-group">
          <label>Company Pays</label>
          <div className="pay-group-inner">
            <Controller
              name="company_pays"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  name="company_pays"
                  Label=""
                  placeholder=""
                  onChange={onChange}
                  trigger={trigger}
                  value={value}
                  maxLength={5}
                />
              )}
            />
            <span>%</span>
          </div>
          <div>
            <Error>{errors?.['company_pays']?.message}</Error>
          </div>
        </div>

        <div className="form-group tab-form-group">
          <Controller
            name="link"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Link"
                name="link"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={100}
              />
            )}
          />
          <Error>{errors?.['link']?.message}</Error>
        </div>
        {id && (
          <RemoveDiv
            name={HR_BENEFIT_SECTION_NAME.PENSION}
            payload={{ id: id }}
            api={deleteHrPension}
            checkIsOpned={checkIsOpned}
            resetData={resetData}
            list={getHrPensionData}
          />
        )}
      </div>
      <div>
        <Footer
          handleSubmit={handleSubmit(
            Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
          )}
          isDirty={isDirty}
          isValid={isValid}
          editData={editData}
          resetData={updateData}
          isPreference={Object.keys(errors).length == 0 ? false : true}
        />
      </div>
    </div>
  );
};

export default Pension;
