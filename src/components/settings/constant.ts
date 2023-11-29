export enum FloorPlanType {
  WORKSPACE = '1',
  ROOM = '2',
  PARKING = '3',
}

export enum ButtonNames {
  SAVE = 'Save',
  EDIT = 'Edit',
  VIEW_TEAM = 'View team',
  VIEW_OLDER = 'View older',
  ACTIVE = 'Active',
  CHANGE = 'Change',
}

export enum SelectStatus {
  SELECTED = '1',
  UN_SELECTED = '0',
  ACTIVE = 'active',
}

export const ProfileFields = {
  description: 'description',
  location: 'location',
  contact: 'contact',
  name: 'name',
};

export const ProfileFieldLabels = {
  about: 'About',
  contact: 'Contact',
  phone: 'Phone',
  defaultAssets: 'Default assets',
  defaultWorkHours: 'Default working hours',
  start: 'Start',
  end: 'End',
  location: 'Location',
  team: 'Team',
  vehicleRegistration: 'Vehicle Registration',
};

export const AssetNames = {
  workspaces: 'Workspaces',
  room: 'Room',
  parking: 'Parking',
};

export const ModuleName = {
  settings: 'Settings',
};

export const TabNames = {
  settings: 'Settings',
  upcomingBookings: 'Upcoming bookings',
  profile: 'Profile',
  organisation: 'Organisation',
  changeOrganisation: 'Change organisation',
  language: 'Language',
  notifications: 'Notifications',
  notificationSettings: 'Notification settings',
  security: 'Security',
  support: 'Support',
};

export const ResetPasswordFields = {
  resetPassword: 'Reset password',
  emailAddress: 'Email address',
  emailSent: 'Email sent',
};

export const ValidationMessages = {
  aboutCharLimit:
    'Your bio cannot exceed 300 characters. Please shorten your bio and try again.',
  specialCharValidation: '^(?!s*$).+, this special characters can only accept',
  phoneNumberLength: 'Phone number must be 10 numbers',
  invalidFileFormat:
    ' Error: Invalid File Format. The file you attempted to upload is  not a supported format. Please upload a file in JPEG or PNG  format',
  fileSize: 'File too large to upload',
  noTeamAvailable: 'No teams available',
  noBooking: 'No booking',
  noBookingWeek: 'There are no bookings this week',
};

export const Languages = [
  {
    value: 1,
    label: 'English',
    code: 'en',
  },
  {
    value: 2,
    label: 'Arabic',
    code: 'ar',
  },
  {
    value: 3,
    label: 'Chinese',
    code: 'ch',
  },
  {
    value: 4,
    label: 'Danish',
    code: 'da',
  },
  {
    value: 5,
    label: 'German',
    code: 'ge',
  },
  {
    value: 6,
    label: 'Hindi',
    code: 'hi',
  },
  {
    value: 7,
    label: 'Italian',
    code: 'it',
  },
  {
    value: 8,
    label: 'Japanese',
    code: 'ja',
  },
  {
    value: 9,
    label: 'Portuguese',
    code: 'po',
  },
  {
    value: 10,
    label: 'Spanish',
    code: 'sp',
  },
];

export const NotificationAlertTypes = {
  checkin_push: 'checkin_push',
  checkin_email: 'checkin_email',
  bookingchange_push: 'bookingchange_push',
  bookingchange_email: 'bookingchange_email',
};

export const NotificationAlertLabels = {
  check_in_alerts: 'Check-in alerts',
  booking_change_alerts: 'Booking change alerts',
  push: 'Push',
  email: 'Email',
};

export const Descriptions = {
  checkinAlertDesc:
    'Notifications to remind you when an upcoming check-in is required. You will also be notified once you have been cheked out.',
  bookChangeAlertDesc:
    'You will be notified when a booking has been created on your behalf, modified, accepted or rejected.',
  resetPasswordDesc:
    "Enter your email and we'll send you a link to reset your password",
  mailSentDesc: 'Check your email and open the link we sent you to continue',
  languageDesc:
    'This will impact both the mobile, and desktop apps. As well as all notifications.',
  notificationDesc:
    'We may still send you important notifications about your account outside of your notification settings',
};
