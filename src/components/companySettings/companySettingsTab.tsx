import React from 'react';
import { Link } from 'react-router-dom';
import { companySettingTabList } from '../../assets/constants/config';
import { GeneralSettingsLabels } from './constant';
import { Col } from 'antd';

const CompanySettingsTabOptions: React.FC<CompanySettingsTabOptionsProps> = ({
  tabChanges,
  setTabChanges,
  options,
}) => {
  return (
    <li className="nav-item" role="presentation">
      <Link
        className={`nav-link ${
          options.type == '1'
            ? 'book-list-one'
            : options.type == '2'
            ? 'book-list-two'
            : 'book-list-three'
        } ${tabChanges == options.type ? 'active' : ''}`}
        to="#"
        onClick={() => setTabChanges(options.type)}
      >
        <img src={options.image} alt="" />
        {options.name}
      </Link>
    </li>
  );
};

const CompanySettingsTabList: React.FC<CompanySettingsTabListProps> = ({
  tabChanges,
  setTabChanges,
}) => {
  return (
    <div className="company-tabs">
      <ul className="nav nav-tabs" role="tablist">
        {companySettingTabList.map((opt, index) => {
          return (
            <CompanySettingsTabOptions
              key={index}
              tabChanges={tabChanges}
              options={opt}
              setTabChanges={setTabChanges}
            />
          );
        })}
      </ul>
    </div>
  );
};

interface CompanySettingsTabProps {
  tabChanges: string;
  setTabChanges: CallableFunction;
}

const CompanySettingsTab: React.FC<CompanySettingsTabProps> = ({
  tabChanges,
  setTabChanges,
}) => {
  return (
    <div
      className="card card-new company-input-center company-card company-set-card tab-pane company-card-info active"
      id="home"
    >
      <div className="card-header">
        <Col lg={24}>
          <h4>{GeneralSettingsLabels.generalSettings}</h4>
          <div className="company-tab-info">
            <CompanySettingsTabList
              tabChanges={tabChanges}
              setTabChanges={setTabChanges}
            />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default CompanySettingsTab;

interface CompanySettingsTabListProps {
  tabChanges: string;
  setTabChanges: CallableFunction;
}

interface CompanySettingsTabOptionsProps {
  tabChanges: string;
  setTabChanges: CallableFunction;
  options: { type: string; image: string; name: string };
}
