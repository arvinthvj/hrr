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
import { number } from 'yup/lib/locale';
import { findFirstName } from '../../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import { TeamListLabel } from '../../../components/teamListComponent/constants';
import { Row } from 'antd';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
} from '../../../components/commonMethod';
import ViewHrProfile from '../../../components/commonComponnets/viewHrProfile';

const UserviewProfile = ({
  viewData,
  setPageChange,
  setSelectValue,
  userTableList,
  selectValue,
  userSearchId,
  searchType,
}) => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState([]);
  const [userId, setUserId] = useState(userSearchId ? userSearchId : '');
  const { loading } = useSelector(state => state?.app);
  const dispatch = useDispatch();
  const { languages } = useSelector(state => state?.language);
  const getTeamsData = () => {
    dispatch(showLoader());
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      setProfile(data);
    };
    if (viewData?.type == 'viemManager') {
      postData(
        ViewProfileDetails,
        { user_id: viewData?.values ? viewData?.values : '' },
        getResponce,
      );
    } else {
      postData(
        ViewProfileDetails,
        { user_id: viewData?.values?.user_id ? viewData?.values?.user_id : '' },
        getResponce,
      );
    }
  };
  const getTeamsDatalocal = () => {
    dispatch(showLoader());
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      setProfile(data);
    };

    postData(ViewProfileDetails, { user_id: userId }, getResponce);
  };
  useEffect(() => {
    if (userId == '' && userId != number) {
      getTeamsData();
    } else {
      getTeamsDatalocal();
    }
  }, [viewData, userId]);
  useEffect(() => {
    userSearchId && setUserId(userSearchId);
  }, [userSearchId]);

  const viewUser = record => {
    setUserId(record?.user_id);
  };
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <>
          <div
            className="page-wrapper"
            style={{ display: loading == true ? 'none' : null }}
          >
            <div className="content container-fluid">
              <Row>
                <div className="col-xl-9 col-lg-9 main-space-remove">
                  <div className="view-profiles card">
                    <div className="return-team">
                      <Link to="#" onClick={() => setPageChange(true)}>
                        <img src={icon_02} alt="icon" />
                        {findLabelText(
                          TeamListLabel.Return_to_team,
                          TeamListLabel.Returntoteam,
                          TeamListLabel.Team,
                        )}
                      </Link>
                    </div>
                    <div className="profile-img-group">
                      <div className="big-view-img">
                        <Link to="#">
                          {profile?.profile_photo == undefined ||
                          profile?.profile_photo?.trim() == '' ? (
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
                                      imageFile={icon?.health_safety_icons}
                                      type={'image'}
                                      FilePath={'ghs'}
                                    />
                                    {icon?.name}
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

                        {<ViewHrProfile profile={profile} />}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-5 col-lg-6">
                        <div className="profile-about-grp">
                          <div className="office-teams">
                            <h3>
                              {findLabelText(
                                TeamListLabel.Team,
                                TeamListLabel.Team,
                                TeamListLabel.Team,
                              )}
                            </h3>
                            {profile?.teams && profile?.teams?.length > 0 ? (
                              profile?.teams?.map((item, index) => {
                                return (
                                  <div
                                    className="office-views-team"
                                    key={index}
                                  >
                                    <h4>{item?.name}</h4>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setPageChange(true);
                                        setSelectValue({
                                          value: item?.id,
                                          label: item?.name,
                                        });
                                      }}
                                    >
                                      {findLabelText(
                                        TeamListLabel.View_team,
                                        TeamListLabel.Viewteam,
                                        TeamListLabel.Team,
                                      )}
                                    </Link>
                                  </div>
                                );
                              })
                            ) : (
                              <p style={{ color: 'gray' }}>
                                {'No teams available'}
                              </p>
                            )}
                          </div>
                          <div className="about-view">
                            <h3>
                              {' '}
                              {findLabelText(
                                TeamListLabel.About,
                                TeamListLabel.About,
                                TeamListLabel.Team,
                              )}
                            </h3>
                            <textarea
                              style={{ backgroundColor: 'white' }}
                              className="form-control text-about"
                              row={3}
                              disabled
                              defaultValue={profile?.about || ''}
                            />
                          </div>
                          <div className="office-teams mb-0">
                            <h3>
                              {findLabelText(
                                TeamListLabel.Location,
                                TeamListLabel.Location,
                                TeamListLabel.Team,
                              )}
                            </h3>
                            <div className="office-views-team input-place-grp">
                              <input
                                type="text"
                                name="place"
                                className="input-filter value-input"
                                readOnly
                              />
                              <span className="place-input">
                                {profile?.location_id?.map(val => val?.name)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-2 d-xl-block d-lg-none" />
                      <div className="col-xl-5 col-lg-6">
                        <div className="profile-about-grp">
                          <div className="office-teams work-hour-collor">
                            <h3>
                              {findLabelText(
                                TeamListLabel.Default_working_hours,
                                TeamListLabel.Defaultworkinghours,
                                TeamListLabel.Team,
                              )}{' '}
                            </h3>
                            <div className="office-views-team view-coloring">
                              <h4>
                                {findLabelText(
                                  TeamListLabel.Start,
                                  TeamListLabel.Start,
                                  TeamListLabel.Team,
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
                                  TeamListLabel.End,
                                  TeamListLabel.End,
                                  TeamListLabel.Team,
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
                                TeamListLabel.Contact,
                                TeamListLabel.Contact,
                                TeamListLabel.Team,
                              )}
                            </h3>
                            <div className="office-views-team office-views-email">
                              <h4>
                                {languages?.Settings?.Company_email?.name
                                  ? languages?.Settings?.Company_email?.name
                                  : 'Company email'}
                              </h4>
                              <Link
                                to={`${'mailto:'}${profile?.company_email}`}
                              >
                                {profile?.company_email}
                                <img src={contact_icon_01} alt="icon" />
                              </Link>
                            </div>
                            <div className="office-views-team office-views-email">
                              <h4>
                                {languages?.Settings?.Company_phone?.name
                                  ? languages?.Settings?.Company_phone?.name
                                  : 'Company phone'}
                              </h4>
                              <a>
                                <input
                                  type="text"
                                  value={profile?.company_phone || ''}
                                  disabled
                                />
                              </a>
                            </div>
                            <div className="office-views-team office-views-email">
                              <h4>
                                {languages?.Settings?.Phone?.name
                                  ? languages?.Settings?.Phone?.name
                                  : 'Phone'}
                              </h4>
                              <a>
                                <input
                                  type="text"
                                  value={profile?.phone || ''}
                                  disabled
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 d-flex main-space-remove-left">
                  <div className="card empty-space" />
                </div>
              </Row>

              {searchType != 'user' && (
                <Row>
                  <div className="col-lg-12 main-space-remove">
                    <div className="card profile-list-out mb-0">
                      <div className="list-out-profile list-out-profile-inner">
                        <h3>{selectValue?.label}</h3>
                        <ul className="list-out-profile-scroll">
                          {userTableList?.user_details?.map((record, index) => {
                            return (
                              <li key={index} onClick={() => viewUser(record)}>
                                <div className="list-proile-img">
                                  <div
                                    className={`${
                                      record.status == 'Checked in'
                                        ? 'active-profile'
                                        : 'unactive-profile'
                                    }`}
                                  >
                                    <span />
                                  </div>
                                  <Link to="#">
                                    {record?.profile_photo == undefined ||
                                    record?.profile_photo == '' ? (
                                      <p className="active-profile-text">
                                        <span>
                                          {findFirstName(record?.full_name)}
                                        </span>
                                      </p>
                                    ) : (
                                      <GetImgaeFromS3Bucket
                                        imageFile={record?.profile_photo}
                                        type={'image'}
                                        userDetail={record}
                                        name={findFirstName(record?.full_name)}
                                        style={'teamprofile'}
                                      />
                                    )}
                                  </Link>
                                </div>
                                <div className="profile-title profile-inner-title">
                                  <h5>
                                    <Link to="#">
                                      {record?.first_name.slice(0, 12)}
                                    </Link>
                                  </h5>
                                  <div className="icon-profile-lists">
                                    {record?.health_safety.length > 0
                                      ? record?.health_safety
                                          ?.slice(0, 3)
                                          ?.map((icon, index) => {
                                            return (
                                              <>
                                                <Link to="#" key={index}>
                                                  <GetImgaeFromS3Bucket
                                                    imageFile={
                                                      icon?.health_safety_icons
                                                    }
                                                    type={'image'}
                                                    FilePath={'ghs'}
                                                  />
                                                </Link>
                                              </>
                                            );
                                          })
                                      : null}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Row>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default UserviewProfile;
