import React,{ useEffect, useState } from 'react';
import { Col, Row, Skeleton } from 'antd';
import MetricsList from '../cards/metricList';
import BarcahrtComponent from '../charts/bar';
import HeatmapchartComponent from '../charts/heatmap';
import LinechartComponent from '../charts/line';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import EmployessUtilization from '../tables/employess';
import StackedWithLineComponent from '../charts/stackedWithLine';
import { postData } from '../../../services/reportingapicall';
import { assets, utilizationbyemployee } from '../../../services/apiurl';
import { groupingOthersMAXlen, groupingOthersMINlen } from '../constant';

const DeskReporting = (props: any) => {
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

  const getMetrics = (list, signal) => {
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

  const getTeamdata = (list, signal) => {
    postData(assets?.team, list, signal, null)
      .then(res => {
        setteamDataLoading(false);
        setteamData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getUtilisatioperDay = (list, signal) => {
    postData(assets?.perDay, list, signal, null)
      .then(res => {
        setutilisation_per_dayDataLoading(false);
        setutilisation_per_dayData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getoverTimeData = (list, signal) => {
    postData(assets?.overTime, list, signal, null)
      .then(res => {
        setover_timeDataLoading(false);
        setover_timeData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getUtilisedByDaysofWeekData = (list, signal) => {
    postData(assets?.daysofweek, list, signal, null)
      .then(res => {
        setUtilisedByDaysofWeekDataLoading(false);
        setUtilisedByDaysofWeekData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilisationLocationData = (list, signal) => {
    postData(assets?.location, list, signal, null)
      .then(res => {
        setutilisation_locationDataLoading(false);
        setutilisation_locationData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilisationDensityData = (list, signal) => {
    postData(assets?.density, list, signal, null)
      .then(res => {
        setutilisation_densityDataLoading(false);
        setutilisation_densityData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getbookingFreqncyperweek = (list, signal) => {
    postData(assets?.frequency, list, signal, null)
      .then(res => {
        setbookingfreqncyperweekLoading(false);
        setbookingfreqncyperweek(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
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

    postData(utilizationbyemployee, lists, signal, (successRes, res) => {
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

          preparObj['desk_openings'] = obj.deskBooking.count;
          preparObj['id'] = obj.id;
          preparObj['employee_name'] = obj.employee_name;
          preparObj['team'] = obj.team;
          preparObj['desk_openings_percentage'] = obj.deskBooking.average;
          preparObj['desk_openings_status'] = obj.deskBooking.ratio;

          preparObj['no_shows_desk'] = obj.noShowDesks.count;
          preparObj['no_shows_desk_percentage'] = obj.noShowDesks.average;
          preparObj['no_shows_desk_status'] = obj.noShowDesks.ratio;

          preparObj['unknown_days'] = obj.unKnownDays.count;
          preparObj['unknown_days_percentage'] = obj.unKnownDays.average;
          preparObj['unknown_days_status'] = obj.unKnownDays.ratio;

          preparObj['remote_days'] = obj.remoteDays.count;
          preparObj['remote_days_percentage'] = obj.remoteDays.average;
          preparObj['remote_days_status'] = obj.remoteDays.ratio;
          delete preparObj.deskBooking;
          delete preparObj.noShowDesks;
          delete preparObj.remoteDays;
          delete preparObj.unKnownDays;
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

    postData(utilizationbyemployee, allLists, signal, (successRes, res) => {
      if (successRes?.data.metrix_data?.list?.length > 0) {
        const resPonseData = successRes?.data?.metrix_data?.list;
        const preparlist: any = [];
        let j = 0;
        for (const obj of resPonseData) {
          const preparObj = obj;
          preparObj['desk_openings'] = obj.deskBooking.count;
          preparObj['id'] = obj.id;
          preparObj['employee_name'] = obj.employee_name;
          preparObj['team'] = obj.team;
          preparObj['desk_openings_percentage'] = obj.deskBooking.average;
          preparObj['desk_openings_status'] = obj.deskBooking.ratio;

          preparObj['no_shows_desk'] = obj.noShowDesks.count;
          preparObj['no_shows_desk_percentage'] = obj.noShowDesks.average;
          preparObj['no_shows_desk_status'] = obj.noShowDesks.ratio;

          preparObj['unknown_days'] = obj.unKnownDays.count;
          preparObj['unknown_days_percentage'] = obj.unKnownDays.average;
          preparObj['unknown_days_status'] = obj.unKnownDays.ratio;

          preparObj['remote_days'] = obj.remoteDays.count;
          preparObj['remote_days_percentage'] = obj.remoteDays.average;
          preparObj['remote_days_status'] = obj.remoteDays.ratio;
          delete preparObj.deskBooking;
          delete preparObj.noShowDesks;
          delete preparObj.remoteDays;
          delete preparObj.unKnownDays;
          preparlist.push(preparObj);
          j++;
        }
        setEmployeeAllList([...preparlist]);
      } else {
        setEmployeeAllList([]);
      }
    });
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
      getMetrics(filter, signal);
      getTeamdata(filter, signal);
      getUtilisatioperDay(filter, signal);
      getoverTimeData(filter, signal);
      getUtilisedByDaysofWeekData(filter, signal);
      getutilisationLocationData(filter, signal);
      getutilisationDensityData(filter, signal);
      getbookingFreqncyperweek(filter, signal);
    }
  }, [list]);

  const customTeamDataData = { ...teamData };
  const custom_utilisation_locationData = { ...utilisation_locationData };

  // Team
  const teamNewData: Object[] = [];
  const sumTotal = [];

  if (
    teamData?.data?.length > groupingOthersMINlen &&
    teamData?.data?.length != groupingOthersMAXlen
  ) {
    const datas = teamData?.data;

    const totalLength = teamData?.xaxis?.length;

    const sumArray = Array(totalLength).fill(0);

    for (let i = groupingOthersMINlen; i < datas?.length; i++) {
      const rowData = datas[i].data;
      for (let j = 0; j < rowData.length; j++) {
        sumArray[j] += rowData[j];
      }
    }
    for (let i = 0; i < datas?.length; i++) {
      const item = datas[i];

      if (i >= groupingOthersMINlen) {
        item.count = item.data.length;

        const sum = item?.data.reduce((acc, num) => acc + num, 0);
        sumTotal.push(sum);
      } else {
        teamNewData.push(item);
      }
    }
    teamNewData.push({ name: 'Others', data: sumArray, stack: 'stack1' });
    customTeamDataData['data'] = teamNewData;
  }

  // Location
  // Team
  const locationNewData: Object[] = [];
  const sumLocationTotal = [];

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

        const sum = item?.data.reduce((acc, num) => acc + num, 0);
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
                  subtitle="No. of desks booked"
                  title="Utilisation over time"
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
                  subtitle="No. of desks checked into"
                  title="Utilisation by team"
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
                  subtitle="No. of desks checked into"
                  title="Utilisation by location"
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
                allLists={{ ...list, floor_type: tabinfo?.floor_type }}
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

export default DeskReporting;
