import React from 'react';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import { findLabelText } from '../../../components/commonMethod';
import NotificationAlerts from '../../../components/settings/notification/notificationAlerts';
import { Descriptions, TabNames } from '../../../components/settings/constant';
import { Content } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd';

const NotificationSettings = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Content className="content">
            <Row>
              <SettingsHeaderTabs activeTab={TabNames.notifications} />
              <Col span={24} className="main-space-remove">
                <div className="setting-profile-group setting-profile-group-info card">
                  <div className="setting-profile-head">
                    <h3>
                      {findLabelText(
                        'Notification_settings',
                        TabNames.notificationSettings,
                        TabNames.settings,
                      )}
                    </h3>
                    <p>
                      {findLabelText(
                        'We_may_still_send_you_important_notifications_about_your_account_outside_of_your_notification_settings',
                        Descriptions.notificationDesc,
                        'Common_Values',
                      )}
                    </p>
                  </div>
                  <NotificationAlerts />
                </div>
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
};

export default NotificationSettings;
