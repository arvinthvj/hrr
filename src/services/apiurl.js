export const companySettingsList = 'settings/api/companySettingsList';
export const WorkspaceList = 'settings/api/workschedule/list';
export const TenantAddList = '/sa/api/tenant/add';
export const workscheduleupdate = 'settings/api/workschedule/update';
export const addCompanySettingsList = 'settings/api/addCompanySettings';
export const QuickbookchangeWorkspacesNew = '/book/api/changeWorkspacesNew';
export const editChangeWorkspacesNew = '/book/api/editChangeWorkspacesNew';
export const CheckAssetStatus = 'book/api/checkassetstatus';
export const AssetAllList = '/settings/api/AssetAllList';
export const logoutSecretKey = '/auth/api/logoutSecretKey';
export const RefreshToken = '/auth/api/refreshToken';
export const GetUserMenuList = '/auth/api/getusermenulist';
export const inOfficePolicy = '/book/api/getinofficepolicy';

// AWS APIs
export const storeToS3 = 'settings/api/stores3data';
export const getFromS3 = 'settings/api/gets3data';
export const deleteS3 = 'settings/api/deletes3data';
export const getSecret = 'settings/api/getSecretValue';
export const getFirebaseCredential = 'settings/api/getFirebaseCredential';
export const getBottomLogo = 'settings/api/getLogoSecretValue';
export const putSecret = 'settings/api/putSecretValue';
export const getIntercomSecret = 'settings/api/getIntercomValue';

// User Management APIs
export const userManagementUserList = 'auth/api/user/listUserDetails';
export const userManagementPermissionsList = 'auth/api/user/getUserRole';
export const userManagementTeamList = 'auth/api/team/searchTeamName';
export const userManagementHealthAndSafetyList =
  'auth/api/user/userHealthAndSafety';
export const userManagementCreateUser = 'auth/api/user/addUserDetails';
export const userManagementEditUserDetails = 'auth/api/user/editUserDetails';
export const userManagementUpdateEditUserDetails =
  'auth/api/user/updateUserDetails';
export const userManagementDeleteDetails = 'auth/api/user/deleteUserDetails';
export const userManagementBulkUplode = 'auth/api/user/uploadBulkUserDetails';
export const userManagementlocationList = 'locate/api/locationlist'; // with search Search
export const searchUserManagement = 'auth/api/user/userFindParamDetails';
export const UserManagementBulkAddandRemoveTeam =
  'auth/api/user/bulkUsersAddAndRemoveTeam';
export const GetUserHistoryList = 'auth/api/getUserhistoryDetails';
export const GetTeamHistoryList = 'auth/api/getTeamHistoryDetails';
export const addAndUpdateUserDetailsNew =
  '/auth/api/user/addAndUpdateUserDetailsNew';
export const editInfo = '/auth/api/user/editinfo';
export const getUserNotificationList = 'auth/api/user/getUserNotificationList';
export const deleteTeamDetails = 'auth/api/team/deleteTeamDetails';

// User Locations API
export const LocationRegionList = 'locate/api/region/list';
export const LocationCreateRegion = 'locate/api/region/create';
export const LocationRegionAdd = 'locate/api/region/add';
export const LocationRegionEdit = 'locate/api/region/edit';
export const LocationRegionUpdata = 'locate/api/region/update';
export const LocationRegionDelete = 'locate/api/region/delete';
export const LocationRegionActive = 'locate/api/region/active';
export const LocationSearchManagers = 'auth/api/user/searchUserName';
export const authLogin = '/auth/api/login';
// user Locations CountryList
export const LocationCountryList = 'locate/api/country/list';
export const LocationCreateCountryList = 'locate/api/country/create';
export const LocationAddCountryList = 'locate/api/country/add';
export const LocationEditCountryList = 'locate/api/country/edit';
export const LocationDeleteCountryList = 'locate/api/country/delete';
export const LocationUpdateCountryList = 'locate/api/country/update';
// user Locations StateList
export const LocationstateList = 'locate/api/state/list';
export const LocationstateCreate = 'locate/api/state/create';
export const LocationstateAdd = 'locate/api/state/add';
export const LocationstateEdit = 'locate/api/state/edit';
export const LocationstateUpdata = 'locate/api/state/update';
export const LocationstateDelete = 'locate/api/state/delete';

// user Locations CityList
export const LocationCityList = 'locate/api/city/list';
export const LocationCityCreate = 'locate/api/city/create';
export const LocationCityAdd = 'locate/api/city/add';
export const LocationCityEdit = 'locate/api/city/edit';
export const LocationCityDelete = 'locate/api/city/delete';
export const LocationCityUpdate = 'locate/api/city/update';

// user Locations StreetList
export const LocationStreetList = 'locate/api/street/list';
export const LocationStreetEdit = 'locate/api/street/edit';
export const LocationStreetCreate = 'locate/api/street/create';
export const LocationStreetDelete = 'locate/api/street/delete';
export const LocationStreetAdd = 'locate/api/street/add';
export const LocationStreetUpdate = 'locate/api/street/update';

// user Locations Building
export const LocationBuildingList = 'locate/api/building/list';
export const LocationBuildingEdit = 'locate/api/building/edit';
export const LocationBuildingCreate = 'locate/api/building/create';
export const LocationBuildingDelete = 'locate/api/building/delete';
export const LocationBuildingAdd = 'locate/api/building/add';
export const LocationBuildingUpdate = 'locate/api/building/update';

// user Locations Suburb
export const LocationSuburbList = 'locate/api/suburb/list';
export const LocationSuburbCreate = 'locate/api/suburb/create';
export const LocationSuburbDelete = 'locate/api/suburb/delete';
export const LocationSuburbAdd = 'locate/api/suburb/add';
export const LocationSuburbUpdate = 'locate/api/suburb/update';
export const LocationSuburbEdit = 'locate/api/suburb/edit';

// user Locations Floor
export const LocationFloorList = 'locate/api/floor/list';
export const LocationFloorCreate = 'locate/api/floor/create';
export const LocationFloorDelete = 'locate/api/floor/delete';
export const LocationFloorAdd = 'locate/api/floor/add';
export const LocationFloorUpdate = 'locate/api/floor/update';
export const LocationFloorEdit = 'locate/api/floor/edit';

// user Locations Zone
export const LocationZoneList = 'locate/api/zone/list';
export const LocationZoneCreate = 'locate/api/zone/create';
export const LocationZoneDelete = 'locate/api/zone/delete';
export const LocationZoneAdd = 'locate/api/zone/add';
export const LocationZoneUpdate = 'locate/api/zone/update';
export const LocationZoneEdit = 'locate/api/zone/edit';

// User Profile Page
export const getProfileDatas = '/auth/api/userProfile';
export const EditProfile = 'auth/api/updateUserProfile';
export const UserDefaultAssetList = 'asset/api/userDefaultAssetList';
export const userPersonalLimits = 'asset/api/configlist';
export const getUserBookingDetails = '/book/api/getUserBookingDetails';
// Default Asset in profile settings
export const defaultAssetListApi = 'asset/api/workSpaceListsencall';
// user Locations Neighbourhood
export const LocationNeighbourList = 'locate/api/neighbour/list';
export const LocationNeighbourCreate = 'locate/api/neighbour/create';
export const LocationNeighbourDelete = 'locate/api/neighbour/delete';
export const LocationNeighbourAdd = 'locate/api/neighbour/add';
export const LocationNeighbourUpdate = 'locate/api/neighbour/update';
export const LocationNeighbourEdit = 'locate/api/neighbour/edit';
// date and time format of user
export const GetUserDateTimeFormatPref = 'auth/api/user/preferencelist';
export const UpdateUserDateTimeFormatPref = 'auth/api/user/preference';

// LocationNew Apis
export const LocationLevelList = 'locate/api/locationlevellist';
export const LocationBuildingAdditionalData = 'locate/api/createbuilding';
export const GetLanguageDetails = 'settings/api/getlanguageDetails';
export const LocationSaveApi = 'locate/api/savelocation';
export const ParentLocationLists = 'locate/api/parentlocationlist';
export const LocationListAPi = 'locate/api/locationdatalist';
export const LocationEditApi = 'locate/api/editlocation';
export const LocationUpdateApi = 'locate/api/updatelocation';
export const LocationDeleteApi = 'locate/api/deletelocation';
export const LocationGetManagersApi = 'locate/api/getlocationManagerDetails';
export const LocationFloorDetails = 'asset/api/floorplanTypeCount';
export const LocationFloorPlanDetails = 'locate/api/floorplan/list';

export const StartFreetrial = '/sa/api/tenant/validate';
export const CheckParentValidationForFloor =
  'locate/api/checkparentvalidationForFloor';
export const UpdateNotyReadStatus =
  'notifications/api/updatenotificationreadstatus'; // read All notification
// Week schedule
export const SaveWeekBook = 'book/api/saveWeekBook';

export const ApiUrl = {
  // bookingList: "book/api/bookinglist",
  bookingList: 'book/api/monthViewList',
  roomInternalParticipants: 'book/api/roominternal',
  bookingLocationlist: 'locate/api/locationlist',
  capacityList: 'workspace/getCapacityDetails',
  amenitiesList: 'asset/api/amenitieslistenc',
  searchUserName: 'auth/api/user/searchUserName',
  getSetingDetails: 'asset/api/workSpaceType', // need to pass the type  like getSetingDetails/1
  addTeamDetails: 'auth/api/team/addAndUpdateTeamDetailsNew',
  updateTeamDetails: 'auth/api/team/updateTeamDetails',
  teamLists: 'auth/api/team/teamLists',
  editTeamDetails: 'auth/api/team/editTeamDetails',
  teamEditInfo: '/auth/api/team/editInfo',
  addTeamMember: 'auth/api/team/updateTeamMemberDetails',
  searchTeamName: 'auth/api/team/searchTeamName',
  deleteTeamDetails: 'auth/api/team/deleteTeamDetails',
  getParentTeam: 'auth/api/getParentTeam',

  cancelBooking: 'book/api/cancelBooking',
  // addBooking: 'book/api/bookingAdd',
  addBooking: 'book/api/addBooking',
  updateBooking: 'book/api/updateBooking',
  getTimeDetails: 'book/api/getTimeDetails',
  getCountryEditDetails: 'locate/api/country/edit',
  removeCountryApi: 'locate/api/country/delete',

  getBuildingTimezone: 'locate/api/getbuildingtimezone',

  headerUserSearchApi: 'auth/api/user/userFindParamDetails',
  // Team API for Book
  bookingListTeamApi: 'auth/api/team/getTeamAndMembers',
  bookingGetTeamUserDetailsList: 'auth/api/team/getTeamUserDetailsList',
  bookinglistTeam: 'book/api/bookinglistTeam',
  getUserDetailList: 'auth/api/getUserDetailList',
};

// Asset management
export const AssetWokSpaceList = 'asset/api/list';
export const AssetWokSpaceListAdd = 'asset/api/store';
export const AssetWokconfigGetData = 'asset/api/WorkspaceConfiguration';
export const AssetWokconfigUpdate = 'asset/api/WorkspaceConfigurationUpdate';
export const AssetEditResponceData = 'asset/api/editWorkSpaceDetails';
export const AssetAvailableTaglists = 'asset/api/amenitieslistenc';
export const AsseteditUpdateData = 'asset/api/updateWorkSpaceDetails';
export const AssetSearchTeams = 'auth/api/team/searchTeamName';
export const AssetworkSpaceListsencsearch = 'asset/api/workSpaceListsencsearch';
export const AssetTagsList = 'asset/api/WorkspaceConfigurationAmenties';
export const AssetStoreAmenties = 'asset/api/storeamenities';
export const AssetBulkStore = '/asset/api/bulkstore';

// Notification API
export const GetAllNotifications = 'notifications/api/getnotificationlist';
export const GetAllRequestNotifications =
  'notifications/api/getnotificationrequestlist';
export const BookingRequestStatus = 'book/api/requestBookingStatus';

// export const NotificationEditBooking = 'book/api/editBooking'
export const NotificationUpdateBooking = 'book/api/updateBooking';
export const NotificationCancelBooking = 'book/api/cancelBooking';
// export const NotificationReadAndUnRead = "notifications/api/updatereadstatus";
export const UpdateFcmToken = 'notifications/api/updatefcmtoken';
export const BookingCheckin = 'book/api/checkinBooking';

// New Notification
export const GetRequestNotifications =
  'notifications/api/notificationrequestlist';
export const GetNotificationList = 'notifications/api/notificationlist';
export const UserFindDetails = 'notifications/api/userFindDetails';
export const GetNotificationCenterCount =
  'notifications/api/notificationcentercount';
export const UnactionedRequestList = 'notifications/api/unactionedrequestlist';
export const ActionedRequestList = 'notifications/api/actionedrequestlist';

// Teams
export const TeamBuildingLocationList =
  'auth/api/team/getUserAgainstTeamDetails';
export const TeamGetTeamDetails = 'auth/api/team/getTeamDetails';
export const ViewProfileDetails = 'auth/api/team/viewUserProfile';
export const GetTeamSummaryDetails = 'auth/api/team/getTeamSummaryDetails';
export const UserTimezoneDetails = 'auth/api/userTimezoneDetails';
export const resetPasswordApi = 'auth/api/resetPassword';

// Dashboard
export const DashboardTableList = 'book/api/DashboardList';
export const DashboardIsCheckin = 'book/api/dashboardCheckinStatus';
export const DashboardNotification = 'notifications/api/getnotificationlist';
export const DashboardCheckinBooking = 'book/api/checkinBooking';
export const DashboardCheckoutBooking = 'book/api/checkoutBooking';
export const CheckCancel = '/book/api/DashboardAPI';
// QuickBook
export const getBookingDetails = 'book/api/getBookingDetails';
// export const AddBooking = 'book/api/bookingAdd';
export const AddBooking = 'book/api/addBooking';
export const NewUpdatedBooking = 'book/api/bookingedit';
export const SelectWorkSpace = 'book/api/changeWorkspaces';
export const CancelBooking = 'book/api/cancelBooking';
export const UpdateBooking = 'book/api/updateBooking';
export const GetEditBooking = 'book/api/editBooking';
export const TimeZoneListAPI = '/settings/api/timezonelist';

// Schedule Booking
export const GetWeeklySchedule = 'book/api/getWeeklySchedule';
export const SaveWeeklySchedule = 'book/api/saveWeeklySchedule';
export const getOverallLocationlist = 'locate/api/getoverallLocationlist';
export const HrGetOverallLocationlist =
  'locate/api/locateGetoverallLocationlist';
export const AddDayBook = 'book/api/addDayBook';

// Language Setting API
export const LanguageSetting = 'settings/api/language/'; // need to pass language like language/en

// Reset Password
export const ProfileResetPassword = 'auth/api/profile_reset_password';
export const ProfileUpdatePassword = 'auth/api/profile_update_password';

// new url for superadmin
export const SuperAdminUserManagementList = 'sa/api/user/list';
export const SuperAdminUserManagementaddUser = 'sa/api/user/add';
export const SuperAdminUserManagementdeleteUser = 'sa/api/user/delete';
export const SuperAdminUserManagementeditUser = 'sa/api/user/update';
export const SuperAdminUserManagementAccessLevel = 'sa/api/accessLevel';

// Global Health & Saftey Roles
export const GetHealthAndSafetyList = 'sa/api/healthAndSafety/list';
export const AddHealthSafetyRole = 'sa/api/healthAndSafety/add';
export const GetLanguageList = 'sa/api/language/list';
export const UpdateHealthSafetyRole = 'sa/api/healthAndSafety/update';
export const DeleteHealthSafetyRole = 'sa/api/healthAndSafety/delete';

// Tenant Settings
export const GetAllTenantCollection = 'sa/api/tenant/allCollections';
export const SaveTenantDetails = 'sa/api/tenant/add';
export const GetTenantList = 'sa/api/tenant/list';
export const UpdateTenant = 'sa/api/tenant/update';
export const TenantDestroy = 'sa/api/tenant/destroy';
export const TenantBulkUpload = 'sa/api/tenants/bulkUpload';

// global envirolment
export const addGlobalSetting = 'sa/api/globalEnvironment/add';
export const uploadFileApi = 'sa/api/globalEnvironment/uploadfile';
export const globalEnvironmentList = 'sa/api/globalEnvironment/list';

// Global Assert
export const GetGlobalAssertList = 'sa/api/asset/globalAssetList';
export const AddGlobalAssert = 'sa/api/asset/globalAssetAdd';
export const UpdateGlobalAssert = 'sa/api/asset/globalAssetUpdate';
export const DeleteGlobalAssert = 'sa/api/asset/globalAssetDelete';

// Global Search
export const GlobalSearch = 'book/api/globalSearch';

// locate
export const amenitiesListenc = 'asset/api/amenitieslistenc';
export const amenitiesListWorkRoom = 'asset/api/WorkspaceConfiguration';
export const locationListApi = 'locate/api/locationlist';
export const hrLocationListApi = 'locate/api/hrLocationlist';
export const getUserAgainstTeamDetails =
  'auth/api/team/getUserAgainstTeamDetails';
export const snapshot = '/locate/api/snapshot';
export const floorCanvasLocateList = 'locate/api/floorcanvaslocate/list';
export const getLocateTeamDetails = 'auth/api/team/getLocateTeamDetails';
export const getActiveUserDetails = 'auth/api/user/getActiveUserDetails';
export const getUserAgainstLocateDetails =
  'auth/api/team/getUserAgainstLocateDetails';
export const getLocateDetails = 'auth/api/team/getLocateDetails';
export const AssetAmenitiesList =
  'asset/api/WorkspaceConfigurationAmentiesList';
export const GetCheckinStatus = 'book/api/locatecheckinstatus';

// login
export const termsServices = '/terms-sevices';

// floor-plan
export const floorList = 'locate/api/floorplan/list';
export const floorReform = 'locate/api/floorplan/reform';
export const zoneListApi = 'locate/api/floorplanzone/list';
export const floorplanLocationList = 'locate/api/floorplan/locationlist';
export const planTypeApi = 'asset/api/planType';
export const workSpaceListsenc = 'asset/api/workSpaceListsenc';
export const jpublishApi = 'locate/api/floorcanvasmap/jpublish';
export const zoneUpdateApi = 'locate/api/floorplanzone/update';
export const zoneAddApi = 'locate/api/floorplanzone/add';
export const getBookingTime = 'book/api/getbookingtime';

export const locationMemberCount = 'auth/api/user/getLocationUserCount';

export const tenantLoginUrl = 'sa/api/tenants/auth';
export const userLoginEmail = 'auth/api/userVerification';
export const userSearchByName = 'auth/api/user/getUserBehalfList';
export const getSingleUserDetails = 'auth/api/user/getSingleUser';

// HR Module
export const getHrBenifitsInsurance = 'hr/api/list_user_general_benefits';
export const addHrBenefits = 'hr/api/store_user_benefits_health_insurance';
export const updateHrBenefits = 'hr/api/update_user_benefits_health_insurance';
export const deleteBenefit = 'hr/api/delete_user_benefits_health_insurance';
export const updateHrPension = 'hr/api/update_user_pension';
export const addHrPension = 'hr/api/store_user_pension';
export const deleteHrPension = 'hr/api/delete_user_pension';
export const userDetailsList = 'hr/api/list_user_primary_details';
export const saveUserDetails = 'hr/api/store_user_primary_details';
export const ListEmegencyContact = 'hr/api/list_user_emergency_contact';
export const getHrAssetsList = 'hr/api/list_user_asset';
export const addHrAssets = 'hr/api/store_user_asset';
export const updateHrAssets = 'hr/api/update_user_asset';
export const deleteHrAssets = 'hr/api/delete_user_asset';

export const storeVaccinationDetails = 'hr/api/store_user_vaccination_details';
export const getVaccinationDetails = 'hr/api/list_user_vaccination_details';
export const updateVaccinationDetails =
  'hr/api/update_user_vaccination_details';
export const deleteVaccinationDetails =
  'hr/api/delete_user_vaccination_details';

export const getVisaDetails = 'hr/api/list_user_identification_visa_clearance';
export const storeVisaDetails =
  'hr/api/store_user_identification_visa_clearance';
export const updateVisaDetails =
  'hr/api/update_user_identification_visa_clearance';
export const deleteVisaDetails =
  'hr/api/delete_user_identification_visa_clearance';
export const AddEmegencyContact = 'hr/api/store_user_emergency_contact';
export const EditEmegencyContact = 'hr/api/update_user_emergency_contact';
export const DeleteEmegencyContact = 'hr/api/delete_user_emergency_contact';
export const getOrgChartView = 'hr/api/orgchartView';
export const unAssignedUser = 'hr/api/unassignList';
export const assignedUser = 'hr/api/usersList';
export const orgChartView = 'hr/api/orgchartUserView';
export const updateOgChart = 'hr/api/orgchartUserUpdate';
export const allUserList = 'hr/api/allUsersList';
export const updateRootUser = 'hr/api/orgchartRootUserUpdate';

export const ListEducationAndCertificate =
  'hr/api/list_user_education_certification';
export const AddEducationAndCertificate =
  'hr/api/store_user_education_certification';
export const EditEducationAndCertificate =
  'hr/api/update_user_education_certification';
export const DeleteEducationAndCertificate =
  'hr/api/delete_user_education_certification';

export const ListIdentificationAndVisaAndClearance =
  'hr/api/list_user_identification_visa_clearance';
export const AddIdentificationAndVisaAndClearance =
  'hr/api/store_user_identification_visa_clearance';
export const EditIdentificationAndVisaAndClearance =
  'hr/api/update_user_identification_visa_clearance';
export const DeleteIdentificationAndVisaAndClearance =
  'hr/api/delete_user_identification_visa_clearance';

export const countryListAPI = 'hr/api/list_countries';
export const personalDetailsAPI = 'hr/api/list_user_personal_details';

export const personalChangeHistoryAPI = 'hr/api/list_changes_history';
export const hrFormFieldList = 'hr/api/list_hr_form_fields';
export const storeHrPermission = 'hr/api/store_hr_permission';
export const storeHrPermissionJob = 'hr/api/store_hr_permission_job';
export const hrPermissionGroupList = 'hr/api/list_hr_permission_group';
export const hrPermissionGroupDelete = 'hr/api/delete_hr_permission_group';
export const hrGetPreferencesList = 'hr/api/allprefrencedetails';
export const hrGetAssestList = 'hr/api/assetlist';
export const hrUpdateAssest = 'hr/api/storeassetlist';
export const hrUpdateDefaultTime = 'hr/api/storeprefrencedata';

export const hrPermissionFieldsList = 'hr/api/list_hr_form_fields_permission';
export const hrJobsWorkInformation = 'hr/api/list_user_work_information';
export const hrJobsWorkInformationAdd = 'hr/api/store_user_work_information';
export const hrJobsPayType = 'hr/api/list_user_work_pay_type';
export const workStatus = 'hr/api/list_user_work_status';
export const userFindParamDetails = 'hr/api/userFindParamDetails';
export const hrUserFindParamDetails = 'hr/api/userFindParamDetails';
export const leaveTypesApi = 'hr/api/list_leave_types';
export const listTimeOffTypes = 'hr/api/list_user_timeoff_types';
export const adjustLeaveApi = 'hr/api/store_adjust_leave';
export const checkBookedTimeOff = 'hr/api/check_booked_timeoff';
export const list_hrRequest = 'hr/api/list_hrrequest';
export const update_hrRequest = 'hr/api/update_hrrequest';
export const bookedTimeoffHoliday = 'hr/api/list_booked_timeoff_holiday';

export const workHistory = {
  Add: 'hr/api/store_user_work_history',
  Update: 'hr/api/update_user_work_history',
  Delete: 'hr/api/delete_user_work_history',
};
export const compensation = {
  Add: 'hr/api/store_user_work_compensation',
  Update: 'hr/api/update_user_work_compensation',
  Delete: 'hr/api/delete_user_work_compensation',
};
export const workManager = {
  Add: 'hr/api/store_work_manager',
  Update: 'hr/api/update_work_manager',
  Delete: 'hr/api/delete_work_manager',
};
export const directReport = {
  Add: 'hr/api/store_work_direct_report',
  Update: 'hr/api/update_work_direct_report',
  Delete: 'hr/api/delete_work_direct_report',
};
export const timeOffTypes = {
  List: 'hr/api/list_timeoff_types',
  Add: 'hr/api/store_timeoff_types',
  Update: 'hr/api/update_timeoff_types',
  Delete: 'hr/api/delete_timeoff_types',
};
export const timeOffProfiles = {
  List: 'hr/api/list_timeoff_profiles',
  Add: 'hr/api/store_timeoff_profiles',
  Update: 'hr/api/update_timeoff_profiles',
  Delete: 'hr/api/delete_timeoff_profiles',
};
export const bookedTimeOff = {
  List: 'hr/api/list_booked_timeoff',
  Add: 'hr/api/store_booked_timeoff',
  Update: 'hr/api/update_booked_timeoff',
  Delete: 'hr/api/delete_booked_timeoff',
};

export const hrReports = {
  matrics : "api/hrreport/hr_employeemetrix",
  employeeLengthService : "api/hrreport/hr_employeelengthofservice",
  employeeStatus :"api/hrreport/hr_employeestatus",
  empoloyeeStatusOverTime : "api/hrreport/hr_employeestatusovertime",
  employeeAgeGroup : "api/hrreport/hr_employeebyagegroup",
  employeeAbsenceOverReason : "api/hrreport/hr_absencebyreasonovertime",
  employeeByGender : "api/hrreport/hr_employeebygender",
  employeeHeadCountTeam :  "api/hrreport/hr_avgheadcountbyteam",
  employeeByLocation :  "api/hrreport/hr_avgheadcountbylocation",
  employeeByTimeOfData :  "api/hrreport/hr_employeetimeoffdata",
}

export const sendMailApi = 'api/mail/send';
export const sendExcelApi = 'api/mail/sendExcel';
export const overview = {
  metrics: 'api/dashboard/metrix',
  overTime: 'api/dashboard/utilisationOverTimeDashboard',
  frequency: 'api/dashboard/attendanceFrequency',
  attTeam: 'api/dashboard/dailyAttendanceByTeam',
  location: 'api/dashboard/attendanceByLocation',
  density: 'api/dashboard/utilisedbyDashboardDensity',
  hybrid: 'api/dashboard/hybridWorkingStatus',
  teamDashboard: 'api/dashboard/utilisationByTeamDashboard',
  daysofweek: 'api/dashboard/workspaceUtilisedbyDaysofWeek',
};
export const assets = {
  metrics: 'api/desk/metrix',
  perDay: 'api/desk/utilisationPerDay',
  overTime: 'api/desk/uilitzationByDay',
  frequency: 'api/desk/bookingFrequency',
  attendees: 'api/desk/bookingRoomByAttendees',
  location: 'api/desk/utilisationByLocation',
  density: 'api/desk/utilisedbyDensity',
  roomsByCapacity: 'api/desk/roomsByCapacityReport',
  team: 'api/desk/utilizationByTeam',
  daysofweek: 'api/desk/utilisedbyDaysofWeek',
};

export const utilizationbyemployee = 'api/desk/utilizationbyemployee';
export const utilizationbyroomdata = 'api/desk/utilizationbyroomdata';

export const hr_todayReporting_api = {
  metrics : 'api/hr/2/metrix',
  metrics_averagebookingduration : 'api/hr/2/averagebookingduration',
  dailyattendencebyteam : 'api/hr/2/dailyattendencebyteam',
  attendencebylocation : 'api/hr/2/attendencebylocation',
  todayattendencebylocation : 'api/hr/2/todayattendencebylocation',
  workspacedensitylocation : 'api/hr/2/workspacedensitylocation',
  attndcbyduration : 'api/hr/2/attendencebyduration',
  headcount_employment_status : 'api/hr/2/headcount_employment_status',
  deskbookingtype : 'api/hr/2/deskbookingtype',
  todaypeoplenotes : 'api/hr/2/todaypeoplenotes',
  todayeventnotes : 'api/hr/2/todayeventnotes',
  todaywhoinout : 'api/hr/2/hr_two_todaywhoinout',
  todayupcomingdates : 'api/hr/2/todayupcomingdates',
  attendance_by_user_type : 'api/hr/2/attendance_by_user_type',
};