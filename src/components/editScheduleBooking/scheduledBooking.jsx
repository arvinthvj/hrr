import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
  calendar1,
  schedule_01,
  schedule_02,
  schedule_03,
} from '../../components/imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { SetScheduleBookOpen } from '../../reduxStore/quickBookSlice';
import { postData } from '../../services/apicall';
import { GetWeeklySchedule, SaveWeeklySchedule } from '../../services/apiurl';
import Toaster from '../toast';
import Loader from '../loader';
import { useMemo } from 'react';
import { DatePicker } from 'antd';
import {
  changeDashBoardLastAPIRes,
  setDashboardDayList,
} from '../../reduxStore/dashboardSlice';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';
const { RangePicker } = DatePicker;

const ScheduledBooking = () => {
  const { scheduleBook } = useSelector(state => state?.quickBook);
  const {
    dashboardFromDate,
    dashboardToDate,
    dashboardDayList,
    dashboardDayApiList,
  } = useSelector(state => state.dashboard);

  const dispatch = useDispatch();
  // datepicker
  const [fromDate, setFromDate] = useState(
    moment(dashboardFromDate).format('YYYY-MM-DD'),
  );
  const [toDate, setToDate] = useState(
    moment(dashboardToDate).format('YYYY-MM-DD'),
    // moment(new Date()).add(4, "days").format("YYYY-MM-DD")
  );
  const [dates, setDates] = useState(null);
  const [nextMonth, setNextMonth] = useState(null);
  // const [toDate, setToDate] = useState(moment(new Date()).add(4, "days")._d);
  const [scheduleData, setScheduleData] = useState(null);
  const [remotedays, setRemotedays] = useState();
  const [remoteNextMonthdays, setRemoteNextMonthdays] = useState();
  const [remoteMonth, setRemoteMonth] = useState();
  const [allot, setAllot] = useState(false);
  const [loadSpinner, SetLoadSpinner] = useState(false);
  const { languages } = useSelector(state => state.language);

  const findLabelText = (module, text, key) => {
    const getKey = languages?.[key];
    const label = getKey?.[module]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };
  useEffect(() => {
    if (moment(dashboardToDate).format('YYYY-MM-DD') > endOfMonth) {
      setNextMonth(dashboardToDate);
    } else {
      setNextMonth(null);
    }
  }, []);
  // scheduleBook
  const handleClose = () => {
    dispatch(SetScheduleBookOpen(false));
  };
  const quickBookComponentRef = useRef(null);

  const startOfMonth = moment(new Date())
    .clone()
    .startOf('month')
    .format('YYYY-MM-DD');
  const endOfMonth = moment(new Date())
    .clone()
    .endOf('month')
    .format('YYYY-MM-DD');

  const getData = () => {
    SetLoadSpinner(true);
    let payload = {
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(toDate).format('YYYY-MM-DD'),
      month_start_date: startOfMonth,
      month_end_date: endOfMonth,
    };
    if (nextMonth) {
      payload['smonth_start_date'] = moment(new Date(toDate))
        .clone()
        .startOf('month')
        .format('YYYY-MM-DD');
      payload['smonth_end_date'] = moment(new Date(toDate))
        .clone()
        .endOf('month')
        .format('YYYY-MM-DD');
    }

    const responce = (data, res) => {
      SetLoadSpinner(false);
      if (res.data.code == 200) {
        setRemotedays(parseInt(data?.remotedays_count));
        setRemoteMonth(parseInt(data?.remotedays_monthcount));
        // data["sremotedays_count"] = 1;
        setRemoteNextMonthdays(parseInt(data?.sremotedays_count));

        setScheduleData(data);
      }
    };
    postData(GetWeeklySchedule, payload, responce);
  };

  useEffect(() => {
    getData();
  }, [scheduleBook, fromDate, toDate]);

  const upDateSchedule = () => {
    SetLoadSpinner(true);
    var data = [];
    delete scheduleData['remotedays_count'];
    delete scheduleData['remotedays_monthcount'];
    delete scheduleData['sremotedays_count'];
    Object.keys(scheduleData).length > 0 &&
      Object.keys(scheduleData).forEach(e1 => {
        data.push(scheduleData[e1]);
      });
    postData(SaveWeeklySchedule, { weekly_schedule: data }, (data, res) => {
      SetLoadSpinner(false);
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == 200) {
        let preparFullData = {
          common_data: data?.common_data,
          book_data: dashboardDayList?.book_data,
        };
        // setDayNewList([...pDate])

        let preparApiFullData = {
          common_data: data?.common_data,
          book_data: dashboardDayApiList?.book_data,
        };

        dispatch(setDashboardDayList(preparFullData));
        dispatch(changeDashBoardLastAPIRes(preparApiFullData));

        handleClose();
      }
    });
  };
  const handleEvent = (event, picker) => {
    setFromDate(picker[0]);
    setToDate(picker[1]);
    setDates(event);

    if (moment(picker[1]).format('YYYY-MM-DD') > endOfMonth) {
      setNextMonth(picker[1]);
    } else {
      setNextMonth(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'applyBtn btn btn-sm btn-primary',
        'cancelBtn btn btn-sm btn-default',
        'next available',
        'prev available',
        'month',
        'ant-picker-content',
        'ant-picker-cell-inner',
        'ant-picker-prev-icon',
        'ant-picker-next-icon',
        'ant-picker-super-prev-icon',
        'ant-picker-super-next-icon',
        'ant-picker-header-next-btn',
        'ant-picker-header-prev-btn',
        'ant-picker-header-super-prev-btn',
        'ant-picker-header-super-next-btn',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-end',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-start',
        'modal-open',
        'btn cancel edit',
        'modal-header',
        'modal-body',
        'main-modal-btns',
        '',
        'delete-info',
        'modal-content',
        'invite-admin-info',
        'main-modal-btns',
        'modal-title h4',
        'btn model btn',
        'ant-picker-header',
        'ant-picker-header-view',
        'ant-picker-body',
        // disabled= "disabled",
      ];
      if (list.includes(event.target.className)) {
      } else if (
        quickBookComponentRef.current &&
        !quickBookComponentRef.current.contains(event.target)
      ) {
        dispatch(SetScheduleBookOpen(false));
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  var deskFilter = [
    'remotedays_count',
    'remotedays_monthcount',
    'sremotedays_count',
  ];
  const checkingDate = (scheduleDate, deskName) => {
    var date1 = moment(scheduleDate).format('MM');
    var date2 = moment(nextMonth).format('MM');

    if (date1 == date2) {
      if (remoteNextMonthdays < remoteMonth) {
        setRemoteNextMonthdays(prev => prev + 1);
        scheduleData[deskName]['work_place'] = 2;
        setScheduleData({ ...scheduleData });
      }
    } else if (remotedays < remoteMonth) {
      scheduleData[deskName]['work_place'] = 2;
      setRemotedays(pre => pre + 1);
      setScheduleData({ ...scheduleData });
    }
  };
  const changeShedule = (scheduleDate, work_place) => {
    var date1 = moment(scheduleDate).format('MM');
    var date2 = moment(nextMonth).format('MM');
    if (date1 == date2 && work_place == 2) {
      setRemoteNextMonthdays(prev => prev - 1);
    } else if (work_place == 2) {
      setRemotedays(prev => prev - 1);
    }
  };
  const styleChanges = (scheduleDate, model, deskName) => {
    var date1 = moment(scheduleDate).format('MM');
    var date2 = moment(nextMonth).format('MM');

    if (date1 == date2) {
      if (remoteNextMonthdays >= remoteMonth) {
        setAllot(true);
        return model;
      }
    } else if (date1 != date2) {
      if (remotedays >= remoteMonth) {
        setAllot(true);
        return model;
      }
    } else {
      return '';
    }
  };
  return (
    <>
      {/* Hello world */}
      <div
        ref={quickBookComponentRef}
        className={`${'card book-card quick-book-card quick-book-sidebar '}${
          scheduleBook == true ? 'quick-book-sidebar-open' : ''
        }`}
      >
        {loadSpinner == true ? (
          <div className="quick-book-loader" style={{ marginTop: '350px' }}>
            <Loader />
          </div>
        ) : (
          <>
            <div className="quick-book-header">
              <Link to="#" onClick={handleClose}>
                <i className="fas fa-angle-left" />
              </Link>
              <h4>
                {findLabelText(
                  'Weekly_schedule',
                  'Weekly schedule',
                  'Dashboard',
                )}
              </h4>
            </div>
            <form action="#">
              <div className="card-body pb-0">
                <div className="date-filter">
                  {/* <div className="date-arrows">
            <Link to = "#">
              <i className="fa fa-angle-left" />
            </Link>
            <Link to = "#">
              <i className="fa fa-angle-right" />
            </Link>
          </div> */}
                  {/* <div className="filter-date">
                    <div className="work-date-range">
                      <DateRangePicker onApply={handleEvent}>
                        <div className="schedule-date-range">
                          <span>
                            {moment(fromDate).format("DD MMM")} <b>-</b>{" "}
                            {moment(toDate).format("DD MMM YYYY")}
                          </span>
                          <img src={calendar1} alt="img" />
                        </div>
                      </DateRangePicker>
                    </div>
                  </div> */}
                  <div className="work-date-range dash-range dashboard-rangepicker scheduleDatePicker">
                    <RangePicker
                      defaultValue={[
                        moment(fromDate, 'YYYY-MM-DD'),
                        moment(toDate, 'YYYY-MM-DD'),
                      ]}
                      disabledDate={
                        d =>
                          !d ||
                          d.isAfter(
                            moment(new Date())
                              .add(29, 'days')
                              .format('YYYY-MM-DD'),
                          ) ||
                          d.isSameOrBefore(
                            moment(new Date()).format('YYYY-MM-DD'),
                          )
                        // !d ||
                        // d > endOfMonth ||
                        // d.isSameOrBefore(
                        //   moment(new Date()).format("YYYY-MM-DD")
                        // ) for current month only view
                      }
                      onChange={handleEvent}
                    />
                    <div className="work-date-range scheduled-booking-datepicker">
                      <span>
                        {moment(fromDate).format('DD MMM')} <b>-</b>{' '}
                        {moment(toDate).format('DD MMM YYYY')}
                      </span>
                      <img src={calendar1} alt="img" />
                    </div>
                  </div>
                </div>
                <div className="schedule-icons schedule-icons-edit">
                  <ul className="nav schedule-list-icon">
                    <li>
                      <span>
                        <img src={schedule_01} alt="img" />
                      </span>
                      <p>
                        {findLabelText(
                          'In_office',
                          'In office',
                          'Common_Values',
                        )}
                      </p>
                    </li>
                    <li>
                      <span>
                        <img src={schedule_02} alt="img" />
                      </span>
                      <p>
                        {findLabelText('Remote', 'Remote', 'Common_Values')}
                      </p>
                    </li>
                    <li>
                      <span>
                        <img src={schedule_03} alt="img" />
                      </span>
                      <p>
                        {findLabelText(
                          'Out_of_office',
                          'Out of office',
                          'Dashboard',
                        )}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="schedule-calendar schedule-calendar-edit">
                  {/* {
            data !== null &&
            Object.keys(data).map((deskName, index) => {
          return (
            <div>
              {deskName}

              <button
                onClick={() => {
                  data[deskName]["work_place"] = 1;
                  setData({ ...data });
                }}
              >
                {data[deskName].work_place === 1 ? "one is selected" : "one"}
              </button>

              <button
                onClick={() => {
                  data[deskName]["work_place"] = 2;
                  setData({ ...data });
                }}
              >
                {data[deskName].work_place === 2 ? "two is selected" : "two"}
              </button>

              <button
                onClick={() => {
                  data[deskName]["work_place"] = 3;
                  setData({ ...data });
                }}
              >
                {data[deskName].work_place === 3
                  ? "three is selected"
                  : "three"}
              </button>

              
            </div>
          );
        })} */}

                  {scheduleData !== null &&
                    Object.keys(scheduleData).map((deskName, index) => {
                      var desk = deskFilter?.includes(deskName);
                      return (
                        <>
                          {!desk && (
                            <ul className="nav" key={index}>
                              <li>
                                <p>{deskName.split(' ')[0]}</p>
                                <span>{deskName.split(' ')[1]}</span>
                              </li>
                              <li>
                                <label className="custom_radio">
                                  <input
                                    type="radio"
                                    onChange={() => {
                                      changeShedule(
                                        scheduleData[deskName].schedule_date,
                                        scheduleData[deskName]['work_place'],
                                      );
                                      scheduleData[deskName]['work_place'] = 1;
                                      setScheduleData({ ...scheduleData });
                                    }}
                                    checked={
                                      scheduleData[deskName].work_place == 1
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>

                              <li>
                                <label className="custom_radio">
                                  <input
                                    type="radio"
                                    // data-bs-toggle={styleChanges(
                                    //   scheduleData[deskName].schedule_date,
                                    //   "modal",
                                    //   deskName
                                    // )}
                                    // data-bs-target={styleChanges(
                                    //   scheduleData[deskName].schedule_date,
                                    //   "#delete-modal",
                                    //   deskName
                                    // )}
                                    onChange={() => {
                                      checkingDate(
                                        scheduleData[deskName].schedule_date,
                                        deskName,
                                      );
                                      styleChanges(
                                        scheduleData[deskName].schedule_date,
                                        'modal',
                                        deskName,
                                      );
                                    }}
                                    checked={
                                      scheduleData[deskName].work_place == 2
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                              <li>
                                <label className="custom_radio">
                                  <input
                                    type="radio"
                                    onChange={() => {
                                      changeShedule(
                                        scheduleData[deskName].schedule_date,
                                        scheduleData[deskName]['work_place'],
                                      );
                                      scheduleData[deskName]['work_place'] = 3;
                                      setScheduleData({ ...scheduleData });
                                    }}
                                    checked={
                                      scheduleData[deskName].work_place == 3
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </li>
                            </ul>
                          )}
                        </>
                      );
                    })}
                </div>
                <div className="schedule-dropdown ">
                  <div className="schedule-down-dropdown schedule-down-dropdown-edit">
                    <Link to="#" className="dropdown-toggle">
                      {findLabelText('Repeat', 'Repeat', 'Dropdown_components')}{' '}
                      <span>
                        {findLabelText('None', 'None', 'Dropdown_components')}
                        <i className="fas fa-angle-down" />
                      </span>
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="#" className="dropdown-item">
                          None
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Daily
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Every weekday (Mon-Fri)
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Weekly
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Monthly
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Yearly
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="booking-btns">
                  <button type="submit" className="btn" onClick={handleClose}>
                    {findLabelText('Cancel', 'Cancel', 'Dashboard')}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={upDateSchedule}
                  >
                    {findLabelText(
                      'Save_changes',
                      'Save changes',
                      'Common_Values',
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>

      {/* <DeleteConfirmationModal
        cancel={() => {
          // 
        }}
        // confirm={() => {
        //   handleDeletUser();
        // }}
        cancelButton={"Close"}
        header="Warning"
        warning="warning"
        content="Request cannot be made as it exceeds the maximum allowed remote working days."
      /> */}
      <Modal show={allot} centered className="main-modal">
        <Modal.Header closeButton={false}>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invite-admin-info">
            <div className="form-group">
              <label>
                Request cannot be made as it exceeds the maximum allowed remote
                working days.
              </label>
            </div>
            <div className="main-modal-btns">
              <div
                // to="#"
                className="btn model btn"
                // data-bs-dismiss="modal"
                onClick={() => setAllot(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ScheduledBooking;
