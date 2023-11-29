import React from 'react';
import { hrPermissionTabListOption } from '../../../assets/constants/config';
import { Link } from 'react-router-dom';
import { findLabelText } from '../../commonMethod';

interface PremissionTabListProps {
  selectedPermissionTab: { name: string; image: string; type: string };
  updatedPermissionTab: CallableFunction;
  selectedGroup: any;
  isOpen: boolean;
}
const PremissionTabList: React.FC<PremissionTabListProps> = ({
  selectedPermissionTab,
  updatedPermissionTab,
  selectedGroup,
  isOpen,
}) => {
  const renderOptions = (opt, index) => {
    return (
      <li key={index} className="nav-item" role="presentation">
        <Link
          to={''}
          onClick={() => updatedPermissionTab(opt)}
          className={`nav-link ${
            selectedPermissionTab.type == opt.type &&
            (selectedGroup?.id || isOpen)
              ? 'active'
              : ''
          }`}
        >
          <img src={opt.image} alt="" />
        </Link>
      </li>
    );
  };

  return (
    <div className="manager-tab-header">
      <div className="manager-tabs">
        <ul className="nav nav-tabs" id="managerTab" role="tablist">
          {hrPermissionTabListOption.map((opt, index) =>
            renderOptions(opt, index),
          )}
        </ul>
      </div>
      <div className="manager-header">
        <h4>
          {selectedGroup?.id || isOpen
            ? `${
                selectedPermissionTab.name
                  ? findLabelText(
                      selectedPermissionTab.name,
                      selectedPermissionTab.name,
                      'HR_Management',
                    )
                  : ''
              }`
            : ''}
        </h4>
      </div>
    </div>
  );
};

export default PremissionTabList;
