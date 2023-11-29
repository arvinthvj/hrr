import moment from 'moment';
import { store } from '../reduxStore';
import { logout, setLoginTokenExpires } from '../reduxStore/appSlice';
import { loginWithTenantUrl, pageNotFound } from '../assets/constants/pageurl';
import {
  EndTime,
  TIME_FORMAT,
  dateFormat_DD_MMM_YYYY2,
  dateFormat_DD_MM_YYYY,
  dateFormat_DD_MM_YYYY_with_slash,
  dateFormat_DD_MM_YYYY_with_time,
  dateFormat_MMM_DD,
  dateFormat_YYYY_MM_DD,
  timeFormat_24,
  timeFormat_with_am,
} from '../assets/constants/config';
import { PrefferedConfigurationLabel } from './hr-component/preferences/constants';
import { HR_BENEFIT_SECTION_NAME } from './hr-component/benefits/constants';
import { HR_ASSETS_SECTION_NAME } from './hr-component/assests/constants';
import { REPORTING_CHART_TITLE } from './reporting/constant';
import { intercomShutDown } from '../intercomShutdown';

export const getDatesInRange = (startDate, endDate) => {
  const [sYYYY, sMM, sDD] = [...startDate?.split('-')];
  const [eYYYY, eMM, eDD] = [...endDate?.split('-')];
  const start_date = new Date(sYYYY, sMM - 1, sDD);
  const end_date = new Date(eYYYY, eMM - 1, eDD);
  const dates: any = [];
  while (start_date <= end_date) {
    const preparDates = {
      date: moment(new Date(start_date)).format(dateFormat_YYYY_MM_DD),
      dateString: moment(new Date(start_date)).format(dateFormat_MMM_DD),
      day: getDayOfWeek(
        moment(new Date(start_date)).format(dateFormat_DD_MM_YYYY),
      ),
      book_data: [],
    };
    dates.push(preparDates);
    start_date.setDate(start_date.getDate() + 1);
  }
  return dates;
};
export const getDayOfWeek = date => {
  const changeformet = moment(date, dateFormat_DD_MM_YYYY).format(
    dateFormat_YYYY_MM_DD,
  );
  const [yyyy, mm, dd] = [...changeformet?.split('-')];
  const dayOfWeek = new Date(
    parseInt(yyyy),
    parseInt(mm) - 1,
    parseInt(dd),
  ).getDay();
  return isNaN(dayOfWeek)
    ? null
    : [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ][dayOfWeek];
};
export const _doLogout = () => {
  intercomShutDown()
  store.dispatch(logout());
  window.location.replace(loginWithTenantUrl);
 
};
export const changeTimeZone = (timezone, time = new Date()) => {
  let findTimeZone = '';
  if (timezone && timezone != '' && timezone != null && timezone != undefined)
    findTimeZone = timezone;
  else findTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return moment(
    new Date(time.toLocaleString('en-US', { timeZone: findTimeZone })),
  ).format('DD/MM/YYYY HH:mm');
};
export const validateLoginUser = checkSlugName => {
  const topList = ['administrator', 'location_manager', 'team_manager', 'user'];
  const rolesList = store.getState().app?.userDetails?.roles;
  if (rolesList != undefined && rolesList != null && rolesList.length > 0) {
    if (checkSlugName) {
      return rolesList.find(e => e.slug == checkSlugName);
    } else {
      const findType = topList.find(t => rolesList.find(r => t == r.slug));
      if (findType) {
        return rolesList.find(e => e.slug == findType);
      } else {
        return null;
      }
    }
  } else return null;
};
export const validateOnBehalfOfUser = () => {
  const checkBehalfOfPermissionType =
    validateLoginUser('administrator')?.slug ||
    validateLoginUser('team_manager')?.slug ||
    validateLoginUser('location_manager')?.slug
      ? true
      : false;
  return checkBehalfOfPermissionType;
};
export const timeValidation = editDetails => {
  if (editDetails?.data) {
    const timeZone = changeTimeZone(editDetails?.data?.timezone);
    if (
      moment(editDetails?.data?.booking_date).format(dateFormat_YYYY_MM_DD) ==
      moment(timeZone).format(dateFormat_YYYY_MM_DD)
    ) {
      const time = new Date(timeZone).toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      });
      const checkTime = moment(new Date())
        .format(dateFormat_YYYY_MM_DD)
        .concat(' ', editDetails?.data?.start_time);
      const checkinTime = new Date(checkTime).toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      });
      if (time >= checkinTime) {
        return false;
      } else return true;
    } else return true;
  } else return true;
};

export const findLabelText = (module, text, key) => {
  const { languages } = store.getState().language;
  const getKey = languages?.[key];
  const label = getKey?.[module]?.['name'];
  if (label !== null && label !== undefined && label !== '') return label;
  else return text;
};

export const replaceUnderscoreWithSpace = text => {
  const labelText = text?.includes('_') ? text?.replace(/_/g, ' ') : text;
  return labelText.charAt(0).toUpperCase() + labelText.slice(1);
};
export const startdHoursDisable = endTime => {
  const hours: any = [];
  let h = parseInt(endTime?.split(':')[0]);
  const m = parseInt(endTime?.split(':')[1]);
  if (m == 0) {
  } else {
    h = h + 1;
  }
  for (let i = h; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};
export const startMinutesDisable = (selectedHour, endTime) => {
  try {
    const h = parseInt(endTime?.split(':')[0]);
    const minutes: any = [];
    if (selectedHour == h) {
      const m = parseInt(endTime?.split(':')[1]);
      for (let i = m; i <= 60; i++) {
        minutes.push(i);
      }
    } else {
    }
    return minutes;
  } catch (error) {}
};
export const endHoursDisable = startTime => {
  const h = parseInt(startTime?.split(':')[0]);
  const m = parseInt(startTime?.split(':')[1]);
  const hours: any = [];
  const len = m == 59 ? h + 1 : h;
  for (let i = 0; i < len; i++) {
    hours.push(i);
  }
  return hours;
};
export const endMinutesDisable = (selectedHour, startTime) => {
  const h = parseInt(startTime?.split(':')[0]);
  const minutes: any = [];
  if (selectedHour == h) {
    const m = parseInt(startTime?.split(':')[1]);
    for (let i = 0; i <= m; i++) {
      minutes.push(i);
    }
  } else {
  }
  return minutes;
};

const diffBetweenTwoTimes = (t1, t2) => {
  const seconds = Math.abs((t1.getTime() - t2.getTime()) / 1000);
  return seconds;
};

export const convertTimezone = (date, time, fromTimezone, toTimezone) => {
  const date_YYYY_MM_DD = moment(date).format(dateFormat_YYYY_MM_DD);
  const addDateAndTime = new Date(date_YYYY_MM_DD + ' ' + time);
  const fromTime = new Date(
    addDateAndTime.toLocaleString('en-US', { timeZone: fromTimezone }),
  );
  const toTime = changeTimeZone(toTimezone, fromTime);

  return toTime?.split(' ')?.[1];
};

export const convertheBookingTimeToLocalTime = (date, time, timezone) => {
  const date_YYYY_MM_DD = moment(date).format(dateFormat_YYYY_MM_DD);
  const addDateAndTime = new Date(date_YYYY_MM_DD + ' ' + time);

  const currntTimeInEuropeLondon = changeTimeZone(timezone, addDateAndTime);
  const changedTime = new Date(
    date_YYYY_MM_DD + ' ' + currntTimeInEuropeLondon?.split(' ')?.[1],
  );
  const getSysTime =
    addDateAndTime.getTime() -
    (changedTime.getTime() - addDateAndTime.getTime());
  const convertedTime = moment(new Date().setTime(getSysTime)).format(
    timeFormat_24,
  );
  return convertedTime ? convertedTime : time;
};
export const convertheBookingTimeToLocalDateTime = (
  date,
  time,
  timezone,
  timeformat = timeFormat_24,
  dateformat = dateFormat_DD_MMM_YYYY2,
) => {
  const date_YYYY_MM_DD = moment(date).format(dateFormat_YYYY_MM_DD);
  const addDateAndTime = new Date(date_YYYY_MM_DD + ' ' + time);

  const currntTimeInEuropeLondon = changeTimeZone(timezone, addDateAndTime);
  const changedTime = new Date(
    date_YYYY_MM_DD + ' ' + currntTimeInEuropeLondon?.split(' ')?.[1],
  );
  const getSysTime =
    addDateAndTime.getTime() -
    (changedTime.getTime() - addDateAndTime.getTime());
  const convertedTime = moment(new Date().setTime(getSysTime)).format(
    timeformat,
  );
  const dateFormat =
    moment(new Date().setTime(getSysTime)).format(dateformat) +
    ' ' +
    convertedTime;

  return dateFormat ? dateFormat : time;
};

export const getStartTime = (start_time, timeZone, newDate) => {
  if (
    moment(newDate).format(dateFormat_DD_MM_YYYY_with_slash) ==
    moment(
      changeTimeZone(timeZone, new Date()),
      dateFormat_DD_MM_YYYY_with_time,
    ).format(dateFormat_DD_MM_YYYY_with_slash)
  ) {
    if (
      moment(changeTimeZone(timeZone), dateFormat_DD_MM_YYYY_with_time).format(
        timeFormat_24,
      ) > start_time
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
export const getEndTime = (end_time, timeZone, newDate) => {
  if (
    moment(newDate).format(dateFormat_DD_MM_YYYY_with_slash) ==
    moment(
      changeTimeZone(timeZone, new Date()),
      dateFormat_DD_MM_YYYY_with_time,
    ).format(dateFormat_DD_MM_YYYY_with_slash)
  ) {
    if (
      moment(changeTimeZone(timeZone), dateFormat_DD_MM_YYYY_with_time).format(
        timeFormat_24,
      ) > end_time
    )
      end_time = EndTime;
    else end_time = end_time;
  } else {
    end_time = end_time;
  }
  return end_time;
};
const getTimeStmp = myDate => new Date(myDate[2], myDate[1] - 1, myDate[0]);
export const validateBackgroundColor = (preparDate, pointer) => {
  if (preparDate) {
    let objDate: any = moment(preparDate).format(dateFormat_DD_MM_YYYY);
    objDate = objDate.split('-');
    const newObjDate = getTimeStmp(objDate);
    let today: any = moment(new Date()).format(dateFormat_DD_MM_YYYY);
    today = today.split('-');
    const newTodayDate = getTimeStmp(today);
    if (pointer) {
      const backgroundColor =
        newTodayDate.getTime() > newObjDate.getTime() ? 'none' : '';
      return backgroundColor;
    } else {
      const backgroundColor =
        newTodayDate.getTime() > newObjDate.getTime()
          ? '#DADADA'
          : 'transparant';
      return backgroundColor;
    }
  } else {
    return 'transparant';
  }
};
export const startOfMonth = moment(new Date())
  .clone()
  .startOf('month')
  .format(dateFormat_YYYY_MM_DD);
export const endOfMonth = moment(new Date())
  .clone()
  .endOf('month')
  .format(dateFormat_YYYY_MM_DD);

export const checkHrModuleRightsideView = (addTitle, editTitle) => {
  let type = '';
  if (addTitle == 'Emergency contact' || editTitle == 'Emergency contact') {
    type = 'user_emergency_contact';
  } else if (addTitle == 'Education' || editTitle == 'Education') {
    type = 'user_education';
  } else if (addTitle == 'Certifications' || editTitle == 'Certifications') {
    type = 'user_certification';
  } else if (
    addTitle == 'Vaccination status' ||
    editTitle == 'Vaccination status'
  ) {
    type = 'user_vaccination';
  } else if (addTitle == 'Visa' || editTitle == 'Visa') {
    type = 'user_visa';
  } else if (addTitle == 'Clearance types' || editTitle == 'Clearance types') {
    type = 'user_clearance';
  } else if (addTitle == 'Identification' || editTitle == 'Identification') {
    type = 'user_identification';
  } else if (addTitle == 'Work History' || editTitle == 'Work History') {
    type = 'user_work_history';
  } else if (
    addTitle == 'Assign a manager' ||
    editTitle == 'Assign a manager'
  ) {
    type = 'user_work_manager';
  } else if (
    addTitle == 'Direct report(s)' ||
    editTitle == 'Direct report(s)'
  ) {
    type = 'user_work_direct_report';
  } else if (
    addTitle == 'Compensation & Bonus(es)' ||
    editTitle == 'Compensation & Bonus(es)'
  ) {
    type = 'user_work_compensation_bonus';
  } else if (
    addTitle == 'Add time off type' ||
    editTitle == 'Edit time off type'
  ) {
    type = 'timeoff_types';
  } else if (
    addTitle == PrefferedConfigurationLabel.DEFAULT_PARKING ||
    editTitle == PrefferedConfigurationLabel.DEFAULT_PARKING
  ) {
    type = 'preferences_parking';
  } else if (
    addTitle == PrefferedConfigurationLabel.DEFAULT_WORKSPACE ||
    editTitle == PrefferedConfigurationLabel.DEFAULT_WORKSPACE
  ) {
    type = 'preferences_workspace';
  } else if (
    addTitle == PrefferedConfigurationLabel.DEFAULT_ROOM ||
    editTitle == PrefferedConfigurationLabel.DEFAULT_ROOM
  ) {
    type = 'preferences_room';
  } else if (
    addTitle == HR_BENEFIT_SECTION_NAME.PENSION ||
    editTitle == HR_BENEFIT_SECTION_NAME.PENSION
  ) {
    type = 'user_pension';
  } else if (
    addTitle == HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS ||
    editTitle == HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS
  ) {
    type = 'user_generalbenefit';
  } else if (
    addTitle == HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE ||
    editTitle == HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE
  ) {
    type = 'user_generalinsurance';
  } else if (
    addTitle == HR_ASSETS_SECTION_NAME.ASSETS ||
    editTitle == HR_ASSETS_SECTION_NAME.ASSETS
  ) {
    type = 'user_assets';
  }

  return type;
};
export const navigateToPageNotFound = () => {
  window.location.href = pageNotFound;
};

export const getAssetStatusName = status => {
  switch (status?.toString()) {
    case '1':
      return 'Available';
    case '2':
      return 'By request';
    case '3':
      return 'Unavailable';
    default:
      return 'Available';
  }
};

export const getBookingStatusName = status => {
  switch (status?.toString()) {
    case '1':
      return 'Booked';
    case '2':
      return 'Booked by me';
    case '4':
      return 'Requested by me';
    default:
      return 'Available';
  }
};

export const getWorkplaceStatusName = status => {
  switch (status?.toString()) {
    case '1':
      return 'Booking';
    case '2':
      return 'Remote';
    case '3':
      return 'Out Office';
    case '4':
    case '5':
    case '6':
      return 'Out Office';
    default:
      return 'Unknown';
  }
};

export const convertheBookingTimeToLocalTimeForValidation = (
  date,
  time,
  timezone,
) => {
  const date_YYYY_MM_DD = moment(date).format(dateFormat_YYYY_MM_DD);
  const addDateAndTime = new Date(date_YYYY_MM_DD + ' ' + time);

  const currntTimeInEuropeLondon = changeTimeZone(timezone, addDateAndTime);
  const changedTime = new Date(
    date_YYYY_MM_DD + ' ' + currntTimeInEuropeLondon?.split(' ')?.[1],
  );
  const getSysTime =
    addDateAndTime.getTime() -
    (changedTime.getTime() - addDateAndTime.getTime());
  return getSysTime ? getSysTime : time;
};

export const validateStartEndTime = (
  startTime,
  endTime,
  startTimezone,
  endTimezone,
  startDate,
) => {
  if (
    moment(
      changeTimeZone(startTimezone, startDate),
      dateFormat_DD_MM_YYYY_with_time,
    ).format(dateFormat_DD_MM_YYYY_with_slash) ==
    moment(
      changeTimeZone(startTimezone, new Date()),
      dateFormat_DD_MM_YYYY_with_time,
    ).format(dateFormat_DD_MM_YYYY_with_slash)
  ) {
    const validateStartTime =
      moment(
        changeTimeZone(startTimezone, new Date()),
        dateFormat_DD_MM_YYYY_with_time,
      ).format(timeFormat_24) > startTime
        ? false
        : true;
    const validateEndTime =
      moment(
        changeTimeZone(endTimezone, new Date()),
        dateFormat_DD_MM_YYYY_with_time,
      ).format(timeFormat_24) > endTime
        ? false
        : true;
    const validateStartAndEndTime =
      convertheBookingTimeToLocalTimeForValidation(
        startDate,
        startTime,
        startTimezone,
      ) <
      convertheBookingTimeToLocalTimeForValidation(
        startDate,
        endTime,
        endTimezone,
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
      changeTimeZone(startTimezone, new Date(startDate)),
      dateFormat_DD_MM_YYYY_with_time,
    ) >
    moment(
      changeTimeZone(startTimezone, new Date()),
      dateFormat_DD_MM_YYYY_with_time,
    )
  ) {
    const validateStartAndEndTime =
      convertheBookingTimeToLocalTimeForValidation(
        startDate,
        startTime,
        startTimezone,
      ) <
      convertheBookingTimeToLocalTimeForValidation(
        startDate,
        endTime,
        endTimezone,
      )
        ? true
        : false;
    return validateStartAndEndTime;
  } else {
    return false;
  }
};

export const get12HrsTime = time12h => {
  let [hours, minutes] = time12h.split(':');
  const AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const finalTime = hours + ':' + minutes + ' ' + AmOrPm;
  return finalTime;
};

export const get24hrsTime = time12h => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

export const getUserPreferedDateFormat = date => {
  const { userDateTimeFormat } = store.getState().app;
  const dateFormat = userDateTimeFormat?.date_pref
    ? userDateTimeFormat?.date_pref
    : dateFormat_DD_MM_YYYY;
  const preferedDateFormat = date ? moment(date).format(dateFormat) : '';
  return preferedDateFormat;
};

export const getUserPreferedDateFormatToSave = date => {
  const preferedDateFormat = date && moment(date).format(dateFormat_YYYY_MM_DD);
  return preferedDateFormat;
};

export const getPrefereredTimeToSave = time => {
  const { userDateTimeFormat } = store.getState().app;
  const finalTime =
    userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
      ? moment(time, timeFormat_with_am).format(timeFormat_24)
      : moment(time, timeFormat_24).format(timeFormat_24);
  return finalTime;
};

export const getPrefereredTimeToDisplay = time => {
  const { userDateTimeFormat } = store.getState().app;
  let finalTime = time && moment(time, timeFormat_24).format(timeFormat_24);
  finalTime =
    userDateTimeFormat?.time_pref == TIME_FORMAT.twelve
      ? finalTime && get12HrsTime(finalTime)
      : time;
  return finalTime;
};

export const getPreferedTimeFormat = () => {
  const { userDateTimeFormat } = store.getState().app;
  if (userDateTimeFormat?.time_pref == TIME_FORMAT.twelve) {
    return timeFormat_with_am;
  } else {
    return timeFormat_24;
  }
};

export const getGoogleSheetSingleBarChartRowHeader = key => {
  let rowHeader = [
    'Hour',
    'Distribution',
    'Change percentage',
    'Change percentage status',
  ];
  if (key == REPORTING_CHART_TITLE.emp_by_length_service) {
    rowHeader = [
      'Employee Service Period',
      'Distribution',
      'Change percentage',
      'Change percentage status',
    ];
  } else if (key == REPORTING_CHART_TITLE.emp_status) {
    rowHeader = [
      'Employee Status',
      'Distribution',
      'Change percentage',
      'Change percentage status',
    ];
  } else if (key == REPORTING_CHART_TITLE.avg_head_count_by_team) {
    rowHeader = [
      'Team Name',
      'Total of Data%',
      'Change percentage',
      'Change percentage status',
    ];
  } else if (key == REPORTING_CHART_TITLE.avg_head_count_by_location) {
    rowHeader = [
      'Location Name',
      'Total of Data%',
      'Change percentage',
      'Change percentage status',
    ];
  } else if (key == 'Utilisation by days of week (%)') {
    rowHeader = [
      'Days of week',
      'Total of Data%',
      'Change percentage',
      'Change percentage status',
    ];
  }
  return rowHeader;
};

export const excelSheetColumTitle = key => {
  let yKey = 'Sum of all Bookings%';
  if (key == REPORTING_CHART_TITLE.avg_head_count_by_team) {
    yKey = 'Sum of all Employees';
  } else if (key == REPORTING_CHART_TITLE.avg_head_count_by_location) {
    yKey = 'Sum of all Locations';
  }
  return yKey;
};

export const getExcelSheetTitle = key => {
  let yKey = 'Date';
  if (key == REPORTING_CHART_TITLE.headcount_by_employment_status_over_time) {
    yKey = 'Employee Headcount';
  } else if (key == 'Booking frequency per week') {
    yKey = 'Number of Times';
  } else if (key == 'Utilisation per day') {
    yKey = 'Hour';
  } else if (key == REPORTING_CHART_TITLE.emp_status) {
    yKey = 'Employee Status';
  } else if (key == REPORTING_CHART_TITLE.emp_by_age_grp) {
    yKey = 'Employee Age';
  } else if (key == REPORTING_CHART_TITLE.emp_by_gender) {
    yKey = 'Employee Gender';
  } else if (key == REPORTING_CHART_TITLE.emp_by_length_service) {
    yKey = 'Employee Service Time';
  }
  return yKey;
};


export const getExcelSheetKey = key => {
  let yKey = 'Date';
  if (key == REPORTING_CHART_TITLE.headcount_by_employment_status_over_time) {
    yKey = 'Employee Headcount';
  } else if (key == 'Booking frequency per week') {
    yKey = 'hour';
  } else if (key == 'Utilisation per day') {
    yKey = 'hour';
  } else if (key == REPORTING_CHART_TITLE.emp_status) {
    yKey = 'emp_status';
  } else if (key == REPORTING_CHART_TITLE.emp_by_age_grp) {
    yKey = 'emp_gender';
  } else if (key == REPORTING_CHART_TITLE.emp_by_gender) {
    yKey = 'emp_gender';
  } else if (key == REPORTING_CHART_TITLE.emp_by_length_service) {
    yKey = 'emp_service';
  }
  return yKey;
};

export const getExpireTimeFromToken = jwtString => {
  const [header, payload, signature] = jwtString.split('.');
  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));
  store.dispatch(setLoginTokenExpires(decodedPayload?.exp * 1000));
  return decodedPayload;
};

const base64UrlDecode = base64Url => {
  const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
};
