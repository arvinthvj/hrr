import React from 'react';
import { tabIcon1, tabIcon2 } from '../../imagepath';

const TimeOffTabs = () => {
  return (
    <div className="card-header">
      <div className="tab-card-header">
        <ul className="nav nav-tabs" id="personalTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="edit-time"
              data-bs-toggle="tab"
              href="#edit_time"
              role="tab"
              aria-controls="edit_time"
              aria-selected="true"
            >
              <img src={tabIcon1} alt="" />
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="history-tab"
              data-bs-toggle="tab"
              href="#history_tab"
              role="tab"
              aria-controls="history_tab"
              aria-selected="true"
            >
              <img src={tabIcon2} alt="" />
            </a>
          </li>
        </ul>
      </div>
      <div className="personal-tab-heading">
        <h4>
          <a href="javascript:void(0);">
            <i className="fas fa-chevron-left" />
          </a>
          Edit time off type
        </h4>
      </div>
    </div>
  );
};

export default TimeOffTabs;
