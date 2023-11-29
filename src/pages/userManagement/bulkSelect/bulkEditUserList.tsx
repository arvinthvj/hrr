import React, { useContext, useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import BulkEditConfirm from './bulkEditConfirm';
import { postData } from '../../../services/apicall';
import { editInfo } from '../../../services/apiurl';
import { Link, useLocation } from 'react-router-dom';
import {
  LeftAngle,
  Search,
  bookLocation,
  dropdown_angel,
  history_icon,
  member,
  setting_icon,
  teamIcon,
} from '../../../components/imagepath';
import {
  UserDefaultAssetList,
  hrPermissionGroupList,
  locationListApi,
  userManagementBulkUplode,
  userManagementHealthAndSafetyList,
  userManagementPermissionsList,
  userManagementTeamList,
  userManagementlocationList,
  // hrPermissionGroup,
  // getHrPermissionGroup,
} from '../../../services/apiurl';
import { useForm } from 'react-hook-form';
import userManagementContext from '../context';
import Toaster from '../../../components/toast';
import { useDispatch, useSelector } from 'react-redux';
import DropDownOptions from '../../../components/dropDown/dropdownOptions';
import {
  editTypesForUserSettings,
  global,
  timeFormat_24,
} from '../../../assets/constants/config';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Loader from '../../../components/loader';
import { fileTypeAll } from '../../../assets/globals';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { Col, Popover, Row, TimePicker } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import {
  findLabelText,
  getPreferedTimeFormat,
  validateLoginUser,
} from '../../../components/commonMethod';
import {
  ApiStatusCode,
  UserDataEvent,
  UserSettingsLabels,
} from '../../../components/userManagement/constant';
import LocationSelectorComponent from '../../../components/locationSelectorComponent';

type createUserFormProps = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
};

function BulkEditUserList({
  setBulkSelect,
  handleClick,
  finalbulkuserlist,
  successData,
  SetFinalBulkUserList,
}) {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<createUserFormProps>({
    resolver: yupResolver(schema),
  });

  const [active, setActive] = useState(true),
    [permission, setPermission] = useState([]),
    [teamlist, setTeamList] = useState([]),
    [handslist, setHandSList] = useState([]),
    [permissionstatus, setPermissionStatus] = useState<any[]>([]),
    [hrpermissionstatus, setHRPermissionStatus] = useState<any[]>([]),
    [defaultAssetDetails, setDefaultAssetDetails] = useState<any>([]),
    [teamstatus, setTeamStatus] = useState([]),
    [secteamstatus, setSecTeamStatus] = useState<any>([]),
    [chooseTeam, setChooseTeam] = useState<any>([]),
    [secondaryTeam, setSecondaryTeam] = useState<any>([]),
    [secTeamNew, setSecTeamNew] = useState<any>([]),
    [hansstatus, HandsStatus] = useState([]),
    [hrPermissionGroup, setHrPermissionGroup] = useState<any[]>([]),
    [notificationList, setNotificationList] = useState<any>([
      { id: 1, name: 'Check in alerts (Push)', status: 0 },
      { id: 2, name: 'Check in alerts (Email)', status: 0 },
      { id: 3, name: 'Booking change alerts (Push)', status: 0 },
      { id: 4, name: 'Booking change alerts (Email)', status: 0 },
    ]),
    [isDisable, setIsDisable] = useState(false),
    [warningContent, setWarningContent] = useState(''),
    [warning, setWarning] = useState(''),
    [notificationStatus, setNotificationStatus] = useState<any>([]),
    [defaultFloor, setDefaultFloor] = useState<any | undefined>(''),
    [defaultBuliding, setDefaultBuliding] = useState<any | undefined>(''),
    [floorId, setFloorId] = useState<number | string | undefined>(''),
    [locationOption, setLocationOption] = useState<any>([]),
    [locationValue, setLocationValue] = useState<any>({}),
    [allLocation, setAllLocation] = useState<any>([]),
    [searchText, setSearchText] = useState({
      value: '',
      PrimaryTeam: [],
    }),
    [searchSecTeam, setSearchSecTeam] = useState({
      value: '',
      SecondaryTeam: [],
    }),
    [resetuser, setResetUser] = useState({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
    }),
    [memberSearch, setMemberSearch] = useState(''),
    [disableSave, setDisableSave] = useState(true),
    [loaderloading, setLoaderLoading] = useState(false),
    [memberSearchList, setMemberSearchList] = useState([]),
    [noResultText, setNoResultText] = useState(''),
    [workspaceSearch, setWorkspaceSearch] = useState(''),
    [workspaceSearchList, setWorkspaceSearchList] = useState([]),
    [workspaceSearchListCopy, setworkspaceSearchListCopy] = useState([]),
    [roomSearchListCopy, setRoomSearchListCopy] = useState([]),
    [parkingSearchListCopy, setParkingSearchListCopy] = useState([]),
    [roomSearch, setRoomSearch] = useState(''),
    [roomSearchList, setRoomSearchList] = useState([]),
    [parkingSearch, setParkingSearch] = useState(''),
    [parkingSearchList, setParkingSearchList] = useState([]),
    [selectedmemberList, setSelectedMemberhList] = useState<any>([]),
    [selectedWorkspaceList, setSelectedWorkspaceList] = useState<any>([]),
    [selectedRoomList, setSelectedRoomList] = useState<any>([]),
    [selectedParkingList, setSelectedParkingList] = useState<any>([]),
    [noWorkspaceResultText, setNoWorkspaceResultText] = useState(''),
    [noRoomResultText, setNoRoomResultText] = useState(''),
    [noParkingResultText, setNoParkingResultText] = useState(''),
    [locationDropdown, setLocationDropdown] = useState(false);
  const [workspaceFocus, setWorkspaceFocus] = useState<boolean>(false);
  const [roomFocus, setRoomFocus] = useState<boolean>(false);
  const [parkingFocus, setParkingFocus] = useState<boolean>(false);
  const [workspaceDays, setWorkspaceDays] = useState(0);
  const [parkingDays, setParkingDays] = useState(0);
  const [roomDays, setRoomDays] = useState(0);
  const [minDaysInOffice, setMinDaysInOffice] = useState(0);
  const [days, setDays] = useState(0);
  const { userDetails } = useSelector((state: any) => state.app);
  const [teamLoaderFlag, setTeamLoaderFlag] = useState(false);
  const [csvTemplate, setCsvTemplate] = useState('');
  const [selectedTab, setSelectedTab] = useState('1');
  const [bulkEditDetails, setBulkEditDetails] = useState<any>({});
  const [bulkUsers, setBulkUsers] = useState<any>([]);
  const [newChanges, setNewChanges] = useState<any>({});
  const [removeTeamId, setRemoveTeamId] = useState<any>([]);
  const [removePrimaryId, setRemovePrimaryId] = useState([]);
  const [collapseClass, setCollapseClass] = useState<any>({
    personalDetail: true,
    permissionGroup: false,
    hrPermissionGroup: false,
    HS: false,
    primaryTeam: true,
    secondaryTeam: true,
    personalLimits: true,
  });
  const [startTime, setStartTime] = useState({
    data: userDetails?.start_working_hour
      ? userDetails?.start_working_hour
      : '07:00',
    count: 0,
  });
  const [endTime, setEndTime] = useState({
    data: userDetails?.end_working_hour
      ? userDetails?.end_working_hour
      : '22:00',
    count: 0,
  });
  const labelChanges = {
    first_name: 'First name',
    last_name: 'Last name',
    display_name: 'Display name',
    email: 'Email',
    location_id: 'Default Location',
    default_workspace: 'Default Workspace',
    default_room: 'Default Room',
    default_parking: 'Default Parking',
    start_working_hours: 'Default Start Hour',
    end_working_hours: 'Default End Hour',
    workspace_count: 'Workspaces',
    room_count: 'Rooms',
    parking_count: 'parking',
    min_office_days: 'Minimum days in office',
    permission_group_id: 'Permission Groups',
    hr_permission_group_id: 'HR Permission Groups',
    health_safety_id: 'Emergency Responders',
    'Check in alerts (Push)': 'checkin_push_alert',
    'Check in alerts (Email)': 'checkin_email_alert',
    'Booking change alerts (Push)': 'booking_push_alert',
    'Booking change alerts (Email)': 'booking_email_alert',
    primary_team_id: 'Primary Team',
    team_id: 'Secondary Team',
  };
  const { dispatchUserDataEvent } = useContext(userManagementContext);
  const { languages } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  const locationState = useLocation();
  useEffect(() => {
    getDataList();
    setSelectedMemberhList(userDetails?.location);
  }, []);

  const getHrPermission = (data, res) => {
    if (res?.data?.code == 200) {
      setHRPermissionStatus(
        data
          ?.filter((permission: any) => permission.status == 1)
          ?.map((status: any) => status.id),
      );
      setHrPermissionGroup(data);
    }
  };

  useEffect(() => {
    const data = [
      {
        id: 5,
        name: 'Team Manager',
        slug: 'team_manager',
      },
      {
        id: 6,
        name: 'User',
        slug: 'user',
      },
    ];
  }, []);

  const getPermissionList = data => {
    setPermission(data?.List);
    if (data?.List.length > 0) {
      setDays(
        data?.List?.[0]?.company_min_office_week
          ? Number(data?.List?.[0]?.company_min_office_week)
          : 0,
      );
      const result = data?.List?.filter(item => item.status == 1)?.map(
        val => val.id,
      );
      setPermissionStatus(result);
    }
  };
  const getTeamList = data => {
    setTeamLoaderFlag(false);
    setTeamList(data?.List);
    dispatchUserDataEvent(UserDataEvent.addTeam, data?.List);
  };
  const getHandSList = data => {
    setHandSList(data?.List);
  };
  const getDataList = () => {
    postData(userManagementPermissionsList, '', getPermissionList);
    setTeamLoaderFlag(true);
    postData(userManagementTeamList, '', getTeamList);
    postData(userManagementHealthAndSafetyList, '', getHandSList);
    postData(hrPermissionGroupList, '', getHrPermission);
  };

  const onSubmit = e => {
    setSelectedTab('4');
    const bulkData = {
      location_id: locationValue?.value ? locationValue?.value : floorId,
      default_workspace: selectedWorkspaceList[0]?.workspace_id,
      default_room: selectedRoomList[0]?.workspace_id,
      default_parking: selectedParkingList[0]?.workspace_id,
      start_working_hours: startTime?.data,
      end_working_hours: endTime?.data,
      workspace_count: workspaceDays,
      room_count: roomDays,
      parking_count: parkingDays,
      min_office_days: minDaysInOffice,
      permission_group_id: permissionstatus?.toString(),
      hr_permission_group_id: hrpermissionstatus?.toString(),
      health_safety_id: hansstatus?.toString(),
      checkin_push: notificationStatus?.find(ele => ele === 1) ? 1 : 0,
      checkin_email: notificationStatus?.find(ele => ele === 2) ? 1 : 0,
      bookingchange_push: notificationStatus?.find(ele => ele === 3) ? 1 : 0,
      bookingchange_email: notificationStatus?.find(ele => ele === 4) ? 1 : 0,
      primary_team_id: teamstatus?.toString(),
      team_id: secteamstatus?.toString(),
      profile_photo: '',
      status: active ? 1 : 0,
    };
    setBulkEditDetails(bulkData);
  };

  const handleClear = () => {
    setBulkSelect(false);
    reset(resetuser);
    // SetFinalBulkUserList([])
  };

  const handleStatus = (item, index, type) => {
    if (type == editTypesForUserSettings.permission_group) {
      const val: any = [];
      const label: any = [];
      const Data: any = [...permission];
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
          label.push(i?.name);
        }
      }
      setPermissionStatus([...val]);
      const permission_group_id: any = label?.toString();
      setNewChanges({
        ...newChanges,
        permission_group_id: permission_group_id,
      });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
    if (type == editTypesForUserSettings?.notification) {
      const val: any = [];
      const Data: any = [...notificationList];
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
        }
      }
      setNotificationStatus([...val]);
      const labelName = labelChanges[item?.name];
      setNewChanges({ ...newChanges, [labelName]: '1' });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
    if (type == editTypesForUserSettings.teams) {
      const val: any = [];
      const label: any = [];
      const chooseTeam: any = [];
      val.push(item.id);
      label.push(item?.name);
      chooseTeam.push(item);

      setTeamStatus(val);
      setChooseTeam(chooseTeam);
      setSearchText({
        value: '',
        PrimaryTeam: [],
      });
      // if (item?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
      const primary_team_id: any = label?.toString();
      setNewChanges({ ...newChanges, primary_team_id: primary_team_id });
    }
    if (type == editTypesForUserSettings.secondary) {
      const List = secondaryTeam?.filter((ele: any) => {
        return ele.id == item.id;
      });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
      if (List.length > 0) {
      } else {
        setSecTeamStatus([...secteamstatus, item.id]);
        setSecondaryTeam([...secondaryTeam, item]);
        const label: any = [];
        label.push(item?.name);
        setSecTeamNew([...secTeamNew, item?.name]);
        const newSec = [...label, ...secTeamNew];
        setNewChanges({ ...newChanges, team_id: newSec?.toString() });
      }
      setSearchSecTeam({
        value: '',
        SecondaryTeam: [],
      });
    }
    if (type == editTypesForUserSettings.hands) {
      const val: any = [];
      const label: any = [];
      const Data: any = handslist;
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
          label.push(i?.name);
        }
      }
      HandsStatus(val);
      const healy_safety: any = label?.toString();
      setNewChanges({ ...newChanges, health_safety_id: healy_safety });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
    if (type == editTypesForUserSettings.hr_permission_group) {
      const val: any = [];
      const label: any = [];
      const Data: any = hrPermissionGroup;
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
          label.push(i?.group_name);
        }
      }
      setHRPermissionStatus(val);
      const hr_permission_group_id: any = label?.toString();
      setNewChanges({
        ...newChanges,
        hr_permission_group_id: hr_permission_group_id,
      });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
  };

  const uploadCsvFile = async e => {
    const csvFile = e?.target?.files[0];
    const validFile = fileTypeAll?.includes(csvFile?.type);
    if (!validFile) {
      Toaster('error', UserSettingsLabels.bulkUploadFileTypeError);
      return false;
    } else {
      dispatch(showLoader());
      handleImageUploadtoS3Bucket(
        csvFile,
        'csv',
        data => {
          const payload = {
            file: data,
            first_name: userDetails?.first_name,
          };
          postData(userManagementBulkUplode, payload, (data, res) => {
            Toaster(res?.data?.code, res?.data?.message);
            dispatch(hideLoader());
            if (res?.data?.code == ApiStatusCode.SUCCESS) {
            }
          });
        },

        '',
        '',
        '',
      );
    }
  };
  useEffect(() => {
    validateLoginUser()?.slug != 'administrator' &&
      setValue(
        'displayName',
        (getValues('firstName') ? getValues('firstName')?.trim() : '') +
          ' ' +
          (getValues('lastName') ? getValues('lastName') : ''),
      );
  }, [getValues('firstName'), getValues('lastName')]);

  useEffect(() => {
    setNoResultText('');
    const debounce = setTimeout(() => {
      memberSearch && getManagementList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [memberSearch]);

  const getManagementList = () => {
    setLoaderLoading(true);
    postData(userManagementlocationList, { name: memberSearch }, successRes => {
      setLoaderLoading(false);
      if (successRes?.List?.length > 0) {
        setMemberSearchList(successRes.List);
      } else {
        setMemberSearchList([]);
        setNoResultText(UserSettingsLabels.noResultFound);
      }
    });
  };

  const changeMenderSearchText = event => {
    if (event.target.value.trim() == '') {
      setNoResultText('');
    }
    setMemberSearch(event.target.value);
  };

  const changeWorkspaceSearchText = event => {
    const val = event.target.value;
    if (event.target.value.trim() == '') {
      setNoWorkspaceResultText('');
      getWorkspaceList();
    }
    setWorkspaceSearch(event.target.value);
  };

  const changeRoomSearchText = event => {
    const val = event.target.value;
    if (event.target.value.trim() == '') {
      setNoRoomResultText('');
      getRoomList();
    }
    setRoomSearch(event.target.value);
  };

  const changeParkingSearchText = event => {
    const val = event.target.value;
    if (event.target.value.trim() == '') {
      setNoParkingResultText('');
      getParkingList();
    }
    setParkingSearch(event.target.value);
  };

  const disablefield = () => {
    const data = userDetails?.roles?.filter(res => {
      if (res?.slug == 'administrator') {
        return res;
      }
    });
    return data?.length > 0 ? '' : true;
  };

  const endHoursDisable = () => {
    const h = parseInt(startTime?.data?.split(':')[0]);
    const m = parseInt(startTime?.data?.split(':')[1]);
    const hours: any = [];
    const len = m == 59 ? h + 1 : h;
    for (let i = 0; i < len; i++) {
      hours.push(i);
    }
    return hours;
  };

  const endMinutesDisable = selectedHour => {
    const h = parseInt(startTime?.data?.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(startTime?.data?.split(':')[1]);
      for (let i = 0; i <= m; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };

  const startdHoursDisable = () => {
    const hours: any = [];

    let h = parseInt(endTime?.data?.split(':')[0]);
    const m = parseInt(endTime?.data?.split(':')[1]);
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
    const h = parseInt(endTime?.data?.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(endTime?.data?.split(':')[1]);
      for (let i = m; i <= 60; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  };

  useEffect(() => {
    onSearchChange(searchText?.value);
    onSecondarySearch(searchSecTeam?.value);
  }, [teamlist]);
  const onSearchChange = val => {
    const primaryTeam: any = [];
    if (val !== '') {
      teamlist?.map((i: any) => {
        if (i?.name !== null && i?.name.toLowerCase().includes(val))
          primaryTeam.push(i);
      });
      const resultPrimary = primaryTeam?.filter(
        (o1: any) => !secondaryTeam?.some(o2 => o1.id === o2.id),
      );
      setSearchText({
        value: val,
        PrimaryTeam: resultPrimary,
      });
    } else {
      setSearchText({
        value: '',
        PrimaryTeam: [],
      });
    }
  };
  const onSecondarySearch = val => {
    const secondaryTeam: any = [];
    if (val !== '') {
      teamlist?.map((i: any) => {
        if (i?.name !== null && i?.name.toLowerCase().includes(val))
          secondaryTeam.push(i);
      });
      const resultSecondary = secondaryTeam?.filter(
        (o1: any) => !chooseTeam?.some(o2 => o1.id === o2.id),
      );
      setSearchSecTeam({
        value: val,
        SecondaryTeam: resultSecondary,
      });
    } else {
      setSearchSecTeam({
        value: '',
        SecondaryTeam: [],
      });
    }
  };
  const updateTeamUsers = (item, index) => {
    const List = secondaryTeam;
    const Data = List?.filter(ele => {
      return ele?.id != item?.id;
    });
    const DataId = Data?.map(e => {
      return e?.id;
    });
    const DataName = Data?.map(e => {
      return e?.name;
    });
    setSecondaryTeam(Data);
    setSecTeamStatus(DataId);
    setRemoveTeamId([...removeTeamId, item.id]);
    setSecTeamNew(DataName);
    setNewChanges({ ...newChanges, team_id: DataName?.toString() });
  };
  const handleDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setDays(day);
    }
  };

  const workspaceContent = (
    <div className="user-popover">
      <h4>Allow advance bookings: Workspace</h4>
      <p>The number of days in advance that a user can book a workspace.</p>
      <p>0 = unlimited</p>
    </div>
  );
  const workspaceTitle = '';

  const roomContent = (
    <div className="user-popover">
      <h4>Allow advance bookings: Rooms</h4>
      <p>The number of days in advance that a user can book a room.</p>
      <p>0 = unlimited</p>
    </div>
  );
  const roomTitle = '';

  const parkingContent = (
    <div className="user-popover">
      <h4>Allow advance bookings: Parking</h4>
      <p>The number of days in advance that a user can book a parking space.</p>
      <p>0 = unlimited</p>
    </div>
  );
  const parkingTitle = '';

  const minOfficeDaysContent = (
    <div className="user-popover">
      <h4>Minimum in office days</h4>
      <p>The minimum number of days in a month the user should be in office.</p>
      <p>0 = unlimited</p>
    </div>
  );
  const minOfficeDaysTitle = '';

  const splitTet1 = () => {
    return (
      <div className="location-booking location-booking-info">
        <div className="booking-desk-details location-hierarchy">
          <h6>
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[0]
              : defaultBuliding}
          </h6>
          <p>
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[1]
              : defaultFloor}
          </p>
          {/* <h6>Hello World</h6> */}
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };
  const dropdownRef = useRef<null | any>();
  useEffect(() => {
    const textsplit = userDetails?.location?.[0]?.name?.toString()?.split(',');
    // setFloorId(userDetails?.location_id);
    // setDefaultBuliding(textsplit?.[0]);
    // setDefaultFloor(textsplit?.[1]);
  }, [userDetails]);
  const handleLocationChange = data => {
    setFloorId(data);
    setLocationValue(locationOption?.find((i: any) => i.value == data));
    const val = locationOption?.find((i: any) => i.value == data)?.label;
    setNewChanges({
      ...newChanges,
      location_id: val,
    });
    if (!data) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  };

  useEffect(() => {
    let locSort = [];
    dispatch(showLoader());
    postData(locationListApi, '', (loclist, res) => {
      dispatch(hideLoader());
      const Z = loclist?.List?.sort((a, b) => a.id - b.id);
      locSort = Z?.map(i => ({
        label: i?.name,
        value: i?.id,
        hierarchy: i?.fullname,
        timezone: i?.timezone,
      }));
      setLocationOption(locSort);
    });
  }, [locationState?.state]);

  useEffect(() => {
    postData(UserDefaultAssetList, '', (successRes, res) => {
      setDefaultAssetDetails(successRes?.workspaceDetails);
    });
  }, []);

  useEffect(() => {
    getWorkspaceList();
    getRoomList();
    getParkingList();
  }, [defaultAssetDetails]);
  const getWorkspaceList = () => {
    // setLoaderLoading(true);
    setNoWorkspaceResultText('');
    if (defaultAssetDetails?.length > 0) {
      setLoaderLoading(false);
      const workspaceList = defaultAssetDetails?.filter(each => {
        return each?.floor_plan_type_id === 1;
      });
      if (workspaceList?.length > 0) {
        setWorkspaceSearchList(workspaceList);
        setworkspaceSearchListCopy(workspaceList);
      } else {
        setNoWorkspaceResultText(UserSettingsLabels.noResultFound);
        setWorkspaceSearchList([]);
      }
    } else {
      // setNoWorkspaceResultText(UserSettingsLabels.noResultFound);
      setNoWorkspaceResultText('');
    }
  };

  const getRoomList = () => {
    setNoRoomResultText('');

    if (defaultAssetDetails?.length > 0) {
      setLoaderLoading(false);
      const roomList = defaultAssetDetails?.filter(each => {
        return each?.floor_plan_type_id === 2;
      });
      if (roomList?.length > 0) {
        setRoomSearchList(roomList);
        setRoomSearchListCopy(roomList);
      } else {
        setNoRoomResultText(UserSettingsLabels.noResultFound);
        setRoomSearchList([]);
      }
    } else {
      // setNoRoomResultText(UserSettingsLabels.noResultFound)
      setNoRoomResultText('');
    }
  };

  const getParkingList = () => {
    setNoParkingResultText('');
    if (defaultAssetDetails?.length > 0) {
      setLoaderLoading(false);
      const parkingList = defaultAssetDetails?.filter(each => {
        return each?.floor_plan_type_id === 3;
      });
      if (parkingList?.length > 0) {
        setParkingSearchList(parkingList);
        setParkingSearchListCopy(parkingList);
      } else {
        setNoParkingResultText(UserSettingsLabels.noResultFound);
        setParkingSearchList([]);
      }
    } else {
      // setNoParkingResultText(UserSettingsLabels.noResultFound);
      setNoParkingResultText('');
    }
  };

  const getFilteredWorkspace = workspaceSearch => {
    const workspaceFilter = workspaceSearchListCopy?.filter(each => {
      const res = each?.name
        ?.toLowerCase()
        ?.includes(workspaceSearch?.toLowerCase());
      return res;
    });
    if (workspaceFilter?.length > 0) {
      setWorkspaceSearchList(workspaceFilter);
    } else {
      workspaceSearch &&
        setNoWorkspaceResultText(UserSettingsLabels.noResultFound);
      setWorkspaceSearchList([]);
    }
  };

  const getFilteredRoom = roomSearch => {
    const roomFilter = roomSearchListCopy?.filter(each => {
      const res = each?.name
        ?.toLowerCase()
        ?.includes(roomSearch?.toLowerCase());
      return res;
    });
    if (roomFilter?.length > 0) {
      setRoomSearchList(roomFilter);
    } else {
      roomSearch && setNoRoomResultText(UserSettingsLabels.noResultFound);
      setRoomSearchList([]);
    }
  };

  const getFilteredParking = parkingSearch => {
    const parkingFilter = parkingSearchListCopy?.filter(each => {
      const res = each?.name
        ?.toLowerCase()
        ?.includes(parkingSearch?.toLowerCase());
      return res;
    });
    if (parkingFilter?.length > 0) {
      setParkingSearchList(parkingFilter);
    } else {
      parkingSearch && setNoParkingResultText(UserSettingsLabels.noResultFound);
      setParkingSearchList([]);
    }
  };

  const handleWorkspaceDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setWorkspaceDays(day);
      setNewChanges({ ...newChanges, workspace_count: day });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
  };

  const handleRoomDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setRoomDays(day);
      setNewChanges({ ...newChanges, room_count: day });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
  };

  const handleParkingDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setParkingDays(day);
      setNewChanges({ ...newChanges, parking_count: day });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
  };

  const handleMinDaysInOfficeChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setMinDaysInOffice(day);
      setNewChanges({ ...newChanges, min_office_days: day });
      // if (teamstatus?.length == 0 || !locationValue?.value) {
      //   setDisableSave(true);
      // } else {
      //   setDisableSave(false);
      // }
      setDisableSave(false);
    }
  };

  const checkUserRoles = () => {
    if (permissionstatus?.length > 1) {
      setWarningContent(
        global.validationLabel.userManagement.cantInactiveWarning,
      );
      setWarning('NO_INACTIVE');
    } else {
      setWarningContent(global.validationLabel.userManagement.inactiveWarning);
      setWarning('INACTIVE');
    }
  };

  useEffect(() => {
    getFilteredWorkspace(workspaceSearch);
    if (workspaceSearch) {
      setSelectedWorkspaceList([]);
    }
  }, [workspaceSearch]);

  useEffect(() => {
    getFilteredRoom(roomSearch);
    if (roomSearch) {
      setSelectedRoomList([]);
    }
  }, [roomSearch]);

  useEffect(() => {
    getFilteredParking(parkingSearch);
    if (parkingSearch) {
      setSelectedParkingList([]);
    }
  }, [parkingSearch]);

  useEffect(() => {
    getWorkspaceList();
    getRoomList();
    getParkingList();
  }, []);

  const handleTab = () => {
    setSelectedTab('1');
  };
  return (
    <Col span={6} className={` left-right-space main-space-remove-left d-flex`}>
      <div className="card w-100 p-0 locate-inner-card">
        {selectedTab != '4' && (
          <>
            <div className="book-tabs user-management-tabs me-0 pb-0">
              <ul className="nav">
                <li>
                  <Link
                    to="#"
                    className={
                      selectedTab == '1'
                        ? 'active settings-tab-radius'
                        : 'settings-tab-radius'
                    }
                    role="tab"
                    aria-controls="nav-settings"
                    onClick={() => setSelectedTab('1')}
                  >
                    <img src={setting_icon} alt="" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={selectedTab == '2' ? 'active' : ''}
                    role="tab"
                    aria-controls="nav-profile"
                    onClick={() => setSelectedTab('2')}
                  >
                    <img src={member} alt="" />
                  </Link>
                </li>
                {/* History Tab  */}
                {/* <li>
              <Link
                to="#"
                className={selectedTab == "3" ? "active" : ""}
                role="tab"
                aria-controls="nav-history"
                onClick={() => setSelectedTab("3")}
              >
                <img src={history_icon} alt="" />
              </Link>
            </li> */}
              </ul>
            </div>
            <div className="location-set pb-0">
              <div className="location-back-head">
                <div className="user-new-heading">
                  <div className="user-back-arrow">
                    <Link to="#" className="link-cancel" onClick={handleClear}>
                      <img src={LeftAngle} alt="img" />
                    </Link>
                  </div>
                  <div className="user-heading-content">
                    <h2>
                      {selectedTab == '1'
                        ? findLabelText('Settings', 'Settings', 'Dashboard')
                        : ''}
                      {selectedTab == '2'
                        ? findLabelText('Teams', 'Teams', 'Dashboard')
                        : ''}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTab == '1' ? (
          <div className="create-locationsets create-location-sets user-location-inner">
            <div className="location-scroll location-scroll-inner-height">
              <div className="user-select-grid">
                <div className="user-select-heading">
                  <h4>
                    Selected <span>({finalbulkuserlist?.length})</span>{' '}
                  </h4>
                </div>
                <div className="user-select-info">
                  {finalbulkuserlist?.length > 0 &&
                    finalbulkuserlist?.map(user => {
                      return (
                        <div className="user-select-list" key={user?.id}>
                          <p>
                            {user?.display_name}{' '}
                            <span>{user?.primary_teams[0]?.name}</span>
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="user-footer-content">
                <div>
                  {chooseTeam?.length == 0 && (
                    <label
                      className="user-management-team-error-message"
                      style={{ color: 'red' }}
                    >
                      {UserSettingsLabels.userBulkEdit}
                    </label>
                  )}
                </div>
              </div>
              {/* Active checkbox  */}
              <div className="table-headercheck table-header-check-info">
                <div className="checkbox-set">
                  <label className="check">
                    {findLabelText('Active', 'Active', 'User_Management')}
                    <input
                      type="checkbox"
                      data-bs-toggle={active ? 'modal' : ''}
                      data-bs-target={active ? '#delete-modal' : ''}
                      checked={active}
                      onChange={e => {
                        setActive(!active);
                        setNewChanges({
                          ...newChanges,
                          status: e.target.checked,
                        });
                        setDisableSave(false);
                      }}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>

              {/* Personal Defaults  */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    data-bs-toggle="collapse"
                    className="collapsed"
                    to="#locate"
                    role="button"
                    aria-expanded={
                      collapseClass?.personalDefaults == true ? 'true' : 'false'
                    }
                    aria-controls="locate"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        personalDefaults: !collapseClass?.personalDefaults,
                      })
                    }
                  >
                    {findLabelText(
                      'Personal_defaults',
                      'Personal defaults',
                      'User_Management',
                    )}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={
                        collapseClass.personalDefaults
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.personalDefaults == true ? 'block' : 'none'
                    }`,
                  }}
                  id="locate"
                >
                  <div className="user-personal-details">
                    {/* Location  */}
                    <div className="user-personal-inner user-global-search">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {findLabelText(
                                'Default Location',
                                'Default Location',
                                'User_Management',
                              )}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div
                              className="change-quick-book-header location-change-header shadow-none mb-0 pb-0"
                              ref={dropdownRef}
                              onClick={() =>
                                setLocationDropdown(!locationDropdown)
                              }
                            >
                              {splitTet1()}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div
                        className={`global-search-section global-search-section-info ${
                          locationDropdown ? 'd-block' : 'd-none'
                        }`}
                      >
                        <LocationSelectorComponent
                          locationId={''}
                          locationNames={''}
                          setDefaultFloor={setDefaultFloor}
                          setDefaultBuliding={setDefaultBuliding}
                          handleLocationChange={handleLocationChange}
                          floorId={floorId}
                          setLocationDropdown={setLocationDropdown}
                          setTimeZone={() => {}}
                          setAllLocation={setAllLocation}
                        />
                      </div>
                      {/* {!locationValue?.value ? (
                        <label
                          className="user-management-team-error-message"
                          style={{ color: 'red' }}
                        >
                          {UserSettingsLabels.pleaseSelectLocation}
                        </label>
                      ) : (
                        ''
                      )} */}
                    </div>

                    {/* Default workspace */}
                    <div className="user-personal-inner user-global-search">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {findLabelText(
                                'Default workspace',
                                'Default workspace',
                                'User_Management',
                              )}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div className="user-personal-input">
                              <input
                                value={
                                  workspaceSearch
                                    ? workspaceSearch
                                    : selectedWorkspaceList[0]?.name
                                }
                                onFocus={() => {
                                  setWorkspaceFocus(true);
                                }}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setWorkspaceFocus(false);
                                  }, 500);
                                }}
                                type="text"
                                placeholder={'Search Workspace'}
                                className="input-filter bg-white user-input-filters"
                                onChange={e => {
                                  changeWorkspaceSearchText(e);
                                }}
                              />
                              <div className="user-personal-search-icon">
                                <Link to="#">
                                  <img src={Search} alt="img" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {/* {loaderloading && (
                      <Loader height={"30"} width={"30"} />
                      )} */}
                      {/* {noResultText && (
                        <p className="no-result-text">{noResultText}</p>
                      )} */}
                      {workspaceFocus && workspaceSearchList?.length > 0 ? (
                        <DropDownOptions
                          type="null"
                          options={workspaceSearchList}
                          onChange={opt => {
                            try {
                              const newData = [opt];
                              setSelectedWorkspaceList([...newData]);
                              setWorkspaceSearch('');
                              getWorkspaceList();
                              setWorkspaceFocus(false);
                              setNoWorkspaceResultText('');
                              // {
                              //   teamstatus?.length == 0 || !locationValue?.value
                              //     ? setDisableSave(true)
                              //     : setDisableSave(false);
                              // }
                              setDisableSave(false);
                              setNewChanges({
                                ...newChanges,
                                default_workspace: newData[0]?.name,
                              });
                            } catch (e) {}
                          }}
                        />
                      ) : (
                        <p className="no-result-text">
                          {noWorkspaceResultText}
                        </p>
                      )}
                    </div>

                    {/* Default Room */}
                    <div className="user-personal-inner user-global-search">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {findLabelText(
                                'Default Room',
                                'Default Room',
                                'User_Management',
                              )}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div className="user-personal-input">
                              <input
                                value={
                                  roomSearch
                                    ? roomSearch
                                    : selectedRoomList[0]?.name
                                }
                                type="text"
                                placeholder={'Search Room'}
                                className="input-filter bg-white user-input-filters"
                                onChange={changeRoomSearchText}
                                onFocus={() => {
                                  setRoomFocus(true);
                                }}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setRoomFocus(false);
                                  }, 500);
                                }}
                              />
                              <div className="user-personal-search-icon">
                                <Link to="#">
                                  <img src={Search} alt="img" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {/* {loaderloading && (
                      <Loader height={"30"} width={"30"} />
                      )} */}
                      {/* {noResultText && (
                        <p className="no-result-text">{noResultText}</p>
                      )} */}
                      {roomFocus && roomSearchList?.length > 0 ? (
                        <DropDownOptions
                          type="null"
                          options={roomSearchList}
                          onChange={opt => {
                            try {
                              const newData = [opt];
                              setSelectedRoomList([...newData]);
                              setRoomSearch('');
                              getRoomList();
                              setRoomFocus(false);
                              setNoRoomResultText('');
                              // {
                              //   teamstatus?.length == 0 || !locationValue?.value
                              //     ? setDisableSave(true)
                              //     : setDisableSave(false);
                              // }
                              setDisableSave(false);
                              setNewChanges({
                                ...newChanges,
                                default_room: newData[0]?.name,
                              });
                            } catch (e) {}
                          }}
                        />
                      ) : (
                        <p className="no-result-text">{noRoomResultText}</p>
                      )}
                    </div>

                    {/* Default Parking */}
                    <div className="user-personal-inner user-global-search">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {findLabelText(
                                'Default Parking',
                                'Default Parking',
                                'User_Management',
                              )}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div className="user-personal-input">
                              <input
                                value={
                                  parkingSearch
                                    ? parkingSearch
                                    : selectedParkingList[0]?.name
                                }
                                type="text"
                                placeholder={'Search parking'}
                                className="input-filter bg-white user-input-filters"
                                onChange={changeParkingSearchText}
                                onFocus={() => {
                                  setParkingFocus(true);
                                }}
                                onBlur={() => {
                                  setTimeout(() => {
                                    setParkingFocus(false);
                                  }, 500);
                                }}
                              />
                              <div className="user-personal-search-icon">
                                <Link to="#">
                                  <img src={Search} alt="img" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {/* {loaderloading && (
                      <Loader height={"30"} width={"30"} />
                      )} */}
                      {/* {noResultText && (
                        <p className="no-result-text">{noResultText}</p>
                      )} */}
                      {parkingFocus && parkingSearchList?.length > 0 ? (
                        <DropDownOptions
                          type="null"
                          options={parkingSearchList}
                          onChange={opt => {
                            try {
                              const newData = [opt];
                              setSelectedParkingList([...newData]);
                              setParkingSearch('');
                              getParkingList();
                              setParkingFocus(false);
                              setNoParkingResultText('');
                              // {
                              //   teamstatus?.length == 0 || !locationValue?.value
                              //     ? setDisableSave(true)
                              //     : setDisableSave(false);
                              // }
                              setDisableSave(false);
                              setNewChanges({
                                ...newChanges,
                                default_parking: newData[0]?.name,
                              });
                            } catch (e) {}
                          }}
                        />
                      ) : (
                        <p className="no-result-text">{noParkingResultText}</p>
                      )}
                    </div>

                    {/* Default working hours */}
                    <div className="user-personal-inner">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {languages?.Settings
                                ? languages?.Settings?.Default_working_hours
                                    ?.name
                                : 'Default working hours'}{' '}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div className="user-working-hours">
                              <div className="user-timing">
                                <TimePicker
                                  onChange={e => {
                                    const time =
                                      moment(e).format(timeFormat_24);
                                    setStartTime({
                                      ...startTime,
                                      data: time,
                                      count: startTime.count + 1,
                                    });
                                    // {
                                    //   teamstatus?.length == 0 ||
                                    //   !locationValue?.value
                                    //     ? setDisableSave(true)
                                    //     : setDisableSave(false);
                                    // }
                                    setDisableSave(false);
                                    setNewChanges({
                                      ...newChanges,
                                      start_working_hour: time,
                                    });
                                  }}
                                  value={moment(startTime?.data, timeFormat_24)}
                                  placeholder={startTime?.data}
                                  format={getPreferedTimeFormat()}
                                  suffixIcon={<div></div>}
                                  allowClear={false}
                                  bordered={false}
                                  disabledHours={startdHoursDisable}
                                  disabledMinutes={startMinutesDisable}
                                  showNow={false}
                                  inputReadOnly={true}
                                />
                              </div>
                              <div className="user-timing user-timing-info">
                                <TimePicker
                                  value={moment(endTime?.data, timeFormat_24)}
                                  onChange={e => {
                                    const time =
                                      moment(e).format(timeFormat_24);
                                    setEndTime({
                                      ...endTime,
                                      data: time,
                                      count: endTime.count + 1,
                                    });
                                    // {
                                    //   teamstatus?.length == 0 ||
                                    //   !locationValue?.value
                                    //     ? setDisableSave(true)
                                    //     : setDisableSave(false);
                                    // }
                                    setDisableSave(false);
                                    setNewChanges({
                                      ...newChanges,
                                      end_working_hour: time,
                                    });
                                  }}
                                  placeholder={endTime?.data}
                                  format={getPreferedTimeFormat()}
                                  suffixIcon={<div></div>}
                                  allowClear={false}
                                  bordered={false}
                                  disabledHours={endHoursDisable}
                                  disabledMinutes={endMinutesDisable}
                                  showNow={false}
                                  inputReadOnly={true}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal limits */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    data-bs-toggle="collapse"
                    to="#"
                    className="collapsed"
                    role="button"
                    aria-expanded={
                      collapseClass.personalLimits == true ? 'true' : 'false'
                    }
                    aria-controls="locate"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        personalLimits: !collapseClass.personalLimits,
                      })
                    }
                  >
                    Personal limits (incl.book ahead)
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={`${
                        collapseClass.personalLimits == true
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }`}
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.personalLimits == true ? 'block' : 'none'
                    }`,
                  }}
                  id="locates"
                >
                  <div className="user-personal-inner">
                    <Row className="align-items-center">
                      <Col xl={8} lg={8} md={24} span={24}>
                        <div className="user-personal-label">
                          <label className="minimum-label" htmlFor="name">
                            {'Workspaces'}
                          </label>
                        </div>
                      </Col>
                      <Col xl={16} lg={16} md={24} span={24}>
                        <div className="user-personal-search">
                          <div className="in-office-min-icon">
                            <Popover
                              content={workspaceContent}
                              title={workspaceTitle}
                            >
                              <i className="feather-alert-circle"></i>
                            </Popover>
                            <input
                              value={workspaceDays}
                              type="text"
                              min="0"
                              max="5"
                              onInput={(e: any) =>
                                (e.target.value = e.target.value.slice(0, 2))
                              }
                              onChange={handleWorkspaceDaysChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="user-personal-inner">
                    <Row className="align-items-center">
                      <Col xl={8} lg={8} md={24} span={24}>
                        <div className="user-personal-label">
                          <label className="minimum-label" htmlFor="name">
                            {'Rooms'}
                          </label>
                        </div>
                      </Col>
                      <Col xl={16} lg={16} md={24} span={24}>
                        <div className="user-personal-search">
                          <div className="in-office-min-icon">
                            <Popover content={roomContent} title={roomTitle}>
                              <i className="feather-alert-circle"></i>
                            </Popover>
                            <input
                              value={roomDays}
                              type="text"
                              min="0"
                              max="5"
                              onInput={(e: any) =>
                                (e.target.value = e.target.value.slice(0, 2))
                              }
                              onChange={handleRoomDaysChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="user-personal-inner">
                    <Row className="align-items-center">
                      <Col xl={8} lg={8} md={24} span={24}>
                        <div className="user-personal-label">
                          <label className="minimum-label" htmlFor="name">
                            {'Parking'}
                          </label>
                        </div>
                      </Col>
                      <Col xl={16} lg={16} md={24} span={24}>
                        <div className="user-personal-search">
                          <div className="in-office-min-icon">
                            <Popover
                              content={parkingContent}
                              title={parkingTitle}
                            >
                              <i className="feather-alert-circle"></i>
                            </Popover>
                            <input
                              value={parkingDays}
                              type="text"
                              min="0"
                              max="5"
                              onInput={(e: any) =>
                                (e.target.value = e.target.value.slice(0, 2))
                              }
                              onChange={handleParkingDaysChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="user-personal-inner">
                    <Row className="align-items-center">
                      <Col xl={8} lg={8} md={24} span={24}>
                        <div className="user-personal-label">
                          <label className="minimum-label" htmlFor="name">
                            {'Minimum days in office'}
                          </label>
                        </div>
                      </Col>
                      <Col xl={16} lg={16} md={24} span={24}>
                        <div className="user-personal-search">
                          <div className="in-office-min-icon">
                            <Popover
                              content={minOfficeDaysContent}
                              title={minOfficeDaysTitle}
                            >
                              <i className="feather-alert-circle"></i>
                            </Popover>
                            <input
                              value={minDaysInOffice}
                              type="text"
                              min="0"
                              max="5"
                              onInput={(e: any) =>
                                (e.target.value = e.target.value.slice(0, 2))
                              }
                              onChange={handleMinDaysInOfficeChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>

              {/* Permission Groups */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    data-bs-toggle="collapse"
                    to="#locates"
                    className="collapsed"
                    role="button"
                    aria-expanded={
                      collapseClass.personalGroup == true ? 'true' : 'false'
                    }
                    aria-controls="locates"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        permissionGroup: !collapseClass.permissionGroup,
                      })
                    }
                  >
                    {findLabelText(
                      'Permission_groups',
                      'Permission groups',
                      'User_Management',
                    )}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={
                        collapseClass.permissionGroup
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.permissionGroup == true ? 'block' : 'none'
                    }`,
                  }}
                  id="locates"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info">
                      <ul>
                        {permission?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className={`${
                                item?.name == 'User' ||
                                item?.name == 'Team Manager' ||
                                item?.name == 'Location Manager' ||
                                disablefield()
                                  ? 'checkbox-disable'
                                  : null
                              }`}
                            >
                              <h4>{item?.name}</h4>
                              <div className="checkbox-set">
                                <label className="check">
                                  <input
                                    disabled={
                                      item?.name == 'User' ||
                                      item?.name == 'Team Manager' ||
                                      item?.name == 'Location Manager' ||
                                      disablefield()
                                        ? true
                                        : false
                                    }
                                    type="checkbox"
                                    checked={item.status == 1 ? true : false}
                                    onChange={() => {
                                      handleStatus(
                                        item,
                                        index,
                                        editTypesForUserSettings.permission_group,
                                      );
                                    }}
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hr Permission groups */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    data-bs-toggle="collapse"
                    to="#"
                    className="collapsed"
                    role="button"
                    aria-expanded={
                      collapseClass.personalGroup == true ? 'true' : 'false'
                    }
                    aria-controls="locate"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        hrPermissionGroup: !collapseClass.hrPermissionGroup,
                      })
                    }
                  >
                    HR Permission groups
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={`${
                        collapseClass.hrPermissionGroup == true
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }`}
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.hrPermissionGroup == true ? 'block' : 'none'
                    }`,
                  }}
                  id="locates"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info">
                      <ul>
                        {hrPermissionGroup?.map((item: any, index: number) => {
                          return (
                            <li
                              key={index}
                              className={`${
                                item.id == 1 && 'checkbox-disable'
                              }`}
                            >
                              <h4>{item?.group_name}</h4>
                              <div className="checkbox-set ">
                                <label className="check">
                                  <input
                                    type="checkbox"
                                    disabled={item.id == 1}
                                    checked={item?.status == 1 ? true : false}
                                    onChange={() =>
                                      handleStatus(
                                        item,
                                        index,
                                        editTypesForUserSettings.hr_permission_group,
                                      )
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health and Safety */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#teams"
                    role="button"
                    aria-controls="locate"
                    aria-expanded={collapseClass.HS == true ? 'true' : 'false'}
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        HS: !collapseClass.HS,
                      })
                    }
                  >
                    {findLabelText(
                      'Emergency responders',
                      'Emergency responders',
                      'User_Management',
                    )}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={
                        collapseClass.HS
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${collapseClass.HS == true ? 'block' : 'none'}`,
                  }}
                  id="teams"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info">
                      <ul>
                        {handslist?.map((item: any, index) => (
                          <li key={index}>
                            <h4>{item?.name}</h4>
                            <div className="checkbox-set">
                              <label className="check">
                                <input
                                  type="checkbox"
                                  checked={item?.status == 1 ? true : false}
                                  onChange={() =>
                                    handleStatus(
                                      item,
                                      index,
                                      editTypesForUserSettings.hands,
                                    )
                                  }
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="user-details-grid">
                <div className="user-collapse">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#teams"
                    role="button"
                    aria-controls="locate"
                    aria-expanded={
                      collapseClass?.notificationGroup == true
                        ? 'true'
                        : 'false'
                    }
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        notificationGroup: !collapseClass?.notificationGroup,
                      })
                    }
                  >
                    {findLabelText(
                      'Notification Preferences',
                      'Notification Preferences',
                      'User_Management',
                    )}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={
                        collapseClass.notificationGroup
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.notificationGroup == true ? 'block' : 'none'
                    }`,
                  }}
                  id="teams"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info">
                      <ul>
                        {notificationList?.map((item: any, index) => (
                          <li key={index}>
                            <h4>{item?.name}</h4>
                            <div className="checkbox-set">
                              <label className="check">
                                <input
                                  type="checkbox"
                                  checked={item?.status == 1 ? true : false}
                                  onChange={() =>
                                    handleStatus(
                                      item,
                                      index,
                                      editTypesForUserSettings.notification,
                                    )
                                  }
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-details-grid" id="create-btn-remove">
              <div className="remove-user">
                <p>{UserSettingsLabels.removeUser}</p>
                <Link
                  to="#"
                  onClick={() => {
                    setWarning('DELETE');
                    setWarningContent(
                      global.validationLabel.userManagement.deleteWarning,
                    );
                  }}
                  className={`btn btn-removlocation ${
                    isDisable ? 'disabled' : ''
                  }`}
                  data-bs-toggle="modal"
                  data-bs-target="#delete-modal"
                >
                  {/* {findLabelText(
                      "Remove_user",
                      "Remove user",
                      "User_Management"
                    )} */}
                  <i className="far fa-trash-can"></i>
                </Link>
              </div>
            </div>
            {/* Cancel and Save */}
            <div className="user-footer">
              <div className="user-footer-content">
                <p>
                  Bulk editing will replace the current settings with new shared
                  settings.
                </p>
              </div>
              <div className="user-footer-btn">
                <Link
                  to="#"
                  className="btn link-cancel"
                  onClick={() => {
                    handleClear();
                  }}
                >
                  {findLabelText('Cancel', 'Cancel', 'User_Management')}
                </Link>
                <Link
                  className={`btn btn-primary ${
                    disableSave === true ? 'disabledbutton' : ''
                  }`}
                  to="#"
                  onClick={onSubmit}
                >
                  {findLabelText('Save', 'Save', 'Settings')}
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {selectedTab == '2' ? (
          <div className="create-locationsets create-scroll create-locationsets-inner create-locationsets-inner-info">
            <div className="location-scroll location-scroll-inner-height">
              <div className="user-select-grid">
                <div className="user-select-heading">
                  <h4>
                    Selected <span>({finalbulkuserlist?.length})</span>{' '}
                  </h4>
                </div>
                <div className="user-select-info">
                  {finalbulkuserlist?.length > 0 &&
                    finalbulkuserlist?.map(user => {
                      return (
                        <div className="user-select-list" key={user?.id}>
                          <p>
                            {user?.display_name}{' '}
                            <span>{user?.primary_teams[0]?.name}</span>
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="user-management-team breadcrumbs">
                <p>{UserSettingsLabels.selectTeamDesc}</p>
              </div>
              <div className="locate-manage my-3">
                <div className="locate-managehead locate-managehead-inner">
                  <Link
                    data-bs-toggle="collapse"
                    className="collapsed"
                    to="#team"
                    role="button"
                    aria-expanded={
                      collapseClass.primaryTeam == true ? 'true' : 'false'
                    }
                    aria-controls="locate"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        primaryTeam: !collapseClass.primaryTeam,
                      })
                    }
                  >
                    {findLabelText(
                      'Primary_team',
                      'Primary team',
                      'User_Management',
                    )}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={`${
                        collapseClass.primaryTeam == true
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }`}
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.primaryTeam == true ? 'block' : 'none'
                    }`,
                  }}
                  id="team"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info location-setscheck-info">
                      <p className="user-management-primary-team">
                        {UserSettingsLabels.primaryTeamDesc}
                      </p>
                      <div className="locat-panel">
                        <div className="filter-search filter-input locate-serch-fill filter-search-location locat-search-bar">
                          <input
                            type="text"
                            placeholder={findLabelText(
                              'Find',
                              'Find',
                              'Locate',
                            )}
                            className={`input-filter bg-white`}
                            value={searchText?.value}
                            onChange={e => {
                              const val = e?.target?.value.toLowerCase();
                              onSearchChange(val);
                            }}
                            // disabled={teamLoaderFlag}
                          />
                          <div className="img-group location-img-group">
                            <span>
                              <img src={Search} alt="img" />
                            </span>
                          </div>
                        </div>
                      </div>
                      {teamLoaderFlag && <Loader height={'30'} width={'30'} />}
                      <ul
                        className={`team-dropdown ${
                          searchText?.value == '' &&
                          searchText?.PrimaryTeam?.length == 0
                            ? 'd-none'
                            : ''
                        }`}
                      >
                        {searchText?.PrimaryTeam?.map((item: any, index) => {
                          return (
                            <li key={index}>
                              <div className="user-management-search">
                                <img src={teamIcon} alt="" />
                                <h4>
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      handleStatus(
                                        item,
                                        index,
                                        editTypesForUserSettings.teams,
                                      )
                                    }
                                  >
                                    <Highlighter
                                      highlightClassName="YourHighlightClass"
                                      searchWords={[searchText?.value]}
                                      autoEscape={true}
                                      textToHighlight={item?.name}
                                    />
                                  </Link>
                                </h4>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      {!teamLoaderFlag &&
                        searchText?.value !== '' &&
                        searchText?.PrimaryTeam?.length == 0 && (
                          <p style={{ color: 'red' }}>
                            {UserSettingsLabels.noResultFound}
                          </p>
                        )}
                      <ul
                        className={`team-dropdown ${
                          searchText?.value !== '' ? 'd-none' : ''
                        }`}
                      >
                        {chooseTeam?.map((item, index) => {
                          return (
                            <li key={index}>
                              <div className="user-management-search">
                                <img src={teamIcon} alt="" />
                                <h4>
                                  <Link to="#">{item?.name}</Link>
                                </h4>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* {chooseTeam.length == 0 ? (
                <label
                  className="user-management-team-error-message"
                  style={{ color: 'red' }}
                >
                  {UserSettingsLabels.pleaseSelectTeam}
                </label>
              ) : (
                ''
              )} */}
              <div className="locate-manage my-3">
                <div className="locate-managehead locate-managehead-inner">
                  <Link
                    data-bs-toggle="collapse"
                    className="collapsed"
                    to="#secondaryteam"
                    role="button"
                    aria-expanded={
                      collapseClass.secondaryTeam == true ? 'true' : 'false'
                    }
                    aria-controls="locate"
                    onClick={() =>
                      setCollapseClass({
                        ...collapseClass,
                        secondaryTeam: !collapseClass.secondaryTeam,
                      })
                    }
                  >
                    {UserSettingsLabels.secondaryTeams}
                    <img
                      src={dropdown_angel}
                      alt="img"
                      className={`${
                        collapseClass.secondaryTeam == true
                          ? 'collapse-rotate'
                          : 'collapse-norotate'
                      }`}
                    />
                  </Link>
                </div>
                <div
                  style={{
                    display: `${
                      collapseClass.secondaryTeam == true ? 'block' : 'none'
                    }`,
                  }}
                  id="secondaryteam"
                >
                  <div className="locate-managename p-0">
                    <div className="locate-setscheck locate-setscheck-info location-setscheck-info">
                      <p className="user-management-primary-team">
                        {UserSettingsLabels.secondaryTeamDesc}
                      </p>
                      <div className="locat-panel">
                        <div className="filter-search filter-input locate-serch-fill filter-search-location locat-search-bar">
                          <input
                            type="text"
                            placeholder={findLabelText(
                              'Find',
                              'Find',
                              'Locate',
                            )}
                            className={`input-filter bg-white`}
                            value={searchSecTeam?.value}
                            onChange={e => {
                              const val = e?.target?.value.toLowerCase();
                              onSecondarySearch(val);
                            }}
                            // disabled={teamLoaderFlag}
                          />
                          <div className="img-group location-img-group">
                            <span>
                              <img src={Search} alt="img" />
                            </span>
                          </div>
                        </div>
                      </div>
                      {teamLoaderFlag && <Loader height={'30'} width={'30'} />}
                      <ul
                        className={`team-dropdown${
                          searchSecTeam?.value == '' &&
                          searchSecTeam?.SecondaryTeam?.length == 0
                            ? 'd-none'
                            : ''
                        }`}
                      >
                        {searchSecTeam?.SecondaryTeam?.map(
                          (item: any, index) => {
                            return (
                              <li key={index}>
                                <div className="user-management-search">
                                  <img src={teamIcon} alt="" />
                                  <h4>
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleStatus(
                                          item,
                                          index,
                                          editTypesForUserSettings.secondary,
                                        )
                                      }
                                    >
                                      <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={[searchSecTeam?.value]}
                                        autoEscape={true}
                                        textToHighlight={item?.name}
                                      />
                                    </Link>
                                  </h4>
                                </div>
                              </li>
                            );
                          },
                        )}
                      </ul>
                      {!teamLoaderFlag &&
                        searchSecTeam?.value !== '' &&
                        searchSecTeam?.SecondaryTeam?.length == 0 && (
                          <p style={{ color: 'red' }}>
                            {UserSettingsLabels.noResultFound}
                          </p>
                        )}
                      <ul
                        className={`team-dropdown ${
                          searchSecTeam?.value !== '' ? 'd-none' : ''
                        }`}
                      >
                        {secondaryTeam &&
                          secondaryTeam?.map((item, index) => {
                            return (
                              <li key={index}>
                                <div className="user-management-search">
                                  <div className="name-groups">
                                    <div className="work-name-img work-name-img-small">
                                      <Link to="#">
                                        <img
                                          src={teamIcon}
                                          className="border-radius-0 mx-0"
                                          alt="icon"
                                        />
                                      </Link>
                                    </div>
                                    <h4 className="ms-2">
                                      <Link style={{ color: '#0F62AB' }} to="#">
                                        {item?.name}
                                      </Link>
                                    </h4>
                                  </div>
                                  <div className="remove-links remove-list">
                                    <Link
                                      to="#"
                                      className="remove-link"
                                      onClick={() => {
                                        updateTeamUsers(item, index);
                                      }}
                                    >
                                      {findLabelText(
                                        'Remove',
                                        'Remove',
                                        'Location',
                                      )}
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancel and Save */}
              <div className="user-footer">
                <div className="user-footer-content">
                  <p>
                    Bulk editing will replace the current settings with new
                    shared settings.
                  </p>
                </div>
                <div className="user-footer-btn">
                  <Link
                    to="#"
                    className="btn link-cancel"
                    onClick={() => {
                      handleClear();
                    }}
                  >
                    {findLabelText('Cancel', 'Cancel', 'User_Management')}
                  </Link>
                  <Link
                    className={`btn btn-primary ${
                      disableSave === true ? 'disabledbutton' : ''
                    }`}
                    to="#"
                    onClick={onSubmit}
                  >
                    {findLabelText('Save', 'Save', 'Settings')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {selectedTab == '4' ? (
          <BulkEditConfirm
            finalbulkuserlist={finalbulkuserlist}
            handleClick={handleClear}
            bulkEditDetails={bulkEditDetails}
            setSelectedTab={setSelectedTab}
            locationOption={locationOption}
            permission={permission}
            teamlist={teamlist}
            handslist={handslist}
            hrPermissionGroup={hrPermissionGroup}
            secondaryTeam={secondaryTeam}
            workspaceSearchList={workspaceSearchList}
            roomSearchList={roomSearchList}
            parkingSearchList={parkingSearchList}
            newChanges={newChanges}
            setNewChanges={setNewChanges}
            setDisableSave={setDisableSave}
            removeTeamId={removeTeamId}
            removePrimaryId={removePrimaryId}
            teamstatus={teamstatus}
            successData={successData}
            SetFinalBulkUserList={SetFinalBulkUserList}
          />
        ) : null}
      </div>
    </Col>
  );
}

export default BulkEditUserList;
