import React from 'react';
import { Col, Popover } from 'antd';
import {
  TeamIcon,
  dashboard_report,
  desk_report,
  engagement_report,
  etc_report,
  info,
  team_report,
  parking_report,
  performance_report,
  room_report,
  shield_report,
  visitor_report,
} from '../../imagepath';

const MetricsList = props => {
  const { metricLists, spanValue } = props;
  const sortedmetricLists = metricLists?.sort((a, b) => a.order - b.order);
  const nonPercentageAvgs = ['busiest_day', 'estimated_busiest_hour'];

  const setIcon = type => {
    return type == 'dashboard_report'
      ? dashboard_report
      : type == 'desk_report'
      ? desk_report
      : type == 'room_report'
      ? room_report
      : type == 'parking_report'
      ? parking_report
      : type == 5
      ? shield_report
      : type == 6
      ? visitor_report
      : type == 7
      ? engagement_report
      : type == 8
      ? performance_report
      : etc_report
      ? team_report
      : type == 'team_report';
  };

  return (
    <>
      {sortedmetricLists?.map((metric, index) => (
        <Col span={spanValue} key={index}>
          <div className="card-d-flex">
            <div className="card card-shadow d-flex report-status-card">
              {metric?.icon?.status && (
                <div className="report-status-card-img">
                  <img src={setIcon(metric?.icon?.src)} alt="" />
                </div>
              )}
              <div className="report-status-card-details">
                <div className="report-status-header">
                  <span className="grey">{metric?.title}</span>
                  {metric?.tooltip && (
                    <Popover content={metric?.title}>
                      <img src={info} alt="" />
                    </Popover>
                  )}
                </div>
                {metric?.isMetricAvailable ? (
                  <>
                    <h4 className="hotdeskblue">
                      {metric?.value ? metric?.value : 0}
                      {metric?.countinpercentage && '%'}
                    </h4>
                    <span className={`status-badge status-${metric?.ratio}`}>
                      {metric?.average ? metric?.average : 0}
                      {!nonPercentageAvgs?.includes(metric?.type) && '%'}
                    </span>
                  </>
                ) : (
                  <>
                    <h4 className="hotdeskblue"></h4>
                    <span className={`status-badge`}>-</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};
export default MetricsList;
