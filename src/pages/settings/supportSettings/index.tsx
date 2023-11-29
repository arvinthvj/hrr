import React from 'react';
import { Link } from 'react-router-dom';
import { icon_01 } from '../../../components/imagepath';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import { findLabelText } from '../../../components/commonMethod';
import { TabNames } from '../../../components/settings/constant';
import { Content } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd';

const SupportSettings = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Content className="content">
            <Row>
              <SettingsHeaderTabs activeTab={TabNames.support} />
              <Col span={24} className="main-space-remove">
                <div className="setting-profile-group setting-profile-group-info card">
                  <div className="setting-profile-head reset-head ">
                    <h3>
                      {findLabelText(
                        TabNames.support,
                        TabNames.support,
                        TabNames.settings,
                      )}
                    </h3>
                  </div>
                  <div className="organisation-settings border-bottom-0">
                    <Row>
                      <Col span={24}>
                        <div className="reset-pass-setting">
                          <ul>
                            <li>
                              <Link to="#">
                                {findLabelText(
                                  'Help_troubleshooting',
                                  'Help & troubleshooting',
                                  'Settings',
                                )}
                              </Link>
                              <span>
                                <Link to="#">
                                  <img src={icon_01} alt="icon" />{' '}
                                </Link>
                              </span>
                            </li>
                            <li>
                              <Link to="#">
                                {findLabelText(
                                  'Whats_new',
                                  "What's new",
                                  'Settings',
                                )}{' '}
                              </Link>
                              <span>
                                <Link to="#">
                                  <img src={icon_01} alt="icon" />{' '}
                                </Link>
                              </span>
                            </li>
                            <li className="setting-weight">
                              {findLabelText(
                                'Feedback',
                                'Feedback',
                                'Settings',
                              )}
                              <span>
                                <Link to="#">feedback@hybridhero.com </Link>
                              </span>
                            </li>
                            <li>
                              {findLabelText('About', 'About', 'Settings')}
                              <span className="set-version">
                                Version1.42323.232{' '}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
};

export default SupportSettings;
