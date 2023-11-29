import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  dateFormat_DD_MMM_YYYY1,
  timeFormat_24,
} from '../../assets/constants/config';
import {
  convertheBookingTimeToLocalDateTime,
  getPreferedTimeFormat,
  getPrefereredTimeToDisplay,
  getUserPreferedDateFormat,
} from '../../components/commonMethod';
import { postData } from '../../services/apicall';
import { GetUserHistoryList } from '../../services/apiurl';
import { useSelector } from 'react-redux';

const History = ({ userId }) => {
  const [historyList, setHistoryList] = useState([]);
  const { userDateTimeFormat } = useSelector((state: any) => state?.app);

  const fontBold = { fontWeight: 'bold' };
  const dot = {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 5,
    marginTop: 5,
  };
  const getTimeZone = dateFormat => {
    const dateTime = moment(dateFormat);
    const datePart = dateTime.format(
      userDateTimeFormat?.date_pref
        ? userDateTimeFormat?.date_pref
        : dateFormat_DD_MM_YYYY,
    );
    const timePart = dateTime.format(getPreferedTimeFormat());
    return datePart + ' ' + timePart;
  };
  const getHistoryList = () => {
    const updateHistory = (data, res) => {
      if (res?.data?.code == 200) {
        setHistoryList(data);
      } else {
        setHistoryList([]);
      }
    };
    const payload = { user_id: userId };
    postData(GetUserHistoryList, payload, updateHistory);
  };

  useEffect(() => {
    getHistoryList();
  }, [userId]);

  // const getDate = (date, time) => {
  //   let dateTime = getUserPreferedDateFormat(date) + ' ' + getPrefereredTimeToDisplay(time);
  //   return dateTime;
  // }

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
                    {getTimeZone(history?.created_at || history?.updated_at)}
                  </span>
                  <div className="history-text">
                    <span style={fontBold}>{history?.login_user_name}</span>
                    <span>
                      {history.old_value == '' || history.old_value == null
                        ? ' has Added '
                        : ' has changed '}
                    </span>
                    <span>
                      {history.field_name?.split('_')?.join(' ') + ' from '}
                    </span>
                    <span style={fontBold}>{history?.old_value}</span>
                    <span>{' to '}</span>
                    <span style={fontBold}>{history?.new_value}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
