import React from 'react';
import { Link } from 'react-router-dom';
import { directory_icon, floor_01, floor_02, floor_03 } from '../imagepath';

const FloorTabsHeader = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="floor-tab">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link workspace-link ${
              selectedTab == 'workspacestab' ? 'active' : ''
            }`}
            id="workspaces-tab"
            data-bs-toggle="tab"
            to="#"
            role="tab"
            aria-controls="workspaces-tab"
            aria-selected="true"
            onClick={() => setSelectedTab('workspacestab')}
          >
            <img src={floor_01} alt="" />
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              selectedTab == 'buildingtab' ? 'active' : ''
            }`}
            id="building-tab"
            data-bs-toggle="tab"
            to="#"
            role="tab"
            aria-controls="buildingtab"
            aria-selected="true"
            onClick={() => setSelectedTab('buildingtab')}
          >
            <img src={floor_02} alt="" />
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${selectedTab == 'zonestab' ? 'active' : ''}`}
            id="zones-tab"
            data-bs-toggle="tab"
            to="#"
            role="tab"
            aria-controls="zonestab"
            aria-selected="true"
            onClick={() => setSelectedTab('zonestab')}
          >
            <img src={floor_03} alt="" />
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            className={`nav-link ${
              selectedTab == 'settingstab' ? 'active' : ''
            }`}
            id="settings-tab"
            data-bs-toggle="tab"
            to="#"
            role="tab"
            aria-controls="settingstab"
            aria-selected="true"
            onClick={() => setSelectedTab('settingstab')}
          >
            <img src={directory_icon} alt="" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FloorTabsHeader;
