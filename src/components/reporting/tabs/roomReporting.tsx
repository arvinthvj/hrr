import React,{ useEffect, useState } from 'react';
import { Col, Row, Skeleton } from 'antd';
import MetricsList from '../cards/metricList';
import BarcahrtComponent from '../charts/bar';
import HeatmapchartComponent from '../charts/heatmap';
import LinechartComponent from '../charts/line';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import Rooms from '../tables/rooms';
import StackedWithLineComponent from '../charts/stackedWithLine';
import { postData } from '../../../services/reportingapicall';
import { assets,utilizationbyroomdata } from '../../../services/apiurl';
import { groupingOthersMAXlen, groupingOthersMINlen } from '../constant';

const RoomReporting = (props: any) => {
  const { list, tabinfo } = props;

  const [UtilisedByDaysofWeekData, setUtilisedByDaysofWeekData] = useState([]);
  const [rooms_by_capacityData, setrooms_by_capacityData] = useState([]);
  const [utilisation_densityData, setutilisation_densityData] = useState([]);
  const [over_timeData, setover_timeData] = useState([]);
  const [attendeesData, setattendeesData] = useState([]);
  const [teamData, setteamData] = useState([]);
  const [metrix_data, setmetrixData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(1);
  const [roomList, setRoomList] = useState([]);
  const [roomAllList, setRoomAllList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [
    isUtilisedByDaysofWeekDataLoading,
    setUtilisedByDaysofWeekDataLoading,
  ] = useState(true);
  const [isrooms_by_capacityDataLoading, setrooms_by_capacityDataLoading] =
    useState(true);
  const [isutilisation_densityDataLoading, setutilisation_densityDataLoading] =
    useState(true);
  const [isover_timeDataLoading, setover_timeDataLoading] = useState(true);
  const [isattendeesDataLoading, setattendeesDataLoading] = useState(true);
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

    postData(utilizationbyroomdata, lists, null, (successRes, res) => {
      if (successRes?.data.metrix_data?.list?.length > 0) {
        const resPonseData = successRes?.data?.metrix_data?.list;
        const totalPazeSize = successRes?.data?.metrix_data?.totalPages;
        setTotalRecords(totalPazeSize);
        const totalPazeSizePerPage = Math.ceil(totalPazeSize / 10);
        setTotalPage(totalPazeSizePerPage);
        setRoomList([...resPonseData]);
      } else {
        setRoomList([]);
        setTotalPage(0);
        setTotalRecords(1);
      }
    });

    postData(utilizationbyroomdata, allLists, null, (successRes, res) => {
      if (successRes?.data.metrix_data?.list?.length > 0) {
        const resPonseData = successRes?.data?.metrix_data?.list;
        const preparlist: any = [];
        let j = 0;

        for (const obj of resPonseData) {
          const preparObj = obj;
          preparObj['room_name'] = obj?.room_name;
          preparObj['room_capacity'] = obj?.room_capacity;
          preparObj['avg_attentees'] = obj?.avg_attentees?.count;
          preparObj['total_meetings'] = obj.total_meetings.count;
          preparObj['building'] = obj?.building;
          preparObj['meeting_hours'] = obj?.meeting_hours?.count;
          preparObj['avg_usedtime_perday'] = obj?.avg_usedtime_perday?.count;
          preparObj['attendance_rate'] = obj.attendance_rate?.count;
          preparObj['utilization_percentage'] =
            obj?.utilization_percentage?.count;
          preparObj['capacity_utilization'] = obj?.capacity_utilization?.count;
          preparlist.push(preparObj);
          j++;
        }
        setRoomAllList([...preparlist]);
      } else {
        setRoomAllList([]);
      }
    });
  } 
  const getMetrics = (signal, list) => {
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

  const getrooms_by_capacityData = (signal, list) => {
    postData(assets?.roomsByCapacity, list, signal, null)
      .then(res => {
        setrooms_by_capacityDataLoading(false);
        setrooms_by_capacityData(res?.data?.utilization_by);
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

  const getattendeesData = (signal, list) => {
    postData(assets?.attendees, list, signal, null)
      .then(res => {
        setattendeesDataLoading(false);
        setattendeesData(res?.data?.utilization_by);
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
      getMetrics(signal, filter);
      getteamData(signal, filter);
      getrooms_by_capacityData(signal, filter);
      getover_timeData(signal, filter);
      getUtilisedByDaysofWeekData(signal, filter);
      getattendeesData(signal, filter);
      getutilisation_densityData(signal, filter);

     
    }
  }, [list]);

  const customTeamDataData = { ...teamData };

  // Team
  const teamNewData: Object[] = [];
  const sumTotal = [];

  if (
    teamData?.data?.length > groupingOthersMINlen &&
    teamData?.data?.length != groupingOthersMAXlen
  ) {
    const datas = teamData?.data;

    const totalLength = teamData?.xaxis.length;

    const sumArray = Array(totalLength).fill(0);

    for (let i = groupingOthersMINlen; i < datas?.length; i++) {
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
        teamNewData.push(item);
      }
    }
    teamNewData.push({ name: 'Others', data: sumArray, stack: 'stack1' });
    customTeamDataData['data'] = teamNewData;
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
              <div className="card-d-flex">
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isover_timeDataLoading}
                >
                  <LinechartComponent
                    title="Utilisation over time"
                    subtitle="No. of rooms booked"
                    data={over_timeData}
                    tabinfo={tabinfo}
                  />
                </Skeleton>
              </div>
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
            <Col span={12}>
              <div className="card-d-flex">
                <Skeleton
                  className="card card-shadow card-chart card-bar-radius card-header-abs"
                  loading={isteamDataLoading}
                >
                  <StackedWithLineComponent
                    title="Utilisation by team"
                    subtitle="No. of desks checked into"
                    data={customTeamDataData}
                    originalData={teamData}
                  />
                </Skeleton>
              </div>
            </Col>
            <Col span={12}>
              <Row gutter={[10, 0]} className="h-100">
                <Col span={24}>
                  <div className="card-d-flex">
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isattendeesDataLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Room bookings by no. of attendees"
                        data={attendeesData}
                        originalData={attendeesData}
                      />
                    </Skeleton>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="card-d-flex">
                    <Skeleton
                      className="card card-shadow card-chart card-bar-radius card-header-abs"
                      loading={isrooms_by_capacityDataLoading}
                    >
                      <SingleBarcahrtComponent
                        title="Rooms by Capacity"
                        data={rooms_by_capacityData}
                        originalData={rooms_by_capacityData}
                      />
                    </Skeleton>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            <Col span={24}>
              <div className="card-d-flex">
                <Rooms list={{ ...list, floor_type: tabinfo?.floor_type }} 
                allLists={{ ...list, floor_type: tabinfo?.floor_type }}
                roomList={roomList}
                totalPage={totalPage}
                totalRecords={totalRecords}
                roomAllList={roomAllList}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
              </div>
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

export default RoomReporting;
