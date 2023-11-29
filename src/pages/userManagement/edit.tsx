import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
} from '../../components/imagepath';
import { schema } from './schema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UserDefaultAssetList,
  addAndUpdateUserDetailsNew,
  editInfo,
  hrPermissionGroupList,
  locationListApi,
  userManagementDeleteDetails,
  userManagementHealthAndSafetyList,
  userManagementPermissionsList,
  userManagementTeamList,
  userManagementlocationList,
  // getHrPermissionGroup,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import Toaster from '../../components/toast';
import { useDispatch, useSelector } from 'react-redux';
import DropDownOptions from '../../components/dropDown/dropdownOptions';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import {
  editTypesForUserSettings,
  global,
  timeFormat_24,
} from '../../assets/constants/config';
import { DeleteConfirmationModal } from '../../components/deleteConfirmationModal/DeleteConfirmationModal';
import Loader from '../../components/loader';
import moment from 'moment';
import { Col, Popover, Row, TimePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  findLabelText,
  getPreferedTimeFormat,
  validateLoginUser,
} from '../../components/commonMethod';
import {
  ApiStatusCode,
  UserSettingsLabels,
} from '../../components/userManagement/constant';
import LocationSelectorComponent from '../../components/locationSelectorComponent';
import History from './history';

interface editUserFormProps {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
}

const Edit = ({
  editlocation,
  edithandleClick,
  rightSideBar,
  editusersdatas,
  setLoading,
  successData,
  removeSuccess,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    reset,
    trigger,
    formState: { errors },
  } = useForm<editUserFormProps>({
    resolver: yupResolver(schema),
  });
  const locationState = useLocation();
  const [assetDetails, setAssetDetails] = useState([]);
  const [editUserDetails, setEditUserDetails] = useState<any>({});
  const [personalDetails, setPersonalDetails] = useState<any>({});
  const [status, setStatus] = useState(false),
    [disableSave, setDisableSave] = useState(true),
    [permissionstatus, setPermissionStatus] = useState<any>([]),
    [teamstatus, setTeamStatus] = useState<any>([]),
    [permission, setPermission] = useState<any>([]),
    [handslist, setHandSList] = useState([]),
    [notificationList, setNotificationList] = useState<any>([
      {
        id: 1,
        type: 'checkin_push_alert',
        name: 'Check in alerts (Push)',
        status: 0,
      },
      {
        id: 2,
        type: 'checkin_email_alert',
        name: 'Check in alerts (Email)',
        status: 0,
      },
      {
        id: 3,
        type: 'booking_push_alert',
        name: 'Booking change alerts (Push)',
        status: 0,
      },
      {
        id: 4,
        type: 'booking_email_alert',
        name: 'Booking change alerts (Email)',
        status: 0,
      },
    ]),
    [notificationStatus, setNotificationStatus] = useState<any>([]),
    [defaultAssetDetails, setDefaultAssetDetails] = useState<any>([]),
    [loaderloading, setLoaderLoading] = useState(false),
    [noResultText, setNoResultText] = useState(''),
    [noWorkspaceResultText, setNoWorkspaceResultText] = useState(''),
    [noRoomResultText, setNoRoomResultText] = useState(''),
    [noParkingResultText, setNoParkingResultText] = useState(''),
    [showTenantErroMessage, setShowTenantErroMessage] = useState(true),
    [editteamstatus, setEditTeamStatus] = useState([]),
    [hansstatus, HandsStatus] = useState([]),
    [hrPermissionList, setHrPermissionGroup] = useState([]),
    [hrpermissionstatus, setHRPermissionStatus] = useState<any[]>([]),
    [userid, setUserid] = useState(''),
    [btndisable, setDisable] = useState(false),
    [resetuser, setResetUser] = useState({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
    }),
    [memberSearch, setMemberSearch] = useState(''),
    [memberSearchList, setMemberSearchList] = useState([]),
    [workspaceSearch, setWorkspaceSearch] = useState(''),
    [workspaceSearchList, setWorkspaceSearchList] = useState([]),
    [workspaceSearchListCopy, setworkspaceSearchListCopy] = useState([]),
    [roomSearch, setRoomSearch] = useState(''),
    [roomSearchList, setRoomSearchList] = useState([]),
    [roomSearchListCopy, setRoomSearchListCopy] = useState([]),
    [parkingSearch, setParkingSearch] = useState(''),
    [parkingSearchList, setParkingSearchList] = useState([]),
    [parkingSearchListCopy, setParkingSearchListCopy] = useState([]),
    [selectedmemberList, setSelectedMemberhList] = useState<any>([]),
    [selectedWorkspaceList, setSelectedWorkspaceList] = useState<any>([]),
    [selectedRoomList, setSelectedRoomList] = useState<any>([]),
    [locationDropdown, setLocationDropdown] = useState(false),
    [defaultBuliding, setDefaultBuliding] = useState<any | undefined>(''),
    [defaultFloor, setDefaultFloor] = useState<any | undefined>(''),
    [floorId, setFloorId] = useState<number | string | undefined>(''),
    [allLocation, setAllLocation] = useState<any>([]),
    [locationOption, setLocationOption] = useState<any>([]),
    [locationValue, setLocationValue] = useState<any>({}),
    [selectedParkingList, setSelectedParkingList] = useState<any>([]);
  const [collapseClass, setCollapseClass] = useState<any>({
    personalDetail: true,
    permissionGroup: false,
    hrPermissionGroup: false,
    notificationGroup: false,
    HS: false,
    primaryTeam: true,
    secondaryTeam: true,
    personalLimits: true,
    personalDefaults: true,
  });
  const [days, setDays] = useState(0);
  const [workspaceDays, setWorkspaceDays] = useState<number>(0);
  const [parkingDays, setParkingDays] = useState<number>(0);
  const [roomDays, setRoomDays] = useState<number>(0);
  const [minInOfficeDays, setminInOfficeDays] = useState<number>(0);
  const [shuffleDays, setShuffleDays] = useState(0);
  const [warningContent, setWarningContent] = useState('');
  const [warning, setWarning] = useState('');
  const [locationheight, setlocationHeight] = useState();
  const dispatch = useDispatch();
  const { languages } = useSelector((state: any) => state.language);
  const { userDetails } = useSelector((state: any) => state.app);
  const [isDisable, setIsDisable] = useState(false);
  const [selectedTab, setSelectedTab] = useState('1');
  const [removeTeamId, setRemoveTeamId] = useState<any>([]);
  const [removePrimary, setRemovePrimary] = useState<any>([]);
  const [changeTeam, setChangeTeam] = useState([]);
  const [secteamstatus, setSecTeamStatus] = useState<any>([]);
  const [updatedTeam, setUpdatedTeam] = useState();
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
    }),
    [searchText, setSearchText] = useState({
      value: '',
      PrimaryTeam: [],
    }),
    [searchSecTeam, setSearchSecTeam] = useState({
      value: '',
      SecondaryTeam: [],
    });
  const [teamLoaderFlag, setTeamLoaderFlag] = useState(false);
  const [teamlist, setTeamList] = useState([]);
  const [primaryTeamStatus, setPrimaryTeamStatus] = useState<any>([]);
  const [workspaceFocus, setWorkspaceFocus] = useState<boolean>(false);
  const [roomFocus, setRoomFocus] = useState<boolean>(false);
  const [parkingFocus, setParkingFocus] = useState<boolean>(false);
  const [overalllocationlist, setOveralllocationlist] = useState<any>([]);

  useEffect(() => {
    const userPermission = editusersdatas?.permission
      ?.filter(val => val?.status == 1)
      ?.map(val => val?.id);
    if (
      userDetails?.permission_group_id?.includes(2) ||
      userDetails?.permission_group_id?.includes(5)
    ) {
      setIsDisable(
        userPermission?.includes(2) || userPermission?.includes(5)
          ? true
          : false,
      );
    } else {
      setIsDisable(true);
    }
  }, [editusersdatas?.permission]);

  useEffect(() => {
    const textsplit = userDetails?.location?.[0]?.name?.toString()?.split(',');
    setFloorId(userDetails?.location_id);
    setLocationValue(
      locationOption?.find((i: any) => i?.value == userDetails?.location_id),
    );
    setDefaultBuliding(textsplit?.[0]);
    setDefaultFloor(textsplit?.[1]);
  }, [userDetails]);

  const dropdownRef = useRef<null | any>();

  const handleLocationChange = data => {
    setFloorId(data);
    setLocationValue(locationOption?.find((i: any) => i.value == data));
    if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  };

  useEffect(() => {
    if (
      editusersdatas?.location_id == 1 ||
      editusersdatas?.primary_teams.length == 0
    ) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
    dispatch(showLoader());
    postData(editInfo, { user_ids: editusersdatas?.id }, (successRes, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == '200') {
        const getUserDetails = successRes?.List[0];
        if (getUserDetails) {
          setEditUserDetails(getUserDetails);
          const locationDetails = locationOption?.find(
            loc => loc?.value === getUserDetails?.location_id,
          );
          const teams = getUserDetails?.teams;
          const primaryTeam = getUserDetails?.primary_teams;
          const permission = getUserDetails?.permission;
          setSelectedWorkspaceList([getUserDetails?.default_workspace]);
          setSelectedRoomList([getUserDetails?.default_room]);
          setSelectedParkingList([getUserDetails?.default_parking]);
          setWorkspaceDays(
            getUserDetails?.workspace_count
              ? getUserDetails?.workspace_count
              : 0,
          );
          setRoomDays(
            getUserDetails?.room_count ? getUserDetails?.room_count : 0,
          );
          setParkingDays(
            getUserDetails?.parking_count ? getUserDetails?.parking_count : 0,
          );
          setminInOfficeDays(
            getUserDetails?.min_office_days
              ? getUserDetails?.min_office_days
              : 0,
          );
          setTeamStatus(teams);
          setPermissionStatus(permission?.map(ele => ele?.id));
          const newNotificationList = notificationList?.map((item: any) => {
            item.status = getUserDetails[item?.type];
            return item;
          });
          setNotificationList(newNotificationList);
          const newNotificationStatus = newNotificationList?.filter(
            each => each.status == 1,
          );
          setNotificationStatus(newNotificationStatus?.map(ele => ele?.id));
        }
      }
    });
    postData(UserDefaultAssetList, '', (successRes, res) => {
      setDefaultAssetDetails(successRes?.workspaceDetails);
    });
    getLocationListApi();
  }, [editusersdatas]);
  useEffect(() => {
    getWorkspaceList();
    getRoomList();
    getParkingList();
  }, [defaultAssetDetails]);
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
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };

  const getLocationListApi = () => {
    let locSort = [];
    postData(locationListApi, '', (loclist, res) => {
      setOveralllocationlist(loclist);
      const Z = loclist?.List?.sort((a, b) => a.id - b.id);
      locSort = Z?.map(i => ({
        label: i?.name,
        value: i?.id,
        hierarchy: i?.fullname,
        timezone: i?.timezone,
      }));
      const locationDetails = locSort?.find(
        loc => loc?.value == editusersdatas?.location_id,
      );
      setFloorId(editusersdatas?.location_id)
      setLocationValue(locationDetails);
      setLocationOption(locSort);
    });
  };

  const getDifference = (o1, o2) => {
    const diff = {};
    let tmp = null;
    if (JSON.stringify(o1) === JSON.stringify(o2)) return;

    for (const k in o1) {
      if (Array.isArray(o1[k]) && Array.isArray(o2[k])) {
        tmp = o1[k].reduce(function (p, c, i) {
          const _t = getDifference(c, o2[k][i]);
          if (_t) p.push(_t);
          return p;
        }, []);
        if (Object.keys(tmp).length > 0) diff[k] = tmp;
      } else if (typeof o1[k] === 'object' && typeof o2[k] === 'object') {
        tmp = getDifference(o1[k], o2[k]);
        if (tmp && Object.keys(tmp)) diff[k] = tmp;
      } else if (o1[k] !== o2[k]) {
        diff[k] = o2[k];
      }
    }
    return diff;
  };

  const deepCompare = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!obj1[key] && !obj2[key]) {
        continue;
      }
      if (
        (obj1[key] && (obj2[key] == null || obj2[key] == undefined)) ||
        ((obj1[key] == null || obj1[key] === undefined) && obj2[key])
      ) {
        return false;
      }
      if (typeof obj1[key] == 'object' || typeof obj2[key] == 'object') {
        const recursiveResult = deepCompare(obj1[key], obj2[key]);
        if (!recursiveResult) {
          return false;
        }
      } else {
        if (obj1[key] != obj2[key]) {
          return false;
        }
      }
    }

    return true;
  };

  // On Submit
  const onSubmit = data => {
    const existingFields = {
      '0': {
        user_id: editUserDetails?.id,
        status: editUserDetails?.status,
        personal_details: {
          first_name: personalDetails?.firstName,
          last_name: personalDetails?.lastName,
          display_name: personalDetails?.displayName,
          email: personalDetails?.email,
        },
        personal_defaults: {
          location_id: editUserDetails?.location_id,
          default_workspace: editUserDetails?.default_workspace?.id,
          default_room: editUserDetails?.default_room?.id,
          default_parking: editUserDetails?.default_parking?.id,
          start_working_hour: editUserDetails?.start_working_hour,
          end_working_hour: editUserDetails?.end_working_hour,
        },
        personal_limits: {
          workspace_count: editUserDetails?.workspace_count
            ? editUserDetails?.workspace_count
            : 0,
          room_count: editUserDetails?.room_count
            ? editUserDetails?.room_count
            : 0,
          parking_count: editUserDetails?.parking_count
            ? editUserDetails?.parking_count
            : 0,
          min_office_days: editUserDetails?.min_office_days
            ? editUserDetails?.min_office_days
            : 0,
        },
        permission_groups: {
          permission_group_id: editUserDetails?.permission
            ?.map(e => e?.id)
            ?.toString(),
        },
        hr_permission_groups: {
          hr_permission_group_id: editUserDetails?.hr_roles
            ?.map(e => e?.group_id)
            ?.toString(),
        },
        emergency_responders: {
          health_safety_id: editUserDetails?.healy_safety
            ?.map(e => e?.id)
            ?.toString(),
        },
        notification_preferences: {
          checkin_push: editUserDetails?.checkin_push_alert,
          checkin_email: editUserDetails?.checkin_email_alert,
          bookingchange_push: editUserDetails?.booking_push_alert,
          bookingchange_email: editUserDetails?.booking_email_alert,
        },
        primary_team_id: editUserDetails?.primary_teams
          ?.map(e => e?.id)
          ?.toString(),
        team_id: editUserDetails?.teams?.map(e => e.id)?.toString(),
        profile_photo: '',
      },
    };
    const payload = {
      '0': {
        user_id: editUserDetails?.id,
        status: status == true ? 1 : 0,
        personal_details: {
          first_name: data?.firstName,
          last_name: data?.lastName,
          display_name: data?.displayName,
          email: data?.email,
        },
        personal_defaults: {
          location_id: locationValue?.value
            ? parseInt(locationValue?.value)
            : editUserDetails?.location_id,
          default_workspace: selectedWorkspaceList[0]?.workspace_id
            ? selectedWorkspaceList[0]?.workspace_id
            : editUserDetails?.default_workspace?.id,
          default_room: selectedRoomList[0]?.workspace_id
            ? selectedRoomList[0]?.workspace_id
            : editUserDetails?.default_room?.id,
          default_parking: selectedParkingList[0]?.workspace_id
            ? selectedParkingList[0]?.workspace_id
            : editUserDetails?.default_parking?.id,
          start_working_hour: startTime?.data
            ? startTime?.data
            : editUserDetails?.start_working_hour,
          end_working_hour: endTime?.data
            ? endTime?.data
            : editUserDetails?.end_working_hour,
        },
        personal_limits: {
          workspace_count: workspaceDays,
          room_count: roomDays,
          parking_count: parkingDays,
          min_office_days: minInOfficeDays ? minInOfficeDays : 0,
        },
        permission_groups: {
          permission_group_id: permissionstatus?.toString(),
        },
        hr_permission_groups: {
          hr_permission_group_id: hrpermissionstatus?.toString(),
        },
        emergency_responders: {
          health_safety_id: hansstatus?.toString(),
        },
        notification_preferences: {
          checkin_push: notificationStatus?.find(ele => ele === 1) ? 1 : 0,
          checkin_email: notificationStatus?.find(ele => ele === 2) ? 1 : 0,
          bookingchange_push: notificationStatus?.find(ele => ele === 3)
            ? 1
            : 0,
          bookingchange_email: notificationStatus?.find(ele => ele === 4)
            ? 1
            : 0,
        },
        primary_team_id: primaryTeamStatus?.map(e => e?.id)?.toString(),
        team_id: teamstatus?.map(e => e?.id)?.toString(),
        profile_photo: '',
      },
    };
    const isSame = deepCompare(existingFields, payload);
    const comparedObjectValue: any = getDifference(existingFields, payload);
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
      checkin_push: 'Check in alerts(Push)',
      checkin_email: 'Check in alerts(Email)',
      bookingchange_push: 'Booking change alerts(Push)',
      bookingchange_email: 'Booking change alerts(Push)',
      primary_team_id: 'Primary Team',
      team_id: 'Secondary Team',
    };

    const newDatas = {};
    const existingDatas = {};
    Object.keys(comparedObjectValue).forEach(key => {
      const value = comparedObjectValue[key];
      if (typeof value === 'object') {
        Object.keys(value).forEach(key1 => {
          const value1 = value[key1];
          if (typeof value1 === 'object') {
            Object.keys(value1).forEach(key2 => {
              const value2 = value1[key2];
              const newLabel = labelChanges[`${key2}`];
              const existingLocationName = [];
              const newLocationName = [];
              overalllocationlist?.List?.forEach(element => {
                if (element?.id == editUserDetails?.location_id) {
                  existingLocationName.push(element?.name);
                }
                if (locationValue?.value) {
                  if (element?.id == locationValue?.value) {
                    newLocationName.push(element?.name);
                  }
                }
              });
              if (newLabel) {
                if (
                  `${key2}` == 'first_name' ||
                  `${key2}` == 'last_name' ||
                  `${key2}` == 'display_name' ||
                  `${key2}` == 'email'
                ) {
                  newDatas[newLabel] = `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'first_name'
                      ? personalDetails?.firstName
                      : `${key2}` == 'last_name'
                      ? personalDetails?.lastName
                      : `${key2}` == 'display_name'
                      ? personalDetails?.displayName
                      : `${key2}` == 'email'
                      ? personalDetails?.email
                      : `${value2}`;
                }
                if (
                  `${key2}` == 'location_id' ||
                  `${key2}` == 'default_workspace' ||
                  `${key2}` == 'default_room' ||
                  `${key2}` == 'default_parking' ||
                  `${key2}` == 'start_working_hours' ||
                  `${key2}` == 'end_working_hours'
                ) {
                  newDatas[newLabel] =
                    `${key2}` == 'location_id'
                      ? newLocationName?.toString()
                      : `${key2}` == 'default_workspace'
                      ? selectedWorkspaceList[0]?.name
                      : `${key2}` == 'default_room'
                      ? selectedRoomList[0]?.name
                      : `${key2}` == 'default_parking'
                      ? selectedParkingList[0]?.name
                      : `${key2}` == 'start_working_hours'
                      ? startTime?.data
                      : `${key2}` == 'end_working_hours'
                      ? endTime?.data
                      : `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'location_id'
                      ? existingLocationName?.toString()
                      : `${key2}` == 'default_workspace'
                      ? editUserDetails?.default_workspace?.name
                      : `${key2}` == 'default_room'
                      ? editUserDetails?.default_room?.name
                      : `${key2}` == 'default_parking'
                      ? editUserDetails?.default_parking?.name
                      : `${key2}` == 'start_working_hours'
                      ? editUserDetails?.start_working_hour
                      : `${key2}` == 'end_working_hours'
                      ? editUserDetails?.end_working_hour
                      : `${value2}`;
                }
                if (
                  `${key2}` == 'workspace_count' ||
                  `${key2}` == 'room_count' ||
                  `${key2}` == 'parking_count' ||
                  `${key2}` == 'min_office_days'
                ) {
                  newDatas[newLabel] =
                    `${key2}` == 'workspace_count'
                      ? workspaceDays
                      : `${key2}` == 'room_count'
                      ? roomDays
                      : `${key2}` == 'parking_count'
                      ? parkingDays
                      : `${key2}` == 'min_office_days'
                      ? minInOfficeDays
                      : `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'workspace_count'
                      ? editUserDetails?.workspace_count
                      : `${key2}` == 'room_count'
                      ? editUserDetails?.room_count
                      : `${key2}` == 'parking_count'
                      ? editUserDetails?.parking_count
                      : `${key2}` == 'min_office_days'
                      ? editUserDetails?.min_office_days
                      : 0;
                }
                if (`${key2}` == 'permission_group_id') {
                  const newpermisionValue = [];
                  permission?.forEach(element1 => {
                    permissionstatus?.forEach(element2 => {
                      if (element1?.id == element2) {
                        newpermisionValue.push(element1?.name);
                      }
                    });
                  });
                  newDatas[newLabel] =
                    `${key2}` == 'permission_group_id'
                      ? newpermisionValue?.toString()
                      : `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'permission_group_id'
                      ? editUserDetails?.permission
                          ?.map(e => e?.name)
                          ?.toString()
                      : `${value2}`;
                }
                if (`${key2}` == 'hr_permission_group_id') {
                  const newhrValue = [];
                  const oldhrValue = [];
                  const oldValue = editUserDetails?.hr_roles?.map(
                    e => e?.group_id,
                  );
                  hrPermissionList?.forEach(element1 => {
                    hrpermissionstatus?.forEach(element2 => {
                      if (element1?.id == element2) {
                        newhrValue.push(element1?.group_name);
                      }
                    });
                    oldValue?.forEach(element3 => {
                      if (element1?.id == element3) {
                        oldhrValue.push(element1?.group_name);
                      }
                    });
                  });
                  newDatas[newLabel] =
                    `${key2}` == 'hr_permission_group_id'
                      ? newhrValue?.toString()
                      : `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'hr_permission_group_id'
                      ? oldhrValue?.toString()
                      : `${value2}`;
                }
                if (`${key2}` == 'health_safety_id') {
                  const newhandlistValue = [];
                  const oldhandlistValue = [];
                  const oldValue = editUserDetails?.healy_safety?.map(
                    e => e?.id,
                  );
                  handslist?.forEach(element1 => {
                    hansstatus?.forEach(element2 => {
                      if (element1?.id == element2) {
                        newhandlistValue.push(element1?.name);
                      }
                    });
                    oldValue?.forEach(element3 => {
                      if (element1?.id == element3) {
                        oldhandlistValue.push(element1?.name);
                      }
                    });
                  });
                  newDatas[newLabel] =
                    `${key2}` == 'health_safety_id'
                      ? newhandlistValue?.toString()
                      : `${value2}`;
                  existingDatas[newLabel] =
                    `${key2}` == 'health_safety_id'
                      ? oldhandlistValue?.toString()
                      : `${value2}`;
                }
                if (
                  `${key2}` == 'checkin_push' ||
                  `${key2}` == 'checkin_email' ||
                  `${key2}` == 'bookingchange_push' ||
                  `${key2}` == 'bookingchange_email'
                ) {
                  newDatas[newLabel] =
                    `${key2}` == 'checkin_push'
                      ? notificationStatus?.find(ele => ele === 1)
                        ? 1
                        : 0
                      : `${key2}` == 'checkin_email'
                      ? notificationStatus?.find(ele => ele === 2)
                        ? 1
                        : 0
                      : `${key2}` == 'bookingchange_push'
                      ? notificationStatus?.find(ele => ele === 3)
                        ? 1
                        : 0
                      : `${key2}` == 'bookingchange_email'
                      ? notificationStatus?.find(ele => ele === 4)
                        ? 1
                        : 0
                      : 0;
                  existingDatas[newLabel] =
                    `${key2}` == 'checkin_push'
                      ? editUserDetails?.checkin_push_alert
                      : `${key2}` == 'checkin_email'
                      ? editUserDetails?.checkin_email_alert
                      : `${key2}` == 'bookingchange_push'
                      ? editUserDetails?.booking_push_alert
                      : `${key2}` == 'bookingchange_email'
                      ? editUserDetails?.booking_email_alert
                      : 0;
                }
              }
            });
          } else {
            const newLabel = labelChanges[`${key1}`];
            if (`${key1}` == 'primary_team_id') {
              newDatas[newLabel] =
                `${key1}` == 'primary_team_id'
                  ? primaryTeamStatus?.map(e => e?.name)?.toString()
                  : `${value}`;
              existingDatas[newLabel] =
                `${key1}` == 'primary_team_id'
                  ? editUserDetails?.primary_teams
                      ?.map(e => e?.name)
                      ?.toString()
                  : `${value}`;
            }
            if (`${key1}` == 'team_id') {
              newDatas[newLabel] =
                `${key1}` == 'team_id'
                  ? teamstatus?.map(e => e?.name)?.toString()
                  : `${value}`;
              existingDatas[newLabel] =
                `${key1}` == 'team_id'
                  ? editUserDetails?.teams?.map(e => e.name)?.toString()
                  : `${value}`;
            }
          }
        });
      }
    });
    const payloadCopy: any = JSON.parse(JSON.stringify(payload));
    const existingFieldsCopy: any = JSON.parse(JSON.stringify(existingFields));
    delete existingFieldsCopy['0'].user_id;
    existingFieldsCopy['0'].is_changed_value = isSame ? 0 : 1;
    payloadCopy['0'].existing_fields = existingDatas;
    payloadCopy['0'].new_datas = newDatas;
    payloadCopy['0'].existing_fields.is_changed_value = isSame ? 0 : 1;
    payloadCopy['0'].isBulkEdit = 0;
    let removeFilter;
    if (editUserDetails?.teams?.length > 0) {
      removeFilter = editUserDetails?.teams?.filter(team => {
        return removeTeamId?.includes(team?.id);
      });
      if (removeFilter) {
        removeFilter = removeFilter?.map(each => each.id)?.toString();
      }
    }
    payloadCopy['0'].team_remove_id = removeFilter ? removeFilter : '';
    payloadCopy['0'].primary_team_remove_id = changeTeam?.toString();
    if (primaryTeamStatus?.length == 1 && locationValue?.value) {
      setLoading(true);
      setDisableSave(true);
      dispatch(showLoader());
      postData(addAndUpdateUserDetailsNew, payloadCopy, (datas, res) => {
        setDisable(true);
        setLoading(false);
        Toaster(res?.data?.code, res?.data?.message);
        dispatch(hideLoader());
        const userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
        if (userDetailsCopy?.id == datas?.id) {
          userDetailsCopy.permission_group_id = datas?.permission_group_id;
        }
        dispatch(setUserDetails(userDetailsCopy));

        const checkData = (previousData, checkValue) => {
          const op = previousData?.map((e, i) => {
            const temp = checkValue.find(element => element === e.id);
            if (temp) {
              e.status = 1;
            }
            return e;
          });
          return op;
        };
        if (res?.data?.code == ApiStatusCode.SUCCESS) {
          reset(resetuser);
          setPermissionStatus([]);
          setNotificationStatus([]);
          setTeamStatus([]);
          HandsStatus([]);
          setHRPermissionStatus([]);
          setSelectedMemberhList([]);
          setSelectedWorkspaceList([]);
          setSelectedRoomList([]);
          setSelectedParkingList([]);
          edithandleClick();
          setDisable(false);
          const data = {
            base_url: editusersdatas.base_url,
            id: datas['0']?.user_id,
            first_name: datas['0']?.personal_details?.first_name,
            last_name: datas['0']?.personal_details?.last_name,
            display_name: datas['0']?.personal_details?.display_name,
            full_name:
              datas['0']?.personal_details?.first_name +
              ' ' +
              datas['0']?.personal_details?.last_name,
            profile_photo: datas['0']?.profile_photo
              ? datas['0']?.profile_photo
              : '',
            status: datas['0']?.status,
            email: datas['0']?.personal_details?.email,
            location_id: datas['0']?.personal_defaults?.location_id,
            default_workspace: datas['0']?.personal_defaults?.default_workspace,
            default_room: datas['0']?.personal_defaults?.default_room,
            default_parking: datas['0']?.personal_defaults?.default_parking,
            workspace_count: datas['0']?.personal_limits?.workspace_count,
            room_count: datas['0']?.personal_limits?.room_count,
            parking_count: datas['0']?.personal_limits?.parking_count,
            start_working_hour:
              datas['0']?.personal_defaults?.start_working_hour,
            end_working_hour: datas['0']?.personal_defaults?.end_working_hour,
            primary_teams: primaryTeamStatus,
            teams: teamstatus,
            last_active_login: datas['0']?.last_active_login
              ? datas['0']?.last_active_login
              : null,
            teams_count: datas[0]?.primary_team_id?.length,
            permission_count:
              datas[0]?.permission_groups?.permission_group_id?.split('')
                ?.length,
            min_office_days: datas[0]?.personal_limits?.min_office_days
              ? datas[0]?.personal_limits?.min_office_days
              : '',
            permission: checkData(permission, permissionstatus)?.filter(
              obj => obj.status == 1,
            ),
            healy_safety: checkData(handslist, hansstatus)?.filter(
              obj => obj.status == 1,
            ),
            hr_roles: checkData(hrPermissionList, hrpermissionstatus)
              ?.filter(obj => obj.status == 1)
              ?.map(item => {
                return {
                  ...item,
                  group_id: item.id,
                };
              }),
            team: primaryTeamStatus?.[0]?.name,
          };
          successData(data, 'edit');
          reset(resetuser);
        } else {
          Toaster(res?.code, res?.message);
        }
      });
    }
  };
  useEffect(() => {
    if (teamstatus?.length > 0) {
      setShowTenantErroMessage(false);
    } else {
      setShowTenantErroMessage(true);
    }
    const teamID = teamstatus?.map((i: any) => {
      return i.id;
    });
    setSecTeamStatus(teamID);
  }, [teamstatus]);
  useEffect(() => {
    validateLoginUser()?.slug != 'administrator' &&
      setValue(
        'displayName',
        (getValues('firstName') ? getValues('firstName')?.trim() : '') +
          ' ' +
          (getValues('lastName') ? getValues('lastName') : ''),
      );
  });
  useEffect(() => {
    const clientHeight: any =
      document.getElementById('location-set')?.clientHeight;
    const createbtn: any =
      document.getElementById('create-btn-remove')?.clientHeight;
    const locatescroll: any =
      document.getElementById('location-scroll')?.clientHeight;
    const locationHeight: any = locatescroll - clientHeight - createbtn;
    setlocationHeight(locationHeight);
    setStatus(true);
    if (editusersdatas) {
      const personDetails = {
        firstName: editusersdatas.first_name,
        lastName: editusersdatas.last_name,
        displayName: editusersdatas.display_name,
        email: editusersdatas.email,
      };
      setPersonalDetails(personDetails);
      clearErrors();
      setValue('firstName', editusersdatas.first_name);
      setValue('lastName', editusersdatas.last_name);
      setValue('displayName', editusersdatas.display_name);
      setValue('email', editusersdatas.email);
      setNoResultText('');
      setNoWorkspaceResultText('');
      setNoRoomResultText('');
      setNoParkingResultText('');
      setMemberSearch('');
      const permission = editusersdatas?.permission;
      const teams = editusersdatas?.teams;
      const primaryTeam = editusersdatas?.primary_teams;
      const healy_safety = editusersdatas?.healy_safety;
      const hr_roles = editusersdatas?.hr_roles;
      HandsStatus(healy_safety?.map(ele => ele?.id));
      setPrimaryTeamStatus(primaryTeam);
      setUserid(editusersdatas.id);
      setSelectedMemberhList(editusersdatas?.location_id);
      setStatus(editusersdatas?.status === 0 ? false : true);
      editusersdatas?.start_working_hour &&
        setStartTime({
          ...startTime,
          data: editusersdatas?.start_working_hour,
          count: 0,
        });
      setDays(
        editusersdatas?.min_office_days
          ? parseInt(editusersdatas?.min_office_days)
          : 0,
      );
      editusersdatas?.end_working_hour &&
        setEndTime({
          ...endTime,
          data: editusersdatas?.end_working_hour,
          count: 0,
        });
    }
  }, [editusersdatas]);

  const handleStatus = (item, index, type) => {
    if (type == editTypesForUserSettings.permission_group) {
      const val: any = [];
      const Data: any = [...permission];
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
        }
      }
      setPermissionStatus([...val]);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
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
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
    if (type == editTypesForUserSettings.teams) {
      try {
        setUpdatedTeam(item);
        setWarning('CHANGE_TEAM');
        if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
          setDisableSave(true);
        } else {
          setDisableSave(false);
        }
        const primaryTeam = editusersdatas?.primary_teams;
        if (primaryTeam?.length == 0) {
          const val: any = [];
          val.push(item);
          setPrimaryTeamStatus(val);
          setSearchText({
            value: '',
            PrimaryTeam: [],
          });
        }
        setWarningContent(
          global?.validationLabel?.userManagement?.changeTeamWarning,
        );
        if (item?.id == editusersdatas?.primary_teams?.[0]?.id) {
          setChangeTeam([]);
        } else if (editusersdatas?.primary_teams?.[0]?.id) {
          setChangeTeam(editusersdatas?.primary_teams?.[0]?.id);
        } else {
          setChangeTeam([]);
        }
      } catch (e) {}
    }
    if (type == editTypesForUserSettings.secondary) {
      setSearchSecTeam({
        value: '',
        SecondaryTeam: [],
      });
      const List = teamstatus?.filter((ele: any) => {
        return ele.id == item.id;
      });
      if (List.length > 0) {
      } else {
        setTeamStatus([...teamstatus, item]);
        setSecTeamStatus([...secteamstatus, item.id]);
        if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
          setDisableSave(true);
        } else {
          setDisableSave(false);
        }
      }
    }
    if (type == editTypesForUserSettings.hands) {
      const val: any = [];
      const Data: any = [...handslist];
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
        }
      }
      HandsStatus([...val]);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
    if (type == editTypesForUserSettings.hr_permission_group) {
      const val: any = [];
      const Data: any = [...hrPermissionList];
      Data[index].status = item.status == 0 ? 1 : 0;
      for (const i of Data) {
        if (i.status == 1) {
          val.push(i.id);
        }
      }
      setHRPermissionStatus([...val]);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
  };

  useEffect(() => {
    setDisableSave(true);
  }, [editusersdatas]);
  const handleRemoveUserDetail = () => {
    setLoading(true);
    dispatch(showLoader());
    const getResponce = (data, res) => {
      setLoading(false);
      dispatch(hideLoader());
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        removeSuccess(userid);
        reset(resetuser);
        setPermissionStatus([]);
        setNotificationStatus([]);
        setTeamStatus([]);
        HandsStatus([]);
        setHRPermissionStatus([]);
        edithandleClick();
        setDisable(false);
        setStatus(false);
      }
    };
    const val = {
      user_id: userid,
    };
    postData(userManagementDeleteDetails, val, getResponce);
    setDisable(true);
  };

  const getManagementList = () => {
    setLoaderLoading(true);
    setNoResultText('');
    postData(userManagementlocationList, { name: memberSearch }, successRes => {
      setLoaderLoading(false);
      if (successRes?.List?.length > 0) {
        setMemberSearchList(successRes.List);
      } else {
        setNoResultText(UserSettingsLabels.noResultFound);
        setMemberSearchList([]);
      }
    });
  };
  const getWorkspaceList = () => {
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
      // setNoWorkspaceResultText(UserSettingsLabels.noResultFound)
      setNoWorkspaceResultText('');
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
  const getRoomList = () => {
    setLoaderLoading(true);
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
  const getParkingList = () => {
    setLoaderLoading(true);
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
      // setNoParkingResultText(UserSettingsLabels.noResultFound)
      setNoParkingResultText('');
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
    if (event.target.value.trim() == '') {
      setNoRoomResultText('');
      getRoomList();
    }
    setRoomSearch(event.target.value);
  };

  const changeParkingSearchText = event => {
    if (event.target.value.trim() == '') {
      setNoParkingResultText('');
      getParkingList();
    }
    setParkingSearch(event.target.value);
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

  const disablefield = () => {
    const data = userDetails?.roles?.filter(res => {
      if (res?.slug == 'administrator') {
        return res;
      }
    });
    return data?.length > 0 ? '' : true;
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
        (o1: any) => !teamstatus?.some(o2 => o1.id === o2.id),
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
        o1 => !primaryTeamStatus?.some(o2 => o1.id === o2.id),
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
  const getTeamList = data => {
    setTeamLoaderFlag(false);
    setTeamList(data?.List);
  };
  const getPermissionList = data => {
    if (editUserDetails?.permission?.length > 0) {
      const op = data?.List?.map((e, i) => {
        const temp = editUserDetails?.permission?.find(
          element => element.id === e.id,
        );
        if (temp && temp != undefined) {
          e['status'] = 1;
        } else {
          e['status'] = 0;
        }
        return e;
      });
      setPermission(op
        ?.filter((permission: any) => permission.id != 1))
       //setPermission([...op]);
    } else {
      setPermissionStatus(
        data?.List?.filter((permission: any) => permission.status == 1)?.map(
          (status: any) => status.id,
        ),
      );
       //setPermission([...data?.List]);
      setPermission([...data?.List]
        ?.filter((permission: any) => permission.id != 1))
    }
  };
  const getHandSList = data => {
    if (editUserDetails?.healy_safety?.length > 0) {
      const op = data?.List?.map((e, i) => {
        const temp = editUserDetails?.healy_safety?.find(
          element => element.id === e.id,
        );
        if (temp) {
          e['status'] = 1;
        } else {
          e['status'] = 0;
        }
        return e;
      });

      HandsStatus(
        op
          ?.filter((permission: any) => permission.status == 1)
          ?.map((status: any) => status.id),
      );
      setHandSList(op);
    } else {
      HandsStatus(
        data?.List?.filter((permission: any) => permission.status == 1)?.map(
          (status: any) => status.id,
        ),
      );
      setHandSList(data?.List);
    }
  };
  const getHrPermission = data => {
    if (editUserDetails?.hr_roles?.length > 0) {
      const op = data?.map((e, i) => {
        const temp = editUserDetails?.hr_roles?.find(
          element => element?.group_id == e.id,
        );
        if (temp) {
          e['status'] = 1;
        }
        return e;
      });
      setHRPermissionStatus(
        op
          ?.filter((permission: any) => permission.status == 1)
          ?.map((status: any) => status.id),
      );
      setHrPermissionGroup(op);
    } else {
      setHRPermissionStatus(
        data
          ?.filter((permission: any) => permission.status == 1)
          ?.map((status: any) => status.id),
      );
      setHrPermissionGroup(data);
    }
  };
  const getNotification = data => {};

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

  const shuffleContent = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const ShuffleTitle = '';

  const minOfficeDaysContent = (
    <div className="user-popover">
      <h4>Minimum in office days</h4>
      <p>The minimum number of days in a month the user should be in office.</p>
      <p>0 = unlimited</p>
    </div>
  );
  const minOfficeDaysTitle = '';

  useEffect(() => {
    postData(userManagementTeamList, '', getTeamList);
    // postData(getHrPermissionGroup, "", getHrPermission);
    setTeamLoaderFlag(true);
  }, []);
  useEffect(() => {
    if (editUserDetails?.id) {
      postData(userManagementHealthAndSafetyList, '', getHandSList);
      postData(userManagementPermissionsList, '', getPermissionList);
      postData(hrPermissionGroupList, '', getHrPermission);
    }
  }, [editUserDetails?.id]);
  const updateTeamUsers = (item, index) => {
    const List = teamstatus;
    const Data = List?.filter(ele => {
      return ele.id != item.id;
    });

    setRemoveTeamId([...removeTeamId, item.id]);
    setTeamStatus(Data);
  };
  const handleDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setDays(day);
    }
  };

  const handleWorkspaceDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setWorkspaceDays(day);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
  };

  const handleRoomDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setRoomDays(day);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
  };

  const handleParkingDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 30) || day == '') {
      setParkingDays(day);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
  };

  const handleminInOfficeDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setminInOfficeDays(day);
      if (primaryTeamStatus?.length == 0 || !locationValue?.value) {
        setDisableSave(true);
      } else {
        setDisableSave(false);
      }
    }
  };

  const handleShuffleDaysChange = (e, type = '') => {
    const day = e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setShuffleDays(day);
    }
  };
  return (
    <>
      <Col
        span={6}
        className={`  left-right-space main-space-remove-left d-flex `}
      >
        <div className="card w-100 p-0 locate-inner-card">
          <div className="book-tabs p-0 m-0 user-management-tabs user-settings-tabs">
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
              <li>
                <Link
                  to="#"
                  className={selectedTab == '3' ? 'active' : ''}
                  role="tab"
                  aria-controls="nav-history"
                  onClick={() => setSelectedTab('3')}
                >
                  <img src={history_icon} alt="" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="location-set pb-0" id="location-set">
            <div className="location-back-head">
              <div className="user-new-heading">
                <div className="user-back-arrow">
                  <Link
                    to="#"
                    className="link-cancel"
                    onClick={edithandleClick}
                  >
                    <img src={LeftAngle} alt="img" />
                  </Link>
                </div>
                <div className="user-heading-content">
                  <h2>{editusersdatas.full_name}</h2>
                  <p>
                    {selectedTab == '1'
                      ? findLabelText('Settings', 'Settings', 'Dashboard')
                      : ''}
                    {selectedTab == '2'
                      ? findLabelText('Teams', 'Teams', 'Dashboard')
                      : ''}
                    {selectedTab == '3'
                      ? findLabelText('History', 'History', 'Dashboard')
                      : ''}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="location-back-heads"></div> */}
            <div>
              {(primaryTeamStatus?.length == 0 || !locationValue?.value) && (
                <label
                  className="user-management-team-error-message"
                  style={{ color: 'red' }}
                >
                  {UserSettingsLabels.continueAddUser}
                </label>
              )}
            </div>
          </div>

          {selectedTab == '1' ? (
            <div className="create-locationsets create-location-sets user-location-inner">
              <div className="location-scroll location-scroll-inner-height">
                {/* Active checkbox  */}
                <div className="table-headercheck table-header-check-info">
                  <div className="checkbox-set">
                    <label className="check">
                      {findLabelText('Active', 'Active', 'User_Management')}
                      <input
                        type="checkbox"
                        data-bs-toggle={status ? 'modal' : ''}
                        data-bs-target={status ? '#delete-modal' : ''}
                        checked={status}
                        onChange={() => {
                          if (status == false) {
                            setStatus(!status);
                            setWarning('');
                            setWarningContent('');
                          } else {
                            checkUserRoles();
                          }
                        }}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                {/* Personal Details  */}
                <div className="user-details-grid">
                  <div className="user-collapse">
                    <Link
                      data-bs-toggle="collapse"
                      className="collapsed"
                      to="#locate"
                      role="button"
                      aria-expanded={
                        collapseClass?.personalDetail == true ? 'true' : 'false'
                      }
                      aria-controls="locate"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          personalDetail: !collapseClass?.personalDetail,
                        })
                      }
                    >
                      {findLabelText(
                        'Personal_details',
                        'Personal details',
                        'User_Management',
                      )}
                      <img
                        src={dropdown_angel}
                        alt="img"
                        className={
                          collapseClass.personalDetail
                            ? 'collapse-rotate'
                            : 'collapse-norotate'
                        }
                      />
                    </Link>
                  </div>
                  <div
                    style={{
                      display: `${
                        collapseClass.personalDetail == true ? 'block' : 'none'
                      }`,
                    }}
                    id="locate"
                  >
                    <div className="user-personal-details">
                      <div className="user-personal-inner">
                        <Row className="align-items-center">
                          <Col xl={8} lg={8} md={24} span={24}>
                            <div className="user-personal-label">
                              <label htmlFor="name">
                                {findLabelText(
                                  'First_name',
                                  'First name',
                                  'User_Management',
                                )}
                              </label>
                            </div>
                          </Col>
                          <Col xl={16} lg={16} md={24} span={24}>
                            <div className="user-personal-search">
                              <Controller
                                name="firstName"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <input
                                      value={value ? value : ''}
                                      type="text"
                                      placeholder={findLabelText(
                                        'First_name',
                                        'First name',
                                        'User_Management',
                                      )}
                                      className="bg-white"
                                      onChange={val => {
                                        onChange(val);
                                        trigger('firstName');
                                        {
                                          primaryTeamStatus?.length == 0 ||
                                          !locationValue?.value
                                            ? setDisableSave(true)
                                            : setDisableSave(false);
                                        }
                                      }}
                                    />
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                        {errors.firstName?.message ? (
                          <label style={{ color: 'red' }}>
                            {errors.firstName?.message}
                          </label>
                        ) : null}
                      </div>

                      <div className="user-personal-inner">
                        <Row className="align-items-center">
                          <Col xl={8} lg={8} md={24} span={24}>
                            <div className="user-personal-label">
                              <label htmlFor="name">
                                {findLabelText(
                                  'Last_name',
                                  'Last name',
                                  'User_Management',
                                )}
                              </label>
                            </div>
                          </Col>
                          <Col xl={16} lg={16} md={24} span={24}>
                            <div className="user-personal-search">
                              <Controller
                                name="lastName"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <input
                                      value={value ? value : ''}
                                      type="text"
                                      placeholder={findLabelText(
                                        'Last_name',
                                        'Last name',
                                        'User_Management',
                                      )}
                                      className="bg-white"
                                      onChange={val => {
                                        onChange(val);
                                        trigger('lastName');
                                        {
                                          primaryTeamStatus?.length == 0 ||
                                          !locationValue?.value
                                            ? setDisableSave(true)
                                            : setDisableSave(false);
                                        }
                                      }}
                                    />
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                        {errors.lastName?.message ? (
                          <label style={{ color: 'red' }}>
                            {errors.lastName?.message}
                          </label>
                        ) : null}
                      </div>

                      <div className="user-personal-inner">
                        <Row className="align-items-center">
                          <Col xl={8} lg={8} md={24} span={24}>
                            <div className="user-personal-label">
                              <label htmlFor="name">
                                {findLabelText(
                                  'Display_name',
                                  'Display name',
                                  'User_Management',
                                )}
                              </label>
                            </div>
                          </Col>
                          <Col xl={16} lg={16} md={24} span={24}>
                            <div className="user-personal-search">
                              <Controller
                                name="displayName"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <input
                                      value={value ? value : ''}
                                      type="text"
                                      readOnly={
                                        validateLoginUser()?.slug ==
                                        'administrator'
                                          ? false
                                          : true
                                      }
                                      placeholder={findLabelText(
                                        'Display_name',
                                        'Display name',
                                        'User_Management',
                                      )}
                                      className="bg-white"
                                      onChange={val => {
                                        onChange(val);
                                        trigger('displayName');
                                        {
                                          primaryTeamStatus?.length == 0 ||
                                          !locationValue?.value
                                            ? setDisableSave(true)
                                            : setDisableSave(false);
                                        }
                                      }}
                                    />
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                        {errors.displayName?.message ? (
                          <label style={{ color: 'red' }}>
                            {errors.displayName?.message}
                          </label>
                        ) : null}
                      </div>

                      <div className="user-personal-inner">
                        <Row className="align-items-center">
                          <Col xl={8} lg={8} md={24} span={24}>
                            <div className="user-personal-label">
                              <label htmlFor="name">
                                {findLabelText(
                                  'Email',
                                  'Email',
                                  'User_Management',
                                )}
                              </label>
                            </div>
                          </Col>
                          <Col xl={16} lg={16} md={24} span={24}>
                            <div className="user-personal-search">
                              <Controller
                                name="email"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <input
                                      value={value ? value : ''}
                                      type="text"
                                      placeholder={findLabelText(
                                        'Email',
                                        'Email',
                                        'User_Management',
                                      )}
                                      className="input-filter bg-white user-input-filters"
                                      onChange={val => {
                                        onChange(val);
                                        trigger('email');
                                        {
                                          primaryTeamStatus?.length == 0 ||
                                          !locationValue?.value
                                            ? setDisableSave(true)
                                            : setDisableSave(false);
                                        }
                                      }}
                                    />
                                  </>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                        {errors.email?.message ? (
                          <label style={{ color: 'red' }}>
                            {errors.email?.message}
                          </label>
                        ) : null}
                      </div>
                    </div>
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
                        collapseClass?.personalDefaults == true
                          ? 'true'
                          : 'false'
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
                        collapseClass.personalDefaults == true
                          ? 'block'
                          : 'none'
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
                                  'Location',
                                  'Location',
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
                                // onMouseDown={()=> setLocationDropdown(false)}
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

                          // onBlur={()=>{
                          //   setLocationDropdown(false)
                          // }}
                        >
                          <LocationSelectorComponent
                            locationId={locationValue?.value}
                            locationNames={locationValue?.label}
                            setDefaultFloor={setDefaultFloor}
                            setDefaultBuliding={setDefaultBuliding}
                            handleLocationChange={handleLocationChange}
                            floorId={floorId}
                            setLocationDropdown={setLocationDropdown}
                            setTimeZone={() => {}}
                            setAllLocation={setAllLocation}
                          />
                        </div>
                        {!locationValue?.value ? (
                          <label
                            className="user-management-team-error-message"
                            style={{ color: 'red' }}
                          >
                            {UserSettingsLabels.pleaseSelectLocation}
                          </label>
                        ) : (
                          ''
                        )}
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
                                      ? selectedWorkspaceList[0]?.name
                                      : ''
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
                                  onChange={changeWorkspaceSearchText}
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
                                if (
                                  primaryTeamStatus?.length == 0 ||
                                  !locationValue?.value
                                ) {
                                  setDisableSave(true);
                                } else {
                                  setDisableSave(false);
                                }
                                setNoWorkspaceResultText('');
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
                                      ? selectedRoomList[0]?.name
                                      : ''
                                  }
                                  type="text"
                                  onFocus={() => {
                                    setRoomFocus(true);
                                  }}
                                  onBlur={() => {
                                    setTimeout(() => {
                                      setRoomFocus(false);
                                    }, 500);
                                  }}
                                  placeholder={'Search Room'}
                                  className="input-filter bg-white user-input-filters"
                                  onChange={changeRoomSearchText}
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
                                if (
                                  primaryTeamStatus?.length == 0 ||
                                  !locationValue?.value
                                ) {
                                  setDisableSave(true);
                                } else {
                                  setDisableSave(false);
                                }
                                setNoRoomResultText('');
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
                                      ? selectedParkingList[0]?.name
                                      : ''
                                  }
                                  type="text"
                                  onFocus={() => {
                                    setParkingFocus(true);
                                  }}
                                  onBlur={() => {
                                    setTimeout(() => {
                                      setParkingFocus(false);
                                    }, 500);
                                  }}
                                  placeholder={'Search Parking'}
                                  className="input-filter bg-white user-input-filters"
                                  onChange={changeParkingSearchText}
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
                                if (
                                  primaryTeamStatus?.length == 0 ||
                                  !locationValue?.value
                                ) {
                                  setDisableSave(true);
                                } else {
                                  setDisableSave(false);
                                }
                                setNoParkingResultText('');
                              } catch (e) {}
                            }}
                          />
                        ) : (
                          <p className="no-result-text">
                            {noParkingResultText}
                          </p>
                        )}
                      </div>

                      {/* Default working hours */}
                      <div className="user-personal-inner">
                        <Row className="align-items-center">
                          <Col xl={8} lg={8} md={24} span={24}>
                            <div className="user-personal-label">
                              <label htmlFor="name">{'Default Hours'} </label>
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
                                      {
                                        primaryTeamStatus?.length == 0 ||
                                        !locationValue?.value
                                          ? setDisableSave(true)
                                          : setDisableSave(false);
                                      }
                                    }}
                                    value={moment(
                                      startTime?.data,
                                      timeFormat_24,
                                    )}
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
                                      {
                                        primaryTeamStatus?.length == 0 ||
                                        !locationValue?.value
                                          ? setDisableSave(true)
                                          : setDisableSave(false);
                                      }
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
                    {/* Personal limits */}
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
                                value={minInOfficeDays}
                                type="text"
                                min="0"
                                max="5"
                                onInput={(e: any) =>
                                  (e.target.value = e.target.value.slice(0, 2))
                                }
                                onChange={handleminInOfficeDaysChange}
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
                        collapseClass.hrPermissionGroup == true
                          ? 'block'
                          : 'none'
                      }`,
                    }}
                    id="locates"
                  >
                    <div className="locate-managename p-0">
                      <div className="locate-setscheck locate-setscheck-info">
                        <ul>
                          {hrPermissionList?.map((item: any, index: number) => {
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
                      aria-expanded={
                        collapseClass.HS == true ? 'true' : 'false'
                      }
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          HS: !collapseClass.HS,
                        })
                      }
                    >
                      {findLabelText(
                        'Emergency_responders',
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
                        collapseClass.notificationGroup == true
                          ? 'block'
                          : 'none'
                      }`,
                    }}
                    id="teams"
                  >
                    <div className="locate-managename p-0">
                      <div className="locate-setscheck locate-setscheck-info">
                        <ul>
                          {notificationList?.map((item: any, index) => {
                            return (
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
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove User */}
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
                <div className="user-footer-btn">
                  <Link
                    to="#"
                    className="btn link-cancel"
                    onClick={edithandleClick}
                  >
                    {findLabelText('Cancel', 'Cancel', 'User_Management')}
                  </Link>
                  <Link
                    className={`btn btn-primary ${
                      primaryTeamStatus?.length == 0 || !locationValue?.value
                        ? 'disabledbutton'
                        : ''
                    }`}
                    to="#"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {findLabelText('Save', 'Save', 'Settings')}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {selectedTab == '2' ? (
            <div className="create-locationsets create-scroll create-locationsets-inner create-locationsets-inner-info">
              <div className="location-scroll location-scroll-inner-height">
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
                          collapseClass.primaryTeam
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
                        {teamLoaderFlag && (
                          <Loader height={'30'} width={'30'} />
                        )}
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
                                      data-bs-toggle={
                                        editusersdatas?.primary_teams?.length >
                                        0
                                          ? 'modal'
                                          : ''
                                      }
                                      data-bs-target={
                                        editusersdatas?.primary_teams?.length >
                                        0
                                          ? '#delete-modal'
                                          : ''
                                      }
                                      onClick={() => {
                                        handleStatus(
                                          item,
                                          index,
                                          editTypesForUserSettings.teams,
                                        );
                                      }}
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
                            searchText?.PrimaryTeam?.length !== 0
                              ? 'd-none'
                              : ''
                          }`}
                        >
                          {primaryTeamStatus?.map((item, index) => {
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
                        {primaryTeamStatus?.length == 0 ? (
                          <label
                            className="user-management-team-error-message"
                            style={{ color: 'red' }}
                          >
                            {UserSettingsLabels.pleaseSelectTeam}
                          </label>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>

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
                          collapseClass.secondaryTeam
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
                              className="input-filter bg-white"
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
                        {teamLoaderFlag && (
                          <Loader height={'30'} width={'30'} />
                        )}
                        <ul
                          className={`team-dropdown ${
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
                                          searchWords={[searchText?.value]}
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
                          {teamstatus?.map((item, index) => {
                            return (
                              <li key={index}>
                                <div className="user-management-search justify-content-between">
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
                  <div className="user-footer-btn">
                    <Link
                      to="#"
                      className="btn link-cancel"
                      onClick={edithandleClick}
                    >
                      {findLabelText('Cancel', 'Cancel', 'User_Management')}
                    </Link>
                    <Link
                      className={`btn btn-primary ${
                        primaryTeamStatus?.length == 0 || !locationValue?.value
                          ? 'disabledbutton'
                          : ''
                      }`}
                      to="#"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {findLabelText('Save', 'Save', 'Settings')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {selectedTab == '3' ? <History userId={editusersdatas?.id} /> : null}
        </div>
      </Col>
      {warning != '' && (
        <DeleteConfirmationModal
          cancel={() => {
            setWarning('');
          }}
          confirm={() => {
            warning == 'INACTIVE' || warning == 'NO_INACTIVE'
              ? setStatus(false)
              : warning == 'DELETE'
              ? handleRemoveUserDetail()
              : setSearchText({
                  value: '',
                  PrimaryTeam: [],
                });
            const val: any = [];
            val.push(updatedTeam);
            if (updatedTeam) {
              setPrimaryTeamStatus(val);
            }
            setWarning('');
          }}
          header={
            warning == 'INACTIVE' || warning == 'NO_INACTIVE'
              ? 'Warning'
              : warning == 'DELETE'
              ? 'Confirm Delete'
              : 'Change Team'
          }
          content={
            warning == 'INACTIVE' || warning == 'NO_INACTIVE'
              ? warningContent
              : warning == 'DELETE'
              ? global.validationLabel.userManagement.deleteWarning
              : global.validationLabel.userManagement.changeTeamWarning
          }
          proceedButton={
            warning == 'INACTIVE'
              ? 'Continue'
              : warning == 'NO_INACTIVE'
              ? ''
              : warning == 'DELETE'
              ? 'Delete'
              : 'Continue'
          }
          cancelButton={warning == 'NO_INACTIVE' ? 'Close' : 'Cancel'}
        />
      )}
    </>
  );
};

export default Edit;
