import React, { useEffect, useState } from 'react';
import { BookingContext } from '../../components/context/context';
import BookParking from './bookParking';
import BookRooms from './bookRooms';
import BookWorkSpace from './bookWorkSpace';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import BookAssets from '../../components/book/bookAssets';
import BookViewByList from '../../components/book/bookViewByList';
import BookDateFilter from '../../components/book/bookDateFIiter';
import BookLocationSelect from '../../components/book/bookLocationSelect';
import StartTimeWithEndTime from '../../components/book/startTimeWithEndTime';
import RoomCapacity from '../../components/book/roomCapacity';
import BookFilter from '../../components/book/bookFilter';
import ParkingRegistrationNo from '../../components/book/parkingRegistrationNo';
import { Col, Row } from 'antd';
import {
  PlanLabel,
  ViewByIds,
} from '../../components/planModuleComponent/constants';

type BookTabProps = {
  id: number;
  name: string;
  icon_images: string;
};
type SelectedLocationProps = {
  id: string;
  name: string;
  working_days: Array<string>;
  timezone: string;
  utc_format: string;
  fullname: string;
  label: string;
  value: string;
};

const Book = () => {
  const [selectedTab, setSelectedTab] = useState<BookTabProps | null>(null);
  const [viewBy, setViewBy] = useState('1');
  const [selectedLoaction, setSelectedLocation] =
    useState<SelectedLocationProps | null>(null);
  const [capacityList, setCapacityList] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<
    Array<number> | []
  >([]);
  const [bookDate, setBookDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [timezone, setTimeZone] = useState('');
  const [timezoneId, setTimeZoneId] = useState('');
  const { userDetails } = useSelector((state: any) => state?.app);
  const [registration, setRegistration] = useState(
    userDetails?.vehicle_register_no,
  );

  useEffect(() => {
    setSelectedAmenities([]);
    setSelectedCapacity('');
    setSearch('');
  }, [selectedTab]);

  return (
    <React.Fragment>
      <BookingContext.Provider
        value={{
          search: search,
          selectedTab: selectedTab,
          viewBy: viewBy,
          startTime: startTime,
          endTime: endTime,
          selectedLocation: selectedLoaction,
          selectedCapacity: selectedCapacity,
          selectedFilter: selectedAmenities,
          bookDate: bookDate,
          capacityList: capacityList,
          setViewBy: setViewBy,
          setBookDate: setBookDate,
          setSelectedTab: setSelectedTab,
          showPageloading: () => dispatch(showLoader()),
          hidePageloading: () => dispatch(hideLoader()),
          setCapacityList: setCapacityList,
          setInitialCapacity: setSelectedCapacity,
          setSearch: setSearch,
          setSelectedLocation: setSelectedLocation,
          setStartTime: setStartTime,
          setEndTime: setEndTime,
          setSelectedAmenities: setSelectedAmenities,
          timezone: timezone,
          setTimeZone: setTimeZone,
          timezoneId: timezoneId,
          setTimeZoneId: setTimeZoneId,
          registration: registration,
        }}
      >
        <div className={'main-wrapper'}>
          <div className="page-wrapper">
            <div className="content container-fluid pb-0">
              <Row>
                <Col
                  // span={24}
                  lg={24}
                  xl={24}
                  sm={24}
                  md={24}
                  xs={24}
                  className="main-space-remove"
                >
                  <div className="card book-view-card booking-table-card">
                    <Row>
                      <BookAssets />
                      <Col xl={12} lg={24} sm={24} md={24} xs={24}>
                        <div className="book-right-info">
                          <BookViewByList />
                          <BookDateFilter />
                        </div>
                      </Col>
                    </Row>
                    <div className="card-body">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          role="tabpanel"
                        >
                          <Row>
                            <Col span={24}>
                              <div className="booking-filter">
                                <ul className="nav">
                                  <BookLocationSelect />
                                  <StartTimeWithEndTime />
                                  {selectedTab?.id == PlanLabel.selectedTabB &&
                                    viewBy == ViewByIds.month && (
                                      <RoomCapacity />
                                    )}
                                  {viewBy == ViewByIds.month && <BookFilter />}
                                  {selectedTab?.id == PlanLabel.selectedTabC &&
                                    viewBy == ViewByIds.month && (
                                      <ParkingRegistrationNo
                                        registration={registration}
                                        setRegistration={setRegistration}
                                      />
                                    )}
                                </ul>
                              </div>
                            </Col>
                          </Row>
                          {selectedTab?.id == PlanLabel.selectedTabA ? (
                            <BookWorkSpace />
                          ) : selectedTab?.id == PlanLabel.selectedTabB ? (
                            <BookRooms />
                          ) : selectedTab?.id == PlanLabel.selectedTabC ? (
                            <BookParking />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BookingContext.Provider>
    </React.Fragment>
  );
};
export default Book;
