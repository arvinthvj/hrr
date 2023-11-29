import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { bookLocation } from '../../components/imagepath';
import { RoomBookigParticipants } from './roomBookingParticipants';
import { colorCodeValues, findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import {
  changeTimeZone,
  convertheBookingTimeToLocalTimeForValidation,
  findLabelText,
  getUserPreferedDateFormat,
  validateOnBehalfOfUser,
  validateStartEndTime,
} from '../../components/commonMethod';
import { OnBeHalf } from '../../components/onBeHalf';
import {
  AssetStatusIds,
  DeskLabelText,
} from '../../components/locateComponent/constants';
import {
  dateFormat_YYYY_MM_DD,
  disableBtn,
} from '../../assets/constants/config';

import StartEndTimePickerWithTimeZone from '../../components/startEndTimePickerWithTimeZone';
import {
  CheckAssetStatus,
  GetCheckinStatus,
  NewUpdatedBooking,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

export default function DeskClick({
  data,
  date,
  setMouseClick,
  locationValue,
  userDetails,
  handleBooking,
  handleDeleteBooking,
  startTime,
  endTime,
  getTimezoneStartTime,
  getTimezoneEndTime,
  timeZone,
  timeZoneId
}) {
  interface LanguageProps {
    language: {
      languages: {
        Team_Management: any;
        Common_Values: any;
        Dashboard: any;
        Location: any;
        Team: any;
        Settings: any;
        Locate: any;
      };
    };
  }
  type errorProps = {
    subject: string;
    comments: string;
  };
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<errorProps>({
    resolver: yupResolver(schema),
  });
  const [dateData, setDate] = useState<any>({});
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const [showParticipants, setShowParticipants] = useState(false);
  const [bookedFor, updateBookedFor] = useState(''); // Behalf of =
  const [deleteOnBehalf, setDeleteOnBehalf] = useState(false);
  const [startTimezone, setStartTimezone] = useState<any>({});
  const [endTimezone, setEndTimezone] = useState<any>({});
  const [datas, setDatas] = useState<any>(data);
  const [initials, setInitials] = useState<any>(false);
  const [bookforClear, setBookforClear] = useState<any>(false);
  const [checkinStatus, setCheckinStatus] = useState(0);
  const [registration, setRegistration] = useState(
    userDetails?.vehicle_register_no,
  );
  useEffect(() => {
    if (data?.comments) {
      setValue('comments', data.comments);
    } else {
      reset({ comments: '' });
    }
    data?.booking_id ? getCheckinStatus(data?.booking_id) : setCheckinStatus(0);
    data?.booking_id
      ? setRegistration(data?.registration)
      : setRegistration(userDetails?.vehicle_register_no);
    dateUpdate();
  }, [data?.asset_id, deleteOnBehalf]);

  const getCheckinStatus = bookid => {
    const payload = {
      booking_id: bookid,
    };
    postData(GetCheckinStatus, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setCheckinStatus(data?.checkin_status);
      }
    });
  };

  const iconStyle = {
    position: 'absolute',
    right: '10px',
  };

  const dateUpdate = () => {
    setDatas(data);
    updateBookedFor('');
    setBookforClear(!bookforClear);
    timeZoneChanges(false, date);
    if (data?.booking_id) {
      setDate({
        date: new Date(data?.booking_date),
        startTime: data?.default_start_time,
        endTime: data?.default_end_time,
      });
    } else {
      setDate({
        date: date,
        startTime: startTime,
        endTime: endTime,
      });
    }
  };
  const timeZoneChanges = (isTimeUpdated, selectDate) => {
    const sTime = data?.stimezone ? data?.stimezone : timeZone;
    const eTime = data?.etimezone ? data?.etimezone : timeZone;
    const zoneNameS_Split = sTime?.split('/');
    const zoneNameE_Split = eTime?.split('/');
    const startTimeZone = {
      value: sTime,
      label: `${zoneNameS_Split?.[1]} , ${zoneNameS_Split?.[0]}`,
      name: sTime,
    };
    const endTimeZone = {
      value: eTime,
      label: `${zoneNameE_Split?.[1]} , ${zoneNameE_Split?.[0]}`,
      name: eTime,
    };
    setStartTimezone(startTimeZone);
    setEndTimezone(endTimeZone);
    isTimeUpdated &&
      updateStartEndTimeWithTimezone(
        startTimeZone,
        endTimeZone,
        userDetails,
        selectDate,
      );
  };
  const getStartTime = (sTime = '') => {
    let start_time = '07:00';
    sTime = sTime ? sTime : userDetails?.start_working_hour;
    if (
      moment(new Date(date)).format('DD/MM/yyyy') ==
      moment(new Date()).format('DD/MM/yyyy')
    ) {
      if (moment(date).format('HH:mm') > sTime)
        start_time = moment(date).add(5, 'm').format('HH:mm');
      else start_time = sTime;
    } else {
      start_time = sTime;
    }
    return start_time;
  };
  const getEndTime = (eTime = '') => {
    let end_time = '20:00';
    eTime = eTime ? eTime : userDetails?.end_working_hour;
    if (
      moment(new Date(date)).format('DD/MM/yyyy') ==
      moment(new Date()).format('DD/MM/yyyy')
    ) {
      if (moment(date).format('HH:mm') > eTime) end_time = '23:00';
      else end_time = eTime;
    } else {
      end_time = eTime;
    }
    return end_time;
  };
  const getStartTimeSlot = (start_time, timeZone, newDate, selectDate) => {
    if (
      moment(newDate).format('DD/MM/YYYY') ==
      moment(
        changeTimeZone(timeZone, new Date(selectDate)),
        'DD/MM/YYYY HH:mm',
      ).format('DD/MM/YYYY')
    ) {
      if (
        moment(changeTimeZone(timeZone), 'DD/MM/YYYY HH:mm').format('HH:mm') >
        start_time
      ) {
        start_time = moment(changeTimeZone(timeZone), 'DD/MM/YYYY HH:mm')
          .add(5, 'm')
          .format('HH:mm');
      } else start_time = start_time;
    } else {
      start_time = start_time;
    }
    return start_time;
  };
  const getEndTimeSlot = (end_time, timeZone, selectDate) => {
    if (
      moment(
        changeTimeZone(timeZone, new Date(selectDate)),
        'DD/MM/YYYY HH:mm',
      ).format('DD/MM/YYYY') ==
      moment(changeTimeZone(timeZone), 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')
    ) {
      if (
        moment(
          changeTimeZone(timeZone, new Date(selectDate)),
          'DD/MM/YYYY HH:mm',
        ).format('HH:mm') > end_time
      )
        end_time = '23:00';
      else end_time = end_time;
    } else {
      end_time = end_time;
    }
    return end_time;
  };

  const updateStartEndTimeWithTimezone = (
    timezoneObj,
    endTimeZone,
    userdetail,
    selectDate,
  ) => {
    if (timezoneObj?.name) {
      const newDate = moment(
        changeTimeZone(timezoneObj?.name),
        'DD/MM/YYYY HH:mm',
      );
      const date = moment(newDate).format('MM/DD/YYYY');
      const sTime = new Date(
        date +
          ' ' +
          getStartTimeSlot(
            userdetail?.start_working_hour,
            timezoneObj?.name,
            newDate,
            selectDate,
          ),
      );
      const finalStartTime = moment(sTime).format('HH:mm');
      const eTime = new Date(
        date +
          ' ' +
          getEndTimeSlot(
            userdetail?.end_working_hour,
            endTimeZone?.name,
            selectDate,
          ),
      );
      const finalEndTime = moment(eTime).format('HH:mm');
      setDate({
        ...dateData,
        date: selectDate,
        startTime: finalStartTime,
        endTime: finalEndTime,
      });
    }
  };

  const handleBook = () => {
    const payload = {
      floorplan_type_id: String(datas?.asset_type),
      plan_id: String(datas?.asset_id),
      location_id: locationValue?.value
        ? locationValue?.value
        : userDetails?.location[0]?.id,
      date: moment(dateData.date).format(dateFormat_YYYY_MM_DD),
      start_time: dateData?.startTime,
      end_time: dateData?.endTime,
      registration: datas?.asset_type_name == 'Parking' ? registration : '',
      book_for: bookedFor ? bookedFor : '',
      asset_status_id: datas?.user_asset_status,
      start_timezone: startTimezone?.name,
      end_timezone: endTimezone?.name,
      asset_timezone: timeZone,
      timezone_id: timeZoneId,
      comments: getValues('comments') ? getValues('comments') : '',
    };
    handleBooking(payload);
    setMouseClick('');
  };
  const handleDelete = () => {
    const delBook = {
      booking_id: datas?.booking_id,
    };
    handleDeleteBooking(delBook);
  };
  const ColorCode = () => {
    switch (datas?.asset_color) {
      case colorCodeValues.booked:
        return ['booking-booked', 'Booked'];
      case colorCodeValues.available:
        return ['booking-available', 'Available'];
      case colorCodeValues.unavailable:
        return ['booking-unavailable', 'Unavailable'];
      case colorCodeValues.bookedme:
        return ['booked-me', 'Booked by me'];
      case colorCodeValues.byRequest:
        return ['by-request', 'By Request'];
      default:
        ['booking-unavailable', 'Unavailable'];
    }
  };
  const colorClass = ColorCode();
  const addDays = days => {
    const dateArr: any = [];
    for (let i = 1; i <= days; i++) {
      const ddate = new Date();
      ddate.setDate(ddate.getDate() + i);
      dateArr.push(ddate);
    }
    return dateArr;
  };
  const handleChange = currentdate => {
    setDate({
      ...dateData,
      date: currentdate,
    });
    setInitials(true);
    timeZoneChanges(true, currentdate);
  };
  const isRoom = datas?.asset_type_name == 'Room' ? true : false;
  useEffect(() => {
    if (datas && initials) {
      if (
        validateStartEndTime(
          dateData?.startTime,
          dateData?.endTime,
          startTimezone?.name,
          endTimezone?.name,
          dateData?.date,
        )
      ) {
        updateAssert();
      } else {
        const dataList = { ...datas, asset_color: '#DCDCDC' };
        setDatas(dataList);
      }
    }
  }, [
    dateData?.startTime,
    dateData?.endTime,
    startTimezone,
    endTimezone,
    dateData?.date,
  ]);
  const updateAssert = () => {
    const checkPayLoad = {
      floorplan_type_id: datas?.asset_type_id,
      date: moment(dateData?.date).format(dateFormat_YYYY_MM_DD),
      start_time: dateData?.startTime,
      end_time: dateData?.endTime,
      start_timezone: startTimezone?.name,
      end_timezone: endTimezone?.name,
      location_id: locationValue?.value
        ? locationValue?.value
        : userDetails?.location[0].id,
      asset_id: data?.asset_id,
      book_for: bookedFor ? bookedFor : '',
    };
    const editPayload = {
      floorplan_type_id: datas?.asset_type_id,
      plan_id: String(datas?.asset_id),
      date: moment(dateData?.date).format(dateFormat_YYYY_MM_DD),
      location_id: locationValue?.value
        ? locationValue?.value
        : userDetails?.location[0].id,
      start_time: checkinStatus == 1 ? '' : startTime,
      end_time: endTime,
      start_timezone: startTimezone?.name,
      end_timezone: endTimezone?.name,
      asset_status_id: datas?.user_asset_status,
      book_for: bookedFor ? bookedFor : '',
      participants: '',
      subjects: '',
      comments: '',
      registration: datas?.registration,
      booking_id: datas?.booking_id,
      statustype: 'assetstatus',
    };

    const payLoad = datas?.booking_id ? editPayload : checkPayLoad;
    const url = datas?.booking_id ? NewUpdatedBooking : CheckAssetStatus;

    postData(url, payLoad, data => {
      if (data?.asset_status) {
        const status = getAssetStatus(data?.asset_status);
        const dataList = { ...datas, asset_color: status };
        setDatas(dataList);
      }
    });
  };

  const getStatusColor = status => {
    let colorCode = '';
    switch (status) {
      case 1:
        colorCode = colorCodeValues.available;
        break;
      case 2:
        colorCode = colorCodeValues.byRequest;
        break;
      case 3:
        colorCode = colorCodeValues.unavailable;
        break;
      default:
        colorCode = colorCodeValues.unavailable;
        break;
    }
    return colorCode;
  };

  const getAssetStatus = status => {
    if (data?.booking_id) {
      if (
        // startTimezone?.name == datas?.stimezone &&
        // endTimezone?.name == datas?.etimezone &&
        moment(dateData?.date).format(dateFormat_YYYY_MM_DD) ==
        datas?.booking_date
      ) {
        if (
          convertheBookingTimeToLocalTimeForValidation(
            datas?.booking_date,
            dateData?.startTime,
            startTimezone?.name,
          ) >=
            convertheBookingTimeToLocalTimeForValidation(
              datas?.booking_date,
              datas?.default_start_time,
              datas?.stimezone,
            ) &&
          convertheBookingTimeToLocalTimeForValidation(
            datas?.booking_date,
            dateData?.endTime,
            endTimezone?.name,
          ) <=
            convertheBookingTimeToLocalTimeForValidation(
              datas?.booking_date,
              datas?.default_end_time,
              datas?.etimezone,
            ) &&
          convertheBookingTimeToLocalTimeForValidation(
            datas?.booking_date,
            dateData?.startTime,
            startTimezone?.name,
          ) <=
            convertheBookingTimeToLocalTimeForValidation(
              datas?.booking_date,
              dateData?.endTime,
              endTimezone?.name,
            )
          // if (
          //   dateData?.startTime >= datas?.default_start_time &&
          //   dateData?.endTime <= datas?.default_end_time &&
          //   dateData?.startTime <= dateData?.endTime
        ) {
          return data?.asset_color;
        } else {
          const statusId = getStatusColor(status);
          return statusId;
        }
      } else {
        const statusId = getStatusColor(status);
        return statusId;
      }
    } else {
      const statusId = getStatusColor(status);
      return statusId;
    }
  };
  // useEffect(() => {
  //   setDate({
  //     ...dateData,
  //     startTime: data?.booking_id
  //       ? data?.default_start_time
  //       : startTime
  //       ? moment(dateData?.date).format(dateFormat_YYYY_MM_DD) ===
  //         moment(new Date()).format(dateFormat_YYYY_MM_DD)
  //         ? getTimezoneStartTime(startTime, timeZone, dateData?.date)
  //         : moment(dateData?.date).format(dateFormat_YYYY_MM_DD) ===
  //           moment(date).format(dateFormat_YYYY_MM_DD)
  //         ? getStartTime(startTime)
  //         : userDetails?.start_working_hour
  //       : dateData?.startTime,
  //     endTime: data?.booking_id
  //       ? data?.default_end_time
  //       : endTime
  //       ? moment(dateData?.date).format(dateFormat_YYYY_MM_DD) ===
  //         moment(new Date()).format(dateFormat_YYYY_MM_DD)
  //         ? getTimezoneEndTime(endTime, timeZone, dateData?.date)
  //         : moment(dateData?.date).format(dateFormat_YYYY_MM_DD) ===
  //           moment(date).format(dateFormat_YYYY_MM_DD)
  //         ? getEndTime(endTime)
  //         : userDetails?.end_working_hour
  //       : dateData?.endTime,
  //     date: date ? date : dateData?.date,
  //   });
  // }, [data, data?.booking_id]);
  return (
    <>
      <div className={`card book-card locates-sidebar locate-desk-booked-me`}>
        <div className="quick-book-header desk-header quick-booking-header">
          <div className="booking-group">
            <div className="d-flex align-items-center">
              <Link to="#" onClick={() => setMouseClick('')}>
                <i className="fas fa-angle-left" />
              </Link>
              <h4>
                {findLabelText(
                  DeskLabelText.Book,
                  DeskLabelText.Book,
                  DeskLabelText.Locate,
                )}
              </h4>
              {datas?.booking_id &&
                datas?.asset_color != colorCodeValues.booked && (
                  <span style={iconStyle}>
                    <Link to="#" className="delete-icon" onClick={handleDelete}>
                      <i className="feather-trash-2" />
                    </Link>
                  </span>
                )}
            </div>
          </div>
        </div>

        {datas?.booking_id && (
          <div className="booked-profile">
            <div className="table-avatar user-profile">
              <div className="work-name-img">
                <div className="active-profile">
                  <span />
                </div>
                {datas?.profile_image ? (
                  <span>
                    <GetImgaeFromS3Bucket
                      imageFile={datas?.profile_image}
                      type={'image'}
                      FilePath=""
                      userDetail={datas}
                      name={findFirstName(datas?.booking_username)}
                      style={'hr'}
                    />
                  </span>
                ) : (
                  <span className="user-firstletter">
                    {findFirstName(datas?.booking_username)}
                  </span>
                )}
              </div>
              <div>
                <h5>
                  <span>{datas?.booking_username}</span>
                </h5>
              </div>
              <div className="names-icons">
                {datas?.hs_roles?.map(val => {
                  return (
                    <span key={val?.id}>
                      <GetImgaeFromS3Bucket
                        imageFile={val?.health_safety_icons}
                        type={'image'}
                        FilePath="ghs"
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {datas?.asset_color && (
          <form action="#">
            {showParticipants ? (
              <RoomBookigParticipants
                data={datas}
                label={findLabelText(
                  DeskLabelText.Book,
                  DeskLabelText.Book,
                  DeskLabelText.Locate,
                )}
                goBack={() => {
                  setShowParticipants(false);
                }}
                onSubmit={details => {
                  const payload = {
                    floorplan_type_id: String(datas?.asset_type),
                    plan_id: String(datas?.asset_id),
                    location_id: locationValue?.value
                      ? locationValue?.value
                      : userDetails?.location[0]?.id,
                    date: moment(dateData?.date).format(dateFormat_YYYY_MM_DD),
                    start_time: dateData?.startTime,
                    end_time: dateData?.endTime,
                    participants: details.participants,
                    subjects: details.subjects,
                    comments: details.comments,
                    start_timezone: startTimezone?.name,
                    end_timezone: endTimezone?.name,
                    teams: details.teams,
                    zoom: details.zoom,
                    google: details.google,
                    book_for: bookedFor ? bookedFor : '',
                    asset_status_id: datas?.user_asset_status,
                    external_participants: details?.external_participants,
                    registration: '',
                    asset_timezone: timeZone,
                    timezone_id: timeZoneId,
                  };
                  setShowParticipants(false);
                  handleBooking(payload);
                }}
              />
            ) : (
              <>
                <div className="card-body">
                  <div className="booking-date">
                    <span>
                      {findLabelText(
                        DeskLabelText.Data,
                        DeskLabelText.Data,
                        DeskLabelText.Locate,
                      )}
                    </span>
                    <div
                      className={`booking-date-picker ${
                        datas?.asset_color == '#D99797' ? 'hover-none' : ''
                      }`}
                    >
                      <DatePicker
                        selected={dateData?.date}
                        disabled={
                          datas?.asset_color == '#D99797' || checkinStatus == 1
                            ? true
                            : false
                        }
                        onChange={handleChange}
                        value={
                          moment(dateData?.date).format(
                            dateFormat_YYYY_MM_DD,
                          ) !== moment(new Date()).format(dateFormat_YYYY_MM_DD)
                            ? getUserPreferedDateFormat(dateData?.date)
                            : findLabelText(
                                DeskLabelText.Today,
                                DeskLabelText.Today,
                                DeskLabelText.Locate,
                              ) +
                              ',' +
                              getUserPreferedDateFormat(dateData?.date)
                        }
                        type="text"
                        className="form-control form-control-date datetimepicker"
                        includeDates={[new Date(), ...addDays(300)]}
                        suffixIcon={null}
                        minDate={moment().toDate()}
                      />
                    </div>
                  </div>
                  <StartEndTimePickerWithTimeZone
                    startTime={dateData?.startTime}
                    endTime={dateData?.endTime}
                    setStartTime={time => {
                      setDate({
                        ...dateData,
                        startTime: time,
                      });
                      setInitials(true);
                    }}
                    setEndTime={time => {
                      setDate({
                        ...dateData,
                        endTime: time,
                      });
                      setInitials(true);
                    }}
                    minWidth={'140px'}
                    startTimezone={startTimezone}
                    setStartTimezone={time => {
                      setStartTimezone(time);
                      setInitials(true);
                    }}
                    endTimezone={endTimezone}
                    setEndTimezone={time => {
                      setEndTimezone(time);
                      setInitials(true);
                    }}
                    disabled={
                      datas?.asset_color == colorCodeValues.booked ||
                      checkinStatus == 1
                        ? true
                        : false
                    }
                    endDisabled={
                      datas?.asset_color == colorCodeValues.booked ||
                      (checkinStatus == 1 &&
                        datas?.user_asset_status == AssetStatusIds.byRequest &&
                        datas?.asset_color == colorCodeValues?.bookedme)
                        ? true
                        : false
                    }
                    isLocatePage={true}
                    // startTimeDisable={
                    //   datas?.user_asset_status == AssetStatusIds.byRequest &&
                    //   datas?.asset_color == colorCodeValues?.bookedme
                    //     ? moment(datas?.default_start_time, timeFormat_24)
                    //         .subtract(1, "minutes")
                    //         .format(timeFormat_24)
                    //     : ""
                    // }
                    // endTimeDisable={
                    //   datas?.user_asset_status == AssetStatusIds.byRequest &&
                    //   datas?.asset_color == colorCodeValues?.bookedme
                    //     ? moment(datas?.default_end_time, timeFormat_24)
                    //         .add(1, "minutes")
                    //         .format(timeFormat_24)
                    //     : ""
                    // }
                  />
                  {datas?.asset_type_name == 'Workspace' && (
                    <div className="comments-form-group form-group">
                      <Controller
                        name="comments"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <>
                            <textarea
                              maxLength={151}
                              onChange={val => {
                                onChange(val);
                                trigger('comments');
                              }}
                              value={value ? value : ''}
                              className="form-control"
                              placeholder={findLabelText(
                                DeskLabelText.Comments,
                                DeskLabelText.Comments,
                                DeskLabelText.Locate,
                              ) + '\n\n\n\n Max 150 characters'}
                            />
                            {errors?.comments?.message ? (
                              <label className="error-message-text-style">
                                {errors?.comments?.message}
                              </label>
                            ) : null}
                          </>
                        )}
                      />
                    </div>
                  )}
                  {datas?.asset_type_name == 'Parking' && (
                    <div className="booking-date">
                      <span>
                        {languages?.Dashboard
                          ? languages?.Dashboard?.Registration?.name
                          : 'Registration'}
                      </span>
                      <div className="booking-date-picker form-control form-control-date datetimepicker">
                        <input
                          className="form-control"
                          value={registration}
                          type="text"
                          maxLength={10}
                          placeholder={findLabelText(
                            'Registration',
                            'Registration',
                            'Dashboard',
                          )}
                          onChange={e => {
                            setRegistration(e.target.value);
                          }}
                          // readOnly={true}
                        />
                      </div>
                    </div>
                  )}
                  <div className="booking-location-grid">
                    <div className="booking-desk">
                      <div className="booking-desk-info">
                        <span>
                          <img src={bookLocation} alt="img" />
                        </span>
                        <div className="booking-desk-details">
                          <h5>{datas?.asset_name}</h5>
                          <p className="word-break">
                            {locationValue?.label
                              ? locationValue?.label
                              : userDetails?.location[0]?.name}
                          </p>
                          {datas?.asset_capacity && (
                            <p className="word-break">
                              {'Capacity'}
                              <span className="book-capacity-dot"></span>
                              {datas?.asset_capacity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="booking-desk-description">
                      <span>{'Description'}</span>
                      <p>{datas?.asset_description}</p>
                    </div>
                    <div className="booking-desk-list">
                      <ul className="nav">
                        {datas?.asset_amenities_list?.length > 0 &&
                          datas?.asset_amenities_list?.map(a => (
                            <li key={a?.id}>{a?.name}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="booking-group">
                      <div className="d-flex align-items-center">
                        <div className="booking-available">
                          <p>
                            <span className={`ps-0 ${colorClass?.[0]}`} />{' '}
                            {colorClass?.[1]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {validateOnBehalfOfUser() && !datas?.booking_id && (
                    <OnBeHalf
                      deleteOnBehalf={deleteOnBehalf}
                      setDeleteOnBehalf={setDeleteOnBehalf}
                      initials={bookforClear}
                      selectedUser={data => {
                        if (data?.id) {
                          updateBookedFor(data?.id);
                        } else {
                          updateBookedFor('');
                        }
                        // if (data?.vehicle_register_no) {
                          setRegistration(data?.vehicle_register_no);
                        // }
                        if (data?.start_working_hour && data?.end_working_hour)
                          setDate({
                            date: date,
                            startTime: getStartTime(data?.start_working_hour),
                            endTime: getEndTime(data.end_working_hour),
                          });
                      }}
                    />
                  )}
                </div>
                <div className="card-footer">
                  <div className="booking-btns">
                    <button
                      type="submit"
                      className="btn"
                      onClick={() => setMouseClick('')}
                    >
                      {datas?.asset_color === colorCodeValues.available ||
                      datas?.asset_color === colorCodeValues.byRequest
                        ? findLabelText(
                            DeskLabelText.Cancel,
                            DeskLabelText.Cancel,
                            DeskLabelText.Locate,
                          )
                        : findLabelText(
                            DeskLabelText.Back,
                            DeskLabelText.Back,
                            DeskLabelText.Locate,
                          )}
                    </button>

                    {isRoom ? (
                      <>
                        <button
                          style={
                            datas?.asset_color == colorCodeValues.unavailable ||
                            datas?.asset_color == colorCodeValues.booked
                              ? disableBtn
                              : {}
                          }
                          onClick={() => {
                            setShowParticipants(true);
                          }}
                          className="btn btn-primary"
                        >
                          {findLabelText(
                            DeskLabelText.Next,
                            DeskLabelText.Next,
                            DeskLabelText.Locate,
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleBook}
                        type="submit"
                        style={
                          datas?.asset_color == colorCodeValues.unavailable ||
                          datas?.asset_color == colorCodeValues.booked
                            ? disableBtn
                            : {}
                        }
                        className="btn btn-primary"
                      >
                        {datas?.booking_id &&
                        datas?.asset_color != colorCodeValues.booked
                          ? languages?.Location
                            ? languages?.Location?.Save_changes?.name
                            : findLabelText(
                                DeskLabelText.Save_changes,
                                DeskLabelText.Savechanges,
                                DeskLabelText.Locate,
                              )
                          : findLabelText(
                              DeskLabelText.Book,
                              DeskLabelText.Book,
                              DeskLabelText.Locate,
                            )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </>
  );
}
