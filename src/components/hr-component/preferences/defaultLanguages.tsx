import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectField from '../../selectfield/select';
import { PrefferedConfigurationLabel } from './constants';
import { findLabelText, getPrefereredTimeToDisplay } from '../../commonMethod';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { TimePicker } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { PersonalContext } from '../personalController';
import {
  TIME_FORMAT,
  hrPereferenceKeys,
  sectionNames,
  timeFormat_24,
  timeFormat_with_am,
} from '../../../assets/constants/config';
import DropDownSelection from '../../selectfield/dropDownSelection';

const DefaultLanguage = () => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { preferenceDetails } = useSelector((state: any) => state?.hr);
  const {
    allFieldPermissionType,
    preferenceLanguageId,
    setPreferenceLanguageId,
    preferenceStartTime,
    preferenceEndTime,
    setIsPrefereneceSaveButton,
    setPreferenceStartTime,
    setPreferenceEndTime,
  } = useContext(PersonalContext);
  const [languageList, setLanguageList] = useState([]);
  const { userDateTimeFormat } = useSelector((state: any) => state?.app);

  useEffect(() => {
    setTimeValue();
    getLanguageValue();
  }, [preferenceDetails]);

  const findIndex = key => {
    const findObj = allFieldPermissionType?.filter(
      obj =>
        obj.section_name == sectionNames.preference_details &&
        obj.field_name == key,
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

  const getLanguageValue = () => {
    const validateError = {
      shouldValidate: true,
    };
    const array = [];
    preferenceDetails?.[0]?.languages?.forEach(dt => {
      const object = {
        label: dt?.name,
        value: dt?.name,
        id: dt?.id,
      };
      array.push(object);
    });
    setLanguageList(array);
    array?.find(
      ele =>
        ele.id == parseInt(preferenceLanguageId) &&
        setValue('language', ele, validateError),
    );
  };

  const setTimeValue = () => {
    if (preferenceDetails?.length > 0) {
      const startTime = getPrefereredTimeToDisplay(
        preferenceDetails[0]?.start_working_hour,
      );
      setPreferenceStartTime(startTime || null);
      const endTime = getPrefereredTimeToDisplay(
        preferenceDetails[0]?.end_working_hour,
      );
      setPreferenceEndTime(endTime || null);
      setPreferenceLanguageId(preferenceDetails[0]?.language_id);
    }
  };

  return (
    <div className="personal-details">
      <div className="personal-group-info personal-group-inner">
        <div className="personal-group language-group">
          <label>{findLabelText('Language', 'Language', 'Hr')}</label>
          {findIndex(hrPereferenceKeys.user_language) < '1' ? (
            <>
              <DropDownSelection
                isDisabled={true}
                options={[]}
                minWidth="150px"
                height="35px"
                backgroundColor="#FAFAFA"
                onChange={() => {
                  return;
                }}
                placeholder=""
                disabledIcon={true}
              />
            </>
          ) : (
            <Controller
              name="language"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <SelectField
                    disabled={
                      findIndex(hrPereferenceKeys.user_language) == '1'
                        ? true
                        : false
                    }
                    bgColor={'#FFFFFF'}
                    value={value}
                    options={languageList}
                    height={'40px'}
                    onChangeValue={val => {
                      onChange(val);
                      trigger('language');
                      setPreferenceLanguageId(val?.id);
                      setIsPrefereneceSaveButton(false);
                    }}
                    placeholder={findLabelText('Language', 'Language', 'Hr')}
                  />
                  {errors.language?.label?.message ? (
                    <label style={{ color: 'red' }}>
                      {errors.language?.label?.message}
                    </label>
                  ) : null}
                </>
              )}
            />
          )}
        </div>
        <div className="personal-group mb-0 view-coloring">
          <label>
            {' '}
            {findLabelText(
              'Default_working_hours',
              PrefferedConfigurationLabel.DEFAULT_WORKING_HOURS,
              'Hr',
            )}
          </label>
          <div className="preferred-working">
            {findIndex(hrPereferenceKeys.Preferredworkinghours) < '1' ? (
              <TimePicker
                bordered={true}
                showNow={false}
                inputReadOnly={true}
                disabled={true}
              />
            ) : (
              <TimePicker
                onChange={e => {
                  const startTime = getPrefereredTimeToDisplay(e);
                  setPreferenceStartTime(startTime || null);
                  setIsPrefereneceSaveButton(false);
                }}
                value={
                  userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                    ? moment(preferenceStartTime, timeFormat_with_am)
                    : moment(preferenceStartTime, timeFormat_24)
                }
                use12Hours={
                  userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                    ? true
                    : false
                }
                placeholder={preferenceStartTime}
                format={
                  userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                    ? timeFormat_with_am
                    : timeFormat_24
                }
                suffixIcon={<div></div>}
                allowClear={false}
                bordered={true}
                showNow={false}
                inputReadOnly={true}
                disabled={
                  findIndex(hrPereferenceKeys.Preferredworkinghours) == '1'
                    ? true
                    : false
                }
              />
            )}
            <span>{findLabelText('To', 'To', 'Hr')}</span>
            <div className="filter-input filter-time filter-time-input">
              {findIndex(hrPereferenceKeys.Preferredworkinghours) < '1' ? (
                <TimePicker
                  bordered={true}
                  showNow={false}
                  inputReadOnly={true}
                  disabled={true}
                />
              ) : (
                <TimePicker
                  onChange={e => {
                    const endTime = getPrefereredTimeToDisplay(e);
                    setPreferenceEndTime(endTime || null);
                    setIsPrefereneceSaveButton(false);
                  }}
                  placeholder={preferenceEndTime ? preferenceEndTime : ''}
                  value={
                    userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                      ? moment(preferenceEndTime, timeFormat_with_am)
                      : moment(preferenceEndTime, timeFormat_24)
                  }
                  use12Hours={
                    userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                      ? true
                      : false
                  }
                  format={
                    userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
                      ? timeFormat_with_am
                      : timeFormat_24
                  }
                  suffixIcon={<div></div>}
                  allowClear={false}
                  bordered={true}
                  showNow={false}
                  inputReadOnly={true}
                  disabled={
                    findIndex(hrPereferenceKeys.Preferredworkinghours) == '1'
                      ? true
                      : false
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLanguage;
