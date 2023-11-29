import React, { useContext, useEffect, useState } from 'react';
import InputComponent from '../inputComponent';
import DropDownSelection from '../../selectfield/dropDownSelection';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { contact } from '../personal/scehma';
import { PersonalContext } from '../personalController';
import { postData } from '../../../services/apicall';
import {
  AddEmegencyContact,
  DeleteEmegencyContact,
  EditEmegencyContact,
} from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import { Relationship } from '../constants';
import {
  ErrorMessage,
  Errorcode,
  countryCodeValues,
} from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const EmergencyContact = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    getUserPersonalDetails,
    setPrimaryList,
    detailsId,
    EditComponent,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const [primary, setPrimary] = useState<string>();
  const [anyOneRequired, setAnyOneRequired] = useState<boolean>(true);
  const [cleanError, setCleanError] = useState<boolean>(true);
  const filtered = countryCodeValues
    .filter(
      (obj, index) =>
        index === countryCodeValues.findIndex(item => item.value === obj.value),
    )
    .sort((a, b) => +a.value.replace('+', '') - +b.value.replace('+', ''));

  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(contact) });

  useEffect(() => {
    setValue('status', primary);
  }, [primary]);

  const updateData = () => {
    if (editData && Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('firstName', editData?.first_name, validateError);
      setValue('lastName', editData?.last_name, validateError);
      setValue('ContactNumber', editData?.contact_number, validateError);
      setValue('Email', editData?.email, validateError);
      Relationship?.find(
        ele =>
          ele.value == editData?.relationship &&
          setValue('relationship', ele, validateError),
      );
      filtered?.find(
        ele =>
          ele.value == editData?.contact_ext &&
          setValue('countrycode', ele, validateError),
      );
      setPrimary(editData?.is_primary_contact);
    } else {
      resetData();
    }
  };

  useEffect(() => {
    updateData();
  }, [editData]);

  const resetData = () => {
    setId('');
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('ContactNumber', '');
    setValue('Email', '');
    setValue('relationship', {});
    setValue('countrycode', {});
    setPrimary('');
  };

  const onSubmit = data => {
    const payload = {
      user_id: detailsId,
      first_name: data?.firstName,
      last_name: data?.lastName,
      relationship: data?.relationship?.value,
      email: data?.Email,
      contact_number: data?.ContactNumber,
      is_primary_contact: data?.status,
      contact_ext: data?.countrycode?.value,
    };
    dispatch(showLoader());
    postData(AddEmegencyContact, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setPrimaryList([]);
      getUserPersonalDetails();
      resetData();
    });
  };
  const onEditSubmit = data => {
    const payload = {
      user_id: detailsId,
      id: id,
      first_name: data?.firstName,
      last_name: data?.lastName,
      relationship: data?.relationship?.value,
      email: data?.Email,
      contact_number: data?.ContactNumber,
      is_primary_contact: data?.status,
      contact_ext: data?.countrycode?.value,
    };
    dispatch(showLoader());
    postData(EditEmegencyContact, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setPrimaryList([]);
      getUserPersonalDetails();
      resetData();
      EditComponent('', {});
    });
  };

  const RelationValue = watch('relationship');

  useEffect(() => {
    if (editData && Object.keys(editData)?.length > 0) {
      RelationValue?.value == editData?.relationship
        ? setCleanError(true)
        : setCleanError(false);
    }
  }, [RelationValue, editData]);

  useEffect(() => {
    if (editData && Object.keys(editData)?.length > 0) {
      primary !== editData?.is_primary_contact
        ? setCleanError(false)
        : setCleanError(true);
    }
  }, [primary, editData]);

  return (
    <div
      className="tab-pane fade show active"
      id="emergency_tab"
      role="tabpanel"
      aria-labelledby="emergency-tab"
    >
      <div
        className="personal-time-card-body personal-time-card-body-contact"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="First name"
                name="firstName"
                placeholder=""
                Optional=""
                onFocus={() => {
                  setAnyOneRequired(false);
                }}
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['firstName']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Last name"
                name="lastName"
                placeholder=""
                Optional=""
                onFocus={() => {
                  setAnyOneRequired(false);
                }}
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['lastName']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <label>{findLabelText('Relationship', 'Relationship', 'Hr')}</label>
          <Controller
            name="relationship"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                options={Relationship}
                minWidth="100px"
                height="35px"
                Value={value}
                backgroundColor="#FFF"
                onChange={value => {
                  onChange(value);
                  trigger('relationship');
                }}
                placeholder=""
              />
            )}
          />
          <Error>{errors?.['relationship']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="Email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Email"
                name="Email"
                placeholder=""
                Optional=""
                onFocus={() => {
                  setAnyOneRequired(false);
                }}
                onChange={val => {
                  onChange(val);
                  if (isDirty == true || isValid == true) {
                    setAnyOneRequired(false);
                  }
                }}
                trigger={trigger}
                value={value}
              />
            )}
          />
          <Error>{errors?.['Email']?.message}</Error>
        </div>
        <div className="form-group tab-form-group mb-0">
          <label>
            {findLabelText(
              'Primary_contact_number',
              'Primary contact number',
              'Hr',
            )}
          </label>
          <div className="tab-inner-form-group">
            <div className="form-group tab-form-group">
              <Controller
                name="countrycode"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DropDownSelection
                    options={filtered}
                    minWidth="75px"
                    height="35px"
                    Value={value}
                    backgroundColor="#FFF"
                    onChange={value => {
                      onChange(value);
                      trigger('countrycode');
                      setAnyOneRequired(false);
                    }}
                    placeholder=""
                  />
                )}
              />
              <Error>{errors?.['countrycode']?.['value']?.message}</Error>
            </div>
            <div className="form-group tab-form-group tab-form-group-input">
              <Controller
                name="ContactNumber"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputComponent
                    Label=""
                    name="ContactNumber"
                    placeholder=""
                    Optional=""
                    onFocus={() => {
                      setAnyOneRequired(false);
                    }}
                    onChange={val => {
                      if (val.target.value == '') {
                        setValue('countrycode', {});
                      }
                      onChange(val);
                      setAnyOneRequired(false);
                    }}
                    trigger={trigger}
                    value={value}
                    maxLength={15}
                  />
                )}
              />
            </div>
          </div>
          <Error>{errors?.['ContactNumber']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <label>
            {findLabelText('Primary_contact', 'Primary contact', 'Hr')}
          </label>
          <div className="tab-radio-btns">
            <label className="custom_radio">
              <input
                type="radio"
                name="primary"
                defaultValue="primary_yes"
                checked={primary == 'Yes' ? true : false}
                onChange={() => setPrimary('Yes')}
              />
              <span className="checkmark" /> Yes
            </label>
            <label className="custom_radio">
              <input
                type="radio"
                name="primary"
                defaultValue="primary_no"
                checked={primary == 'No' ? true : false}
                onChange={() => setPrimary('No')}
              />
              <span className="checkmark" /> No
            </label>
          </div>
        </div>
        {id && (
          <RemoveDiv
            name={'emergency contact'}
            payload={{ id: id }}
            api={DeleteEmegencyContact}
            list={getUserPersonalDetails}
            setList={setPrimaryList}
            checkIsOpned={checkIsOpned}
            resetData={resetData}
          />
        )}
      </div>
      <Footer
        handleSubmit={handleSubmit(
          Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
        )}
        isDirty={isDirty}
        resetData={updateData}
        isValid={isValid}
        cleanError={cleanError}
        anyOneRequired={anyOneRequired}
      />
    </div>
  );
};

export default EmergencyContact;
