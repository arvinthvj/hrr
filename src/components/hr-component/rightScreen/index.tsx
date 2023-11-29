import React, { useContext, useEffect, useState } from 'react';
import { PersonalContext } from '../personalController';
import RightScreenHeader from './header';
import EmergencyContact from './contact';
import Education from './education';
import Certifications from './certifications';
import Vaccination from './vaccinations';
import Visa from './visa';
import Clearance from './clearance';
import Identification from './identification';
import HistoryList from './historyList';
import AddWorkHistory from '../jobs/rightScreen/history';
import AddManagers from '../jobs/rightScreen/managers';
import AddReport from '../jobs/rightScreen/report';
import AddCompensation from '../jobs/rightScreen/compensation';
import { Col } from 'antd';
import DefaultParking from './defaultParking';
import { PrefferedConfigurationLabel } from '../preferences/constants';
import DefaultRoom from './defaultRoom';
import DefaultWorkspace from './defaultWorkspace';
import { HR_BENEFIT_SECTION_NAME } from '../benefits/constants';
import { HR_ASSETS_SECTION_NAME } from '../assests/constants';
import Assets from './assets';
import Pension from './pension';
import HealthInsurance from './healthInsurance';
import GeneralBenifit from './generalBenefits';
import Goal from './goal';

const RightScreen = ({ checkIsOpned }) => {
  const { addTitle, editTitle } = useContext(PersonalContext);
  const [selectedTab, updateTab] = useState<'details' | 'history'>('details');

  useEffect(() => {
    updateTab('details');
  }, [addTitle, editTitle]);

  return (
    <Col xl={6} lg={24} span={24} className="d-flex main-space-remove-left">
      <div className="card personal-card flex-fill">
        <RightScreenHeader
          selectedTab={selectedTab}
          checkIsOpned={checkIsOpned}
          changeTab={type => {
            updateTab(type);
          }}
        />
        <div className="card-body personal-card-body">
          <div className="tab-content" id="myTabContentone">
            {selectedTab == 'details' ? (
              <>
                {(addTitle == 'Emergency contact' ||
                  editTitle == 'Emergency contact') && (
                    <EmergencyContact checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Education' || editTitle == 'Education') && (
                  <Education checkIsOpned={checkIsOpned} />
                )}
                {(addTitle == 'Certifications' ||
                  editTitle == 'Certifications') && (
                    <Certifications checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Vaccination status' ||
                  editTitle == 'Vaccination status') && (
                    <Vaccination checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Visa' || editTitle == 'Visa') && (
                  <Visa checkIsOpned={checkIsOpned} />
                )}
                {(addTitle == 'Clearance types' ||
                  editTitle == 'Clearance types') && (
                    <Clearance checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Identification' ||
                  editTitle == 'Identification') && (
                    <Identification checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Work History' ||
                  editTitle == 'Work History') && (
                    <AddWorkHistory checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Assign a manager' ||
                  editTitle == 'Assign a manager') && (
                    <AddManagers checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Direct report(s)' ||
                  editTitle == 'Direct report(s)') && (
                    <AddReport checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == 'Compensation & Bonus(es)' ||
                  editTitle == 'Compensation & Bonus(es)') && (
                    <AddCompensation checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == PrefferedConfigurationLabel.DEFAULT_PARKING ||
                  editTitle == PrefferedConfigurationLabel.DEFAULT_PARKING) && (
                    <DefaultParking checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == PrefferedConfigurationLabel.DEFAULT_ROOM ||
                  editTitle == PrefferedConfigurationLabel.DEFAULT_ROOM) && (
                    <DefaultRoom checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == PrefferedConfigurationLabel.DEFAULT_WORKSPACE ||
                  editTitle ==
                  PrefferedConfigurationLabel.DEFAULT_WORKSPACE) && (
                    <DefaultWorkspace checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS ||
                  editTitle == HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS) && (
                    <GeneralBenifit checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE ||
                  editTitle == HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE) && (
                    <HealthInsurance checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == HR_BENEFIT_SECTION_NAME.PENSION ||
                  editTitle == HR_BENEFIT_SECTION_NAME.PENSION) && (
                    <Pension checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == HR_ASSETS_SECTION_NAME.ASSETS ||
                  editTitle == HR_ASSETS_SECTION_NAME.ASSETS) && (
                    <Assets checkIsOpned={checkIsOpned} />
                  )}
                {(addTitle == "Add a Goal" ||
                  editTitle == "Add a Goal") && (
                    <Goal checkIsOpned={checkIsOpned} />
                  )}
              </>
            ) : (
              <HistoryList />
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RightScreen;
