import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TimeRightIcon, TimeleftIcon } from '../../components/imagepath';
import { useSelector } from 'react-redux';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { timeLine } from '../../assets/constants/config';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { DeskLabelText } from '../../components/locateComponent/constants';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
} from '../../components/commonMethod';
import { Col, Row, Tooltip } from 'antd';
import { findFirstName } from '../../assets/globals';

export const Locateroom = ({ over }) => {
  const { data, time } = over;
  useEffect(() => {}, []);
  const timingData = time?.booking_details?.filter(x => x?.booking_status == 1);
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);

  const ColorCode = () => {
    switch (data?.asset_color) {
      case '#D99797':
        return 'locate-border-danger';
      case '#006600':
        return 'locate-border-success';
      case '#DCDCDC':
        return 'locate-border-gray';
      case '#65A2D9':
        return 'locate-border-primary';
      case '#F8D49B':
        return 'locate-border-warning';
      default:
        '';
    }
  };
  const colorClass = ColorCode();
  const getClassName = z => {
    let clsName = '';
    let timeDuration: any = '';

    const oldArray =
      time?.booking_details?.length > 0 ? time?.booking_details : [];

    const bd = oldArray?.find(v => {
      const s_time = v?.checkin_time ? v?.checkin_time : v?.start_time;
      const e_time = v?.checkout_time ? v?.checkout_time : v?.end_time;
      timeDuration = v?.booking_status == 1 && z >= s_time && z <= e_time;
      if (timeDuration) return v;
    });
    const bookingColor =
      bd?.user_id == userDetails?.id ? 'bookedByMeColor' : 'bookedColor';
    clsName = timeDuration
      ? bookingColor
      : time?.booking_details?.length > 0
      ? 'bookAvail'
      : '';
    return clsName;
  };
  const singleBooking =
    timingData?.length == 1 && data?.booking_userid == timingData[0]?.user_id;

  const renderDescription = (description, length = 30) => {
    if (description && description.length > length) {
      return (
        <Tooltip placement="right" title={description}>
          {description.substring(0, length)}...
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
      <div className="rooms-hover-grp">
        <div
          className={` ${colorClass} locate-rooms-grid room-hover-available`}
        >
          <Row>
            <Col
              className="col-lg-2"
              style={{ maxHeight: '57px', minHeight: '57px' }}
            >
              <div className="locate-room-head">
                <h4>{data?.asset_name}</h4>
              </div>
            </Col>
            <Col
              className="col-lg-4"
              style={{ maxHeight: '57px', minHeight: '57px' }}
            >
              {time?.booking_details?.length > 0 && data?.booking_username ? (
                <div className="locate-teamavaliable locate-deskavail">
                  <div className="locate-availeft">
                    {singleBooking &&
                      (data?.profile_image ? (
                        <div className="locate-user">
                          <Link to="#">
                            <GetImgaeFromS3Bucket
                              imageFile={data?.profile_image}
                              type={'image'}
                              FilePath=""
                              userDetail={data}
                              name={findFirstName(data?.booking_username)}
                              style={'hr'}
                            />
                            <span className="online" />
                          </Link>
                        </div>
                      ) : (
                        <span className="user-firstletter">
                          {findFirstName(data?.booking_username)}
                        </span>
                      ))}
                    <div className="locate-username">
                      <div className="locate-description">
                        <h5>
                          {singleBooking ? (
                            <span>
                              {' '}
                              {renderDescription(data?.booking_username, 13)}
                            </span>
                          ) : timingData.length > 1 ? (
                            <span>
                              {'Multiple booking at the'} <br></br>{' '}
                              {'selected time'}
                            </span>
                          ) : (
                            ''
                          )}
                          <span />
                          {singleBooking && data?.hs_roles?.length > 0
                            ? data?.hs_roles?.map((r, i) => {
                                return (
                                  <span key={i} style={{ padding: '3px' }}>
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
                      {singleBooking && (
                        <div
                          className="locate-time"
                          style={{ marginBottom: '-15px' }}
                        >
                          <p>
                            <img
                              src={TimeleftIcon}
                              className="me-2"
                              alt="img"
                            />
                            {getPrefereredTimeToDisplay(
                              data?.default_start_time,
                            )}
                          </p>
                          &nbsp;&nbsp;&nbsp;
                          <p>
                            <img
                              src={TimeRightIcon}
                              className="me-2"
                              alt="img"
                            />
                            {getPrefereredTimeToDisplay(data?.default_end_time)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="locate-description">
                  <h5>
                    {findLabelText(
                      DeskLabelText.Description,
                      DeskLabelText.Description,
                      DeskLabelText.Locate,
                    )}
                  </h5>
                  <p>{renderDescription(data?.asset_description)}</p>
                </div>
              )}
            </Col>
            <Col
              className="col-lg-2"
              style={{ maxHeight: '57px', minHeight: '57px' }}
            >
              {data?.asset_capacity !== 0 && data?.asset_capacity !== null && (
                <div className="locate-capcity">
                  <h5>
                    {findLabelText(
                      DeskLabelText.Capacity,
                      DeskLabelText.Capacity,
                      DeskLabelText.Locate,
                    )}
                  </h5>
                  <p>{data?.asset_capacity}</p>
                </div>
              )}
            </Col>
            <Col
              className="col-lg-4"
              style={{ maxHeight: '57px', minHeight: '57px' }}
            >
              <div className="room-book-list">
                <ul className="nav">
                  {renderAmenities(data?.asset_amenities_list)[0]?.map(a => {
                    return <li key={a?.id}>{a?.name}</li>;
                  })}
                  {renderAmenities(data?.asset_amenities_list)[1]?.length >
                  0 ? (
                    <Tooltip
                      placement="right"
                      title={renderAmenities(
                        data?.asset_amenities_list,
                      )[1]?.toString()}
                    >
                      <li key={'dot'}>...</li>
                    </Tooltip>
                  ) : null}
                </ul>
              </div>
            </Col>
            <Col className="col-lg-12">
              <div className="room-time-list multiple-time-scale active-list-blk">
                <ul className="time-round-box">
                  <>
                    {timeLine?.map((x, i) => (
                      <li key={i} className="scale-time-box">
                        <ul className="scale-sub-time">
                          {x?.sub1?.map((z, i) => {
                            return (
                              <li
                                key={i}
                                style={{ padding: '6px 2px' }}
                                className={getClassName(z)}
                              >
                                <span style={{ display: 'none' }}>{z}</span>
                              </li>
                            );
                          })}
                          <li
                            style={{ padding: '6px 2px' }}
                            className={`hour_scale ${getClassName(x?.mid)}`}
                          >
                            <span>{x?.label}</span>
                          </li>
                          {x?.sub2.map((c, i) => (
                            <li
                              key={i}
                              style={{ padding: '6px 2px' }}
                              className={getClassName(c)}
                            >
                              <span style={{ display: 'none' }}>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
