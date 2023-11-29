import React, { useContext } from 'react';
import { Col, TimePicker } from 'antd';
import {
  endHoursDisable,
  endMinutesDisable,
  findLabelText,
  startMinutesDisable,
  startdHoursDisable,
} from '../commonMethod';
import moment from 'moment';
import { topdown } from '../imagepath';
import { UpdateAssetContext } from '../context/context';

const AssetAvailableTimepicker = () => {
  const { setStartTime, startTime, setEndTime, endTime } =
    useContext(UpdateAssetContext);
  return (
    <Col lg={24}>
      <div className="form-settings assets-set assets-form-settings">
        <label htmlFor="name" className="settings-label">
          {findLabelText('Available', 'Available', 'Asset_Management')}
        </label>
        <div className="settings-group settings-group-info settings-time asset-settings-group">
          <h5> {findLabelText('From', 'From', 'Asset_Management')}</h5>
          <div className="asset-time-picker">
            <TimePicker
              onChange={e => {
                const time = moment(e).format('HH:mm:00');
                setStartTime(time);
              }}
              defaultValue={moment(startTime, 'HH:mm')}
              value={startTime ? moment(startTime, 'HH:mm') : null}
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
            <div className="img-group">
              <img src={topdown} alt="img" />
            </div>
          </div>
        </div>
        <div className="settings-group settings-group-info settings-time asset-settings-group">
          <h5>{findLabelText('To', 'To', 'Asset_Management')}</h5>
          <div className="asset-time-picker">
            <TimePicker
              value={moment(endTime, 'HH:mm')}
              onChange={e => {
                const time = moment(e).format('HH:mm:00');
                setEndTime(time);
              }}
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
            <div className="img-group">
              <img src={topdown} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AssetAvailableTimepicker;
