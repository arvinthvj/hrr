import React, { useContext, useEffect, useState } from 'react';
import HrJobReporter from './hrReporter';
import HrJobManager from './hrManager';
import HrManagerHeader from './hrManagerHeader';
import { useSelector } from 'react-redux';
import OrgFooter from './orgFooter';
import { PersonalContext } from '../../personalController';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import { postData } from '../../../../services/apicall';
import {
  allUserList,
  orgChartView,
  updateOgChart,
} from '../../../../services/apiurl';
import {
  setHrJObs,
  setSearchValueOrgChart,
  setUpdateOrgChart,
  setUserAssigneeData,
  setInitialFunction
} from '../../../../reduxStore/hrSlice';
import Toaster from '../../../toast';

const HrJob = ({ checkIsOpned, setSelectedTab, redirectUserPersonal }) => {
  const { userAssigneeData } = useSelector((state: any) => state?.hr);
  const [allUsersList, setAllUsersList] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const [userManager, setManager] = useState([]);
  const { selectedNodes } = useContext(PersonalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserReports(userAssigneeData?.direct_reports);
    setManager(userAssigneeData?.manager);
    getAllUserData();
  }, [userAssigneeData]);

  const getOrgChartViewData = (id: number) => {
    const payload = {
      user_id: id,
    };
    dispatch(showLoader());
    postData(orgChartView, payload, (data, res) => {
      dispatch(hideLoader());
      dispatch(setHrJObs(true));
      if (res?.data?.code == 200) {
        setIsSave(false);
        dispatch(setUserAssigneeData(data));
        dispatch(setSearchValueOrgChart(''));
        dispatch(setUpdateOrgChart(true));
      }
    });
  };

  const getAllUserData = () => {
    dispatch(showLoader());
    postData(allUserList, {}, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        setAllUsersList(data);
      }
    });
  };

  const updateUserReportees = () => {
    const payload = {
      user_id: selectedNodes?.id,
      manager_id: userManager?.[0]?.id || 0,
      direct_reports: userReports,
    };
    dispatch(showLoader());
    postData(updateOgChart, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.code == 422) {
        Toaster(res?.code, res?.message);
      }
      if (res?.data?.code == 200) {
        dispatch(setInitialFunction(true));
        setIsSave(false);
        getOrgChartViewData(selectedNodes?.id);
        setUserReports([]);
        setManager([]);
      }
    });
  };

  const resetAllData = () => {
    setIsSave(false);
    setSelectedTab('directory');
    dispatch(setHrJObs(false));
    // setInitialFunction(false);
  };

  return (
    <>
      <HrManagerHeader
        checkIsOpned={checkIsOpned}
        setSelectedTab={setSelectedTab}
      />
      <HrJobManager
        userManagerData={userManager}
        allUsersList={allUsersList}
        setSelectedTab={setSelectedTab}
        setIsSave={setIsSave}
        setManager={setManager}
        redirectUserPersonal={redirectUserPersonal}
      />
      <HrJobReporter
        userReporterData={userReports}
        allUsersList={allUsersList}
        setIsSave={setIsSave}
        setUserReports={setUserReports}
        redirectUserPersonal={redirectUserPersonal}
      />
      <OrgFooter
        isSave={isSave}
        resetAllData={resetAllData}
        updateUserReportees={updateUserReportees}
      />
    </>
  );
};

export default HrJob;
