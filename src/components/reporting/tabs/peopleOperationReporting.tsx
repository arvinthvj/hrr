import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import MetricsList from '../cards/metricList';
import SingleBarcahrtComponent from '../charts/SingleBarcahrt';
import { REPORTING_CHART_TITLE } from '../constant';
import { hrReports } from '../../../services/apiurl';
import { postData } from '../../../services/reportingapicall';
import StackedWithLineComponent from '../charts/stackedWithLine';
import EmploymentTimeOffData from '../tables/employmentTimeOffData';
import BarcahrtComponent from '../charts/bar';
import { Skeleton } from 'antd';


const PeopleOperationReporting = (filtersData: any) => {
  const filterList = filtersData?.filtersData ? filtersData?.filtersData : {};

  const [metricsData, setMetricsData] = useState({});
  const [employeeLengthData, setEmployeeLengthData] = useState({});
  const [employeeStatus, setEmployeeStatus] = useState({});
  const [employeeStatusOverTime, setEmployeeStatusOverTime] = useState({});
  const [employeeAgeGroup, setEmployeeAgeGroup] = useState({});
  const [employeeAbesenceOverReason, setEmployeeAbesenceOverReason] = useState(
    {},
  );
  const [employeeGender, setEmployeeGender] = useState({});
  const [employeeHeadCount, setEmployeeHeadCount] = useState({});
  const [employeeLocation, setSmployeeLocation] = useState({});
  const [employeeTimeOfData, setEmployeeTimeOfData] = useState([]);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  const [isEmployeeLengthDataLoading, setIsEmployeeLengthDataLoading] =
    useState(true);
  const [isEmployeeStatusLoading, setIsEmployeeStatusLoading] = useState(true);
  const [isEmployeeStatusOverTimeLoading, setIsEmployeeStatusOverTimeLoading] =
    useState(true);
  const [isEmployeeAgeGroupLoading, setIsEmployeeAgeGroupLoading] =
    useState(true);
  const [
    isEmployeeAbesenceOverReasonLoading,
    setIsEmployeeAbesenceOverReasonLoading,
  ] = useState(true);

  const [isEmployeeGenderLoading, setIsEmployeeGenderLoading] = useState(true);
  const [isEmployeeHeadCountLoading, setIsEmployeeHeadCountLoading] =
    useState(true);
  const [isEmployeeLocationLoading, setIsSmployeeLocationLoading] =
    useState(true);
  const [isEmployeeTimeOfDataLoading, setIsEmployeeTimeOfDataLoading] =
    useState(true);

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    getEmployeeByData(signal);
    getMetricsData(signal);
    getEmployeeLengthData(signal);
    getEmployeeStatus(signal);
    getPeopleStatusOverTime(signal);
    getPeopleAgeGroup(signal);
    getAbesenceOverReason(signal);
    getEmployeeByGender(signal);
    getEmployeeHeadCount(signal);
    getEmployeeLocation(signal);
  }, [filterList]);

  const errcallback = err => {
    if (err.name === 'AbortError') {
      console.log('Request canceled:', err.message);
    } else {
      console.error('Error:', err);
    }
  };

  const getEmployeeByData = signal => {
    postData(hrReports.employeeByTimeOfData, filterList, signal, null)
      .then(data => {
        setIsEmployeeTimeOfDataLoading(false);
        if (data?.data?.emp_timeoff_data) {
          setEmployeeTimeOfData(data?.data?.emp_timeoff_data?.list || []);
        }
      })
      .catch(error => errcallback(error));
  };

  const getEmployeeByGender = signal => {
    postData(hrReports.employeeByGender, filterList, signal, null)
      .then(data => {
        setIsEmployeeGenderLoading(false);
        if (data?.data?.resultValue?.[0]) {
          setEmployeeGender(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getEmployeeHeadCount = signal => {
    postData(hrReports.employeeHeadCountTeam, filterList, signal, null)
      .then(data => {
        setIsEmployeeHeadCountLoading(false);
        if (data?.data?.resultValue?.[0]) {
          setEmployeeHeadCount(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getEmployeeLocation = signal => {
    postData(hrReports.employeeByLocation, filterList, signal, null)
      .then(data => {
        setIsSmployeeLocationLoading(false);
        if (data?.data?.resultValue?.[0]) {
          setSmployeeLocation(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getAbesenceOverReason = signal => {
    postData(hrReports.employeeAbsenceOverReason, filterList, signal, null)
      .then(data => {
        setIsEmployeeAbesenceOverReasonLoading(false);
        if (data?.data && data?.data?.resultValue?.[0]) {
          let responseData = { ...data?.data?.resultValue?.[0] };
          let absenseRate = (responseData?.data || []).find(
            item => item?.name === 'Absence Rate %',
          );
          if (absenseRate && Object.keys(absenseRate)?.length > 0) {
            let array = (responseData?.data || []).filter(
              _dt => _dt?.name != 'Absence Rate %',
            );

            let lineObject = {
              name: 'Absence Rate %',
              type: 'line',
              zIndex: 2,
              data: absenseRate?.data,
              marker: { symbol: 'circle' },
              legendSymbol: 'rectangle',
            };
            array.unshift(lineObject);
            responseData.data = array;
            setEmployeeAbesenceOverReason(responseData);
          }
        }
      })
      .catch(error => errcallback(error));
  };

  const getPeopleAgeGroup = signal => {
    postData(hrReports.employeeAgeGroup, filterList, signal, null)
      .then(data => {
        if (data?.data?.resultValue?.[0]) {
          setIsEmployeeAgeGroupLoading(false);
          setEmployeeAgeGroup(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getPeopleStatusOverTime = signal => {
    postData(hrReports.empoloyeeStatusOverTime, filterList, signal, null)
      .then(data => {
        setIsEmployeeStatusOverTimeLoading(false);
        if (data?.data?.resultValue?.[0]) {
          setEmployeeStatusOverTime(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getEmployeeStatus = signal => {
    postData(hrReports.employeeStatus, filterList, signal, null)
      .then(data => {
        if (data?.data?.resultValue?.[0]) {
          setIsEmployeeStatusLoading(false);
          setEmployeeStatus(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getEmployeeLengthData = signal => {
    postData(hrReports.employeeLengthService, filterList, signal, null)
      .then(data => {
        setIsEmployeeLengthDataLoading(false);

        if (data?.data?.resultValue?.[0]) {
          setEmployeeLengthData(data?.data?.resultValue?.[0]);
        }
      })
      .catch(error => errcallback(error));
  };

  const getMetricsData = signal => {
    postData(hrReports.matrics, filterList, signal, null).then(data => {
      if (data?.data?.metrix_data) {
        metrixData(data?.data?.metrix_data || []);
      }
    });
  };

  const metrixData = (data: any) => {
    let metricsData: Object[] = [];
    if (data) {
      metricsData = data?.map(item => {
        return {
          ...item,
          value: item.type == 'hr_active' ? `${item.count} users` : item.count,
          title: item?.label,
        };
      });
      setMetricsData(metricsData);
      setIsMetricsLoading(false);
    }
  };

  return (
    <>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" role="tabpanel">
          <Row gutter={[10, 0]}>
            <Skeleton
              className="card card-shadow card-chart card-bar-radius card-header-abs"
              loading={isMetricsLoading}
            >
              <MetricsList spanValue={6} metricLists={metricsData || []} />
            </Skeleton>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeStatusOverTimeLoading}
              >
                <StackedWithLineComponent
                  subtitle="Employee headcount"
                  title={
                    REPORTING_CHART_TITLE.headcount_by_employment_status_over_time
                  }
                  data={employeeStatusOverTime}
                />
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeHeadCountLoading}
              >
                <BarcahrtComponent
                  title={REPORTING_CHART_TITLE.avg_head_count_by_team}
                  data={employeeHeadCount}
                  category={employeeHeadCount?.category}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeAbesenceOverReasonLoading}
              >
                <StackedWithLineComponent
                  subtitle="No. of absences"
                  title={REPORTING_CHART_TITLE.absence_by_reason_over_time}
                  data={employeeAbesenceOverReason}
                />
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeLocationLoading}
              >
                <BarcahrtComponent
                  title={REPORTING_CHART_TITLE.avg_head_count_by_location}
                  data={employeeLocation}
                  category={employeeLocation?.category}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeLengthDataLoading}
              >
                <SingleBarcahrtComponent
                  title={REPORTING_CHART_TITLE.emp_by_length_service}
                  data={employeeLengthData}
                />
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeStatusLoading}
              >
                <SingleBarcahrtComponent
                  title={REPORTING_CHART_TITLE.emp_status}
                  data={employeeStatus}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeAgeGroupLoading}
              >
                <SingleBarcahrtComponent
                  title={REPORTING_CHART_TITLE.emp_by_age_grp}
                  data={employeeAgeGroup}
                />
              </Skeleton>
            </Col>
            <Col span={12}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeGenderLoading}
              >
                <SingleBarcahrtComponent
                  title={REPORTING_CHART_TITLE.emp_by_gender}
                  data={employeeGender}
                />
              </Skeleton>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={24}>
              <Skeleton
                className="card card-shadow card-chart card-bar-radius card-header-abs"
                loading={isEmployeeTimeOfDataLoading}
              >
                <EmploymentTimeOffData
                  list={filtersData}
                  data={employeeTimeOfData}
                  signal={signal}
                />
              </Skeleton>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PeopleOperationReporting;
