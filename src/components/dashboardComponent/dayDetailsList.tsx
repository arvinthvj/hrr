import React, { useEffect } from 'react';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDashBoardLastAPIRes,
  setDashboardDayList,
  setDashboardListUpdate,
} from '../../reduxStore/dashboardSlice';
import moment from 'moment';
import { postData } from '../../services/apicall';
import {
  DashboardTableList,
  GetAllNotifications,
  GetAllRequestNotifications,
} from '../../services/apiurl';
import {
  getBookingAndNotificationCount,
  hideLoader,
  updateNotificationDetails,
  updateRequestNotificationDetails,
} from '../../reduxStore/appSlice';
import { store } from '../../reduxStore';
import Toaster from '../toast';
import { getDatesInRange } from '../commonMethod';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';
import momenttz from 'moment-timezone';

const DayDetailsList = ({ setCheckBtn, setShowDashboardListLoader }) => {
  const {
    dashboardFromDate,
    dashboardToDate,
    dashboardDayList,
    dashboardListUpdate,
    changeScheduleinDashboard,
  } = useSelector((state: RootReduxProps) => state.dashboard);
  const loginToken = store?.getState()?.app?.token;
  const dispatch = useDispatch();
  useEffect(() => {
    changeScheduleinDashboard && getDashboardList();
  }, [changeScheduleinDashboard]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      getDashboardList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [dashboardFromDate, dashboardToDate]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      dashboardListUpdate && getDashboardList();
      dispatch(getBookingAndNotificationCount());
    }, 500);
    return () => clearTimeout(debounce);
  }, [dashboardListUpdate]);

  const getDashboardList = async () => {
    setShowDashboardListLoader(true);
    const getDateList = getDatesInRange(dashboardFromDate, dashboardToDate);
    const getRes = (data, res) => {
      setShowDashboardListLoader(false);
      if (res?.data?.code == 200) {
        dispatch(setDashboardListUpdate(false));
        compareandCheckDates(data, getDateList);
        //  getNotifications();
        //  getBookingRequestNotifications();
        setCheckBtn(data);
      } else {
        compareandCheckDates({}, getDateList);
      }
    };
    const payload = {
      floorplan_type_id: '1,2,3',
      from_date: moment(dashboardFromDate).format(dateFormat_YYYY_MM_DD),
      to_date: moment(dashboardToDate).format(dateFormat_YYYY_MM_DD),
    };
    postData(DashboardTableList, payload, getRes);
  };

  const convertLocateDate = (date, time, timezone) => {
    const system_timezone = momenttz.tz.guess(); // Get the system's timezone
    const datetimeString = `${date}T${time}`;
    const userDateTime = moment.tz(datetimeString, timezone);

    // Convert the user's datetime to the system's timezone
    const systemDateTime = userDateTime.clone().tz(system_timezone);
    return systemDateTime.format(dateFormat_YYYY_MM_DD);
  };

  const compareandCheckDates = (responce, preDate) => {
    const res = responce;
    if (res?.book_data?.length > 0) {
      const bookData = res?.book_data;
      const pDate = preDate; // prepareDate
      for (let i = 0; i < pDate.length; i++) {
        for (let j = 0; j < bookData.length; j++) {
          const bookdate = convertLocateDate(
            bookData[j]?.user_booking_date
              ? bookData[j]?.user_booking_date
              : bookData[j]?.booking_date,
            bookData[j]?.start_time,
            bookData[j]?.start_timezone,
          );

          if (pDate[i].date == bookdate) {
            const list = pDate[i]['book_data'];
            list.push(bookData[j]);
          }
        }
      }
      const preparFullData = {
        common_data: res?.common_data,
        book_data: pDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes(res));
    } else {
      const preparFullData = {
        common_data: res?.common_data,
        book_data: preDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes({}));
    }
    dispatch(hideLoader());
  };
  const getNotifications = () => {
    const parm = {};
    postData(GetAllNotifications, parm, (success, res) => {
      if (res?.data?.code == '200') {
      } else {
        Toaster(res?.data?.code, res?.data?.message);
      }
      dispatch(updateNotificationDetails(success));
    });
  };
  const getBookingRequestNotifications = () => {
    postData(GetAllRequestNotifications, {}, (data, res) => {
      if (res.data.code == 200) {
        dispatch(updateRequestNotificationDetails(data));
      }
    });
  };
  return <></>;
};
export default DayDetailsList;
