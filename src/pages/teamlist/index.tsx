import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import UserviewProfile from './userviewprofile';
import ProfileImgList from '../../components/profileList/profileImgList';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import WorkFromLocation from '../../components/teamActionComponent/workfromLocation';
import CommonWork from '../../components/teamActionComponent/commonWork';
import TeamManager from '../../components/teamActionComponent/teamManager';
import { FloorProfileImgItemProps } from '../../assets/globals/typeConstants';
import TeamAPIList from '../../components/teamActionComponent/teamAPIList';
import TeamSearchList from '../../components/teamActionComponent/teamSearch';
import {
  findLabelText,
  getUserPreferedDateFormat,
} from '../../components/commonMethod';
import { TeamListLabel } from '../../components/teamListComponent/constants';
import { Card, Col, Row } from 'antd';
type buildingProps = {
  building_name: string;
};
type userTableListDataProps = {
  type: string;
};
type summaryList = {
  user_details: any;
};
const TeamList = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [menu, setMenu] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [globalSearchLocation, setGlobalSearchLocation] = useState('');
  const [teamList, setTeamList] = useState([]);
  const [selectValue, setSelectValue] = useState({});
  const [baseUrl, setBaseUrl] = useState('');
  // setTable data
  const [userTableList, setUserTableList] = useState([]);
  const [userTableListData, setUserTableListData] = useState([]);
  const [userTableListDataCopy, setUserTableListDataCopy] = useState([]);
  // savelist
  const [userTableListDataSave, setUserTableListDataSave] = useState([]);
  // datepicker
  const [startDate, setStartDate] = useState(new Date());
  // next page and passthe data
  const [pageChange, setPageChange] = useState(true);
  const [viewData, setViewData] = useState([]);
  // ResponceSummary
  const [responceSummary, setResponceSummary] = useState<
    null | Array<summaryList> | any
  >(null);
  // filter  out_of_office
  const inOffice = userTableListData?.filter((item: userTableListDataProps) =>
    item?.type === 'in_office' ? item : null,
  );
  // based on buildings filtered
  const buildings = {};
  inOffice.forEach((val: buildingProps) => {
    if (buildings[val.building_name]) {
      buildings[val.building_name].push(val);
    } else {
      buildings[val.building_name] = [val];
    }
  });
  const workingRemotely = userTableListData?.filter(
    (item: userTableListDataProps) =>
      item?.type === 'working_remotely' ? item : null,
  );
  const outOfOffice = userTableListData?.filter(
    (item: userTableListDataProps) =>
      item?.type === 'out_of_office' ? item : null,
  );
  const unknown = userTableListData?.filter((item: userTableListDataProps) =>
    item?.type === 'unknown' ? item : null,
  );
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        setSearchUser('');
        setUserTableListDataCopy([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const handledetailPage = (value: FloorProfileImgItemProps, type = '') => {
    if (type !== '') {
      setViewData({ type: 'viemManager', values: value });
      setSearchUser('');
    } else {
      setViewData({ type: 'user', values: value });
    }
    setSelectValue({});
    setPageChange(!pageChange);
  };
  const profileImageList = [
    {
      type: 'Working_remotely',
      name: 'Working remotely',
      module: 'Team',
      list: responceSummary?.user_details?.working_remotely,
      userData: workingRemotely,
    },
    {
      type: 'Out_of_office',
      name: 'Out of office',
      module: 'Team',
      list: responceSummary?.user_details?.out_of_office,
      userData: outOfOffice,
    },
    {
      type: 'Unknown',
      name: 'Unknown',
      module: 'Team',
      list: responceSummary?.user_details?.unknown,
      userData: unknown,
    },
  ];
  return (
    <>
      {pageChange === true ? (
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
          <>
            <div className="page-wrapper">
              <div className="content container-fluid locate-container">
                <Card className="team-new p-0 mb-0">
                  <Row>
                    <Col
                      xl={18}
                      lg={24}
                      md={24}
                      sm={24}
                      className="space-remove-light"
                    >
                      <div className="work-space-split">
                        <TeamAPIList
                          selectValue={selectValue}
                          startDate={startDate}
                          setUserTableList={setUserTableList}
                          setUserTableListData={setUserTableListData}
                          setUserTableListDataSave={setUserTableListDataSave}
                          setBaseUrl={setBaseUrl}
                          setGlobalSearchLocation={setGlobalSearchLocation}
                          setResponceSummary={setResponceSummary}
                          setPageChange={setPageChange}
                          setTeamList={setTeamList}
                          setSelectValue={setSelectValue}
                          setStartDate={setStartDate}
                          teamList={teamList}
                        />
                        <TeamSearchList
                          startDate={startDate}
                          reference={ref}
                          searchUser={searchUser}
                          userTableListDataCopy={userTableListDataCopy}
                          handledetailPage={handledetailPage}
                          setUserTableListDataCopy={setUserTableListDataCopy}
                          setUserTableListData={setUserTableListData}
                          userTableListDataSave={userTableListDataSave}
                          setSearchUser={setSearchUser}
                        />
                        <WorkFromLocation
                          buildings={buildings}
                          responceSummary={responceSummary}
                          setViewData={setViewData}
                          setPageChange={setPageChange}
                          pageChange={pageChange}
                          setSearchUser={setSearchUser}
                        />
                        {profileImageList?.map((element, index) => (
                          <div key={index}>
                            <CommonWork
                              type={element?.type}
                              name={element?.name}
                              module={'Team'}
                              data={element?.userData}
                              setViewData={setViewData}
                              setPageChange={setPageChange}
                              pageChange={pageChange}
                              setSearchUser={setSearchUser}
                              setSelectValue={setSelectValue}
                            />
                          </div>
                        ))}
                      </div>
                    </Col>
                    <Col className="col-xl-3 col-lg-12 space-remove-left d-flex">
                      <div className="office-team bdr-left">
                        <h4>
                          {findLabelText(
                            TeamListLabel.Summary,
                            TeamListLabel.Summary,
                            TeamListLabel.Team,
                          )}
                        </h4>
                        <p>{getUserPreferedDateFormat(startDate)}</p>
                        <h6>
                          {findLabelText(
                            TeamListLabel.Team_manager,
                            TeamListLabel.TeamManager,
                            TeamListLabel.Team,
                          )}
                        </h6>
                        <TeamManager
                          responceSummary={responceSummary}
                          handledetailPage={handledetailPage}
                          selectValue={selectValue}
                        />
                        {profileImageList?.map((element, index) => (
                          <div className="team-grid" key={index}>
                            <div className="team-members working-remotely">
                              <ProfileImgList
                                type={findLabelText(
                                  element?.type,
                                  element?.name,
                                  element?.module,
                                )}
                                profilelist={element?.list}
                                handledetailPage={handledetailPage}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
          </>
        </div>
      ) : (
        <UserviewProfile
          viewData={viewData}
          userTableList={userTableList}
          setPageChange={setPageChange}
          setSelectValue={val => setSelectValue(val)}
          selectValue={selectValue}
          userSearchId={
            globalSearchLocation?.state?.search_type == 'user'
              ? globalSearchLocation?.state?.search_id
              : null
          }
          searchType={globalSearchLocation?.state?.search_type}
        />
      )}
    </>
  );
};
export default TeamList;
