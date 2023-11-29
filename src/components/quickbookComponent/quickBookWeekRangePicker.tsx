import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuickbookFilterDates } from '../../reduxStore/quickBookSlice';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import { BookIcon } from '../imagepath';
import { endOfMonth } from '../commonMethod';
const { RangePicker } = DatePicker;
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';

const QuickBookWeekRangePicker = () => {
  const { quickbookFromDate, quickbookToDate } = useSelector(
    (state: any) => state?.quickBook,
  );
  const [nextMonth, setNextMonth] = useState(null);
  const dispatch = useDispatch();

  const currentDateValid = () => {
    if (
      moment(new Date(quickbookFromDate)).format(dateFormat_YYYY_MM_DD) >=
        moment(new Date()).format(dateFormat_YYYY_MM_DD) &&
      moment(new Date()).format(dateFormat_YYYY_MM_DD) <=
        moment(new Date(quickbookToDate)).format(dateFormat_YYYY_MM_DD)
    ) {
      return false;
    } else {
      return true;
    }
  };
  const nextMonthStatus = toDate => {
    if (moment(toDate).format(dateFormat_YYYY_MM_DD) > endOfMonth) {
      setNextMonth(toDate);
      return true;
    } else {
      setNextMonth(null);
      return false;
    }
  };
  const ChangeDate = (action, updateDay) => {
    const preparDate = {
      fromDate: moment(new Date(quickbookFromDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
      toDate: moment(new Date(quickbookToDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
    };
    dispatch(setQuickbookFilterDates(preparDate));
    nextMonthStatus(preparDate?.toDate);
  };
  const handleEvent = (date, picker) => {
    const preparDate = {
      fromDate: picker[0],
      toDate: picker[1],
    };
    dispatch(setQuickbookFilterDates(preparDate));
    nextMonthStatus(picker[1]);
  };

  return (
    <div className="date-filter">
      <div className="work-date-range dash-range dashboard-rangepicker">
        <div className="work-date-range quickbook-range-picker quickbook-range-arrow">
          <div className="tab-date">
            <Link
              to="#"
              style={{
                opacity: currentDateValid() ? '0.25' : '1',
              }}
              onClick={() =>
                currentDateValid() ? {} : ChangeDate('subtract', -7)
              }
            >
              <i className="fa fa-angle-left" />
            </Link>
            <Link
              to="#"
              style={{
                opacity: '1',
              }}
              onClick={() => ChangeDate('add', 7)}
            >
              <i className="fa fa-angle-right" />
            </Link>
          </div>
          <div>
            <RangePicker
              className="d-none"
              open={false}
              popupClassName="d-none"
              disabledDate={d => {
                return (
                  !d ||
                  d.isAfter(
                    moment(new Date())
                      .add(29, 'days')
                      .format(dateFormat_YYYY_MM_DD),
                  ) ||
                  d.isSameOrBefore(
                    moment(new Date()).format(dateFormat_YYYY_MM_DD),
                  )
                );
              }}
              defaultValue={[
                moment(quickbookFromDate, dateFormat_YYYY_MM_DD),
                moment(quickbookToDate, dateFormat_YYYY_MM_DD),
              ]}
              onChange={handleEvent}
            />{' '}
            <div>
              <span className="me-0">
                {moment(quickbookFromDate).format('DD MMM')} <b>-</b>{' '}
                {moment(quickbookToDate).format('DD MMM YYYY')}
              </span>
              <Link to="#">
                <img src={BookIcon} alt="BookIcon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBookWeekRangePicker;
