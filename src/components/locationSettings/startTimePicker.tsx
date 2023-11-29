import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { getPreferedTimeFormat } from '../commonMethod';

export const StartTimePicker = ({ start_time, endTime, onSubmitStartTime }) => {
  const startdHoursDisable = () => {
    const hours: any = [];
    let h = parseInt(endTime.split(':')[0]);
    const m = parseInt(endTime.split(':')[1]);
    if (m == 0) {
    } else {
      h = h + 1;
    }
    for (let i = h; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const startMinutesDisable = selectedHour => {
    const h = parseInt(endTime.split(':')[0]);

    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(endTime.split(':')[1]);
      for (let i = m; i <= 60; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };

  return (
    <TimePicker
      onChange={e => {
        const time = moment(e).format('HH:mm');
        onSubmitStartTime(time);
      }}
      defaultValue={
        start_time == '' || start_time == undefined
          ? moment('07:00', 'HH:mm')
          : moment(start_time, 'HH:mm')
      }
      placeholder={
        start_time == '' || start_time == undefined ? '07:00' : start_time
      }
      format={getPreferedTimeFormat()}
      suffixIcon={<div></div>}
      allowClear={false}
      bordered={false}
      disabledHours={startdHoursDisable}
      disabledMinutes={startMinutesDisable}
      className="timepicker"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 3,
        width: 50,
        fontSize: 14,
        borderRadius: 5,
      }}
      showNow={false}
      inputReadOnly={true}
    />
  );
};
