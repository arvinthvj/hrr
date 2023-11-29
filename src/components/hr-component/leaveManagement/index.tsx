import React, { useContext, useEffect, useState } from 'react';
import TimeGrid from './timeGrid';
import LeaveTable from './table';
import { postData } from '../../../services/apicall';
import { bookedTimeoffHoliday } from '../../../services/apiurl';
import { PersonalContext } from '../personalController';
import moment from 'moment';
import {
  ErrorMessage,
  Errorcode,
  dateFormat_YYYY_MM_DD,
} from '../../../assets/constants/config';
import Toaster from '../../toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';

const LeaveManagment = ({ setRightScreen }) => {
  const { informationList, setLeaveDays, scrollHeightForLeave, userID } =
    useContext(PersonalContext);
  const [futureholidaysList, setFutureHolidaysList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (informationList?.length > 0) {
      dispatch(showLoader());
      postData(
        bookedTimeoffHoliday,
        {
          user_id: userID,
          work_calender: informationList?.find(
            item => item.list_type == 'work_basic',
          )?.work_calender,
        },
        (data, res) => {
          dispatch(hideLoader());
          if (res?.data?.code == '200') {
            const currentDate = moment();
            const futureDates = data.holidays_b.filter(event => {
              const eventDate = moment(event.date, dateFormat_YYYY_MM_DD);
              return eventDate.isSameOrAfter(currentDate, 'day');
            });
            setFutureHolidaysList(futureDates);
          } else {
            Toaster(Errorcode, ErrorMessage);
          }
        },
      );
    }
  }, [informationList, userID]);

  useEffect(() => {
    const dateArray = futureholidaysList?.map(item => item?.date);
    setLeaveDays(dateArray);
  }, [futureholidaysList]);

  return (
    <>
      <TimeGrid futureholidaysList={futureholidaysList} />
      <div
        style={{
          height: !Number.isNaN(scrollHeightForLeave)
            ? scrollHeightForLeave
            : 0,
        }}
      >
        <LeaveTable setRightScreen={setRightScreen} />
      </div>
    </>
  );
};

export default LeaveManagment;
