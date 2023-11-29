import React,{ useEffect, useState } from 'react';
import { Col, Row, Skeleton } from 'antd';
import MetricsList from '../cards/metricList';
import BarcahrtComponent from '../charts/bar';
import HeatmapchartComponent from '../charts/heatmap';
import LinechartComponent from '../charts/line';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import StackedWithLineComponent from '../charts/stackedWithLine';
import EmployessUtilization from '../tables/parking';
import { postData } from '../../../services/reportingapicall';
import { assets,utilizationbyemployee } from '../../../services/apiurl';
import { groupingOthersMAXlen, groupingOthersMINlen } from '../constant';

const ParkingReporting = (props: any) => {
  const { list, tabinfo } = props;

  const [UtilisedByDaysofWeekData, setUtilisedByDaysofWeekData] = useState([]);
  const [utilisation_per_dayData, setutilisation_per_dayData] = useState([]);
  const [bookingfreqncyperweek, setbookingfreqncyperweek] = useState([]);
  const [utilisation_densityData, setutilisation_densityData] = useState([]);
  const [over_timeData, setover_timeData] = useState([]);
  const [utilisation_locationData, setutilisation_locationData] = useState([]);
  const [teamData, setteamData] = useState([]);
  const [metrix_data, setmetrixData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeAllList, setEmployeeAllList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [
    isUtilisedByDaysofWeekDataLoading,
    setUtilisedByDaysofWeekDataLoading,
  ] = useState(true);
  const [isutilisation_per_dayDataLoading, setutilisation_per_dayDataLoading] =
    useState(true);
  const [isbookingfreqncyperweekLoading, setbookingfreqncyperweekLoading] =
    useState(true);
  const [isutilisation_densityDataLoading, setutilisation_densityDataLoading] =
    useState(true);
  const [isover_timeDataLoading, setover_timeDataLoading] = useState(true);
  const [
    isutilisation_locationDataLoading,
    setutilisation_locationDataLoading,
  ] = useState(true);
  const [isteamDataLoading, setteamDataLoading] = useState(true);
  const [ismetrix_dataLoading, setmetrixDataLoading] = useState(true);

  const errcallback = err => {
    if (err.name === 'AbortError') {
      console.log('Request canceled:', err.message);
    } else {
      console.error('Error:', err);
    }
  };
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
    setTotalPage(1);
    postData(utilizationbyemployee, lists, null, (successRes, res) => {
      if (successRes?.data.metrix_data?.list?.length > 0) {
        const resPonseData = successRes?.data?.metrix_data?.list;
        const totalPazeSize = successRes?.data?.metrix_data?.totalPages;
        setTotalRecords(totalPazeSize);
        const totalPazeSizePerPage = Math.ceil(totalPazeSize / 10);
        setTotalPage(totalPazeSizePerPage);
        const preparlist: any = [];
        let j = 0;

        for (const obj of resPonseData) {
          const preparObj = obj;

          preparObj['uniqId'] = j;

          preparObj['id'] = obj.id;
          preparObj['employee_name'] = obj.employee_name;
          preparObj['team'] = obj.team;

          preparObj['parking_bookings'] = obj.parkingBooking.count;
          preparObj['parking_bookings_percentage'] = obj.parkingBooking.average;
          preparObj['parking_bookings_status'] = obj.parkingBooking.ratio;

          preparObj['no_show_rate_parking'] = obj.noShowRateParking.count;
          preparObj['no_show_rate_parking_percentage'] =
            obj.noShowRateParking.average;
          preparObj['no_show_rate_parking_status'] =
            obj.noShowRateParking.ratio;

          if (obj.avgBookingduration.count == null) {
            preparObj['average_booking_duration_parking'] = 0;
          } else {
            preparObj['average_booking_duration_parking'] =
              obj.avgBookingduration.count;
          }

          preparObj['average_booking_duration_parking_percentage'] =
            obj.avgBookingduration.average;
          preparObj['average_booking_duration_parking_status'] =
            obj.avgBookingduration.ratio;
          delete preparObj.parkingBooking;
          delete preparObj.noShowRateParking;
          delete preparObj.avgBookingduration;

          preparlist.push(preparObj);
          j++;
        }
        setEmployeeList([...preparlist]);
      } else {
        setEmployeeList([]);
        setTotalPage(0);
        setTotalRecords(1);
      }
    });

    postData(utilizationbyemployee, allLists, null, (successRes, res) => {
      if (successRes?.data.metrix_data?.list?.length > 0) {
        const resPonseData = successRes?.data?.metrix_data?.list;
        const totalPazeSize = successRes?.data?.metrix_data?.totalPages;

        const preparlist: any = [];
        let j = 0;

        for (const obj of resPonseData) {
          const preparObj = obj;

          preparObj['uniqId'] = j;

          preparObj['id'] = obj.id;
          preparObj['employee_name'] = obj.employee_name;
          preparObj['team'] = obj.team;

          preparObj['parking_bookings'] = obj.parkingBooking.count;
          preparObj['parking_bookings_percentage'] = obj.parkingBooking.average;
          preparObj['parking_bookings_status'] = obj.parkingBooking.ratio;

          preparObj['no_show_rate_parking'] = obj.noShowRateParking.count;
          preparObj['no_show_rate_parking_percentage'] =
            obj.noShowRateParking.average;
          preparObj['no_show_rate_parking_status'] =
            obj.noShowRateParking.ratio;

          if (obj.avgBookingduration.count == null) {
            preparObj['average_booking_duration_parking'] = 0;
          } else {
            preparObj['average_booking_duration_parking'] =
              obj.avgBookingduration.count;
          }

          preparObj['average_booking_duration_parking_percentage'] =
            obj.avgBookingduration.average;
          preparObj['average_booking_duration_parking_status'] =
            obj.avgBookingduration.ratio;
          delete preparObj.parkingBooking;
          delete preparObj.noShowRateParking;
          delete preparObj.avgBookingduration;

          preparlist.push(preparObj);
          j++;
        }
        setEmployeeAllList([...preparlist]);
      } else {
        setEmployeeAllList([]);
      }
    });
  };
  const getmetrixData = (signal, list) => {
    postData(assets?.metrics, list, signal, null)
      .then(res => {
        setmetrixDataLoading(false);
        let metricsData = res?.data?.metrix_data?.map(item => {
          return {
            ...item,
            value: item.type == 'active' ? `${item.count}` : item.count,
            title: item.label,
          };
        });
        setmetrixData(metricsData);
      })
      .catch(error => errcallback(error));
  };

  const getteamData = (signal, list) => {
    postData(assets?.team, list, signal, null)
      .then(res => {
        setteamDataLoading(false);
        setteamData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilisation_per_dayData = (signal, list) => {
    postData(assets?.perDay, list, signal, null)
      .then(res => {
        setutilisation_per_dayDataLoading(false);
        setutilisation_per_dayData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getover_timeData = (signal, list) => {
    postData(assets?.overTime, list, signal, null)
      .then(res => {
        setover_timeDataLoading(false);
        setover_timeData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getUtilisedByDaysofWeekData = (signal, list) => {
    postData(assets?.daysofweek, list, signal, null)
      .then(res => {
        setUtilisedByDaysofWeekDataLoading(false);
        setUtilisedByDaysofWeekData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilisation_locationData = (signal, list) => {
    postData(assets?.location, list, signal, null)
      .then(res => {
        setutilisation_locationDataLoading(false);
        setutilisation_locationData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilisation_densityData = (signal, list) => {
    postData(assets?.density, list, signal, null)
      .then(res => {
        setutilisation_densityDataLoading(false);
        setutilisation_densityData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getbookingfreqncyperweek = (signal, list) => {
    postData(assets?.frequency, list, signal, null)
      .then(res => {
        setbookingfreqncyperweekLoading(false);
        setbookingfreqncyperweek(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
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
      
      const signal = null; //controller.signal;
      getmetrixData(signal, filter);
      getteamData(signal, filter);
      getutilisation_per_dayData(signal, filter);
      getover_timeData(signal, filter);
      getUtilisedByDaysofWeekData(signal, filter);
      getutilisation_locationData(signal, filter);
      getutilisation_densityData(signal, filter);
      getbookingfreqncyperweek(signal, filter);

    }
  }, [list]);

  const customTeamDataData = { ...teamData };
  const custom_utilisation_locationData = { ...utilisation_locationData };

  //Team
  let teamNewData: Object[] = [];
  let sumTotal = [];

  if (
    teamData?.data?.length > groupingOthersMINlen &&
    teamData?.data?.length != groupingOthersMAXlen
  ) {
    const datas = teamData?.data;

    const totalLength = teamData?.xaxis?.length;

    const sumArray = Array(totalLength).fill(0);

    for (let i = groupingOthersMINlen; i < datas.length; i++) {
      const rowData = datas[i].data;
      for (let j = 0; j < rowData.length; j++) {
        sumArray[j] += rowData[j];
      }
    }
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];

      if (i >= groupingOthersMINlen) {
        item.count = item.data.length;

        let sum = item?.data.reduce((acc, num) => acc + num, 0);
        sumTotal.push(sum);
      } else {
        teamNewData.push(item);
      }
    }
    teamNewData.push({ name: 'Others', data: sumArray, stack: 'stack1' });
    customTeamDataData['data'] = teamNewData;
  }

  //Location
  //Team
  let locationNewData: Object[] = [];
  let sumLocationTotal = [];

  if (
    utilisation_locationData?.data?.length > groupingOthersMINlen &&
    utilisation_locationData?.data?.length != groupingOthersMAXlen
  ) {
    const datas = utilisation_locationData?.data;
    const totalLengthLocation = utilisation_locationData?.xaxis?.length;
    const sumArray = Array(totalLengthLocation).fill(0);

    for (let i = groupingOthersMINlen; i < datas.length; i++) {
      const rowData = datas[i].data;
      for (let j = 0; j < rowData.length; j++) {
        sumArray[j] += rowData[j];
      }
    }
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];

      if (i >= groupingOthersMINlen) {
        item.count = item.data.length;

        let sum = item?.data.reduce((acc, num) => acc + num, 0);
        sumTotal.push(sum);
      } else {
        locationNewData.push(item);
      }
    }

    locationNewData.push({ name: 'Others', data: sumArray, stack: 'stack1' });
    custom_utilisation_locationData['data'] = locationNewData;
  }

  return (
    <>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" role="tabpanel">
          <Row gutter={[10, 0]}>
            <Skeleton
              className="card card-shadow card-chart card-bar-radius card-header-abs"
              loading={ismetrix_dataLoading}
            >
              <MetricsList spanValue={6} metricLists={metrix_data} />
            </Skeleton>
          </Row>
          <Row gutter={[10, 0]}>
            {/* Linechart */}

            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isover_timeDataLoading}
              >
                <LinechartComponent
                  title="Utilisation over time"
                  subtitle="No. of parking booked"
                  data={over_timeData}
                  tabinfo={tabinfo}
                />
              </Skeleton>
            </Col>
            {/* Barchart */}
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isUtilisedByDaysofWeekDataLoading}
              >
                <BarcahrtComponent
                  title="Utilisation by days of week (%)"
                  data={UtilisedByDaysofWeekData}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            {/* StackedBar */}
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isteamDataLoading}
              >
                <StackedWithLineComponent
                  title="Utilisation by team"
                  subtitle="No. of parking checked into"
                  data={customTeamDataData}
                  originalData={teamData}
                />
              </Skeleton>
            </Col>
            {/* StackedBar */}
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isutilisation_locationDataLoading}
              >
                <StackedWithLineComponent
                  title="Utilisation by location"
                  subtitle="No. of parking spaces checked into"
                  data={custom_utilisation_locationData}
                  originalData={utilisation_locationData}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Row gutter={[10, 0]} className="h-100">
                <Col span={24}>
                  <div className="card-d-flex">
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isbookingfreqncyperweekLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Booking frequency per week"
                        data={bookingfreqncyperweek}
                        originalData={bookingfreqncyperweek}
                      />
                    </Skeleton>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="card-d-flex">
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isutilisation_per_dayDataLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Utilisation per day"
                        data={utilisation_per_dayData}
                        originalData={utilisation_per_dayData}
                      />
                    </Skeleton>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <EmployessUtilization
                list={{ ...list, floor_type: tabinfo?.floor_type }}
                employeeList={employeeList}
                totalPage={totalPage}
                totalRecords={totalRecords}
                employeeAllList={employeeAllList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={24}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isutilisation_densityDataLoading}
              >
                <HeatmapchartComponent
                  title="Utilisation density"
                  data={utilisation_densityData}
                />
              </Skeleton>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ParkingReporting;
