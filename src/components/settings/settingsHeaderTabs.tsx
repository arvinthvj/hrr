import React from 'react';
import { findLabelText } from '../commonMethod';
import {
  languageSettingsUrl,
  notificationSettingsUrl,
  organisationSettingsUrl,
  profileSettingsUrl,
  securitySettingsUrl,
  supportSettingsUrl,
} from '../../assets/constants/pageurl';
import { Link } from 'react-router-dom';
import { SelectStatus, TabNames } from './constant';
import { Col } from 'antd';

const SettingsHeaderTabs = ({ activeTab }) => {
  return (
    <Col span={24}>
      <div className="setting-profiles-path setting-profiles-card card">
        <div className="path-list">
          <ul>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.profile ? SelectStatus.ACTIVE : ''
                }`}
                to={profileSettingsUrl}
              >
                {findLabelText(
                  TabNames.profile,
                  TabNames.profile,
                  TabNames.settings,
                )}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.organisation ? SelectStatus.ACTIVE : ''
                }`}
                to={organisationSettingsUrl}
              >
                {findLabelText(
                  TabNames.organisation,
                  TabNames.organisation,
                  TabNames.settings,
                )}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.language ? SelectStatus.ACTIVE : ''
                }`}
                to={languageSettingsUrl}
              >
                {findLabelText(
                  TabNames.language,
                  TabNames.language,
                  TabNames.settings,
                )}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.notifications ? SelectStatus.ACTIVE : ''
                }`}
                to={notificationSettingsUrl}
              >
                {findLabelText(
                  TabNames.notifications,
                  TabNames.notifications,
                  TabNames.settings,
                )}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.security ? SelectStatus.ACTIVE : ''
                }`}
                to={securitySettingsUrl}
              >
                {findLabelText(
                  TabNames.security,
                  TabNames.security,
                  TabNames.settings,
                )}
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  activeTab == TabNames.support ? SelectStatus.ACTIVE : ''
                }`}
                to={supportSettingsUrl}
              >
                {findLabelText(
                  TabNames.support,
                  TabNames.support,
                  TabNames.settings,
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default SettingsHeaderTabs;
