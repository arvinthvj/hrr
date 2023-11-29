import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  GetTeamSummaryDetails,
  TeamBuildingLocationList,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import ProfileImgList from '../../components/profileList/profileImgList';
import FloorProfileImgList from '../../components/profileList/floorProfileList';
import Loader from '../../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import DropDownSelection from '../../components/selectfield/dropDownSelection';
import {
  setChangeScheduleinDashboard,
  setDashboardDayList,
  setDashboardselctedTeam,
  setDeleteAssetinDashboard,
} from '../../reduxStore/dashboardSlice';
import { Link } from 'react-router-dom';
import { in_office, out_office, remote_home } from '../../components/imagepath';
import {
  FloorProfileImgItemProps,
  ResponseSummaryProps,
  Team,
  YourTeamDetailsProps,
} from '../../assets/globals/typeConstants';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import AntdSelect from '../../components/selectfield/antdSelect';
import { LabelText } from '../../components/dashboardComponent/constants';
import {
  findLabelText,
  getUserPreferedDateFormat,
} from '../../components/commonMethod';
import { Card, Col } from 'antd';
type SelectValueProps = {
  label: string;
  value: number | null;
};
const dummyValue = {
  label: '',
  value: null,
};
const YourTeamDetails: React.FC<YourTeamDetailsProps> = ({
  setUserTableList,
  setViewData,
  setPageChange,
  pageChange,
}) => {
  const {
    dashboardselctedTeam,
    dashboardDayList,
    changeScheduleinDashboard,
    dashboardListUpdate,
    deleteAssetinDashboard,
  } = useSelector((state: RootReduxProps) => state.dashboard);
  const dispatch = useDispatch();
  const [responceSummary, setResponceSummary] =
    useState<ResponseSummaryProps | null>(null);
  const [teamList, setTeamList] = useState<
    Array<SelectValueProps> | null | Array<Team>
  >(null);
  const [selectValue, setSelectValue] = useState<SelectValueProps>(dummyValue);
  const [loadind, setLoadind] = useState(false);
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const handledetailPage = (value: FloorProfileImgItemProps, type = '') => {
    if (type !== '') {
      setViewData({ type: 'viemManager', values: value });
    } else {
      setViewData({ type: 'user', values: value });
    }
    setPageChange(!pageChange);
  };
  const getResponce = (data, res) => {
    if (res?.data?.code == 200) {
      const list = selectOgj(data);
      setTeamList(list);
      if (list.length > 0) {
        var data = list?.filter(ele => {
          return ele?.value == dashboardselctedTeam?.value;
        });
        setSelectValue(data?.length > 0 ? data?.[0] : list?.[0]);
      }
    }
  };
  const getTeamList = () => {
    postData(TeamBuildingLocationList, '', getResponce);
  };
  useEffect(() => {
    getTeamList(); //
  }, []);
  const getResponceSummary = data => {
    setLoadind(false);
    setResponceSummary(data);
    setUserTableList(data);
    dispatch(setChangeScheduleinDashboard(false));
    dispatch(setDeleteAssetinDashboard(false));
  };
  const getSummaryList = () => {
    dispatch(setDashboardDayList({ ...dashboardDayList }));
    if (selectValue.value) {
      setLoadind(true);
      postData(
        GetTeamSummaryDetails,
        { team_id: selectValue.value, location_id: userDetails?.location_id },
        getResponceSummary,
      );
    }
  };
  useEffect(() => {
    if (selectValue?.value !== undefined) {
      getSummaryList();
    }
  }, [selectValue]);
  useEffect(() => {
    changeScheduleinDashboard && getSummaryList();
    dashboardListUpdate && getSummaryList();
    deleteAssetinDashboard && getSummaryList();
  }, [changeScheduleinDashboard, dashboardListUpdate, deleteAssetinDashboard]);
  const selectOgj = items =>
    items?.map(item => {
      return { value: item.id, label: item.name };
    });
  return (
    <>
      <Col className="col-xl-3 col-lg-12 main-space-remove-left">
        <div className="quick-book-card">
          <div className="card office-team">
            <h4>
              {findLabelText(
                LabelText.Your_team_today,
                LabelText.YourTeamToday,
                LabelText.dashboard,
              )}
            </h4>
            <p>{getUserPreferedDateFormat(new Date())}</p>
            <div className="team-views">
              <div className="locate-select locate-select-inner pt-0">
                <DropDownSelection
                  options={teamList}
                  height={'40px'}
                  onChange={value => {
                    setSelectValue(value);
                    dispatch(setDashboardselctedTeam(value));
                  }}
                  placeholder={selectValue?.label}
                />
                {/* <AntdSelect
                  list={teamList}
                  label={selectValue?.label}
                  setValue={(value) => {
                    let obj = teamList?.find((o) => o.value == value);
                    setSelectValue(obj);
                    dispatch(setDashboardselctedTeam(obj));
                  }}
                /> */}
              </div>
            </div>
            {selectValue?.value ? (
              <>
                <div className="detail-views detail-views-inner">
                  <Link to="/team-list">
                    <div className="view_detail">Go to Team</div>
                  </Link>
                </div>
                <div className="office-details">
                  <div className="office-inner-info">
                    <p>
                      {findLabelText(
                        LabelText.In_office,
                        LabelText.InOffice,
                        LabelText.dashboard,
                      )}
                    </p>
                    <div className="office-box">
                      <img src={in_office} alt="icon" />
                      <span>
                        {responceSummary?.user_details
                          ? responceSummary?.user_details?.in_office_count
                          : '0'}
                      </span>
                    </div>
                  </div>
                  <div className="office-inner-info">
                    <p>
                      {findLabelText(
                        LabelText.remote,
                        LabelText.remote,
                        LabelText.dashboard,
                      )}
                    </p>
                    <div className="office-box">
                      <img src={remote_home} alt="icon" />
                      <span>
                        {responceSummary?.user_details
                          ? responceSummary?.user_details?.working_remotely
                              ?.length
                          : '0'}
                      </span>
                    </div>
                  </div>
                  <div className="office-inner-info">
                    <p>
                      {findLabelText(
                        LabelText.Out_of_office,
                        LabelText.Outofoffice,
                        LabelText.dashboard,
                      )}
                    </p>
                    <div className="office-box">
                      <img src={out_office} alt="icon" />
                      <span>
                        {' '}
                        {responceSummary?.user_details
                          ? responceSummary?.user_details?.out_of_office?.length
                          : '0'}
                      </span>
                    </div>
                  </div>
                </div>
                {responceSummary?.user_details?.floors?.length == 0 ? (
                  <div className="work-head">
                    <h5>
                      {findLabelText(
                        LabelText.Working_from,
                        LabelText.WorkingFrom,
                        LabelText.dashboard,
                      )}{' '}
                      {responceSummary?.location_details?.building_name}
                    </h5>
                    <span>
                      {responceSummary?.location_details?.street_name}
                    </span>
                  </div>
                ) : null}
                <div className="team-remote-grp">
                  <div className="remote-team"></div>
                </div>
                <div className="team-grid team-box">
                  {loadind == true ? (
                    <Loader />
                  ) : (
                    <div className="team-members working-remotely">
                      <ul>
                        {responceSummary?.user_details?.floors &&
                        Object.keys(responceSummary?.user_details?.floors)
                          ?.length > 0 ? (
                          Object.keys(
                            responceSummary?.user_details?.floors,
                          ).map((buildName, index) => {
                            return (
                              <React.Fragment key={index}>
                                <div className="work-head work-head-bg">
                                  <h5>
                                    {findLabelText(
                                      LabelText.Working_from,
                                      LabelText.WorkingFrom,
                                      LabelText.dashboard,
                                    )}{' '}
                                    {buildName}
                                  </h5>
                                </div>
                                {responceSummary?.user_details?.floors &&
                                  Object?.keys(
                                    responceSummary?.user_details?.floors?.[
                                      buildName
                                    ],
                                  ).map((floor, index) => {
                                    const floorPersonList =
                                      responceSummary?.user_details?.floors[
                                        buildName
                                      ]?.[floor];
                                    return (
                                      <React.Fragment key={index}>
                                        <FloorProfileImgList
                                          baseUrl={responceSummary.base_url}
                                          key={index}
                                          type={floor}
                                          profilelist={floorPersonList}
                                          handledetailPage={handledetailPage}
                                          locatelabel={selectValue?.value}
                                        />
                                      </React.Fragment>
                                    );
                                  })}
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <div className="working-no-records text-center">
                            {findLabelText(
                              LabelText.No_records,
                              LabelText.NoRecords,
                              LabelText.Common_Values,
                            )}{' '}
                          </div>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="team-grid">
                  <div className="team-members working-remotely">
                    <ProfileImgList
                      type={findLabelText(
                        LabelText.Working_remotely,
                        LabelText.WorkingRemotely,
                        LabelText.dashboard,
                      )}
                      profilelist={
                        responceSummary?.user_details?.working_remotely
                      }
                      handledetailPage={handledetailPage}
                    />
                  </div>
                </div>
                <div className="team-grid">
                  <ProfileImgList
                    type={findLabelText(
                      LabelText.Out_of_office,
                      LabelText.Outofoffice,
                      LabelText.dashboard,
                    )}
                    profilelist={responceSummary?.user_details?.out_of_office}
                    handledetailPage={handledetailPage}
                  />
                </div>
                <div className="team-grid">
                  <ProfileImgList
                    type={findLabelText(
                      LabelText.Unknown,
                      LabelText.Unknown,
                      LabelText.dashboard,
                    )}
                    profilelist={responceSummary?.user_details?.unknown}
                    handledetailPage={handledetailPage}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Col>
    </>
  );
};
export default YourTeamDetails;
