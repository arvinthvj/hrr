import React, { useEffect, useState } from 'react';
import { postData } from '../../services/apicall';
import { personalChangeHistoryAPI } from '../../services/apiurl';
import { useSelector } from 'react-redux';
import Toaster from '../toast';
import {
  ErrorMessage,
  Errorcode,
  dateFormat_DD_MM_YYYY,
} from '../../assets/constants/config';
import {
  convertheBookingTimeToLocalDateTime,
  getPreferedTimeFormat,
} from '../commonMethod';

const SettingsHistoryList = ({ type, editData }) => {
  const { userDetails } = useSelector((state: any) => state?.app);
  const [historyList, setHistoryList] = useState([]);

  const getHistoryList = () => {
    const payload = {
      user_id: userDetails?.id,
      type: type,
      type_id: editData?.id,
    };
    postData(personalChangeHistoryAPI, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setHistoryList(data);
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  useEffect(() => {
    getHistoryList();
  }, []);
  const fontBold = { fontWeight: 'bold' };
  const dot = {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 5,
    marginTop: 5,
  };

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
          historyList.length > 0 &&
          historyList.map((history, index) => {
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
                    <span style={fontBold}>{history.changed_by}</span>
                    <span>{' has changed '}</span>
                    <span>{history?.field_name + ' from '}</span>
                    <span style={fontBold}>{history?.from_value}</span>
                    <span>{' to '}</span>
                    <span style={fontBold}>{history?.to_value}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SettingsHistoryList;
