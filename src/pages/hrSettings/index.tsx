import React, { useEffect, useState } from 'react';
import HRSettingsTabList from '../../components/hrSettings/hrSettingsTabList';
import { hrSettingsTabListOption } from '../../assets/constants/config';
import HrPermissionSettings from '../../components/hrSettings/hrPermissionSettings';
import HrTimeOffTypes from '../../components/hrSettings/hrTimeOffTypes';
import HrRightScreen from '../../components/hrSettings/timeOffTypes/hrRightScreen';
import { postData } from '../../services/apicall';
import { timeOffProfiles, timeOffTypes } from '../../services/apiurl';
import HrTimeOffProfiles from '../../components/hrSettings/hrTimeOffProfiles';
import HrProfileRightScreen from '../../components/hrSettings/timeOffProfiles/hrRightScreen';

const HRSettings = () => {
  const [selectedHRSettingsTab, updatedTab] = useState(
    hrSettingsTabListOption[2],
  );
  const [isOpened, setIsopened] = useState(false);
  const [type, setType] = useState('');
  const [editData, setEditData] = useState();
  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  const listData = () => {
    postData(timeOffTypes.List, '', data => {
      if (data != 'error') {
        setData(data);
      }
    });
  };
  const listProfileData = () => {
    postData(timeOffProfiles.List, '', data => {
      if (data != 'error') {
        setProfileData(data);
      }
    });
  };

  useEffect(() => {
    listData();
    listProfileData();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="content permission-content container-fluid pb-0">
        <div className="row">
          <div
            className={`main-space-remove ${
              selectedHRSettingsTab.type === 'P'
                ? 'col-lg-12'
                : isOpened
                ? 'col-xl-9 col-lg-12 d-flex'
                : 'col-lg-12'
            }`}
          >
            <div className="card permission-card w-100">
              <div className="permission-tab-info">
                <HRSettingsTabList
                  selectedHRSettingsTab={selectedHRSettingsTab}
                  updatedTab={updatedTab}
                  setIsopened={setIsopened}
                />
                <div className="tab-content" id="myTabContent">
                  {selectedHRSettingsTab.type === 'P' ? (
                    <HrPermissionSettings />
                  ) : selectedHRSettingsTab.type === 'TT' ? (
                    <HrTimeOffTypes
                      setIsopened={setIsopened}
                      setType={setType}
                      setEditData={setEditData}
                      data={data}
                    />
                  ) : selectedHRSettingsTab.type === 'TP' ? (
                    <HrTimeOffProfiles
                      setIsopened={setIsopened}
                      setType={setType}
                      setEditData={setEditData}
                      data={profileData}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {selectedHRSettingsTab.type === 'TT' && isOpened ? (
            <HrRightScreen
              type={type}
              setIsopened={setIsopened}
              listData={listData}
              editData={editData}
            />
          ) : selectedHRSettingsTab.type === 'TP' && isOpened ? (
            <HrProfileRightScreen
              type={type}
              setIsopened={setIsopened}
              listData={listProfileData}
              editData={editData}
              data={data}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HRSettings;
