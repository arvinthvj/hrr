import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { plusicon } from '../imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications } from '../notification/index';
import QuickBook from '../quickbookComponent';
import { setQuickBookState } from '../../reduxStore/quickBookSlice';
import { postData } from '../../services/apicall';
import { HeaderSearch } from './headerSearch';
import EditBooking from '../editBooking/editbooking';
import ScheduledBooking from '../editScheduleBooking/scheduledBooking';
import { getSecretValueFromKeyVault } from '../../services/s3Bucket';
import moment from 'moment';
import { setLanguages } from '../../reduxStore/languageSettingSlice';
import { LanguageSetting } from '../../services/apiurl';
import LogoutDropdown from './logoutDropdown';
import { findLabelText } from '../commonMethod';
import { ApiStatusCode } from './constant';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';
import InOfficePolicy from './inOfficePolicy';
import NotificationBell from '../newNotification/notificationBell';
import { hideAllLoader } from '../../reduxStore/appSlice';

export const Headertwo = props => {
  const dispatch = useDispatch();
  const { scheduleBook, quickBookState } = useSelector(
    (state: any) => state?.quickBook,
  );
  const { userDetails, orgDetail, loading } = useSelector(
    (state: any) => state.app,
  );
  const [navbar, setNavbar] = useState(false);
  const [noDays, setDate] = useState<boolean | number>(0);
  const [trialUrl, setTrialUrl] = useState<any>(null);

  const onMenuClik = () => {
    props.onMenuClick();
  };

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener('scroll', changeBackground);
  const handleQuickBookChange = value => {
    dispatch(setQuickBookState(value));
  };

  const childFunc = useRef<any>(null);

  useEffect(() => {
    if (props.childFunc) {
      props.childFunc.current = showNotification;
    }
  }, []);

  const showNotification = () => {
    childFunc.current();
  };

  const activeDashboardFunction = val => {
    if (props?.callDayDetails) {
      props?.callDayDetails(val);
    }
  };

  useEffect(() => {
    const diffInDays = (date1, date2) => {
      const diffInMs = date2 - date1;
      const diffInDays = diffInMs / 86400000;
      return diffInDays;
    };
    const date1 = new Date(moment().format(dateFormat_YYYY_MM_DD)); // Dont change the formet 2022-02-07
    const date2 = new Date(trialUrl?.trial_end_date); // Dont change the formet 2022-02-10
    trialUrl && setDate(diffInDays(date1, date2));
    if (date1 >= date2) {
      setDate(false);
    } else {
      noDays;
    }
  }, [trialUrl]);

  const updateLanguageSetting = lang => {
    const SuccessCallback = (data, res) => {
      if (res.data.code == ApiStatusCode.SUCCESS) {
        dispatch(setLanguages(data));
      }
    };
    postData(LanguageSetting + lang, '', SuccessCallback);
  };

  useEffect(() => {
    updateLanguageSetting(userDetails?.language_code);
    if (orgDetail?.org_name) {
      getSecretValueFromKeyVault(`${orgDetail?.org_name}`, data => {
        setTrialUrl(data?.SecretString && JSON.parse(data?.SecretString));
      });
    }
  }, []);

  // useEffect(() => {
  //   if (loading > 0) {
  //     setTimeout(() => {
  //       dispatch(hideAllLoader());
  //     }, 25000);
  //   }
  // });

  return (
    <>
      <div className={`header ${navbar ? 'add-header-bg' : ''} `}>
        <HeaderSearch />
        {/* /Mobile Menu Toggle */}
        <Link
          to="#"
          className="mobile_btn"
          id="mobile_btn"
          onClick={() => onMenuClik()}
        >
          <i className="fas fa-bars" />
        </Link>
        {/* /Mobile Menu Toggle */}
        <ul className="nav nav-tabs user-menu user-dash-menus">
          <InOfficePolicy />
          {/* <li className="in-office-nav">
            <div className="in-office-box in-office-box-active">
              <div className="in-office-box-icon">
                <i className="far fa-circle-check"></i>
              </div>
              <div className="in-office-text">
                <p>
                  In-office Policy <span>- 4 days/week</span>
                </p>
              </div>
            </div>
          </li>
          <li className="in-office-progress-nav">
            <div className="in-office-progress">
              <div className="in-office-progress-bar">
                <span className="progress-default progress-active"></span>
                <span className="progress-default progress-unactive progress-active"></span>
                <span className="progress-default"></span>
                <span className="progress-default"></span>
              </div>
              <div className="in-office-progress-text progress-text-active">
                <p>2 day(s) to book</p>
              </div>
            </div>
          </li> */}
          <li className="quick-book-btn">
            <Link
              to="#"
              className="btn btn-primary quick-book-item"
              onClick={() => handleQuickBookChange('active')}
            >
              <img src={plusicon} alt="img" />{' '}
              <span>
                {findLabelText('Quick_Book', 'Quick Book', 'Dashboard')}
              </span>
            </Link>
          </li>
          {/* <Notifications {...props} childFunc={childFunc} /> */}
          <NotificationBell />
          <LogoutDropdown />
          {quickBookState == 'active' && (
            <QuickBook activeDashboardFunction={activeDashboardFunction} />
          )}
        </ul>
      </div>
      {scheduleBook == true && <ScheduledBooking />}
      <EditBooking activeDashboardFunction={activeDashboardFunction} />
    </>
  );
};
