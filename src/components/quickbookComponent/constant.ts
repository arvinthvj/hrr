export enum ApiStatusCode {
  SUCCESS = 200,
}

export const QuickbookLabels = {
  chooseWorkspace: 'Choose a WorkSpace',
  chooseRoom: 'Choose a Room',
  chooseParking: 'Choose a Parking',
  chooseLocation: 'Choose location',
  description: 'Description',
  noDefaultSelected: 'No default selected',
  setDefaultDesc:
    ' To speed up the booking process, set your defaults in your settings',
  week: 'Week',
  day: 'Day',
  book: 'Book',
  warning: 'Warning',
  maxRemoteDaysWarning:
    'Request cannot be made as it exceeds the maximum allowed remote working days.',
  noDefaultAssestSelected:
    'There is no default assest selected. Are you sure you want to book for Remote?',
  cancel: 'Cancel',
  confirm: 'Confirm',
};

export const QuickbookWeekStatus = {
  inOffice: 'In Office',
  remote: 'Remote',
  outOfOffice: 'Out of Office',
  sick: 'Sick',
  vacation: 'Vacation',
  other: 'Other',
  Workspace: 'Workspace'
};

export const QuickbookValidation = {
  specialCharValidation: '^(?!s*$).+ this special characters can only accept',
  charLimitValidation: 'Maximum characters limit 150',
};

export const LocationTypes = {
  global: 'Global',
  region: 'Region',
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

export const QuickbookSelectIds = {
  workspace: 1,
  room: 2,
  parking: 3,
  remote: 4,
  sick: 6,
  vacation: 7,
  other: 8,
  clientsite: 10,
  inoffice: 11,
};

export const AssetStatusIds = {
  available: 1,
  byRequest: 2,
  unAvailable: 3,
  bookedByMe: 4,
};

export const BookInitial = 0;

export const BookingStatus = {
  booked: 1,
  unBooked: 0,
  requestBooked: 4,
};
