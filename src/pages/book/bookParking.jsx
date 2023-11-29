import React, { useContext, useEffect, useState } from 'react';
import { dropdownAngle } from '../../components/imagepath';
import { BookingContext } from '../../components/context/context';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import Loader from '../../components/loader';
import moment from 'moment';
import Toaster from '../../components/toast';
import { useDispatch, useSelector } from 'react-redux';
import DropDownSelection from '../../components/selectfield/dropDownSelection';
import {
  findLabelText,
  validateBackgroundColor,
  validateLoginUser,
  validateOnBehalfOfUser,
} from '../../components/commonMethod';
import { setQuickBeHalfOfDetails } from '../../reduxStore/quickBookSlice';
import {
  assetsList,
  dateFormat_DD_MM_YYYY,
  dateFormat_YYYY_MM_DD,
} from '../../assets/constants/config';
import { setDashboardListUpdate } from '../../reduxStore/dashboardSlice';
import BookingMonthList from '../../components/book/bookingMonthList';
import { BookingDeskList } from '../../components/book/bookingDeskList';
import BookingStatusView from '../../components/book/bookingStatusView';
import BookDayDetails from './bookDayDetails';
import {
  PlanTextLabel,
  ViewByIds,
} from '../../components/planModuleComponent/constants';
import { monthlist } from '../../assets/constants/monthlist';
import { updateBlinkIcon } from '../../reduxStore/appSlice';

const BookParking = ({}) => {
  const [parkingDetails, setParkingDetails] = useState({});
  const [workSpaceDetailCopy, setWorkSpaceDetailsCopy] = useState({});
  const {
    selectedTab,
    viewBy,
    startTime,
    endTime,
    selectedLocation,
    selectedFilter,
    showPageloading,
    hidePageloading,
    bookDate,
    search,
    registration,
    timezone,
    timezoneId,
  } = useContext(BookingContext);
  const [selectedDaysDetails, setDayDetails] = useState({});
  const [selectValue, setSelectValue] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workspaceIsEmpty, setWorkspaceIsEmpty] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const { dashboardListUpdate } = useSelector(state => state.dashboard);
  const [monthList, setMonthList] = useState([]);
  const [teamMembers, setTeamMembers] = useState({});
  const [startDateofMonth, setStartDateofMonth] = useState(
    moment(new Date(bookDate))
      .clone()
      .startOf('month')
      .format(dateFormat_YYYY_MM_DD),
  );
  const [endDateofMonth, setEndDateofMonth] = useState(
    moment(new Date(bookDate))
      .clone()
      .endOf('month')
      .format(dateFormat_YYYY_MM_DD),
  );
  const [bookingInfo, setBookingInfo] = useState({});
  const dispatch = useDispatch();
  const { userDetails } = useSelector(state => state?.app);
  const [startTimezone, setStartTimezone] = useState({});
  const [endTimezone, setEndTimezone] = useState({});

  useEffect(() => {
    getStartAndEndDateofMonth(bookDate);
    if (selectedLocation && selectedLocation?.id) {
      setMonthList(monthlist(bookDate));
      getParkingDetails();
      setTeamName('');
    }
    if (!selectedLocation?.timezone) {
      let zoneNameSplit = userDetails?.timezone?.split('/');
      let timezoneObj = {
        id: userDetails?.timezone_id,
        name: userDetails?.timezone,
        aliasName: userDetails?.alias_name,
        label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
      };
      setStartTimezone(timezoneObj);
      setEndTimezone(timezoneObj);
    }
  }, [selectedLocation, viewBy, bookDate, startTime, endTime]);

  useEffect(() => {
    if (viewBy != ViewByIds.team) {
      let filteredList = workSpaceDetailCopy?.assetInfo?.filter(i => {
        let count = 0;
        i?.amenities?.map(a => {
          if (selectedFilter?.includes(a?.id)) {
            count = count + 1;
          }
        });
        if (count == selectedFilter?.length) {
          return i;
        }
      });
      setParkingDetails({ ...parkingDetails, assetInfo: filteredList });
    } else {
      setParkingDetails(workSpaceDetailCopy);
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (dashboardListUpdate) {
      getParkingDetails();
      setTeamName('');
      dispatch(setDashboardListUpdate(false));
    }
  }, [dashboardListUpdate]);

  const getStartAndEndDateofMonth = bookdate => {
    const startOfMonth = moment(new Date(bookDate))
      .clone()
      .startOf('month')
      .format(dateFormat_YYYY_MM_DD);
    setStartDateofMonth(startOfMonth);
    const endOfMonth = moment(new Date(bookDate))
      .clone()
      .endOf('month')
      .format(dateFormat_YYYY_MM_DD);
    setEndDateofMonth(endOfMonth);
  };

  const getParkingDetails = () => {
    const today = new Date();
    const month = bookDate.getMonth() + 1;
    const year = bookDate.getFullYear();
    const date = moment(bookDate).format(dateFormat_DD_MM_YYYY);

    const data = {
      start_date: startDateofMonth,
      end_date: endDateofMonth,
      start_time: startTime,
      end_time: endTime,
      floorplan_type_id: selectedTab?.id,
      viewing_type: viewBy,
      location_id: selectedLocation?.id,
      capacity: '',
      team_id: '',
      amenitie: selectedFilter?.toString(),
      location_timezone: timezone,
    };
    if (viewBy == ViewByIds.team) {
      let dataList = validateLoginUser();
      data['user_role'] = dataList?.slug;
    }
    if (startTime != '' && endTime != '') {
      setLoading(true);
      postData(
        viewBy == ViewByIds.team ? ApiUrl.bookinglistTeam : ApiUrl.bookingList,
        data,
        (successRes, res) => {
          setLoading(false);
          let teamNameSort = successRes?.team_details?.sort((a, b) => {
            let teamA = a?.team_name?.toLowerCase();
            let teamB = b?.team_name?.toLowerCase();
            if (teamA < teamB) return -1;
            if (teamA > teamA) return 1;
            return 0;
          });
          let sortedData =
            viewBy == ViewByIds.month
              ? successRes?.assetInfo?.sort((a, b) => {
                  let nameA = a?.asset_name?.toLowerCase();
                  let nameB = b?.asset_name?.toLowerCase();
                  nameA = nameA?.match(/[a-z]/g);
                  nameB = nameB?.match(/[a-z]/g);
                  nameA = nameA?.join('');
                  nameB = nameB?.join('');

                  const alphabetComparison = nameA?.localeCompare(nameB);

                  if (alphabetComparison === 0) {
                    let numA = a?.asset_name?.match(/[0-9]/g);
                    let numB = b?.asset_name?.match(/[0-9]/g);
                    if (numA === null) {
                      numA = ['0'];
                    }
                    if (numB === null) {
                      numB = ['0'];
                    }
                    numA = parseInt(numA?.join(''));
                    numB = parseInt(numB?.join(''));
                    return numA - numB;
                  }
                  return alphabetComparison;
                })
              : teamNameSort?.map((each, index) => {
                  each.team_members.sort((a, b) => {
                    let nameA = a?.name?.toLowerCase();
                    let nameB = b?.name?.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  });
                  return each;
                });
          viewBy == ViewByIds.month
            ? setParkingDetails({ ...successRes, assetInfo: sortedData })
            : setParkingDetails({ ...successRes, team_details: sortedData });
          // setParkingDetails(successRes);
          setWorkSpaceDetailsCopy(successRes);
          if (res?.data?.code == '422') {
            Toaster(res?.data?.code, res?.data?.message);
            setWorkspaceIsEmpty(true);
          } else {
            if (successRes == 'error') {
              setWorkspaceIsEmpty(true);
            } else {
              setWorkspaceIsEmpty(false);
              setBookingInfo(successRes?.bookingInfo);
            }
          }
        },
      );
    }
  };
  const createOrUpdateParking = opt => {
    if (opt.status == 'Unavailable') {
    } else {
      // if (opt.booking_id) {
      // } else {
      showPageloading();
      const sub = '';
      const desc = '';
      const selectedParticipantsId = [];
      const data = {
        location_id: selectedLocation?.id,
        plan_id: opt.assetDetails.id, // assetDetails.id,
        date: opt.full_date, // selectedDaysDetails.assetDetails.full_date,// details?.full_date, // "2022-10-03", //details?.date,
        start_time: startTime
          ? moment(startTime, 'hh:mm A').format('HH:mm')
          : '', // assetDetails?.start_time,
        end_time: endTime ? moment(endTime, 'hh:mm A').format('HH:mm') : '', // assetDetails?.end_time,
        subjects: sub,
        participants: selectedParticipantsId.toString(),
        comments: desc,
        teams: '',
        google: '',
        zoom: '',
        floorplan_type_id: '3',
        asset_status_id: opt.status_id,
        registration: registration,
        start_timezone: timezone ? timezone : startTimezone?.name,
        end_timezone: timezone ? timezone : endTimezone?.name,
        asset_timezone: timezone,
        timezone_id: timezoneId,
      };

      if (opt.booking_id) {
        data['booking_id'] = opt.booking_id;
      }
      postData(
        opt.booking_id && opt?.booking_user_id == userDetails?.id
          ? ApiUrl.updateBooking
          : ApiUrl.addBooking,
        data,
        (successRes, res) => {
          if (res?.data?.code == 200) {
            getParkingDetails();
            dispatch(updateBlinkIcon(true));
          }
          Toaster(res.data.code, res.data.message);
          hidePageloading();
        },
      );
      // }
    }
  };
  const innerData = name => {
    setTeamName(name == teamName ? '' : name);
  };
  useEffect(() => {
    onSearchChange(search);
  }, [search]);
  const onSearchChange = val => {
    let workSpaceCopy = JSON.parse(JSON.stringify(workSpaceDetailCopy));
    if (val?.trim() !== '' && workSpaceCopy?.team_details?.length > 0) {
      let lists = workSpaceCopy?.team_details?.filter((ele, i) => {
        let value = permissionGroupId(ele?.team_members);
        if (value?.length > 0) {
          ele.team_members = value;
          return ele;
        }
      });
      function permissionGroupId(ele) {
        let data = ele?.filter(element => {
          if (
            element?.name?.toLowerCase()?.includes(val?.trim()?.toLowerCase())
          ) {
            return element;
          }
        });
        return data;
      }
      if (lists?.length > 0) {
        workSpaceCopy.team_details = lists;
        setParkingDetails(workSpaceCopy);
      } else if (workSpaceCopy?.team_details) {
        workSpaceCopy.team_details = [];
        setParkingDetails(workSpaceCopy);
      }
    } else {
      setParkingDetails(workSpaceDetailCopy);
    }
  };

  const getTeamCount = (teamId, date, teamMembersList) => {
    let count = teamMembersList?.length;
    let userIds = teamMembersList?.map(i => i?.id);
    let selectBookings = userIds?.map(id => {
      let checkData = parkingDetails?.booking_details?.find(
        book => book?.booking_date == date && book?.user_id == id,
      );
      if (checkData != undefined && checkData != null) {
        count = count - 1;
      }
    });
    return count;
  };

  const getAssetCount = date => {
    let count = parkingDetails?.assetInfo?.filter(
      i => i?.asset_status != 3,
    )?.length;
    let assetIds = parkingDetails?.assetInfo?.map(i => i?.asset_id);
    let selectBookings = assetIds?.map(id => {
      let checkData = parkingDetails?.bookingInfo?.[id]?.find(
        book => book?.booking_date == date,
      );
      if (checkData != undefined && checkData != null) {
        count = count - 1;
      }
    });
    return count;
  };
  const onClikDesk = (data, index) => {
    if (
      new Date(data?.full_date) <
      new Date(moment(new Date()).format(dateFormat_YYYY_MM_DD))
    ) {
    } else {
      if (validateOnBehalfOfUser() && data?.status == 'Unknown') {
        const preparData = {
          data: {
            ...data,
            team_name: teamName,
            selectedAssets: assetsList[2].id,
            start_time: startTime,
            end_time: endTime,
          },
          quickBookType: 'active',
        };
        dispatch(setQuickBeHalfOfDetails(preparData));
        //
      }
    }
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="new-booking-table">
          <div className="booking-table">
            {workspaceIsEmpty ? (
              <label className="booking-no-desk-text">
                {findLabelText(
                  PlanTextLabel.Currently_there_is_no_desk,
                  PlanTextLabel.Currentlythereisnodesk,
                  PlanTextLabel.Common_Values,
                )}
                {'.'}
              </label>
            ) : null}
            {monthList?.length > 0 ? (
              <BookingMonthList
                details={parkingDetails}
                date={bookDate}
                monthList={monthList}
              />
            ) : null}

            {viewBy == ViewByIds.team ? (
              <>
                {parkingDetails?.team_details &&
                  parkingDetails?.team_details?.length > 0 &&
                  parkingDetails?.team_details?.map((team, index) => {
                    return (
                      <div key={index}>
                        <div className="booking-details">
                          <div
                            className="booking-inner-content team-list-arrow"
                            onClick={() => {
                              innerData(team?.team_name);
                              setTeamMembers({
                                name: team?.team_name,
                                members: team?.team_members,
                              });
                            }}
                          >
                            <p>
                              <span>{team?.team_name}</span>
                            </p>{' '}
                            <img
                              src={dropdownAngle}
                              alt="img"
                              className={
                                team?.team_name != teamName
                                  ? 'img-rotate'
                                  : 'img-rotate rotate'
                              }
                            />
                          </div>

                          {monthList?.length > 0
                            ? monthList?.map((opt, index) => {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      paddingRight: 2,
                                      paddingBottom: 2,
                                      paddingTop: 2,
                                      paddingLeft: 3,
                                      backgroundColor: validateBackgroundColor(
                                        opt.full_date,
                                      ),
                                    }}
                                  >
                                    <BookingDeskList
                                      onSelect={data => {
                                        setDayDetails(data);
                                      }}
                                      setVisible={setVisible}
                                      key={index}
                                      monthDetails={opt}
                                      teamDetails={team}
                                      viewBy={viewBy}
                                      isTeam={true}
                                      teamCount={getTeamCount(
                                        team?.id,
                                        opt?.full_date,
                                        team?.team_members,
                                      )}
                                    />
                                  </div>
                                );
                              })
                            : null}
                        </div>
                        {team?.team_name == teamName ? (
                          <>
                            {teamMembers?.members?.length > 0 &&
                              teamMembers?.members?.map((details, index) => {
                                return (
                                  <div key={index} className="booking-details">
                                    <div className="booking-inner-content">
                                      <p>
                                        <span>{details?.name}</span>
                                      </p>
                                    </div>
                                    {monthList?.length > 0
                                      ? monthList?.map((opt, index) => {
                                          return (
                                            <div
                                              key={index}
                                              style={{
                                                paddingRight: 2,
                                                paddingBottom: 2,
                                                paddingTop: 2,
                                                paddingLeft: 3,
                                                backgroundColor:
                                                  validateBackgroundColor(
                                                    opt.full_date,
                                                  ),
                                              }}
                                            >
                                              <BookingDeskList
                                                onSelect={data => {
                                                  setDayDetails(data);
                                                }}
                                                setVisible={setVisible}
                                                onSelectClick={data => {
                                                  let dataObj = {
                                                    ...data,
                                                    userDetails: {
                                                      id: details?.id,
                                                      name: details?.name,
                                                      profile_photo:
                                                        details?.profile_image,
                                                    },
                                                  };
                                                  onClikDesk(dataObj, index);
                                                }}
                                                details={details}
                                                key={index}
                                                viewBy={viewBy}
                                                monthDetails={opt}
                                                teamBookingDetails={
                                                  parkingDetails?.booking_details &&
                                                  parkingDetails
                                                    ?.booking_details?.length >
                                                    0 &&
                                                  parkingDetails?.booking_details?.find(
                                                    book =>
                                                      book?.user_id ==
                                                        details?.id &&
                                                      book?.booking_date ==
                                                        opt?.full_date,
                                                  )
                                                }
                                                isTeam={false}
                                              />
                                            </div>
                                          );
                                        })
                                      : null}
                                  </div>
                                );
                              })}
                            {parkingDetails?.team_details?.length == 0 && (
                              <div className="no-records">
                                {findLabelText(
                                  PlanTextLabel.No_records,
                                  PlanTextLabel.Norecords,
                                  PlanTextLabel.Common_Values,
                                )}
                              </div>
                            )}
                          </>
                        ) : null}
                      </div>
                    );
                  })}
              </>
            ) : (
              <>
                {parkingDetails?.assetInfo &&
                  parkingDetails?.assetInfo?.length > 0 && (
                    <div className="booking-details">
                      <div className="booking-inner-content">
                        <p>
                          <span>{'All'}</span>
                        </p>
                      </div>

                      {monthList?.length > 0
                        ? monthList?.map((opt, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  paddingRight: 2,
                                  paddingBottom: 2,
                                  paddingTop: 2,
                                  paddingLeft: 3,
                                  backgroundColor: validateBackgroundColor(
                                    opt.full_date,
                                  ),
                                }}
                              >
                                <BookingDeskList
                                  onSelect={data => {
                                    setDayDetails(data);
                                  }}
                                  setVisible={setVisible}
                                  key={index}
                                  monthDetails={opt}
                                  viewBy={viewBy}
                                  isTeam={false}
                                  assetCount={getAssetCount(opt?.full_date)}
                                  assetDetails={{ asset_status: '3' }}
                                />
                              </div>
                            );
                          })
                        : null}
                    </div>
                  )}
                {parkingDetails?.assetInfo &&
                  parkingDetails?.assetInfo?.length > 0 &&
                  parkingDetails?.assetInfo.map((asset, index) => {
                    return (
                      <div key={index} className="booking-details">
                        <div className="booking-inner-content">
                          <p>
                            <span>{asset?.asset_name}</span>
                          </p>
                        </div>

                        {monthList?.length > 0
                          ? monthList?.map((opt, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    paddingRight: 2,
                                    paddingBottom: 2,
                                    paddingTop: 2,
                                    paddingLeft: 3,
                                    backgroundColor: validateBackgroundColor(
                                      opt.full_date,
                                    ),
                                  }}
                                >
                                  <BookingDeskList
                                    onSelect={data => {
                                      setDayDetails(data);
                                    }}
                                    setVisible={setVisible}
                                    onSelectClick={data => {
                                      if (
                                        new Date(opt.full_date) <
                                        new Date(
                                          moment(new Date()).format(
                                            dateFormat_YYYY_MM_DD,
                                          ),
                                        )
                                      ) {
                                      } else {
                                        createOrUpdateParking(data);
                                      }
                                    }}
                                    key={index}
                                    viewBy={viewBy}
                                    assetDetails={asset}
                                    monthDetails={opt}
                                    bookingDetailList={
                                      parkingDetails?.bookingInfo &&
                                      Object.keys(
                                        parkingDetails?.bookingInfo,
                                      )?.includes(asset?.asset_id?.toString())
                                        ? parkingDetails?.bookingInfo[
                                            asset?.asset_id?.toString()
                                          ]
                                        : []
                                    }
                                    isTeam={false}
                                  />
                                </div>
                              );
                            })
                          : null}
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      )}
      <BookingStatusView />
      <BookDayDetails
        bookingInfo={bookingInfo}
        selectedDaysDetails={selectedDaysDetails}
        visible={visible}
        startTime={startTime}
        endTime={endTime}
      />
    </React.Fragment>
  );
};

export default BookParking;
