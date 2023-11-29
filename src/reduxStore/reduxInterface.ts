export type RootReduxProps = {
  app: AppSliceProps;
  dashboard: DashboardSliceProps;
  language: LanguageSliceProps;
  quickBook: QuickBookReduxProps;
  hrSlice: hrSliceProps;
};

type HealthAndSafetyProps = {
  superAdminBaseURL: string | any;
  uploadPlusIconUrl: string;
  roleLanguageList: any;
};

export type HealthAndSafety = {
  healthAndSafety: HealthAndSafetyProps;
};
type AppSliceProps = {
  loading: any;
  userDetails: UserDetails | null | undefined|any;
  recentUrl: string;
  locationPaths: any[];
  sideBarWidth: string;
  companyLogo: string;
  bottomcompanyLogo: string;
  baseURL: string;
  sideBarData: any[];
  updateUserDetails: any[];
  floorRefs: boolean;
  saveChanges: boolean;
  newNotificationReceived: boolean;
  newNotificationAllRecord: NewNotificationAllRecord;
  floorType: string;
  floorEditDetail: FloorEditDetail;
  locationLevelList: any[];
  rememberMeDetails: RememberMe;
  AwsData: AwsData;
  token: string;
  orgDetail: OrgDetail;
  showMobileMenu: boolean;
  selectedQuickBookAsset: FloorEditDetail;
  termsPDFData:any[];
  tenantDetails: TenantDetail[];
  bookingAndNotificationCounts: BookingAndNotificationCounts;
  response: string;
  image: string;
  isResetAssest: boolean;
};

type RememberMe = {
  email: string;
  password: string;
};

interface BookingAndNotificationCounts {
  workspace_count: number;
  room_count: number;
  parking_count: number;
  request_count: string;
  overall_count: string;
}

export interface TenantDetail {
  tenant_id: number;
  tenant_name: string;
  server_location: number;
  tc_file: string;
  tc_created: string;
  tc_updated: string;
}

interface OrgDetail {
  org_name: string;
  random_no: string;
}

interface AwsData {
  domain: string;
  identityPoolId: string;
  identityPoolRegion: string;
  mandatorySignIn: string;
  redirectSignIn: string;
  redirectSignOut: string;
  region: string;
  responseType: string;
  signUpVerificationMethod: string;
  userPoolId: string;
  userPoolWebClientId: string;
  vapIdKey: string;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

type FloorEditDetail = {};

interface NewNotificationAllRecord {
  count: Count;
  notificationdetails: Notificationdetails;
}

interface Notificationdetails {
  Other_Notifications: OtherNotification[];
  Booking_Request: OtherNotification[];
}

interface OtherNotification {
  notification_type: number;
  type: string;
  date: string;
  starttime: string;
  endtime: string;
  bookstarttime: string;
  bookendtime: string;
  read_type: string;
  deskname: string;
  floorplantype: string;
  location: string;
  user_id: number;
  first_name: string;
  last_name: string;
  user: string;
  email: string;
  url: string;
  profile_image: string;
  team: string;
  booking_id: number;
  id: number;
  title: string;
  description: string;
  createdat: string;
  checkin_status: number;
  checkout_end_time: string;
  checkin_start_time: string;
  checkin_reminder: number;
  cancel_time: string;
  is_cancel: number;
  source: string;
}

interface Count {
  unreadcount: number;
  allcount: number;
  overallcount: number;
}

interface UserDetails {
  id: number;
  location_id: number;
  language_id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
  mobile_no: string;
  profile_photo: string;
  is_login: number;
  status: number;
  permission_group_id: string;
  start_working_hour: string;
  end_working_hour: string;
  vehicle_register_no: string;
  first_letter: string;
  base_url: string;
  user_bulk_sample: string;
  secret_key: string;
  location: Location[];
  timezone: string;
  timezone_id: string;
  alias_name: string;
  teams: Team[];
  roles: Role[];
  language: Language[];
  menuList: MenuList[];
  qr_checkin: number;
  company_logo: string;
}

interface MenuList {
  id: number;
  name: string;
  type: string;
  order_no: number;
}

interface Language {
  id: number;
  name: string;
  code: string;
}

interface Role {
  id: number;
  name: string;
  slug: string;
}

export type DashboardSliceProps = {
  dashboardselctedTeam?: any;
  dashboardFromDate: string;
  dashboardToDate: string;
  dashboardDayList: DashboardDayList;
  dashboardDayApiList: DashboardDayApiList;
  dashboardChildFunc: boolean;
  changeScheduleinDashboard: boolean;
  deleteAssetinDashboard: boolean;
  dashboardListUpdate: boolean;
};

interface DashboardDayApiList {
  book_data: Bookdatum3[];
}

interface Bookdatum3 {
  id: number;
  start_time: string;
  end_time: string;
  workspace_id: string;
  workspace_name: string;
  workspace_type: string;
  usage_type_id: number;
  workspace_description: string;
  is_cancel: number;
  checkin_status: number;
  checkin_start_time: string;
  checkout_end_time: string;
  cancel_time: string;
  check_in_require: number | string;
  booking_date: string;
  floorplan_type_id?: number;
  booking_status: number;
  registration: string;
  amenities: Amenity[];
  comments?: string;
  location_name: string;
  location_id: string;
  timezone: string;
  timezoneid: string;
  timezone_alias_name: string;
  host_userid: string;
  host_fname: string;
  host_lname: string;
  host_fullname: string;
  host_photo: string;
  participants_list: Participantslist[];
}
type DashboardDayList = {
  book_data: Bookdatum2[];
  common_data: any;
};

export interface Bookdatum2 {
  date: string;
  dateString: string;
  day: string;
  book_data: Bookdatum[];
}

interface Bookdatum {
  id: number;
  start_time: string;
  end_time: string;
  workspace_id: string;
  workspace_name: string;
  workspace_type: string;
  usage_type_id: number;
  workspace_description: string;
  is_cancel: number;
  checkin_status: number;
  checkin_start_time: string;
  checkout_end_time: string;
  cancel_time: string;
  check_in_require: number;
  booking_date: string;
  floorplan_type_id: number;
  booking_status: number;
  registration: string;
  amenities: Amenity[];
  comments: string;
  location_name: string;
  location_id: string;
  timezone: string;
  timezoneid: string;
  timezone_alias_name: string;
  host_userid: string;
  host_fname: string;
  host_lname: string;
  host_fullname: string;
  host_photo: string;
  participants_list: Participantslist[];
  start_timezone: string;
}

interface Participantslist {
  id: string;
  full_name: string;
  email: string;
}

interface Amenity {
  id: number;
  name: string;
}

interface LanguageSliceProps {
  selectedLanguage: string;
  languages: Languages;
}

interface Languages {
  Dashboard: Dashboard;
  Locate: Locate;
  Book: Book;
  Team: Team;
  Settings: Settings;
  Notifications: Notifications2;
  Log_in: Login;
  Dropdown_components: Dropdowncomponents;
  Company_Settings: CompanySettings;
  Location: Location;
  User_Management: UserManagement;
  Team_Management: TeamManagement;
  Asset_Management: AssetManagement;
  Floorplan_Management: FloorplanManagement;
  Common_Values: CommonValues;
  HTTP_Status_Codes: HTTPStatusCodes;
  Push_Notifications: PushNotifications;
}

interface PushNotifications {
  Activity: Notifications;
  Successfully_Booked: Notifications;
  Approved: Notifications;
  Rejected: Notifications;
  Edit: Notifications;
  Check_in: Notifications;
  more: Notifications;
  Check_in_required_for: Notifications;
  Outgoing: Notifications;
  Search: Notifications;
  Requested: Notifications;
  Old: Notifications;
  Date: Notifications;
  Start: Notifications;
  End: Notifications;
  Repeat: Notifications;
  None: Notifications;
  Cancel: Notifications;
  'Save changes': Notifications;
  Incoming_requests: Notifications;
  Outgoing_requests: Notifications;
  This_Week: Notifications;
  Manage: Notifications;
  Select_all: Notifications;
  Booking_approved: Notifications;
  Booking_rejected: Notifications;
  Expired: Notifications;
  Created_by: Notifications;
  Welcome_to: Notifications;
  Click_here_to_get_started: Notifications;
  Your_password_has_been_successfully_changed: Notifications;
  Cancelled: Notifications;
  Requested_by: Notifications;
  On_behalf_of: Notifications;
  No_new_requests: Notifications;
  Now: Notifications;
  You_have_successfully_checked_in_to: Notifications;
  Booking_modified: Notifications;
  Generic_notification: Notifications;
  This_month: Notifications;
  Available: Notifications;
  Description: Notifications;
  Cancel_booking: Notifications;
  Your_Booking_Requested_Successfully: Notifications;
  Your_Booking_Approved_Successfully: Notifications;
  You_Successfully_created_booking: Notifications;
  Check_in_Required_For: Notifications;
  Your_Booking_Modified_Successfully: Notifications;
  Your_Booking_Cancelled_Successfully: Notifications;
  You_have_Successfully_checked_out: Notifications;
  You_have_Successfully_checked_in_to: Notifications;
  Welcome_To: Notifications;
  Your_Booking_Rejected_Successfully: Notifications;
  'Your_Booking _Successfully': Notifications;
  View: Notifications;
  Requests: Notifications;
  Incoming: Notifications;
  Reject: Notifications;
  Approve: Notifications;
  Check_out_required_for: Notifications;
  Currently_there_is_no_notifications: Notifications;
}

interface HTTPStatusCodes {
  '100': Notifications;
  '101': Notifications;
  '102': Notifications;
  '103': Notifications;
  '200': Notifications;
  '201': Notifications;
  '202': Notifications;
  '203': Notifications;
  '204': Notifications;
  '205': Notifications;
  '206': Notifications;
  '207': Notifications;
  '208': Notifications;
  '226': Notifications;
  '300': Notifications;
  '301': Notifications;
  '302': Notifications;
  '303': Notifications;
  '304': Notifications;
  '305': Notifications;
  '306': Notifications;
  '307': Notifications;
  '308': Notifications;
  '400': Notifications;
  '401': Notifications;
  '402': Notifications;
  '403': Notifications;
  '404': Notifications;
  '405': Notifications;
  '406': Notifications;
  '407': Notifications;
  '408': Notifications;
  '409': Notifications;
  '410': Notifications;
  '411': Notifications;
  '412': Notifications;
  '413': Notifications;
  '414': Notifications;
  '415': Notifications;
  '416': Notifications;
  '417': Notifications;
  '418': Notifications;
  '421': Notifications;
  '422': Notifications;
  '423': Notifications;
  '424': Notifications;
  '425': Notifications;
  '426': Notifications;
  '428': Notifications;
  '429': Notifications;
  '431': Notifications;
  '451': Notifications;
  '500': Notifications;
  '501': Notifications;
  '502': Notifications;
  '503': Notifications;
  '504': Notifications;
  '505': Notifications;
  '506': Notifications;
  '507': Notifications;
  '508': Notifications;
  '510': Notifications;
  '511': Notifications;
}

interface CommonValues {
  Dashboard: Notifications;
  Locate: Notifications;
  Book: Notifications;
  Team: Notifications;
  Company_settings: Notifications;
  Locations: Notifications;
  User_management: Notifications;
  Team_management: Notifications;
  Asset_management: Notifications;
  Super_Admin_functions: Notifications;
  Floorplan_management: Notifications;
  Find: Notifications;
  Filter: Notifications;
  Quick_book: Notifications;
  Edit: Notifications;
  Yes: Notifications;
  Save: Notifications;
  Cancel: Notifications;
  name: Notifications;
  Available_languages: Notifications;
  Select_which_languages_are_available_to_your_users: Notifications;
  English: Notifications;
  Chinese: Notifications;
  Portuguese: Notifications;
  Arabic: Notifications;
  Spanish: Notifications;
  Selected: Notifications;
  Selecte: Notifications;
  Save_changes: Notifications;
  Fire_warden: Notifications;
  First_aider: Notifications;
  In_office: Notifications;
  Remote: Notifications;
  Unavailable: Notifications;
  Available: Notifications;
  Repeat: Notifications;
  None: Notifications;
  Location: Notifications;
  No_booking: Notifications;
  Language_description: Notifications;
  Notification_setting_description: Notifications;
  Check_in_alerts_description: Notifications;
  Booking_change_alerts_description: Notifications;
  Please_select_time_zone: Notifications;
  Please_select_language: Notifications;
  Please_select_currency: Notifications;
  Please_select_weekstart: Notifications;
  Search_member: Notifications;
  Remove_location_description: Notifications;
  No_Team: Notifications;
  No: Notifications;
  Search_location: Notifications;
  Delete_users: Notifications;
  The_users: Notifications;
  Will_be_added_to_the_teams: Notifications;
  Confirm: Notifications;
  Create_a_new_team: Notifications;
  Active_only: Notifications;
  Edit_team: Notifications;
  Create_team: Notifications;
  Team_name: Notifications;
  'A_team_can_not_be_deleted_if_it_has_any_members_or_assets_assigned_to_it.': Notifications;
  Remove_team: Notifications;
  No_records: Notifications;
  place: Notifications;
  Done: Notifications;
  Name: Notifications;
  Create_a_new_floorplan: Notifications;
  All_locations: Notifications;
  Advanced_options: Notifications;
  Duplicate_floor: Notifications;
  This_will_copy_the_building_including_all_features: Notifications;
  Floorplan_to_copy: Notifications;
  New_location: Notifications;
  Choose_what_to_copy: Notifications;
  Floorplan_text: Notifications;
  Providing_the_required_number_of_assets_are_available_at_this_location_in_Asset_management: Notifications;
  Duplicate: Notifications;
  Currently_there_is_no_desk: Notifications;
  No_Screen_match: Notifications;
  Assign_to_Teams: Notifications;
  Add_workspace: Notifications;
  Edit_workspace: Notifications;
  Remove_asset: Notifications;
  Minutes_after_the_scheduled_start_of_a_booking: Notifications;
  Add_room: Notifications;
  Edit_room: Notifications;
  This_will_impact_both_the_mobile_and_desktop_apps_As_well_as_all_notifications: Notifications;
  We_may_still_send_you_important_notifications_about_your_account_outside_of_your_notification_settings: Notifications;
  Notifications_to_remind_you_when_an_upcoming_check_in_is_required_You_will_also_be_notified_once_you_have_been_cheked_out: Notifications;
  You_will_be_notified_when_a_booking_has_been_created_on_your_behalf_modified_accepted_or_rejected: Notifications;
  Location_can_only_be_removed_if_ther_ere_no_dependant_children_and_there_are_no_bookings_for_assets_beloning_for_this_location_you_can_make_a_location_inactive_instead: Notifications;
  This_will_effect_all_children_under_this_location: Notifications;
  Inactive: Notifications;
  Opening_Hours: Notifications;
  Room_configuration: Notifications;
  Parking_configuration: Notifications;
  Create_a_new_room: Notifications;
  Create_a_new_parking: Notifications;
  Add_parking: Notifications;
  Edit_parking: Notifications;
  About_Admins_Roles_and_Responsibilities: Notifications;
  Location_Type: Notifications;
  Region_name: Notifications;
  find: Notifications;
  No_Records: Notifications;
  Hi: Notifications;
  Remove_location: Notifications;
  Sample_User: Notifications;
  Create_Team: Notifications;
  Select_the_type_of_floorplan_you_are_creating: Notifications;
  Capacity_limit: Notifications;
  unlimited: Notifications;
  Confirm_Delete: Notifications;
  'Are_you_sure_you_want_to_delete_this_company_document?': Notifications;
  Create_a_new_Zone: Notifications;
  Contact_our_team_to_request_new_shapes: Notifications;
  Workspace_management: Notifications;
  Remove_selected: Notifications;
  Madatory_to_assign_Workspace_in_Assetmanagement: Notifications;
  tenant_settings: Notifications;
  global_asset_types: Notifications;
  global_environment_settings: Notifications;
  global_hs_roles: Notifications;
  user_settings: Notifications;
  notifications: Notifications;
  Placed: Notifications;
  Workplace_shape: Notifications;
  Room_shape: Notifications;
  Parking_shape: Notifications;
  See_all: Notifications;
  checked: Notifications;
  checked_out: Notifications;
  Minutes_after_the_scheduled_end_of_a_booking: Notifications;
  Parking: Notifications;
  Workspace: Notifications;
  Capacity: Notifications;
  Booking_Rejected: Notifications;
  Your_in_remote: Notifications;
  Search: Notifications;
  Apply: Notifications;
  Choose_Rooms: Notifications;
  Select: Notifications;
  Please_add_you_subject: Notifications;
  Choose_Parking: Notifications;
  Unable_to_book_as_the_selected_desk_is_unavailable_at_the_chosen_date_time: Notifications;
  to: Notifications;
  Choose_WorkSpace: Notifications;
  Update: Notifications;
  Unknown: Notifications;
  Open_in_Floorplan_Editor: Notifications;
  Views: Notifications;
  Please_select_a_team_or_multiple_teams: Notifications;
  Active_Directory: Notifications;
  Navigation: Notifications;
  Pan: Notifications;
  Zoom: Notifications;
  Selection: Notifications;
  Drag: Notifications;
  Undo: Notifications;
  Clone: Notifications;
  Copy: Notifications;
  Paste: Notifications;
  Redo: Notifications;
  Grid: Notifications;
  Snap: Notifications;
  Show_hide: Notifications;
  Scale: Notifications;
  Image: Notifications;
  Import: Notifications;
  Lock_unlock: Notifications;
  Remove: Notifications;
  Alignment: Notifications;
  Spacing: Notifications;
  Vertical: Notifications;
  Horizontal: Notifications;
  Single_Desk: Notifications;
  Removed_selected: Notifications;
  Cshape_Wall: Notifications;
  Lshape_Wall: Notifications;
  under: Notifications;
  Fancy_Desk: Notifications;
  Circle_Desk: Notifications;
  Regular_L: Notifications;
  Regular_C: Notifications;
  Rooms: Notifications;
  Square_Room: Notifications;
  Wall: Notifications;
  Partition: Notifications;
  Location_settings: Notifications;
  General_settings: Notifications;
  User_settings: Notifications;
  Team_settings: Notifications;
  Asset_settings: Notifications;
  Floorplan_settings: Notifications;
  Plan: Notifications;
  Wellbeing: Notifications;
  Reports: Notifications;
  Billing: Notifications;
  tenant_admin_portal: Notifications;
}

interface FloorplanManagement {
  Assets: Notifications;
  Desk_shape: Notifications;
  Regular: Notifications;
  There_are_no_assets_available_to_place: Notifications;
  Go_to_workspace_management_to_add_workspaces_to_this_location: Notifications;
  Unplaced: Notifications;
  Building: Notifications;
  Walls_deviders: Notifications;
  Square_room: Notifications;
  C_shaped_room: Notifications;
  L_shaped_room: Notifications;
  Wall: Notifications;
  Partition: Notifications;
  Stairs_Lifts: Notifications;
  Stairs: Notifications;
  Lift: Notifications;
  Doors_Windows: Notifications;
  Gap: Notifications;
  doorway: Notifications;
  Window: Notifications;
  Contact_our_team_to_add_assets: Notifications;
  Zones: Notifications;
  Create_a_new_zone: Notifications;
  Zone_name: Notifications;
  Draw: Notifications;
  edit: Notifications;
  Zone_capacity_limit: Notifications;
  Select: Notifications;
  Settings: Notifications;
  Floorplan_name: Notifications;
  Floorplan_capacity_limit: Notifications;
  Cancel: Notifications;
  Save_changes: Notifications;
}

interface AssetManagement {
  Find: Notifications;
  Workspace_configuration: Notifications;
  These_settings_control_how_workspaces_behave_accross_the_platform: Notifications;
  Allow_bookings_to_be_made: Notifications;
  days_in_advance: Notifications;
  Leave_blank_for_unlimited: Notifications;
  A_user_may_book_upto: Notifications;
  times_in_one_month: Notifications;
  Requires_Check_in: Notifications;
  Yes: Notifications;
  No: Notifications;
  Send_check_in_reminders: Notifications;
  minutes_before_the_scheduled_start_of_a_booking: Notifications;
  Leave_blank_for_no_reminders: Notifications;
  Cancel_a_booking_if_the_user_has_not_checked_in: Notifications;
  Leave_blank_for_no_auto_cancellation: Notifications;
  Allow_users_to_check_in_up_to: Notifications;
  Allow_users_to_check_out_up_to: Notifications;
  Available_tags: Notifications;
  Code: Notifications;
  Available: Notifications;
  Available_to_request: Notifications;
  Unavailable: Notifications;
  Reason: Notifications;
  From: Notifications;
  To: Notifications;
  Tags: Notifications;
  Unavailable_reason: Notifications;
  Location: Notifications;
  Clone: Notifications;
  Bulk_edit: Notifications;
  Delete_Asset: Notifications;
  Make_inactive: Notifications;
  All_location: Notifications;
  Create_a_new_workspace: Notifications;
  Sort_by: Notifications;
  Meeting_room_manager_is_able_to_cancel: Notifications;
  Default_room_available_hours: Notifications;
  Bulk: Notifications;
  These_settings_control_how_rooms_behave_accross_the_platform: Notifications;
  These_settings_control_how_spaces_behave_accross_the_platform: Notifications;
}

interface TeamManagement {
  Edit: Notifications;
  Yes: Notifications;
  Find: Notifications;
  Filter: Notifications;
  All_teams: Notifications;
  Name: Notifications;
  Members: Notifications;
  Active: Notifications;
  Assigned_workspaces: Notifications;
  All_workspaces_in: Notifications;
  Assigned_rooms: Notifications;
  All_rooms_in: Notifications;
  Assigned_parking: Notifications;
  Space: Notifications;
  Big_Zone: Notifications;
  Add_users: Notifications;
  Add: Notifications;
  Remove: Notifications;
  Desk: Notifications;
}

interface UserManagement {
  Find: Notifications;
  Bulk_select: Notifications;
  All_users: Notifications;
  Users: Notifications;
  Name: Notifications;
  Email: Notifications;
  Primary_team: Notifications;
  Active: Notifications;
  Active_only: Notifications;
  Create_a_new_user: Notifications;
  Yes: Notifications;
  Edit: Notifications;
  Edit_user: Notifications;
  Save_changes: Notifications;
  Cancel: Notifications;
  Personal_details: Notifications;
  Work_settings: Notifications;
  Permission_groups: Notifications;
  Team: Notifications;
  s: Notifications;
  Health_safety: Notifications;
  Location_can_only_be_removed_if_Active_Directory_is_not_turned_on: Notifications;
  Remove_user: Notifications;
  First_name: Notifications;
  Last_name: Notifications;
  Display_name: Notifications;
  Default_location: Notifications;
  Administrator: Notifications;
  Facility_Manager: Notifications;
  Location_Manager: Notifications;
  Team_Manager: Notifications;
  User: Notifications;
  Create_user: Notifications;
  Single: Notifications;
  Bulk: Notifications;
  Download_CSV_template: Notifications;
  Upload_template: Notifications;
  No_template_uploaded: Notifications;
  Selected: Notifications;
  Deselect: Notifications;
  Add_to_team: Notifications;
  Remove_from_team: Notifications;
  Make_active: Notifications;
  Make_inactive: Notifications;
  Delete: Notifications;
  user: Notifications;
  Select_all: Notifications;
  A_user_can_only_be_removed_if_Active_Directory_is_not_turned_on: Notifications;
}

interface Location {
  Find: Notifications;
  Yes: Notifications;
  Edit: Notifications;
  Locations: Notifications;
  Global: Notifications;
  Name: Notifications;
  Description: Notifications;
  Active: Notifications;
  Create_a_new_location: Notifications;
  Active_only: Notifications;
  Edit_location: Notifications;
  Save_changes: Notifications;
  Cancel: Notifications;
  Location_name: Notifications;
  Parent_location: Notifications;
  Managers: Notifications;
  Remove: Notifications;
  Remove_location: Notifications;
  Save: Notifications;
  Create_location: Notifications;
  Default_language: Notifications;
  Currency: Notifications;
  Week_start: Notifications;
  Default_working_week: Notifications;
  Monday: Notifications;
  Tuesday: Notifications;
  Wednesday: Notifications;
  Thursday: Notifications;
  Friday: Notifications;
  Saturday: Notifications;
  Sunday: Notifications;
  Timezone: Notifications;
  Hours: Notifications;
  Closed: Notifications;
  Floor: Notifications;
  Floorplan: Notifications;
  Available: Notifications;
  View: Notifications;
  Users: Notifications;
  Total: Notifications;
  Assets: Notifications;
  Parking: Notifications;
  Workspaces: Notifications;
  Rooms: Notifications;
  Select_location_level: Notifications;
  Region: Notifications;
  Country: Notifications;
  Country_name: Notifications;
  State: Notifications;
  City_name: Notifications;
  City: Notifications;
  Suburb: Notifications;
  Suburb_name: Notifications;
  Street: Notifications;
  Street_name: Notifications;
  Floor_name: Notifications;
  Confirm_and_proceed: Notifications;
  Confirm_change: Notifications;
  Building_name: Notifications;
  Location_type: Notifications;
  Floor_overview: Notifications;
  Description_for_remove_location: Notifications;
  Description_for_confirm_delete_location: Notifications;
  Building: Notifications;
  Workspace: Notifications;
  Room: Notifications;
}

interface CompanySettings {
  Quick_book: Notifications;
  Company_logo: Notifications;
  Upload_image: Notifications;
  under: Notifications;
  mb: Notifications;
  Notification_type_for_all_new_users: Notifications;
  Email: Notifications;
  Push: Notifications;
  QR_check_in_enforcement: Notifications;
  Available_languages: Notifications;
  Select_which_languages_are_available_to_your_users: Notifications;
  Settings: Notifications;
  log_out: Notifications;
  Complete: Notifications;
  Edit: Notifications;
  The_maximum_number_of_days_in_a_month_each_user_can_work_remotely: Notifications;
  This_will_overwrite_the_setting_for_all_users: Notifications;
  Add_and_edit_your: Notifications;
  Password_management: Notifications;
  Passwords_reset_every: Notifications;
  Months: Notifications;
  Leave_blank_for_unlimited: Notifications;
  Minimum_number_of_characters_required_for_a_password: Notifications;
  Allow_password_repeats: Notifications;
  Require_special_characters: Notifications;
  Yes: Notifications;
  No: Notifications;
}

interface Dropdowncomponents {
  Search: Notifications;
  Workspaces: Notifications;
  Rooms: Notifications;
  Parking: Notifications;
  Type: Notifications;
  Annual_leave: Notifications;
  Sick_leave: Notifications;
  Family: Notifications;
  Compassionate_leave: Notifications;
  Medical_appointment: Notifications;
  Training: Notifications;
  Other: Notifications;
  Repeat: Notifications;
  None: Notifications;
  Daily: Notifications;
  Every_weekday: Notifications;
  Mon_Fri: Notifications;
  Weekly: Notifications;
  Monthly: Notifications;
  Yearly: Notifications;
  List: Notifications;
  Day: Notifications;
  Week: Notifications;
  Working_week: Notifications;
  Available_tags: Notifications;
  Tags: Notifications;
  Assign_to_teams: Notifications;
  Remove: Notifications;
  Managers: Notifications;
  Assigned_workspaces: Notifications;
  Assigned_rooms: Notifications;
  Assigned_parking: Notifications;
  Add: Notifications;
}

interface Login {
  Email_address: Notifications;
  Password: Notifications;
  Sign_in: Notifications;
  Forgot_your_password: Notifications;
  Or_sign_in_with: Notifications;
  Submit_password_reset: Notifications;
  Go_back_to_sign_in: Notifications;
  Terms_of_service: Notifications;
  Last_updated: Notifications;
  Accept: Notifications;
  Decline: Notifications;
}

interface Notifications2 {
  Generic_notification: Notifications;
  Generic_notification_body: Notifications;
  Now: Notifications;
  Approved: Notifications;
  Edit: Notifications;
  Requested_by: Notifications;
  Reject: Notifications;
  On_behalf_of: Notifications;
  Check_in_required_for: Notifications;
  Check_in: Notifications;
  Outgoing_requests: Notifications;
  no_new_requests: Notifications;
  Click_here_to_get_started: Notifications;
  Your_password_has_been_successfully_changed: Notifications;
  Requested: Notifications;
  You_have_successfully_checked_in_to: Notifications;
  Expired: Notifications;
  Cancelled: Notifications;
  Booking_modified: Notifications;
  Created_by: Notifications;
  Modified_by: Notifications;
  Team_admin: Notifications;
  Activity: Notifications;
  more: Notifications;
  This_week: Notifications;
  This_month: Notifications;
  Search: Notifications;
  Outgoing: Notifications;
  Old: Notifications;
  Date: Notifications;
  Start: Notifications;
  End: Notifications;
  Repeat: Notifications;
  None: Notifications;
  Cancel: Notifications;
  Save_changes: Notifications;
  Cancel_booking: Notifications;
  Incoming_requests: Notifications;
  Manage: Notifications;
  Select_all: Notifications;
}

interface Settings {
  Profile: Notifications;
  Organisation: Notifications;
  Language: Notifications;
  Notifications: Notifications;
  Security: Notifications;
  Support: Notifications;
  Edit: Notifications;
  Checked_in: Notifications;
  Team: Notifications;
  primary: Notifications;
  View_team: Notifications;
  Default_working_hours: Notifications;
  Start: Notifications;
  Back_office: Notifications;
  End: Notifications;
  About: Notifications;
  Locations: Notifications;
  Contact: Notifications;
  Email: Notifications;
  Teams: Notifications;
  Phone: Notifications;
  Upcoming_bookings: Notifications;
  View_older: Notifications;
  Change_organisation: Notifications;
  Active: Notifications;
  Change: Notifications;
  English: Notifications;
  Danish: Notifications;
  German: Notifications;
  Japanese: Notifications;
  Italian: Notifications;
  Hindi: Notifications;
  Notification_settings: Notifications;
  Check_in_alerts: Notifications;
  Booking_change_alerts: Notifications;
  Push: Notifications;
  Reset_password: Notifications;
  Help_troubleshooting: Notifications;
  Whats_new: Notifications;
  Feedback: Notifications;
  Version: Notifications;
  Save: Notifications;
  Enter_your_email_and_well_send_you_a_link_to_reset_your_password: Notifications;
  Email_sent: Notifications;
  Check_your_email_and_open_the_link_we_sent_you_to_continue: Notifications;
  New_password: Notifications;
  Repeat_new_password: Notifications;
  Login_now: Notifications;
  Available_asset: Notifications;
  This_will_impact_both_the_mobile_and_desktop_apps_As_well_as_all_notifications: Notifications;
  Default_assets: Notifications;
  Workspaces: Notifications;
  Parking: Notifications;
  Room: Notifications;
  Vehicle_Registration: Notifications;
}

interface Team {
  Team: Notifications;
  default: Notifications;
  Today: Notifications;
  Find: Notifications;
  Sort_by: Notifications;
  Name: Notifications;
  Status: Notifications;
  Workspace: Notifications;
  if_applicable: Notifications;
  check_in: Notifications;
  Check_out: Notifications;
  Working_remotely: Notifications;
  Summary: Notifications;
  Team_manager: Notifications;
  View_profile: Notifications;
  Out_of_office: Notifications;
  Return_to_team: Notifications;
  Checked_in: Notifications;
  Back_office: Notifications;
  View_team: Notifications;
  Default_working_hours: Notifications;
  Start: Notifications;
  End: Notifications;
  About: Notifications;
  Location: Notifications;
  Contact: Notifications;
  Email: Notifications;
  Teams: Notifications;
  Phone: Notifications;
  Fire_warden: Notifications;
  First_aider: Notifications;
}

interface Book {
  Booked_by_me: Notifications;
  Booked: Notifications;
  Available: Notifications;
  Unavailable: Notifications;
  By_request: Notifications;
  Description: Notifications;
  Month: Notifications;
  Day: Notifications;
  Team: Notifications;
  Workspaces: Notifications;
  View_by: Notifications;
  Today: Notifications;
  Booked_by: Notifications;
  Pending_for: Notifications;
  In_office: Notifications;
  Out_of_office: Notifications;
  Working_remotely: Notifications;
  Users_schedule_has_not_been_sent: Notifications;
  Find: Notifications;
  Total_available_to_book: Notifications;
  Admin_functions: Notifications;
  Unknown: Notifications;
  Filter: Notifications;
  Capacity: Notifications;
  Rooms: Notifications;
  Participants: Notifications;
  Subject: Notifications;
  Cancel: Notifications;
  Book: Notifications;
}

interface Locate {
  Filter: Notifications;
  Search: Notifications;
  Workspaces: Notifications;
  Rooms: Notifications;
  Cancel: Notifications;
  Apply: Notifications;
  Description: Notifications;
  Capacity: Notifications;
  Find: Notifications;
  Today: Notifications;
  Floor: Notifications;
  Start: Notifications;
  End: Notifications;
  Booked_by_me: Notifications;
  Booked: Notifications;
  Available: Notifications;
  Unavailable: Notifications;
  By_request: Notifications;
  Team: Notifications;
  Date: Notifications;
  Book: Notifications;
  Save_changes: Notifications;
  Delete_booking: Notifications;
  Teams: Notifications;
  Google: Notifications;
  Zoom: Notifications;
  Continue: Notifications;
  Participants: Notifications;
  Comments: Notifications;
  Subject: Notifications;
  Optional: Notifications;
  Floorplan: Notifications;
  View_profile: Notifications;
  Check_in: Notifications;
  Check_out: Notifications;
  Contact: Notifications;
  Email: Notifications;
  Phone: Notifications;
  Back: Notifications;
  Book_nearby: Notifications;
  Settings: Notifications;
  Log_out: Notifications;
  Repeat: Notifications;
  Filtered: Notifications;
  Unfiltered: Notifications;
  Spaces: Notifications;
  Booking_for_yourself: Notifications;
}

interface Dashboard {
  Notifications: Notifications;
  Quick_Book: Notifications;
  Check_in_required: Notifications;
  Edit: Notifications;
  Check_in: Notifications;
  see_all_notifications_and_requests: Notifications;
  Today: Notifications;
  Rooms: Notifications;
  Parking: Notifications;
  Workspaces: Notifications;
  Change_your_schedule: Notifications;
  Youre_in_the_office: Notifications;
  Youre_out_of_office: Notifications;
  Your_team_today: Notifications;
  View_detail: Notifications;
  Working_from: Notifications;
  Floor: Notifications;
  Working_remotely: Notifications;
  Out_of_office: Notifications;
  Settings: Notifications;
  Log_out: Notifications;
  Date: Notifications;
  Start: Notifications;
  End: Notifications;
  Change: Notifications;
  Location: Notifications;
  Monitor: Notifications;
  Standing_desk: Notifications;
  Adjustable_height: Notifications;
  Available: Notifications;
  Cancel: Notifications;
  Book: Notifications;
  Unavailable: Notifications;
  Description: Notifications;
  Laptop_dock: Notifications;
  Save_changes: Notifications;
  Cancel_booking: Notifications;
  Next: Notifications;
  Participants: Notifications;
  optional: Notifications;
  Subject: Notifications;
  Comments: Notifications;
  Teams: Notifications;
  Google: Notifications;
  Zoom: Notifications;
  Back: Notifications;
  Registration: Notifications;
  Weekly_schedule: Notifications;
  Chose_a_workspace: Notifications;
  Past: Notifications;
  Checked_in: Notifications;
  Future: Notifications;
  Change_your_weekly_schedule: Notifications;
}

interface Notifications {
  name: string;
  placeholder: string;
  validation1: string;
  validation2: string;
  validation3: string;
}

export type QuickBookReduxProps = {
  quickbookFromDate: string;
  quickbookToDate: string;
  quickBookState: string;
  quickBookSelect: number;
  scheduleBook: boolean;
  editQuickOpen: EditQuickOpen;
  planePopup: boolean;
  canvasImage: string;
  quickBookAssetId: string;
  defaultweek?: any;
};

export type EditQuickOpen = {
  openState: boolean;
};
export type hrSliceProps = {
  preferenceDetails: Array<any>;
};
