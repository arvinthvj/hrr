import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  contact_icon_01,
  contact_icon_02,
  contact_icon_03,
  icon_02,
} from '../../../components/imagepath';
import { postData } from '../../../services/apicall';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { ViewProfileDetails } from '../../../services/apiurl';
import { findFirstName } from '../../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import { teamList } from '../../../assets/constants/pageurl';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import { UserProfileList } from '../../../components/dashboardComponent/constants';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
} from '../../../components/commonMethod';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
const UserviewProfile = ({ viewData, setPageChange }) => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState<any>([]);
  const dispatch = useDispatch();
  const { languages } = useSelector((state: RootReduxProps) => state.language);
  const getTeamsData = () => {
    dispatch(showLoader());
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      setProfile(data);
    };
    if (viewData?.type == 'viemManager') {
      postData(ViewProfileDetails, { user_id: viewData?.values }, getResponce);
    } else {
      postData(
        ViewProfileDetails,
        { user_id: viewData?.values?.user_id },
        getResponce,
      );
    }
  };
  useEffect(() => {
    getTeamsData();
  }, [viewData]);
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <>
          <div className="page-wrapper">
            <Content className="content">
              <Row>
                <Col span={18} className="main-space-remove">
                  <div className="view-profiles card">
                    <div className="return-team">
                      <Link to="#" onClick={() => setPageChange(true)}>
                        <img src={icon_02} alt="icon" />
                        {findLabelText(
                          UserProfileList.return_to_team,
                          UserProfileList.return,
                          UserProfileList.team,
                        )}
                      </Link>
                    </div>
                    <div className="profile-img-group">
                      <div className="big-view-img">
                        <Link to="#">
                          {profile?.profile_photo == undefined ||
                          profile?.profile_photo == '' ? (
                            <p className="team-member-text">
                              <span>{findFirstName(profile?.full_name)}</span>
                            </p>
                          ) : (
                            <>
                              <GetImgaeFromS3Bucket
                                imageFile={profile?.profile_photo}
                                type={'image'}
                                userDetail={profile}
                                name={findFirstName(profile?.full_name)}
                                style={'dashboardprofile'}
                              />
                            </>
                          )}
                        </Link>
                      </div>
                      <div className="profiles-names">
                        <h4>
                          <Link to="#">{profile?.full_name}</Link>{' '}
                          {profile?.health_safety?.length > 0
                            ? profile?.health_safety.map((icon, index) => {
                                return (
                                  <span key={index}>
                                    <GetImgaeFromS3Bucket
                                      imageFile={icon.health_safety_icons}
                                      type={'image'}
                                      FilePath={'ghs'}
                                    />
                                    {icon.name}
                                  </span>
                                );
                              })
                            : null}
                        </h4>
                        {viewData?.values?.status !== undefined ? (
                          <div
                            className={`${
                              viewData?.values?.status == 'Checked in'
                                ? 'check-in-active'
                                : 'check-in-unactive'
                            }`}
                          >
                            <span />
                            <h5>{viewData?.values?.status}</h5>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-5 col-lg-6">
                        <div className="profile-about-grp">
                          <div className="office-teams">
                            <h3>
                              {findLabelText(
                                UserProfileList.team,
                                UserProfileList.team,
                                UserProfileList.team,
                              )}
                            </h3>
                            {profile?.teams?.map((item, index) => {
                              return (
                                  <div
                                    className="office-views-team"
                                    key={index}
                                  >
                                    <h4>{item?.name}</h4>
                                    <Link
                                      to={teamList}
                                      state={{
                                        search_id: item?.id,
                                        search_name: item?.name,
                                        search_type: 'team',
                                      }}
                                    >
                                      {findLabelText(
                                        UserProfileList.view_team,
                                        UserProfileList.viewTeam,
                                        UserProfileList.team,
                                      )}
                                    </Link>
                                  </div>
                              );
                            })}
                          </div>
                          <div className="about-view">
                            <h3>
                              {findLabelText(
                                UserProfileList.about,
                                UserProfileList.about,
                                UserProfileList.team,
                              )}
                            </h3>
                            <p>{profile?.about}</p>
                          </div>
                          <div className="office-teams mb-0">
                            <h3>
                              {findLabelText(
                                UserProfileList.location,
                                UserProfileList.location,
                                UserProfileList.team,
                              )}{' '}
                            </h3>
                            <div className="office-views-team input-place-grp">
                              <input
                                type="text"
                                name="place"
                                className="input-filter value-input"
                                readOnly
                              />
                              <span className="place-input">
                                {profile?.location_id?.map(val => val.name)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-2 d-xl-block d-lg-none" />
                      <div className="col-xl-5 col-lg-6">
                        <div className="profile-about-grp">
                          <div className="office-teams">
                            <h3>
                              {findLabelText(
                                UserProfileList.default_working_hours,
                                UserProfileList.defaultWorkingHours,
                                UserProfileList.team,
                              )}{' '}
                            </h3>
                            <div className="office-views-team view-coloring">
                              <h4>
                                {findLabelText(
                                  UserProfileList.start,
                                  UserProfileList.start,
                                  UserProfileList.team,
                                )}
                              </h4>
                              <span className="timepicker time-color">
                                {getPrefereredTimeToDisplay(
                                  profile?.start_working_hour,
                                )}
                              </span>
                            </div>
                            <div className="office-views-team view-coloring mb-0">
                              <h4>
                                {findLabelText(
                                  UserProfileList.end,
                                  UserProfileList.end,
                                  UserProfileList.team,
                                )}
                              </h4>
                              <span className="timepicker time-color">
                                {getPrefereredTimeToDisplay(
                                  profile?.end_working_hour,
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="office-teams">
                            <h3>
                              {findLabelText(
                                UserProfileList.contact,
                                UserProfileList.contact,
                                UserProfileList.team,
                              )}
                            </h3>
                            <div className="office-views-team office-views-email">
                              <h4>
                                {languages?.Settings
                                  ? languages?.Settings?.Email?.name
                                  : 'Email'}
                              </h4>
                              <a href={`${'mailto:'}${profile?.email}`}>
                                <input
                                  type="text"
                                  value={profile?.email || ''}
                                  disabled
                                />
                              </a>
                              <Link to="#">
                                <img src={contact_icon_01} alt="icon" />
                              </Link>
                            </div>
                            <div className="office-views-team view-coloring">
                              <h4>
                                {findLabelText(
                                  UserProfileList.teams,
                                  UserProfileList.teams,
                                  UserProfileList.team,
                                )}
                              </h4>
                              <Link to="#">
                                <img src={contact_icon_02} alt="icon" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={6} className="d-flex main-space-remove-left">
                  <div className="card empty-space" />
                </Col>
              </Row>
            </Content>
          </div>
        </>
      </div>
    </>
  );
};

export default UserviewProfile;
