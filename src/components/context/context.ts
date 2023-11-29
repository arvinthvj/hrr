import React from 'react';

interface BookTabProps {
  id: number;
  name: string;
  icon_images: string;
}
type SelectedLocationProps = {
  id: string;
  name: string;
  working_days: Array<string>;
  timezone: string;
  utc_format: string;
  fullname: string;
  label: string;
  value: string;
};

interface BookingContextProps {
  selectedTab: BookTabProps | null;
  viewBy: string;
  startTime: string | null;
  endTime: string | null;
  selectedLocation: SelectedLocationProps | null;
  selectedCapacity: string;
  selectedFilter: Array<number> | null;
  setCapacityList?: CallableFunction;
  setInitialCapacity?: CallableFunction;
  bookDate: Date;
  setSelectedTab: CallableFunction;
  setViewBy: CallableFunction;
  setBookDate: CallableFunction;
  search: string;
  setSearch: CallableFunction;
  setSelectedLocation: CallableFunction;
  setStartTime: CallableFunction;
  setEndTime: CallableFunction;
  selectedLoaction: any;
  capacityList: Array<any>;
  setSelectedAmenities: CallableFunction;
  timezone: string;
  setTimeZone: CallableFunction;
  timezoneId: string;
  setTimeZoneId: CallableFunction;
  registration: string;
  showPageloading: CallableFunction;
  hidePageloading: CallableFunction;
}

export const BookingContext = React.createContext<BookingContextProps>({
  search: '',
  selectedTab: null,
  viewBy: '',
  startTime: null,
  endTime: null,
  selectedLocation: null,
  selectedCapacity: '',
  selectedFilter: null,
  bookDate: new Date(),
  capacityList: [],
  setBookDate: () => {},
  setInitialCapacity: () => {},
  setSelectedTab: () => {},
  setViewBy: () => {},
  setSearch: () => {},
  setSelectedLocation: () => {},
  setStartTime: () => {},
  setEndTime: () => {},
  selectedLoaction: {},
  setSelectedAmenities: () => {},
  timezone: '',
  setTimeZone: () => {},
  timezoneId: '',
  setTimeZoneId: () => {},
  registration: '',
  showPageloading: () => {},
  hidePageloading: () => {},
});

interface DropDownOptions {
  label: string;
  value: string;
}
export type HRSettingsProps = {
  allPermissionList: any;
  selectedGroupAccess: DropDownOptions | {};
  updatateGrpAccess: CallableFunction;
  permissionGroupAccess: number;
  setPermissionGroupAccess: CallableFunction;
  setAllPermissionList: CallableFunction;
  setTab: CallableFunction;
  tab: string;
  scrollHeight: any;
  leftScrollHeight: any;
  allPermissionStatus: boolean;
  setAllPermissionStatus: CallableFunction;
};
export const HRSettingsContext = React.createContext<HRSettingsProps>({
  allPermissionList: {},
  selectedGroupAccess: {},
  updatateGrpAccess: () => {},
  permissionGroupAccess: 0,
  setPermissionGroupAccess: () => {},
  setAllPermissionList: () => {},
  setTab: () => {},
  tab: '',
  scrollHeight: 0,
  leftScrollHeight: 0,
  allPermissionStatus: false,
  setAllPermissionStatus: () => {},
});

interface GlobalEnvironmentProps {
  success: CallableFunction | any;
  uploadFile: CallableFunction;
  showFile: Object | any;
}
type TenantPortalProps = {
  maxNoOfWorkSpace: number;
  setMaxNoOfWorkSpace: CallableFunction;
  maxNoOfRooms: number;
  setMaxNoOfRooms: CallableFunction;
  maxNoOfParking: number;
  setMaxNoOfParking: CallableFunction;
  maxNoOfUser: number;
  setMaxNoOfUser: CallableFunction;
  setIsTrial: CallableFunction;
  setStartDate: CallableFunction;
  setEndDate: CallableFunction;
  isTrial: boolean;
  startDate: Date;
  endDate: Date;
  setSubscriptionRenew: CallableFunction;
  isSubscriptionAutoRenew: boolean;
};
type AdminTenantContextProps = {
  allConfigurations: any;
};
export const AdminTenantContext = React.createContext<AdminTenantContextProps>({
  allConfigurations: {},
});

interface LanguageContextProps {
  languages: any;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  languages: {},
});

export interface QuickBookProps {
  startDate: Date;
  setStartDate: CallableFunction;
  startTime: string | null;
  endTime: string | null;
  setStartTime: CallableFunction;
  setEndTime: CallableFunction;
  isShowCharValidationMsg: boolean;
  setShowCharValidationMsg: CallableFunction;
  utcFormat: string | null;
  setUTCFormat: CallableFunction;
  setInitial: CallableFunction;
  setBookInitial: CallableFunction;
  initial: boolean;
  bookInitial: number;
  comment: string | '';
  setComment: CallableFunction;
  participants: Array<any>;
  setParticipants: CallableFunction;
  subject: string | '';
  setSubject: CallableFunction;
  subjectValidate: string | '';
  subjectSetValidate: CallableFunction;
}
export type QuickBookTabsProps = {
  assetData: Object | any;
  activeDashboardFunction: CallableFunction;
};
export type UserSettingsProps = {
  searchlist: string | null;
  setSearchList: CallableFunction;
  error: string;
  setError: CallableFunction;
  handleAdd: CallableFunction;
  liststatus: boolean;
  setListStatus: CallableFunction;
};
export const QuickBookContext = React.createContext<QuickBookProps>({
  startDate: new Date(),
  setStartDate: () => {},
  startTime: null,
  setStartTime: () => {},
  endTime: null,
  setEndTime: () => {},
  isShowCharValidationMsg: false,
  setShowCharValidationMsg: () => {},
  utcFormat: null,
  setUTCFormat: () => {},
  setInitial: () => {},
  setBookInitial: () => {},
  initial: false,
  bookInitial: 0,
  comment: '',
  setComment: () => {},
  participants: [],
  setParticipants: () => {},
  subject: '',
  subjectValidate: '',
  subjectSetValidate: () => {},
  setSubject: () => {},
});
export const QuickBookTabContext = React.createContext<QuickBookTabsProps>({
  assetData: {},
  activeDashboardFunction: () => {},
});
export const UserSetting = React.createContext<UserSettingsProps>({
  searchlist: '' || null,
  setSearchList: () => {},
  error: '',
  setError: () => {},
  handleAdd: () => {},
  liststatus: false,
  setListStatus: () => {},
});
export const GlobalEnvironmentData =
  React.createContext<GlobalEnvironmentProps>({
    success: () => {},
    uploadFile: () => {},
    showFile: {},
  });
export const TenantPortal = React.createContext<TenantPortalProps>({
  maxNoOfWorkSpace: 0,
  setMaxNoOfWorkSpace: () => {},
  maxNoOfRooms: 0,
  setMaxNoOfRooms: () => {},
  maxNoOfParking: 0,
  setMaxNoOfParking: () => {},
  maxNoOfUser: 0,
  setMaxNoOfUser: () => {},
  setIsTrial: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  isTrial: false,
  startDate: new Date(),
  endDate: new Date(),
  setSubscriptionRenew: () => {},
  isSubscriptionAutoRenew: false,
});
export interface QuickBookAssetCardProps {
  selectedAsset: Object | any;
  responseData: Object | any;
  setResponseData: CallableFunction;
  selectedAssetId: Object | null;
  setSelectedAssetId: CallableFunction;
  floorId: Object | null;
  setFloorId: CallableFunction;
  timeZone: string | null;
  updateSelectedAsset: CallableFunction;
  setTimeZone: CallableFunction;
  chooseFlag: boolean;
  setChooseFlag: CallableFunction;
  utcFormat: string | null;
  gotoGlobal: boolean;
  setGotoGlobal: CallableFunction;
  handleSelection: CallableFunction;
  selectedItems: Object;
}
export const QuickBookAssetCardContext =
  React.createContext<QuickBookAssetCardProps>({
    selectedAsset: {},
    responseData: {},
    setResponseData: () => {},
    selectedAssetId: {},
    setSelectedAssetId: () => {},
    floorId: {},
    setFloorId: () => {},
    timeZone: '',
    updateSelectedAsset: () => {},
    setTimeZone: () => {},
    chooseFlag: false,
    setChooseFlag: () => {},
    utcFormat: '',
    gotoGlobal: false,
    setGotoGlobal: () => {},
    handleSelection: () => {},
    selectedItems: {},
  });

export interface QuickBookDayProps {
  editDetails?: Object | any;
  editRoomDetails?: Object | any;
  editBook?: Object;
}
export const QuickBookDayContext = React.createContext<QuickBookDayProps>({
  editDetails: {},
  editRoomDetails: {},
  editBook: {},
});

export type LocationSettingsProps = {
  createOrEditLocation: boolean;
  lastLocation: Object | any;
  showAssetsConfiguration: boolean;
  setRightSideBar: CallableFunction;
  setSearchList: CallableFunction;
  filterList: CallableFunction;
  liststatus: boolean;
  listInActiveStatus: boolean;
  assetsDetails: Object;
  setOpenBulkUploadView: CallableFunction;
  addAssetInLocation: boolean;
  setAddAssetInLocation: CallableFunction;
  setEditAssetValue: CallableFunction;
  setLocationId: CallableFunction;
  setFloorId: CallableFunction;
  successAddAsset: string | null;
  bulkUploadAsset: string | null;
  setFilteredId: CallableFunction;
  filteredId: string | number | null;
  setLocationChange: CallableFunction;
  locationChange: boolean;
  handleClose: CallableFunction | any;
  updateAssetsConfigurationFlag: CallableFunction;
  userPermissionCheck: boolean;
  setListStatus: CallableFunction;
  setListInActiveStatus: CallableFunction;
  setCreateOrEditStateFlag: CallableFunction;
  floorId: string | number | null;
  listData: Object;
  setEditLocationDetails: CallableFunction;
  editLocationDetails: Object | any;
  totalPage: number | string;
};


export const LocationSettingsContext =
  React.createContext<LocationSettingsProps>({
    createOrEditLocation: false,
    lastLocation: {},
    showAssetsConfiguration: false,
    setRightSideBar: () => {},
    setSearchList: () => {},
    filterList: () => {},
    liststatus: true,
    listInActiveStatus: true,
    assetsDetails: {},
    setOpenBulkUploadView: () => {},
    addAssetInLocation: false,
    setAddAssetInLocation: () => {},
    setEditAssetValue: () => {},
    setLocationId: () => {},
    setFloorId: () => {},
    successAddAsset: '',
    bulkUploadAsset: '',
    setFilteredId: () => {},
    filteredId: 0,
    setLocationChange: () => {},
    locationChange: false,
    handleClose: () => {},
    updateAssetsConfigurationFlag: () => {},
    userPermissionCheck: false,
    setListStatus: () => {},
    setListInActiveStatus: () => {},
    setCreateOrEditStateFlag: () => {},
    floorId: '',
    listData: [],
    setEditLocationDetails: () => {},
    editLocationDetails: {},
    totalPage: 1,
  });

export type CreateOrEditLocationProps = {
  locationNameTitle: string;
  selectedLocationObj: Object | any;
  locationLevel: Object;
  setParentLocationSelected: CallableFunction;
  setValue: CallableFunction;
  parentLocationSelectedName: string | null;
  setParentLocationSelectedName: CallableFunction;
  setSelectedLocationObj: CallableFunction;
  activesatate: boolean;
  setActiveState: CallableFunction;
  setShowInactivePopup: CallableFunction;
  untileDate: Date | null;
  setUntileDate: CallableFunction;
  counter: number;
  setCounter: CallableFunction;
  charValidationMsg: boolean;
  setCharValidationMsg: CallableFunction;
  setParentLocationSearchText: CallableFunction;
  parentLocationSearchList: Object | any;
  setParentLocationSearchList: CallableFunction;
  parentLocationSearchText: string | any;
  setParentlocationTempData: CallableFunction;
  parentSearchLoading: boolean;
  languageList: Object | any;
  timeZoneList: Object | any;
  currencyList: Object | any;
  weekstart: Object | any;
  defaultworkingweek: Object | any;
  setDefaultworkingWeek: CallableFunction | any;
  hoursList: Object | any;
  validateDefaultDayAndHours: CallableFunction;
  setHoursList: CallableFunction;
  selectedmemberList: Object | any;
  setSelectedMemberhList: CallableFunction;
  handleSubmit: CallableFunction;
  selectedmemberListBackup: Object | any;
  parentLocationSelected: Object | any;
  closeRightSideSection: CallableFunction;
  control: CallableFunction | any;
  trigger: CallableFunction;
  errors: Object | any;
  parentLocationBackupSelected: Object | any;
  setShowDeletePopup: CallableFunction;
  setShowParentChangePopup: CallableFunction;
}
export const CreateOrEditLocationContext =
  React.createContext<CreateOrEditLocationProps>({
    locationNameTitle: '',
    selectedLocationObj: {},
    locationLevel: [],
    setParentLocationSelected: () => {},
    setValue: () => {},
    parentLocationSelectedName: '',
    setParentLocationSelectedName: () => {},
    setSelectedLocationObj: () => {},
    activesatate: true,
    setActiveState: () => {},
    setShowInactivePopup: () => {},
    untileDate: null,
    setUntileDate: () => {},
    counter: 0,
    setCounter: () => {},
    charValidationMsg: false,
    setCharValidationMsg: () => {},
    setParentLocationSearchText: () => {},
    parentLocationSearchList: [],
    setParentLocationSearchList: () => {},
    parentLocationSearchText: '',
    setParentlocationTempData: () => {},
    parentSearchLoading: false,
    languageList: [],
    timeZoneList: [],
    currencyList: [],
    weekstart: [],
    defaultworkingweek: [],
    setDefaultworkingWeek: () => {},
    hoursList: [],
    validateDefaultDayAndHours: () => {},
    setHoursList: () => {},
    selectedmemberList: [],
    setSelectedMemberhList: () => {},
    handleSubmit: () => {},
    selectedmemberListBackup: [],
    parentLocationSelected: {},
    closeRightSideSection: () => {},
    control: () => {},
    trigger: () => {},
    errors: {},
    parentLocationBackupSelected: {},
    setShowDeletePopup: () => {},
    setShowParentChangePopup: () => {},
  });

export type AssetManagementProps = {
  location_id: number | string | null;
  openBulkUpload: CallableFunction;
  count: number | null;
  addAssetInLocation: CallableFunction;
  cancelBulkasset: CallableFunction;
  successAddAsset: CallableFunction;
  bulkUploadAsset: CallableFunction;
  filterList: CallableFunction;
  statusActive: boolean;
  statusInActive: boolean;
  setActivateStatus: CallableFunction;
  setInActivateStatus: CallableFunction;
  workList: Object;
  totalPage: number;
};
export const AssetManagementContext = React.createContext<AssetManagementProps>(
  {
    location_id: null,
    openBulkUpload: () => {},
    count: null,
    addAssetInLocation: () => {},
    cancelBulkasset: () => {},
    successAddAsset: () => {},
    bulkUploadAsset: () => {},
    filterList: () => {},
    statusActive: true,
    statusInActive: true,
    setActivateStatus: () => {},
    setInActivateStatus: () => {},
    workList: [],
    totalPage: 1,
  },
);

export interface UpdateAssetProps {
  handleBack: CallableFunction | any;
  editData: Object | any;
  handleSubmit: CallableFunction;
  selectLocationList: Object;
  successFun: CallableFunction;
  selectedAmenities: Object | any;
  onSubmit: CallableFunction;
  activeControl: boolean;
  setActiveControl: CallableFunction;
  control: CallableFunction | any;
  trigger: CallableFunction;
  errors: Object | any;
  setStartTime: CallableFunction;
  startTime: string | null;
  setEndTime: CallableFunction;
  endTime: string | null;
  capacity: number | any;
  setCapacity: CallableFunction;
  setSelectedAmenities: CallableFunction;
  floorId: number | string | null;
  selectedTeams: Object | any;
  setSelectedTeams: CallableFunction | any;
  externalTeam: Object;
  setExternalTeam: CallableFunction;
  userStatus: number | any;
  setUserStatus: CallableFunction;
  withinTeam: Object;
  setWithinTeam: CallableFunction;
  setOpenWarningPopup: CallableFunction;
}
export const UpdateAssetContext = React.createContext<UpdateAssetProps>({
  handleBack: () => {},
  editData: {},
  handleSubmit: () => {},
  selectLocationList: [],
  successFun: () => {},
  selectedAmenities: [],
  onSubmit: () => {},
  activeControl: true,
  setActiveControl: () => {},
  control: () => {},
  trigger: () => {},
  errors: {},
  setStartTime: () => {},
  startTime: null,
  setEndTime: () => {},
  endTime: null,
  capacity: 1,
  setCapacity: () => {},
  setSelectedAmenities: () => {},
  floorId: null,
  selectedTeams: [],
  setSelectedTeams: () => {},
  externalTeam: [],
  userStatus: '1',
  setUserStatus: () => {},
  setExternalTeam: () => {},
  withinTeam: [],
  setWithinTeam: () => {},
  setOpenWarningPopup: () => {},
});

export interface HrPreferenceProps {
  preferenceDetails: Array<any> | any;
  setPreferenceDetails: CallableFunction;
  hrBenefitsInsuranceDetails: Array<any> | any;
  setBeneFitInsuranceData: CallableFunction;
  hrBenefitsDetails: Array<any> | any;
  setBenefitData: CallableFunction;
  setAssetsData: CallableFunction;
  setPensionData: CallableFunction;
  hrPensionDetails: Array<any> | any;
  hrAssetsDetails: Array<any> | any;
  setOrgChartData: CallableFunction;
  orgChartData: any;
  isHrJobs: boolean;
  setHrJObs: CallableFunction;
  setHrUserId: CallableFunction;
  hrUserId: any;
  setUserAssigneeData: CallableFunction;
  userAssigneeData: any;
  setAssignedUserList: CallableFunction;
  setUnAssignedUserList: CallableFunction;
  assignedUser: any;
  unAssignedUsers: any;
  searchValue: any;
  setSearchValueOrgChart: any;
  setNodeSelect: any;
  isSelectedNode: boolean;
  setUpdateOrgChart: any;
  isUpdateOrgChart: boolean;
  orgChatRootNode: any;
  setOrgChatRootNode: CallableFunction;
  setOrgChartPersonalTab: CallableFunction;
  isPersonalTab: boolean;
  isEdit : boolean;
  setIsOrgChartEdit : CallableFunction;
  orgPermission : number;
  setOrgChartPermissions : CallableFunction;
  setInitialFunction : CallableFunction;
  isIntialisedNode: boolean;
}

export const hrPreferenceContext = React.createContext<HrPreferenceProps>({
  preferenceDetails: [],
  setPreferenceDetails: () => [],
  hrBenefitsInsuranceDetails: [],
  setBeneFitInsuranceData: () => [],
  hrBenefitsDetails: [],
  setBenefitData: () => [],
  setAssetsData: () => [],
  setPensionData: () => [],
  hrPensionDetails: [],
  hrAssetsDetails: [],
  setOrgChartData: () => [],
  orgChartData: {},
  isHrJobs: false,
  setHrJObs: () => {},
  setHrUserId: () => {},
  hrUserId: 0,
  setUserAssigneeData: () => {},
  userAssigneeData: {},
  setAssignedUserList: () => [],
  setUnAssignedUserList: () => [],
  assignedUser: [],
  unAssignedUsers: [],
  searchValue: '',
  setSearchValueOrgChart: () => {},
  setNodeSelect: () => {},
  isSelectedNode: false,
  setUpdateOrgChart: () => {},
  isUpdateOrgChart: false,
  orgChatRootNode: 0,
  setOrgChatRootNode: () => {},
  setOrgChartPersonalTab: () => {},
  isPersonalTab: false,
  isEdit: false,
  setIsOrgChartEdit: () => {},
  orgPermission : 0,
  setOrgChartPermissions : () => {},
  setInitialFunction : () => {},
  isIntialisedNode: false
});
