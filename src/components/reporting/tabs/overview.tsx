import React, { useState, memo, useEffect } from 'react';
import { Col, Row } from 'antd';
import HeatmapchartComponent from '../charts/heatmap';
import BarcahrtComponent from '../charts/bar';
import OverviewBarcahrtComponent from '../charts/overviewBar';
import MetricsList from '../cards/metricList';
import LinechartComponent from '../charts/dashboard/lineDashboard';
import PiecahrtComponent from '../charts/piechart';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import StackedWithLineComponent from '../charts/stackedWithLine';
import {
  changePercentageFormula,
  groupingOthersMAXlen,
  groupingOthersMINlen,
} from '../constant';
import { postData } from '../../../services/reportingapicall';
import { overview } from '../../../services/apiurl';
import { Skeleton } from 'antd';

const OverviewTabComponent = (props: any) => {
  const { list, tabinfo } = props;
  const [avgDailyAttnByteamData, setavgDailyAttnByteamData] = useState([]);
  const [WrkspcUtlsByDaysofWeek, setWrkspcUtlsByDaysofWeek] = useState([]);
  const [atndcfrqncyPerweekData, setatndcfrqncyPerweekData] = useState([]);
  const [attendance_by_location, setattendance_by_location] = useState([]);
  const [HybridWorkingStatusData, setHybridWorkingStatusData] = useState([]);
  const [utilization_densityData, setutilization_densityData] = useState([]);
  const [overTimeData, setoverTimeData] = useState([]);
  const [teamData, setteamData] = useState([]);
  const [metrix_data, setmetrixData] = useState([]);
  const [firstRowmetrics, SetfirstRowmetrics] = useState([]);
  const [secondRowmetrics, SetsecondRowmetrics] = useState([]);

  // for loading
  const [isavgAttnByteamloading, setavgAttnByteamLoading] = useState(true);
  const [isDaysofWeekLoading, setDaysofWeekLoading] = useState(true);
  const [isatndcfrqncyweekLoading, setatndcfrqncyweekLoading] = useState(true);
  const [isattendlocationLoading, setattendlocationLoading] = useState(true);
  const [isHybridStatusLoading, setHybridStatusLoading] = useState(true);
  const [isdensityLoading, setdensityLoading] = useState(true);
  const [isoverTimeLoading, setoverTimeLoading] = useState(true);
  const [isteamLoading, setteamLoading] = useState(true);
  const [ismetrixLoading, setmetrixLoading] = useState(true);

  const errcallback = err => {
    if (err.name === 'AbortError') {
      console.log('Request canceled:', err.message);
    } else {
      console.error('Error:', err);
    }
  };

  const getmetrixData = (signal, list) => {
    setmetrixLoading(true);
    postData(overview.metrics, list, signal, null)
      .then(res => {
        setmetrixLoading(false);
        setmetrixData(res?.data?.metrix_data);
      })
      .catch(error => errcallback(error));
  };

  const getoverTimeData = (signal, list) => {
    setoverTimeLoading(true);
    postData(overview.overTime, list, signal, null)
      .then(res => {
        setoverTimeLoading(false);
        setoverTimeData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getatndcfrqncyPerweekData = (signal, list) => {
    setatndcfrqncyweekLoading(true);
    postData(overview.frequency, list, signal, null)
      .then(res => {
        setatndcfrqncyweekLoading(false);
        setatndcfrqncyPerweekData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getavgDailyAttnByteamData = (signal, list) => {
    setteamLoading(true);
    postData(overview.attTeam, list, signal, null)
      .then(res => {
        setteamLoading(false);
        setavgDailyAttnByteamData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getattendance_by_location = (signal, list) => {
    setattendlocationLoading(true);
    postData(overview.location, list, signal, null)
      .then(res => {
        setattendlocationLoading(false);
        setattendance_by_location(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getWrkspcUtlsByDaysofWeek = (signal, list) => {
    setDaysofWeekLoading(true);
    postData(overview.daysofweek, list, signal, null)
      .then(res => {
        setDaysofWeekLoading(false);
        setWrkspcUtlsByDaysofWeek(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getutilization_densityData = (signal, list) => {
    setdensityLoading(true);
    postData(overview.density, list, signal, null)
      .then(res => {
        setdensityLoading(false);
        setutilization_densityData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getHybridWorkingStatusData = (signal, list) => {
    setHybridStatusLoading(true);
    postData(overview.hybrid, list, signal, null)
      .then(res => {
        setHybridStatusLoading(false);
        setHybridWorkingStatusData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  const getteamData = (signal, list) => {
    setavgAttnByteamLoading(true);
    postData(overview.teamDashboard, list, signal, null)
      .then(res => {
        setavgAttnByteamLoading(false);
        setteamData(res?.data?.utilization_by);
      })
      .catch(error => errcallback(error));
  };

  useEffect(() => {
    if (list) {
      let filter = {
        ...list,
        floor_type: tabinfo?.floor_type,
      };
      //const controller = new AbortController();
      let data = list?.location_id?.some(elm => elm === undefined);
      if (!data) {
        const signal = null; //controller.signal;
        getmetrixData(signal, filter);
        getoverTimeData(signal, filter);
        getatndcfrqncyPerweekData(signal, filter);
        getavgDailyAttnByteamData(signal, filter);
        getattendance_by_location(signal, filter);
        getWrkspcUtlsByDaysofWeek(signal, filter);
        getutilization_densityData(signal, filter);
        getHybridWorkingStatusData(signal, filter);
        getteamData(signal, filter);
      }

      // return () => {
      //   controller.abort(); // Abort the request using the controller
      // };
    }
  }, [list]);

  const customTeamDataData = { ...teamData };
  const customAttendance_by_locationData = { ...attendance_by_location };
  const custom_average_daily_attendance_by_teamData = {
    ...avgDailyAttnByteamData,
  };

  //Team Attendance
  let totalAvgTeam = 0;
  if (avgDailyAttnByteamData && avgDailyAttnByteamData?.data) {
    totalAvgTeam = Object.keys(avgDailyAttnByteamData?.data).length;
  }

  if (
    totalAvgTeam > groupingOthersMINlen &&
    totalAvgTeam != groupingOthersMAXlen
  ) {
    const attendaneLocationData = avgDailyAttnByteamData?.data;

    const result = {};

    let firstIndexCountSum = 0;
    let loopIndex = 0;
    let previousCountIndex = 0;
    let totalTeamCount = 0;
    let isFirstIndex = true;

    for (const team in attendaneLocationData) {
      if (loopIndex >= groupingOthersMINlen) {
        firstIndexCountSum += attendaneLocationData[team].count; // sum of count from the first index
        previousCountIndex += attendaneLocationData[team].previousCount; // sum of count from the first index
        totalTeamCount += attendaneLocationData[team].totalTeamCount; // sum of count from the first index

        isFirstIndex = false;
      } else {
        const newTeam = attendaneLocationData[team];
        result[team] = newTeam;
      }
      loopIndex++;
    }

    const totAttendanceTeam = changePercentageFormula(
      firstIndexCountSum,
      previousCountIndex,
    );

    const userAvg = Math.round(firstIndexCountSum / totalTeamCount) * 100;

    const othersEntryTeam = {
      average: totAttendanceTeam?.percentage,
      count: firstIndexCountSum,
      previousCount: previousCountIndex,
      ratio: totAttendanceTeam?.ratio,
      totalTeamCount: totalTeamCount,
      type: 'Others',
      userAvg: userAvg,
    };
    result['Others'] = othersEntryTeam;
    custom_average_daily_attendance_by_teamData['data'] = result;
  }

  // Location
  const attendanceLocation: Object[] = [];

  if (
    attendance_by_location?.data?.length > groupingOthersMINlen &&
    attendance_by_location?.data?.length != groupingOthersMAXlen
  ) {
    const attendaneLocationData = attendance_by_location?.data;

    for (let i = 0; i < attendaneLocationData?.length; i++) {
      const item = attendaneLocationData[i];
      if (i >= groupingOthersMINlen) {
      } else {
        attendanceLocation.push(item);
      }
    }

    let othersCount = 0;
    let previousCount = 0;

    for (let i = groupingOthersMINlen; i < attendaneLocationData.length; i++) {
      othersCount += attendaneLocationData[i].count;
      previousCount += attendaneLocationData[i].previousCount;
    }

    const tot = changePercentageFormula(othersCount, previousCount);
    // Create a new entry for "others"
    const othersEntry = {
      name: 'Others',
      count: othersCount,
      average: tot?.percentage,
      ratio: tot?.ratio,
    };

    attendanceLocation.push(othersEntry);
    customAttendance_by_locationData['data'] = attendanceLocation;
  }

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

  let metricsData: Object[] = [];
  useEffect(() => {
    if (metrix_data?.length > 0) {
      metricsData = metrix_data?.map(item => {
        return {
          ...item,
          value: item?.type == 'active' ? `${item?.count}` : item?.count,
          title: item?.label,
        };
      });
      SetfirstRowmetrics(metricsData.slice(0, 8));
      SetsecondRowmetrics(metricsData.slice(8));
    }
  }, [metrix_data]);

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
                <MetricsList spanValue={6} metricLists={firstRowmetrics} />
              </Skeleton>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isoverTimeLoading}
                >
                  <LinechartComponent
                    subtitle=""
                    title="Utilisation by available hours (%)"
                    data={overTimeData}
                    tabinfo={tabinfo}
                  />
                </Skeleton>
              </Col>

              <Col span={6}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isHybridStatusLoading}
                >
                  <div className="card-d-flex">
                    <div className="card card-shadow card-chart">
                      <PiecahrtComponent
                        title="Hybrid working status"
                        data={HybridWorkingStatusData}
                      />
                    </div>
                  </div>
                </Skeleton>
              </Col>
              <Col span={6}>
                <Row className="h-100" gutter={[10, 0]}>
                  <Skeleton
                    className="card card-d-flex card-shadow card-chart card-bar-radius card-header-abs"
                    loading={ismetrixLoading}
                  >
                    <MetricsList
                      spanValue={24}
                      metricLists={secondRowmetrics}
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
                  loading={isDaysofWeekLoading}
                >
                  <BarcahrtComponent
                    title="Workspaces utilised by days of week (%)"
                    data={WrkspcUtlsByDaysofWeek}
                  />
                </Skeleton>
              </Col>
              <Col span={12}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isavgAttnByteamloading}
                >
                  <OverviewBarcahrtComponent
                    title="Average daily attendance by team (%)"
                    data={custom_average_daily_attendance_by_teamData}
                    originalData={avgDailyAttnByteamData}
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
                  loading={isteamLoading}
                >
                  <StackedWithLineComponent
                    subtitle="No. of desks checked into"
                    title="Total attendance by team"
                    data={customTeamDataData}
                    originalData={teamData}
                  />
                </Skeleton>
              </Col>
              <Col span={12}>
                <Row gutter={[10, 0]} className="h-100">
                  <Col span={24}>
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isatndcfrqncyweekLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Attendance frequency"
                        data={atndcfrqncyPerweekData}
                        originalData={atndcfrqncyPerweekData}
                      />
                    </Skeleton>
                  </Col>

                  <Col span={24}>
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isattendlocationLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Attendance by location"
                        data={customAttendance_by_locationData}
                        originalData={attendance_by_location}
                      />
                    </Skeleton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="rp-page-section">
            <Row gutter={[10, 0]}>
              <Col span={24}>
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isdensityLoading}
                >
                  <HeatmapchartComponent
                    title="Utilisation density"
                    data={utilization_densityData}
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

export default memo(OverviewTabComponent);
