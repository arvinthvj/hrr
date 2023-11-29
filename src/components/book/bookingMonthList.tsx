import React from 'react';
import { validateBackgroundColor } from '../commonMethod';
import moment from 'moment';
import { dateFormat_YYYY_MMM } from '../../assets/constants/config';

interface BookingMonthListProps {
  details: {
    selectedMonth: string;
    monthDetails: Array<{
      date: string;
      status: string;
      day: string;
    }>;
    bookingDetails: any;
  };
  date: any;
  monthList: Array<{
    date: string;
    status: string;
    day: string;
  }>;
}

export const BookingMonthList: React.FC<BookingMonthListProps> = ({
  details,
  date,
  monthList,
}) => {
  const renderMonth = (month, index) => {
    let preparDate: string | null = month?.full_date;
    try {
      if (details?.bookingDetails?.length > 0) {
        preparDate = null;
        if (details?.bookingDetails?.[0]?.All[0]?.full_date) {
          const getYearAndMonthString =
            details?.bookingDetails?.[0]?.All[0]?.full_date; // '2023-01-01'
          const yyMM = getYearAndMonthString
            ? getYearAndMonthString.split('-')
            : null;
          preparDate =
            yyMM?.length > 0
              ? yyMM[0] + '-' + yyMM[1] + '-' + month.date
              : null;
        }
      } else if (details?.bookingDetails?.All[0]?.full_date) {
        const getYearAndMonthString =
          details?.bookingDetails?.All[0]?.full_date; // '2023-01-01'
        const yyMM = getYearAndMonthString
          ? getYearAndMonthString.split('-')
          : null;
        preparDate =
          yyMM?.length > 0 ? yyMM[0] + '-' + yyMM[1] + '-' + month.date : null;
      }
    } catch (error) {}

    return (
      <div
        key={index}
        style={{
          marginRight: 0,
          paddingRight: 2,
          paddingBottom: 2,
          paddingTop: 2,
          paddingLeft: 3,
          backgroundColor: preparDate
            ? validateBackgroundColor(preparDate)
            : '',
          pointerEvents: 'none',
        }}
      >
        <div key={index} className="booking-checkbox">
          <label className="booking-btns">
            <input
              type="checkbox"
              checked={
                moment(new Date()).format('DD') == month?.date &&
                moment(new Date()).format('MM') ==
                  moment(new Date(date)).format('MM')
                  ? true
                  : false
              }
              onChange={() => {}}
              className="form-check-input"
            />
            <p
              className={
                month.status == 'Available'
                  ? 'booking-day booking-light-gray'
                  : 'booking-day booking-dark-gray'
              }
            >
              <span className="book-days">{month.day}</span>
              <span>{month.date}</span>
            </p>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="booking-month">
      <div className="booking-year">
        <p>{moment(date).format(dateFormat_YYYY_MMM)}</p>
      </div>
      {monthList?.length > 0
        ? monthList.map((month, index) => {
            return renderMonth(month, index);
          })
        : null}
    </div>
  );
};

export default BookingMonthList;
