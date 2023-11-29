import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HRRequestHeader from '../../components/hrRequest/header';
import HRNotification from '../../components/hrRequest/hrNotification';
import HRRequestPage from '../../components/hrRequest/hrRequestPage';
import { Col, Row } from 'antd';

const HRRequest = () => {
  const [tabChange, setTabChange] = useState('request');
  const [pastRequest, setPastRequest] = useState('yes');
  const [searchText, setSearchText] = useState('');
  const [listType, setListType] = useState('timeoff');
  const [requestType, setRequestType] = useState('incoming');

  return (
    <div className="page-wrapper">
      <div className="content container-fluid pb-0">
        <Row>
          <Col lg={24} span={24} className="main-space-remove">
            {/* HR Notifications */}
            <HRRequestHeader
              tabChange={tabChange}
              searchText={searchText}
              setTabChange={setTabChange}
              setPastRequest={setPastRequest}
              setSearchText={setSearchText}
              setListType={setListType}
              setRequestType={setRequestType}
            />
            <div className="tab-content" id="myTabContent">
              {tabChange == 'notification' && <HRNotification />}
              {tabChange == 'request' && (
                <HRRequestPage
                  requestType={requestType}
                  pastRequest={pastRequest}
                  searchText={searchText}
                  listType={listType}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HRRequest;
