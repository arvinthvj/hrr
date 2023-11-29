import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Notification_2,
  ParkingIcon,
  RoomIcon,
  Search,
  WorkspacesIcon,
  holiday,
  hrRequest,
} from '../imagepath';
import { NotificationLabel, NotificationTabs, RequestType } from './constants';
import { postData } from '../../services/apicall';
import { UpdateNotyReadStatus, UserFindDetails } from '../../services/apiurl';
import DropDownOptions from '../dropDown/dropdownOptions';
import Loader from '../loader';
import { updateBlinkIcon } from '../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';

const HeaderTabsAndFilters = ({
  tabChange,
  setTabChange,
  showPastRequest,
  setShowPastRequest,
  searchId,
  setSearchId,
  noticeFilter,
  setNoticeFilter,
  workspaceFilter,
  setWorkspaceFilter,
  roomFilter,
  setRoomFilter,
  parkingFilter,
  setParkingFilter,
  timeoffFilter,
  setTimeoffFilter,
  setRequestType,
  setUnreadNotificationCount,
}) => {
  const [searchText, setSearchText] = useState('');
  const [displaySearch, setDisplaySearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [noResultText, setNoResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const findRef = useRef<any>(null);
  const dispatch = useDispatch();

  const handleChange = (e, type) => {
    if (type == 'request_type') {
      setRequestType(
        e?.target?.checked == true
          ? RequestType.outgoing
          : RequestType.incoming,
      );
    }
  };

  const getSearchList = () => {
    const payload = {
      search: searchText,
      type: tabChange,
    };
    setLoading(true);
    postData(UserFindDetails, payload, (data, res) => {
      setLoading(false);
      if (res?.data?.code == 200 && data?.length > 0) {
        setSearchList(data);
        setNoResultText('');
      } else {
        setSearchList([]);
        setNoResultText(NotificationLabel.noMatchFound);
      }
    });
  };

  const handleMarkAllRead = () => {
    setUnreadNotificationCount(0);
    dispatch(updateBlinkIcon(false));
    postData(UpdateNotyReadStatus, {}, (success, res) => {
      // do nothing
    });
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (findRef?.current && !findRef?.current?.contains(event?.target)) {
        setSearchList([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    // setNoticeFilter(true);
    // setWorkspaceFilter(true);
    // setRoomFilter(true);
    // setParkingFilter(true);
    // setTimeoffFilter(true);
    setShowPastRequest(true);
    setRequestType(RequestType.incoming);
  }, [tabChange]);

  useEffect(() => {
    if (searchText?.trim()?.length == 0) {
      setSearchList([]);
      setNoResultText('');
    }
    const debounce = setTimeout(() => {
      searchText && getSearchList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <div className="card notification-details-card">
      <div className="notification-tab-header">
        <div className="manager-tab-header">
          <div className="manager-tabs">
            <ul className="nav nav-tabs" id="managerTab" role="tablist">
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${
                    tabChange == NotificationTabs.notifications ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setTabChange(NotificationTabs.notifications);
                    setSearchText('');
                    setSearchId('');
                    setDisplaySearch('');
                    setNoResultText('');
                  }}
                >
                  <img src={Notification_2} alt="" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${
                    tabChange == NotificationTabs.requests ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setTabChange(NotificationTabs.requests);
                    handleMarkAllRead();
                    setSearchText('');
                    setSearchId('');
                    setDisplaySearch('');
                    setNoResultText('');
                  }}
                >
                  <img src={hrRequest} alt="" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="manager-header">
            <h4>{tabChange}</h4>
          </div>
        </div>

        <div className="hr-notification-search">
          {tabChange == NotificationTabs.requests && (
            <div className="hr-notification-checkbox">
              <label className="custom_check d-inline-flex align-items-center">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={showPastRequest}
                  onChange={e => setShowPastRequest(e?.target?.checked)}
                />
                {NotificationLabel.includePastRequest}{' '}
                <span className="checkmark" />
              </label>
            </div>
          )}
          <div className="hr-noti-search" ref={findRef}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={displaySearch}
              onChange={e => {
                const val = e?.target?.value;
                if (val?.trim() == '') {
                  setSearchId('');
                }
                const alphanumericRegex = /^[a-zA-Z0-9 ]*$/;
                if (alphanumericRegex.test(val)) {
                  setSearchText(val);
                  setDisplaySearch(val);
                }
              }}
            />
            <div className="hr-noti-img">
              <Link to="#">
                <img src={Search} alt="search-icon" />
              </Link>
            </div>
            {searchText && searchList && searchList?.length > 0 ? (
              <DropDownOptions
                hideAddButton
                type={'member'}
                options={searchList?.length > 0 ? searchList : []}
                onChange={opn => {
                  setSearchId(opn?.id);
                  setDisplaySearch(opn?.name);
                  setSearchText('');
                  setSearchList([]);
                }}
              />
            ) : loading ? (
              <div className="locate-managename no-result-box">
                <div className="name-groups">
                  <Loader height={'30'} width={'30'} />
                </div>
              </div>
            ) : noResultText !== '' ? (
              <p className="no-result-text">{noResultText}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="hr-notification-list">
        <div className="notification-check-box">
          {/* {tabChange == NotificationTabs.notifications && (
            <div className="notifi-check">
              <label className="custom_check d-inline-flex align-items-center">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={noticeFilter}
                  onChange={(e) => setNoticeFilter(e?.target?.checked)}
                />
                <img src={Notification_2} alt="" />
                {NotificationLabel.notices} <span className="checkmark" />
              </label>
            </div>
          )} */}
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name={'room' + tabChange}
                defaultChecked={roomFilter}
                onChange={e => setRoomFilter(e?.target?.checked)}
              />
              <img src={RoomIcon} alt="" />
              {NotificationLabel.rooms} <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name={'park' + tabChange}
                defaultChecked={parkingFilter}
                onChange={e => setParkingFilter(e?.target?.checked)}
              />
              <img src={ParkingIcon} alt="" />
              {NotificationLabel.parking} <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name={'work' + tabChange}
                defaultChecked={workspaceFilter}
                onChange={e => setWorkspaceFilter(e?.target?.checked)}
              />
              <img src={WorkspacesIcon} alt="" />
              {NotificationLabel.workspaces} <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name={'time' + tabChange}
                defaultChecked={timeoffFilter}
                onChange={e => setTimeoffFilter(e?.target?.checked)}
              />
              <img src={holiday} alt="" />
              {NotificationLabel.timeOff} <span className="checkmark" />
            </label>
          </div>
        </div>
        {tabChange == NotificationTabs.notifications && (
          <div className="detail-views detail-views-inner">
            <Link to="#" onClick={() => handleMarkAllRead()}>
              <div className="view_detail">{NotificationLabel.markAllRead}</div>
            </Link>
          </div>
        )}
        {tabChange == NotificationTabs.requests && (
          <div className="hr-notification-right">
            <div className="hr-switch-content">
              <div className="hr-switch-text">
                <p>{NotificationLabel.incoming}</p>
              </div>
              <div className="hr-switch">
                <label className="toggle-switch" htmlFor="incoming">
                  <input
                    type="checkbox"
                    className="toggle-switch-input"
                    defaultChecked={false}
                    id="incoming"
                    onChange={e => handleChange(e, 'request_type')}
                  />
                  <span className="toggle-switch-label">
                    <span className="toggle-switch-indicator" />
                  </span>
                </label>
              </div>
              <div className="hr-switch-text">
                <p>{NotificationLabel.outgoing}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderTabsAndFilters;
