import React, { useContext, useEffect, useState } from 'react';
import { postData } from '../../services/reportingapicall';
import moment from 'moment';
import { Col, DatePicker, Row, Spin } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import {
  dashboard_report,
  desk_report,
  engagement_report,
  etc_report,
  parking_report,
  performance_report,
  room_report,
  shield_report,
  visitor_report,
  today_report,
} from '../imagepath';
import DeskReporting from './tabs/deskReporting';
import ParkingReport from './tabs/parkingReporting';
import RoomReporting from './tabs/roomReporting';
import FilterComponent from './filter';
import { assetsList, locatoinlevel } from './constant';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import PeopleOperationReporting from './tabs/peopleOperationReporting';
import OverviewComponent from './tabs/overview';
import TodayReporting from './tabs/todayReporting';
interface TeamListProps {
  id: number;
  name: string;
  member_count: number;
  status: number;
  manager_id: string;
  workspace_id: string | null;
  room_id: string | null;
  parking_id: string | null;
  member_id: Array<number>;
}

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const ReportingComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<any>(assetsList?.[0]);
  const [data, setdata] = useState<any>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>('All teams');
  const [selectedTeamId, setSelectedTeamId] = useState<any>('all');
  const [startDate, setStartDate] = useState<any>(
    moment().startOf('week').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<any>(moment().format('YYYY-MM-DD'));
  const [locationSelectId, setLocationSelectId] = useState<any>();
  const [locationSelectLevel, setLocationSelectLevel] = useState<any>();
  const [teamList, setTeamList] = useState<Array<TeamListProps> | any>([]);
  const [initialLocationSelectId, setInitialLocationSelectId] = useState<any>();
  const [initialLocationSelectLevel, setInitialLocationSelectLevel] =
    useState<any>();
  const [initialValue, setInitialValue] = useState(true); // Change 'Initial Value' to your desired initial value
  const [resetDefaultBuliding, setResetDefaultBuliding] = useState('');
  const [resetDefaultFloor, setResetDefaultFloor] = useState('');
  const dispatch = useDispatch();
  // const { userDetails } = useSelector((state: any) => state?.app);

  const locationLevel = locatoinlevel.filter(
    level => level.name === locationSelectLevel,
  );

  let level;
  if (locationLevel.length > 0) {
    level = locationLevel[0].id;
  } else {
    level = 0;
  }

  const list = {
    location_id: [locationSelectId],
    location_level: level,
    team: selectedTeamId != 'all' ? [selectedTeamId] : selectedTeamId,
    floor_type: selectedTab?.floor_type,
    from_datetime: startDate, // monday.format('YYYY-MM-DD'),
    to_datetime: endDate, // friday.format('YYYY-MM-DD'),
  };

  const currentDate = moment();

  const monday = currentDate.clone();
  while (monday.day() !== 1) {
    monday.add(1, 'day');
  }

  const friday = currentDate.clone();
  while (friday.day() !== 5) {
    friday.add(1, 'day');
  }

  const [filtersData, setfiltersData] = useState({
    location_id: [locationSelectId],
    location_level: level,
    team: selectedTeamId != 'all' ? [selectedTeamId] : selectedTeamId,
    floor_type: selectedTab?.floor_type,
    from_datetime: startDate,
    to_datetime: endDate,
  });

  useEffect(() => {
    setfiltersData({
      location_id: [locationSelectId],
      location_level: level,
      team: selectedTeamId != 'all' ? [selectedTeamId] : selectedTeamId,
      floor_type: selectedTab?.floor_type,
      from_datetime: startDate,
      to_datetime: endDate,
    });
  }, [selectedTeamId, startDate, endDate, locationSelectId]);

  useEffect(() => {
    setSelectedTab(selectedTab);
  }, [selectedTab]);

  const tabChange = opt => {
    if (opt.id == 0) {
      setfiltersData({
        location_id: [locationSelectId],
        location_level: level,
        team: selectedTeamId != 'all' ? [selectedTeamId] : selectedTeamId,
        floor_type: selectedTab?.floor_type,
        from_datetime: moment().format('YYYY-MM-DD'),
        to_datetime: moment().format('YYYY-MM-DD'),
      });
    } else {
      setfiltersData({
        location_id: [locationSelectId],
        location_level: level,
        team: selectedTeamId != 'all' ? [selectedTeamId] : selectedTeamId,
        floor_type: selectedTab?.floor_type,
        from_datetime: startDate,
        to_datetime: endDate,
      });
    }
    setSelectedTab(opt);
  };

  const renderTabList = (opt, index) => {
    console.log('opt', opt);

    return (
      <li key={index} className="nav-item" role="presentation">
        <Link
          className={
            opt.id == selectedTab?.id ? 'nav-link active ' : 'nav-link '
          }
          to={'#'}
          onClick={() => tabChange(opt)}
        >
          <img src={setIcon(opt.id)} alt="" />
        </Link>
      </li>
    );
  };

  const setIcon = type => {
    if (type == 0 || type) {
      for (const obj of assetsList) {
        if (obj.id == type) {
          return obj.id == 0
            ? etc_report
            : obj.id == 1
            ? dashboard_report
            : obj.id == 2
            ? desk_report
            : obj.id == 3
            ? room_report
            : obj.id == 4
            ? parking_report
            : obj.id == 5
            ? shield_report
            : obj.id == 6
            ? visitor_report
            : obj.id == 7
            ? engagement_report
            : obj.id == 8
            ? today_report
            : obj.id == 9
            ? performance_report
            : etc_report;
        }
      }
    }
  };

  return (
    <>
      <Row>
        <Col
          lg={24}
          xl={24}
          sm={24}
          md={24}
          xs={24}
          className="main-space-remove"
        >
          <div className="card book-view-card booking-table-card report-table-card">
            <Row>
              <Col lg={24} xl={24} sm={24} md={24} xs={24}>
                <div className="book-left-info">
                  <div className="book-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {assetsList?.length > 0
                        ? assetsList.map((opt, index) => {
                            return renderTabList(opt, index);
                          })
                        : null}
                    </ul>
                  </div>
                  <div className="book-header">
                    <h4>{selectedTab?.name || 'Overview'}</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <FilterComponent
              {...selectedTab}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              selectedTeamId={selectedTeamId}
              setSelectedTeamId={setSelectedTeamId}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              locationSelectId={locationSelectId}
              setLocationSelectId={setLocationSelectId}
              locationSelectLevel={locationSelectLevel}
              setLocationSelectLevel={setLocationSelectLevel}
              setInitialLocationSelectId={setInitialLocationSelectId}
              setInitialLocationSelectLevel={setInitialLocationSelectLevel}
              setInitialValue={setInitialValue}
              initialValue={initialValue}
              setResetDefaultBuliding={setResetDefaultBuliding}
              setResetDefaultFloor={setResetDefaultFloor}
              initialLocationSelectId={initialLocationSelectId}
              initialLocationSelectLevel={initialLocationSelectLevel}
              resetDefaultBuliding={resetDefaultBuliding}
              resetDefaultFloor={resetDefaultFloor}
              tabinfo={selectedTab}
            />
          </div>
          <div className="card-body">
            {selectedTab?.id == 0 && (
              <TodayReporting tabinfo={selectedTab} list={filtersData} />
            )}
            {selectedTab?.id == 1 && (
              <OverviewComponent tabinfo={selectedTab} list={filtersData} />
            )}
            {selectedTab?.id == 2 && (
              <DeskReporting tabinfo={selectedTab} list={filtersData} />
            )}
            {selectedTab?.id == 3 && (
              <RoomReporting tabinfo={selectedTab} list={filtersData} />
            )}
            {selectedTab?.id == 4 && (
              <ParkingReport tabinfo={selectedTab} list={filtersData} />
            )}
            {selectedTab?.id == 7 && (
              <PeopleOperationReporting filtersData={filtersData} />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportingComponent;
