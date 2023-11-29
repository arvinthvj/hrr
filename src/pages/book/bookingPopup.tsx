import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../services/apicall';
import {
  ApiUrl,
  CheckAssetStatus,
  GetEditBooking,
} from '../../services/apiurl';
import { Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './createschema';
import Toaster from '../../components/toast';
import moment from 'moment';
import {
  changeTimeZone,
  convertheBookingTimeToLocalTimeForValidation,
  findLabelText,
  getEndTime,
  getStartTime,
} from '../../components/commonMethod';
import { PlanTextLabel } from '../../components/planModuleComponent/constants';
import CDatePicker from '../../components/datePicker';
import {
  dateFormat_DD_MM_YYYY_with_slash,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_MM_DD_YYYY_with_slash,
  dateFormat_YYYY_MM_DD,
  timeFormat_24,
} from '../../assets/constants/config';
import StartEndTimePickerWithTimeZone from '../../components/startEndTimePickerWithTimeZone';
import BookPopupAssetCard from '../../components/book/bookPopupAssetCard';
import BookPopupInternalParticipants from '../../components/book/bookPopupInternalParticipants';
import BookPopupExternalParticipants from '../../components/book/bookPopupExternalParticipants';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlinkIcon } from '../../reduxStore/appSlice';
import { BookingContext } from '../../components/context/context';

interface RoomBookingProps {
  details: any;
  location: any;
  capacity: string;
  endTime: string;
  startTime: string;
  close: CallableFunction;
  submit: CallableFunction;
  showBookingPopup: boolean;
  showPageloading: CallableFunction;
  hidePageloading: CallableFunction;
}

export const RoomBooking: React.FC<RoomBookingProps> = ({
  details,
  location,
  capacity,
  startTime,
  endTime,
  submit,
  close,
  showBookingPopup,
  showPageloading,
  hidePageloading,
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<errorProps>({
    resolver: yupResolver(schema),
  });
  interface errorProps {
    subject: string;
    description: string;
  }
  const {
    assetDetails,
    booking_id,
    status_id,
    status,
    full_date,
    booking_user_id,
  } = details;
  const { timezone, timezoneId } = useContext(BookingContext);
  const [startingTime, setStartingTime] = useState(startTime);
  const [endingTime, setEndingTime] = useState(endTime);
  const [bookDate, setBookDate] = useState(full_date);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [externalParticipants, setExternalParticipants] = useState([]);
  const [invalidMail, setInvalidMail] = useState('');
  const [startTimezone, setStartTimezone] = useState<any>({});
  const [endTimezone, setEndTimezone] = useState<any>({});
  const [assetStatusId, setAssetStatusId] = useState(status_id);
  const [exParticipantSearch, setExParticipantSearch] = useState('');

  const { userDetails } = useSelector((state: any) => state?.app);

  const dispatch = useDispatch();

  const disableBtn = {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  };

  const ColorCode = () => {
    switch (assetStatusId?.toString()) {
      case '1':
        return ['available', 'Available'];
      case '3':
        return ['unavailable', 'Unavailable'];
      case '2':
        return ['by-request', 'By Request'];
      default:
        ['booking-available', 'Available'];
    }
  };

  useEffect(() => {
    if (booking_id) {
      getBookedDetails();
    }
  }, []);

  useEffect(() => {
    if (location) {
      if (location?.timezone) {
        const zoneNameSplit = location?.timezone?.split('/');
        const timezoneObj = {
          id: parseInt(location?.timezone_id),
          name: location?.timezone,
          aliasName: location?.utc_format,
          label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
        };
        setStartTimezone(timezoneObj);
        setEndTimezone(timezoneObj);
        updateStartEndTimeWithTimezone(timezoneObj);
      } else {
        const zoneNameSplit = userDetails?.timezone?.split('/');
        const timezoneObj = {
          id: userDetails?.timezone_id,
          name: userDetails?.timezone,
          aliasName: userDetails?.alias_name,
          label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
        };
        setStartTimezone(timezoneObj);
        setEndTimezone(timezoneObj);
        updateStartEndTimeWithTimezone(timezoneObj);
      }
    }
  }, [bookDate]);

  const updateStartEndTimeWithTimezone = timezoneObj => {
    if (timezoneObj?.id) {
      const newDate = moment(
        changeTimeZone(timezoneObj?.name, bookDate),
        dateFormat_DD_MM_YYYY_with_time,
      );
      const date = moment(newDate).format(dateFormat_MM_DD_YYYY_with_slash);
      const sTime = new Date(
        date +
          ' ' +
          getStartTime(
            userDetails?.start_working_hour,
            timezoneObj?.name,
            newDate,
          ),
      );
      const finalStartTime = moment(sTime).format(timeFormat_24);
      setStartingTime(finalStartTime);
      const eTime = new Date(
        date +
          ' ' +
          getEndTime(userDetails?.end_working_hour, timezoneObj?.name, newDate),
      );
      const finalEndTime = moment(eTime).format(timeFormat_24);
      setEndingTime(finalEndTime);
    }
  };

  const validateStartEndTime = () => {
    if (
      moment(
        changeTimeZone(startTimezone?.name, bookDate),
        dateFormat_DD_MM_YYYY_with_time,
      ).format(dateFormat_DD_MM_YYYY_with_slash) ==
      moment(
        changeTimeZone(startTimezone?.name, new Date()),
        dateFormat_DD_MM_YYYY_with_time,
      ).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      const validateStartTime =
        moment(
          changeTimeZone(startTimezone?.name, new Date(bookDate)),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(timeFormat_24) > startingTime
          ? false
          : true;
      const validateEndTime =
        moment(
          changeTimeZone(endTimezone?.name, new Date(bookDate)),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(timeFormat_24) > endingTime
          ? false
          : true;
      const validateStartAndEndTime =
        convertheBookingTimeToLocalTimeForValidation(
          bookDate,
          startingTime,
          startTimezone?.name,
        ) <
        convertheBookingTimeToLocalTimeForValidation(
          bookDate,
          endingTime,
          endTimezone?.name,
        )
          ? true
          : false;
      if (validateStartTime && validateEndTime && validateStartAndEndTime) {
        return true;
      } else {
        return false;
      }
    } else if (
      moment(
        changeTimeZone(startTimezone?.name, new Date(bookDate)),
        dateFormat_DD_MM_YYYY_with_time,
      ) >
      moment(
        changeTimeZone(startTimezone?.name, new Date()),
        dateFormat_DD_MM_YYYY_with_time,
      )
    ) {
      const validateStartAndEndTime =
        convertheBookingTimeToLocalTimeForValidation(
          bookDate,
          startingTime,
          startTimezone?.name,
        ) <
        convertheBookingTimeToLocalTimeForValidation(
          bookDate,
          endingTime,
          endTimezone?.name,
        )
          ? true
          : false;
      return validateStartAndEndTime;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (assetDetails != null && startTimezone?.id && endTimezone?.id) {
      if (validateStartEndTime()) {
        const payLoad = {
          floorplan_type_id: '2',
          date: moment(bookDate).format(dateFormat_YYYY_MM_DD),
          start_time: startingTime,
          end_time: endingTime,
          start_timezone: startTimezone?.name,
          end_timezone: endTimezone?.name,
          location_id: location?.id,
          asset_id: assetDetails?.id,
        };
        postData(CheckAssetStatus, payLoad, (data, res) => {
          if (res?.data?.code == 200) setAssetStatusId(data?.asset_status);
          else setAssetStatusId(3);
        });
      } else {
        setAssetStatusId(3);
      }
    }
  }, [bookDate, startingTime, endingTime, startTimezone?.id, endTimezone?.id]);

  const getBookedDetails = () => {
    showPageloading();
    postData(GetEditBooking, { booking_id: booking_id }, successRes => {
      hidePageloading();
      if (successRes?.subjects) {
        setValue('subject', successRes?.subjects);
      }
      if (successRes?.comments) {
        setValue('description', successRes?.comments);
      }
      if (successRes?.participant_name.length > 0) {
        const list: any = [];
        for (const obj of successRes?.participant_name) {
          const preparData = obj;
          preparData['name'] = obj.first_name + ' ' + obj.last_name;
          list.push(preparData);
        }

        setSelectedMembers(list);
      }
    });
  };

  const deleteRoom = () => {
    showPageloading();
    postData(
      ApiUrl.cancelBooking,
      { booking_id: booking_id },
      (successRes, res) => {
        if (successRes !== 'error') {
          Toaster(res.data.code, res.data.message);
          hidePageloading();
          submit();
        }
      },
    );
  };
  const createOrUpdateRoom = () => {
    const sub = getValues('subject') ? getValues('subject') : '';
    const desc = getValues('description') ? getValues('description') : '';
    const selectedParticipantsId: any = [];
    if (selectedMembers.length > 0) {
      for (const obj of selectedMembers) {
        selectedParticipantsId.push(obj.id);
      }
    }
    if (invalidMail == '' && exParticipantSearch?.trim() != '') {
      externalParticipants?.push(exParticipantSearch);
    }
    const data = {
      capacity: assetDetails?.capacity,
      location_id: location?.id,
      plan_id: assetDetails?.id,
      date: bookDate, // "2022-10-03", //details?.full_date,
      start_time: startingTime
        ? moment(startingTime, 'hh:mm A').format('HH:mm')
        : '', // assetDetails?.start_time,
      end_time: endingTime ? moment(endingTime, 'hh:mm A').format('HH:mm') : '', // assetDetails?.end_time,
      subjects: sub,
      participants: selectedParticipantsId?.toString(),
      comments: desc,
      teams: '',
      google: '',
      zoom: '',
      floorplan_type_id: '2',
      asset_status_id: status_id,
      start_timezone: startTimezone?.name,
      end_timezone: endTimezone?.name,
      external_participants: externalParticipants?.toString(),
      registration: '',
      asset_timezone: timezone,
      timezone_id: timezoneId,
    };

    if (booking_id) {
      data['booking_id'] = booking_id;
    }
    if (invalidMail == '') {
      showPageloading();
      postData(
        booking_id && booking_user_id == userDetails?.id
          ? ApiUrl.updateBooking
          : ApiUrl.addBooking,
        data,
        (successRes, res) => {
          if (res?.data?.code == 200) {
            dispatch(updateBlinkIcon(true));
          }
          hidePageloading();
          if (successRes !== 'error') {
            Toaster(res.data.code, res.data.message);
            setSelectedMembers([]);
            submit();
          }
        },
      );
    }
  };
  return (
    <Modal
      className="room-book-modal"
      style={{
        borderRadius: 10,
      }}
      destroyOnClose={true}
      closable={false}
      show={showBookingPopup}
      onOk={() => {}}
      onCancel={() => {}}
      footer={null}
    >
      <div
        className={`card book-card locates-sidebar locate-desk-booked-me room-book-card`}
      >
        <div className="quick-book-header desk-header">
          <div className="booking-group room-booking-group">
            <div className="room-booking-header">
              <Link to="#" onClick={() => close()}>
                <i className="fas fa-angle-left" />
              </Link>
              <h4>{assetDetails?.name}</h4>
            </div>
            <div className="booking-available">
              <p>
                <span className={`ps-0 ${ColorCode()?.[0]}`} />{' '}
                {ColorCode()?.[1]}
              </p>
            </div>
          </div>
        </div>
        <BookPopupAssetCard
          location={location}
          capacity={capacity}
          assetDetails={assetDetails}
        />

        <CDatePicker
          startDate={new Date(bookDate)}
          setStartDate={date =>
            setBookDate(moment(date).format(dateFormat_YYYY_MM_DD))
          }
        />

        <StartEndTimePickerWithTimeZone
          startTime={startingTime}
          endTime={endingTime}
          setStartTime={setStartingTime}
          setEndTime={setEndingTime}
          startTimezone={startTimezone}
          setStartTimezone={setStartTimezone}
          endTimezone={endTimezone}
          setEndTimezone={setEndTimezone}
        />
        {/* <BookPopupRepeat repeatOptions={mockRepeatOptions} /> */}
        <div className="modal-room-form modal-room-form-info">
          <form action="#">
            <BookPopupInternalParticipants
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />

            <BookPopupExternalParticipants
              setExParticipantSearch={setExParticipantSearch}
              setExternalParticipants={setExternalParticipants}
              setInvalidMail={setInvalidMail}
              invalidMail={invalidMail}
            />

            <div className="form-group">
              <Controller
                name="subject"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      maxLength={101}
                      onChange={val => {
                        onChange(val);
                        trigger('subject');
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                    {errors?.subject?.message ? (
                      <label className="error-message-text-style">
                        {errors?.subject?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <textarea
                      maxLength={151}
                      onChange={val => {
                        onChange(val);
                        trigger('description');
                      }}
                      value={value}
                      className="form-control"
                      placeholder={
                        findLabelText(
                          PlanTextLabel.comments,
                          PlanTextLabel.comments,
                          PlanTextLabel.Push_Notifications,
                        ) +
                        ' (' +
                        findLabelText(
                          PlanTextLabel.optional,
                          PlanTextLabel.optional,
                          PlanTextLabel.Push_Notifications,
                        ) +
                        ')' + '\n\n\n\n Max 150 characters'
                      }
                      defaultValue={''}
                    />
                    {errors?.description?.message ? (
                      <label className="error-message-text-style">
                        {errors?.description?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>

            <div className="form-group modal-room-btns mb-0">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  close();
                }}
              >
                {findLabelText(
                  PlanTextLabel.Cancel,
                  PlanTextLabel.Cancel,
                  PlanTextLabel.Floorplan_Management,
                )}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={assetStatusId == 3 ? disableBtn : {}}
                // className={`"btn btn-primary "${assetStatusId == 3 ? "disable" : ""}`}
                onClick={handleSubmit(createOrUpdateRoom)}
              >
                {findLabelText(
                  PlanTextLabel.Book,
                  PlanTextLabel.Book,
                  PlanTextLabel.Common_Values,
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
