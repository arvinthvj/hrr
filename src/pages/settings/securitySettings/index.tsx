import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { icon_01 } from '../../../components/imagepath';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import { findLabelText } from '../../../components/commonMethod';
import ResetPassword from '../../../components/settings/security/resetPassword';
import {
  ResetPasswordFields,
  TabNames,
} from '../../../components/settings/constant';
import { Content } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd';

const SecuritySettings = () => {
  const [toggleResetPassword, setToggleResetPassword] = useState(false);

  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Content className="content">
            <Row>
              <SettingsHeaderTabs activeTab={TabNames.security} />

              {!toggleResetPassword && (
                <Col span={24} className="main-space-remove">
                  <div className="setting-profile-group setting-profile-group-info card">
                    <div className="setting-profile-head reset-head">
                      <h3>
                        {findLabelText(
                          TabNames.security,
                          TabNames.security,
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
                                <Link
                                  className="reset-password-link"
                                  to={'#'}
                                  onClick={() =>
                                    setToggleResetPassword(!toggleResetPassword)
                                  }
                                >
                                  {findLabelText(
                                    'Reset_password',
                                    ResetPasswordFields.resetPassword,
                                    TabNames.settings,
                                  )}
                                </Link>
                                <span>
                                  <Link
                                    to={'#'}
                                    onClick={() =>
                                      setToggleResetPassword(
                                        !toggleResetPassword,
                                      )
                                    }
                                  >
                                    <img src={icon_01} alt="icon" />{' '}
                                  </Link>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              )}

              {toggleResetPassword && (
                <ResetPassword setToggleResetPassword toggleResetPassword />
              )}
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;
