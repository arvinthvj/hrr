import moment from 'moment';

export const languages = [
  {
    value: 1,
    label: 'English',
  },
  {
    value: 2,
    label: 'Spanish',
  },
  {
    value: 3,
    label: 'Telugu',
  },
  {
    value: 4,
    label: 'Polish',
  },
  {
    value: 5,
    label: 'German',
  },
];

export const companySettings = [
  '/company-settings',
  '/user-management',
  '/upload-logo',
  '/languages',
  '/visiting-reasons',
  '/device-management',
];

export const userData = {
  org_id: 1,
  id: 1,
  language: 'en',
  role: 'admin',
};

export const currentDate = moment().format('DD MMM YYYY');

export const pathName = window.location.pathname;

export const googleClientId =
  '396155409047-1jsr5e9tdckimi620s73knbl0fp6obe0.apps.googleusercontent.com';

export const emailRegexPattern =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
