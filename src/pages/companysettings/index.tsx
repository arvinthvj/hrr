import React, { useState } from 'react';
import PasswordManagement from './passwordmanagement';
import StatusType from './statustype';
import CompanySettingTab from './companysettingtab';
import CompanySettingsTab from '../../components/companySettings/companySettingsTab';
import RightSideView from '../../components/companySettings/rightSideView';
import { GeneralSettingsTabs } from '../../components/companySettings/constant';
import { Card, Col, Row } from 'antd';

const CompanySetting = props => {
  const [tabChanges, setTabChanges] = useState('2');
  return (
    <>
      <div className={'main-wrapper'}>
        <div className="page-wrapper">
          <div className="content container-fluid book-view-card">
            <Row>
              <Col span={18} className=" main-space-remove d-flex">
                <div className="tab-content w-100">
                  <CompanySettingsTab
                    tabChanges={tabChanges}
                    setTabChanges={setTabChanges}
                  />

                  <div className="card card-new company-input-center company-card company-set-card tab-pane company-card-info active">
                    {tabChanges == GeneralSettingsTabs.COMPANY_SETTINGS ? (
                      <CompanySettingTab />
                    ) : tabChanges ===
                      GeneralSettingsTabs.PASSWORD_MANAGEMENT ? (
                      <PasswordManagement />
                    ) : tabChanges === GeneralSettingsTabs.STATUS_TYPE ? (
                      <StatusType />
                    ) : null}
                  </div>
                </div>
              </Col>
              <RightSideView />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompanySetting;
