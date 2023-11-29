import moment from 'moment';
import { dateFormat_YYYY_MM_DD } from './config';
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function monthlist(bookDate) {
  const startOfMonth = moment(new Date(bookDate))
    .clone()
    .startOf('month')
    .format(dateFormat_YYYY_MM_DD);
  const endOfMonth = moment(new Date(bookDate))
    .clone()
    .endOf('month')
    .format(dateFormat_YYYY_MM_DD);
  return getDateArray(new Date(startOfMonth), new Date(endOfMonth));
}
function getDateArray(start, end) {
  var arr = [];
  var dt = new Date(start);
  while (dt <= end) {
    var list = {
      day: weekday[dt.getDay()],
      date: moment(new Date(dt)).format('DD'),
      status:
        weekday[dt.getDay()] == 'Sun' || weekday[dt.getDay()] == 'Sat'
          ? 'Unavailable'
          : 'Available',
      full_date: moment(new Date(dt)).format(dateFormat_YYYY_MM_DD),
    };
    arr.push(list);
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
}
