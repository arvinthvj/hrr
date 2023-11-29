import React, { useState, memo, useEffect } from 'react';
import { Col, Row, Skeleton } from 'antd';
import MetricsList from '../cards/metricList';
import { postData } from '../../../services/reportingapicall';
import {
  hrReports,
  hr_todayReporting_api as todayReport,
} from '../../../services/apiurl';
import OverviewBarcahrtComponent from '../charts/overviewBar';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import BarcahrtComponent from '../charts/bar';
import PiecahrtComponent from '../charts/piechart';
import EmployeeTimeoffData from '../tables/empTimeoffdata';
import Attendancedensitybylocation from '../charts/todayReporting/Attendancedensitybylocation';
import PeopleNotes from '../charts/todayReporting/peopleNotes';
import EventsToday from '../charts/todayReporting/eventsToday';
import WhoInOutToday from '../charts/todayReporting/whoInOutToday';
import UpcomingDates from '../charts/todayReporting/upcomingDates';

const TodatReporting = (props: any) => {
  const { list, tabinfo } = props;
  const [firstSetmetrics, SetfirstSetmetrics] = useState([]);
  const [secondSetmetrics, SetsecondSetmetrics] = useState([]);
  const [attendencebylocation, Setattendencebylocation] = useState([]);
  const [dailyattendencebyteam, Setdailyattendencebyteam] = useState([]);
  const [tdyattendencebylocation, Settdyattendencebylocation] = useState([]);
  const [workspacedensitylocation, Setworkspacedensitylocation] = useState([]);
  const [attndcbyduration, Setattndcbyduration] = useState([]);
  const [headcountempsts, Setheadcountempsts] = useState([]);
  const [deskbooktypeData, SetdeskbooktypeData] = useState([]);
  const [todayeventnotes, Settodayeventnotes] = useState({});
  const [todaywhoinout, Settodaywhoinout] = useState({});
  const [todaypeoplenotes, Settodaypeoplenotes] = useState({});
  const [todayupcomingdates, Settodayupcomingdates] = useState({});
  const [employeeTimeOfData, setEmployeeTimeOfData] = useState([]);
  const [attndbyusertype, Setattndbyusertype] = useState([]);

  // for loading
  const [ismetrixLoading, setmetrixLoading] = useState(true);
  const [ismetrixavgLoading, setmetrixavgLoading] = useState(true);
  const [isattendbyloctLoading, setattendbyloctLoading] = useState(true);
  const [isdailyattendbyTMLoading, setdailyattendbyTMLoading] = useState(true);
  const [isgettdyattdnbyloct, setgettdyattdnbyloctLoading] = useState(true);
  const [isworkspacedensityloct, SetworkspcdensityloctLoading] = useState(true);
  const [isattndcbyduration, SetattndcbydurationLoading] = useState(true);
  const [isheadcountempsts, SetheadcountempstsLoading] = useState(true);
  const [isdeskbooktypeData, SetdeskbooktypeDataLoading] = useState(true);
  const [istodayeventnotes, SettodayeventnotesLoading] = useState(true);
  const [istodaywhoinout, SettodaywhoinoutLoading] = useState(true);
  const [istodaypeoplenotes, SettodaypeoplenotesLoading] = useState(true);
  const [istodayupcomingdates, SettodayupcomingdatesLoading] = useState(true);
  const [isEmpTimeOfDataLoading, setIsEmpTimeOfDataLoading] = useState(true);
  const [isattndbyusertype, SetattndbyusertypeLoading] = useState(true);

  // table pagination
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(1);
  const [employeeAllList, setEmployeeAllList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const errcallback = err => {
    if (err.name === 'AbortError') {
      console.log('Request canceled:', err.message);
    } else {
      console.error('Error:', err);
    }
  };

  const getmetrixData = (signal, list) => {
    setmetrixLoading(true);
    postData(todayReport?.metrics, list, signal, null)
      .then(res => {
        setmetrixLoading(false);
        let metricsData = res?.data?.metrix_data?.map(item => {
          if (item) {
            return {
              ...item,
              value: item.count,
              title: item?.label,
            };
          }
        });
        SetfirstSetmetrics(metricsData);
      })
      .catch(error => errcallback(error));
  };

  const getmetrixavgData = (signal, list) => {
    setmetrixavgLoading(true);
    postData(todayReport?.metrics_averagebookingduration, list, signal, null)
      .then(res => {
        setmetrixavgLoading(false);
        let metricsData = res?.data?.average_booking_duration?.map(item => {
          return {
            ...item,
            value: item.type == 'active' ? `${item.count}` : item.count,
            title: item.label,
          };
        });
        SetsecondSetmetrics(metricsData);
      })
      .catch(error => errcallback(error));
  };

  const getdailyattendencebyteam = (signal, list) => {
    setdailyattendbyTMLoading(true);
    postData(todayReport?.dailyattendencebyteam, list, signal, null)
      .then(res => {
        setdailyattendbyTMLoading(false);
        Setdailyattendencebyteam(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const getattendencebylocation = (signal, list) => {
    setattendbyloctLoading(true);
    postData(todayReport?.attendencebylocation, list, signal, null)
      .then(res => {
        setattendbyloctLoading(false);
        Setattendencebylocation(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const gettodayattendencebylocation = (signal, list) => {
    setgettdyattdnbyloctLoading(true);
    postData(todayReport?.todayattendencebylocation, list, signal, null)
      .then(res => {
        setgettdyattdnbyloctLoading(false);
        Settdyattendencebylocation(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const getworkspacedensitylocation = (signal, list) => {
    SetworkspcdensityloctLoading(true);
    postData(todayReport?.workspacedensitylocation, list, signal, null)
      .then(res => {
        SetworkspcdensityloctLoading(false);
        Setworkspacedensitylocation(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const getattndcbyduration = (signal, list) => {
    SetattndcbydurationLoading(true);
    postData(todayReport?.attndcbyduration, list, signal, null)
      .then(res => {
        SetattndcbydurationLoading(false);
        Setattndcbyduration(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const getheadcountempsts = (signal, list) => {
    SetheadcountempstsLoading(true);
    postData(todayReport?.headcount_employment_status, list, signal, null)
      .then(res => {
        SetheadcountempstsLoading(false);
        Setheadcountempsts(res?.data?.headcount_emploment_status || []);
      })
      .catch(error => errcallback(error));
  };

  const getdeskbooktypeData = (signal, list) => {
    SetdeskbooktypeDataLoading(true);
    postData(todayReport?.deskbookingtype, list, signal, null)
      .then(res => {
        SetdeskbooktypeDataLoading(false);
        SetdeskbooktypeData(res?.data?.utilization_by || []);
      })
      .catch(error => errcallback(error));
  };

  const gettodayeventnotes = (signal, list) => {
    SettodayeventnotesLoading(true);
    postData(todayReport?.todayeventnotes, list, signal, null)
      .then(res => {
        SettodayeventnotesLoading(false);
        Settodayeventnotes(res?.data || []);
      })
      .catch(error => errcallback(error));
  };

  const gettodaywhoinout = (signal, list) => {
    SettodaywhoinoutLoading(true);
    postData(todayReport?.todaywhoinout, list, signal, null)
      .then(res => {
        SettodaywhoinoutLoading(false);
        Settodaywhoinout(res?.data || []);
      })
      .catch(error => errcallback(error));
  };

  const gettodaypeoplenotes = (signal, list) => {
    SettodaypeoplenotesLoading(true);
    postData(todayReport?.todaypeoplenotes, list, signal, null)
      .then(res => {
        SettodaypeoplenotesLoading(false);
        Settodaypeoplenotes(res?.data || []);
      })
      .catch(error => errcallback(error));
  };

  const gettodayupcomingdates = (signal, list) => {
    SettodayupcomingdatesLoading(true);
    postData(todayReport?.todayupcomingdates, list, signal, null)
      .then(res => {
        SettodayupcomingdatesLoading(false);
        Settodayupcomingdates(res?.data || []);
      })
      .catch(error => errcallback(error));
  };

  const getattndbyusertype = (signal, list) => {
    SetattndbyusertypeLoading(true);
    postData(todayReport?.attendance_by_user_type, list, signal, null)
      .then(res => {
        SetattndbyusertypeLoading(false);
        Setattndbyusertype(res?.data?.attendance_by_user_type || []);
      })
      .catch(error => errcallback(error));
  };

  // const controller = new AbortController();
  // const signals = controller.signal;

  const getTabledata = (lists, signal) => {
    let allLists = { ...lists };
    const limitEmp = 10;
    if (currentPage == 1 || currentPage == undefined) {
      lists['skip'] = `${0}`;
    } else {
      const currentPages = currentPage - 1;
      lists['skip'] = `${currentPages * 10}`;
    }
    lists['limit'] = `${limitEmp}`;

    postData(
      hrReports.employeeByTimeOfData,
      lists,
      signal,
      (successRes, res) => {
        if (successRes?.data?.emp_timeoff_data) {
          const resPonseData = successRes?.data?.emp_timeoff_data?.list;
          const totalPazeSize = successRes?.data?.emp_timeoff_data?.totalPages;
          setTotalRecords(totalPazeSize);
          const totalPazeSizePerPage = Math.ceil(totalPazeSize / 10);
          setTotalPage(totalPazeSizePerPage);
          const updatedEmployeeData =
            successRes?.data?.emp_timeoff_data?.list.map(employee => {
              const { start_period_annual_leave_bal, annual_leave_used } =
                employee;
              const remaining_annual_leave_balance =
                start_period_annual_leave_bal - annual_leave_used;

              // Return the updated employee object with the new field
              return {
                ...employee,
                remaining_annual_leave_balance: remaining_annual_leave_balance,
              };
            });

          setEmployeeTimeOfData(updatedEmployeeData);
        } else {
          setEmployeeTimeOfData([]);
          setTotalPage(0);
          setTotalRecords(1);
        }
      },
    );

    postData(
      hrReports.employeeByTimeOfData,
      allLists,
      signal,
      (successRes, res) => {
        if (successRes?.data?.emp_timeoff_data) {
          const updatedEmployeeData =
            successRes?.data?.emp_timeoff_data?.list.map(employee => {
              const { start_period_annual_leave_bal, annual_leave_used } =
                employee;
              const remaining_annual_leave_balance =
                start_period_annual_leave_bal - annual_leave_used;

              // Return the updated employee object with the new field
              return {
                ...employee,
                remaining_annual_leave_balance: remaining_annual_leave_balance,
              };
            });

          setEmployeeAllList(updatedEmployeeData);
        } else {
          setEmployeeAllList([]);
        }
      },
    );
  };

  useEffect(() => {
    let filter = {
      ...list,
      floor_type: tabinfo?.floor_type,
    };
    getTabledata(filter, null);
  }, [currentPage, list]);

  useEffect(() => {
    if (list) {
      let filter = {
        ...list,
        floor_type: tabinfo?.floor_type,
      };
      let data = list?.location_id?.some(elm => elm === undefined);
      if (!data) {
        const signal = null;
        getmetrixData(signal, filter);
        getmetrixavgData(signal, filter);
        getdailyattendencebyteam(signal, filter);
        getattendencebylocation(signal, filter);
        gettodayattendencebylocation(signal, filter);
        getworkspacedensitylocation(signal, filter);
        getattndcbyduration(signal, filter);
        getheadcountempsts(signal, filter);
        getdeskbooktypeData(signal, filter);
        gettodayeventnotes(signal, filter);
        gettodaywhoinout(signal, filter);
        gettodaypeoplenotes(signal, filter);
        gettodayupcomingdates(signal, filter);
        getattndbyusertype(signal, filter);
      }
    }
  }, [list]);

  return (
    <>
      <div className="tab-content" id="overviewTabContent">
        <div className="tab-pane fade show active" role="tabpanel">
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={ismetrixLoading}
              >
                <MetricsList spanValue={6} metricLists={firstSetmetrics} />
              </Skeleton>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={6}>
                <PeopleNotes data={todaypeoplenotes} />
              </Col>
              <Col span={6}>
                <EventsToday data={todayeventnotes} />
              </Col>
              <Col span={6}>
                <WhoInOutToday data={todaywhoinout} />
              </Col>
              <Col span={6}>
                <UpcomingDates data={todayupcomingdates} />
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <Row gutter={[10, 0]} className="h-100">
                  <Col span={24}>
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isheadcountempsts}
                    >
                      <SingleBarcahrtComponent
                        title="Headcount by employment status"
                        data={headcountempsts}
                        originalData={headcountempsts}
                      />
                    </Skeleton>
                  </Col>

                  <Col span={24}>
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isattndbyusertype}
                    >
                      <SingleBarcahrtComponent
                        title="Attendance by user type"
                        data={attndbyusertype}
                        originalData={attndbyusertype}
                      />
                    </Skeleton>
                  </Col>
                </Row>
              </Col>

              <Col span={6}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isdeskbooktypeData}
                >
                  <div className="card-d-flex">
                    <div className="card card-shadow card-chart">
                      <PiecahrtComponent
                        title="Desk Booking type"
                        data={deskbooktypeData}
                      />
                    </div>
                  </div>
                </Skeleton>
              </Col>
              <Col span={6}>
                <Row gutter={[10, 0]} className="h-100">
                  <Skeleton
                    className="card card-shadow card-chart card-bar-radius card-header-abs"
                    loading={ismetrixavgLoading}
                  >
                    <MetricsList
                      spanValue={24}
                      metricLists={secondSetmetrics}
                    />
                  </Skeleton>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isattndcbyduration}
                >
                  <SingleBarcahrtComponent
                    title="Attendance by duration"
                    data={attndcbyduration}
                    originalData={attndcbyduration}
                  />
                </Skeleton>
              </Col>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isattendbyloctLoading}
                >
                  <SingleBarcahrtComponent
                    title="Attendance by location"
                    data={attendencebylocation}
                    originalData={attendencebylocation}
                  />
                </Skeleton>
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isdailyattendbyTMLoading}
                >
                  <OverviewBarcahrtComponent
                    title="Daily attendance by team (%)"
                    data={dailyattendencebyteam}
                    originalData={dailyattendencebyteam}
                  />
                </Skeleton>
              </Col>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isgettdyattdnbyloct}
                >
                  <BarcahrtComponent
                    title="Today's attendance by location"
                    data={tdyattendencebylocation}
                    originalData={tdyattendencebylocation}
                  />
                </Skeleton>
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <div className="card-d-flex">
                  <EmployeeTimeoffData
                    allLists={{ ...list, floor_type: tabinfo?.floor_type }}
                    employeeList={employeeTimeOfData}
                    totalPage={totalPage}
                    totalRecords={totalRecords}
                    empDataAllList={employeeAllList}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="card-d-flex">
                  <div className="card card-shadow card-chart"></div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isworkspacedensityloct}
                >
                  <Attendancedensitybylocation
                    title="Workplace attendance density by location"
                    data={workspacedensitylocation}
                  />
                </Skeleton>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TodatReporting);
