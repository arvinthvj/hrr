import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { useDispatch, useSelector } from 'react-redux';
import { getImageFroms3Bucket } from '../../services/s3Bucket';
import { findFirstName, findFirst_LastName } from '../../assets/globals';
import {
  hrRequestUrl,
  loginWithTenantUrl,
  profileSettingsUrl,
} from '../../assets/constants/pageurl';
import { logout_icon, setting_icon } from '../imagepath';
import { postData } from '../../services/apicall';
import { logout, showLoader } from '../../reduxStore/appSlice';
import { logoutSecretKey } from '../../services/apiurl';
import { useCookies } from 'react-cookie';
import { Tooltip } from 'antd';
import { intercomShutDown } from '../../intercomShutdown';

const LogoutDropdown = () => {
  const { userDetails, updateDetails, image, orgDetail } = useSelector(
    (state: any) => state.app,
  );
  const dispatch = useDispatch();
  const logoutRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies<any>();
  useEffect(() => {
    const handleClickOutside = event => {
      if (logoutRef?.current && !logoutRef?.current?.contains(event?.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (image) {
      getImageFroms3Bucket(image, 'image', data => {
        setImageUrl(data);
        return data;
      });
    }else{
      setImageUrl(null);
    }
  }, [image, orgDetail?.org_name]);

  const renderComment = comment => {
    if (comment && comment.length > 10) {
      return (
        <Tooltip placement="right" title={comment}>
          {comment.substring(0, 10)}...
        </Tooltip>
      );
    }
    return <>{comment}</>;
  };

  return (
    <li className="nav-item dropdown has-arrow main-drop" ref={logoutRef}>
      <Link
        className="dropdown-toggle nav-link  user-menus pe-0"
        data-bs-toggle="collapse"
        role="button"
        to="#"
        aria-expanded={`${showDropdown ? 'true' : 'false'}`}
        aria-controls="logout-dropdown"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="user-text">
          {findLabelText('Hi', 'Hi', 'Common_Values')}{' '}
          {updateDetails?.display_name
            ? renderComment(updateDetails?.display_name)
            : renderComment(userDetails?.display_name)}
        </span>
        <span className="user-img">
          {imageUrl ? (
            <img src={imageUrl} className="img-fluid" alt="" />
          ) : (
            <span className="user-firstletter">
              {userDetails?.first_name && userDetails?.last_name
                ? findFirst_LastName(
                    userDetails?.first_name,
                    userDetails?.last_name,
                  )
                : findFirstName(
                    updateDetails?.display_name || userDetails?.display_name,
                  )}
            </span>
          )}
        </span>
      </Link>
      <div
        className="dropdown-menu"
        id="logout-dropdown"
        style={{
          display: `${showDropdown ? 'block' : 'none'}`,
        }}
      >
        <Link
          className="dropdown-item"
          to={profileSettingsUrl}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={setting_icon} alt="img" />{' '}
          {findLabelText('Settings', 'Settings', 'Dashboard')}
        </Link>
        <Link
          className="dropdown-item"
          to="#"
          onClick={() => {
            intercomShutDown()
            dispatch(showLoader());
            postData(logoutSecretKey, '', (res, data) => {
              dispatch(logout());
              removeCookie('token');
            });
            
          }}
        >
          <img src={logout_icon} alt="img" />{' '}
          {findLabelText('Log_out', 'Log out', 'Dashboard')}
        </Link>
      </div>
    </li>
  );
};

export default LogoutDropdown;
