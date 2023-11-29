import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { getPreferedTimeFormat } from '../commonMethod';

export const EndTimePicker = ({ startTime, end_time, onSubmitEndTime }) => {
  const endHoursDisable = () => {
    const h = parseInt(startTime.split(':')[0]);
    const m = parseInt(startTime.split(':')[1]);
    const hours: any = [];
    const len = m == 59 ? h + 1 : h;
    for (let i = 0; i < len; i++) {
      hours.push(i);
    }
    return hours;
  };

  const endMinutesDisable = selectedHour => {
    const h = parseInt(startTime.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(startTime.split(':')[1]);
      for (let i = 0; i <= m; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };

  return (
    <TimePicker
      defaultValue={
        end_time == '' || end_time == undefined
          ? moment('19:00', 'HH:mm')
          : moment(end_time, 'HH:mm')
      }
      placeholder={end_time == '' || end_time == undefined ? '19:00' : end_time}
      onChange={e => {
        const time = moment(e).format('HH:mm');
        onSubmitEndTime(time);
      }}
      format={getPreferedTimeFormat()}
      suffixIcon={<div></div>}
      allowClear={false}
      bordered={false}
      disabledHours={endHoursDisable}
      disabledMinutes={endMinutesDisable}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 3,
        width: 50,
        fontSize: 14,
        borderRadius: 5,
      }}
      className="timepicker"
      showNow={false}
      inputReadOnly={true}
    />
  );
};
