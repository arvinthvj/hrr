import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { carbon_security } from '../../components/imagepath';
import Toaster from '../../components/toast';
import {
  hideLoader,
  setWebSessionTimeOut,
  showLoader,
} from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import {
  addCompanySettingsList,
  companySettingsList,
} from '../../services/apiurl';
import { SettingsHeader } from '../../components/companySettings/otherComponents';
import PasswordReset from '../../components/companySettings/passwordResetView';
import MinNoOfPassword from '../../components/companySettings/minNoOfPassword';
import AllowPasswordAndSpecialChar from '../../components/companySettings/allowPasswordAndSpecialChar';
import {
  GeneralSettingsLabels,
  MaximumWebSession,
  MinimumWebSession,
} from '../../components/companySettings/constant';
import SessionTimeOut from '../../components/companySettings/sessionTimeOut';

const PasswordManagement = ({}) => {
  const [counter, setCounter] = useState(0);
  const [password, setPassword] = useState(0);
  const [allowPassword, setAllowPassword] = useState(true);
  const [no_of_days_wfh, setNo_of_days_wfh] = useState(1);
  const [specialCharecter, setSpecialCharecter] = useState(true);
  const [sessionExpireTime, setSessionExpireTime] =
    useState<any>(MinimumWebSession);
  const [error, setError] = useState({
    type: '',
    text: '',
  });
  const dispatch = useDispatch();

  const passwordmanagement = () => {
    if (
      parseInt(sessionExpireTime) < MinimumWebSession ||
      parseInt(sessionExpireTime) > MaximumWebSession
    ) {
      setError({
        type: GeneralSettingsLabels.webSessionErrorType,
        text: GeneralSettingsLabels.webSessionErrorText,
      });
    } else {
      setError({ type: '', text: '' });
      const data = {
        password_reset_month: counter >= 0 ? counter : 0,
        password_char_no: password >= 0 ? password : 0,
        password_repeats: allowPassword ? 1 : 0,
        password_special_char: specialCharecter ? 1 : 0,
        save_status: 2,
        no_of_days_wfh: no_of_days_wfh,
        session_expire_time: sessionExpireTime,
      };
      dispatch(showLoader());
      postData(addCompanySettingsList, data, (data, res) => {
        dispatch(hideLoader());
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200)
          dispatch(
            setWebSessionTimeOut(parseInt(sessionExpireTime) * 60 * 1000),
          );
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(showLoader());
    postData(companySettingsList, '', sucessCallBack);
  };

  const sucessCallBack = data => {
    dispatch(hideLoader());
    setNo_of_days_wfh(parseInt(data?.no_of_days_wfh));
    if (data?.password_repeats == 1) {
      setAllowPassword(true);
    } else {
      setAllowPassword(false);
    }
    if (data?.password_special_char == 1) {
      setSpecialCharecter(true);
    } else {
      setSpecialCharecter(false);
    }
    if (data?.password_reset_month) {
      setCounter(parseInt(data?.password_reset_month));
    }
    if (data?.password_char_no) {
      setPassword(parseInt(data?.password_char_no));
    }
    if (data?.session_expire_time) {
      setSessionExpireTime(data?.session_expire_time);
      dispatch(
        setWebSessionTimeOut(parseInt(data?.session_expire_time) * 60 * 1000),
      );
    }
  };

  return (
    <>
      <div className="card-body">
        <SettingsHeader
          image={carbon_security}
          lable={GeneralSettingsLabels.passwordManagement}
          callBack={() => passwordmanagement()}
        />
        <div className="settings-path">
          <PasswordReset counter={counter} setCounter={setCounter} />
          <MinNoOfPassword password={password} setPassword={setPassword} />
          <SessionTimeOut
            sessionExpireTime={sessionExpireTime}
            setSessionExpireTime={setSessionExpireTime}
            error={error}
            setError={setError}
          />
          <AllowPasswordAndSpecialChar
            allowPassword={allowPassword}
            setAllowPassword={setAllowPassword}
            specialCharecter={specialCharecter}
            setSpecialCharecter={setSpecialCharecter}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordManagement;
