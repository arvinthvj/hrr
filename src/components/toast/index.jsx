import { message as toaster } from 'antd';
import { _doLogout } from '../commonMethod';

export default function Toaster(code, message) {
  const codeType = parseInt(code);
  if (message) {
    if (codeType == 200) {
      toaster.success({
        content: message,
        className: 'toaster',
      });
    } else if (codeType == 204) {
      toaster.error({
        content: message,
        className: 'toaster',
      });
    } else if (codeType == 401) {
      toaster.error({
        content: 'Token expired',
        className: 'toaster',
      });
    } else if (codeType == 500) {
      // toaster.error({
      //   content: message,
      //   className: "toaster",
      // });
      // do nothing
    } else if (codeType == 400) {
      toaster.error({
        content: message,
        className: 'toaster',
      });
    } else if (codeType == 404 && message == 'Authorization Token not found') {
      _doLogout();
    } else {
      toaster.error({
        content: message,
        className: 'toaster',
      });
    }
  }
}
