import React from 'react';
import {
  convertheBookingTimeToLocalDateTime,
  getPreferedTimeFormat,
  getUserPreferedDateFormat,
} from '../commonMethod';
import { useSelector } from 'react-redux';
import { dateFormat_DD_MM_YYYY } from '../../assets/constants/config';
const HrHistory = ({ historyList }) => {
  const fontBold = { fontWeight: 'bold' };
  const dot = {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 5,
    marginTop: 5,
  };

  // const getDate = (date, time) => {
  //   const dateTime =
  //     getUserPreferedDateFormat(date) + ' ' + getPrefereredTimeToDisplay(time);
  //   return dateTime;
  // };
  const { userDateTimeFormat } = useSelector((state: any) => state?.app);
  const getTimeZone = (dateFormat, timeformat) => {
    return convertheBookingTimeToLocalDateTime(
      dateFormat,
      timeformat,
      'Africa/Abidjan',
      getPreferedTimeFormat(),
      userDateTimeFormat?.date_pref
        ? userDateTimeFormat?.date_pref
        : dateFormat_DD_MM_YYYY,
    );
  };

  return (
    <div className="personal-time-card-body">
      <div>
        {historyList &&
          historyList?.length > 0 &&
          historyList?.map((history, index) => {
            return (
              <div key={index} style={{ display: 'flex', marginBottom: 10 }}>
                <div>
                  <div style={dot} />
                </div>
                <div style={{ fontSize: 12, color: 'black' }}>
                  <span>
                    {getTimeZone(
                      history?.created_at || history?.updated_at,
                      history?.created_at_time || history?.updated_at_time,
                    )}
                  </span>
                  <div className="history-text">
                    <span style={fontBold}>{history?.changed_by}</span>
                    <span>
                      {(history?.type == 'user_work_manager' ||
                        history?.type == 'user_work_direct_report') &&
                      (history.from_value == '' || history.from_value == null)
                        ? ' has Added '
                        : ' has changed '}
                    </span>
                    <span>
                      {(history?.type == 'user_work_manager' ||
                        history?.type == 'user_work_direct_report') &&
                      (history.from_value == 'To' ||
                        history.from_value == null ||
                        history.from_value == '')
                        ? history.field_name + ' '
                        : history.field_name + ' from '}
                    </span>
                    <span style={fontBold}>
                      {history?.from_value == 'To' ? '' : history?.is_date ? getUserPreferedDateFormat(history?.from_value) : history?.from_value}
                    </span>
                    <span>
                      {(history?.type == 'user_work_manager' ||
                        history?.type == 'user_work_direct_report') &&
                      (history.from_value == 'To' ||
                        history.from_value == null ||
                        history.from_value == '')
                        ? ''
                        : ' to '}
                    </span>
                    <span style={fontBold}>{history?.is_date ? getUserPreferedDateFormat(history.to_value) : history.to_value}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HrHistory;
