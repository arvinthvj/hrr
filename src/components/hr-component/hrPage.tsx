import React from 'react';
import HrTab from './hrTab';
import HrPersonal from './personal';
import HrJobs from './jobs';
import { Card } from 'antd';
import LeaveManagment from './leaveManagement';
import PreferenceManagement from './preferences';
import { HR_TAB_NAME } from './constants';
import HrBenefits from './benefits';
import HrAssets from './assests';
import OrgChart from './OrgChart';
import PerformanceManagement from './performance';

const HrPage = ({
  checkIsOpned,
  activeTab,
  setActiveTab,
  setRightScreen,
  setTabName,
  tabName,
}) => {
  return (
    <Card className="manager-details-card">
      <div className="manager-tab-info">
        <HrTab
          setActiveTab={setActiveTab}
          checkIsOpned={checkIsOpned}
          setTabName={setTabName}
          tabName={tabName}
        />
        {activeTab === HR_TAB_NAME.LEAVE && (
          <LeaveManagment setRightScreen={setRightScreen} />
        )}
        {activeTab === HR_TAB_NAME.CHART && <OrgChart />}
        {activeTab === HR_TAB_NAME.PERSONAL && <HrPersonal />}
        {activeTab === HR_TAB_NAME.JOB && <HrJobs />}
        {activeTab === HR_TAB_NAME.PREFERENCES && <PreferenceManagement />}
        {activeTab === HR_TAB_NAME.ASSETS && <HrAssets />}
        {activeTab === HR_TAB_NAME.BENEFITS && <HrBenefits />}
        {activeTab === HR_TAB_NAME.PERFORMANCE && <PerformanceManagement />}
      </div>
    </Card>
  );
};

export default HrPage;
