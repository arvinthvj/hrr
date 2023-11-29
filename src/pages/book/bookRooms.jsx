import React, { useContext, useEffect, useState } from 'react';
import { dropdownAngle } from '../../components/imagepath';
import { BookingContext } from '../../components/context/context';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import { RoomBooking } from './bookingPopup';
import Loader from '../../components/loader';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DropDownSelection from '../../components/selectfield/dropDownSelection';
import Toaster from '../../components/toast';
import {
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
import { monthlist } from '../../assets/constants/monthlist';
import { ViewByIds } from '../../components/planModuleComponent/constants';
const BookRooms = ({}) => {
  const [roomDetails, setRoomDetails] = useState({});
  const [workSpaceDetailCopy, setWorkSpaceDetailsCopy] = useState({});
  const [monthList, setMonthList] = useState([]);
  const {
    selectedTab,
    viewBy,
    startTime,
    endTime,
    selectedLocation,
    selectedCapacity,
    selectedFilter,
    showPageloading,
    hidePageloading,
    setCapacityList,
    bookDate,
    search,
    setInitialCapacity,
    timezone,
  } = useContext(BookingContext);
  const [workspaceIsEmpty, setWorkspaceIsEmpty] = useState(false);
  const [selectedDaysDetails, setDayDetails] = useState({});
  const [selectValue, setSelectValue] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const { languages } = useSelector(state => state.language);
  const dispatch = useDispatch();
  const { dashboardListUpdate } = useSelector(state => state.dashboard);
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
  const findLabelText = (module, text, key) => {
    const getKey = languages?.[key];
    const label = getKey?.[module]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };
  useEffect(() => {
    getStartAndEndDateofMonth(bookDate);
    if (selectedLocation && selectedLocation?.id) {
      setMonthList(monthlist(bookDate));
      getRoomDetails();
      setTeamName('');
    }
  }, [selectedTab, viewBy, startTime, endTime, selectedLocation, bookDate]);

  useEffect(() => {
    if (viewBy != ViewByIds.team) {
      let filteredList = workSpaceDetailCopy?.assetInfo?.filter(i => {
        let count = 0;
        i?.amenities?.map(a => {
          if (selectedFilter?.includes(a?.id)) {
            count = count + 1;
          }
        });
        if (
          count == selectedFilter?.length &&
          i?.asset_capacity >= selectedCapacity
        ) {
          return i;
        }
      });
      setRoomDetails({ ...roomDetails, assetInfo: filteredList });
    } else {
      setRoomDetails(workSpaceDetailCopy);
    }
  }, [selectedFilter, selectedCapacity]);

  useEffect(() => {
    if (dashboardListUpdate) {
      getRoomDetails();
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

  const getRoomDetails = () => {
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
      capacity: selectedCapacity,
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
            ? setRoomDetails({ ...successRes, assetInfo: sortedData })
            : setRoomDetails({ ...successRes, team_details: sortedData });
          // setRoomDetails(successRes);
          setWorkSpaceDetailsCopy(successRes);
          let maxCapacity = 0;
          if (viewBy != ViewByIds.team && successRes?.assetInfo?.length > 0) {
            successRes?.assetInfo?.map(a => {
              if (a?.asset_capacity > maxCapacity) {
                maxCapacity = a?.asset_capacity;
              }
            });
          }
          const list = [];

          for (let i = 2; i <= parseInt(maxCapacity); i++) {
            list.push(i);
          }
          const newList = list.filter(opt => opt % 2 == 0);
          setInitialCapacity(1);
          setCapacityList([1, ...newList]);
          if (res?.data?.code == '422') {
            Toaster(res?.data?.code, res?.data?.message);
            setWorkspaceIsEmpty(true);
            setWorkSpaceDetailsCopy({});
          } else if (successRes == 'error') {
            setWorkspaceIsEmpty(true);
          } else {
            setWorkspaceIsEmpty(false);
            setBookingInfo(successRes?.bookingInfo);
          }
        },
      );
    }
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
            selectedAssets: assetsList[1].id,
            start_time: startTime,
            end_time: endTime,
          },
          quickBookType: 'active',
        };
        dispatch(setQuickBeHalfOfDetails(preparData));
      }
    }
  };
  const getTeamCount = (teamId, date, teamMembersList) => {
    let count = teamMembersList?.length;
    let userIds = teamMembersList?.map(i => i?.id);
    let selectBookings = userIds?.map(id => {
      let checkData = roomDetails?.booking_details?.find(
        book => book?.booking_date == date && book?.user_id == id,
      );
      if (checkData != undefined && checkData != null) {
        count = count - 1;
      }
    });
    return count;
  };

  const getAssetCount = date => {
    let count = roomDetails?.assetInfo?.filter(
      i => i?.asset_status != 3,
    )?.length;
    let assetIds = roomDetails?.assetInfo?.map(i => i?.asset_id);
    let selectBookings = assetIds?.map(id => {
      let checkData = roomDetails?.bookingInfo?.[id]?.find(
        book => book?.booking_date == date,
      );
      if (checkData != undefined && checkData != null) {
        count = count - 1;
      }
    });
    return count;
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
        setRoomDetails(workSpaceCopy);
      } else if (workSpaceCopy?.team_details) {
        workSpaceCopy.team_details = [];
        setRoomDetails(workSpaceCopy);
      }
    } else {
      setRoomDetails(workSpaceDetailCopy);
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
                  'Currently_there_is_no_desk',
                  'Currently there is no desk',
                  'Common_Values',
                )}
                {'.'}
              </label>
            ) : null}
            {monthList?.length > 0 ? (
              <BookingMonthList
                details={roomDetails}
                date={bookDate}
                monthList={monthList}
              />
            ) : null}
            {viewBy == ViewByIds.team ? (
              <>
                {' '}
                {roomDetails?.team_details &&
                roomDetails?.team_details?.length > 0
                  ? roomDetails?.team_details?.map((team, index) => {
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
                                  team?.team_name == teamName
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
                                    <div
                                      key={index}
                                      className="booking-details"
                                    >
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
                                                    roomDetails?.booking_details &&
                                                    roomDetails?.booking_details
                                                      ?.length > 0 &&
                                                    roomDetails?.booking_details?.find(
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
                              {roomDetails?.All && value?.length == 0 && (
                                <div className="no-records">
                                  {findLabelText(
                                    'No_records',
                                    'No Records',
                                    'Common_Values',
                                  )}
                                </div>
                              )}
                            </>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </>
            ) : (
              <>
                {roomDetails?.assetInfo &&
                  roomDetails?.assetInfo?.length > 0 && (
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
                {roomDetails?.assetInfo && roomDetails?.assetInfo?.length > 0
                  ? roomDetails?.assetInfo?.map((asset, index) => {
                      return (
                        <div key={index} className="booking-details">
                          <div className="booking-inner-content">
                            <p>
                              <span>
                                {viewBy == ViewByIds.team && teamList ? (
                                  <DropDownSelection
                                    options={teamList}
                                    selectedValue={selectValue}
                                    height={'32px'}
                                    minWidth={'130px'}
                                    onChange={value => {
                                      setSelectValue(value);
                                    }}
                                  />
                                ) : (
                                  asset?.asset_name
                                )}
                              </span>
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
                                      viewBy={viewBy}
                                      setVisible={setVisible}
                                      assetDetails={asset}
                                      monthDetails={opt}
                                      bookingDetailList={
                                        roomDetails?.bookingInfo &&
                                        Object.keys(
                                          roomDetails?.bookingInfo,
                                        )?.includes(asset?.asset_id?.toString())
                                          ? roomDetails?.bookingInfo[
                                              asset?.asset_id?.toString()
                                            ]
                                          : []
                                      }
                                      isTeam={false}
                                      showPopup={flag => {
                                        // if(startTime && endTime){
                                        if (
                                          asset?.asset_status?.toString() == '3'
                                        ) {
                                        } else {
                                          if (
                                            new Date(opt.full_date) <
                                            new Date(
                                              moment(new Date()).format(
                                                dateFormat_YYYY_MM_DD,
                                              ),
                                            )
                                          ) {
                                            // Do nothing
                                          } else {
                                            if (opt?.booking_id) {
                                            } else {
                                              setShowBookingPopup(flag);
                                            }
                                          }
                                        }
                                        // }
                                      }}
                                      onSelect={data => {
                                        setDayDetails(data);
                                      }}
                                      onSelectClick={opt => {
                                        if (
                                          new Date(opt.full_date) <
                                          new Date(
                                            moment(new Date()).format(
                                              dateFormat_YYYY_MM_DD,
                                            ),
                                          )
                                        ) {
                                          // Do nothing
                                        } else {
                                          // setDayDetails(opt);
                                        }
                                      }}
                                      key={index}
                                    />
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      );
                    })
                  : null}
              </>
            )}
          </div>
        </div>
      )}
      {/* /Booking Table */}
      <BookingStatusView />

      {/* Booking Group */}
      <BookDayDetails
        bookingInfo={bookingInfo}
        selectedDaysDetails={selectedDaysDetails}
        visible={visible}
        startTime={startTime}
        endTime={endTime}
      />
      {/* Booking Group */}

      {showBookingPopup ? (
        <RoomBooking
          hidePageloading={() => hidePageloading()}
          showPageloading={() => showPageloading()}
          submit={() => {
            getRoomDetails();
            setShowBookingPopup(false);
          }}
          close={() => {
            setShowBookingPopup(false);
          }}
          details={selectedDaysDetails}
          location={selectedLocation}
          capacity={selectedCapacity}
          startTime={startTime}
          endTime={endTime}
          showBookingPopup={showBookingPopup}
          roomDetails={roomDetails}
        />
      ) : null}
    </React.Fragment>
  );
};

export default BookRooms;
