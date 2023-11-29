import React, { useEffect, useState } from 'react';
import CDatePicker from '../datePicker';
import QuickBookComments from './quickBookComments';
import RoomParticipants from './roomParticipants';
import ParkingRegistration from './parkingRegistration';
import { useDispatch, useSelector } from 'react-redux';
import {
  QuickBookAssetCardContext,
  QuickBookContext,
  QuickBookDayContext,
  QuickBookDayProps,
} from '../context/context';
import ChooseAsset from './chooseAsset';
import moment from 'moment';
import {
  CheckAssetStatus,
  NewUpdatedBooking,
  QuickbookchangeWorkspacesNew,
  editChangeWorkspacesNew,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import {
  ApiStatusCode,
  AssetStatusIds,
  BookInitial,
  BookingStatus,
  QuickbookLabels,
  QuickbookSelectIds,
} from './constant';
import QuickBookAssetDetail from './quickBookAssetDetail';
import {
  changeTimeZone,
  convertTimezone,
  convertheBookingTimeToLocalTimeForValidation,
  getUserPreferedDateFormat,
} from '../commonMethod';
import {
  EndTime,
  dateFormat_DD_MM_YYYY_with_slash,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_YYYY_MM_DD,
  timeFormat_24,
} from '../../assets/constants/config';
import StartEndTimePickerWithTimeZone from '../startEndTimePickerWithTimeZone';
import Toaster from '../toast';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import BookPopupExternalParticipants from '../book/bookPopupExternalParticipants';
import QuickbookSubject from './quickbookSubject';

const QuickBookDaydetails: React.FC<QuickBookDayProps> = ({
  editDetails,
  editRoomDetails,
  editBook,
}) => {
  const { quickBookSelect, planePopup } = useSelector(
    (state: any) => state?.quickBook,
  );
  const { userDetails } = useSelector((state: any) => state?.app);
  const [subjectValidate, subjectSetValidate] = useState('');
  const [responceData, setResponseData] = useState<any>([]);
  const [responseDataCopy, setResponseDataCopy] = useState<any>([]);
  const [bookedFor, updateBookedFor] = useState(''); // Behalf of =
  const [deleteOnBehalf, setDeleteOnBehalf] = useState(false);
  const [bookedForDetails, updateBookedForDetails] = useState<any>('');
  const [selectedAsset, updateSelectedAsset] = useState<any>(null);
  const [selectedAssetBackup, setSelectedAssetBackup] = useState<any>(null);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedItems, setSelectedItems] = useState<any>('');
  const [chooseFlag, setChooseFlag] = useState(false);
  const [timeZone, setTimeZone] = useState('');
  const [gotoGlobal, setGotoGlobal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [floorId, setFloorId] = useState('');
  const [floorIdBackUp, setFloorIdBackUp] = useState('');
  const [startDate, setStartDate] = useState<any>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isShowCharValidationMsg, setShowCharValidationMsg] = useState(false);
  const [initial, setInitial] = useState(false);
  const [bookInitial, setBookInitial] = useState(0);
  const [utcFormat, setUTCFormat] = useState('');
  const [comment, setComment] = useState('');
  const [participants, setparticipants] = useState([]);
  const [subject, setSubject] = useState('');
  const [startTimezone, setStartTimezone] = useState<any>({});
  const [endTimezone, setEndTimezone] = useState<any>({});
  const [isTimeUpdated, setTimeUpdated] = useState(false);
  const [assetStatusBackup, setAssetStatusBackup] = useState<any>('');
  const [chooseAssetName, setChooseAssetName] = useState('');
  const dispatch = useDispatch();
  const [exParticipantSearch, setExParticipantSearch] = useState('');
  const [externalParticipants, setExternalParticipants] = useState([]);
  const [invalidMail, setInvalidMail] = useState('');
  const [registration, setRegistration] = useState('');
  const [selectTimezoneText, setSelectTimezoneText] = useState('');

  const getStartTime = (start_time, timeZone, newDate) => {
    if (
      moment(newDate).format(dateFormat_DD_MM_YYYY_with_slash) ==
      moment(new Date(startDate)).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      if (
        moment(
          changeTimeZone(timeZone),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(timeFormat_24) > start_time
      ) {
        start_time = moment(
          changeTimeZone(timeZone),
          dateFormat_DD_MM_YYYY_with_time,
        )
          .add(5, 'm')
          .format(timeFormat_24);
      } else start_time = start_time;
    } else {
      start_time = start_time;
    }
    return start_time;
  };
  const getEndTime = (end_time, timeZone, newDate) => {
    if (
      moment(newDate).format(dateFormat_DD_MM_YYYY_with_slash) ==
      moment(new Date(startDate)).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      if (
        moment(
          changeTimeZone(timeZone),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(timeFormat_24) > end_time
      )
        end_time = EndTime;
      else end_time = end_time;
    } else {
      end_time = end_time;
    }
    return end_time;
  };

  const handleSelection = item => {
    const newlist: any = [];
    newlist.push(item);
    setSelectedItems([...newlist]);
    updateSelectedAsset(item);
    setAssetStatusBackup(item?.asset_status);
    setChooseFlag(false);
  };

  useEffect(() => {
    const user_detail = bookedFor ? bookedForDetails : userDetails;
    const timeZone =
      quickBookSelect == QuickbookSelectIds.workspace &&
      user_detail?.default_workspace_timezone_name
        ? user_detail?.default_workspace_timezone_name
        : quickBookSelect == QuickbookSelectIds.room &&
          user_detail?.default_room_timezone_name
        ? user_detail?.default_room_timezone_name
        : quickBookSelect == QuickbookSelectIds.parking &&
          user_detail?.default_parking_timezone_name
        ? user_detail?.default_parking_timezone_name
        : user_detail?.timezone;

    const newDate = bookedFor
      ? moment(
          changeTimeZone(timeZone, startDate),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(dateFormat_YYYY_MM_DD)
      : moment(
          changeTimeZone(timeZone),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(dateFormat_YYYY_MM_DD);
    const date = new Date(newDate?.split('-')?.join(','));
    date >= new Date() ? setStartDate(date) : setStartDate(new Date());
  }, [bookedFor, quickBookSelect]);

  useEffect(() => {
    if (!editDetails?.data?.id && startDate) {
      getDefaultStartandEndTimezone();
      setSelectedAssetId(null);
      updateSelectedAsset(null);
      setBookInitial(BookInitial);
      const chooseTitle =
        quickBookSelect == QuickbookSelectIds.workspace
          ? QuickbookLabels.chooseWorkspace
          : quickBookSelect == QuickbookSelectIds.room
          ? QuickbookLabels.chooseRoom
          : quickBookSelect == QuickbookSelectIds.parking
          ? QuickbookLabels.chooseParking
          : QuickbookLabels.chooseWorkspace;
      setChooseAssetName(chooseTitle);
      bookedFor
        ? setRegistration(bookedForDetails?.vehicle_register_no)
        : setRegistration(userDetails?.vehicle_register_no);
    }
  }, [startDate]);

  const getDefaultStartandEndTimezone = () => {
    const user_detail = bookedFor ? bookedForDetails : userDetails;
    switch (quickBookSelect?.toString()) {
      case '1':
        {
          const zoneNameSplit = user_detail?.default_workspace_timezone_name
            ? user_detail?.default_workspace_timezone_name?.split('/')
            : user_detail?.timezone?.split('/');
          const timezoneObj = {
            id: user_detail?.default_workspace_timezone_id
              ? user_detail?.default_workspace_timezone_id
              : user_detail?.timezone_id,
            name: user_detail?.default_workspace_timezone_name
              ? user_detail?.default_workspace_timezone_name
              : user_detail?.timezone,
            aliasName: user_detail?.default_workspace_timezone_alias_name
              ? user_detail?.default_workspace_timezone_alias_name
              : user_detail?.alias_name,
            label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
          };
          setStartTimezone(timezoneObj);
          setEndTimezone(timezoneObj);
          updateStartEndTimeWithTimezone(timezoneObj, user_detail);
        }
        break;
      case '2':
        {
          const zoneNameSplit = user_detail?.default_room_timezone_name
            ? user_detail?.default_room_timezone_name?.split('/')
            : user_detail?.timezone?.split('/');
          const timezoneObj = {
            id: user_detail?.default_room_timezone_id
              ? user_detail?.default_room_timezone_id
              : user_detail?.timezone_id,
            name: user_detail?.default_room_timezone_name
              ? user_detail?.default_room_timezone_name
              : user_detail?.timezone,
            aliasName: user_detail?.default_room_timezone_alias_name
              ? user_detail?.default_room_timezone_alias_name
              : user_detail?.alias_name,
            label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
          };
          setStartTimezone(timezoneObj);
          setEndTimezone(timezoneObj);
          updateStartEndTimeWithTimezone(timezoneObj, user_detail);
        }
        break;
      case '3':
        {
          const zoneNameSplit = user_detail?.default_parking_timezone_name
            ? user_detail?.default_parking_timezone_name?.split('/')
            : user_detail?.timezone?.split('/');
          const timezoneObj = {
            id: user_detail?.default_parking_timezone_id
              ? user_detail?.default_parking_timezone_id
              : user_detail?.timezone_id,
            name: user_detail?.default_parking_timezone_name
              ? user_detail?.default_parking_timezone_name
              : user_detail?.timezone,
            aliasName: user_detail?.default_parking_timezone_alias_name
              ? user_detail?.default_parking_timezone_alias_name
              : user_detail?.alias_name,
            label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
          };
          setStartTimezone(timezoneObj);
          setEndTimezone(timezoneObj);
          updateStartEndTimeWithTimezone(timezoneObj, user_detail);
        }
        break;
      default:
        {
          const zoneNameSplit = user_detail?.timezone?.split('/');
          const timezoneObj = {
            id: user_detail?.timezone_id,
            name: user_detail?.timezone,
            aliasName: user_detail?.alias_name,
            label: `${zoneNameSplit?.[1]} , ${zoneNameSplit?.[0]}`,
          };
          setStartTimezone(timezoneObj);
          setEndTimezone(timezoneObj);
          updateStartEndTimeWithTimezone(timezoneObj, userDetails);
        }
        break;
    }
  };

  const updateStartEndTimeWithTimezone = (timezoneObj, userdetail) => {
    if (timezoneObj?.id) {
      const newDate = moment(
        changeTimeZone(timezoneObj?.name),
        'DD/MM/YYYY HH:mm',
      );
      const date = moment(newDate).format('MM/DD/YYYY');
      const sTime = new Date(
        date +
          ' ' +
          getStartTime(
            userdetail?.start_working_hour,
            timezoneObj?.name,
            newDate,
          ),
      );
      const finalStartTime = moment(sTime).format('HH:mm');
      setStartTime(finalStartTime);
      const eTime = new Date(
        date +
          ' ' +
          getEndTime(userdetail?.end_working_hour, timezoneObj?.name, newDate),
      );
      const finalEndTime = moment(eTime).format('HH:mm');
      setEndTime(finalEndTime);
      setTimeUpdated(!isTimeUpdated);
    } else if (
      moment(startDate).format(dateFormat_DD_MM_YYYY_with_slash) ===
      moment(new Date()).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      setStartTime(
        getStartTime(userDetails?.start_working_hour, timeZone, startDate),
      );
      setEndTime(
        getEndTime(userDetails?.end_working_hour, timeZone, startDate),
      );
    } else {
      setStartTime(userDetails?.start_working_hour);
      setEndTime(userDetails?.end_working_hour);
    }
  };

  const validateStartEndTime = () => {
    const start_date = moment(
      moment(startDate, dateFormat_DD_MM_YYYY_with_time),
    ).format(dateFormat_YYYY_MM_DD);
    const current_date = moment(
      changeTimeZone(startTimezone?.name, new Date()),
      dateFormat_DD_MM_YYYY_with_time,
    ).format(dateFormat_YYYY_MM_DD);

    if (start_date == current_date) {
      const validateStartTime =
        editDetails?.data?.checkin_status == 1
          ? true
          : moment(
              changeTimeZone(startTimezone?.name, new Date()),
              dateFormat_DD_MM_YYYY_with_time,
            ).format(timeFormat_24) > startTime
          ? false
          : true;
      const validateEndTime =
        moment(
          changeTimeZone(endTimezone?.name, new Date()),
          dateFormat_DD_MM_YYYY_with_time,
        ).format(timeFormat_24) > endTime
          ? false
          : true;
      const validateStartAndEndTime =
        convertheBookingTimeToLocalTimeForValidation(
          startDate,
          startTime,
          startTimezone?.name,
        ) <
        convertheBookingTimeToLocalTimeForValidation(
          startDate,
          endTime,
          endTimezone?.name,
        )
          ? true
          : false;
      if (validateStartTime && validateEndTime && validateStartAndEndTime) {
        return true;
      } else {
        return false;
      }
    } else if (start_date > current_date) {
      const validateStartAndEndTime =
        convertheBookingTimeToLocalTimeForValidation(
          startDate,
          startTime,
          startTimezone?.name,
        ) <
        convertheBookingTimeToLocalTimeForValidation(
          startDate,
          endTime,
          endTimezone?.name,
        )
          ? true
          : false;
      return validateStartAndEndTime;
    } else {
      return false;
    }
  };

  const getDefaultWorkspaces = () => {
    if (
      !editDetails?.data?.id &&
      quickBookSelect <= QuickbookSelectIds.parking &&
      bookInitial == 0
    ) {
      const payload = {
        floorplan_type_id: quickBookSelect,
        location_id: userDetails?.location_id,
        date: moment(startDate).format(dateFormat_YYYY_MM_DD),
        start_time: startTime,
        end_time: endTime,
        start_tzname: startTimezone?.name,
        end_tzname: endTimezone?.name,
        book_for: bookedFor ? bookedFor : '',
      };
      if (startTime && endTime) {
        setLoading(true);
        postData(QuickbookchangeWorkspacesNew, payload, (data, res) => {
          setLoading(false);
          if (res?.data?.code == ApiStatusCode.SUCCESS) {
            const dataCopy = data?.map(i => {
              if (i?.book_status == 0) {
                i['asset_status'] = AssetStatusIds.unAvailable;
              } else {
                // do nothing
              }
              return i;
            });
            setResponseData(dataCopy);
            setResponseDataCopy(dataCopy);
            let getSelected;
            const getSelectedAsset = data?.find(a =>
              selectedAssetId
                ? a?.asset_id == selectedAssetId
                : a?.selected_status == AssetStatusIds.available &&
                  a?.asset_status == AssetStatusIds.available,
            );
            if (getSelectedAsset) {
              getSelected = getSelectedAsset;
            } else {
              const checkAvailAsset = data?.find(
                a => a?.asset_status == AssetStatusIds.available,
              );
              if (checkAvailAsset) getSelected = checkAvailAsset;
              else {
                const checkDefaultReqAsset = data?.find(
                  a =>
                    a?.selected_status == AssetStatusIds.available &&
                    a?.asset_status == AssetStatusIds.byRequest,
                );
                const checkReqAsset = data?.find(
                  a => a?.asset_status == AssetStatusIds.byRequest,
                );
                getSelected = checkDefaultReqAsset
                  ? checkDefaultReqAsset
                  : checkReqAsset;
              }
            }
            if (data?.length > 0) {
              setChooseFlag(false);
            } else {
              setChooseFlag(true);
            }
            if (getSelected == undefined) {
              setChooseFlag(true);
              updateSelectedAsset(null);
            } else {
              setChooseFlag(false);
              updateSelectedAsset(getSelected);
              setSelectedAssetBackup(getSelected);
              setAssetStatusBackup(getSelected?.asset_status);
              setSelectedAssetId(getSelected?.asset_id);
              setFloorId(getSelected?.location_id);
            }
          } else {
            Toaster(res?.data?.code, res?.data?.message);
            const responseDataCopy = responceData?.map(i => {
              i['asset_status'] = AssetStatusIds.unAvailable;
              return i;
            });
            setResponseData(responseDataCopy);
            setResponseDataCopy(responseDataCopy);
          }
        });
      }
    }
  };

  // useEffect(() => {
  //   floorId && initial && editChangeWorkspaces(floorId);
  // }, [floorId]);

  const editChangeWorkspaces = floor_id => {
    setLoading(true);
    const payload = {
      floorplan_type_id: editDetails?.data
        ? editDetails?.data?.floorplan_type_id
        : quickBookSelect,
      location_id: floor_id ? floor_id : floorId,
      start_time: startTime ? startTime : editDetails?.data?.start_time,
      end_time: endTime ? endTime : editDetails?.data?.end_time,
      start_tzname: startTimezone?.name
        ? startTimezone?.name
        : editDetails?.data?.start_timezone,
      end_tzname: endTimezone?.name
        ? endTimezone?.name
        : editDetails?.data?.end_timezone,
      current_date: editDetails?.data?.user_booking_date
        ? moment(new Date(editDetails?.data?.user_booking_date)).format(
            dateFormat_YYYY_MM_DD,
          )
        : startDate
        ? moment(startDate).format(dateFormat_YYYY_MM_DD)
        : moment(new Date()).format(dateFormat_YYYY_MM_DD),
    };
    postData(editChangeWorkspacesNew, payload, (data, res) => {
      dispatch(hideLoader());
      setLoading(false);
      setResponseData(data);

      if (data?.length > 0) {
        setResponseDataCopy(data);
        setFloorIdBackUp(floorId);
        setBookInitial(prev => prev + 1);
        const getSelected = data?.find(a =>
          selectedAssetId ? a?.asset_id == selectedAssetId : data[0],
        );
        setSelectedAssetBackup(getSelected);
        updateSelectedAsset(getSelected);
        setSelectedAssetId(getSelected?.asset_id);
        setAssetStatusBackup(getSelected?.asset_status);
      } else {
        setFloorId(floorIdBackUp);
      }
      if (data?.length > 0 && editDetails?.data?.workspace_id) {
        const list = data?.filter(ele => {
          return ele?.asset_id == editDetails?.data?.workspace_id;
        });
        if (list?.length > 0) {
          // list?.[0]?.asset_status
          //   ? (list[0].asset_status =  editDetails?.data?.asset_status)
          //   : "";
          list[0]['booking_status'] = editDetails?.data?.booking_status;
          updateSelectedAsset(list[0]);
          setSelectedAssetId(list[0]?.asset_id);
          // setAssetStatusBackup(editDetails?.data?.asset_status);
        } else {
          const getSelected = data?.find(a =>
            selectedAssetId ? a?.asset_id == selectedAssetId : data[0],
          );
          setSelectedAssetBackup(getSelected);
          updateSelectedAsset(getSelected ? getSelected : null);
          setSelectedAssetId(getSelected?.asset_id);
          setAssetStatusBackup(getSelected?.asset_status);
        }
        setChooseFlag(false);
      } else if (initial) {
        const getSelected = data?.find(a =>
          selectedAssetId ? a?.asset_id == selectedAssetId : data[0],
        );
        if (data?.length > 0) {
          setSelectedAssetBackup(getSelected);
        }
        updateSelectedAsset(getSelected ? getSelected : null);
        setSelectedAssetId(getSelected?.asset_id);
        setAssetStatusBackup(getSelected?.asset_status);
        setInitial(false);
      }
    });
  };

  const getAssetStatus = status => {
    if (
      editDetails?.data &&
      editDetails?.data?.workspace_id == selectedAssetId
    ) {
      if (
        // startTimezone?.name == editDetails?.data?.start_timezone &&
        // endTimezone?.name == editDetails?.data?.end_timezone &&
        moment(startDate).format(dateFormat_YYYY_MM_DD) ==
        editDetails?.data?.user_booking_date
      ) {
        if (
          convertheBookingTimeToLocalTimeForValidation(
            startDate,
            startTime,
            startTimezone?.name,
          ) >=
            convertheBookingTimeToLocalTimeForValidation(
              startDate,
              editDetails?.data?.start_time,
              editDetails?.data?.start_timezone,
            ) &&
          convertheBookingTimeToLocalTimeForValidation(
            startDate,
            endTime,
            endTimezone?.name,
          ) <=
            convertheBookingTimeToLocalTimeForValidation(
              startDate,
              editDetails?.data?.end_time,
              editDetails?.data?.end_timezone,
            ) &&
          convertheBookingTimeToLocalTimeForValidation(
            startDate,
            startTime,
            startTimezone?.name,
          ) <
            convertheBookingTimeToLocalTimeForValidation(
              startDate,
              endTime,
              endTimezone?.name,
            )
        ) {
          return AssetStatusIds.bookedByMe;
        } else {
          return status;
        }
      } else {
        return status;
      }
    } else {
      return status;
    }
  };

  useEffect(() => {
    if (startTimezone?.name && endTimezone?.name) {
      setSelectTimezoneText('');
    }
    if (selectedAsset != null && quickBookSelect == selectedAsset?.asset_type) {
      if (validateStartEndTime()) {
        const checkPayLoad = {
          floorplan_type_id: quickBookSelect,
          date: moment(startDate).format(dateFormat_YYYY_MM_DD),
          start_time: startTime,
          end_time: endTime,
          start_timezone: startTimezone?.name,
          end_timezone: endTimezone?.name,
          location_id: selectedAsset?.location_id,
          asset_id: selectedAsset?.asset_id, // selectedAssetId
          book_for: bookedFor ? bookedFor : '',
        };
        const participantsId = participants?.map(i => i?.id);
        const editPayload = {
          floorplan_type_id: quickBookSelect,
          plan_id:
            quickBookSelect <= QuickbookSelectIds.parking
              ? selectedAsset?.asset_id
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
            quickBookSelect <= QuickbookSelectIds.parking
              ? selectedAsset?.asset_status
              : '',
          book_for: bookedFor ? bookedFor : '',
          participants: participantsId?.toString(),
          subjects: subject,
          comments: comment,
          registration: bookedFor
            ? bookedForDetails?.vehicle_register_no
            : userDetails?.vehicle_register_no,
          booking_id: editDetails?.data?.id,
          statustype: 'assetstatus',
        };
        const payLoad =
          editDetails?.data?.id &&
          editDetails?.data?.workspace_id == selectedAssetId
            ? editPayload
            : checkPayLoad;
        const url =
          editDetails?.data?.id &&
          editDetails?.data?.workspace_id == selectedAssetId
            ? NewUpdatedBooking
            : CheckAssetStatus;
        postData(url, payLoad, (data, res) => {
          const selcetedAssetCopy = JSON.parse(JSON.stringify(selectedAsset));
          if (res?.data?.code == 200) {
            selcetedAssetCopy['asset_status'] = data?.asset_status;
            selcetedAssetCopy['booking_status'] =
              getAssetStatus(data?.asset_status) == AssetStatusIds.bookedByMe
                ? editDetails?.data?.booking_status
                : BookingStatus.unBooked;
          } else {
            selcetedAssetCopy['asset_status'] = AssetStatusIds.unAvailable;
            selcetedAssetCopy['booking_status'] =
              getAssetStatus(AssetStatusIds.unAvailable) ==
              AssetStatusIds.bookedByMe
                ? editDetails?.data?.booking_status
                : BookingStatus.unBooked;
          }
          updateSelectedAsset(selcetedAssetCopy);
        });
      } else {
        const selcetedAssetCopy = JSON.parse(JSON.stringify(selectedAsset));
        selcetedAssetCopy['asset_status'] = AssetStatusIds.unAvailable;
        selcetedAssetCopy['booking_status'] =
          getAssetStatus(AssetStatusIds.unAvailable) ==
          AssetStatusIds.bookedByMe
            ? editDetails?.data?.booking_status
            : BookingStatus.unBooked;
        updateSelectedAsset(selcetedAssetCopy);
      }
    }
  }, [startTime, endTime, startTimezone?.id, endTimezone?.id, startDate]);

  useEffect(() => {
    getDefaultWorkspaces();
  }, [isTimeUpdated, deleteOnBehalf]);

  useEffect(() => {
    if (editDetails?.openState && editDetails?.data) {
      editDetails?.data?.checkin_time
        ? setStartTime(
            convertTimezone(
              editDetails?.data?.checkin_time?.split(' ')?.[0],
              editDetails?.data?.checkin_time?.split(' ')?.[1],
              editDetails?.data?.timezone,
              editDetails?.data?.start_timezone,
            ),
          )
        : setStartTime(editDetails?.data?.start_time);
      setEndTime(editDetails?.data?.end_time);
      editDetails?.data?.user_booking_date
        ? setStartDate(
            new Date(
              editDetails?.data?.user_booking_date?.split('-')?.join(','),
            ),
          )
        : setStartDate(
            new Date(editDetails?.data?.booking_date?.split('-')?.join(',')),
          );
      const startZoneSplit = editDetails?.data?.start_timezone?.split('/');
      const startTimezoneObj = {
        id: 1,
        name: editDetails?.data?.start_timezone,
        aliasName: '',
        label: `${startZoneSplit?.[1]} , ${startZoneSplit?.[0]}`,
      };
      setStartTimezone(startTimezoneObj);
      const endZoneSplit = editDetails?.data?.end_timezone?.split('/');
      const endTimezoneObj = {
        id: 2,
        name: editDetails?.data?.end_timezone,
        aliasName: '',
        label: `${endZoneSplit?.[1]} , ${endZoneSplit?.[0]}`,
      };
      setEndTimezone(endTimezoneObj);
      editDetails?.data?.registration
        ? setRegistration(editDetails?.data?.registration)
        : setRegistration(userDetails?.vehicle_register_no);
      dispatch(showLoader());
      setTimeout(() => {
        setInitial(true);
        setFloorId(editDetails?.data?.location_id);
        editChangeWorkspaces(editDetails?.data?.location_id);
      }, 1000);
    }
  }, [editDetails?.data?.id]);

  const updateResponseWithOldData = () => {
    setResponseData(responseDataCopy);
    const getSelected = responseDataCopy?.find(
      a => a?.asset_id == selectedAssetBackup?.asset_id,
    );
    updateSelectedAsset(getSelected ? getSelected : responseDataCopy[0]);
    setSelectedAssetId(
      getSelected ? getSelected?.asset_id : responseDataCopy[0]?.asset_id,
    );
    setAssetStatusBackup(
      getSelected
        ? getSelected?.asset_status
        : responseDataCopy[0]?.asset_status,
    );
  };

  return (
    <QuickBookContext.Provider
      value={{
        startDate: startDate,
        startTime: startTime,
        endTime: endTime,
        utcFormat: utcFormat,
        isShowCharValidationMsg: isShowCharValidationMsg,
        setStartDate: setStartDate,
        setStartTime: setStartTime,
        setEndTime: setEndTime,
        setShowCharValidationMsg: setShowCharValidationMsg,
        setUTCFormat: setUTCFormat,
        setInitial: setInitial,
        setBookInitial: setBookInitial,
        initial: initial,
        bookInitial: bookInitial,
        comment: comment,
        setComment: setComment,
        participants: participants,
        setParticipants: setparticipants,
        subject: subject,
        setSubject: setSubject,
        subjectValidate,
        subjectSetValidate,
      }}
    >
      <QuickBookDayContext.Provider
        value={{
          editDetails,
          editRoomDetails,
          editBook,
        }}
      >
        <QuickBookAssetCardContext.Provider
          value={{
            selectedAsset: selectedAsset,
            responseData: responceData,
            setResponseData: setResponseData,
            selectedAssetId: selectedAssetId,
            setSelectedAssetId: setSelectedAssetId,
            floorId: floorId,
            setFloorId: setFloorId,
            timeZone: timeZone,
            updateSelectedAsset: updateSelectedAsset,
            setTimeZone: setTimeZone,
            chooseFlag: chooseFlag,
            setChooseFlag: setChooseFlag,
            utcFormat: utcFormat,
            gotoGlobal: gotoGlobal,
            setGotoGlobal: setGotoGlobal,
            handleSelection: handleSelection,
            selectedItems: selectedItems,
          }}
        >
          {!planePopup ? (
            <>
              <div className="day-info">
                <CDatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  disabled={
                    editDetails?.data?.checkin_status > 0 ? true : false
                  }
                />
                {/* <StartAndEndTime /> */}
                <StartEndTimePickerWithTimeZone
                  startTime={startTime}
                  endTime={endTime}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  startTimezone={startTimezone}
                  setStartTimezone={setStartTimezone}
                  endTimezone={endTimezone}
                  setEndTimezone={setEndTimezone}
                  selectTimezoneText={selectTimezoneText}
                  disabled={
                    editDetails?.data?.checkin_status > 0 ? true : false
                  }
                  endDisabled={
                    editDetails?.data?.checkin_status > 1 ||
                    (editDetails?.data?.checkin_status > 0 &&
                      editDetails?.data?.asset_booking_status ==
                        BookingStatus.requestBooked)
                      ? true
                      : false
                  }
                  // startTimeDisable={
                  //   editDetails?.data?.booking_asset_status ==
                  //   BookingStatus.requestBooked
                  //     ? moment(editDetails?.data?.start_time, timeFormat_24)
                  //         .subtract(1, "minutes")
                  //         .format(timeFormat_24)
                  //     : ""
                  // }
                  // endTimeDisable={
                  //   editDetails?.data?.booking_asset_status ==
                  //   BookingStatus.requestBooked
                  //     ? moment(editDetails?.data?.end_time, timeFormat_24)
                  //         .add(1, "minutes")
                  //         .format(timeFormat_24)
                  //     : ""
                  // }
                />

                {quickBookSelect == QuickbookSelectIds.room && (
                  <>
                    <RoomParticipants />
                    <div className="modal-room-form modal-room-form-info">
                      <BookPopupExternalParticipants
                        setExParticipantSearch={setExParticipantSearch}
                        setExternalParticipants={setExternalParticipants}
                        setInvalidMail={setInvalidMail}
                        invalidMail={invalidMail}
                        editExternalParticipants={
                          editDetails?.data?.external_participants
                        }
                      />
                    </div>
                    <QuickbookSubject />
                  </>
                )}
                {quickBookSelect == QuickbookSelectIds.parking && (
                  <ParkingRegistration
                    registration={registration}
                    setRegistration={setRegistration}
                  />
                )}
                {/* {quickBookSelect > 3 && <SelectTimeZone />} */}
                {quickBookSelect != QuickbookSelectIds.parking && (
                    <QuickBookComments />
                  )}
                <QuickBookAssetDetail
                  loading={loading}
                  setLoading={setLoading}
                  changeWorkspaces={
                    bookInitial == BookInitial
                      ? getDefaultWorkspaces
                      : editChangeWorkspaces
                  }
                  startTimezone={startTimezone}
                  endTimezone={endTimezone}
                  bookedFor={bookedFor}
                  updateBookedFor={updateBookedFor}
                  deleteOnBehalf={deleteOnBehalf}
                  setDeleteOnBehalf={setDeleteOnBehalf}
                  bookedForDetails={bookedForDetails}
                  updateBookedForDetails={updateBookedForDetails}
                  validateStartEndTime={validateStartEndTime}
                  invalidMail={invalidMail}
                  exParticipantSearch={exParticipantSearch}
                  externalParticipants={externalParticipants}
                  registration={registration}
                  setSelectTimezoneText={setSelectTimezoneText}
                />
              </div>
            </>
          ) : (
            <ChooseAsset
              type={chooseAssetName}
              loadingStatus={loading}
              setLoading={setLoading}
              changeWorkspaces={() => {
                updateResponseWithOldData();
              }}
              editWorkspaces={id => {
                editChangeWorkspaces(id);
              }}
            />
          )}
        </QuickBookAssetCardContext.Provider>
      </QuickBookDayContext.Provider>
    </QuickBookContext.Provider>
  );
};

export default QuickBookDaydetails;
