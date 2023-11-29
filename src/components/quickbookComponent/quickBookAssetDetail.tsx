import React, { useContext, useEffect, useState } from 'react';
import {
  QuickBookAssetCardContext,
  QuickBookContext,
  QuickBookDayContext,
  QuickBookTabContext,
} from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { postData } from '../../services/apicall';
import { AddDayBook, NewUpdatedBooking } from '../../services/apiurl';
import {
  SetQuickBookEditOpen,
  setPlanPopup,
  setQuickBookState,
} from '../../reduxStore/quickBookSlice';
import {
  changeTimeZone,
  findLabelText,
  getEndTime,
  getStartTime,
  validateOnBehalfOfUser,
} from '../commonMethod';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import { bookLocation } from '../imagepath';
import { OnBeHalf } from '../onBeHalf';
import {
  hideLoader,
  showLoader,
  updateBlinkIcon,
} from '../../reduxStore/appSlice';
import Toaster from '../toast';
import { setDashboardListUpdate } from '../../reduxStore/dashboardSlice';
import {
  ApiStatusCode,
  AssetStatusIds,
  BookingStatus,
  QuickbookLabels,
  QuickbookSelectIds,
} from './constant';
import { dateFormat_YYYY_MM_DD, global } from '../../assets/constants/config';
type AssetCardProps = {
  loading: boolean;
  setLoading: CallableFunction;
  changeWorkspaces: CallableFunction;
  startTimezone: any;
  endTimezone: any;
  bookedFor: any;
  updateBookedFor: any;
  deleteOnBehalf: any;
  setDeleteOnBehalf: any;
  bookedForDetails: any;
  updateBookedForDetails: any;
  validateStartEndTime: any;
  invalidMail: any;
  exParticipantSearch: any;
  externalParticipants: any;
  registration: any;
  setSelectTimezoneText: any;
};

const QuickBookAssetDetail: React.FC<AssetCardProps> = ({
  loading,
  setLoading,
  changeWorkspaces,
  startTimezone,
  endTimezone,
  bookedFor,
  updateBookedFor,
  deleteOnBehalf,
  setDeleteOnBehalf,
  bookedForDetails,
  updateBookedForDetails,
  validateStartEndTime,
  invalidMail,
  exParticipantSearch,
  externalParticipants,
  registration,
  setSelectTimezoneText,
}) => {
  const {
    setResponseData,
    selectedAsset,
    selectedAssetId,
    setSelectedAssetId,
    chooseFlag,
    setChooseFlag,
    floorId,
    setFloorId,
    timeZone,
    setTimeZone,
    setGotoGlobal,
  } = useContext(QuickBookAssetCardContext);
  const { userDetails } = useSelector((state: any) => state?.app);
  const { quickBookSelect } = useSelector((state: any) => state?.quickBook);
  const { dashboardDayApiList } = useSelector((state: any) => state.dashboard);
  const [btnDisable, setBtnDisable] = useState(false);
  const dispatch = useDispatch();
  const {
    isShowCharValidationMsg,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    subject,
    participants,
    comment,
    bookInitial,
    setBookInitial,
    subjectSetValidate,
  } = useContext(QuickBookContext);
  const { activeDashboardFunction } = useContext(QuickBookTabContext);
  const { editDetails, editBook } = useContext(QuickBookDayContext);

  useEffect(() => {
    if (quickBookSelect && quickBookSelect <= QuickbookSelectIds.remote) {
      if (
        selectedAsset &&
        (selectedAsset?.asset_status == AssetStatusIds.available ||
          selectedAsset?.booking_status == BookingStatus.booked ||
          selectedAsset?.asset_status == AssetStatusIds.byRequest ||
          selectedAsset?.booking_status == BookingStatus.requestBooked) &&
        !isShowCharValidationMsg
      ) {
        setBtnDisable(false);
      } else if (quickBookSelect == 4) {
        setBtnDisable(false);
      } else {
        setBtnDisable(true);
      }
    } else if (validateStartEndTime()) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [
    selectedAsset,
    isShowCharValidationMsg,
    startDate,
    startTime,
    endTime,
    startTimezone?.id,
    endTimezone?.id,
    quickBookSelect,
  ]);

  useEffect(() => {
    if (!editDetails?.data) {
      userDetails?.default_workspace_timezone_name &&
      quickBookSelect == QuickbookSelectIds.workspace
        ? setTimeZone(userDetails?.default_workspace_timezone_name)
        : userDetails?.default_room_timezone_name &&
          quickBookSelect == QuickbookSelectIds.room
        ? setTimeZone(userDetails?.default_room_timezone_name)
        : userDetails?.default_parking_timezone_name &&
          quickBookSelect == QuickbookSelectIds.parking
        ? setTimeZone(userDetails?.default_parking_timezone_name)
        : setTimeZone(userDetails?.timezone);
    }
  }, [userDetails, quickBookSelect]);
  const validateBook = () => {
    if (quickBookSelect == QuickbookSelectIds.room) {
      if (subject != '' && subject != undefined && subject != null) return true;
      else {
        subjectSetValidate(
          global.validationLabel.userManagement.subjectRequird,
        );
        return false;
      }
    } else {
      return true;
    }
  };
  const handleBooking = () => {
    dispatch(showLoader());
    setBtnDisable(true);
    if (!isShowCharValidationMsg) {
      try {
        const participantsId = participants?.map(i => i?.id);
        if (invalidMail == '' && exParticipantSearch?.trim() != '') {
          externalParticipants?.push(exParticipantSearch);
        }
        const Payload = {
          floorplan_type_id: quickBookSelect ? quickBookSelect : 'null',
          plan_id:
            quickBookSelect <= QuickbookSelectIds.parking
              ? selectedAsset?.asset_id
              : editDetails?.data?.id
              ? 0
              : '',
          date: moment(startDate).format(dateFormat_YYYY_MM_DD),
          location_id:
            quickBookSelect > QuickbookSelectIds.parking
              ? userDetails?.location[0]?.id
              : floorId
              ? floorId
              : '',
          start_time: editDetails?.data?.checkin_status > 0 ? '' : startTime,
          end_time: endTime,
          start_timezone: startTimezone?.name,
          end_timezone: endTimezone?.name,
          asset_status_id:
            selectedAsset?.asset_id == editDetails?.data?.workspace_id &&
            selectedAsset?.booking_status == BookingStatus.booked
              ? AssetStatusIds.available
              : quickBookSelect <= QuickbookSelectIds.parking
              ? selectedAsset?.asset_status
              : '',
          book_for: bookedFor ? bookedFor : '',
          participants: participantsId?.toString(),
          subjects: subject,
          comments: comment,
          registration: registration,
          // registration: bookedFor
          //   ? bookedForDetails?.vehicle_register_no
          //   : userDetails?.vehicle_register_no,
          external_participants: externalParticipants?.toString(),
        };
        if (editDetails?.data?.id) {
          Payload['booking_id'] = editDetails?.data?.id;
          Payload['statustype'] = '';
        }
        postData(
          (editDetails?.data?.id &&
            editDetails?.data?.workspace_id == selectedAssetId) ||
            editDetails?.data?.workspace_id == ''
            ? NewUpdatedBooking
            : AddDayBook,
          Payload,
          (data, res) => {
            Toaster(res?.data?.code, res?.data?.message);
            setBtnDisable(false);
            dispatch(hideLoader());
            if (res?.data?.code == ApiStatusCode.SUCCESS) {
              if (bookedFor == '' || bookedFor == null) {
                const newList = JSON.parse(JSON.stringify(dashboardDayApiList));
                if (dashboardDayApiList?.book_data?.length > 0) {
                  const checkData = dashboardDayApiList?.book_data?.findIndex(
                    val => val.id == data.id,
                  );
                  if (checkData >= 0) {
                    newList.book_data.splice(checkData, 1, data);
                  } else {
                    newList.book_data.push(data);
                  }
                }
                dispatch(setDashboardListUpdate(true));
                dispatch(SetQuickBookEditOpen({ openState: false }));
              }
              dispatch(updateBlinkIcon(true));
              activeDashboardFunction();
              setStartTime(getStartTime());
              setEndTime(getEndTime());
              setStartDate(new Date());
              handleCloseQuickBook('close');
              dispatch(setDashboardListUpdate(true));
            }
          },
        );
      } catch (error) {}
    }
  };

  const handleCloseQuickBook = value => {
    dispatch(setQuickBookState(value));
    dispatch(SetQuickBookEditOpen({ openState: false }));
  };

  return (
    <>
      <div className="day-info">
        {loading == true ? (
          <Loader />
        ) : selectedAsset &&
          Object.keys(selectedAsset)?.length > 0 &&
          quickBookSelect <= QuickbookSelectIds.parking &&
          chooseFlag === false ? (
          <div className="booking-location-grid">
            <div className="booking-desk">
              <div className="booking-desk-info">
                <span>
                  <img src={bookLocation} alt="img" />
                </span>
                <div className="booking-desk-details">
                  <h5>{selectedAsset?.asset_name}</h5>
                  <p className="word-break">{selectedAsset?.location_name}</p>
                  {quickBookSelect == QuickbookSelectIds.room && (
                    <p className="word-break">
                      {'Capacity'}
                      <span className="book-capacity-dot"></span>
                      {selectedAsset?.asset_capacity
                        ? selectedAsset?.asset_capacity
                        : '0'}
                    </p>
                  )}
                </div>
              </div>
              <div className="booking-desk-change">
                {editDetails?.data?.checkin_status > 0 ? null : (
                  <Link
                    to="#"
                    onClick={() => {
                      if (startTimezone?.name && endTimezone?.name) {
                        dispatch(setPlanPopup(true));
                        changeWorkspaces();
                        setSelectTimezoneText('');
                      } else {
                        setSelectTimezoneText('Please select timezone');
                      }
                    }}
                  >
                    {findLabelText('Change', 'Change', 'Settings')}
                  </Link>
                )}
              </div>
            </div>
            <div className="booking-desk-description">
              <span>{QuickbookLabels.description}</span>
              <p>
                {selectedAsset?.asset_description
                  ? selectedAsset?.asset_description
                  : '-'}
              </p>
            </div>
            <div className="booking-desk-list">
              <ul className="nav">
                {selectedAsset?.amenities &&
                  selectedAsset?.amenities?.map((amenity, index) => (
                    <li key={index}>{amenity.name}</li>
                  ))}
              </ul>
            </div>
            <div
              className={
                selectedAsset?.asset_id == editDetails?.data?.workspace_id &&
                (selectedAsset?.booking_status == BookingStatus.booked ||
                  selectedAsset?.booking_status == BookingStatus.requestBooked)
                  ? 'booking-bookedme'
                  : selectedAsset?.asset_status == AssetStatusIds.byRequest
                  ? 'booking-request'
                  : 'booking-available'
              }
            >
              <p>
                {selectedAsset?.asset_status == AssetStatusIds.available ||
                selectedAsset?.booking_status == BookingStatus.booked ||
                selectedAsset?.booking_status == BookingStatus.requestBooked ? (
                  <span />
                ) : selectedAsset?.asset_status == AssetStatusIds.byRequest ? (
                  <span />
                ) : (
                  <span className="ps-0 booking-unavailable" />
                )}
                {selectedAsset?.asset_id == editDetails?.data?.workspace_id &&
                (selectedAsset?.booking_status == BookingStatus.booked ||
                  selectedAsset?.booking_status == BookingStatus.requestBooked)
                  ? findLabelText(
                      'Booked by me',
                      'Booked by me',
                      'Common_Values',
                    )
                  : selectedAsset?.asset_status == AssetStatusIds.available &&
                    selectedAsset?.booking_status == ''
                  ? findLabelText('Available', 'Available', 'Common_Values')
                  : selectedAsset?.asset_status == AssetStatusIds.byRequest
                  ? findLabelText(
                      'Available to request',
                      'Available to request',
                      'Common_Values',
                    )
                  : findLabelText(
                      'Unavailable',
                      'Unavailable',
                      'Common_Values',
                    )}
              </p>
            </div>
          </div>
        ) : (
          quickBookSelect <= QuickbookSelectIds.parking && (
            <div className="booking-location-grid">
              <div className="booking-desk">
                <div className="booking-desk-info">
                  <div className="booking-desk-details">
                    <h5>
                      <b>{QuickbookLabels.noDefaultSelected}</b>
                    </h5>
                    <p className="word-break">
                      {QuickbookLabels.setDefaultDesc}
                    </p>
                  </div>
                </div>
                <div className="booking-desk-change">
                  <Link
                    to="#"
                    onClick={() => {
                      if (startTimezone?.name && endTimezone?.name) {
                        dispatch(setPlanPopup(true));
                        setGotoGlobal(true);
                        setSelectTimezoneText('');
                      } else {
                        setSelectTimezoneText('Please select timezone');
                      }
                    }}
                  >
                    {findLabelText('Choose', 'Choose', 'Settings')}
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
        {!editDetails?.data?.id &&
          validateOnBehalfOfUser() &&
          quickBookSelect <= QuickbookSelectIds.parking && (
            <OnBeHalf
              deleteOnBehalf={deleteOnBehalf}
              setDeleteOnBehalf={setDeleteOnBehalf}
              initialStateValue={bookedForDetails}
              selectedUser={(data, date, list) => {
                if (date) {
                  bookInitial == 0 && setStartDate(new Date(date));
                }
                if (data?.id) {
                  updateBookedFor(data.id);
                  updateBookedForDetails(data);
                  setBookInitial(0);
                } else {
                  updateBookedFor('');
                }
                if (data?.start_working_hour) {
                  setStartTime(
                    getStartTime(
                      data?.start_working_hour,
                      startTimezone?.name,
                      startDate,
                    ),
                  );
                }
                if (data?.end_working_hour) {
                  setEndTime(
                    getEndTime(
                      data.end_working_hour,
                      endTimezone?.name,
                      startDate,
                    ),
                  );
                }
              }}
            />
          )}
      </div>
      <div className="card-footer">
        <div className="booking-btns">
          <Link
            to="#"
            className="btn prev_btn"
            onClick={() => handleCloseQuickBook('close')}
          >
            {findLabelText('Cancel', 'Cancel', 'Common_Values')}
          </Link>
          {editDetails?.data?.checkin_status > 1 ? null : (
            <Link
              to="#"
              className={`${'btn btn-primary next_btn '}${
                btnDisable == true ? 'room-btn-disable' : ''
              }`}
              onClick={() => {
                // selectedAsset &&
                // (selectedAsset?.asset_status == 1 ||
                //   selectedAsset?.asset_status == 2) &&
                !isShowCharValidationMsg && !btnDisable && validateBook()
                  ? handleBooking()
                  : null;
              }}
            >
              {editBook
                ? findLabelText(
                    'BoSave_changesok',
                    'Save changes',
                    'Common_Values',
                  )
                : findLabelText('Book', 'Book', 'Common_Values')}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickBookAssetDetail;
