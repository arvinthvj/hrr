import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'antd';
import OrgChartRightScreenHeader from './orgChartHeader';
import { ORG_CHART_TAB_NAME } from '../constant';
import Directory from './directory';
import HistoryList from './history';
import UnAssignedUser from './unAssignedUser';
import { useSelector } from 'react-redux';
import HrJob from './hrJobs';
import { HR_TAB_NAME } from '../../constants';
import { PersonalContext } from '../../personalController';
import { personalChangeHistoryAPI } from '../../../../services/apiurl';
import { postData } from '../../../../services/apicall';
import Toaster from '../../../toast';
import { ErrorMessage, Errorcode } from '../../../../assets/constants/config';

const OrgChartRightScreen = ({ checkIsOpned, setActiveTab, setTabName }) => {
  const [selectedTab, setSelectedTab] = useState<
    'directory' | 'history' | 'unassign' | ''
  >('directory');
  const [orgTabName, setOrgTabName] = useState(ORG_CHART_TAB_NAME.DIRECTORY);
  const { isHrJobs } = useSelector((state: any) => state?.hr);
  const [orgHistoryList , setOrgHistoryList] = useState([]);
  const { userDetails } = useSelector((state: any) => state.app);
  const { setUserID } = useContext(PersonalContext);



  useEffect(() => {
    if (isHrJobs) {
      setSelectedTab('');
    } else {
      setSelectedTab('directory');
      setOrgTabName(ORG_CHART_TAB_NAME.DIRECTORY);
    }
  }, [isHrJobs]);

  useEffect(() => {
    if (selectedTab == 'history') {
      getOrgHistoryList();
    }
  }, [selectedTab]);

  const getOrgHistoryList = () => {
    const payload = {
      user_id: userDetails?.id,
      type: 'org',
      type_id: 1,
    };
    postData(personalChangeHistoryAPI, payload, (data, res) => {
      if (res?.data?.code == 200) {
        if (data?.length > 0) {
          setOrgHistoryList(data);
        } else {
          setOrgHistoryList([]);
        }
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const redirectUserPersonal = (user: any) => {
    setUserID(user?.id);
    setActiveTab(HR_TAB_NAME.PERSONAL);
    setTabName('Personal');
  };

  return (
    <Col xl={6} lg={24} span={24} className="d-flex main-space-remove-left">
      <div className="card personal-card flex-fill">
        {selectedTab && (
          <OrgChartRightScreenHeader
            selectedTab={selectedTab}
            setTabName={setOrgTabName}
            tabName={orgTabName}
            changeTab={type => {
              setSelectedTab(type);
            }}
          />
        )}
        <div className="card-body personal-card-body">
          <div className="tab-content" id="myTabContentone">
            {selectedTab == 'directory' && (
              <Directory
                selectedTab={selectedTab}
                redirectUserPersonal={redirectUserPersonal}
              />
            )}
            {selectedTab == 'unassign' && (
              <UnAssignedUser
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                redirectUserPersonal={redirectUserPersonal}
              />
            )}
            {selectedTab == 'history' && <HistoryList historyData={orgHistoryList}/>}
            {isHrJobs && (
              <HrJob
                checkIsOpned={checkIsOpned}
                setSelectedTab={setSelectedTab}
                redirectUserPersonal={redirectUserPersonal}
              />
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default OrgChartRightScreen;
