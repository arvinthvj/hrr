import React, { useContext, useEffect, useState } from 'react';
import {
  permission_10,
  permission_11,
  permission_27,
  permission_28,
  permission_29,
  permission_30,
} from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';

const Job = () => {
  const {
    allPermissionList,
    setAllPermissionList,
    scrollHeight,
    setAllPermissionStatus,
  } = useContext(HRSettingsContext);
  const [workInformationList, updateWorkInformationList] = useState<any[]>([]);
  const [workLocationList, updateWorkLocation] = useState<any[]>([]);
  const [workHistoryList, updateWorkHistoryList] = useState<any[]>([]);
  const [teamsList, updateTeamsList] = useState<any[]>([]);
  const [managerList, updateManagerList] = useState<any[]>([]);
  const [directReport, updateDirectReport] = useState<any[]>([]);
  const [compensationAndBonuses, updateCompensationAndBonuses] = useState<
    any[]
  >([]);

  useEffect(() => {
    const { job } = allPermissionList;
    if (job) {
      job?.workinformation?.length > 0 &&
        updateWorkInformationList(job.workinformation);
      job?.worklocation?.length > 0 && updateWorkLocation(job.worklocation);
      job?.CompensationandBonus?.length > 0 &&
        updateCompensationAndBonuses(job.CompensationandBonus);
      job?.DirectReport?.length > 0 && updateDirectReport(job.DirectReport);
      job?.Managers?.length > 0 && updateManagerList(job.Managers);
      job?.Teams?.length > 0 && updateTeamsList(job.Teams);
      job?.workhistory?.length > 0 && updateWorkHistoryList(job.workhistory);
      setAllPermissionStatus(false);
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      job: {
        workinformation: workInformationList,
        worklocation: workLocationList,
        CompensationandBonus: compensationAndBonuses,
        DirectReport: directReport,
        Managers: managerList,
        Teams: teamsList,
        workhistory: workHistoryList,
      },
    });
  }, [
    workInformationList,
    workLocationList,
    workHistoryList,
    teamsList,
    managerList,
    directReport,
    compensationAndBonuses,
  ]);

  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_10}
          title="Work information"
          list={workInformationList}
          updatePermission={updateWorkInformationList}
        />
        <PermissionSection
          image={permission_11}
          title="Work location"
          list={workLocationList}
          updatePermission={updateWorkLocation}
        />
        <PermissionSection
          image={permission_27}
          title="Work history"
          list={workHistoryList}
          updatePermission={updateWorkHistoryList}
        />
        <PermissionSection
          image={permission_28}
          title="Team(s)"
          list={teamsList}
          updatePermission={updateTeamsList}
        />

        <PermissionSection
          image={permission_29}
          title="Manager(s)"
          list={managerList}
          updatePermission={updateManagerList}
        />
        <PermissionSection
          image={permission_29}
          title="Direct report(s)"
          list={directReport}
          updatePermission={updateDirectReport}
        />
        <PermissionSection
          image={permission_30}
          title="Compensation and bonuses"
          list={compensationAndBonuses}
          updatePermission={updateCompensationAndBonuses}
        />
      </div>
    </div>
  );
};

export default Job;
