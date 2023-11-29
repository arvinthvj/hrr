import React, { useContext } from 'react';
import {
  endHoursDisable,
  endMinutesDisable,
  findLabelText,
  getPreferedTimeFormat,
  startMinutesDisable,
  startdHoursDisable,
} from '../../commonMethod';
import { TimePicker } from 'antd';
import moment from 'moment';
import { ProfileContext } from '../../context/settingsContext';
import { ProfileFieldLabels, TabNames } from '../constant';
import { timeFormat_24 } from '../../../assets/constants/config';

const DefaultWorkingHours = () => {
  const { startTime, setStartTime, endTime, setEndTime } =
    useContext(ProfileContext);
  return (
    <div className="office-teams">
      <h3>
        {findLabelText(
          'Default_working_hours',
          ProfileFieldLabels.defaultWorkHours,
          TabNames.settings,
        )}
      </h3>
      <div className="office-views-team view-coloring">
        <h4>
          {findLabelText('Start', ProfileFieldLabels.start, TabNames.settings)}
        </h4>

        <TimePicker
          onChange={e => {
            const time = moment(e).format(timeFormat_24);
            setStartTime({
              ...startTime,
              data: time,
              count: startTime.count + 1,
            });
          }}
          value={moment(startTime?.data, timeFormat_24)}
          placeholder={startTime?.data}
          format={getPreferedTimeFormat()}
          suffixIcon={<div></div>}
          allowClear={false}
          bordered={false}
          disabledHours={() => startdHoursDisable(endTime?.data)}
          disabledMinutes={selectedHour =>
            startMinutesDisable(selectedHour, endTime?.data)
          }
          showNow={false}
          inputReadOnly={true}
        />
      </div>
      <div className="office-views-team view-coloring mb-0">
        <h4>
          {findLabelText('End', ProfileFieldLabels.end, TabNames.settings)}
        </h4>

        <TimePicker
          value={moment(endTime?.data, timeFormat_24)}
          onChange={e => {
            const time = moment(e).format(timeFormat_24);
            setEndTime({
              ...endTime,
              data: time,
              count: endTime.count + 1,
            });
          }}
          placeholder={endTime?.data}
          format={getPreferedTimeFormat()}
          suffixIcon={<div></div>}
          allowClear={false}
          bordered={false}
          disabledHours={() => endHoursDisable(startTime?.data)}
          disabledMinutes={selectedHour =>
            endMinutesDisable(selectedHour, startTime?.data)
          }
          showNow={false}
          inputReadOnly={true}
        />
      </div>
    </div>
  );
};

export default DefaultWorkingHours;
