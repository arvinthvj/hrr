import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EditIcon,
  ParkingIcon,
  RoomIcon,
  TimeRightIcon,
  TimeleftIcon,
  WorkspacesIcon,
  holiday,
  inOffice,
  locations,
  other_icon,
  out_of_icon,
  remote_home,
  sickness,
  client_site,
} from '../../components/imagepath';
import { postData } from '../../services/apicall';
import {
  CancelBooking,
  DashboardCheckinBooking,
  DashboardCheckoutBooking,
} from '../../services/apiurl';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetQuickBookEditOpen,
  SetQuickBookSelect,
} from '../../reduxStore/quickBookSlice';
import moment from 'moment';
import Toaster from '../../components/toast';
import {
  hideLoader,
  showLoader,
  updateBlinkIcon,
} from '../../reduxStore/appSlice';
import {
  changeTimeZone,
  findLabelText,
  getPreferedTimeFormat,
  getUserPreferedDateFormat,
} from '../../components/commonMethod';
import {
  DayDetailsFinalProps,
  DayDetailsProps,
} from '../../assets/globals/typeConstants';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import {
  AssertIcon,
  BOOKING_STATUS,
  DayList,
  LabelText,
} from '../../components/dashboardComponent/constants';
import {
  dateFormat_DD_MM_YYYY,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_MMM_DD,
  dateFormat_YYYY_MM_DD_HH_mm,
  dateFormat_YYYY_MM_DD_HH_mm_ss,
  dateFormat_ddd_DD,
} from '../../assets/constants/config';
import { setDashboardListUpdate } from '../../reduxStore/dashboardSlice';

const DayDetails: React.FC<DayDetailsProps> = ({ details, selectedAssets }) => {
  const { editQuickOpen } = useSelector((state: any) => state?.quickBook);
  const { dashboardDayList } = useSelector(
    (state: RootReduxProps) => state.dashboard,
  );
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const dispatch = useDispatch();
  const [dates, setDate] = useState(
    moment().format(dateFormat_YYYY_MM_DD_HH_mm_ss),
  );
  const [selectedTap, setSelectedTap] = useState([...selectedAssets]);
  const [checkInApiCallStart, updateCheckInApiCallFlag] = useState(false);
  useEffect(() => {
    setSelectedTap([...selectedAssets]);
  }, [selectedAssets]);
  const [dayDetails, setDayDetails] = useState({ ...details });
  const selectIcon = icon => {
    return icon === AssertIcon.PARKING
      ? ParkingIcon
      : icon === AssertIcon.WORKSPACE
      ? WorkspacesIcon
      : icon === AssertIcon.ROOM
      ? RoomIcon
      : icon === AssertIcon.OUT_OFFICE
      ? out_of_icon
      : icon === AssertIcon.IN_OFFICE
      ? inOffice
      : icon === AssertIcon.REMOTELY
      ? remote_home
      : icon === AssertIcon.HOLIDAY
      ? holiday
      : icon === AssertIcon.SICKNESS
      ? sickness
      : icon === AssertIcon.OTHER
      ? other_icon
      : icon === AssertIcon.CLIENT_SITE
      ? client_site
      : null;
  };
  const getTimeStmp = (myDate: string, time: string) => {
    let today: string | string[] = moment(myDate).format(dateFormat_DD_MM_YYYY);
    today = today.split('-');
    const preparTime = myDate + ' ' + time;
    return new Date(preparTime);
  };
  useEffect(() => {
    const newData = { ...details };
    const list = [...newData?.book_data];
    try {
      if (list && list?.length > 1) {
        const numArray = list.sort(
          (a, b) =>
            getTimeStmp(dayDetails.date, a.start_time).getTime() -
            getTimeStmp(dayDetails.date, b.start_time).getTime(),
        );
        newData['book_data'] = [...numArray];
      } else {
      }
    } catch (error) {}
    setDayDetails({ ...newData });
  }, [details]);
  const handleEditBooking = values => {
    dispatch(SetQuickBookEditOpen({ openState: true, data: values }));
    dispatch(SetQuickBookSelect(parseInt(values?.floorplan_type_id)));
  };
  const isPastDate = (date, currentDateAndTime) => {
    const cTS = toTimestamp(
      moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
    );
    const pastEndTime = toTimestamp(
      moment(date, dateFormat_YYYY_MM_DD_HH_mm).format(
        dateFormat_YYYY_MM_DD_HH_mm_ss,
      ),
    );
    return pastEndTime < cTS ? true : false;
  };
  function status(status) {
    if (status == 2) {
      return true;
    } else return false;
  }
  const toTimestamp = strDate => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };
  useEffect(() => {
    const timer = setInterval(
      () => setDate(moment().format(dateFormat_YYYY_MM_DD_HH_mm_ss)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  const autoCheckInOutBooking = (id, status, action, index, tzone) => {
    let payload;
    let url;
    if (action == 'Checkin') {
      url = DashboardCheckinBooking;
      payload = {
        booking_id: id,
        checkin: status,
        timezone: tzone,
        auto_checkin: 1,
      };
    } else {
      url = DashboardCheckoutBooking;
      payload = {
        booking_id: id,
        checkout: status,
        timezone: tzone,
        auto_checkout: 1,
      };
    }
    postData(url, payload, (successRes, res) => {
      updateCheckInApiCallFlag(false);
      if (res?.data?.code == 200) {
        dispatch(updateBlinkIcon(true));
        const myList = dayDetails.book_data.map((p, i) =>
          i === index
            ? { ...p, checkin_status: action == 'Checkin' ? 1 : 2 }
            : p,
        );
        dayDetails['book_data'] = myList;
        setDayDetails({ ...dayDetails });
        dispatch(setDashboardListUpdate(true));
      }
    });
  };
  const autoCancelBooking = (bookingId, index, tzone) => {
    if (bookingId) {
      postData(
        CancelBooking,
        { booking_id: bookingId, timezone: tzone, expire: 1 },
        (successRes, res) => {
          updateCheckInApiCallFlag(false);
          if (res?.data?.code == 200) {
            dispatch(updateBlinkIcon(true));
            const myList = dayDetails.book_data.map((p, i) =>
              i === index ? { ...p, is_cancel: 1 } : p,
            );
            dayDetails['book_data'] = myList;
            setDayDetails({ ...dayDetails });
            dispatch(setDashboardListUpdate(true));
          }
        },
      );
    }
  };
  const checkInOutBooking = (id, status, action, index, tzone) => {
    let payload;
    let url;
    if (action == 'Checkin') {
      url = DashboardCheckinBooking;
      payload = {
        booking_id: id,
        checkin: status,
        timezone: tzone,
        auto_checkin: 0,
      };
    } else {
      url = DashboardCheckoutBooking;
      payload = {
        booking_id: id,
        checkout: status,
        timezone: tzone,
        auto_checkout: 0,
      };
    }
    dispatch(showLoader());
    postData(url, payload, (successRes, res) => {
      Toaster(res.data.code, res.data.message);
      if (res?.data?.code == 200) {
        dispatch(updateBlinkIcon(true));
        const myList = dayDetails.book_data.map((p, i) =>
          i === index
            ? { ...p, checkin_status: action == 'Checkin' ? 1 : 2 }
            : p,
        );
        dayDetails['book_data'] = myList;
        setDayDetails({ ...dayDetails });
        dispatch(setDashboardListUpdate(true));
      }
      dispatch(hideLoader());
    });
  };
  const compareDates = (d2, d3, timezone) => {
    const date2 = new Date(d2);
    const date3 = new Date(d3);
    const currentDate = moment(
      changeTimeZone(timezone),
      'DD/MM/YYYY HH:mm',
    ).format('YYYY-MM-DD HH:mm');
    if (
      moment(currentDate).isSameOrAfter(d2) &&
      moment(currentDate).isSameOrBefore(d3)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const compareCancelDates = (d2, d3, timezone) => {
    const date2 = new Date(d2);
    const date3 = new Date(d3);
    const currentDate = moment(
      changeTimeZone(timezone),
      'DD/MM/YYYY HH:mm',
    ).format('YYYY-MM-DD HH:mm');
    if (
      moment(currentDate).isSameOrAfter(d2) &&
      moment(currentDate).isBefore(d3)
    ) {
      return true;
    } else {
      return false;
    }
  };
  let checkis;
  checkis = dayDetails?.book_data?.filter(val =>
    selectedTap.includes(val?.floorplan_type_id),
  );
  const stringSplit = text => {
    const stringsplit = text?.split(',');
    return (
      <>
        <p>{stringsplit?.[0]}</p>
        <span>{stringsplit?.[1]}</span>
      </>
    );
  };
  const stylehange = (styles, isPastDateFlag, isCheckinStatusFlag) => {
    if (styles == 2 || isPastDateFlag || isCheckinStatusFlag) {
      return 'checkin-gray';
    } else if (styles == 0) {
      return 'checkin-white';
    } else if (styles == 1) {
      return '';
    } else {
      return '';
    }
  };
  const findEmptyData = (checkDate, isMessage = false) => {
    let returnData = '';
    if (dashboardDayList?.common_data?.length > 0) {
      const checkData = dashboardDayList?.common_data.find(
        obj => obj.schedule_date == checkDate,
      );
      if (checkData == undefined) {
        const preparData = {
          schedule_date: '',
          schedule_start_time: '',
          schedule_end_time: '',
          schedule_text: "You're out of office",
          schedule_message: 'Out of office',
        };
        returnData = isMessage
          ? preparData.schedule_message
          : preparData.schedule_text;
      } else {
        const msg =
          checkData.schedule_start_time && checkData.schedule_end_time
            ? ' ' +
              checkData.schedule_start_time +
              ' - ' +
              checkData.schedule_end_time
            : '';
        returnData = isMessage
          ? checkData.schedule_message
          : checkData.schedule_text + msg;
      }
    } else {
      const preparData = {
        schedule_date: '',
        schedule_start_time: '',
        schedule_end_time: '',
        schedule_text: "You're out of office",
        schedule_message: 'Out of office',
      };
      returnData = isMessage
        ? preparData.schedule_message
        : preparData.schedule_text;
    }
    return returnData;
  };
  const emptyContainer = index => {
    return (
      <div
        className={`table-info-details ${
          dayDetails?.dateString == moment(new Date()).format('MMM DD')
            ? 'table-info-details-today'
            : ''
        }${dayDetails?.day === 'Sunday' ? 'table-info-details-none' : ''}`}
        key={index}
      >
        <div className="box-shadow-style" key={index}>
          <table className="table shedule-table shedule-table-inner shedule-table-info">
            <tbody>
              <tr
                className={
                  dayDetails?.dateString == moment(new Date()).format('MMM DD')
                    ? 'checkin-white'
                    : toTimestamp(
                        moment(dayDetails?.dateString, 'MMM DD').format(
                          dateFormat_YYYY_MM_DD_HH_mm_ss,
                        ),
                      ) <
                      toTimestamp(
                        moment(
                          moment().format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                          dateFormat_YYYY_MM_DD_HH_mm_ss,
                        ),
                      )
                    ? 'checkin-gray'
                    : 'checkin-white'
                }
              >
                <td className="out-office">
                  <div className="table-img d-flex align-items-center ">
                    <span>You have no bookings</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const diffBetweenTwoTimes = (t1, t2) => {
    const seconds = Math.abs((t1.getTime() - t2.getTime()) / 1000);
    return seconds;
  };

  const convertheBookingTimeToLocalTime = (obj, time, timezone) => {
    const addDateAndTime = new Date(obj.user_booking_date + ' ' + time);
    const currntTimeInEuropeLondon = changeTimeZone(timezone, addDateAndTime);
    const changedTime = new Date(
      obj?.user_booking_date + ' ' + currntTimeInEuropeLondon?.split(' ')?.[1],
    );
    const getSysTime =
      addDateAndTime.getTime() -
      (changedTime.getTime() - addDateAndTime.getTime());
    const convertedTime = moment(new Date().setTime(getSysTime)).format(
      getPreferedTimeFormat(),
    );

    return convertedTime ? convertedTime : time;
  };

  const getClassName = assetType => {
    switch (assetType) {
      case 'holiday-icon':
        return 'shedule-table-dark-blue';
      case 'Workspace':
        return 'shedule-table-lite-orange';
      case 'Parking':
        return 'shedule-table-dark-orange';
      case 'Room':
        return 'shedule-table-medium-orange';
      case 'home-remotely':
        return 'shedule-table-dark-gray';
      case 'sickness-icon':
        return 'shedule-table-light-blue';
      case 'other-icon':
        return 'shedule-table-dark-blue';
      case 'out-of-icon':
        return 'shedule-table-light-blue';
      case 'client-site-icon':
        return 'shedule-table-medium-gray';
      case 'in-office':
        return 'shedule-table-inoffice-orange';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="table-responsive table-dashboard">
        <div className="office-list">
          <div className="office-list-content">
            <span>
              {dayDetails?.dateString == moment(new Date()).format('MMM DD') ? (
                <span>
                  {findLabelText(
                    LabelText.today,
                    LabelText.today,
                    LabelText.dashboard,
                  ) || LabelText.today}{' '}
                </span>
              ) : dayDetails?.dateString ==
                moment(new Date()).format(dateFormat_MMM_DD) ? (
                LabelText.today
              ) : (
                <>
                  {dayDetails?.day
                    ? dayDetails?.day?.substring(0, 3) +
                      ' ' +
                      dayDetails?.dateString?.split(' ')?.[1]
                    : moment(new Date(dayDetails?.date)).format(
                        dateFormat_ddd_DD,
                      )}
                </>
              )}
            </span>
          </div>
        </div>
        {selectedTap?.length > 0 &&
        dayDetails?.book_data?.length > 0 &&
        checkis?.length > 0 ? (
          <div
            className={`table-info-details ${
              dayDetails?.dateString == moment(new Date()).format('MMM DD')
                ? 'table-info-details-today'
                : ''
            }${
              dayDetails?.day === DayList.Sunday
                ? 'table-info-details-none'
                : ''
            }
            }`}
          >
            {checkis?.map((final: DayDetailsFinalProps, index: number) => {
              const currentDateAndTime = moment(
                changeTimeZone(
                  final?.checkout_end_time
                    ? final?.timezone
                    : final?.end_timezone,
                ),
                dateFormat_DD_MM_YYYY_with_time,
              ).format(dateFormat_YYYY_MM_DD_HH_mm_ss);
              const checkOutEndTime = final?.checkout_end_time
                ? final?.checkout_end_time
                : final?.user_booking_date + ' ' + final?.end_time + ':00';
              // AUTO CHECKIN ============
              if (
                final?.check_in_require == 1 &&
                final?.booking_status == 1 &&
                final?.checkin_status == 0 &&
                !final?.cancel_time &&
                toTimestamp(
                  moment(
                    final?.checkin_start_time,
                    dateFormat_YYYY_MM_DD_HH_mm,
                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                ) <=
                  toTimestamp(
                    moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                  ) &&
                toTimestamp(
                  moment(
                    currentDateAndTime,
                    dateFormat_YYYY_MM_DD_HH_mm,
                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                ) <
                  toTimestamp(
                    moment(checkOutEndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                  )
              ) {
                if (!checkInApiCallStart) {
                  updateCheckInApiCallFlag(true);
                  autoCheckInOutBooking(
                    final?.id,
                    1,
                    'Checkin',
                    index,
                    final?.timezone,
                  );
                }
              }
              // AUTO CHECKIN ============
              const flag = selectedTap.includes(
                final?.floorplan_type_id || null,
              );
              // -----------Auto Checkout After Booking ENd TIME
              if (
                final?.checkin_status == 1 &&
                (toTimestamp(
                  moment(checkOutEndTime, dateFormat_YYYY_MM_DD_HH_mm).format(
                    dateFormat_YYYY_MM_DD_HH_mm_ss,
                  ),
                ) ==
                  toTimestamp(
                    moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                  ) ||
                  toTimestamp(
                    moment(checkOutEndTime, dateFormat_YYYY_MM_DD_HH_mm).format(
                      dateFormat_YYYY_MM_DD_HH_mm_ss,
                    ),
                  ) <=
                    toTimestamp(
                      moment(
                        currentDateAndTime,
                        dateFormat_YYYY_MM_DD_HH_mm_ss,
                      ),
                    ))
              ) {
                const endTS = toTimestamp(
                  moment(checkOutEndTime, dateFormat_YYYY_MM_DD_HH_mm).format(
                    dateFormat_YYYY_MM_DD_HH_mm_ss,
                  ),
                );
                const cTS = toTimestamp(
                  moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                );
                if (!checkInApiCallStart) {
                  updateCheckInApiCallFlag(true);
                  autoCheckInOutBooking(
                    final?.id,
                    1,
                    'Checkout',
                    index,
                    final?.timezone,
                  );
                }
              }
              // -----------Auto Checkout After Booking ENd TIME

              // -----------Auto Cancel After cancel_time end
              if (
                final?.cancel_time &&
                final?.checkin_status == 0 &&
                final?.is_cancel == 0 &&
                toTimestamp(
                  moment(
                    final?.cancel_time,
                    dateFormat_YYYY_MM_DD_HH_mm,
                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                ) <=
                  toTimestamp(
                    moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                  )
              ) {
                const endTS = toTimestamp(
                  moment(
                    final?.cancel_time,
                    dateFormat_YYYY_MM_DD_HH_mm,
                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                );
                const cTS = toTimestamp(
                  moment(currentDateAndTime, dateFormat_YYYY_MM_DD_HH_mm_ss),
                );
                if (!checkInApiCallStart) {
                  updateCheckInApiCallFlag(true);
                  autoCancelBooking(final?.id, index, final?.timezone);
                }
              }
              if (
                final?.is_cancel == 0 &&
                final?.checkin_status == 0 &&
                isPastDate(
                  final?.checkout_end_time,
                  moment(
                    changeTimeZone(final?.timezone),
                    dateFormat_DD_MM_YYYY_with_time,
                  ),
                )
              ) {
                if (!checkInApiCallStart) {
                  updateCheckInApiCallFlag(true);
                  autoCancelBooking(final?.id, index, final?.timezone);
                }
              }
              // -----------Auto Cancel After cancel_time end
              return final?.is_cancel === 0 ? (
                <div className="box-shadow-style" key={index}>
                  <table
                    className={`table shedule-table ${getClassName(
                      final?.workspace_type,
                    )}`}
                  >
                    <tbody>
                      <tr
                        key={index}
                        className={stylehange(
                          final?.checkin_status,
                          isPastDate(checkOutEndTime, currentDateAndTime),
                          status(final?.checkin_status),
                        )}
                      >
                        <td className="workspacename workspacename-info">
                          <div className="table-img d-flex align-items-center">
                            <img
                              src={selectIcon(final?.workspace_type)}
                              alt="img"
                            />{' '}
                            <p>{final?.workspace_name}</p>
                          </div>
                        </td>
                        <td className="text-overflowhidden">
                          {final?.location_name ? (
                            <div className="table-img d-flex align-items-center">
                              <div className="table-img-info">
                                {stringSplit(final?.location_name)}
                              </div>
                              <Link
                                to={
                                  final?.checkin_status == 2
                                    ? '#'
                                    : '/user-view-locate'
                                }
                                state={{
                                  search_id: final?.workspace_id,
                                  search_location_id: final?.location_id,
                                  search_location_name: final?.location_name,
                                  search_name: final?.workspace_name,
                                  search_type: final?.workspace_type,
                                }}
                              >
                                <img
                                  src={locations}
                                  alt="img"
                                  className="me-0 ms-3"
                                />
                              </Link>
                            </div>
                          ) : (
                            <>
                              <span className="empty-location"></span>
                            </>
                          )}
                        </td>
                        {final?.start_time && final?.end_time && (
                          <>
                            <td className="table-time-info">
                              <div className="d-flex align-items-center">
                                <div className="table-time">
                                  <p>
                                    <img src={TimeleftIcon} alt="img" />{' '}
                                    {final?.checkin_time != null
                                      ? convertheBookingTimeToLocalTime(
                                          final,
                                          final?.checkin_time?.split(' ')?.[1],
                                          final?.timezone,
                                        )
                                      : convertheBookingTimeToLocalTime(
                                          final,
                                          final?.start_time,
                                          final?.start_timezone,
                                        )}
                                  </p>
                                  <p>
                                    <img src={TimeRightIcon} alt="img" />{' '}
                                    {final?.checkout_time != null
                                      ? convertheBookingTimeToLocalTime(
                                          final,
                                          final?.checkout_time.split(' ')?.[1],
                                          final?.timezone,
                                        )
                                      : convertheBookingTimeToLocalTime(
                                          final,
                                          final?.end_time,
                                          final?.end_timezone,
                                        )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="edit-dash">
                              {isPastDate(
                                checkOutEndTime,
                                currentDateAndTime,
                              ) ||
                              status(final?.checkin_status) ||
                              final?.booking_status ==
                                BOOKING_STATUS.HR_LEAVE_APPROVED ||
                              final?.host_userid != userDetails?.id ? null : (
                                <Link
                                  to="#"
                                  onClick={() => {
                                    final?.id == editQuickOpen?.data?.id
                                      ? null
                                      : handleEditBooking(final);
                                  }}
                                >
                                  <img src={EditIcon} alt="img" />
                                </Link>
                              )}
                            </td>
                          </>
                        )}
                        <td className="text-end table-check-btn workspacename">
                          {final?.booking_status == 4 ? (
                            <>
                              {' '}
                              <div
                                className={'hr-leave-pending'}
                                style={{ float: 'right' }}
                              >
                                <h6>{LabelText.pending}</h6>
                              </div>
                              <div
                                className="hr-leave-request-text"
                                style={{ float: 'right' }}
                              >
                                <p>
                                  {LabelText.requested_on + ' '}
                                  {getUserPreferedDateFormat(
                                    final?.asset_requested_on,
                                  )}
                                </p>
                              </div>
                            </>
                          ) : (
                            final?.booking_status == 1 &&
                            (final.checkin_status == 0 &&
                            !isPastDate(checkOutEndTime, currentDateAndTime) &&
                            ((final?.cancel_time &&
                              compareDates(
                                final?.checkin_start_time,
                                final?.cancel_time,
                                final?.timezone,
                              )) ||
                              ((final?.cancel_time == null ||
                                final?.cancel_time == '' ||
                                final?.cancel_time == undefined) &&
                                toTimestamp(
                                  moment(
                                    final?.checkin_start_time,
                                    dateFormat_YYYY_MM_DD_HH_mm,
                                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                                ) <=
                                  toTimestamp(
                                    moment(
                                      currentDateAndTime,
                                      dateFormat_YYYY_MM_DD_HH_mm_ss,
                                    ),
                                  ) &&
                                toTimestamp(
                                  moment(
                                    currentDateAndTime,
                                    dateFormat_YYYY_MM_DD_HH_mm,
                                  ).format(dateFormat_YYYY_MM_DD_HH_mm_ss),
                                ) <
                                  toTimestamp(
                                    moment(
                                      checkOutEndTime,
                                      dateFormat_YYYY_MM_DD_HH_mm_ss,
                                    ),
                                  ))) ? (
                              final?.qr_checkin == 0 &&
                              final?.check_in_require != 1 &&
                              final?.host_userid == userDetails?.id && (
                                <Link
                                  to="#"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    checkInOutBooking(
                                      final?.id,
                                      1,
                                      'Checkin',
                                      index,
                                      final?.timezone,
                                    )
                                  }
                                >
                                  {findLabelText(
                                    LabelText.Check_in,
                                    LabelText.Checkin,
                                    LabelText.locate,
                                  )}
                                </Link>
                              )
                            ) : final?.checkin_status == 1 &&
                              compareDates(
                                currentDateAndTime,
                                checkOutEndTime,
                                final?.checkout_end_time
                                  ? final?.timezone
                                  : final?.end_timezone,
                              ) ? (
                              <Link
                                to="#"
                                className="btn btn-primary"
                                onClick={() =>
                                  checkInOutBooking(
                                    final?.id,
                                    1,
                                    'Checkout',
                                    index,
                                    final?.timezone,
                                  )
                                }
                              >
                                {findLabelText(
                                  LabelText.Check_out,
                                  LabelText.Checkout,
                                  LabelText.locate,
                                )}
                              </Link>
                            ) : null)
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : checkis?.length == 0 ? (
                emptyContainer(index)
              ) : (
                emptyContainer(index)
              );
            })}
          </div>
        ) : (
          emptyContainer(null)
        )}
      </div>
    </>
  );
};

export default DayDetails;
