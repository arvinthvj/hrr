import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locateroom } from './locateroom';
import Highlighter from 'react-highlight-words';
import { TimePicker } from 'antd';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from '../../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  TimeRightIcon,
  TimeleftIcon,
  bookLocation,
  calendar,
  calendar1,
  deskRedIcon,
  filter_icon,
  filters,
  location,
  locations,
  pan_icon,
  topdown,
  zoom_minus_icon,
  zoom_plus_icon,
} from '../../components/imagepath';
import DeskClick from './deskClick';
import { postData } from '../../services/apicall';
import { shapes } from './drawshapes';
import Toaster from '../../components/toast';
import UserViewProfile from './userViewProfile';
import {
  hideLoader,
  showLoader,
  updateBlinkIcon,
} from '../../reduxStore/appSlice';
import {
  AddBooking,
  ApiUrl,
  AssetAmenitiesList,
  CancelBooking,
  NewUpdatedBooking,
  UpdateBooking,
  amenitiesListWorkRoom,
  floorCanvasLocateList,
  getBookingTime,
  getLocateDetails,
  getLocateTeamDetails,
  getUserAgainstLocateDetails,
  getUserAgainstTeamDetails,
  locationListApi,
  snapshot,
} from '../../services/apiurl';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import {
  changeTimeZone,
  findLabelText,
  getDatesInRange,
  getPreferedTimeFormat,
  getUserPreferedDateFormat,
} from '../../components/commonMethod';
import {
  changeDashBoardLastAPIRes,
  setDashboardDayList,
  setDashboardListUpdate,
} from '../../reduxStore/dashboardSlice';
import { colorCodeValues, findFirstName } from '../../assets/globals';
import LocationSelectorComponent from '../../components/locationSelectorComponent';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import ImageCollection from './imageCollection';
import {
  AssetTypes,
  EndTime,
  LocateLabelText,
  StartTime,
} from '../../components/locateComponent/constants';

import {
  dateFormat_DD_MM_YYYY_with_slash,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_YYYY_MM_DD,
  timeFormat_24,
} from '../../assets/constants/config';
import TeamBookingDetails from './teamBookingDetails';
import LocateAmenitiesFilter from './locateAmenitiesFilter';

const UserViewLocate = () => {
  const { dashboardFromDate, dashboardToDate, dashboardDayApiList } =
    useSelector((state: RootReduxProps) => state.dashboard);
  const locationState = useLocation();
  const [locate, setLocate] = useState<any>([]),
    [mouseOver, setMouseOver] = useState<any>(''),
    [amenities, setAmenities] = useState([]),
    [amenitiesRoomList, setAmenitiesRoomList] = useState([]),
    [locationValue, setLocationValue] = useState<any>({}),
    [locationOption, setLocationOption] = useState<any>([]),
    [loader, setLoader] = useState(false),
    [mouseClick, setMouseClick] = useState<any>(''),
    [workspaceAmenities, setWorkspaceAmenities] = useState<any>([]),
    [roomAmenities, setRoomAmenities] = useState<any>([]),
    [searchText, setSearchText] = useState<any>({
      value: '',
      asset: [],
      person: [],
      assetTag: [],
      image: '',
    }),
    [filterSearch, setFilterSearch] = useState(''),
    [overId, setOverId] = useState(''),
    [showBoxId, setShowId] = useState(''),
    [searchData, setSearchData] = useState(''),
    [locationDropdown, setLocationDropdown] = useState(false),
    [defaultBuliding, setDefaultBuliding] = useState<any | undefined>(''),
    [defaultFloor, setDefaultFloor] = useState<any | undefined>(''),
    [floorId, setFloorId] = useState<number | string | undefined>(''),
    [activeTool, setActiveTool] = useState({
      pan: false,
      zoomIn: false,
      zoomOut: false,
    });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeZone, setTimeZone] = useState('');
  const [timeZoneId, setTimeZoneId] = useState('');
  const canvasRef = useRef(null);
  const canvasText = useRef<null | any>();
  const canvasImg = useRef<null | any>();
  const lshapewallImg = useRef<null | any>();
  const cshapewallImg = useRef<null | any>();
  const drawUndo = useRef<null | any>();
  const singledeskImg = useRef<null | any>();
  const singledeskSelect = useRef<null | any>();
  const roomXXS = useRef<null | any>();
  const roomXS = useRef<null | any>();
  const roomM = useRef<null | any>();
  const roomL = useRef<null | any>();
  const roomXL = useRef<null | any>();
  const roomXXSSelect = useRef<null | any>();
  const roomXSSelect = useRef<null | any>();
  const roomMSelect = useRef<null | any>();
  const roomLSelect = useRef<null | any>();
  const roomXLSelect = useRef<null | any>();
  const shape2Img = useRef<null | any>();
  const shape2Select = useRef<null | any>();
  const shape3Img = useRef<null | any>();
  const shape3Select = useRef<null | any>();
  const shape4Img = useRef<null | any>();
  const shape4Select = useRef<null | any>();
  const shape5Img = useRef<null | any>();
  const shape5Select = useRef<null | any>();
  const canvasTextDiv = useRef<null | any>();
  const canvasDiv = useRef<null | any>();
  const singleDeskDragImg = useRef<null | any>();
  const textDragImg = useRef<null | any>();
  const squareDragImg = useRef<null | any>();
  const canvasTextDone = useRef<null | any>();
  const singledeskImgRed = useRef<null | any>();
  const dateRef = useRef<null | any>();
  const locationRef = useRef<null | any>();
  const [locateTeamDropdownDetail, setLocateTeamDropdownDetail] = useState({});
  const [teamBookingList, setTeamBookingList] = useState([]);

  const getStartTime = (start_time, timeZone, newDate) => {
    if (
      moment(newDate).format(dateFormat_DD_MM_YYYY_with_slash) ==
      moment(startDate).format(dateFormat_DD_MM_YYYY_with_slash)
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
      moment(startDate).format(dateFormat_DD_MM_YYYY_with_slash)
    ) {
      if (
        moment(
          changeTimeZone(timeZone, new Date(newDate)),
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
  interface searchDetailsProps {
    locatelabel: string;
    search_id: string;
    search_location_id: string;
    floorId: string;
  }

  const [startDate, setDate] = useState(new Date());
  const [shapeFun, setShapeFun] = useState<any>({});
  const [viewUser, setViewUser] = useState<any>('');
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const [startTime, setStartTime] = useState<string | any>('');
  const [endTime, setEndTime] = useState<string | any>('');
  const [selectAll, setSelectAll] = useState(false);
  const [roomSelectAll, setRoomSelectAll] = useState(false);
  const [parkingSelectAll, setParkingSelectAll] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<any>('');
  const [searchDetails, setSearchDetails] = useState<searchDetailsProps | any>(
    '',
  );
  const [s3Flag, setS3Flag] = useState({ flag: false, data: '' });
  const [locateCanvas, setLocateCanvas] = useState('');
  const [userLocation, setUserLocation] = useState<any>('');
  const [bookingData, setBookingData] = useState([]);
  const [parkingAmenities, setParkingAmenities] = useState([]);
  const [parkingAmenitiesBackup, setParkingAmenitiesBackup] = useState([]);
  const { dashboardListUpdate } = useSelector((state: any) => state.dashboard);

  const [filter, setFilter] = useState(false);
  const handleClick = () => {
    setFilter(current => !current);
    setFilterSearch('');
  };

  const handleCancel = () => {
    setFilter(current => !current);
    handleFilterSearch('');
  };
  function cancelSection(changesarray?: any) {
    const result = changesarray?.map(item => ({
      id: item.id,
      checked: false,
      name: item.name,
    }));
    return [...result];
  }

  const updateAssetAmenities = () => {
    postData(AssetAmenitiesList, {}, (data, res) => {
      if (res?.data?.code == 200) {
        const workSpaceAmenities = data?.workspace?.map(v => ({
          ...v,
          checked: false,
        }));
        setAmenities(workSpaceAmenities);
        setWorkspaceAmenities(workSpaceAmenities);
        const roomAmenities = data?.room?.map(v => ({
          ...v,
          checked: false,
        }));
        setAmenitiesRoomList(roomAmenities);
        setRoomAmenities(roomAmenities);
        const parkAmenities = data?.parking?.map(v => ({
          ...v,
          checked: false,
        }));
        setParkingAmenitiesBackup(parkAmenities);
        setParkingAmenities(parkAmenities);
      }
    });
  };

  useEffect(() => {
    updateAssetAmenities();
    setSelectedAmenities('');
    setSelectAll(false);
    setRoomSelectAll(false);
    setParkingSelectAll(false);
    handleFilterSearch('');
    setFilter(false);
  }, [startDate, locationValue?.value, locationState?.state]);

  useEffect(() => {
    let locSort = [];
    dispatch(showLoader());
    postData(locationListApi, '', loclist => {
      dispatch(hideLoader());
      const Z = loclist?.List?.sort((a, b) => a.id - b.id);
      locSort = Z?.map(i => ({
        label: i?.name,
        value: i?.id,
        hierarchy: i?.fullname,
        timezone: i?.timezone,
      }));
      setLocationOption(locSort);
      if (locationState?.state) {
        const stateDetail = locationState?.state;
        setSearchDetails(stateDetail);
        const searchLocId =
          locationState?.state?.floorId ||
          locationState?.state.search_location_id;
        const teamLocation =
          searchLocId && locSort?.find((i: any) => i?.value == searchLocId);
        setLocationValue(teamLocation);
      }
    });
  }, [locationState?.state]);
  useEffect(() => {
    const ref = {
      cshapewallImg: cshapewallImg.current,
      lshapewallImg: lshapewallImg.current,
      canvasText: canvasText.current,
      canvasImg: canvasImg.current,
      drawUndo: drawUndo.current,
      singledeskImg: singledeskImg.current,
      singledeskSelect: singledeskSelect.current,
      shape2Img: shape2Img.current,
      shape2Select: shape2Select.current,
      shape3Select: shape3Select.current,
      shape4Img: shape4Img.current,
      shape4Select: shape4Select.current,
      shape5Img: shape5Img.current,
      shape5Select: shape5Select.current,
      canvasTextDiv: canvasTextDiv.current,
      canvasDiv: canvasDiv.current,
      singleDeskDragImg: singleDeskDragImg.current,
      textDragImg: textDragImg.current,
      squareDragImg: squareDragImg.current,
      canvasTextDone: canvasTextDone.current,
      canvasRef: canvasRef.current,
      singledeskImgRed: singledeskImgRed.current,
    };
    if (canvasRef.current !== null)
      setShapeFun(
        shapes(
          ref,
          locate,
          selectedAmenities,
          searchDetails?.search_id,
          searchData,
          setS3Flag,
        ),
      );
  }, [
    canvasRef.current,
    locate,
    selectedAmenities,
    searchDetails?.search_id,
    searchData,
  ]);
  useEffect(() => {
    if (locate?.length > 0 && canvasRef.current) {
      setTimeout(() => {
        setLocateCanvas(shapeFun.getCanvas());
      }, 3000);
      if (locateCanvas !== '' && s3Flag.data == '')
        shapeFun.getCanvasImg(canvasRef);
    }
  }, [locate, shapeFun, canvasRef.current, s3Flag, locateCanvas]);
  useEffect(() => {
    if (showBoxId) {
      const selData = locate?.find(t => t?.asset_id == showBoxId);
      if (selectedAmenities !== '') {
        const amenitiesData =
          selData?.asset_amenities !== null && selData?.asset_amenities !== ''
            ? selData?.asset_amenities?.split(',')
            : selData?.asset_amenities;
        const workSameAmen =
          selectedAmenities?.work?.length > 0
            ? amenitiesData?.filter(a =>
                selectedAmenities?.work?.includes(Number(a)),
              )
            : [];
        const roomSameAmen =
          selectedAmenities?.room?.length > 0
            ? amenitiesData?.filter(a =>
                selectedAmenities?.room?.includes(Number(a)),
              )
            : [];
        const parkSameAmen =
          selectedAmenities?.park?.length > 0
            ? amenitiesData.filter(a =>
                selectedAmenities?.park?.includes(Number(a)),
              )
            : [];
        if (
          (selData?.asset_type == 1 && workSameAmen.length == 0) ||
          (selData?.asset_type == 2 && roomSameAmen.length == 0) ||
          (selData?.asset_type == 3 && parkSameAmen.length == 0)
        )
          setMouseClick('');
        else setMouseClick(selData);
      } else if (searchDetails !== '') {
        if (
          selData?.asset_id == searchDetails?.search_id ||
          searchDetails?.search_id == null
        )
          setMouseClick(selData);
        else setMouseClick('');
      } else setMouseClick(selData);
    } else setMouseClick('');
  }, [showBoxId]);

  const amenitiesFilter = () => {
    const workSpaceAm = workspaceAmenities
      ?.filter(i => i?.checked == true)
      .map(d => d?.id);
    const roomAm = roomAmenities
      ?.filter(i => i?.checked == true)
      .map(d => d?.id);
    const parkAm = parkingAmenities
      ?.filter(i => i?.checked == true)
      .map(d => d?.id);
    return { work: workSpaceAm, room: roomAm, park: parkAm };
  };
  const loadFloorDetails = () => {
    if (locationOption) {
      const amenitiesArr = amenitiesFilter();
      const combineAmen = [
        ...amenitiesArr.work,
        ...amenitiesArr.room,
        ...amenitiesArr.park,
      ];
      const data = {
        org_id: '1',
        location_floor_id:
          (locationValue !== '' && locationValue?.value) ||
          (userLocation !== '' && userDetails?.location_id),
        date: moment(startDate).format(dateFormat_YYYY_MM_DD),
        start_time: startTime,
        end_time: endTime,
        amenities_id: [...new Set(combineAmen)].toString(),
        swork_id: ' ',
        location_timezone: timeZone,
      };
      postData(floorCanvasLocateList, data, (data, res) => {
        if (res?.data?.code == 200) {
          setLocate(data?.workspacedetails);
          const assetsId = data?.workspacedetails
            ?.filter(n => n?.asset_id !== null && n?.asset_id)
            .map(x => x?.asset_id);
          const asssetBookingData = {
            asset_id: assetsId.toString(),
            date: moment(startDate).format(dateFormat_YYYY_MM_DD),
          };
          postData(getBookingTime, asssetBookingData, time => {
            setBookingData(time);
            let userDetail: any = [];
            const userId: any = [];
            time?.filter(x => {
              if (x?.booking_details.length > 0)
                x?.booking_details.map(
                  c =>
                    c?.booking_status == 1 &&
                    userDetail.push({
                      user_id: c?.user_id,
                      asset_id: x?.asset_id,
                    }),
                );
            });
            userDetail = userDetail.filter(
              (z: any, ix, a) =>
                a.findIndex(
                  (m: any) =>
                    m?.user_id == z?.user_id && m?.asset_id == z?.asset_id,
                ) == ix,
            );
            userDetail.map((c: any) => userId.push(c?.user_id));
          });
        }
      });
    }
  };
  useEffect(() => {
    if (locationOption && amenities && startTime != '' && endTime != '') {
      setMouseClick('');
      (locationValue?.value || userDetails?.location_id) && loadFloorDetails();
    }
    if (userDetails) {
      const userLoc = locationOption?.find(
        (y: any) => y?.value == userDetails?.location_id,
      );
      setUserLocation(userLoc);
    }
  }, [
    locationValue?.value,
    startTime,
    endTime,
    startDate,
    locationState?.state,
    userDetails,
  ]);

  useEffect(() => {
    if (dashboardListUpdate) {
      loadFloorDetails();
      dispatch(setDashboardListUpdate(false));
    }
  }, [dashboardListUpdate]);

  useEffect(() => {
    if (
      moment(startDate).format('DD MMM YYYY') ===
      moment(new Date()).format('DD MMM YYYY')
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
  }, [startDate]);
  useEffect(() => {
    if (searchDetails?.locatelabel) {
      setStartTime('00:00');
      setEndTime('23:59');
    }
  }, [searchDetails?.locatelabel]);

  const ChangeDate = action => {
    setOverId('');
    let changeDate;
    if (action === 'subtract') {
      // if (moment(startDate).isSameOrBefore(new Date())) changeDate = '';
      // else
      changeDate = startDate.setDate(startDate.getDate() - 1);
    } else changeDate = startDate.setDate(startDate.getDate() + 1);
    if (changeDate) setDate(new Date(changeDate));
  };

  const onSearchChange = val => {
    const assetFilter: any = [];
    const personFilter: any = [];
    const assetTagFilter: any = [];
    const hsRoleFilter: any = [];
    if (val !== '') {
      locate.map(i => {
        const amenitiesData =
          i?.asset_amenities !== null &&
          i?.asset_amenities !== '' &&
          (i?.asset_amenities.split(',') || i?.asset_amenities);
        if (
          (i?.asset_name !== null &&
            i?.asset_name?.toLowerCase()?.includes(val)) ||
          (i?.asset_description !== null &&
            i?.asset_description?.toLowerCase()?.includes(val))
        )
          assetFilter.push(i);
        if (i?.booking_username !== null || i?.booking_email !== null) {
          if (
            i?.booking_username?.toLowerCase()?.includes(val) ||
            i?.booking_email?.toLowerCase()?.includes(val)
          )
            personFilter.push(i);
        }
        if (
          amenitiesData?.length > 0 &&
          amenities?.filter(
            (r: any) =>
              r?.name?.toLowerCase()?.includes(val) &&
              amenitiesData?.includes(String(r?.id)),
          )?.length > 0
        ) {
          assetTagFilter.push(i);
        }
        if (i?.hs_roles.length > 0) {
          if (i?.hs_roles.filter(z => z?.name?.toLowerCase()?.includes(val)))
            hsRoleFilter.push(i);
        }
      });
      setSearchText({
        value: val,
        asset: assetFilter,
        person: personFilter,
        assetTag: assetTagFilter,
        hsRole: hsRoleFilter,
      });
    } else {
      setSearchText({
        value: '',
        asset: [],
        person: [],
        assetTag: [],
        hsRole: [],
      });
      setSearchData('');
    }
  };
  useEffect(() => {
    if (overId) {
      const mouseOver = locate?.find(i => i?.asset_id == overId);
      const bookingTiming = bookingData?.find(
        (z: any) => z?.asset_id == overId,
      );
      setLoader(true);
      setMouseOver({ data: mouseOver, time: bookingTiming });
      setLoader(false);
    }
  }, [overId]);
  const onChangeCheckbox = (item, name) => {
    const amenChange =
      name == AssetTypes.workspace
        ? workspaceAmenities
        : name == AssetTypes.room
        ? roomAmenities
        : parkingAmenities;
    const checkboxChange = amenChange?.map(a =>
      a?.id === item?.id ? { ...a, checked: !a?.checked } : a,
    );
    name == AssetTypes.workspace
      ? setWorkspaceAmenities(checkboxChange)
      : name == AssetTypes.room
      ? setRoomAmenities(checkboxChange)
      : setParkingAmenities(checkboxChange);
    const checkAll = checkboxChange.find(z => z?.checked == false);
    if (checkAll) {
      name == AssetTypes.workspace
        ? setSelectAll(false)
        : name == AssetTypes.room
        ? setRoomSelectAll(false)
        : setParkingSelectAll(false);
    }
  };

  const handleApply = () => {
    const filteredWorkspace = amenities?.map(a => {
      const findValue = workspaceAmenities?.find(i => i?.id == a?.id);
      return findValue ? findValue : { ...a, checked: false };
    });
    setAmenities(filteredWorkspace);
    setWorkspaceAmenities(filteredWorkspace);
    const filteredRoom = amenitiesRoomList?.map(a => {
      const findValue = roomAmenities?.find(i => i?.id == a?.id);
      return findValue ? findValue : { ...a, checked: false };
    });
    setAmenitiesRoomList(filteredRoom);
    setRoomAmenities(filteredRoom);
    const filteredParking = parkingAmenitiesBackup?.map(a => {
      const findValue = parkingAmenities?.find(i => i?.id == a?.id);
      return findValue ? findValue : { ...a, checked: false };
    });
    setParkingAmenitiesBackup(filteredParking);
    setParkingAmenities(filteredParking);
  };

  const handleFilterSearch = value => {
    setFilterSearch(value);
    const list = [...amenities];
    const roomList = [...amenitiesRoomList];
    const parkList = [...parkingAmenitiesBackup];
    if (value === '') {
      setWorkspaceAmenities(list);
      setRoomAmenities(roomList);
      setParkingAmenities(parkList);
      return;
    }
    const filteredValues = list?.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    const filteredValuesRoom = roomList?.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    const filteredValuesParking = parkList?.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setWorkspaceAmenities(filteredValues);
    setRoomAmenities(filteredValuesRoom);
    setParkingAmenities(filteredValuesParking);
  };

  const handleBooking = payload => {
    const getDateList = getDatesInRange(dashboardFromDate, dashboardToDate);
    dispatch(showLoader());
    const updateBook = {
      floorplan_type_id: payload?.floorplan_type_id,
      plan_id: payload?.plan_id,
      date: payload?.date,
      location_id: payload?.location_id,
      start_time: payload?.start_time,
      end_time: payload?.end_time,
      start_timezone: payload?.start_timezone,
      end_timezone: payload?.end_timezone,
      asset_status_id: payload?.asset_status_id,
      book_for: payload?.book_for,
      participants: payload?.participants,
      subjects: payload?.subjects,
      comments: payload?.comments,
      registration: payload?.registration,
      booking_id: mouseClick?.booking_id,
      statustype: '',
      external_participants: payload?.external_participants,
      asset_timezone: payload?.asset_timezone,
      timezone_id: payload?.timezone_id,
    };
    const bookingPayload =
      mouseClick?.asset_color == colorCodeValues.bookedme
        ? updateBook
        : payload;
    postData(
      mouseClick?.asset_color == colorCodeValues.bookedme
        ? NewUpdatedBooking
        : AddBooking,
      bookingPayload,
      (data, res) => {
        try {
          const newList = JSON.parse(JSON.stringify(dashboardDayApiList));
          if (res?.data?.code == 200) {
            if (dashboardDayApiList?.book_data?.length > 0) {
              const checkData = dashboardDayApiList?.book_data.findIndex(
                val => val.id == data.id,
              );
              if (checkData >= 0) {
                newList.book_data.splice(checkData, 1, data);
              } else {
                newList.book_data.push(data);
              }
            }
            compareandCheckDates(newList, getDateList);
            dispatch(updateBlinkIcon(true));
          } else {
            setShowId('');
          }
          compareandCheckDates(newList, getDateList);
        } catch (error) {}
        dispatch(hideLoader());
        setMouseClick('');
        Toaster(res?.data?.code, res?.data?.message);
        loadFloorDetails();
        getTeamBookingDetails();
      },
    );
  };

  const handleDeleteBooking = data => {
    dispatch(showLoader());
    postData(CancelBooking, data, (success, res) => {
      if (res?.data?.code == 200) {
        dispatch(updateBlinkIcon(true));
      }
      dispatch(hideLoader());
      setMouseClick('');
      Toaster(res?.data?.code, res?.data?.message);
      loadFloorDetails();
    });
  };
  const compareandCheckDates = (responce, preDate) => {
    const res = responce;
    if (res?.book_data?.length > 0) {
      const bookData = res?.book_data;
      const pDate = preDate; // prepareDate
      for (let i = 0; i < pDate.length; i++) {
        for (let j = 0; j < bookData.length; j++) {
          if (pDate[i].date == bookData[j].booking_date) {
            const list = pDate[i]['book_data'];
            list.push(bookData[j]);
          }
        }
      }
      const preparFullData = {
        common_data: res?.common_data,
        book_data: pDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes(responce));
    } else {
      const preparFullData = {
        common_data: {},
        book_data: preDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes({}));
    }
  };

  const statuschange = check => {
    const result = workspaceAmenities?.map(item => ({
      id: item.id,
      checked: check,
      name: item.name,
    }));
    setWorkspaceAmenities([...result]);
    setSelectAll(check);
  };

  const roomStatuschange = check => {
    const result = roomAmenities?.map(item => ({
      id: item.id,
      checked: check,
      name: item.name,
    }));
    setRoomAmenities([...result]);
    setRoomSelectAll(check);
  };

  const parkStatuschange = check => {
    const result = parkingAmenities?.map(item => ({
      id: item.id,
      checked: check,
      name: item.name,
    }));
    setParkingAmenities([...result]);
    setParkingSelectAll(check);
  };
  const endHoursDisable = () => {
    const h = parseInt(startTime.split(':')[0]);
    const m = parseInt(startTime.split(':')[1]);
    const hours: any = [];
    const len = m == 59 ? h + 1 : h;
    for (let i = 0; i < len; i++) {
      hours.push(i);
    }
    return hours;
  };

  const endMinutesDisable = selectedHour => {
    const h = parseInt(startTime.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(startTime.split(':')[1]);
      for (let i = 0; i <= m; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };
  const startdHoursDisable = () => {
    const hours: any = [];
    let h = parseInt(endTime.split(':')[0]);
    const m = parseInt(endTime.split(':')[1]);
    if (m == 0) {
    } else {
      h = h + 1;
    }
    for (let i = h; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const startMinutesDisable = selectedHour => {
    const h = parseInt(endTime.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(endTime.split(':')[1]);
      for (let i = m; i <= 60; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };
  const locRef = () => {
    locationRef?.current?.classList.add('d-none');
    locationRef?.current?.classList.remove('d-block');
    setSearchText({
      value: '',
      asset: [],
      person: [],
      assetTag: [],
      hsRole: [],
    });
  };
  searchText?.asset;
  searchText?.person;
  const cleanSearchAsset = searchText?.asset.filter(
    (arr, index, self) =>
      index === self.findIndex(t => t.asset_id === arr.asset_id),
  );
  const handleLocationChange = data => {
    setFloorId(data);
    setSearchData('');
    setLocationValue(locationOption?.find((i: any) => i.value == data));
    setActiveTool({
      pan: false,
      zoomIn: false,
      zoomOut: false,
    });
    activeTool?.pan && shapeFun.panlock();
    locRef();
    setOverId('');
  };
  const cleanSearchPerson = searchText?.person.filter(
    (arr, index, self) =>
      index === self.findIndex(t => t.asset_id === arr.asset_id),
  );
  const splitTet1 = () => {
    return (
      <div className="location-booking location-booking-info">
        <div className="booking-desk-details location-hierarchy">
          <h6>
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[0]
              : defaultBuliding}
          </h6>
          <p className="ms-2">
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[1]
              : defaultFloor}
          </p>
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };
  useEffect(() => {
    const textsplit = userDetails?.location?.[0]?.name?.toString()?.split(',');
    setFloorId(userDetails?.location_id);
    setLocationValue(
      locationOption?.find((i: any) => i?.value == userDetails?.location_id),
    );
    setDefaultBuliding(textsplit?.[0]);
    setDefaultFloor(textsplit?.[1]);
  }, [userDetails]);

  const calenderRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'ant-picker-content',
        'ant-picker-header-super-prev-btn',
        'ant-picker-cell-inner',
        'ant-picker-prev-icon',
        'ant-picker-next-icon',
        'ant-picker-super-prev-icon',
        'ant-picker-super-next-icon',
        'ant-picker-header-next-btn',
        'ant-picker-header-prev-btn',
        'ant-picker-header-super-prev-btn',
        'ant-picker-header-super-next-btn',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-end',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-start',
      ];
      if (list.includes(event.target.className)) {
      } else if (
        calenderRef.current &&
        !calenderRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const disabledDate = current => {
    // Disable dates before today
    return current < moment().startOf('day');
  };

  useEffect(() => {
    floorId && getTimezone(floorId);
  }, [floorId]);

  const getTimezone = id => {
    const payload = { location_id: id, type: 'encrypt' };
    postData(ApiUrl.getBuildingTimezone, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setTimeZone(data?.timezone);
        setTimeZoneId(data?.id);
      } else {
        setTimeZone(userDetails?.timezone);
        setTimeZoneId(userDetails?.timezone_id);
      }
    });
  };
  const dropdownRef = useRef<null | any>();

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLocationDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  //   locationOption?.filter(
  //     (item: any) =>
  //       item?.value == userDetails?.location_id && setTimeZone(item?.timezone)
  //   );
  // }, [locationOption]);
  useEffect(() => {
    if (timeZone) {
      const newDate = moment(changeTimeZone(timeZone), 'DD/MM/YYYY HH:mm');
      const date = moment(newDate).format('MM/DD/YYYY');
      const sTime = new Date(
        date +
          ' ' +
          getStartTime(userDetails?.start_working_hour, timeZone, newDate),
      );
      const eTime = new Date(
        date +
          ' ' +
          getEndTime(userDetails?.end_working_hour, timeZone, newDate),
      );
      const finalStartTime = moment(sTime).format('HH:mm');
      const finalEndTime = moment(eTime).format('HH:mm');
      setStartTime(finalStartTime);
      setEndTime(finalEndTime);
    }
  }, [timeZone]);

  const getLocateTeamDropdownList = () => {
    const payload = {};
    postData(getUserAgainstLocateDetails, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setLocateTeamDropdownDetail(data);
      } else {
        setLocateTeamDropdownDetail({});
      }
    });
  };

  const getTeamBookingDetails = () => {
    const payload = {
      location_id: locationValue?.value
        ? locationValue?.value
        : userDetails?.location_id,
      date: moment(startDate).format(dateFormat_YYYY_MM_DD),
      start_time: StartTime,
      end_time: EndTime,
    };
    payload?.location_id &&
      postData(getLocateDetails, payload, (data, res) => {
        if (res?.data?.code == 200) {
          setTeamBookingList(data?.user_details);
        } else {
          setTeamBookingList([]);
        }
      });
  };

  useEffect(() => {
    setSearchDetails('');
    getLocateTeamDropdownList();
  }, [locationValue?.value, startDate]);

  const handleDatePicker = date => {
    setShowDatePicker(false);
    if (date) {
      const firstDay = new Date(date);
      setDate(firstDay);
      // setIsDateChanged(true);
    }
  };

  return (
    <>
      <div className={`main-wrapper slide-nav`}>
        <>
          <>
            {!viewUser ? (
              <div className="page-wrapper">
                <div className="content container-fluid locate-container">
                  <div className="card locate-path mb-0 pt-0 locate-space-left">
                    <div className="row">
                      <div className="col-xl-9 p-0 space-remove-light">
                        <div className="locate-left-path space-remove-light">
                          <div className="filter-top filter-top-inner">
                            <div className="locat-panel-grp">
                              <div className="locat-panel serch-locate-grp">
                                <div
                                  className="change-quick-book-header location-change-header shadow-none mb-0 pb-0"
                                  onClick={() => setLocationDropdown(true)}
                                >
                                  {splitTet1()}
                                </div>
                                <div
                                  className={`global-search-section global-search-section-info ${
                                    locationDropdown ? 'd-block' : 'd-none'
                                  }`}
                                  ref={dropdownRef}
                                >
                                  <LocationSelectorComponent
                                    locationId={
                                      locationState?.state
                                        ?.search_location_id ||
                                      locationValue?.value ||
                                      userDetails?.location_id
                                    }
                                    locationNames={
                                      locationState?.state
                                        ?.search_location_name ||
                                      userDetails?.location?.[0]?.name
                                    }
                                    setDefaultFloor={setDefaultFloor}
                                    setDefaultBuliding={setDefaultBuliding}
                                    handleLocationChange={handleLocationChange}
                                    floorId={
                                      locationState?.state
                                        ?.search_location_id || floorId
                                    }
                                    setLocationDropdown={setLocationDropdown}
                                    setTimeZone={() => {}}
                                    setAllLocation={() => {}}
                                  />
                                </div>
                              </div>
                              <LocateAmenitiesFilter
                                handleClick={handleClick}
                                handleCancel={handleCancel}
                                filter={filter}
                                setFilter={setFilter}
                                amenitiesFilter={amenitiesFilter}
                                filterSearch={filterSearch}
                                handleFilterSearch={handleFilterSearch}
                                selectAll={selectAll}
                                statuschange={statuschange}
                                workspaceAmenities={workspaceAmenities}
                                onChangeCheckbox={onChangeCheckbox}
                                roomSelectAll={roomSelectAll}
                                roomStatuschange={roomStatuschange}
                                roomAmenities={roomAmenities}
                                setSelectedAmenities={setSelectedAmenities}
                                setFilterSearch={setFilterSearch}
                                parkSelectAll={parkingSelectAll}
                                parkStatuschange={parkStatuschange}
                                parkingAmenities={parkingAmenities}
                                handleApply={handleApply}
                              />
                              <div className="locat-panel">
                                <div className="filter-search filter-input locate-serch-fill filter-search-location locat-search-bar">
                                  <input
                                    type="text"
                                    placeholder={findLabelText(
                                      LocateLabelText.Find,
                                      LocateLabelText.Find,
                                      LocateLabelText.Locate,
                                    )}
                                    className="input-filter"
                                    value={searchText?.value}
                                    onChange={e => {
                                      const val =
                                        e?.target?.value.toLowerCase();
                                      setSearchText({
                                        value: val,
                                        asset: [],
                                        person: [],
                                        assetTag: [],
                                        hsRole: [],
                                      });
                                      onSearchChange(val);
                                    }}
                                  />
                                  <div className="img-group location-img-group">
                                    <span>
                                      <img src={Search} alt="img" />
                                    </span>
                                  </div>
                                  <>
                                    <div
                                      className={`global-search-section locate-search ${
                                        searchText?.person?.length > 0 ||
                                        searchText?.asset?.length > 0 ||
                                        searchText?.assetTag?.length > 0 ||
                                        searchText?.hsRole?.length > 0
                                          ? 'd-block'
                                          : 'd-none'
                                      }`}
                                      ref={locationRef}
                                    >
                                      {cleanSearchPerson?.length > 0 &&
                                        cleanSearchPerson?.map(z => (
                                          <div
                                            className="global-search-grid"
                                            key={z?.asset_id}
                                            onClick={() => {
                                              setSearchData(z);
                                              setSearchText({
                                                value: z?.booking_username,
                                                asset: [],
                                                person: [],
                                                assetTag: [],
                                                hsRole: [],
                                              });
                                            }}
                                          >
                                            <div className="locate-search-top">
                                              <div className="locate-div">
                                                {z?.profile_image !== '' &&
                                                z?.profile_image !== null ? (
                                                  <GetImgaeFromS3Bucket
                                                    imageFile={z?.profile_image}
                                                    type={'image'}
                                                    userDetail={z}
                                                    name={findFirstName(
                                                      z?.booking_username,
                                                    )}
                                                    style={'profile'}
                                                  />
                                                ) : (
                                                  <div className="work-name-img work-name-img-table me-2">
                                                    <Link to="#">
                                                      <p>
                                                        <span>
                                                          {findFirstName(
                                                            z?.booking_username,
                                                          )}
                                                        </span>
                                                      </p>
                                                    </Link>
                                                  </div>
                                                )}
                                                <Link
                                                  to="#"
                                                  className="locate-search-name"
                                                >
                                                  <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={
                                                      searchText?.value
                                                        ? [searchText?.value]
                                                        : []
                                                    }
                                                    autoEscape={true}
                                                    textToHighlight={
                                                      z?.booking_username
                                                    }
                                                  />
                                                </Link>
                                              </div>
                                              <div>
                                                <img
                                                  src={location}
                                                  alt=""
                                                  className="locate-icon"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      {cleanSearchAsset?.length > 0 &&
                                        cleanSearchAsset?.map(z => (
                                          <>
                                            <div
                                              className="global-search-grid"
                                              key={z?.asset_id}
                                            >
                                              <div
                                                className="global-search-info"
                                                onClick={() => {
                                                  setSearchData(z);
                                                  setSearchText({
                                                    value: z?.asset_name,
                                                    asset: [],
                                                    person: [],
                                                    assetTag: [],
                                                    hsRole: [],
                                                  });
                                                }}
                                              >
                                                <div className="global-search-icon">
                                                  {z?.asset_type_name ==
                                                  'Workspace' ? (
                                                    <GetImgaeFromS3Bucket
                                                      imageFile={
                                                        'chair_1674811663199.svg'
                                                      }
                                                      type={'image'}
                                                      FilePath="gat"
                                                    />
                                                  ) : null}
                                                  {z?.asset_type_name ==
                                                  'Parking' ? (
                                                    <GetImgaeFromS3Bucket
                                                      imageFile={
                                                        'parking_1674811740209.svg'
                                                      }
                                                      type={'image'}
                                                      FilePath="gat"
                                                    />
                                                  ) : null}
                                                  {z?.asset_type_name ==
                                                  'Room' ? (
                                                    <GetImgaeFromS3Bucket
                                                      imageFile={
                                                        'room_1674811314595.svg'
                                                      }
                                                      type={'image'}
                                                      FilePath="gat"
                                                    />
                                                  ) : null}
                                                </div>
                                                <div className="global-search-content">
                                                  <Link to="#">
                                                    <Highlighter
                                                      highlightClassName="YourHighlightClass"
                                                      searchWords={
                                                        searchText?.value
                                                          ? [searchText?.value]
                                                          : []
                                                      }
                                                      autoEscape={true}
                                                      textToHighlight={
                                                        z?.asset_name
                                                      }
                                                    />
                                                  </Link>
                                                  <p className="global-search-content-span">
                                                    <b>
                                                      {findLabelText(
                                                        LocateLabelText.Description,
                                                        LocateLabelText.Description,
                                                        LocateLabelText.Locate,
                                                      )}
                                                      :
                                                    </b>
                                                    <Highlighter
                                                      highlightClassName="YourHighlightClass"
                                                      searchWords={
                                                        searchText?.value
                                                          ? [searchText?.value]
                                                          : []
                                                      }
                                                      autoEscape={true}
                                                      textToHighlight={`${
                                                        z?.asset_code
                                                          ? z?.asset_code + '-'
                                                          : ''
                                                      } ${
                                                        z?.asset_description
                                                          ? z?.asset_description
                                                          : ''
                                                      }`}
                                                    />
                                                  </p>
                                                  <p className="global-search-content-span">
                                                    <b>
                                                      {findLabelText(
                                                        LocateLabelText.Location,
                                                        LocateLabelText.Location,
                                                        LocateLabelText.Team,
                                                      )}
                                                      :
                                                    </b>{' '}
                                                    <Highlighter
                                                      highlightClassName="YourHighlightClass"
                                                      searchWords={
                                                        searchText?.value
                                                          ? [searchText?.value]
                                                          : []
                                                      }
                                                      autoEscape={true}
                                                      textToHighlight={
                                                        locationValue?.hierarchy
                                                          ? locationValue?.hierarchy
                                                          : userDetails
                                                              ?.location[0]
                                                              ?.name
                                                      }
                                                    />
                                                  </p>
                                                  {z?.asset_type_name ==
                                                    'Room' &&
                                                    z?.asset_capacity && (
                                                      <p className="global-search-content-span">
                                                        <b>
                                                          {findLabelText(
                                                            LocateLabelText.Capacity,
                                                            LocateLabelText.Capacity,
                                                            LocateLabelText.Locate,
                                                          )}
                                                          :
                                                        </b>
                                                        {z?.asset_capacity}
                                                      </p>
                                                    )}
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ))}
                                    </div>
                                  </>
                                </div>
                              </div>
                            </div>
                            <div className="locat-panel-grp locat-panel-grp-left">
                              <div className="locat-panel ">
                                <div className="date-filter date-filter-locate">
                                  <div className="filter-date">
                                    <div className="current-date current-date-new">
                                      <button
                                        className="datetimepicker"
                                        onClick={() => setDate(new Date())}
                                      >
                                        <img src={calendar} alt="img" />{' '}
                                        {findLabelText(
                                          LocateLabelText.Today,
                                          LocateLabelText.Today,
                                          LocateLabelText.Locate,
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="locat-panel">
                                <div className="date-filter">
                                  <div className="filter-date">
                                    <div className="work-date-range work-date-range-locate">
                                      <div className="date-arrows">
                                        <Link
                                          to="#"
                                          onClick={() => ChangeDate('subtract')}
                                        >
                                          <i className="fa fa-angle-left" />
                                        </Link>
                                        <Link
                                          to="#"
                                          onClick={() => ChangeDate('add')}
                                        >
                                          <i className="fa fa-angle-right" />
                                        </Link>
                                      </div>
                                      <div
                                        className="work-date-range"
                                        style={{ cursor: 'default' }}
                                      >
                                        <div
                                          ref={calenderRef}
                                          className="work-date-range book-only-date work-date-range-show aaa"
                                          onClick={() => {
                                            setShowDatePicker(!showDatePicker);
                                          }}
                                        >
                                          <DatePicker
                                            // open={showDatePicker}
                                            selected={startDate}
                                            onChange={handleDatePicker}
                                            value={getUserPreferedDateFormat(
                                              startDate,
                                            )}
                                            type="text"
                                            className="form-control form-control-date datetimepicker"
                                            // minDate={moment().toDate()}
                                          />
                                        </div>
                                        <img
                                          onClick={() => {
                                            setShowDatePicker(!showDatePicker);
                                          }}
                                          src={calendar1}
                                          alt="img"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="filter-bottom">
                            <div className="row">
                              <div className="col-lg-5 col-md-6 col-sm-12">
                                <div className="start-end-time">
                                  <ul>
                                    <li>
                                      <div className="settings-group">
                                        <h5>
                                          {findLabelText(
                                            LocateLabelText.Start,
                                            LocateLabelText.Start,
                                            LocateLabelText.Locate,
                                          )}
                                        </h5>
                                        <div className="filter-input filter-time filter-time-input">
                                          <TimePicker
                                            onChange={e => {
                                              const time =
                                                moment(e).format(timeFormat_24);
                                              setStartTime(time);
                                            }}
                                            defaultValue={moment(
                                              startTime,
                                              timeFormat_24,
                                            )}
                                            value={
                                              startTime
                                                ? moment(
                                                    startTime,
                                                    timeFormat_24,
                                                  )
                                                : moment(
                                                    userDetails?.start_working_hour,
                                                    timeFormat_24,
                                                  )
                                            }
                                            placeholder={
                                              startTime ? startTime : ''
                                            }
                                            format={getPreferedTimeFormat()}
                                            suffixIcon={<div></div>}
                                            allowClear={false}
                                            bordered={false}
                                            disabledHours={startdHoursDisable}
                                            disabledMinutes={
                                              startMinutesDisable
                                            }
                                            showNow={false}
                                            inputReadOnly={true}
                                          />
                                          <div className="img-group view-book-space pt-1">
                                            <img src={topdown} alt="img" />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="settings-group">
                                        <h5>
                                          {findLabelText(
                                            LocateLabelText.End,
                                            LocateLabelText.End,
                                            LocateLabelText.Locate,
                                          )}
                                        </h5>
                                        <div className="filter-input filter-time filter-time-input">
                                          <TimePicker
                                            defaultValue={moment(
                                              endTime,
                                              timeFormat_24,
                                            )}
                                            onChange={e => {
                                              const time =
                                                moment(e).format(timeFormat_24);
                                              setEndTime(time);
                                            }}
                                            placeholder={endTime}
                                            value={
                                              endTime
                                                ? moment(endTime, timeFormat_24)
                                                : moment(
                                                    userDetails?.end_working_hour,
                                                    timeFormat_24,
                                                  )
                                            }
                                            format={getPreferedTimeFormat()}
                                            suffixIcon={<div></div>}
                                            allowClear={false}
                                            bordered={false}
                                            disabledHours={endHoursDisable}
                                            disabledMinutes={endMinutesDisable}
                                            showNow={false}
                                            inputReadOnly={true}
                                          />
                                          <div className="img-group view-book-space pt-1">
                                            <img src={topdown} alt="img" />
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-7 col-md-6 col-sm-12">
                                <div className="booked-count">
                                  <ul>
                                    <li>
                                      <Link
                                        to="#"
                                        className="bookedme"
                                        style={{ cursor: 'context-menu' }}
                                      >
                                        <span />
                                        {findLabelText(
                                          LocateLabelText.Booked_by_me,
                                          LocateLabelText.Bookedbyme,
                                          LocateLabelText.Locate,
                                        )}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="booked"
                                        style={{ cursor: 'context-menu' }}
                                      >
                                        <span />
                                        {findLabelText(
                                          LocateLabelText.Booked,
                                          LocateLabelText.Booked,
                                          LocateLabelText.Locate,
                                        )}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="available"
                                        style={{ cursor: 'context-menu' }}
                                      >
                                        <span />
                                        {findLabelText(
                                          LocateLabelText.Available,
                                          LocateLabelText.Available,
                                          LocateLabelText.Locate,
                                        )}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="unavailable"
                                        style={{ cursor: 'context-menu' }}
                                      >
                                        <span />
                                        {findLabelText(
                                          LocateLabelText.Unavailable,
                                          LocateLabelText.Unavailable,
                                          LocateLabelText.Locate,
                                        )}
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="request"
                                        style={{ cursor: 'context-menu' }}
                                      >
                                        <span />
                                        {findLabelText(
                                          LocateLabelText.By_request,
                                          LocateLabelText.Byrequest,
                                          LocateLabelText.Locate,
                                        )}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ImageCollection
                            activeTool={activeTool}
                            canvasDiv={canvasDiv}
                            canvasImg={canvasImg}
                            lshapewallImg={lshapewallImg}
                            cshapewallImg={cshapewallImg}
                            singledeskImg={singledeskImg}
                            singledeskSelect={singledeskSelect}
                            shape2Img={shape2Img}
                            shape2Select={shape2Select}
                            shape3Img={shape3Img}
                            shape3Select={shape3Select}
                            shape4Img={shape4Img}
                            shape4Select={shape4Select}
                            shape5Img={shape5Img}
                            shape5Select={shape5Select}
                            singleDeskDragImg={singleDeskDragImg}
                            textDragImg={textDragImg}
                            squareDragImg={squareDragImg}
                            FloorRed={deskRedIcon}
                            roomM={roomM}
                            roomL={roomL}
                            roomMSelect={roomMSelect}
                            roomLSelect={roomLSelect}
                            roomXL={roomXL}
                            roomXLSelect={roomXLSelect}
                            canvasTextDiv={canvasTextDiv}
                            canvasText={canvasText}
                            canvasTextDone={canvasTextDone}
                            canvasRef={canvasRef}
                            setShowId={setShowId}
                            shapeFun={shapeFun}
                            overId={overId}
                            setOverId={setOverId}
                            setActiveTool={setActiveTool}
                          />
                          <div className="floor-textarea floor-textarea-inner">
                            {loader ? (
                              <Loader />
                            ) : (
                              mouseOver && <Locateroom over={mouseOver} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 d-flex space-remove-left pe-0">
                        <div className="locate-right-path">
                          {mouseClick && mouseClick?.asset_color !== null ? (
                            <DeskClick
                              data={mouseClick}
                              startTime={startTime}
                              endTime={endTime}
                              amenities={amenities}
                              date={startDate}
                              setMouseClick={() => {
                                setMouseClick('');
                                setShowId('');
                              }}
                              userDetails={userDetails}
                              locationValue={locationValue}
                              handleBooking={handleBooking}
                              handleDeleteBooking={handleDeleteBooking}
                              timeZone={timeZone}
                              timeZoneId={timeZoneId}
                            />
                          ) : (
                            <TeamBookingDetails
                              locateTeamDropdownDetail={
                                locateTeamDropdownDetail
                              }
                              teamBookingList={teamBookingList}
                              setViewUser={setViewUser}
                              setSearchDetails={setSearchDetails}
                              getTeamBookingDetails={getTeamBookingDetails}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <UserViewProfile viewData={viewUser} />
            )}
          </>
        </>
      </div>
    </>
  );
};

export default UserViewLocate;
