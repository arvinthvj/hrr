import React from 'react';
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

const HRRequestHeader = ({
  setTabChange,
  tabChange,
  setRequestType,
  setListType,
  setSearchText,
  setPastRequest,
  searchText,
}) => {
  const handleChange = (e, type) => {
    if (type == 'past_request') {
      setPastRequest(e?.target?.checked == true ? 'yes' : 'no');
    }
    if (type == 'request_type') {
      setRequestType(e?.target?.checked == true ? 'outgoing' : 'incoming');
    }
    if (type == 'type') {
      setListType(e?.target?.checked == true ? 'timeoff' : '');
    }
  };
  return (
    <div className="card notification-details-card">
      <div className="notification-tab-header">
        <div className="manager-tab-header">
          <div className="manager-tabs">
            <ul className="nav nav-tabs" id="managerTab" role="tablist">
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${
                    tabChange == 'notification' ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setTabChange('notification');
                  }}
                >
                  <img src={Notification_2} alt="" />
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${
                    tabChange == 'request' ? 'active' : ''
                  }`}
                  to="#"
                  onClick={() => {
                    setTabChange('request');
                  }}
                >
                  <img src={hrRequest} alt="" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="manager-header">
            <h4>{tabChange == 'request' ? 'Requests' : 'Notifications'}</h4>
          </div>
        </div>
        <div className="hr-notification-search">
          <div className="hr-notification-checkbox">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name="active"
                defaultChecked={true}
                onChange={e => handleChange(e, 'past_request')}
              />
              Include past requests <span className="checkmark" />
            </label>
          </div>
          <div className="hr-noti-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={e => {
                const val = e?.target?.value;
                const alphanumericRegex = /^[a-zA-Z0-9 ]*$/;
                if (alphanumericRegex.test(val)) {
                  setSearchText(val);
                }
              }}
            />
            <div className="hr-noti-img">
              <Link to="#">
                <img src={Search} alt="search-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hr-notification-list">
        <div className="notification-check-box">
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input type="checkbox" name="active" />
              <img src={RoomIcon} alt="" />
              Rooms <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input type="checkbox" name="active" />
              <img src={ParkingIcon} alt="" />
              Parking <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input type="checkbox" name="active" />
              <img src={WorkspacesIcon} alt="" />
              Workspaces <span className="checkmark" />
            </label>
          </div>
          <div className="notifi-check">
            <label className="custom_check d-inline-flex align-items-center">
              <input
                type="checkbox"
                name="active"
                defaultChecked={true}
                onChange={e => handleChange(e, 'type')}
              />
              <img src={holiday} alt="" />
              Time off <span className="checkmark" />
            </label>
          </div>
        </div>
        <div className="hr-notification-right">
          <div className="hr-switch-content">
            <div className="hr-switch-text">
              <p>Incoming</p>
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
              <p>Outgoing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRRequestHeader;
