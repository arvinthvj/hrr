import { Bookdatum2 } from '../../reduxStore/reduxInterface';

export type ProfileSettingAboutProps = {
  status: boolean;
  data: [] | string | any;
  count?: any;
};

export type ProfileSettingAssetsProps = {
  status: boolean;
  data: [] | string | any;
  searchValue: string;
  searchStatus: boolean;
  workspaceFocusd?: boolean;
  parkingFocusd?: boolean;
  RoomFocusd?: boolean;
};

export type UpdateDataProps = {
  display_name: string | ProfileSettingAboutProps[];
  location_id: number | string | ProfileSettingAboutProps[];
  about: string | ProfileSettingAboutProps[];
  mobile_no: string | number | ProfileSettingAboutProps[];
  start_working_hour: string;
  end_working_hour: string;
};

export type LocationItemProps = {
  name: string;
  value: string | number;
};

export type AssetListProps = {
  label: string;
  value: string | number;
};

export type AssetListMapItemProps = {
  name: string;
  value: number;
  location_name: string;
  label: string;
};

export type DashboardCardProps = {
  overall_count: string | number;
  parking_count: string | number;
  request_count: string | number;
  room_count: string | number;
  workspace_count: string | number;
};

export type BookDetailsProps = {
  id: number;
  name: string;
  icon_images: string | null | undefined;
};

export type DayDetailsProps = {
  handleChangeBooking?: CallableFunction;
  selectedAssets: SelectTabProps;
  callDayDetails?: string;
  key?: number;
  details: Bookdatum2;
  selectTap?: SelectTabProps;
  setMount?: CallableFunction;
};

export type YourTeamDetailsProps = {
  setUserTableList: CallableFunction;
  // handledetailPage: CallableFunction,
  setViewData: CallableFunction;
  setPageChange: CallableFunction;
  pageChange: boolean;
};
export type FloorDetailsProps = {
  profilelist: any[] | undefined;
  type: string;
  handledetailPage: CallableFunction;
  baseUrl: string;
  locatelabel: number | string | null;
  index: any;
};

export type TeamDetailsProps = {
  setViewData?: any;
  handledetailPage: CallableFunction;
  setUserTableList: CallableFunction;
};

export type SelectDropDownProps = {
  suffixImage?: string;
  width?: string | number;
  selectedValue?: any;
  minWidth?: string | number;
  status?: number | string | boolean;
  options: Option[] | any;
  height: string;
  placeholder?: string;
  Value?: any;
  backgroundColor?: string;
  padding?: string;
  onChange: CallableFunction;
  isDisabled?: boolean;
  CustomOption?: any;
  setHeight?: any;
  errClass?: any;
  disabledIcon?: boolean;
};

type Option = {
  value: number;
  label: string;
};

export type TeamProps = TeamItemProps[];

export type TeamItemProps = {
  id: number;
  name: string;
  primary_team: number;
};

export type SelectTabProps = Array<number | null>;

export type ListDataProps = {
  book_data: BookDaum[];
};
export type BookDaumListProps = BookDaum[];

export type BookDaum = {
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
  check_in_require: any;
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
  participants_list: ParticipantsList[];
};

export type Amenity = {
  id: number;
  name: string;
};

export type ParticipantsList = {
  id: string;
  full_name: string;
  email: string;
};

export type GetDateListProps = DateProps[];

export type DateProps = {
  date: string;
  dateString: string;
  day: string;
  book_data: ListDataProps;
};

export type UserTableListprops = {
  location_details: LocationDetails;
  team_managers: TeamManager[];
  user_details: UserDetails;
};

export type LocationDetails = {
  building_name: string;
  street_name: string;
};

export type TeamManager = {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
};

export type UserDetails = {
  in_office_count: number;
  working_remotely: any[];
  floors: any[];
  out_of_office: any[];
  unknown: Unknown[];
};

export type Unknown = {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  full_name: string;
  profile_photo: string;
  floor_id: string;
  floor_name: string;
  status: string;
  type: string;
};

export type DayDetailsFinalProps = {
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
  check_in_require: string | number;
  booking_date: string;
  floorplan_type_id?: any;
  booking_status: number;
  registration: string;
  amenities: any[];
  comments?: any;
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
  participants_list: any[];
  qr_checkin: number;
  start_timezone: string;
  end_timezone: string;
  checkin_time: string | null;
  checkout_time: string | null;
  utc_start_time: string | null;
  utc_end_time: string | null;
  asset_requested_on: string | null;
  user_booking_date: string | null;
};

export type FloorProfileImgItemProps = {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  full_name: string;
  profile_photo: string;
  floor_id: number;
  floor_name: string;
  status: string;
  type: string;
  building_name: string;
};

export type ResponseSummaryProps = {
  location_details: Locationdetails;
  team_managers: Teammanager[];
  user_details: Userdetails;
  base_url?: any;
};

type Userdetails = {
  in_office_count: number;
  working_remotely: Workingremotely[];
  floors: Floors | any;
  out_of_office: any[];
  unknown: Workingremotely[];
};

type Floors = {
  'Harish Building': HarishBuilding;
};

type HarishBuilding = {
  'Floor-1': Floor1[];
};

type Floor1 = {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  full_name: string;
  profile_photo: string;
  floor_id: number;
  floor_name: string;
  status: string;
  type: string;
  building_name: string;
};

type Workingremotely = {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  full_name: string;
  profile_photo: string;
  floor_id: string;
  floor_name: string;
  status: string;
  type: string;
  building_name: string;
};

type Teammanager = {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
};

type Locationdetails = {
  building_name: string;
  street_name: string;
};

export type ViewProfileProps = {
  viewData: ViewDataProps | null;
  setPageChange: CallableFunction;
  userTableList?: UserTableListprops | null;
};

export type ViewDataProps = {
  type: string;
  values: Values;
};

export type Values = {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  full_name: string;
  profile_photo: string;
  floor_id: number;
  floor_name: string;
  status: string;
  type: string;
  building_name: string;
};

export type ProfileProps = {
  id: number;
  display_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  mobile_no: any;
  base_url: string;
  profile_photo: string;
  start_working_hour: string;
  end_working_hour: string;
  about: any;
  location_id: LocationId[];
  teams: Team[];
  health_safety: HealthSafety[];
};

export type LocationId = {
  id: number;
  name: string;
  working_days: WorkingDays;
};

export type WorkingDays = {
  id: string[];
};

export type Team = {
  id: number;
  name: string;
  primary_team?: number;
};

export type HealthSafety = {
  id: number;
  name: string;
  health_safety_icons: string;
};

export type S3BucketProps = {
  imageFile?: string;
  type?: string;
  FilePath?: string;
  userDetail?: UserDetails;
  id?: string;
  refs?: string;
};

export type LoginProps = {
  emailId?: string;
  email?: string;
  password: string;
  tenant_name?: string;
};

export type LoginSuccessDataProps = {
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
};

export type Location = {
  id: number;
  name: string;
  working_days: WorkingDays;
};

export type Role = {
  id: number;
  name: string;
  slug: string;
};

export type Language = {
  id: number;
  name: string;
  code: string;
};

export type MenuList = {
  id: number;
  name: string;
  type: string;
  order_no: number;
};

export type ForgotPasswordProps = {
  emailId: string;
  password?: string;
};

export type ResetPasswordProps = {
  Password: string;
  confirmPassword: string;
};

export type CreateAccountErrorProps = {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  country: string;
  organisation_drop_down: string;
  country_code: string;
  organisation?: string;
  organisation_count?: string;
  organisation_optional?: string;
};

export type CreateAccountFormProps = {
  first_name: string;
  last_name: string;
  tenant_email: string;
  mobile_no: string;
  country: string;
  organisation_drop_down?: string;
  country_code: string;
  organisation: string;
  organisation_count: string;
  organisation_optional: string;
};

export type CountrySelectProps = {
  countryCode: string;
  value: string;
  label: string;
};

export type CodeSelectItemProps = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  onChange: CallableFunction;

  options: CountrySelectProps[] | null;
  value: string | undefined;
  className?: string | undefined;
  placeholder: string | undefined;
};

export type CodeSelectProps = {
  onChange: CallableFunction;
  onBlur?: CallableFunction;
  options: CodeSelectItemProps[] | null;
  value: string | undefined;
  className?: string | undefined;
  placeholder: string | undefined;
};

export type TrialModalProps = {
  show: boolean;
  confirm: CallableFunction;
  label: string | undefined;
};

export type ApiResponseProps = {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
};

export type Data = {
  code: number;
  message: string;
  data: string;
};

export type Headers = {
  'cache-control': string;
  'content-type': string;
};

export type Config = {
  transitional: Transitional;
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  headers: Headers2;
  baseURL: string;
  method: string;
  url: string;
  data: Data2;
};

export type Transitional = {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
};

export type Headers2 = {
  Accept: string;
  'Access-Control-Allow-Origin': string;
  'Access-Control-Allow-Credentials': boolean;
  Authorization: string;
};

export type Data2 = {};

export type Request = {};

export type SelectFieldProps = {
  suffixImage?: string;
  height?: string | number;
  width?: string | number;
  options: any;
  value: any;
  onChangeValue: CallableFunction;
  placeholder?: string | number | null | undefined;
  bgColor?: string;
};
export type InputElementProps = {
  Label?: string;
  name?: string;
  placeholder?: string;
  Optional?: string;
  type?: string;
  disabled?: boolean;
  defaultFunc?: boolean;
  trigger?: any;
  onChange?: any;
  onFocus?: any;
  value?: string;
  maxLength?: number;
  accessType?: string;
  errClass?: any;
  module?: string;
  langName?: string;
};
export type TableComponentProps = {
  dataSource?: any;
  columns?: any;
  create?: any;
  multiplecreate?: any;
  handleAdd?: any;
  loading?: any;
  pageSize?: any;
  currentPage?: any;
  totalPage?: any;
  handlePageChange?: any;
  location?: any;
  showActiveInActive?: any;
  userPermissionCheck?: any;
  className?: any;
};

export type LocationSelectorDropDownProps = {
  locationId: any;
  floorId: any;
  locationNames: any;
  setDefaultBuliding: any;
  setDefaultFloor: any;
  handleLocationChange: any;
  setLocationDropdown: any;
  setTimeZone: any;
  setAllLocation?: any;
  setLocation?: any;
  isHrModule?: any;
};
