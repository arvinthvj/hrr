import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { status_icon } from '../../components/imagepath';
import Toaster from '../../components/toast';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import { WorkspaceList, workscheduleupdate } from '../../services/apiurl';
import { SetQuickBookSelect } from '../../reduxStore/quickBookSlice';
import { SettingsHeader } from '../../components/companySettings/otherComponents';
import NonWorkSpaceTypes from '../../components/companySettings/nonWorkSpaceTypes';
import {
  GeneralSettingsLabels,
  NonWorkingStatusTypes,
  WorkingStatusTypes,
} from '../../components/companySettings/constant';

const StatusType = ({}) => {
  const [outOfOffice, setOutOfOffice] = useState({});
  const [outOfOfficeStatus, setOutOfOfficeStatus] = useState(true);
  const [statusVacation, setStatusVacation] = useState(false);
  const [Sick, setSick] = useState('');
  const [Other, setOther] = useState('');
  const [vacation, setVaction] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(showLoader());
    postData(WorkspaceList, '', sucessCallBack);
  };

  const sucessCallBack = (data, res) => {
    dispatch(hideLoader());
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.name == NonWorkingStatusTypes.sick) {
        setSick(data[i]?.id);
      } else if (data[i]?.name == NonWorkingStatusTypes.outOfOffice) {
        setOutOfOffice(data[i]?.id);
        setOutOfOfficeStatus(data[i]?.status == 1 ? true : false);
      } else if (data[i]?.name == NonWorkingStatusTypes.vacation) {
        setVaction(data[i]?.id);
        setStatusVacation(data[i]?.status == 1 ? true : false);
      } else if (data[i]?.name == NonWorkingStatusTypes.other) {
        setOther(data[i]?.id);
      }
    }
  };
  const statusTypes = () => {
    dispatch(showLoader());
    const payload = {
      otherId: Sick + ',' + Other + ',' + vacation,
      otherStatus: statusVacation ? 1 : 0,
      outOfidficeId: outOfOffice,
      outOfficeStatus: outOfOfficeStatus ? 1 : 0,
    };
    postData(workscheduleupdate, payload, (data, res) => {
      dispatch(hideLoader());
      dispatch(SetQuickBookSelect(1));
      Toaster(res?.data?.code, res?.data?.message);
    });
  };

  const statusTypeDescription = () => {
    return (
      <div className="company-details">
        <h6>{GeneralSettingsLabels.statusTypeDesc} </h6>
      </div>
    );
  };
  const workStatusType = () => {
    return (
      <div className="form-settings">
        <h4> {GeneralSettingsLabels.workingStatusType}</h4>
        <div className="settings-group">
          <h5>{WorkingStatusTypes.inOffice}</h5>
        </div>
        <div className="settings-group mb-0">
          <h5>{WorkingStatusTypes.remote}</h5>
        </div>
        <span>{GeneralSettingsLabels.cannotChange}</span>
      </div>
    );
  };

  return (
    <>
      <div className="card-body">
        <div className="settings-path settings-path-info">
          <div className="allow-book p-0">
            <div id="show-me1">
              <SettingsHeader
                image={status_icon}
                lable="Status types"
                callBack={() => statusTypes()}
              />
              {statusTypeDescription()}
              <div className="company-form-settings">
                {workStatusType()}
                <NonWorkSpaceTypes
                  outOfOfficeStatus={outOfOfficeStatus}
                  setOutOfOfficeStatus={setOutOfOfficeStatus}
                  setStatusVacation={setStatusVacation}
                  statusVacation={statusVacation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusType;
