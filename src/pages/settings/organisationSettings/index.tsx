import React from 'react';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import { findLabelText } from '../../../components/commonMethod';
import { ButtonNames, TabNames } from '../../../components/settings/constant';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';

const OrganisationSettings = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Content className="content">
            <Row>
              <SettingsHeaderTabs activeTab={TabNames.organisation} />
              <Col span={24} className="main-space-remove">
                <div className="setting-profile-group setting-profile-group-info card">
                  <div className="setting-profile-head">
                    <h3>
                      {findLabelText(
                        'Change_organisation',
                        TabNames.changeOrganisation,
                        TabNames.settings,
                      )}
                    </h3>
                  </div>
                  <div className="organisation-settings">
                    <Row>
                      <Col span={8}>
                        <div className="organisation-list">
                          <ul>
                            <li>
                              Goldman Sachs Group{' '}
                              <a href="#" className="active">
                                {findLabelText(
                                  ButtonNames.ACTIVE,
                                  ButtonNames.ACTIVE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              Boeing{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              Sysco{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              Berkshire Hathaway{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              AbbVie{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              Lockheed Martin{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              HCA Healthcare{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
                            </li>
                            <li>
                              Dow{' '}
                              <a href="#">
                                {findLabelText(
                                  ButtonNames.CHANGE,
                                  ButtonNames.CHANGE,
                                  TabNames.settings,
                                )}
                              </a>
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

export default OrganisationSettings;
