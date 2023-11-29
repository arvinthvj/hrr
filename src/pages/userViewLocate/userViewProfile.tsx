import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contact_icon_02, icon_02 } from '../../components/imagepath';
import { postData } from '../../services/apicall';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { ViewProfileDetails } from '../../services/apiurl';
import { findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
} from '../../components/commonMethod';
import { DeskLabelText } from '../../components/locateComponent/constants';

type LanguageProps = {
  language: {
    languages: {
      Team_Management: any;
      Common_Values: any;
      Dashboard: any;
      Location: any;
      Team: any;
      Settings: any;
    };
  };
};
const UserViewProfile = ({ viewData }) => {
  const [profile, setProfile] = useState<any>([]);
  const dispatch = useDispatch();
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const getTeamsData = () => {
    dispatch(showLoader());
    const getResponce = data => {
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
      <div className={`main-wrapper`}>
        <>
          <div className="page-wrapper">
            <div className="content container-fluid">
              <div className="row">
                <div className="col-xl-9 col-lg-9 main-space-remove">
                  <div className="view-profiles card">
                    <div className="return-team">
                      <Link to="/team-list">
                        <img src={icon_02} alt="icon" />
                        {findLabelText(
                          DeskLabelText.Return_to_team,
                          DeskLabelText.ReturntoTeam,
                          DeskLabelText.Team,
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
                                style={'profile'}
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
                                'Team',
                                'Team',
                                DeskLabelText.Team,
                              )}{' '}
                            </h3>
                            {profile?.teams?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="office-views-team"
                                    key={index}
                                  >
                                    <h4>{item.name}</h4>
                                    <Link to="/team-list">
                                      {findLabelText(
                                        DeskLabelText.View_team,
                                        DeskLabelText.Viewteam,
                                        DeskLabelText.Team,
                                      )}
                                    </Link>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="about-view">
                            <h3>
                              {findLabelText(
                                DeskLabelText.About,
                                DeskLabelText.About,
                                DeskLabelText.Team,
                              )}
                            </h3>
                            <p>{profile?.about}</p>
                          </div>
                          <div className="office-teams mb-0">
                            <h3>
                              {findLabelText(
                                DeskLabelText.Location,
                                DeskLabelText.Location,
                                DeskLabelText.Team,
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
                                DeskLabelText.Default_working_hours,
                                DeskLabelText.Defaultworkinghours,
                                DeskLabelText.Team,
                              )}{' '}
                            </h3>
                            <div className="office-views-team view-coloring">
                              <h4>
                                {findLabelText(
                                  DeskLabelText.Start,
                                  DeskLabelText.Start,
                                  DeskLabelText.Team,
                                )}
                              </h4>
                              <input
                                type="text"
                                className="timepicker"
                                defaultValue={getPrefereredTimeToDisplay(
                                  profile?.start_working_hour,
                                )}
                              />
                            </div>
                            <div className="office-views-team view-coloring mb-0">
                              <h4>
                                {findLabelText(
                                  DeskLabelText.End,
                                  DeskLabelText.End,
                                  DeskLabelText.Team,
                                )}
                              </h4>
                              <input
                                type="text"
                                className="timepicker"
                                defaultValue={getPrefereredTimeToDisplay(
                                  profile?.end_working_hour,
                                )}
                              />
                            </div>
                          </div>
                          <div className="office-teams">
                            <h3>
                              {findLabelText(
                                DeskLabelText.Contact,
                                DeskLabelText.Contact,
                                DeskLabelText.Team,
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
                            </div>
                            <div className="office-views-team view-coloring">
                              <h4>
                                {findLabelText(
                                  DeskLabelText.Teams,
                                  DeskLabelText.Teams,
                                  DeskLabelText.Team,
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
                </div>
                <div className="col-xl-3 col-lg-3 d-flex main-space-remove-left">
                  <div className="card empty-space" />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default UserViewProfile;
