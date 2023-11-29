import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TimeRightIcon,
  TimeleftIcon,
  dropdown_angle,
  locations,
} from '../../components/imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
} from '../../components/commonMethod';
import {
  LocateLabelText,
  TeamTypes,
} from '../../components/locateComponent/constants';

const TeamBookingDetails = ({
  locateTeamDropdownDetail,
  teamBookingList,
  setViewUser,
  setSearchDetails,
  getTeamBookingDetails,
}) => {
  const [floorplanColapse, setFloorplanColapse] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>({});
  const [teamBookedList, setTeamBookedList] = useState([]);
  const [teamCheckedinList, setTeamCheckedinList] = useState([]);

  const sortByName = (a, b) => {
    const nameA = a?.display_name?.toUpperCase();
    const nameB = b?.display_name?.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  const updateBookingList = () => {
    if (teamBookingList?.length > 0 && selectedTeam) {
      const checkData =
        selectedTeam?.team_type == TeamTypes.primary ||
        selectedTeam?.team_type == TeamTypes.secondary ||
        selectedTeam?.team_type == TeamTypes.other
          ? TeamTypes.teams
          : TeamTypes.emergencyResponders;
      const bookingList = teamBookingList?.filter(book => {
        if (book[checkData] && book[checkData]?.length > 0) {
          const checkId = book[checkData]?.find(i => i?.id == selectedTeam?.id);
          if (checkId != undefined && checkId != null) {
            return book;
          }
        }
      });
      if (bookingList?.length > 0) {
        const bookedList = bookingList?.filter(
          i => i?.booking_status == 'false',
        ); // if booking_status is "false" it is under booked
        const bookedListWithRoles = bookedList
          ?.filter(i => i?.health_safety?.length > 0)
          ?.sort(sortByName);
        const bookedListWithoutRolesSorted = bookedList
          ?.filter(i => i?.health_safety?.length == 0)
          ?.sort(sortByName);
        setTeamBookedList([
          ...bookedListWithRoles,
          ...bookedListWithoutRolesSorted,
        ]);
        const checkedInList = bookingList?.filter(
          i => i?.booking_status == 'true',
        ); // if booking_status is "true" it is under checked in
        const checkedInListWithRoles = checkedInList
          ?.filter(i => i?.health_safety?.length > 0)
          ?.sort(sortByName);
        const checkedInListWithoutRolesSorted = checkedInList
          ?.filter(i => i?.health_safety?.length == 0)
          ?.sort(sortByName);
        setTeamCheckedinList([
          ...checkedInListWithRoles,
          ...checkedInListWithoutRolesSorted,
        ]);
      } else {
        setTeamBookedList([]);
        setTeamCheckedinList([]);
      }
    } else {
      setTeamBookedList([]);
      setTeamCheckedinList([]);
    }
  };

  useEffect(() => {
    setSelectedTeam(locateTeamDropdownDetail?.primary?.[0]);
  }, [locateTeamDropdownDetail]);

  useEffect(() => {
    setSearchDetails('');
    updateBookingList();
  }, [teamBookingList, selectedTeam]);

  useEffect(() => {
    selectedTeam?.id && getTeamBookingDetails();
  }, [selectedTeam]);

  return (
    <div className="locate-team">
      <div className="locate-team-head">
        <h2>
          {findLabelText(
            LocateLabelText.OnThisFloor,
            LocateLabelText.OnThisFloor,
            LocateLabelText.Locate,
          )}
        </h2>
      </div>
      {/* floorplan */}
      <div className="locate-manage-info">
        <div className="locate-manage">
          <div className="locate-managehead">
            <Link
              data-bs-toggle="collapse"
              to="#locate"
              role="button"
              aria-expanded={floorplanColapse ? 'false' : 'true'}
              aria-controls="locate"
              onClick={() => setFloorplanColapse(!floorplanColapse)}
            >
              {selectedTeam?.name}
              <img
                src={dropdown_angle}
                alt="img"
                className={
                  floorplanColapse ? 'collapse-rotate' : 'collapse-norotate'
                }
              />
            </Link>
          </div>
          <div
            className="dropdown-menu"
            id="locate"
            style={{ display: floorplanColapse ? 'block' : 'none' }}
          >
            <div className="locate-dropdown-inner">
              <h6>{LocateLabelText.YourTeams}</h6>
              {locateTeamDropdownDetail?.primary?.length > 0 &&
                locateTeamDropdownDetail?.primary?.map(i => {
                  return (
                    <Link
                      to="#"
                      key={i?.id}
                      onClick={() => {
                        setSelectedTeam(i);
                        setFloorplanColapse(false);
                      }}
                    >
                      {i?.name}
                    </Link>
                  );
                })}
              {locateTeamDropdownDetail?.secondary?.length > 0 &&
                locateTeamDropdownDetail?.secondary?.map(i => {
                  return (
                    <Link
                      to="#"
                      key={i?.id}
                      onClick={() => {
                        setSelectedTeam(i);
                        setFloorplanColapse(false);
                      }}
                    >
                      {i?.name}
                    </Link>
                  );
                })}
            </div>
            <div className="locate-dropdown-inner">
              <h6>{LocateLabelText.EmergencyResponders}</h6>
              {locateTeamDropdownDetail?.emergency_responders?.length > 0 &&
                locateTeamDropdownDetail?.emergency_responders?.map(i => {
                  return (
                    <Link
                      to="#"
                      key={i?.id}
                      onClick={() => {
                        setSelectedTeam(i);
                        setFloorplanColapse(false);
                      }}
                    >
                      {i?.name}
                    </Link>
                  );
                })}
            </div>
            <div className="locate-dropdown-inner">
              <h6>{LocateLabelText.AllTeams}</h6>
              {locateTeamDropdownDetail?.other?.length > 0 &&
                locateTeamDropdownDetail?.other?.map(i => {
                  return (
                    <Link
                      to="#"
                      key={i?.id}
                      onClick={() => {
                        setSelectedTeam(i);
                        setFloorplanColapse(false);
                      }}
                    >
                      {i?.name}
                    </Link>
                  );
                })}
            </div>
          </div>
          {!floorplanColapse && teamCheckedinList?.length > 0 && (
            <div>
              <p>{LocateLabelText.CheckedIn}</p>
              {teamCheckedinList?.map((f: any, index) => (
                <div key={index} className="locate-teamavaliable">
                  <div className="locate-availeft">
                    <div
                      className="locate-user locate-user-first-letter"
                      onClick={() => setViewUser({ type: '', values: f })}
                    >
                      {f?.profile_photo != null && f?.profile_photo != '' ? (
                        <p>
                          <GetImgaeFromS3Bucket
                            imageFile={f?.profile_photo}
                            type={'image'}
                            userDetail={f}
                            name={f?.first_letter + f?.last_letter}
                            style={'profile'}
                          />
                          <span
                            className="online locate-user-online locate-online-img"
                            style={{
                              background: `${f?.color_code}`,
                              border: `1px solid ${f?.color_code}`,
                            }}
                          />
                        </p>
                      ) : (
                        <p className="avatar-text">
                          <span>
                            {f?.first_letter}
                            {f?.last_letter}
                          </span>
                          <span
                            className="online locate-user-online"
                            style={{
                              background: `${f?.color_code}`,
                              border: `1px solid ${f?.color_code}`,
                            }}
                          />
                        </p>
                      )}
                    </div>
                    <div className="locate-username">
                      <div className="locate-users">
                        <h2
                          onClick={() => setViewUser({ type: '', values: f })}
                        >
                          <Link to="#">{f?.display_name}</Link>
                        </h2>
                        {f?.health_safety?.length > 0
                          ? f?.health_safety.map((icon, index) => {
                              return (
                                <Link to="#" key={index}>
                                  <GetImgaeFromS3Bucket
                                    imageFile={icon?.health_safety_icons}
                                    type={'image'}
                                    FilePath={'ghs'}
                                  />
                                </Link>
                              );
                            })
                          : null}
                      </div>
                      {f?.status != 0 && (
                        <>
                          <div className="locate-deskno">
                            <h6>{f?.workspace}</h6>
                          </div>
                          <div className="locate-time">
                            <h6>
                              <img
                                src={TimeleftIcon}
                                className="me-2"
                                alt="img"
                              />
                              {getPrefereredTimeToDisplay(
                                f?.checkin ? f?.checkin : f?.start_time,
                              )}
                            </h6>
                            <h6>
                              <img
                                src={TimeRightIcon}
                                className="me-2"
                                alt="img"
                              />
                              {getPrefereredTimeToDisplay(
                                f?.checkout ? f?.checkout : f?.end_time,
                              )}
                            </h6>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="locate-avairight">
                    <Link
                      to="#"
                      onClick={() =>
                        setSearchDetails({
                          search_id: f?.workspace_id,
                          search_name: f?.workspace,
                        })
                      }
                    >
                      <img src={locations} alt="img" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}{' '}
          {!floorplanColapse && teamBookedList?.length > 0 && (
            <div>
              <p>{LocateLabelText.Booked}</p>
              {teamBookedList?.map((f: any, index) => (
                <div key={index} className="locate-teamavaliable">
                  <div className="locate-availeft">
                    <div
                      className="locate-user locate-user-first-letter"
                      onClick={() => setViewUser({ type: '', values: f })}
                    >
                      {f?.profile_photo != null && f?.profile_photo != '' ? (
                        <p>
                          <GetImgaeFromS3Bucket
                            imageFile={f?.profile_photo}
                            type={'image'}
                            userDetail={f}
                            name={f?.first_letter + f?.last_letter}
                            style={'profile'}
                          />
                          <span
                            className="online locate-user-online locate-online-img"
                            style={{
                              background: `${f?.color_code}`,
                              border: `1px solid ${f?.color_code}`,
                            }}
                          />
                        </p>
                      ) : (
                        <p className="avatar-text">
                          <span>
                            {f?.first_letter}
                            {f?.last_letter}
                          </span>
                          <span
                            className="online locate-user-online"
                            style={{
                              background: `${f?.color_code}`,
                              border: `1px solid ${f?.color_code}`,
                            }}
                          />
                        </p>
                      )}
                    </div>
                    <div className="locate-username">
                      <div className="locate-users">
                        <h2
                          onClick={() => setViewUser({ type: '', values: f })}
                        >
                          <Link to="#">{f?.display_name}</Link>
                        </h2>
                        {f?.health_safety?.length > 0
                          ? f?.health_safety.map((icon, index) => {
                              return (
                                <Link to="#" key={index}>
                                  <GetImgaeFromS3Bucket
                                    imageFile={icon?.health_safety_icons}
                                    type={'image'}
                                    FilePath={'ghs'}
                                  />
                                </Link>
                              );
                            })
                          : null}
                      </div>
                      {f?.status != 0 && (
                        <>
                          <div className="locate-deskno">
                            <h6>{f?.workspace}</h6>
                          </div>
                          <div className="locate-time">
                            <h6>
                              <img
                                src={TimeleftIcon}
                                className="me-2"
                                alt="img"
                              />
                              {getPrefereredTimeToDisplay(
                                f?.checkin ? f?.checkin : f?.start_time,
                              )}
                            </h6>
                            <h6>
                              <img
                                src={TimeRightIcon}
                                className="me-2"
                                alt="img"
                              />
                              {getPrefereredTimeToDisplay(
                                f?.checkout ? f?.checkout : f?.end_time,
                              )}
                            </h6>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="locate-avairight">
                    <Link
                      to="#"
                      onClick={() =>
                        setSearchDetails({
                          search_id: f?.workspace_id,
                          search_name: f?.workspace,
                        })
                      }
                    >
                      <img src={locations} alt="img" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* floorplan */}
      {/* </div>
      </div> */}
    </div>
  );
};

export default TeamBookingDetails;
