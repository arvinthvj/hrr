import {
  hrIcon1,
  hrIcon3,
  hrIcon4,
  hrIcon5,
  hrIcon6,
  hrIcon7,
  hrIcon8,
  hrIcon9,
  hr_permision,
  hr_timeOffProfile,
  hr_timeOffTypes,
} from '../../components/imagepath';
import {
  carbon_security,
  setting_icon,
  status_icon,
} from '../../components/imagepath';
import { emailPattern, passwordPattern } from './regexpattern';

export const global = {
  common: {
    mailMaxLength: 64,
    minPasswordLength: 6,
    maxPasswordLength: 20,
    inputDefaultMaxlength: 64,
    minOrganizationLength: 3,
    maxOrganizationLength: 20,
    countPerPage: 10,
  },
  pattern: {
    emailPattern: emailPattern,
    passwordPattern: passwordPattern,
  },
  validationLabel: {
    // UserManagement
    organisationReq: 'Please enter the organisation',
    emailRequired: 'Please enter the email',
    passwordRequired: 'Please enter the password',
    validEmail: 'Please enter the valid email',
    userManagement: {
      firstNameRequird: 'Please enter the first name',
      lastNameRequird: 'Please enter the last name',
      displayNameRequird: 'Please enter the display name',
      emailRequired: 'Please enter the email',
      validEmail: 'Please enter the valid email',
      validEmailLimit: 'Email must be between 6 to 255 character long',
      subjectRequird: 'Please enter the subject',
      nameRequired: 'Please enter the name',
      selectTeam: 'Please select a team or multiple teams.',
      selectPrimaryTeam: 'Please select a team',
      // selectTeam: "Please Select the minimun one team.",
      deleteWarning:
        'Deleting this user will check them out of all active bookings and will cancel all future bookings.',
      cantInactiveWarning:
        'Unable to deactivate user(s) due to current role obligations. Please remove relevant roles before deactivation.',
      inactiveWarning:
        'Deactivating the selected user(s) will cancel current and future bookings. The selected user(s) will be unable to log in.',
      changeTeamWarning:
        "Removing a user's team will check them out of all active bookings and will cancel all future bookings",
    },
    team_management: {
      inactiveWarning:
        'Deactivating the team will cancel current and future bookings.',
      deleteWarning:
        'Deleting the team will cancel current and future bookings.',
      removeleafwarning:
        'Changing a leaf team will delete all current and future bookings associated to members and assigned assets',
      cantInactiveWarning:
        'To make this team inactive, first remove all active users from this team and all linked teams',
      cantDeleteWarning:
        'To delete this team, first remove all active users from the team and all linked teams',
    },
    location: {
      locationNameRequire: 'Please enter the location name',
      parentLocationRequire: 'Please enter the parent location',
      descriptionRequire: 'Please enter the description',
      selectLocation: 'Please select the location',
      languageRequire: 'Please select the language',
      currencyRequire: 'Please select the currency',
      startWeek: 'Please select the start week',
      accessLevel: 'Please select the access level',
      tenantList: 'Please select the tenant',
      slectTimezone: 'Please select the time zone',
      youCanOnlyUse: '-_&#@, this special characters can only accept',
      locationNameValidation: /^[0-9A-Za-z]*[-_&#@ ,0-9A-Za-z]*$/,
      locationNameLength: 50,
      locationDescriptionLength: 300,
      // locationDescriptionValidation: /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
      youCanOnlyUseDescription:
        '^(?!s*$).+, this special characters can only accept',
    },
    team: {
      teamNameRequire: 'Please enter the team name',
    },
    secretKey: {
      pattern: '%#^&*$',
    },
    widthHeightValidation: 'Please upload a file smaller than 400px X 100px',
    // AssetManagement
    assetManagement: {
      name: 'Please enter the name',
      code: 'Please enter the code',
      description: 'Please enter the description name',
      unAvailableWarning:
        'By making this asset unavailable, all existing bookings on this asset will be cancelled.',
      inactiveWarning:
        'Changing the active/inactive status of the selected asset will delete all associated bookings. If you proceed with the change, all existing bookings for the asset will be deleted, and users will be unable to access them. Please consider the impact of this action before proceeding.',
    },
    teamManagement: {
      teamNameSplCharRegex:
        /^[0-9A-Za-z]*[\/\\\-:<>|;\[\].+=*&^%$#@!~ ,\\0-9A-Za-z]*$/,
      maxLimit: 'Maximum number of 50 characters exceeded',
      teamNameSplCharValidationMsg:
        '/\\-:<>|;[].+=*&^%$#@!~ Only these Special characters are allowed',
    },
    book: {
      splCharRegex: /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
      maxLimit100: 'Maximum characters limit 100.',
      maxLimit200: 'Maximum characters limit 200.',
      maxLimit150: 'Maximum characters limit 150.',
      splCharValidationMsg:
        '^(?!s*$).+ Only these Special characters are allowed',
    },
    tenantValidation: {
      initialConfiguration: 'Please Select the initial configuration',
      tenantName: 'Please enter the tenant name',
      plan: 'Please Select the plan',
      serverLocations: 'Please Select the server locations',
      loginType: 'Please Select the login type',
      calendarIntegration: 'Please Select the calendar integration',

      tenantNameValidation: /^[0-9A-Za-z]*[-_&#@ ,0-9A-Za-z]*$/,
      tenantNameLength: 80,
      youCanOnlyUse: '-_&#@, this special characters can only accept',
      // locationDescriptionLength: 300,
      validEmailLimit: 'Email must be between 6 to 255 character long',
    },

    hsroleValidation: {
      roleName: 'Please enter the role name',
      roleNameValidation: /^[0-9A-Za-z]*[-_&#@ ,0-9A-Za-z]*$/,
      youCanOnlyUse: '-_&#@, this special characters can only accept',
      roleNameLength: 30,
      lengthInvalidText: 'Please enter less than 30 characters',
    },
    profileSettingValidation: {
      // profiledescrptionValidation: /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
      youCanOnlyUse: '?!*$.+()^,this special characters can only accept',
    },
    hrModuleValidation: {
      vaccination_type: 'Vaccination type is required',
      vaccination_number: 'Vaccination number is required',

      vaccinationTypeLength: 50,
      vaccinationCharactersExceeded: 'Maximum number of 50 characters exceeded',
      CharactersExceeded300: 'Maximum number of 300 characters exceeded',
      vaccinationTypeValidation: /^[0-9A-Za-z]*[-_&#@ ,0-9A-Za-z]*$/,
      visaTypeValidation: /^[a-zA-Z0-9-_&#@\s]*$/,
      alphaNumericalValidation: /^[a-zA-Z0-9\s ]+$/,
      currencyValidation: /^[0-9]*$/,
      isNumericValidation: /^\d+$/,
      zipcodeValidation: /^[A-Za-z0-9-]*$/,
      vaccinationTypeValidationMesaage: 'Accepts only alphanumerical',
      currencyValidationMesaage: 'Accepts only Numerical',
      requiredBenefitValidationMessage: 'Please enter benefits',
      validEmailLimit: 'Value between 6 to 50 character long only',
      commentLengthValidation: 'Comment must be between 1 to 300 characters',
      requiredIDValidationMessage: 'Please enter Id Number',
      requiredEffectiveDateMessage: 'Enter effective from date',
      percentageLengthValidation: 'Percentage must be between 1 to 5 digit',
      idNumberLimit: 'Value between 2 to 50 character long only',
      requiredCategoryValidationMessage: 'Please enter category',
      requiredLoanedDateMessage: 'Enter loan from date',
      requiredReturnedDateMessage: 'Enter returned from date',
      requiredSerialNumberValidationMessage: 'Please enter serial number',
      requiredNotesValidationMessage: 'Please enter notes',
      maxLengthCategory: 'Maximum number of 150 characters exceeded',
      maxLenDec: 'Maximum number of 300 characters exceeded',
      isNumericValidationMesaage: 'Incorrect format',
      EmailValidationMesaage: 'Email address is not correct',
      CharactersExceeded15: 'Maximum number of 15 characters exceeded',
      CharactersExceeded100: 'Maximum number of 100 characters exceeded',
      requiredLink: 'Please enter link',
      requiredCompanyPay: 'Please enter company pay',
      requiredEmployeePay: 'Please enter employee pay',
    },
  },
};

export const firstLetterStyle = {
  height: 30,
  width: 30,
  marginRight: 3,
};

export const locationTypes = {
  global: 'Global',
  region: 'regions',
  country: 'Country',
  state: 'State',
  city: 'City',
  suburb: 'Suburb',
  street: 'Street',
  building: 'Building',
  floor: 'Floor',
  zone: 'zones',
  neighbour: 'Neighbour',
  asset: 'Asset',
};

export const locationOrderTypes = [
  locationTypes.global,
  locationTypes.region,
  locationTypes.country,
  locationTypes.state,
  locationTypes.city,
  locationTypes.suburb,
  locationTypes.street,
  locationTypes.building,
  locationTypes.floor,
  locationTypes.zone,
  locationTypes.neighbour,
  locationTypes.asset,
];

export const timeLine = [
  {
    mid: '01:30',
    sub1: ['01:01', '01:05', '01:10', '01:15', '01:20'],
    sub2: ['01:35', '01:40', '01:45', '01:50', '01:55'],
    label: '01:00',
  },
  {
    mid: '02:30',
    sub2: ['02:01', '02:05', '02:10', '02:15', '02:20'],
    sub2: ['02:35', '02:40', '02:45', '02:50', '02:55'],
    label: '02:00',
  },
  {
    mid: '03:30',
    sub1: ['03:01', '03:05', '03:10', '03:15', '03:20'],
    sub2: ['03:35', '03:40', '03:45', '03:50', '03:55'],
    label: '03:00',
  },
  {
    mid: '04:30',
    sub1: ['04:01', '04:05', '04:10', '04:15', '04:20'],
    sub2: ['04:35', '04:40', '04:45', '04:50', '04:55'],
    label: '04:00',
  },
  {
    mid: '05:30',
    sub1: ['05:01', '05:05', '05:10', '05:15', '05:20'],
    sub2: ['05:35', '05:40', '05:45', '05:50', '05:55'],
    label: '05:00',
  },
  {
    mid: '06:30',
    sub1: ['06:01', '06:05', '06:10', '06:15', '06:20'],
    sub2: ['06:35', '06:40', '06:45', '06:50', '06:55'],
    label: '06:00',
  },
  {
    mid: '07:30',
    sub1: ['07:01', '07:05', '07:10', '07:15', '07:20'],
    sub2: ['07:35', '07:40', '07:45', '07:50', '07:55'],
    label: '07:00',
  },
  {
    mid: '08:30',
    sub1: ['08:01', '08:05', '08:10', '08:15', '08:20'],
    sub2: ['08:35', '08:40', '08:45', '08:50', '08:55'],
    label: '08:00',
  },
  {
    mid: '09:30',
    sub1: ['09:01', '09:05', '09:10', '09:15', '09:20'],
    sub2: ['09:35', '09:40', '09:45', '09:50', '09:55'],
    label: '09:00',
  },
  {
    mid: '10:30',
    sub1: ['10:01', '10:05', '10:10', '10:15', '10:20'],
    sub2: ['10:35', '10:40', '10:45', '10:50', '10:55'],
    label: '10:00',
  },
  {
    mid: '11:30',
    sub1: ['11:01', '11:05', '11:10', '11:15', '11:20'],
    sub2: ['11:35', '11:40', '11:45', '11:50', '11:55'],
    label: '11:00',
  },
  {
    mid: '12:30',
    sub1: ['12:01', '12:05', '12:10', '12:15', '12:20'],
    sub2: ['12:35', '12:40', '12:45', '12:50', '12:55'],
    label: '12:00',
  },
  {
    mid: '13:30',
    sub1: ['13:01', '13:05', '13:10', '13:15', '13:20'],
    sub2: ['13:35', '13:40', '13:45', '13:50', '13:55'],
    label: '13:00',
  },
  {
    mid: '14:30',
    sub1: ['14:01', '14:05', '14:10', '14:15', '14:20'],
    sub2: ['14:35', '14:40', '14:45', '14:50', '14:55'],
    label: '14:00',
  },
  {
    mid: '15:30',
    sub1: ['15:01', '15:05', '15:10', '15:15', '15:20', '15:25'],
    sub2: ['15:30', '15:35', '15:40', '15:45', '15:50', '15:55'],
    label: '15:00',
  },
  {
    mid: '16:30',
    sub1: ['16:01', '16:05', '16:10', '16:15', '16:20', '16:25'],
    sub2: ['16:30', '16:35', '16:40', '16:45', '16:50', '16:55'],
    label: '16:00',
  },
  {
    mid: '17:30',
    sub1: ['17:01', '17:05', '17:10', '17:15', '17:20'],
    sub2: ['17:35', '17:40', '17:45', '17:50', '17:55'],
    label: '17:00',
  },
  {
    mid: '18:30',
    sub1: ['18:01', '18:05', '18:10', '18:15', '18:20'],
    sub2: ['18:35', '18:40', '18:45', '18:50', '18:55'],
    label: '18:00',
  },
  {
    mid: '19:30',
    sub1: ['19:01', '19:05', '19:10', '19:15', '19:20'],
    sub2: ['19:35', '19:40', '19:45', '19:50', '19:55'],
    label: '19:00',
  },
  {
    mid: '20:30',
    sub1: ['20:01', '20:05', '20:10', '20:15', '20:20'],
    sub2: ['20:35', '20:40', '20:45', '20:50', '20:55'],
    label: '20:00',
  },
  {
    mid: '21:30',
    sub1: ['21:01', '21:05', '21:10', '21:15', '21:20'],
    sub2: ['21:35', '21:40', '21:45', '21:50', '21:55'],
    label: '21:00',
  },
  {
    mid: '22:30',
    sub1: ['22:01', '22:05', '22:10', '22:15', '22:20'],
    sub2: ['22:35', '22:40', '22:45', '22:50', '22:55'],
    label: '22:00',
  },
  {
    mid: '23:30',
    sub1: ['23:01', '23:05', '23:10', '23:15', '23:20'],
    sub2: ['23:35', '23:40', '23:45', '23:50', '23:55'],
    label: '23:00',
  },
];

export const FireBaseConfig = {
  apiKey: 'AIzaSyDzCKZinUpRAsuPkJOuxflJ6tkNR15R-34',
  authDomain: 'hhproject-e00d4.firebaseapp.com',
  projectId: 'hhproject-e00d4',
  storageBucket: 'hhproject-e00d4.appspot.com',
  messagingSenderId: '812893378210',
  appId: '1:812893378210:web:ac198cf865d09b7216e9fb',
  measurementId: 'G-6PF140CB01',
};
// my
// export const VapIdKey =
//   "BPGcuWDCfOIzAOn2Ggs9Q34GE31uFqUen4X9itVY9nd2LWPUNsrzxkaByjKkEK9LzT520tve-MjLYbeP2B8QRdQ";
// CLIENT - Details start
export const VapIdKey =
  'BO-sM_vStRb7bceY_0YHDRjUpowFSdTq5yH0txGaDUMrAtvtjlPeax1L3sOJ6uPlAvG6gBURSRoao8ODFRaggI0';
// CLIENT - Details start
// ri
// export const VapIdKey = "BKcDQVkinsvyWO0dKAvnPdWOSk6isvZ9dlX58_0MFN8zGN59N7kpz49CvyX_l5Uj40O9qLYIzUlzwSiI0CPpy5Q"

export const Notificationtypes = {
  incomingRequest: 'Incoming Request',
  outgoingRequest: 'Outgoing Request',

  bookingModified: 'Booking Modified',
  approved: 'Booking Approved',
  bookingRejected: 'Booking Rejected',
  bookingExpired: 'Booking Expired',
  bookingCancel: 'Booking Cancel',
  bookingSuccess: 'Booking Success',

  checkinRequired: 'Check in Reminder',
  checkinConfirmation: 'Check in Confirmation',

  genericNotification: 'Generic Notification',
  welcome: 'Welcome',
  passwordReset: 'Password Reset',
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const imageTypes = [
  {
    name: 'png',
    type: 'image/png',
  },
  {
    name: 'jpeg',
    type: 'image/jpeg',
  },
  {
    name: 'svg',
    type: 'image/svg+xml',
  },
  {
    name: 'xlsx',
    type: 'application/xlsx',
  },
  {
    name: 'pdf',
    type: 'application/pdf',
  },
  {
    name: 'csv',
    type: 'application/csv',
  },
];

export const assetsList = [
  {
    id: 1,
    name: 'Workspaces',
    icon_images: 'chair_1674811663199.svg',
  },
  {
    id: 2,
    name: 'Rooms',
    icon_images: 'room_1674811314595.svg',
  },
  {
    id: 3,
    name: 'Parking',
    icon_images: 'parking_1674811740209.svg',
  },
];

export const nonAssetList = [
  {
    id: 4,
    name: 'Remote',
  },
  {
    id: 11,
    name: 'Client site',
  },
  {
    id: 12,
    name: 'In-office',
  }
];

export const deskFilter = [
  'remotedays_count',
  'remotedays_monthcount',
  'sremotedays_count',
];

export const assetsImageDomain =
  'https://hd-plus.hybridhero.com/asset/storage/app/assetimages/';

export const nonceEnv = 'c88529b087036c035be110e0fa5b6b63041ede30e2e69e90';
export const keyEnv =
  '89def69f0bdddc995078037539dc6ef4f0bdbdd3fa04ef2d11eea30779d72ac6';

export const countryCodeValues = [
  { countryCode: 'CA', value: '+1', label: '+1' },
  { countryCode: 'US', value: '+1', label: '+1' },
  { countryCode: 'KZ', value: '+7', label: '+7' },
  { countryCode: 'RU', value: '+7', label: '+7' },
  { countryCode: 'TJ', value: '+7', label: '+7' },
  { countryCode: 'TM', value: '+7', label: '+7' },
  { countryCode: 'UZ', value: '+7', label: '+7' },
  { countryCode: 'EG', value: '+20', label: '+20' },
  { countryCode: 'ZA', value: '+27', label: '+27' },
  { countryCode: 'GR', value: '+30', label: '+30' },
  { countryCode: 'NL', value: '+31', label: '+31' },
  { countryCode: 'BE', value: '+32', label: '+32' },
  { countryCode: 'FR', value: '+33', label: '+33' },
  { countryCode: 'ES', value: '+34', label: '+34' },
  { countryCode: 'HU', value: '+36', label: '+36' },
  { countryCode: 'IT', value: '+39', label: '+39' },
  { countryCode: 'RO', value: '+40', label: '+40' },
  { countryCode: 'CH', value: '+41', label: '+41' },
  { countryCode: 'CZ', value: '+42', label: '+42' },
  { countryCode: 'AT', value: '+43', label: '+43' },
  { countryCode: 'GB', value: '+44', label: '+44' },
  { countryCode: 'DK', value: '+45', label: '+45' },
  { countryCode: 'SE', value: '+46', label: '+46' },
  { countryCode: 'NO', value: '+47', label: '+47' },
  { countryCode: 'PL', value: '+48', label: '+48' },
  { countryCode: 'DE', value: '+49', label: '+49' },
  { countryCode: 'PE', value: '+51', label: '+51' },
  { countryCode: 'MX', value: '+52', label: '+52' },
  { countryCode: 'CU', value: '+53', label: '+53' },
  { countryCode: 'AR', value: '+54', label: '+54' },
  { countryCode: 'BR', value: '+55', label: '+55' },
  { countryCode: 'CL', value: '+56', label: '+56' },
  { countryCode: 'CO', value: '+57', label: '+57' },
  { countryCode: 'VE', value: '+58', label: '+58' },
  { countryCode: 'MY', value: '+60', label: '+60' },
  { countryCode: 'AU', value: '+61', label: '+61' },
  { countryCode: 'ID', value: '+62', label: '+62' },
  { countryCode: 'PH', value: '+63', label: '+63' },
  { countryCode: 'NZ', value: '+64', label: '+64' },
  { countryCode: 'SG', value: '+65', label: '+65' },
  { countryCode: 'TH', value: '+66', label: '+66' },
  { countryCode: 'JP', value: '+81', label: '+81' },
  { countryCode: 'KR', value: '+82', label: '+82' },
  { countryCode: 'VN', value: '+84', label: '+84' },
  { countryCode: 'VG', value: '+84', label: '+1284' },
  { countryCode: 'VI', value: '+84', label: '+1340' },
  { countryCode: 'CN', value: '+86', label: '+86' },
  { countryCode: 'TR', value: '+90', label: '+90' },
  { countryCode: 'IN', value: '+91', label: '+91' },
  { countryCode: 'LK', value: '+94', label: '+94' },
  { countryCode: 'MN', value: '+95', label: '+95' },
  { countryCode: 'IR', value: '+98', label: '+98' },
  { countryCode: 'BS', value: '+1242', label: '+1242' },
  { countryCode: 'BB', value: '+1246', label: '+1246' },
  { countryCode: 'AI', value: '+1264', label: '+1264' },
  { countryCode: 'AG', value: '+1268', label: '+1268' },
  { countryCode: 'KY', value: '+1345', label: '+1345' },
  { countryCode: 'BM', value: '+1441', label: '+1441' },
  { countryCode: 'GD', value: '+1473', label: '+1473' },
  { countryCode: 'TC', value: '+1649', label: '+1649' },
  { countryCode: 'MS', value: '+1664', label: '+1664' },
  { countryCode: 'SC', value: '+1758', label: '+1758' },
  { countryCode: 'PR', value: '+1787', label: '+1787' },
  { countryCode: 'DM', value: '+1809', label: '+1809' },
  { countryCode: 'DO', value: '+1809', label: '+1809' },
  { countryCode: 'KN', value: '+1869', label: '+1869' },
  { countryCode: 'TT', value: '+1868', label: '+1868' },
  { countryCode: 'JM', value: '+1876', label: '+1876' },
  { countryCode: 'MA', value: '+212', label: '+212' },
  { countryCode: 'DZ', value: '+213', label: '+213' },
  { countryCode: 'TN', value: '+216', label: '+216' },
  { countryCode: 'LY', value: '+218', label: '+218' },
  { countryCode: 'GM', value: '+220', label: '+220' },
  { countryCode: 'SN', value: '+221', label: '+221' },
  { countryCode: 'MR', value: '+222', label: '+222' },
  { countryCode: 'ML', value: '+223', label: '+223' },
  { countryCode: 'GN', value: '+224', label: '+224' },
  { countryCode: 'BF', value: '+226', label: '+226' },
  { countryCode: 'NE', value: '+227', label: '+227' },
  { countryCode: 'TG', value: '+228', label: '+228' },
  { countryCode: 'BJ', value: '+229', label: '+229' },
  { countryCode: 'LR', value: '+231', label: '+231' },
  { countryCode: 'SL', value: '+232', label: '+232' },
  { countryCode: 'GH', value: '+233', label: '+233' },
  { countryCode: 'NG', value: '+234', label: '+234' },
  { countryCode: 'CF', value: '+236', label: '+236' },
  { countryCode: 'CM', value: '+237', label: '+237' },
  { countryCode: 'CV', value: '+238', label: '+238' },
  { countryCode: 'ST', value: '+239', label: '+239' },
  { countryCode: 'GQ', value: '+240', label: '+240' },
  { countryCode: 'GA', value: '+241', label: '+241' },
  { countryCode: 'CG', value: '+242', label: '+242' },
  { countryCode: 'AO', value: '+244', label: '+244' },
  { countryCode: 'GW', value: '+245', label: '+245' },
  { countryCode: 'SC', value: '+248', label: '+248' },
  { countryCode: 'SD', value: '+249', label: '+249' },
  { countryCode: 'RW', value: '+250', label: '+250' },
  { countryCode: 'ET', value: '+251', label: '+251' },
  { countryCode: 'SO', value: '+252', label: '+252' },
  { countryCode: 'DJ', value: '+253', label: '+253' },
  { countryCode: 'KE', value: '+254', label: '+254' },
  { countryCode: 'UG', value: '+256', label: '+256' },
  { countryCode: 'BI', value: '+257', label: '+257' },
  { countryCode: 'MZ', value: '+258', label: '+258' },
  { countryCode: 'ZM', value: '+260', label: '+260' },
  { countryCode: 'MG', value: '+261', label: '+261' },
  { countryCode: 'RE', value: '+262', label: '+262' },
  { countryCode: 'ZW', value: '+263', label: '+263' },
  { countryCode: 'NA', value: '+264', label: '+264' },
  { countryCode: 'MW', value: '+265', label: '+265' },
  { countryCode: 'LS', value: '+266', label: '+266' },
  { countryCode: 'BW', value: '+267', label: '+267' },
  { countryCode: 'SZ', value: '+268', label: '+268' },
  { countryCode: 'KM', value: '+269', label: '+269' },
  { countryCode: 'YT', value: '+269', label: '+269' },
  { countryCode: 'SH', value: '+290', label: '+290' },
  { countryCode: 'ER', value: '+291', label: '+291' },
  { countryCode: 'AW', value: '+297', label: '+297' },
  { countryCode: 'FO', value: '+298', label: '+298' },
  { countryCode: 'GL', value: '+299', label: '+299' },
  { countryCode: 'GI', value: '+350', label: '+350' },
  { countryCode: 'PT', value: '+351', label: '+351' },
  { countryCode: 'LU', value: '+352', label: '+352' },
  { countryCode: 'IE', value: '+353', label: '+353' },
  { countryCode: 'IS', value: '+354', label: '+354' },
  { countryCode: 'MT', value: '+356', label: '+356' },
  { countryCode: 'CY', value: '+357', label: '+357' },
  { countryCode: 'FI', value: '+358', label: '+358' },
  { countryCode: 'BG', value: '+359', label: '+359' },
  { countryCode: 'LT', value: '+370', label: '+370' },
  { countryCode: 'LV', value: '+371', label: '+371' },
  { countryCode: 'EE', value: '+372', label: '+372' },
  { countryCode: 'MD', value: '+373', label: '+373' },
  { countryCode: 'AM', value: '+374', label: '+374' },
  { countryCode: 'BY', value: '+375', label: '+375' },
  { countryCode: 'AD', value: '+376', label: '+376' },
  { countryCode: 'MC', value: '+377', label: '+377' },
  { countryCode: 'SM', value: '+378', label: '+378' },
  { countryCode: 'VA', value: '+379', label: '+379' },
  { countryCode: 'UA', value: '+380', label: '+380' },
  { countryCode: 'CS', value: '+381', label: '+381' },
  { countryCode: 'HR', value: '+385', label: '+385' },
  { countryCode: 'SI', value: '+386', label: '+386' },
  { countryCode: 'BA', value: '+387', label: '+387' },
  { countryCode: 'MK', value: '+389', label: '+389' },
  { countryCode: 'LI', value: '+417', label: '+417' },
  { countryCode: 'SK', value: '+421', label: '+421' },
  { countryCode: 'FK', value: '+500', label: '+500' },
  { countryCode: 'BZ', value: '+501', label: '+501' },
  { countryCode: 'GT', value: '+502', label: '+502' },
  { countryCode: 'SV', value: '+503', label: '+503' },
  { countryCode: 'HN', value: '+504', label: '+504' },
  { countryCode: 'NI', value: '+505', label: '+505' },
  { countryCode: 'CR', value: '+506', label: '+506' },
  { countryCode: 'PA', value: '+507', label: '+507' },
  { countryCode: 'HT', value: '+509', label: '+509' },
  { countryCode: 'GP', value: '+590', label: '+590' },
  { countryCode: 'BO', value: '+591', label: '+591' },
  { countryCode: 'GY', value: '+592', label: '+592' },
  { countryCode: 'EC', value: '+593', label: '+593' },
  { countryCode: 'GF', value: '+594', label: '+594' },
  { countryCode: 'PY', value: '+595', label: '+595' },
  { countryCode: 'MQ', value: '+596', label: '+596' },
  { countryCode: 'SR', value: '+597', label: '+597' },
  { countryCode: 'UY', value: '+598', label: '+598' },
  { countryCode: 'NP', value: '+670', label: '+670' },
  { countryCode: 'GU', value: '+671', label: '+671' },
  { countryCode: 'NF', value: '+672', label: '+672' },
  { countryCode: 'BN', value: '+673', label: '+673' },
  { countryCode: 'NR', value: '+674', label: '+674' },
  { countryCode: 'PG', value: '+675', label: '+675' },
  { countryCode: 'TO', value: '+676', label: '+676' },
  { countryCode: 'SB', value: '+677', label: '+677' },
  { countryCode: 'VU', value: '+678', label: '+678' },
  { countryCode: 'FJ', value: '+679', label: '+679' },
  { countryCode: 'PW', value: '+680', label: '+680' },
  { countryCode: 'WF', value: '+681', label: '+681' },
  { countryCode: 'CK', value: '+682', label: '+682' },
  { countryCode: 'NU', value: '+683', label: '+683' },
  { countryCode: 'KI', value: '+686', label: '+686' },
  { countryCode: 'NC', value: '+687', label: '+687' },
  { countryCode: 'TV', value: '+688', label: '+688' },
  { countryCode: 'PF', value: '+689', label: '+689' },
  { countryCode: 'FM', value: '+691', label: '+691' },
  { countryCode: 'MH', value: '+692', label: '+692' },
  { countryCode: 'GE', value: '+7880', label: '+7880' },
  { countryCode: 'KP', value: '+850', label: '+850' },
  { countryCode: 'HK', value: '+852', label: '+852' },
  { countryCode: 'MO', value: '+853', label: '+853' },
  { countryCode: 'KH', value: '+855', label: '+855' },
  { countryCode: 'LA', value: '+856', label: '+856' },
  { countryCode: 'BD', value: '+880', label: '+880' },
  { countryCode: 'TW', value: '+886', label: '+886' },
  { countryCode: 'CY', value: '+90392', label: '+90392' },
  { countryCode: 'MV', value: '+960', label: '+960' },
  { countryCode: 'LB', value: '+961', label: '+961' },
  { countryCode: 'JO', value: '+962', label: '+962' },
  { countryCode: 'SI', value: '+963', label: '+963' },
  { countryCode: 'IQ', value: '+964', label: '+964' },
  { countryCode: 'KW', value: '+965', label: '+965' },
  { countryCode: 'SA', value: '+966', label: '+966' },
  { countryCode: 'YE', value: '+967', label: '+967' },
  { countryCode: 'OM', value: '+968', label: '+968' },
  { countryCode: 'YE', value: '+969', label: '+969' },
  { countryCode: 'AE', value: '+971', label: '+971' },
  { countryCode: 'IL', value: '+972', label: '+972' },
  { countryCode: 'BH', value: '+973', label: '+973' },
  { countryCode: 'QA', value: '+974', label: '+974' },
  { countryCode: 'BT', value: '+975', label: '+975' },
  { countryCode: 'MN', value: '+976', label: '+976' },
  { countryCode: 'NP', value: '+977', label: '+977' },
  { countryCode: 'TM', value: '+993', label: '+993' },
  { countryCode: 'AZ', value: '+994', label: '+994' },
  { countryCode: 'KG', value: '+996', label: '+996' },
];

export const countryAllOptions = [
  {
    value: '',
    label: 'Select Country',
  },
  {
    value: 'Afghanistan',
    label: 'Afghanistan',
  },
  {
    value: 'Albania',
    label: 'Albania',
  },
  {
    value: 'Algeria',
    label: 'Algeria',
  },
  {
    value: 'American Samoa',
    label: 'American Samoa',
  },
  {
    value: 'Andorra',
    label: 'Andorra',
  },
  {
    value: 'Angola',
    label: 'Angola',
  },
  {
    value: 'Anguilla',
    label: 'Anguilla',
  },
  {
    value: 'Antartica',
    label: 'Antarctica',
  },
  {
    value: 'Antigua and Barbuda',
    label: 'Antigua and Barbuda',
  },
  {
    value: 'Argentina',
    label: 'Argentina',
  },
  {
    value: 'Armenia',
    label: 'Armenia',
  },
  {
    value: 'Aruba',
    label: 'Aruba',
  },
  {
    value: 'Australia',
    label: 'Australia',
  },
  {
    value: 'Austria',
    label: 'Austria',
  },
  {
    value: 'Azerbaijan',
    label: 'Azerbaijan',
  },
  {
    value: 'Bahamas',
    label: 'Bahamas',
  },
  {
    value: 'Bahrain',
    label: 'Bahrain',
  },
  {
    value: 'Bangladesh',
    label: 'Bangladesh',
  },
  {
    value: 'Barbados',
    label: 'Barbados',
  },
  {
    value: 'Belarus',
    label: 'Belarus',
  },
  {
    value: 'Belgium',
    label: 'Belgium',
  },
  {
    value: 'Belize',
    label: 'Belize',
  },
  {
    value: 'Benin',
    label: 'Benin',
  },
  {
    value: 'Bermuda',
    label: 'Bermuda',
  },
  {
    value: 'Bhutan',
    label: 'Bhutan',
  },
  {
    value: 'Bolivia',
    label: 'Bolivia',
  },
  {
    value: 'Bosnia and Herzegowina',
    label: 'Bosnia and Herzegowina',
  },
  {
    value: 'Botswana',
    label: 'Botswana',
  },
  {
    value: 'Bouvet Island',
    label: 'Bouvet Island',
  },
  {
    value: 'Brazil',
    label: 'Brazil',
  },
  {
    value: 'British Indian Ocean Territory',
    label: 'British Indian Ocean Territory',
  },
  {
    value: 'Brunei Darussalam',
    label: 'Brunei Darussalam',
  },
  {
    value: 'Bulgaria',
    label: 'Bulgaria',
  },
  {
    value: 'Burkina Faso',
    label: 'Burkina Faso',
  },
  {
    value: 'Burundi',
    label: 'Burundi',
  },
  {
    value: 'Cambodia',
    label: 'Cambodia',
  },
  {
    value: 'Cameroon',
    label: 'Cameroon',
  },
  {
    value: 'Canada',
    label: 'Canada',
  },
  {
    value: 'Cape Verde',
    label: 'Cape Verde',
  },
  {
    value: 'Cayman Islands',
    label: 'Cayman Islands',
  },
  {
    value: 'Central African Republic',
    label: 'Central African Republic',
  },
  {
    value: 'Chad',
    label: 'Chad',
  },
  {
    value: 'Chile',
    label: 'Chile',
  },
  {
    value: 'China',
    label: 'China',
  },
  {
    value: 'Christmas Island',
    label: 'Christmas Island',
  },
  {
    value: 'Cocos Islands',
    label: 'Cocos (Keeling) Islands',
  },
  {
    value: 'Colombia',
    label: 'Colombia',
  },
  {
    value: 'Comoros',
    label: 'Comoros',
  },
  {
    value: 'Congo',
    label: 'Congo',
  },
  {
    value: 'Congo',
    label: 'Congo, the Democratic Republic of the',
  },
  {
    value: 'Cook Islands',
    label: 'Cook Islands',
  },
  {
    value: 'Costa Rica',
    label: 'Costa Rica',
  },
  {
    value: "Cota D'Ivoire",
    label: "Cote d'Ivoire",
  },
  {
    value: 'Croatia',
    label: 'Croatia (Hrvatska)',
  },
  {
    value: 'Cuba',
    label: 'Cuba',
  },
  {
    value: 'Cyprus',
    label: 'Cyprus',
  },
  {
    value: 'Czech Republic',
    label: 'Czech Republic',
  },
  {
    value: 'Denmark',
    label: 'Denmark',
  },
  {
    value: 'Djibouti',
    label: 'Djibouti',
  },
  {
    value: 'Dominica',
    label: 'Dominica',
  },
  {
    value: 'Dominican Republic',
    label: 'Dominican Republic',
  },
  {
    value: 'East Timor',
    label: 'East Timor',
  },
  {
    value: 'Ecuador',
    label: 'Ecuador',
  },
  {
    value: 'Egypt',
    label: 'Egypt',
  },
  {
    value: 'El Salvador',
    label: 'El Salvador',
  },
  {
    value: 'Equatorial Guinea',
    label: 'Equatorial Guinea',
  },
  {
    value: 'Eritrea',
    label: 'Eritrea',
  },
  {
    value: 'Estonia',
    label: 'Estonia',
  },
  {
    value: 'Ethiopia',
    label: 'Ethiopia',
  },
  {
    value: 'Falkland Islands',
    label: 'Falkland Islands (Malvinas)',
  },
  {
    value: 'Faroe Islands',
    label: 'Faroe Islands',
  },
  {
    value: 'Fiji',
    label: 'Fiji',
  },
  {
    value: 'Finland',
    label: 'Finland',
  },
  {
    value: 'France',
    label: 'France',
  },
  {
    value: 'France Metropolitan',
    label: 'France, Metropolitan',
  },
  {
    value: 'French Guiana',
    label: 'French Guiana',
  },
  {
    value: 'French Polynesia',
    label: 'French Polynesia',
  },
  {
    value: 'French Southern Territories',
    label: 'French Southern Territories',
  },
  {
    value: 'Gabon',
    label: 'Gabon',
  },
  {
    value: 'Gambia',
    label: 'Gambia',
  },
  {
    value: 'Georgia',
    label: 'Georgia',
  },
  {
    value: 'Germany',
    label: 'Germany',
  },
  {
    value: 'Ghana',
    label: 'Ghana',
  },
  {
    value: 'Gibraltar',
    label: 'Gibraltar',
  },
  {
    value: 'Greece',
    label: 'Greece',
  },
  {
    value: 'Greenland',
    label: 'Greenland',
  },
  {
    value: 'Grenada',
    label: 'Grenada',
  },
  {
    value: 'Guadeloupe',
    label: 'Guadeloupe',
  },
  {
    value: 'Guam',
    label: 'Guam',
  },
  {
    value: 'Guatemala',
    label: 'Guatemala',
  },
  {
    value: 'Guinea',
    label: 'Guinea',
  },
  {
    value: 'Guinea-Bissau',
    label: 'Guinea-Bissau',
  },
  {
    value: 'Guyana',
    label: 'Guyana',
  },
  {
    value: 'Haiti',
    label: 'Haiti',
  },
  {
    value: 'Heard and McDonald Islands',
    label: 'Heard and Mc Donald Islands',
  },
  {
    value: 'Holy See',
    label: 'Holy See (Vatican City State)',
  },
  {
    value: 'Honduras',
    label: 'Honduras',
  },
  {
    value: 'Hong Kong',
    label: 'Hong Kong',
  },
  {
    value: 'Hungary',
    label: 'Hungary',
  },
  {
    value: 'Iceland',
    label: 'Iceland',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Indonesia',
    label: 'Indonesia',
  },
  {
    value: 'Iran',
    label: 'Iran (Islamic Republic of)',
  },
  {
    value: 'Iraq',
    label: 'Iraq',
  },
  {
    value: 'Ireland',
    label: 'Ireland',
  },
  {
    value: 'Israel',
    label: 'Israel',
  },
  {
    value: 'Italy',
    label: 'Italy',
  },
  {
    value: 'Jamaica',
    label: 'Jamaica',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'Jordan',
    label: 'Jordan',
  },
  {
    value: 'Kazakhstan',
    label: 'Kazakhstan',
  },
  {
    value: 'Kenya',
    label: 'Kenya',
  },
  {
    value: 'Kiribati',
    label: 'Kiribati',
  },
  {
    value: "Democratic People's Republic of Korea",
    label: "Korea, Democratic People's Republic of",
  },
  {
    value: 'Korea',
    label: 'Korea, Republic of',
  },
  {
    value: 'Kuwait',
    label: 'Kuwait',
  },
  {
    value: 'Kyrgyzstan',
    label: 'Kyrgyzstan',
  },
  {
    value: 'Lao',
    label: "Lao People's Democratic Republic",
  },
  {
    value: 'Latvia',
    label: 'Latvia',
  },
  {
    value: 'Lebanon',
    label: 'Lebanon',
  },
  {
    value: 'Lesotho',
    label: 'Lesotho',
  },
  {
    value: 'Liberia',
    label: 'Liberia',
  },
  {
    value: 'Libyan Arab Jamahiriya',
    label: 'Libyan Arab Jamahiriya',
  },
  {
    value: 'Liechtenstein',
    label: 'Liechtenstein',
  },
  {
    value: 'Lithuania',
    label: 'Lithuania',
  },
  {
    value: 'Luxembourg',
    label: 'Luxembourg',
  },
  {
    value: 'Macau',
    label: 'Macau',
  },
  {
    value: 'Macedonia',
    label: 'Macedonia, The Former Yugoslav Republic of',
  },
  {
    value: 'Madagascar',
    label: 'Madagascar',
  },
  {
    value: 'Malawi',
    label: 'Malawi',
  },
  {
    value: 'Malaysia',
    label: 'Malaysia',
  },
  {
    value: 'Maldives',
    label: 'Maldives',
  },
  {
    value: 'Mali',
    label: 'Mali',
  },
  {
    value: 'Malta',
    label: 'Malta',
  },
  {
    value: 'Marshall Islands',
    label: 'Marshall Islands',
  },
  {
    value: 'Martinique',
    label: 'Martinique',
  },
  {
    value: 'Mauritania',
    label: 'Mauritania',
  },
  {
    value: 'Mauritius',
    label: 'Mauritius',
  },
  {
    value: 'Mayotte',
    label: 'Mayotte',
  },
  {
    value: 'Mexico',
    label: 'Mexico',
  },
  {
    value: 'Micronesia',
    label: 'Micronesia, Federated States of',
  },
  {
    value: 'Moldova',
    label: 'Moldova, Republic of',
  },
  {
    value: 'Monaco',
    label: 'Monaco',
  },
  {
    value: 'Mongolia',
    label: 'Mongolia',
  },
  {
    value: 'Montserrat',
    label: 'Montserrat',
  },
  {
    value: 'Morocco',
    label: 'Morocco',
  },
  {
    value: 'Mozambique',
    label: 'Mozambique',
  },
  {
    value: 'Myanmar',
    label: 'Myanmar',
  },
  {
    value: 'Namibia',
    label: 'Namibia',
  },
  {
    value: 'Nauru',
    label: 'Nauru',
  },
  {
    value: 'Nepal',
    label: 'Nepal',
  },
  {
    value: 'Netherlands',
    label: 'Netherlands',
  },
  {
    value: 'Netherlands Antilles',
    label: 'Netherlands Antilles',
  },
  {
    value: 'New Caledonia',
    label: 'New Caledonia',
  },
  {
    value: 'New Zealand',
    label: 'New Zealand',
  },
  {
    value: 'Nicaragua',
    label: 'Nicaragua',
  },
  {
    value: 'Niger',
    label: 'Niger',
  },
  {
    value: 'Nigeria',
    label: 'Nigeria',
  },
  {
    value: 'Niue',
    label: 'Niue',
  },
  {
    value: 'Norfolk Island',
    label: 'Norfolk Island',
  },
  {
    value: 'Northern Mariana Islands',
    label: 'Northern Mariana Islands',
  },
  {
    value: 'Norway',
    label: 'Norway',
  },
  {
    value: 'Oman',
    label: 'Oman',
  },
  {
    value: 'Pakistan',
    label: 'Pakistan',
  },
  {
    value: 'Palau',
    label: 'Palau',
  },
  {
    value: 'Panama',
    label: 'Panama',
  },
  {
    value: 'Papua New Guinea',
    label: 'Papua New Guinea',
  },
  {
    value: 'Paraguay',
    label: 'Paraguay',
  },
  {
    value: 'Peru',
    label: 'Peru',
  },
  {
    value: 'Philippines',
    label: 'Philippines',
  },
  {
    value: 'Pitcairn',
    label: 'Pitcairn',
  },
  {
    value: 'Poland',
    label: 'Poland',
  },
  {
    value: 'Portugal',
    label: 'Portugal',
  },
  {
    value: 'Puerto Rico',
    label: 'Puerto Rico',
  },
  {
    value: 'Qatar',
    label: 'Qatar',
  },
  {
    value: 'Reunion',
    label: 'Reunion',
  },
  {
    value: 'Romania',
    label: 'Romania',
  },
  {
    value: 'Russia',
    label: 'Russian Federation',
  },
  {
    value: 'Rwanda',
    label: 'Rwanda',
  },
  {
    value: 'Saint Kitts and Nevis',
    label: 'Saint Kitts and Nevis',
  },
  {
    value: 'Saint LUCIA',
    label: 'Saint LUCIA',
  },
  {
    value: 'Saint Vincent',
    label: 'Saint Vincent and the Grenadines',
  },
  {
    value: 'Samoa',
    label: 'Samoa',
  },
  {
    value: 'San Marino',
    label: 'San Marino',
  },
  {
    value: 'Sao Tome and Principe',
    label: 'Sao Tome and Principe',
  },
  {
    value: 'Saudi Arabia',
    label: 'Saudi Arabia',
  },
  {
    value: 'Senegal',
    label: 'Senegal',
  },
  {
    value: 'Seychelles',
    label: 'Seychelles',
  },
  {
    value: 'Sierra',
    label: 'Sierra Leone',
  },
  {
    value: 'Singapore',
    label: 'Singapore',
  },
  {
    value: 'Slovakia',
    label: 'Slovakia (Slovak Republic)',
  },
  {
    value: 'Slovenia',
    label: 'Slovenia',
  },
  {
    value: 'Solomon Islands',
    label: 'Solomon Islands',
  },
  {
    value: 'Somalia',
    label: 'Somalia',
  },
  {
    value: 'South Africa',
    label: 'South Africa',
  },
  {
    value: 'South Georgia',
    label: 'South Georgia and the South Sandwich Islands',
  },
  {
    value: 'Span',
    label: 'Spain',
  },
  {
    value: 'SriLanka',
    label: 'Sri Lanka',
  },
  {
    value: 'St. Helena',
    label: 'St. Helena',
  },
  {
    value: 'St. Pierre and Miguelon',
    label: 'St. Pierre and Miquelon',
  },
  {
    value: 'Sudan',
    label: 'Sudan',
  },
  {
    value: 'Suriname',
    label: 'Suriname',
  },
  {
    value: 'Svalbard',
    label: 'Svalbard and Jan Mayen Islands',
  },
  {
    value: 'Swaziland',
    label: 'Swaziland',
  },
  {
    value: 'Sweden',
    label: 'Sweden',
  },
  {
    value: 'Switzerland',
    label: 'Switzerland',
  },
  {
    value: 'Syria',
    label: 'Syrian Arab Republic',
  },
  {
    value: 'Taiwan',
    label: 'Taiwan, Province of China',
  },
  {
    value: 'Tajikistan',
    label: 'Tajikistan',
  },
  {
    value: 'Tanzania',
    label: 'Tanzania, United Republic of',
  },
  {
    value: 'Thailand',
    label: 'Thailand',
  },
  {
    value: 'Togo',
    label: 'Togo',
  },
  {
    value: 'Tokelau',
    label: 'Tokelau',
  },
  {
    value: 'Tonga',
    label: 'Tonga',
  },
  {
    value: 'Trinidad and Tobago',
    label: 'Trinidad and Tobago',
  },
  {
    value: 'Tunisia',
    label: 'Tunisia',
  },
  {
    value: 'Turkey',
    label: 'Turkey',
  },
  {
    value: 'Turkmenistan',
    label: 'Turkmenistan',
  },
  {
    value: 'Turks and Caicos',
    label: 'Turks and Caicos Islands',
  },
  {
    value: 'Tuvalu',
    label: 'Tuvalu',
  },
  {
    value: 'Uganda',
    label: 'Uganda',
  },
  {
    value: 'Ukraine',
    label: 'Ukraine',
  },
  {
    value: 'United Arab Emirates',
    label: 'United Arab Emirates',
  },
  {
    value: 'United Kingdom',
    label: 'United Kingdom',
  },
  {
    value: 'United States',
    label: 'United States',
  },
  {
    value: 'United States Minor Outlying Islands',
    label: 'United States Minor Outlying Islands',
  },
  {
    value: 'Uruguay',
    label: 'Uruguay',
  },
  {
    value: 'Uzbekistan',
    label: 'Uzbekistan',
  },
  {
    value: 'Vanuatu',
    label: 'Vanuatu',
  },
  {
    value: 'Venezuela',
    label: 'Venezuela',
  },
  {
    value: 'Vietnam',
    label: 'Viet Nam',
  },
  {
    value: 'Virgin Islands (British)',
    label: 'Virgin Islands (British)',
  },
  {
    value: 'Virgin Islands (U.S)',
    label: 'Virgin Islands (U.S.)',
  },
  {
    value: 'Wallis and Futana Islands',
    label: 'Wallis and Futuna Islands',
  },
  {
    value: 'Western Sahara',
    label: 'Western Sahara',
  },
  {
    value: 'Yemen',
    label: 'Yemen',
  },
  {
    value: 'Serbia',
    label: 'Serbia',
  },
  {
    value: 'Zambia',
    label: 'Zambia',
  },
  {
    value: 'Zimbabwe',
    label: 'Zimbabwe',
  },
];

export const tenantinActiveApiResCode700 = '700';

export const urlSideBar = name => {
  switch (name) {
    case 'Dashboard':
      return '/dashboard';
    case 'Locate':
      return '/user-view-locate';
    case 'Book':
      return '#';
    case 'Team':
      return '/team-list';
    case 'People':
      return '/hr-module';
    case 'General_settings':
      return '/company-settings';
    case 'Location_settings':
      // return "/admin-settings-location-global";
      return '/admin-settings-location';
    case 'User_settings':
      return '/admin-user-management';
    case 'Team_settings':
      return '/admin-teams-management';
    case 'People_settings':
      return '/hr-settings';
    case 'HR_request':
      return '/hr-request';
    case 'Asset_settings':
      return '/admin-settings-asset-management';
    case 'Floorplan_management':
      return '/admin-settings-floor-management';
    case 'tenant_settings':
      return '/super-admin/tenant-settings';
    case 'global_asset_types':
      return '/super-admin/global-asset';
    case 'global_environment_settings':
      return '/super-admin/global-environment';
    case 'global_hs_roles':
      return '/super-admin/global-roles';
    case 'user_settings':
      return '/super-admin/user-management';
    case 'Wellbeing':
      return '#';
    case 'Plan':
      return '/plan';
    case 'Reports':
      return '#';
    case 'Analytics':
      return '/analytics';
    case 'FloorPlan_Settings':
      return '#';
    case 'Billing':
      return '#';
    default:
      return '';
  }
};

export const selectedTypes = [
  {
    status: 'Available',
    containerStyle: 'booking-grid booking-grid-available',
    indicationStyle: 'book-success',
  },
  {
    status: 'Booked',
    containerStyle: 'booking-grid booking-grid-booked',
    indicationStyle: 'book-danger',
  },
  {
    status: 'Unavailable',
    containerStyle: 'booking-grid booking-grid-unavailable',
    indicationStyle: 'book-gray',
  },
  {
    status: 'By request',
    containerStyle: 'booking-grid booking-grid-request',
    indicationStyle: 'book-warning',
  },
  {
    status: 'Booked by me',
    containerStyle: 'booking-grid booking-grid-booked-me',
    indicationStyle: 'book-primary',
  },
  {
    status: 'Unknown',
    containerStyle: 'booking-grid booking-grid-unavailable',
    indicationStyle: 'book-gray',
  },
  {
    status: 'In Office',
    containerStyle: 'booking-grid booking-grid-available',
    indicationStyle: 'book-success',
  },
  {
    status: 'Out Office',
    containerStyle: 'booking-grid booking-grid-unavailable',
    indicationStyle: 'book-gray',
  },
  {
    status: 'Remote',
    containerStyle: 'booking-grid booking-grid-request',
    indicationStyle: 'book-warning',
  },
  {
    status: 'Booking',
    containerStyle: 'booking-grid booking-grid-booked-me',
    indicationStyle: 'book-primary',
  },
];

export const listOfBoxStyle = [
  { calssName: 'btn booking-dark-gray', status: 'Unavailable' },
  // {calssName:"btn booking-dark-green",status:"Available"},
  { calssName: 'btn booking-light-green', status: 'Available' },
  // {calssName:"btn booking-light-gray",status:"Unavailable"},
  { calssName: 'btn booking-light-orange', status: 'By request' },
  { calssName: 'btn booking-dark-red', status: 'Booked' },
  { calssName: 'btn booking-light-blue', status: 'Booked by me' },
  { calssName: 'btn booking-light-gray', status: 'Unknown' },
  { calssName: 'btn booking-light-blue', status: 'Booking' },
  { calssName: 'btn booking-light-green', status: 'In Office' },
  { calssName: 'btn booking-light-orange', status: 'Remote' },
  { calssName: 'btn booking-light-white', status: 'Out Office' },
  { calssName: 'btn booking-light-white', status: 'Requested by me' },
];

export const hrSettingsTabListOption = [
  { name: 'Leave types', image: hr_timeOffTypes, type: 'TT' },
  { name: 'Leave profiles', image: hr_timeOffProfile, type: 'TP' },
  { name: 'Permission', image: hr_permision, type: 'P' },
];

export const hrPermissionTabListOption = [
  { name: 'Leave', image: hrIcon1, type: 'leave', key: 'leave' },
  { name: 'Personal', image: hrIcon3, type: 'personal', key: 'personal' },
  { name: 'Job', image: hrIcon4, type: 'job', key: 'job' },
  {
    name: 'Preferences',
    image: hrIcon5,
    type: 'preferences',
    key: 'prefrence',
  },
  { name: 'Benefits', image: hrIcon6, type: 'benefits', key: 'benefits' },
  { name: '-', image: hrIcon9, type: '-', key: 'leave' },
  { name: 'Assets', image: hrIcon7, type: 'assets', key: 'asset' },
  { name: 'Notices', image: hrIcon8, type: 'notices', key: 'notices' },
];

export const selectedPermission = {
  lock: 0,
  view: 1,
  edit: 2,
};

export const employeesGroupPermissionAccess = [
  { value: 'Their primary team', label: 'Their primary team', id: 1 },
  { value: 'Everyone else', label: 'Everyone else', id: 2 },
  { value: 'Direct reports', label: 'Direct reports', id: 3 },
  { value: 'All who report to me', label: 'All who report to me', id: 4 },
];

export const permissionGroupAccessType = {
  otherEmployees: 0,
  themselves: 1,
};

export const companySettingTabList = [
  { name: 'Company settings', type: '1', image: setting_icon },
  { name: 'Password management', type: '2', image: carbon_security },
  { name: 'Status types', type: '3', image: status_icon },
];

export const personalSectionKeys = {
  employeeId: 'employee_id',
  first_name: 'first_name',
  last_name: 'last_name',
  middle_name: 'middle_name',
  display_name: 'display_name',
  birth_date: 'birth_date',
  marital_status: 'marital_status',
  gender: 'gender',
  pronoun: 'pronoun',
  nationality: 'nationality',
  about: 'about',
  address1: 'address1',
  address2: 'address2',
  city: 'city',
  state: 'state',
  zipcode: 'zipcode',
  country: 'country',
  home_phone: 'home_phone',
  personal_mobile: 'personal_mobile',
  personal_email: 'personal_email',
  details: 'Details',
  create: 'Create',
  edit: 'Edit',
};

export const sectionNames = {
  basic_information: 'basic_information',
  home_address: 'home_address',
  emergency_contact: 'emergency_contact',
  education: 'education',
  certification: 'certification',
  identification: 'identification',
  visa: 'visa',
  clearance: 'clearance',
  vaccination: 'vaccination',
  preference_details: 'prefrence_details',
  leave: 'leave_details',
  benefits_details: 'benefits_details',
  asset_details: 'asset_details',
};

export const basicIndormationKeys = {
  employeeId: 'employee_id',
  first_name: 'first_name',
  last_name: 'last_name',
  middle_name: 'middle_name',
  display_name: 'display_name',
  birth_date: 'birth_date',
  marital_status: 'marital_status',
  gender: 'gender',
  pronoun: 'pronoun',
  nationality: 'nationality',
  about: 'about',
};

export const homeAddressKeys = {
  address1: 'address1',
  address2: 'address2',
  city: 'city',
  state: 'state',
  zipcode: 'zipcode',
  country: 'country',
  home_phone: 'home_phone',
  personal_mobile: 'personal_mobile',
  personal_email: 'personal_email',
};

export const emergencyContactKeys = {
  details: 'Details',
  create: 'Create',
  edit: 'Edit',
};

export const commonKeys = {
  details: 'Details',
  create: 'Create',
  edit: 'Edit',
  files: 'Files',
};
export const leaveKeys = {
  pastbooking: 'pastbooking',
  AdjustLeave: 'AdjustLeave',
  Audit: 'audit',
  BookTimeOff: 'BookTimeOff',
  upcoming: 'upcoming',
};

export const dateFormat_YYYY_MM_DD = 'YYYY-MM-DD';
export const dateFormat_DD_MM_YYYY = 'DD-MM-YYYY';
export const dateFormat_DD_MM_YYYY_with_slash = 'DD/MM/YYYY';
export const dateFormat_MM_DD_YYYY_with_slash = 'MM/DD/YYYY';
export const dateFormat_DD_MM_YYYY_with_time = 'DD/MM/YYYY HH:mm';
export const timeFormat_24 = 'HH:mm';
export const timeFormats_24 = 'hh:mm';
export const dateFormat_DD_MMM_YYYY = 'DD/MMM/YY';
export const dateFormat_ddd_Do_MMMM_YYYY = 'ddd Do, MMMM YYYY';
export const dateFormat_MMM_YYYY = 'MMM YYYY';
export const dateFormat_YYYY_MMM = 'YYYY MMM';
export const timeFormat_with_am = 'hh:mm A';
export const TIME_FORMAT = {
  twelve: '12',
  twenty_four: '24',
};
export const dateFormat_MM = 'MM';
export const dateFormat_Day = 'day';
export const dateFormat_DD_MMM = 'DD MMM';
export const dateFormat_DD_MMM_YY = 'DD MMM YY';
export const dateFormat_DD_MMM_YYYY1 = 'DD MMM YYYY';
export const dateFormat_ddd_DD_MMM = 'ddd, DD MMM';
export const dateFormat_ddd_DD_MMM_HH_MM = 'DD MMM. YYYY HH:mm';
export const dateFormat_DD_MMM_YYYY2 = 'DD MMM. YYYY';
export const dateFormat_GMT_Format = 'ddd MMM DD YYYY HH:mm:ss [GMT]Z';
export const dateFormat_YYYY_MM_DD_HH_mm_ss = 'YYYY-MM-DD HH:mm:ss';
export const dateFormat_YYYY_MM_DD_HH_mm = 'YYYY-MM-DD HH:mm';
export const dateFormat_MMM_DD = 'MMM DD';
export const dateFormat_ddd_DD = 'ddd DD';

export const StartTime = '00:01';
export const EndTime = '23:59';

export const jobSecction = {
  workinformation: 'workinformation',
  worklocation: 'worklocation',
  workhistory: 'workhistory',
  Teams: 'Teams',
  Managers: 'Managers',
  DirectReport: 'DirectReport',
  CompensationandBonus: 'CompensationandBonus',
};
export const editTypesForUserSettings = {
  permission_group: 'permission_group',
  teams: 'teams',
  secondary: 'secondary',
  hands: 'hands',
  hr_permission_group: 'hr_permission_group',
  notification: 'notification',
};
export const workinformation = {
  company_phone_extension: 'company_phone_extension',
  company_phone: 'company_phone',
  company_mobile: 'company_mobile',
  company_mobile_extension: 'company_mobile_extension',
  work_email: 'work_email',
  grade: 'grade',
  status: 'status',
  probation_end: 'probation_end',
  notice_period: 'notice_period',
  Timeoff_profile: 'Timeoff_profile',
  work_calendar: 'work_calendar',
  employee_id: 'employee_id',
  cost_center: 'cost_center',
};
export const worklocation = {
  floor: 'floor',
  Building: 'Building',
  street: 'street',
  suburb: 'suburb',
  City: 'City',
  State: 'State',
  Region: 'Region',
  Country: 'Country',
  Post_Zip_Code: 'Post/Zip Code',
  work_calendar: 'work_calendar',
  cost_center: 'cost_center',
};
export const disableBtn = {
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

export const DefaultConfigurationKeys = {
  assest: 'assest',
  location: 'location',
};

export const DateFormatList = [
  {
    id: 1,
    label: 'DD/MM/YY e.g.: 29/06/23',
    value: 'DD/MM/YY',
  },
  {
    id: 2,
    label: 'DD/MM/YYYY e.g.: 29/06/2023',
    value: 'DD/MM/YYYY',
  },
  {
    id: 3,
    label: 'MM/DD/YY e.g.: 06/29/23',
    value: 'MM/DD/YY',
  },
  {
    id: 4,
    label: 'MM/DD/YYYY e.g.: 06/29/2023',
    value: 'MM/DD/YYYY',
  },
  {
    id: 5,
    label: 'DD/MMM e.g.: 29/Jun',
    value: 'DD/MMM',
  },
  {
    id: 6,
    label: 'MMM/DD e.g.: Jun 29',
    value: 'MMM/DD',
  },
];

export const TimeFormatList = [
  {
    id: 1,
    label: '12 Hour Format with AM or PM i.e., HH:MM AM/PM e.g.: 08:00PM',
    value: '12',
    showLabel: '12 Hour',
  },
  {
    id: 2,
    label: '24 Hour Format HH:MM e.g.: 20:00',
    value: '24',
    showLabel: '24 Hour',
  },
];

export const hrPereferenceKeys = {
  Vehicle_Number: 'Vehicleregistration',
  Parking: 'Parking',
  Room: 'Room',
  workspace: 'workspace',
  Preferredworkinghours: 'Preferredworkinghours',
  user_language: 'user_language',
};
export const hrRequestStatusType = {
  awaiting_confirmation: 0,
  approved: 1,
  rejected: 2,
  pending: 3,
};

export const hrBenefitKey = {
  general_Pension: 'general_Pension',
  health_insurance: 'health_insurance',
  general_benefits: 'general_benefits',
};

export const hrAssets = {
  asset: 'asset',
};

export const DefaultUserDateTimePref = {
  date_pref: 'DD/MM/YYYY',
  time_pref: '24',
};
export const hrPermissionTabs = {
  personal: 'personal',
  job: 'job',
  preferences: 'preferences',
  benefits: 'benefits',
  assets: 'assets',
  notices: 'notices',
  leave: 'leave',
};
export const ErrorMessage = 'Something went wrong';
export const ErrorMessageForLeave =
  'You have already requested time off for this period You can continue and make another request, we are just letting you know.';
export const Errorcode = '201';

export const activityEvents = [
  'mousemove',
  'keydown',
  'click',
  'touchstart',
  'scroll',
];
export const en_us_format_date = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short',
};
