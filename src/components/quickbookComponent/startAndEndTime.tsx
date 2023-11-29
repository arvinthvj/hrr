import React, { useContext, useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import {
  endHoursDisable,
  endMinutesDisable,
  findLabelText,
  startMinutesDisable,
  startdHoursDisable,
  timeValidation,
} from '../commonMethod';
import { QuickBookContext, QuickBookDayContext } from '../context/context';
import { useSelector } from 'react-redux';

const StartAndEndTime = () => {
  const { startTime, setStartTime, endTime, setEndTime, utcFormat } =
    useContext(QuickBookContext);
  const { setBookInitial } = useContext(QuickBookContext);
  const { editDetails } = useContext(QuickBookDayContext);
  const { quickBookSelect } = useSelector((state: any) => state?.quickBook);
  const { userDetails } = useSelector((state: any) => state?.app);

  return (
    <>
      <div className="booking-date">
        <div>
          <span>{findLabelText('Start', 'Start', 'Dashboard')}</span>
          <span className="booking-time-text">
            {editDetails?.data?.timezone_alias_name ? (
              <>({editDetails?.data?.timezone_alias_name})</>
            ) : (
              <>
                {utcFormat ? (
                  <>({utcFormat})</>
                ) : quickBookSelect == 1 &&
                  userDetails?.default_workspace_timezone_alias_name ? (
                  <>({userDetails?.default_workspace_timezone_alias_name})</>
                ) : quickBookSelect == 2 &&
                  userDetails?.default_room_timezone_alias_name ? (
                  <>({userDetails?.default_room_timezone_alias_name})</>
                ) : quickBookSelect == 3 &&
                  userDetails?.default_parking_timezone_alias_name ? (
                  <>({userDetails?.default_parking_timezone_alias_name})</>
                ) : (
                  <>({userDetails?.alias_name})</>
                )}
              </>
            )}
          </span>
        </div>
        <div className="booking-date-picker">
          <TimePicker
            disabled={
              timeValidation(editDetails) && editDetails?.data?.is_schedule != 1
                ? false
                : true
            }
            className="form-control timepicker"
            onChange={e => {
              setBookInitial(0);
              const time = moment(e).format('HH:mm');
              setStartTime(time);
            }}
            value={
              startTime
                ? moment(startTime, 'HH:mm')
                : moment(userDetails?.start_working_hour, 'HH:mm')
            }
            placeholder={startTime ? startTime : ''}
            format={'HH:mm'}
            suffixIcon={<div></div>}
            allowClear={false}
            bordered={false}
            disabledHours={() => startdHoursDisable(endTime)}
            disabledMinutes={selectedHour =>
              startMinutesDisable(selectedHour, endTime)
            }
            showNow={false}
            inputReadOnly={true}
          />
        </div>
      </div>
      <div className="booking-date">
        <div>
          <span>{findLabelText('End', 'End', 'Dashboard')}</span>
          <span className="booking-time-text">
            {editDetails?.data?.timezone_alias_name ? (
              <>({editDetails?.data?.timezone_alias_name})</>
            ) : (
              <>
                {utcFormat ? (
                  <>({utcFormat})</>
                ) : quickBookSelect == 1 &&
                  userDetails?.default_workspace_timezone_alias_name ? (
                  <>({userDetails?.default_workspace_timezone_alias_name})</>
                ) : quickBookSelect == 2 &&
                  userDetails?.default_room_timezone_alias_name ? (
                  <>({userDetails?.default_room_timezone_alias_name})</>
                ) : quickBookSelect == 3 &&
                  userDetails?.default_parking_timezone_alias_name ? (
                  <>({userDetails?.default_parking_timezone_alias_name})</>
                ) : (
                  <>({userDetails?.alias_name})</>
                )}
              </>
            )}
          </span>
        </div>
        <div className="booking-date-picker">
          <TimePicker
            disabled={editDetails?.data?.is_schedule != 1 ? false : true}
            className="form-control timepicker"
            onChange={e => {
              setBookInitial(0);
              const time = moment(e).format('HH:mm');
              setEndTime(time);
            }}
            placeholder={endTime ? endTime : ''}
            value={
              endTime
                ? moment(endTime, 'HH:mm')
                : moment(userDetails?.end_working_hour, 'HH:mm')
            }
            format={'HH:mm'}
            suffixIcon={<div></div>}
            allowClear={false}
            bordered={false}
            disabledHours={() => endHoursDisable(startTime)}
            disabledMinutes={selectedHour =>
              endMinutesDisable(selectedHour, startTime)
            }
            showNow={false}
            inputReadOnly={true}
          />
        </div>
      </div>
    </>
  );
};

export default StartAndEndTime;
