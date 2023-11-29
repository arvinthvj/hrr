import React from 'react';
import { hrSettingsTabListOption } from '../../assets/constants/config';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';

type TabProps = {
  selectedHRSettingsTab: any;
  updatedTab: CallableFunction;
  setIsopened: any;
};
const HRSettingsTabList: React.FC<TabProps> = ({
  selectedHRSettingsTab,
  updatedTab,
  setIsopened,
}) => {
  const renderList = (obj, index) => {
    return (
      <li key={index} className="nav-item" role="presentation">
        <Link
          onClick={() => {
            updatedTab(obj);
            setIsopened(false);
          }}
          to={''}
          className={`nav-link ${
            selectedHRSettingsTab.type == obj.type ? 'active' : null
          }`}
        >
          <img src={obj.image} alt="" />
        </Link>
      </li>
    );
  };

  return (
    <div className="manager-tab-header">
      <div className="manager-tabs">
        <ul className="nav nav-tabs" id="permissionTab" role="tablist">
          {hrSettingsTabListOption.map((opt, index) => renderList(opt, index))}
        </ul>
      </div>
      <div className="manager-header">
        <h4>
          {findLabelText(
            selectedHRSettingsTab.name.replace(/\s+/g, '_'),
            selectedHRSettingsTab.name,
            'HR_Management',
          )}
        </h4>
      </div>
    </div>
  );
};

export default HRSettingsTabList;
