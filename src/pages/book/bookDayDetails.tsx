import React, { useContext } from 'react';
import { BookingContext } from '../../components/context/context';
import { selectedTypes } from '../../assets/constants/config';
import { findLabelText } from '../../components/commonMethod';
import { BookTeamHover } from './bookTeamHover';
import { Row, Tooltip } from 'antd';
import {
  PlanTextLabel,
  ViewByIds,
} from '../../components/planModuleComponent/constants';
import { TimeRightIcon, TimeleftIcon } from '../../components/imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { Link } from 'react-router-dom';
import { findFirstName } from '../../assets/globals';

interface BookDayDetailsProps {
  bookingInfo: Object;
  visible: boolean;
  selectedDaysDetails: any;
  startTime: string;
  endTime: string;
}

const BookDayDetails: React.FC<BookDayDetailsProps> = ({
  bookingInfo,
  visible,
  selectedDaysDetails,
  startTime,
  endTime,
}) => {
  const { viewBy, selectedTab } = useContext(BookingContext);
  const details = bookingInfo
    ? bookingInfo[selectedDaysDetails?.assetDetails?.id]
    : [];
  const userDetails = details?.find(item => {
    return item?.booking_id === selectedDaysDetails?.booking_id;
  });
  const validateStyle = (status, type = '') => {
    if (status) {
      for (const obj of selectedTypes) {
        if (obj.status == status) {
          if (type == 'container') {
            return obj.containerStyle;
          } else {
            return obj.indicationStyle;
          }
        }
      }
    }
  };
  const renderDescription = description => {
    if (description && description.length > 150) {
      return (
        <Tooltip placement="right" title={description}>
          {description.substring(0, 150)}...
        </Tooltip>
      );
    }
    return <span>{description}</span>;
  };
  const sortByName = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  const renderAmenities = amenList => {
    amenList?.length > 1 && amenList.sort(sortByName);
    const firstHalf = amenList?.slice(0, 4);
    const secondHalf = amenList?.slice(4)?.map(i => i?.name);
    return [firstHalf, secondHalf];
  };
  return (
    <>
      {/* Booking Group */}
      <div
        className="booking-group"
        style={{ display: visible ? 'block' : 'none' }}
      >
        {viewBy != ViewByIds.team &&
        selectedDaysDetails &&
        selectedDaysDetails?.assetDetails?.id &&
        Object.keys(selectedDaysDetails)?.length > 0 ? (
          <div
            style={{ minHeight: '85px' }}
            className={validateStyle(selectedDaysDetails.status, 'container')}
          >
            <Row className="row">
              <div className="col-lg-3">
                <div className="booking-desk-head booking-desk-head-info">
                  <h4>{selectedDaysDetails?.assetDetails?.name}</h4>
                  <p>
                    <span
                      className={validateStyle(selectedDaysDetails?.status)}
                    />{' '}
                    {selectedDaysDetails?.status}
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                {selectedDaysDetails?.status == 'Booked by me' ||
                selectedDaysDetails?.status == 'Booked' ? (
                  <div className="locate-teamavaliable locate-deskavail booking-user">
                    <div className="locate-availeft">
                      {userDetails?.profile_photo ? (
                        <div className="locate-user">
                          <Link to="#">
                            <GetImgaeFromS3Bucket
                              imageFile={userDetails?.profile_photo}
                              type={'image'}
                              FilePath=""
                              userDetail={userDetails}
                              name={findFirstName(userDetails?.display_name)}
                              style={'hr'}
                            />
                            <span className="online" />
                          </Link>
                        </div>
                      ) : (
                        <span className="user-firstletter">
                          {findFirstName(userDetails?.display_name)}
                        </span>
                      )}
                      <div className="locate-username">
                        <div className="locate-description">
                          <h5>
                            <span>
                              {' '}
                              {userDetails?.first_name
                                ? userDetails?.first_name
                                : ''}
                            </span>
                            <span className="me-2">
                              {' '}
                              {userDetails?.last_name
                                ? userDetails?.last_name
                                : ''}
                            </span>

                            <span />
                            {userDetails?.user_hs_roles?.length > 0
                              ? userDetails?.user_hs_roles?.map((r, i) => {
                                  return (
                                    <span key={i}>
                                      <GetImgaeFromS3Bucket
                                        imageFile={r?.health_safety_icons}
                                        type={'image'}
                                        FilePath="ghs"
                                      />
                                    </span>
                                  );
                                })
                              : ''}
                          </h5>
                        </div>

                        <div className="locate-time">
                          <p>
                            <img
                              src={TimeleftIcon}
                              className="me-1"
                              alt="img"
                            />
                            {userDetails?.booking_start_time
                              ? userDetails?.booking_start_time
                              : ''}
                          </p>
                          &nbsp;&nbsp;&nbsp;
                          <p>
                            <img
                              src={TimeRightIcon}
                              className="me-1"
                              alt="img"
                            />
                            {userDetails?.booking_end_time
                              ? userDetails?.booking_end_time
                              : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="booking-description">
                    <h5>
                      {findLabelText(
                        PlanTextLabel.Description,
                        PlanTextLabel.Description,
                        PlanTextLabel.Book,
                      )}
                    </h5>
                    <p>
                      {renderDescription(
                        selectedDaysDetails?.assetDetails?.description,
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="col-lg-2">
                <div className="locate-time-info">
                  <p>
                    <img src={TimeleftIcon} className="me-1" alt="img" />
                    {userDetails?.booking_start_time
                      ? userDetails?.booking_start_time
                      : startTime}
                  </p>
                  &nbsp;&nbsp;&nbsp;
                  <p>
                    <img src={TimeRightIcon} className="me-1" alt="img" />
                    {userDetails?.booking_end_time
                      ? userDetails?.booking_end_time
                      : endTime}
                  </p>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="booking-desk-list">
                  <ul className="nav">
                    {typeof selectedDaysDetails?.assetDetails?.amenities !==
                      'string' &&
                    selectedDaysDetails?.assetDetails?.amenities?.length > 0 ? (
                      <>
                        {renderAmenities(
                          selectedDaysDetails?.assetDetails?.amenities,
                        )[0]?.map((item, index) => {
                          return <li key={index}>{item?.name}</li>;
                        })}
                        {renderAmenities(
                          selectedDaysDetails?.assetDetails?.amenities,
                        )[1]?.length > 0 ? (
                          <Tooltip
                            placement="right"
                            title={renderAmenities(
                              selectedDaysDetails?.assetDetails?.amenities,
                            )[1]?.toString()}
                          >
                            <li key={'dot'}>...</li>
                          </Tooltip>
                        ) : null}
                      </>
                    ) : null}
                  </ul>
                </div>
              </div>
            </Row>
          </div>
        ) : null}
        {/* Booking Grid Booked Me */}
      </div>
      {viewBy == ViewByIds.team &&
      selectedDaysDetails &&
      Object.keys(selectedDaysDetails)?.length > 0 ? (
        <BookTeamHover
          selectedDaysDetails={selectedDaysDetails}
          type={selectedTab?.id}
          visible={visible}
        />
      ) : null}
      {/* Booking Group */}
    </>
  );
};

export default BookDayDetails;
