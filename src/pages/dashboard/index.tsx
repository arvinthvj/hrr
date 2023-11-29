import React, { useEffect, useState } from 'react';
import DayDetails from './dayDetails';
import YourTeamDetails from './todayTeamDetails';
import { useDispatch, useSelector } from 'react-redux';
import UserviewProfile from './userviewprofile';
import Loader from '../../components/loader';
import YourDayHeader from '../../components/dashboardComponent/yourDayHeader';
import DashboardAssertHeader from '../../components/dashboardComponent/dashboardAssertHeader';
import { ViewDataProps } from '../../assets/globals/typeConstants';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import DayDetailsList from '../../components/dashboardComponent/dayDetailsList';
import { Row } from 'antd';
import { postData } from '../../services/apicall';
import {
  GetNotificationCenterCount,
  GetUserDateTimeFormatPref,
  UserTimezoneDetails,
} from '../../services/apiurl';
import {
  setUserDateTimeFormat,
  setUserDetails,
} from '../../reduxStore/appSlice';
import { DefaultUserDateTimePref } from '../../assets/constants/config';
const Dashboard = () => {
  const { dashboardDayList } = useSelector(
    (state: RootReduxProps) => state.dashboard,
  );
  const { showMobileMenu: menu, userDetails } = useSelector(
    (state: RootReduxProps) => state?.app,
  );
  const dispatch = useDispatch();
  const [selectTap, setSelectTap] = useState([1, 2, 3, null]);
  const [checkbtn, setCheckBtn] = useState([]);
  const [pageChange, setPageChange] = useState(true);
  const [viewData, setViewData] = useState<ViewDataProps | null>(null);
  const [userTableList, setUserTableList] = useState([]);
  const [showDashboardListLoader, setShowDashboardListLoader] = useState(false);

  const getTimeZoneDetails = () => {
    const payload = { user_id: userDetails?.id };
    postData(UserTimezoneDetails, payload, (data, res) => {
      if (res?.data?.code == 200) {
        const userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
        userDetailsCopy['alias_name'] = data?.alias_name;
        userDetailsCopy['location'] = [data?.location];
        userDetailsCopy['timezone'] = data?.timezone;
        userDetailsCopy['timezone_id'] = data?.timezone_id;
        userDetailsCopy['default_workspace_timezone_id'] =
          data?.default_workspace_timezone_id;
        userDetailsCopy['default_workspace_timezone_name'] =
          data?.default_workspace_timezone_name;
        userDetailsCopy['default_workspace_timezone_alias_name'] =
          data?.default_workspace_timezone_alias_name;
        userDetailsCopy['default_room_timezone_id'] =
          data?.default_room_timezone_id;
        userDetailsCopy['default_room_timezone_name'] =
          data?.default_room_timezone_name;
        userDetailsCopy['default_room_timezone_alias_name'] =
          data?.default_room_timezone_alias_name;
        userDetailsCopy['default_parking_timezone_id'] =
          data?.default_parking_timezone_id;
        userDetailsCopy['default_parking_timezone_name'] =
          data?.default_parking_timezone_name;
        userDetailsCopy['default_parking_timezone_alias_name'] =
          data?.default_parking_timezone_alias_name;

        dispatch(setUserDetails(userDetailsCopy));
      }
    });
  };

  const getUserDateTimeFormat = () => {
    postData(GetUserDateTimeFormatPref, {}, (data, res) => {
      let preferedFormat = {};
      if (res?.data?.code == 200) {
        preferedFormat = {
          date_pref: data?.date_pref
            ? data?.date_pref
            : DefaultUserDateTimePref?.date_pref,
          time_pref: data?.time_pref
            ? data?.time_pref
            : DefaultUserDateTimePref?.time_pref,
        };
      } else {
        preferedFormat = {
          date_pref: DefaultUserDateTimePref?.date_pref,
          time_pref: DefaultUserDateTimePref?.time_pref,
        };
      }
      dispatch(setUserDateTimeFormat(preferedFormat));
    });
  };

  const getUnreadNotificationCount = () => {
    postData(GetNotificationCenterCount, {}, (data, res) => {
      if (res?.data?.code == 200) {
        // do nothing
      }
    });
  };

  useEffect(() => {
    getUnreadNotificationCount();
    getTimeZoneDetails();
    getUserDateTimeFormat();
  }, []);

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        {pageChange === true ? (
          <div className="page-wrapper">
            <div className="content container-fluid pb-0">
              <Row>
                <div className="col-xl-9 col-lg-12 main-space-remove">
                  <YourDayHeader />
                  <DashboardAssertHeader selectTapCheck={setSelectTap} />
                  {showDashboardListLoader && <Loader />}
                  <DayDetailsList
                    setCheckBtn={setCheckBtn}
                    setShowDashboardListLoader={setShowDashboardListLoader}
                  />
                  {dashboardDayList?.book_data?.length > 0
                    ? dashboardDayList?.book_data?.map((date, index) => {
                        const bookValue = date;
                        return (
                          <DayDetails
                            selectedAssets={selectTap}
                            key={index}
                            details={bookValue}
                            selectTap={checkbtn}
                          />
                        );
                      })
                    : null}
                </div>
                <YourTeamDetails
                  setUserTableList={setUserTableList}
                  setViewData={setViewData}
                  setPageChange={setPageChange}
                  pageChange={pageChange}
                />
              </Row>
            </div>
          </div>
        ) : (
          <UserviewProfile viewData={viewData} setPageChange={setPageChange} />
        )}
      </div>
    </>
  );
};
export default Dashboard;
