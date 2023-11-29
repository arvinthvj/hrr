import React, { useEffect, useState } from 'react';
import {
  endHoursDisable,
  endMinutesDisable,
  findLabelText,
  getPreferedTimeFormat,
  startMinutesDisable,
  startdHoursDisable,
} from './commonMethod';
import { TimePicker } from 'antd';
import moment from 'moment';
import SelectField from './selectfield/select';
import { postData } from '../services/apicall';
import { TimeZoneListAPI } from '../services/apiurl';
import { useSelector } from 'react-redux';
import { EndTime, StartTime, timeFormat_24 } from '../assets/constants/config';

const StartEndTimePickerWithTimeZone = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  minWidth,
  startTimezone,
  setStartTimezone,
  endTimezone,
  setEndTimezone,
  disabled = false,
  isLocatePage = false,
  endDisabled = false,
  startTimeDisable = '',
  endTimeDisable = '',
  selectTimezoneText = '',
}) => {
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);
  const [isChangeEndWithStart, setChangeEndWithStart] = useState(true);
  const { quickBookSelect } = useSelector((state: any) => state?.quickBook);

  const startTimezoneoptions = timeZoneOptions?.map((item, index) => ({
    label: `${item?.alias_name}, ${item?.timezone_name}, ${item?.country_name}`,
    value: item?.timezone_name.trim(),
    id: item?.id,
    key: index,
    name: item?.standard_name,
    aliasName: item?.alias_name,
    showLabel: `${item?.timezone_name}, ${item?.country_name}`,
  }));
  const endTimezoneoptions = timeZoneOptions?.map((item, index) => ({
    label: `${item?.alias_name}, ${item?.timezone_name}, ${item?.country_name}`,
    value: item?.timezone_name.trim(),
    id: item?.id,
    key: index,
    name: item?.standard_name,
    aliasName: item?.alias_name,
    showLabel: `${item?.timezone_name}, ${item?.country_name}`,
  }));
  useEffect(() => {
    postData(TimeZoneListAPI, {}, (data, res) => {
      setTimeZoneOptions(data);
    });
  }, [quickBookSelect]);
  return (
    <>
      <div className="booking-date-border">
        <div
          className={`room-booking-date ${
            isLocatePage ? 'room-booking-date-info' : ''
          }`}
        >
          <div className="booking-date booking-date-left">
            <div>
              <span>{findLabelText('Start', 'Start', 'Dashboard')}</span>
            </div>
            <div className="booking-date-picker" id='start-timepicker'>
              <TimePicker
                className="form-control timepicker"
                getPopupContainer={() => document.getElementById('start-timepicker')}
                onChange={e => {
                  const time = moment(e).format(timeFormat_24);
                  setStartTime(time);
                }}
                defaultValue={moment(startTime, timeFormat_24)}
                value={startTime ? moment(startTime, timeFormat_24) : null}
                placeholder={startTime ? startTime : ''}
                format={getPreferedTimeFormat()}
                suffixIcon={<div></div>}
                allowClear={false}
                bordered={false}
                disabledHours={() =>
                  startTimeDisable
                    ? endHoursDisable(startTimeDisable)
                    : endHoursDisable(StartTime)
                }
                disabledMinutes={selectedHour =>
                  startTimeDisable
                    ? endMinutesDisable(
                        // startTimeDisable?.split(":")?.[0],
                        selectedHour,
                        startTimeDisable,
                      )
                    : endMinutesDisable(selectedHour, StartTime)
                }
                showNow={false}
                inputReadOnly={true}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="booking-date booking-date-right">
            <div className="booking-date-right-info">
              <SelectField
                value={startTimezone}
                options={startTimezoneoptions}
                height={'40px'}
                minWidth={minWidth}
                onChangeValue={value => {
                  const startValue = { ...value };
                  startValue['label'] = startValue['showLabel'];
                  setStartTimezone(startValue);
                  isChangeEndWithStart && setEndTimezone(startValue);
                }}
                placeholder="Timezone"
                // isSearchable={false}
                disabled={disabled}
                showStyle={false}
              />
            </div>
          </div>
        </div>

        <div
          className={`room-booking-date ${
            isLocatePage ? 'room-booking-date-info' : ''
          }`}
        >
          <div className="booking-date booking-date-left">
            <div>
              <span>{findLabelText('End', 'End', 'Dashboard')}</span>
            </div>
            <div className="booking-date-picker" id='end-timepicker'>
              <TimePicker
                className="form-control timepicker"
                getPopupContainer={() => document.getElementById('end-timepicker')}
                onChange={e => {
                  const time = moment(e).format(timeFormat_24);
                  setEndTime(time);
                }}
                placeholder={endTime ? endTime : ''}
                defaultValue={moment(endTime, timeFormat_24)}
                value={endTime ? moment(endTime, timeFormat_24) : null}
                format={getPreferedTimeFormat()}
                suffixIcon={<div></div>}
                allowClear={false}
                bordered={false}
                disabledHours={() =>
                  endTimeDisable
                    ? startdHoursDisable(endTimeDisable)
                    : startdHoursDisable(EndTime)
                }
                disabledMinutes={selectedHour =>
                  endTimeDisable
                    ? startMinutesDisable(
                        // endTimeDisable?.split(":")?.[0],
                        selectedHour,
                        endTimeDisable,
                      )
                    : startMinutesDisable(selectedHour, EndTime)
                }
                showNow={false}
                inputReadOnly={true}
                disabled={endDisabled}
              />
            </div>
          </div>
          <div className="booking-date booking-date-right">
            <div className="booking-date-right-info">
              <SelectField
                value={endTimezone}
                options={endTimezoneoptions}
                height={'40px'}
                minWidth={minWidth}
                onChangeValue={value => {
                  const endValue = { ...value };
                  endValue['label'] = endValue['showLabel'];
                  setEndTimezone(endValue);
                  setChangeEndWithStart(false);
                }}
                placeholder="Timezone"
                // isSearchable={false}
                disabled={disabled}
                showStyle={false}
              />
            </div>
          </div>
        </div>
        {selectTimezoneText && (
          <label style={{ color: 'red' }}>{selectTimezoneText}</label>
        )}
      </div>
    </>
  );
};

export default StartEndTimePickerWithTimeZone;
