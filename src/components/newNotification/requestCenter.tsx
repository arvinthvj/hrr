import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../services/apicall';
import {
  ActionedRequestList,
  BookingRequestStatus,
  UnactionedRequestList,
  update_hrRequest,
} from '../../services/apiurl';
import {
  Notification_Calender,
  ParkingIcon,
  RoomIcon,
  TimeRightIcon,
  TimeleftIcon,
  WorkspacesIcon,
  child_icon,
  compassion,
  holiday,
  jury,
  other_icon,
  pencilIcon,
  timeOff_3,
  training_icon,
} from '../imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { findFirst_LastName } from '../../assets/globals';

import {
  ASSET_TYPE_ID,
  NotificationLabel,
  NotificationTabs,
  REQUEST_ACTION_STATUS,
  RequestType,
} from './constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reasonSchema } from './schema';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import {
  SetQuickBookEditOpen,
  SetQuickBookSelect,
} from '../../reduxStore/quickBookSlice';
import { Tooltip } from 'antd';
import {
  getPrefereredTimeToDisplay,
  getUserPreferedDateFormat,
} from '../commonMethod';
import moment from 'moment';
import {
  ErrorMessage,
  Errorcode,
  dateFormat_ddd_Do_MMMM_YYYY,
} from '../../assets/constants/config';
import Toaster from '../toast';
import { setDashboardListUpdate } from '../../reduxStore/dashboardSlice';

interface ReasonProps {
  reason: string;
}

const RequestCenter = ({
  showPastRequest,
  searchId,
  requestType,
  workspaceFilter,
  roomFilter,
  parkingFilter,
  timeoffFilter,
  tabChange,
  scrollHeight,
}) => {
  const {
    handleSubmit,
    control,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
    watch,
  } = useForm<ReasonProps>({
    resolver: yupResolver(reasonSchema),
  });
  const [assetRequest, setAssetRequest] = useState<any>([]);
  const [pageCount, setPageCount] = useState(1);
  const [actionedPageCount, setActionedPageCount] = useState(0);
  const [filterList, setFilterList] = useState('');
  const [isShowRejectConfirmation, setShowRejectConfirmation] = useState('');
  const dispatch = useDispatch();
  const Reason = watch('reason');
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isAddPageCount, setAddPageCount] = useState(true);
  const [isAddActionedPageCount, setAddActionedPageCount] = useState(true);
  const { dashboardListUpdate } = useSelector((state: any) => state.dashboard);

  const getUnactionedRequestList = count => {
    const payload = {
      filter_type: filterList,
      include_past_request: showPastRequest ? 1 : 0,
      search_by: searchId ? searchId : null,
      page: count,
      request_type: requestType,
    };
    dispatch(showLoader());
    postData(UnactionedRequestList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const totalPages = Math.ceil(data?.count?.overallcount / 50);
        const unactioned = data?.notificationdetails?.unactioned
          ? data?.notificationdetails?.unactioned
          : [];
        const allData =
          count == 1 ? [...unactioned] : [...assetRequest, ...unactioned];
        setAssetRequest(allData);
        if (allData?.length < 15 && count < totalPages) {
          setPageCount(prev => prev + 1);
        } else if (unactioned?.length < 15 && showPastRequest) {
          setAddPageCount(false);
          setActionedPageCount(1);
          count == 1
            ? getActionedRequestList(1, [...unactioned])
            : getActionedRequestList(1, [...assetRequest, ...unactioned]);
        } else if (count > totalPages) {
          setAddPageCount(false);
        }
      } else {
        setAddPageCount(false);
        count == 1 && setAssetRequest([]);
        setActionedPageCount(1);
        if (showPastRequest) {
          count == 1
            ? getActionedRequestList(1, [])
            : getActionedRequestList(1, [...assetRequest]);
        }
      }
    });
  };

  const getActionedRequestList = (count, unactioned) => {
    const payload = {
      filter_type: filterList,
      include_past_request: showPastRequest ? 1 : 0,
      search_by: searchId ? searchId : null,
      page: count,
      request_type: requestType,
    };
    dispatch(showLoader());
    postData(ActionedRequestList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const totalPages = Math.ceil(data?.count?.overallcount / 50);
        const actioned = data?.notificationdetails?.actioned
          ? data?.notificationdetails?.actioned
          : [];
        const allData = [...unactioned, ...actioned];
        setAssetRequest(allData);
        if (allData?.length < 15 && count < totalPages) {
          count == 1
            ? setActionedPageCount(count + 1)
            : setActionedPageCount(prev => prev + 1);
        } else if (count > totalPages) {
          setAddActionedPageCount(false);
        }
      } else {
        setAddActionedPageCount(false);
      }
    });
  };

  const handleRequest = (action, obj) => {
    const isAssetRequest =
      obj?.icon_type == NotificationLabel.workspaces ||
      obj?.icon_type == NotificationLabel.rooms ||
      obj?.icon_type == NotificationLabel.parking
        ? true
        : false;
    const hrPayload = {
      id: obj?.reference_id,
      status:
        action == NotificationLabel.approve
          ? REQUEST_ACTION_STATUS.HR_APPROVE
          : REQUEST_ACTION_STATUS.HR_REJECT,
      reason: Reason ? Reason : '',
    };
    const assetPayload = {
      booking_id: obj?.reference_id,
      booking_status:
        action == NotificationLabel.approve
          ? REQUEST_ACTION_STATUS.ASSET_APPROVE
          : REQUEST_ACTION_STATUS.ASSET_REJECT,
      reason: Reason ? Reason : '',
      user_id: obj?.user_id,
    };
    const payload = isAssetRequest ? assetPayload : hrPayload;
    const url = isAssetRequest ? BookingRequestStatus : update_hrRequest;
    dispatch(showLoader());
    postData(url, payload, (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      setShowRejectConfirmation('');
      setPageCount(1);
      setActionedPageCount(0);
      setAddPageCount(true);
      getUnactionedRequestList(1);
      reset();
      dispatch(hideLoader());
    });
  };

  const handleEdit = (e, obj) => {
    const assetTypeId =
      obj?.icon_type == NotificationLabel.workspaces
        ? ASSET_TYPE_ID.WORKSPACE
        : obj?.icon_type == NotificationLabel.rooms
        ? ASSET_TYPE_ID.ROOM
        : obj?.icon_type == NotificationLabel.parking
        ? ASSET_TYPE_ID.PARKING
        : null;
    if (assetTypeId != null) {
      const objCopy = {
        id: obj?.reference_id,
        start_time: obj?.start,
        end_time: obj?.end,
        workspace_id: obj?.asset_id,
        workspace_name: obj?.name,
        workspace_type:
          obj?.icon_type == NotificationLabel.workspaces
            ? NotificationLabel.workspace
            : obj?.icon_type == NotificationLabel.rooms
            ? NotificationLabel.room
            : obj?.icon_type,
        is_cancel: obj?.is_cancel,
        checkin_status: obj?.checkin_status,
        checkin_start_time: obj?.checkin_start_time,
        checkout_end_time: obj?.checkout_end_time,
        cancel_time: obj?.cancel_time,
        booking_date: obj?.date,
        floorplan_type_id: assetTypeId,
        comments: obj?.comment,
        location_id: obj?.location_id,
        start_timezone: obj?.start_timezone,
        end_timezone: obj?.end_timezone,
        timezone: obj?.asset_timezone,
        booking_status: 4,
        registration: obj?.registration,
        external_participants: obj?.external_participants,
      };
      dispatch(SetQuickBookEditOpen({ openState: true, data: objCopy }));
      dispatch(SetQuickBookSelect(assetTypeId));
    } else {
      e.preventDefault();
      navigate('/hr-module', {
        state: {
          leave_id: obj?.reference_id,
        },
      });
    }
  };

  const getIconImage = type => {
    switch (type) {
      case 'annual_leave_icon':
        return { icon: holiday, classname: 'hr-leave-grid-dark-blue' };
      case 'sick_icon':
        return { icon: timeOff_3, classname: 'hr-leave-grid-light-blue' };
      case 'compassion_icon':
        return { icon: compassion, classname: 'hr-leave-grid-dark-blue' };
      case 'childcare_icon':
        return { icon: child_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'paternity_icon':
        return { icon: child_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'maternity_icon':
        return { icon: child_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'furlough_icon':
        return { icon: other_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'other_icon':
        return { icon: other_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'toil_icon':
        return { icon: other_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'training_icon':
        return { icon: training_icon, classname: 'hr-leave-grid-dark-blue' };
      case 'jury_icon':
        return { icon: jury, classname: 'hr-leave-grid-dark-blue' };
      case 'Workspaces':
        return {
          icon: WorkspacesIcon,
          classname: 'hr-leave-grid-light-orange',
        };
      case 'Rooms':
        return { icon: RoomIcon, classname: 'hr-leave-grid-medium-orange' };
      case 'Parking':
        return { icon: ParkingIcon, classname: 'hr-leave-grid-dark-orange' };
      default:
        '';
    }
  };

  const renderComment = (comment, length) => {
    if (comment && comment.length > length) {
      return (
        <Tooltip placement="right" title={comment}>
          {comment.substring(0, length)}...
        </Tooltip>
      );
    }
    return <span>{comment}</span>;
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      isAddPageCount && setPageCount(prev => prev + 1);
      isAddActionedPageCount && setActionedPageCount(prev => prev + 1);
    }
  };

  const addScrollListener = () => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
  };

  useEffect(() => {
    addScrollListener();
  }, []);

  useEffect(() => {
    pageCount > 1 && isAddPageCount && getUnactionedRequestList(pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (actionedPageCount > 0 && showPastRequest) {
      actionedPageCount != 1 &&
        isAddActionedPageCount &&
        getActionedRequestList(actionedPageCount, assetRequest);
    }
  }, [actionedPageCount]);

  useEffect(() => {
    setAddPageCount(true);
    setAddActionedPageCount(true);
    setPageCount(1);
    setActionedPageCount(0);
    if (filterList != '') {
      tabChange == NotificationTabs.requests && getUnactionedRequestList(1);
    } else {
      setAssetRequest([]);
    }
  }, [tabChange, filterList, showPastRequest, searchId, requestType]);

  useEffect(() => {
    if (dashboardListUpdate) {
      setAddPageCount(true);
      setAddActionedPageCount(true);
      setPageCount(1);
      setActionedPageCount(0);
      if (filterList != '') {
        tabChange == NotificationTabs.requests && getUnactionedRequestList(1);
      } else {
        setAssetRequest([]);
      }
      dispatch(setDashboardListUpdate(false));
    }
  }, [dashboardListUpdate]);

  useEffect(() => {
    const filter_list = [];
    workspaceFilter && filter_list.push(NotificationLabel.workspaces);
    roomFilter && filter_list.push(NotificationLabel.rooms);
    parkingFilter && filter_list.push(NotificationLabel.parking);
    timeoffFilter && filter_list.push(NotificationLabel.timeOff);
    setFilterList(filter_list?.toString());
  }, [workspaceFilter, roomFilter, parkingFilter, timeoffFilter]);

  return (
    <div
      className="tab-pane fade show active"
      id="hr_requests"
      role="tabpanel"
      aria-labelledby="hr-requests"
    >
      <div
        className="tab-scroll notification-scroll"
        style={{ height: scrollHeight }}
        ref={containerRef}
      >
        {assetRequest?.length > 0 &&
          assetRequest?.map((item, index) => {
            const isAssetRequest =
              item?.icon_type == NotificationLabel.workspaces ||
              item?.icon_type == NotificationLabel.rooms ||
              item?.icon_type == NotificationLabel.parking
                ? true
                : false;
            const assetType =
              item?.icon_type == NotificationLabel.workspaces
                ? NotificationLabel.desks
                : item?.icon_type == NotificationLabel.rooms
                ? NotificationLabel.availrooms
                : NotificationLabel.availPark;
            return (
              <div
                className={`${
                  item?.request_type == requestType
                    ? `hr-leave-grid ${getIconImage(item?.icon_type)
                        ?.classname}`
                    : ''
                }`}
                key={index}
              >
                {item?.request_type == requestType && (
                  <div className="hr-leave-info">
                    <div className="hr-leave-types hr-leave-types-info">
                      <div className="hr-leave-head hr-leave-head-info">
                        <div className="hr-leave-head-icon">
                          <img
                            src={getIconImage(item?.icon_type)?.icon}
                            alt=""
                            style={{ width: '24px', height: '24px' }}
                          />{' '}
                        </div>
                        <div className="hr-leave-head-text">
                          <h4>
                            <>
                              {item?.name +
                                ' ' +
                                (!isAssetRequest
                                  ? NotificationLabel.leave
                                  : '')}
                            </>
                          </h4>
                          {isAssetRequest && <p>{item?.location}</p>}
                        </div>
                      </div>
                      <div className="hr-leave-request">
                        <div className="hr-leave-request-info">
                          <span>
                            {item?.status == RequestType.request
                              ? NotificationLabel.requestedBy
                              : NotificationLabel.requestedFor}
                          </span>
                          <div className="hr-request-details">
                            <Link to="#">
                              {item?.user_profile_photo ? (
                                <GetImgaeFromS3Bucket
                                  imageFile={item?.user_profile_photo}
                                  type={'image'}
                                  userDetail={item?.user_id}
                                />
                              ) : (
                                <span
                                  className="user-firstletter"
                                  style={{ color: '#FFF' }}
                                >
                                  {findFirst_LastName(
                                    item?.user_firstname,
                                    item?.user_lastname,
                                  )}
                                </span>
                              )}
                            </Link>
                            <div className="hr-request-details-info">
                              <h6>
                                <Link to="#">
                                  {renderComment(item?.user_name, 15)}
                                </Link>
                              </h6>
                              <p>{item?.user_team}</p>
                            </div>
                          </div>
                        </div>
                        <div className="hr-leave-calendar">
                          {isAssetRequest ? (
                            <>
                              <h6>
                                <img src={Notification_Calender} alt="" />
                                {getUserPreferedDateFormat(item?.date)}{' '}
                              </h6>
                              <h6>
                                <img src={TimeleftIcon} alt="icon" />
                                {getPrefereredTimeToDisplay(item?.start)}{' '}
                                <img
                                  src={TimeRightIcon}
                                  alt="icon"
                                  className="ms-2"
                                />
                                {getPrefereredTimeToDisplay(item?.end)}
                              </h6>
                            </>
                          ) : (
                            <>
                              <h6>
                                <img src={Notification_Calender} alt="" />
                                {getUserPreferedDateFormat(item?.start)} -{' '}
                                {getUserPreferedDateFormat(item?.end)} -{' '}
                              </h6>
                              <h6>
                                <span>
                                  {item?.total_days +
                                    ' ' +
                                    NotificationLabel.days}{' '}
                                </span>
                              </h6>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hr-leave-remaining hr-leave-remaining-info">
                      <p>{renderComment(item?.comment, 150)}</p>
                    </div>
                    {(item?.status == RequestType.request ||
                      item?.status == RequestType.pending) && (
                      <div className="hr-leave-days">
                        {isAssetRequest && (
                          <p className="hr-leave-hide-text">
                            {NotificationLabel.thereAre}
                          </p>
                        )}
                        <div className="hr-new-days">
                          <div className="hr-new-days-text">
                            <p>{isAssetRequest ? assetType : ''}</p>
                            {isAssetRequest ? (
                              <p>{NotificationLabel.available}</p>
                            ) : (
                              <>
                                <p>
                                  {item?.name + ' ' + NotificationLabel.leave}
                                </p>
                                <p>{NotificationLabel.remaining}</p>
                              </>
                            )}
                          </div>
                          <div className="hr-new-leave-box">
                            <h6>
                              <span
                                className={`hr-leave-box ${
                                  Number(item?.remaining) > 0
                                    ? 'hr-leave-success'
                                    : 'hr-leave-danger'
                                }`}
                              >
                                {item?.remaining}
                              </span>{' '}
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}
                    {!isAssetRequest &&
                      (item?.status == RequestType.approved ||
                        item?.status == RequestType.rejected ||
                        item?.status == RequestType.cancelled) && (
                        <div className="hr-leave-days">
                          <div className="hr-new-days">
                            <div className="hr-new-days-text">
                              <>
                                <p>
                                  {item?.name + ' ' + NotificationLabel.leave}
                                </p>
                                <p>{NotificationLabel.remaining}</p>
                              </>
                            </div>
                            <div className="hr-new-leave-box">
                              <h6>
                                <span
                                  className={`hr-leave-box ${
                                    Number(item?.remaining) > 0
                                      ? 'hr-leave-success'
                                      : 'hr-leave-danger'
                                  }`}
                                >
                                  {item?.remaining}
                                </span>{' '}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                    <>
                      {requestType == RequestType.incoming &&
                        (item?.status == RequestType.request ? (
                          isShowRejectConfirmation == item?.id ? (
                            <div className="hr-leave-right hr-leave-reason">
                              {' '}
                              <div className="hr-leave-form-group">
                                <label>{NotificationLabel.reason}</label>
                                <Controller
                                  name="reason"
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      value={value?.slice(0, 300)}
                                      type="text"
                                      className="form-control"
                                      placeholder="Optional"
                                      onChange={val => {
                                        onChange(val);
                                        trigger('reason');
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              {errors?.reason?.message ? (
                                <label className="error-text">
                                  {errors?.reason?.message}
                                </label>
                              ) : null}
                              <div className="hr-leave-btns hr-leave-reason-btns">
                                <Link
                                  to="#"
                                  className="btn hr-leave-cancel-btn"
                                  onClick={() => {
                                    setShowRejectConfirmation('');
                                    reset();
                                  }}
                                >
                                  {NotificationLabel.cancel}
                                </Link>
                                <Link
                                  to="#"
                                  className="btn reject-btn"
                                  onClick={handleSubmit(data =>
                                    handleRequest(
                                      NotificationLabel.reject,
                                      item,
                                    ),
                                  )}
                                >
                                  {NotificationLabel.reject}
                                </Link>
                                <div className="hr-leave-request-text">
                                  <p>
                                    {NotificationLabel.requestedOn}{' '}
                                    {getUserPreferedDateFormat(
                                      moment(
                                        item?.requested_on,
                                        dateFormat_ddd_Do_MMMM_YYYY,
                                      ),
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="hr-leave-right hr-leave-reason">
                              {' '}
                              {/* {isAssetRequest && (
                                <div className="hr-leave-form-group">
                                  <label>{NotificationLabel.reassign}</label>
                                  <input
                                    value={""}
                                    type="text"
                                    className="form-control"
                                    placeholder="Optional"
                                    onChange={(val) => {}}
                                  />
                                </div>
                              )} */}
                              <div className="hr-leave-btns hr-leave-reason-btns">
                                <Link
                                  to="#"
                                  className="btn reject-btn"
                                  onClick={() => {
                                    reset();
                                    setShowRejectConfirmation(item?.id);
                                  }}
                                >
                                  {NotificationLabel.reject}
                                </Link>
                                <Link
                                  to="#"
                                  className="btn approve-btn"
                                  onClick={() => {
                                    handleRequest(
                                      NotificationLabel.approve,
                                      item,
                                    );
                                  }}
                                >
                                  {NotificationLabel.approve}
                                </Link>
                                <div className="hr-leave-request-text">
                                  <p>
                                    {NotificationLabel.requestedOn}{' '}
                                    {getUserPreferedDateFormat(
                                      moment(
                                        item?.requested_on,
                                        dateFormat_ddd_Do_MMMM_YYYY,
                                      ),
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        ) : (
                          <div
                            className={`hr-leave-right ${
                              item?.status == RequestType.rejected
                                ? 'hr-leave-reason-rejected'
                                : ''
                            }`}
                          >
                            {item?.status == RequestType.rejected &&
                              item?.reason && (
                                <div className="hr-leave-cover">
                                  <h6>{NotificationLabel.reason}</h6>
                                  <div className="hr-leave-cover-text">
                                    <Tooltip title={item?.reason}>
                                      <p>
                                        {item?.reason.length > 15
                                          ? `${item?.reason.slice(0, 15)}...`
                                          : item?.reason}
                                      </p>
                                    </Tooltip>
                                  </div>
                                </div>
                              )}
                            <div
                              className={
                                item?.status == RequestType.approved
                                  ? 'hr-leave-approved'
                                  : item?.status == RequestType.pending ||
                                    item?.status == RequestType.request
                                  ? 'hr-leave-pending'
                                  : 'hr-leave-rejected'
                              }
                            >
                              <h6>
                                {item?.status == RequestType.request
                                  ? RequestType.pending
                                  : item?.status}
                              </h6>
                              {(item?.status == RequestType.pending ||
                                item?.status == RequestType.request) && (
                                <Link to="#" onClick={e => handleEdit(e, item)}>
                                  <img src={pencilIcon} alt="editIcon" />
                                </Link>
                              )}
                              {item?.status == RequestType.rejected && (
                                <div className="hr-leave-request-text">
                                  <p>
                                    {NotificationLabel.requestedOn}{' '}
                                    {getUserPreferedDateFormat(
                                      moment(
                                        item?.requested_on,
                                        dateFormat_ddd_Do_MMMM_YYYY,
                                      ),
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                            {item?.status != RequestType.rejected && (
                              <div className="hr-leave-request-text">
                                <p>
                                  {NotificationLabel.requestedOn}{' '}
                                  {getUserPreferedDateFormat(
                                    moment(
                                      item?.requested_on,
                                      dateFormat_ddd_Do_MMMM_YYYY,
                                    ),
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      {requestType == RequestType.outgoing && (
                        <div
                          className={`hr-leave-right ${
                            item?.status == RequestType.rejected
                              ? 'hr-leave-reason-rejected'
                              : ''
                          }`}
                        >
                          {item?.status == RequestType.rejected &&
                            item?.reason && (
                              <div className="hr-leave-cover">
                                <h6>{NotificationLabel.reason}</h6>
                                <div className="hr-leave-cover-text">
                                  <p>
                                    {item?.reason.length > 15
                                      ? `${item?.reason.slice(0, 15)}...`
                                      : item?.reason}
                                  </p>
                                </div>
                              </div>
                            )}
                          <div
                            className={
                              item?.status == RequestType.approved
                                ? 'hr-leave-approved'
                                : item?.status == RequestType.pending ||
                                  item?.status == RequestType.request
                                ? 'hr-leave-pending'
                                : 'hr-leave-rejected'
                            }
                          >
                            <h6>
                              {item?.status == RequestType.request
                                ? RequestType.pending
                                : item?.status}
                            </h6>
                            {(item?.status == RequestType.pending ||
                              item?.status == RequestType.request) && (
                              <Link to="#" onClick={e => handleEdit(e, item)}>
                                <img src={pencilIcon} alt="editIcon" />
                              </Link>
                            )}
                            {item?.status == RequestType.rejected && (
                              <div className="hr-leave-request-text">
                                <p>
                                  {NotificationLabel.requestedOn}{' '}
                                  {getUserPreferedDateFormat(
                                    moment(
                                      item?.requested_on,
                                      dateFormat_ddd_Do_MMMM_YYYY,
                                    ),
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                          {item?.status != RequestType.rejected && (
                            <div className="hr-leave-request-text">
                              <p>
                                {NotificationLabel.requestedOn}{' '}
                                {getUserPreferedDateFormat(
                                  moment(
                                    item?.requested_on,
                                    dateFormat_ddd_Do_MMMM_YYYY,
                                  ),
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RequestCenter;
