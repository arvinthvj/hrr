import CryptoJS from 'crypto-js';
import { global } from '../constants/config';
import { loginWithTenantUrl } from '../constants/pageurl';
import { Cookies } from 'react-cookie';
// import moment from "moment";
// import nacl_factory from 'js-nacl';
// import {SodiumPlus, CryptographyKey} from 'sodium-plus';

export const deleteLines = (string, n) => {
  return string.replace(new RegExp(`(?:.*?\n){${n - 1}}(?:.*?\n)`), '');
};

export function redirectToLogin() {
  const cookies = new Cookies();
  const rememnermeData = localStorage.getItem('rememnerme');
  localStorage.clear();
  localStorage.setItem('rememnerme', rememnermeData);
  window.location.href = loginWithTenantUrl;
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });   
}

export const setSideBar = value => localStorage.setItem('sidebar', value);

export const getSideBar = () => localStorage.getItem('sidebar');

export const setCryptedData = value =>
  value && CryptoJS.AES.encrypt(value, global.secretKey.pattern);

export const getCryptedData = value => {
  const bytes =
    value && CryptoJS.AES.decrypt(value.toString(), global.secretKey.pattern);
  const decryptedData = bytes && bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export const setUserDetail = data =>
  localStorage.setItem('userDetails', setCryptedData(data));

export const getUserDetail = () =>
  getCryptedData(localStorage.getItem('userDetails'));

export const getUser = () => JSON.parse(localStorage.getItem('userDetails'));

export const removeLocalStorage = () => {
  clearLocalStorage();
  removeMenuType();
  removeLanguage();
};

export const clearLocalStorage = () => {
  localStorage.removeItem('token');
};

export const removeMenuType = () => localStorage.removeItem('menuType');

export const removeLanguage = () => localStorage.removeItem('language');

export const imageType = ['image/png', 'image/jpeg'];
export const hrUploadFileType = ['application/pdf', 'image/jpeg'];
export const imageTypeAll = [
  'image/png',
  'image/jpeg',
  'image/svg',
  'image/svg+xml',
];
export const svgType = ['image/svg', 'image/svg+xml'];

export const fileType = ['application/pdf'];

export const fileTypeAll = [
  'application/csv',
  'application/xlsx',
  'text/csv',
  'text/xlsx',
];

export const getFcmToken = () => localStorage.getItem('fcm_token');

export const setFcmToken = data => localStorage.setItem('fcm_token', data);

export const findFirstName = fullName => {
  if (fullName == null || fullName == '' || fullName == undefined) return '';
  else
    return fullName?.trim()?.split(' ')?.length > 1
      ? fullName?.trim()?.split(' ')?.[0]?.split('')?.[0]?.toUpperCase() +
          fullName?.trim()?.split(' ')?.pop()?.split('')?.[0]?.toUpperCase()
      : fullName?.slice(0, 2)?.toUpperCase();
};
export const findFirst_LastName = (fname, lname) => {
  if (fname == null || fname == '' || fname == undefined) return '';
  else return fname?.charAt(0)?.toUpperCase() + lname?.charAt(0)?.toUpperCase();
};

export const plus_icon_base64_url =
  'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAANlBMVEUAAAAAAAAxMTE0NDQxMTEyMjIxMTEyMjIyMjIyMjIyMjIxMTExMTEyMjIyMjIyMjIyMjL///+Mv1wEAAAAEHRSTlMAAT9AaLm6u+Hk5+jt7vL9d//zlAAAAAFiS0dEEeK1PboAAACRSURBVEjH7ZbRCoAgDEVN07Ja3v//2qCHcitae4y8b0MOwjjTOScS0kxH5hScklDAUrwCDMB63rACUQEylu6sugVZASZMD2UDfgUwn6lIoJCwXfqMsQZGXGznPhPlvgb6XJ/ttnOfn7PbrvdB9KABHwXMaiSrfGa9nY/vByj69i414C1g/tiTdXUwLyfc9hufNyiEGh/9ajf/AAAAAElFTkSuQmCC';

export const colorCodeValues = {
  booked: '#D99797',
  bookedme: '#65A2D9',
  unavailable: '#DCDCDC',
  byRequest: '#F8D49B',
  available: '#006600',
};
export const specialChar = [
  '~',
  '`',
  '@',
  '#',
  '%',
  '&',
  '_',
  '-',
  '=',
  '|',
  '{',
  '}',
  '[',
  ']',
  "'",
  ':',
  ';',
  '/',
  '>',
  '<',
  '"',
];
export const specialChars = [
  '~',
  '`',
  '@',
  '#',
  '%',
  '&',
  '_',
  '-',
  '=',
  '|',
  '{',
  '}',
  '[',
  ']',
  "'",
  ':',
  ';',
  '/',
  '>',
  '<',
  ',',
  '"',
];
