import React from 'react';
import { tabIcon1, tabIcon2 } from '../../imagepath';
import { Link } from 'react-router-dom';

const SettingsHeader = ({ type, setIsopened, setTabChange, tabChange }) => {
  return (
    <div className="card-header">
      <div className="tab-card-header">
        <ul className="nav nav-tabs" id="personalTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className={`nav-link ${tabChange == 'form' ? 'active' : ''}`}
              to="#"
              onClick={() => {
                setTabChange('form');
              }}
            >
              <img src={tabIcon1} alt="" />
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className={`nav-link ${tabChange == 'history' ? 'active' : ''}`}
              to="#"
              onClick={() => {
                setTabChange('history');
              }}
            >
              <img src={tabIcon2} alt="" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="personal-tab-heading">
        <h4>
          <Link to="#" onClick={() => setIsopened(false)}>
            <i className="fas fa-chevron-left" />
          </Link>
          {tabChange == 'history'
            ? 'History'
            : type == 'add'
            ? 'Create profile'
            : 'Edit profile'}
        </h4>
      </div>
    </div>
  );
};

export default SettingsHeader;
