import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calend_icon1, calend_icon2 } from '../imagepath';
import { Link } from 'react-router-dom/dist';
import moment from 'moment';
import { setDashboardFilterDates } from '../../reduxStore/dashboardSlice';
import { DatePicker } from 'antd';
import { assetsList } from '../../assets/constants/config';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import DashboardTabList from './tapList';
import { DayList, LabelText, UserProfileList } from './constants';
import { findLabelText, getUserPreferedDateFormat } from '../commonMethod';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';

const { RangePicker } = DatePicker;
const DashboardAssertHeader = ({ selectTapCheck }) => {
  const { dashboardFromDate, dashboardToDate } = useSelector(
    (state: RootReduxProps) => state.dashboard,
  );
  const { languages } = useSelector((state: RootReduxProps) => state.language);
  const dispatch = useDispatch();
  const [tapList, setTapList] = useState([]);
  useEffect(() => {
    handleTodayRedirect();
    getTapList();
  }, []);
  const handleTodayRedirect = () => {
    const now = new Date();
    const monday =
    now.getDay() == 0
        ? new Date(now.setDate(now.getDate() - now.getDay() - 6))
        : new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const preparDate = {
      fromDate: moment(new Date(monday)).format(dateFormat_YYYY_MM_DD),
      toDate: moment(new Date(monday.setDate(monday.getDate() + 6))).format(
        dateFormat_YYYY_MM_DD,
      ),
    };
    dispatch(setDashboardFilterDates(preparDate));
  };
  useEffect(() => {
    const dateOne = moment(new Date()).format(dateFormat_YYYY_MM_DD);
    const dateTwo = moment(dashboardFromDate).format(dateFormat_YYYY_MM_DD);
    if (dateOne > dateTwo) {
      handleTodayRedirect();
    } else {
    }
  }, []);
  const ChangeDate = (action, updateDay) => {
    const preparDate = {
      fromDate: moment(new Date(dashboardFromDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
      toDate: moment(new Date(dashboardToDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
    };
    dispatch(setDashboardFilterDates(preparDate));
  };
  const getTapList = () => {
    if (assetsList?.length > 0) {
      const l = JSON.parse(JSON.stringify(assetsList));
      setTapList(l);
    }
  };
  const handleEvent = (date, picker) => {
    const preparDate = {
      fromDate: picker[0],
      toDate: picker[1],
    };
    dispatch(setDashboardFilterDates(preparDate));
  };
  return (
    <div className="card dash-card-info">
      <div className="work-list-grp">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="working-group">
              <h4>{moment(dashboardFromDate).format('MMMM YYYY')}</h4>
            </div>
          </div>
          <div className="col-md-8">
            <div className="date-filter">
              <div className="filter-date date-filter-locate team-date dash-date">
                <div className="filter-date">
                  <div className="current-date" style={{ cursor: 'default' }}>
                    <img
                      style={{ cursor: 'pointer' }}
                      src={calend_icon1}
                      alt="img"
                      onClick={handleTodayRedirect}
                    />{' '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={handleTodayRedirect}
                    >
                      {findLabelText(
                        LabelText.today,
                        LabelText.today,
                        LabelText.dashboard,
                      )}
                      &nbsp;{' '}
                    </span>
                    <span> &nbsp; </span>
                    {/* <div className="date-arrows date-arrows-dash">
                      <img
                        className="me-0"
                        src={calend_icon2}
                        alt="img"
                        onClick={handleTodayRedirect}
                      />
                    </div> */}
                    <div className="work-date-range dash-range dashboard-rangepicker">
                      {' '}
                      {/* <RangePicker
                        open={false}
                        popupClassName="d-none"
                        disabledDate={(d) => {
                          return (
                            !d ||
                            d.isAfter(
                              moment(new Date())
                                .add(29, "days")
                                .format(dateFormat_YYYY_MM_DD)
                            ) ||
                            d.isSameOrBefore(
                              moment(new Date()).format(dateFormat_YYYY_MM_DD)
                            )
                          );
                        }}
                        defaultValue={[
                          moment(
                            moment(dashboardFromDate).format("dddd") ===
                              DayList.Monday
                              ? dashboardFromDate
                              : moment(new Date()).format("dddd") ===
                                DayList.Sunday
                              ? moment()
                                  .subtract(7, "days")
                                  .startOf("isoWeek")
                                  .isoWeekday(1)
                                  .format(dateFormat_YYYY_MM_DD)
                              : moment()
                                  .startOf("isoWeek")
                                  .isoWeekday(1)
                                  .format(dateFormat_YYYY_MM_DD),
                            dateFormat_YYYY_MM_DD
                          ),
                          moment(dashboardToDate, dateFormat_YYYY_MM_DD),
                        ]}
                        onCalendarChange={(val) => {}}
                        onChange={handleEvent}
                      /> */}
                      <div className="work-date-range">
                        <Link
                          to="#"
                          className="angle-left"
                          style={{
                            opacity: '1',
                          }}
                          onClick={() =>
                            ChangeDate(UserProfileList.subtract, -7)
                          }
                        >
                          <i className="fa fa-angle-left" />
                        </Link>
                        <span className="me-0">
                          {getUserPreferedDateFormat(dashboardFromDate)}{' '}
                          <b>-</b> {getUserPreferedDateFormat(dashboardToDate)}
                        </span>
                        <Link
                          to="#"
                          className="angle-right"
                          style={{
                            opacity: '1',
                          }}
                          onClick={() => ChangeDate(UserProfileList.add, 7)}
                        >
                          <i className="fa fa-angle-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardTabList selectTapCheck={selectTapCheck} tapList={tapList} />
    </div>
  );
};
export default DashboardAssertHeader;
