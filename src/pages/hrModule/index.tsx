import React, { useEffect, useState } from 'react';
import PersonCard from '../../components/hr-component/personCard';
import HrPage from '../../components/hr-component/hrPage';
import { PersonalController } from '../../components/hr-component/personalController';
import RightScreen from '../../components/hr-component/rightScreen/index';
import { Col, Row } from 'antd';
import TimeOffRightScreen from '../../components/hr-component/leaveManagement/rightScreen';
import { HR_TAB_NAME } from '../../components/hr-component/constants';
import UpcomingBookingsForHR from '../../components/settings/profile/upcomingBookingsForHR';
import OrgChartRightScreen from '../../components/hr-component/OrgChart/rightScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setOrgChartPersonalTab } from '../../reduxStore/hrSlice';

const HRModule = () => {
  const [isOpened, checkIsOpned] = useState(false);
  const [activeTab, setActiveTab] = useState('Leave');
  const [rightScreen, setRightScreen] = useState(true);
  const [tabName, setTabName] = useState('Leave');
  const dispatch = useDispatch();
  const { isPersonalTab } = useSelector((state: any) => state?.hr);

  useEffect(() => {
    if (isPersonalTab) {
      setActiveTab(HR_TAB_NAME.PERSONAL);
      setTabName('Personal');
      dispatch(setOrgChartPersonalTab(false));
    }
  }, [isPersonalTab]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid pb-0">
        <Row>
          <PersonalController checkIsOpned={checkIsOpned}>
            <Col xl={18} lg={24} span={24} className="main-space-remove">
              <PersonCard />
              <HrPage
                checkIsOpned={checkIsOpned}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setRightScreen={setRightScreen}
                setTabName={setTabName}
                tabName={tabName}
              />
            </Col>

            {isOpened ? (
              <RightScreen checkIsOpned={checkIsOpned} />
            ) : activeTab == HR_TAB_NAME.LEAVE && rightScreen ? (
              <TimeOffRightScreen setRightScreen={setRightScreen} />
            ) : activeTab == HR_TAB_NAME.CHART && rightScreen ? (
              <OrgChartRightScreen
                checkIsOpned={checkIsOpned}
                setActiveTab={setActiveTab}
                setTabName={setTabName}
              />
            ) : (
              <Col
                xl={6}
                lg={24}
                span={24}
                className="d-flex main-space-remove-left"
              >
                <UpcomingBookingsForHR
                  isHrModule
                  location={null}
                  setLoading={() => {}}
                />
              </Col>
            )}
          </PersonalController>
        </Row>
      </div>
    </div>
  );
};

export default HRModule;
