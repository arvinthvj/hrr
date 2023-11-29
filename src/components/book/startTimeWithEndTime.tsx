import { TimePicker } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { topdown } from '../imagepath';
import { BookingContext } from '../context/context';
import {
  changeTimeZone,
  endHoursDisable,
  endMinutesDisable,
  getEndTime,
  getPreferedTimeFormat,
  getStartTime,
  startMinutesDisable,
  startdHoursDisable,
} from '../commonMethod';
import {
  dateFormat_DD_MM_YYYY_with_slash,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_MM_DD_YYYY_with_slash,
  timeFormat_24,
} from '../../assets/constants/config';

const StartTimeWithEndTime = () => {
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedLocation,
    setBookDate,
    bookDate,
    timezone,
  } = useContext(BookingContext);

  const { languages } = useSelector((state: any) => state.language);
  const { userDetails } = useSelector((state: any) => state?.app);
  useEffect(() => {
    if (timezone) {
      const newDate = moment(
        changeTimeZone(timezone),
        dateFormat_DD_MM_YYYY_with_time,
      );
      const date = moment(newDate).format(dateFormat_MM_DD_YYYY_with_slash);
      const sTime = new Date(
        date +
          ' ' +
          getStartTime(userDetails?.start_working_hour, timezone, bookDate),
      );
      const finalStartTime = moment(sTime).format(timeFormat_24);
      setStartTime(finalStartTime);
      const eTime = new Date(
        date +
          ' ' +
          getEndTime(userDetails?.end_working_hour, timezone, bookDate),
      );
      const finalEndTime = moment(eTime).format(timeFormat_24);
      setEndTime(finalEndTime);
    } else if (
      moment(bookDate).format(dateFormat_DD_MM_YYYY_with_slash) ===
      moment(new Date()).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      setStartTime(
        getStartTime(userDetails?.start_working_hour, timezone, bookDate),
      );
      setEndTime(getEndTime(userDetails?.end_working_hour, timezone, bookDate));
    } else {
      setStartTime(userDetails?.start_working_hour);
      setEndTime(userDetails?.end_working_hour);
    }
  }, [timezone, bookDate]);

  return (
    <li>
      <div className="start-end-time">
        <ul>
          <li>
            <div className="settings-group">
              <h5>
                {languages?.Dashboard
                  ? languages?.Dashboard?.Start?.name
                  : 'Start'}
              </h5>
              <div className="filter-input filter-time filter-input-time filter-time-input">
                <TimePicker
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
                  disabledHours={() => startdHoursDisable(endTime)}
                  disabledMinutes={selectedHour =>
                    startMinutesDisable(selectedHour, endTime)
                  }
                  showNow={false}
                  inputReadOnly={true}
                />
                <div className="img-group view-book-space pt-1">
                  <img src={topdown} alt="img" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="settings-group settings-group-right">
              <h5>
                {languages?.Dashboard ? languages?.Dashboard?.End?.name : 'End'}
              </h5>
              <div className="filter-input filter-time filter-input-time filter-time-input">
                <TimePicker
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
                  disabledHours={() => endHoursDisable(startTime)}
                  disabledMinutes={selectedHour =>
                    endMinutesDisable(selectedHour, startTime)
                  }
                  showNow={false}
                  inputReadOnly={true}
                />
                <div className="img-group view-book-space pt-1">
                  <img src={topdown} alt="img" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default StartTimeWithEndTime;
