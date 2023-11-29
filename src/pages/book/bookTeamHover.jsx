import React from 'react';
import { Link } from 'react-router-dom';
import {
  TimeRightIcon,
  TimeleftIcon,
  book_1,
  book_2,
  book_3,
  inOffice,
  outOffice,
  workingRemotely,
} from '../../components/imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { PlanLabel } from '../../components/planModuleComponent/constants';
import { findFirstName } from '../../assets/globals';
import { Tooltip } from 'antd';

export const BookTeamHover = ({ selectedDaysDetails, type, visible }) => {
  const selectedTypes = [
    {
      status: PlanLabel.In_Office,
      containerStyle: 'user-in-office',
    },
    {
      status: PlanLabel.OutOffice,
      containerStyle: 'user-out-office',
    },
    {
      status: PlanLabel.Remote,
      containerStyle: 'user-work-remote',
    },
    {
      status: PlanLabel.Unknown,
      containerStyle: 'user-unknown',
    },
    {
      status: PlanLabel.Booking,
      containerStyle: 'user-work-book',
    },
    {
      status: PlanLabel.Available,
      containerStyle: 'user-available',
    },
    {
      status: PlanLabel.Unavailable,
      containerStyle: 'user-unavailable',
    },
  ];
  const Styles = status => {
    if (status) {
      for (const obj of selectedTypes) {
        if (obj.status == status) {
          return obj.containerStyle;
        }
      }
    }
  };
  const sortByName = (a, b) => {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
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
    var firstHalf = amenList?.slice(0, 4);
    var secondHalf = amenList?.slice(4)?.map(i => i?.name);
    return [firstHalf, secondHalf];
  };
  const renderDescription = description => {
    if (description && description.length > 30) {
      return (
        <Tooltip placement="right" title={description}>
          {description.substring(0, 30)}...
        </Tooltip>
      );
    }
    return <span>{description}</span>;
  };
  const healthImages = icon => {
    if (icon == PlanLabel.fire_icon_aid)
      return 'fire_icon_aid_1674810721282.svg';
    else if (icon == PlanLabel.fire_icon) return 'fire_icon_1674809438517.svg';
    else return 'warden-icon_1674809293661.svg';
  };
  return (
    <>
      {selectedDaysDetails?.userDetails?.name && (
        <div
          className="user-books-blk"
          style={{ display: visible ? 'block' : 'none' }}
        >
          <div
            style={{ maxHeight: '70px', minHeight: '70px' }}
            className={`locate-rooms-grid desk-hover-booked-me ${Styles(
              selectedDaysDetails?.status,
            )}`}
          >
            <div className="row">
              <div className="col-lg-3">
                <div className="locate-teamavaliable locate-deskavail">
                  <div className="locate-availeft">
                    <div className="locate-user">
                      <Link to="#">
                        {selectedDaysDetails?.userDetails?.profile_photo &&
                          selectedDaysDetails?.userDetails?.id ? (
                          <>
                            <GetImgaeFromS3Bucket
                              imageFile={
                                selectedDaysDetails?.userDetails?.profile_photo
                              }
                              type={'image'}
                              userDetail={selectedDaysDetails?.userDetails}
                              name={findFirstName(
                                selectedDaysDetails?.userDetails?.name ||
                                selectedDaysDetails?.userDetails?.name,
                              )}
                              style={'hr'}
                            />
                            <span className="online"></span>
                          </>
                        ) : (
                          <span className="user-firstletter">
                            {findFirstName(
                              selectedDaysDetails?.userDetails?.name ||
                              selectedDaysDetails?.userDetails?.name,
                            )}
                          </span>
                        )}
                      </Link>
                    </div>
                    <div className="locate-username">
                      <div className="locate-users">
                        <h2>
                          <Link to={'#'}>
                            {selectedDaysDetails?.userDetails
                              ? selectedDaysDetails?.userDetails?.name
                              : null}
                          </Link>
                        </h2>
                        {selectedDaysDetails?.userDetails?.health_safety_icons
                          ?.length > 0
                          ? selectedDaysDetails?.userDetails?.health_safety_icons
                            ?.split(',')
                            ?.map((item, index) => {
                              return (
                                <Link key={index} to={'#'}>
                                  <GetImgaeFromS3Bucket
                                    imageFile={healthImages(item)}
                                    type={'image'}
                                    FilePath={'ghs'}
                                  />
                                </Link>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedDaysDetails?.status == 'Booking' ? (
                <>
                  <div className="col-lg-3">
                    <div className="book-address-blk">
                      <div className="locate-user">
                        <img
                          src={
                            type == '1' ? book_1 : type == '2' ? book_2 : book_3
                          }
                          alt="img"
                        />
                      </div>
                      <div className="locate-username">
                        <h2>
                          <Link to="#">
                            {selectedDaysDetails?.assetDetails
                              ? selectedDaysDetails?.assetDetails?.parent_name
                              : null}
                          </Link>
                        </h2>
                        <p>
                          {renderDescription(
                            selectedDaysDetails?.assetDetails?.deskname,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedDaysDetails?.assetDetails?.start_time && (
                    <div className="col-lg-2">
                      <div class="book-table-time">
                        <p>
                          <img src={TimeleftIcon} alt="img" />
                          {selectedDaysDetails?.assetDetails?.start_time}
                        </p>
                        <p>
                          <img src={TimeRightIcon} alt="img" />
                          {selectedDaysDetails?.assetDetails?.end_time}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-4">
                    <div className="room-book-list">
                      <ul className="nav">
                        {typeof selectedDaysDetails?.assetDetails?.amenities !==
                          'string' &&
                          selectedDaysDetails?.assetDetails?.amenities?.length >
                          0 ? (
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
                </>
              ) : (
                <div className="col-lg-3">
                  <div className="user-shedule-point">
                    <p>
                      {selectedDaysDetails?.status == 'Unknown' ? (
                        "User's Schedule has not been Set"
                      ) : (
                        <span
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          {selectedDaysDetails?.status} &nbsp;
                          {selectedDaysDetails?.userDetails?.name && (
                            <img
                              style={{ maxWidth: '8%' }}
                              src={
                                selectedDaysDetails?.status ==
                                  PlanLabel.OutOffice
                                  ? outOffice
                                  : selectedDaysDetails?.status ==
                                    PlanLabel.Remote
                                    ? workingRemotely
                                    : selectedDaysDetails?.status ==
                                      PlanLabel.In_Office
                                      ? inOffice
                                      : null
                              }
                              alt="img"
                            />
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
