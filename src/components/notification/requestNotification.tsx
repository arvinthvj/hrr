import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { Search } from '../imagepath';
import {
  IncomingRequestDetailsComponent,
  OutgoingRequestDetailsComponent,
} from './notificationComponents';
import { NotificationTypes } from './constant';

type RequestNotificationProps = {
  showManageFlag: boolean;
  setSelectedIncommingRequest: CallableFunction | any;
  setShowManageFlag: CallableFunction | any;
  handleTypes: CallableFunction | any;
  incomingRequestList: object | any;
  searchOutgoingReq: CallableFunction | any;
  outgoingRequestList: object | any;
  getEditRequestDetails: CallableFunction | any;
  selectedIncommingRequest: object | any;
  inactiveApproveOrRejectCall: CallableFunction | any;
  reqPageNumber: number;
  setReqPageNumber: CallableFunction | any;
};
const RequestNotification: React.FC<RequestNotificationProps> = ({
  showManageFlag,
  setSelectedIncommingRequest,
  setShowManageFlag,
  handleTypes,
  incomingRequestList,
  searchOutgoingReq,
  outgoingRequestList,
  getEditRequestDetails,
  selectedIncommingRequest,
  inactiveApproveOrRejectCall,
  reqPageNumber,
  setReqPageNumber,
}) => {
  const [showOutgoingReqList, setShowOutgoingReqList] = useState(true);
  const infiniteReqRef = useRef<any>();

  const bulkApproveOrReject = type => {
    const getIds: any = [];
    for (const obj of selectedIncommingRequest) {
      getIds.push(obj.booking_id);
    }
    if (getIds.length > 0) {
      inactiveApproveOrRejectCall(type, getIds.toString());
    }
  };
  // Infinite Scroll
  const onScroll = () => {
    const scrollable = infiniteReqRef.current;
    const { scrollHeight, offsetHeight, scrollTop } = scrollable;

    scrollable?.addEventListener('scroll', e => {
      const diff = scrollHeight - offsetHeight - 200;
      if (diff <= Math.round(scrollTop)) {
        setReqPageNumber(reqPageNumber + 1);
      }
    });
  };

  return (
    <div className="card notification-card requests-notification-card">
      <div className="notification-header notification-bottom">
        <div className="notification-request-header">
          <Link
            to="#"
            onClick={() => {
              if (showManageFlag) {
                setSelectedIncommingRequest([]);
                setShowManageFlag(false);
              } else {
                handleTypes(NotificationTypes.activityNotification);
              }
            }}
            className="back-activity-show"
          >
            <i className="fas fa-angle-left" />
          </Link>
          <h4>{findLabelText('Requests', 'Requests', 'Push_Notifications')}</h4>
          {showManageFlag ? (
            <Link
              to="#"
              onClick={() => {
                const newList = incomingRequestList.map((item: any, index) => {
                  const list = { ...item, isSelected: true };
                  return list;
                });
                setSelectedIncommingRequest([...newList]);
              }}
              className="request-select-all"
            >
              {findLabelText('Select_all', 'Select all', 'Push_Notifications')}
            </Link>
          ) : null}
        </div>
        <div className="notification-search">
          <form action="#">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder={findLabelText('Search', 'Search', 'Locate')}
                onChange={event => {
                  searchOutgoingReq(event.target.value);
                }}
              />
            </div>
            <div className="notification-form-btn">
              <button type="submit" className="btn">
                <img src={Search} alt="img" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={showManageFlag ? 'editnotifisetview' : ''}>
        <div
          className="notification-info"
          ref={infiniteReqRef}
          onScroll={onScroll}
        >
          {showManageFlag ? null : (
            <>
              <div className="notification-weeek notification-outgoing">
                <p>
                  {findLabelText('Outgoing', 'Outgoing', 'Push_Notifications')}{' '}
                  <span>({outgoingRequestList.length})</span>
                </p>
                <Link
                  to="#"
                  onClick={() => {
                    setShowOutgoingReqList(!showOutgoingReqList);
                  }}
                >
                  {showOutgoingReqList ? (
                    <i className="fas fa-angle-down"></i>
                  ) : (
                    <i className="fas fa-angle-up"></i>
                  )}
                </Link>
              </div>
              {showOutgoingReqList && outgoingRequestList?.length > 0
                ? outgoingRequestList.map((out, index) => {
                    return (
                      <OutgoingRequestDetailsComponent
                        handleTypes={() => {
                          getEditRequestDetails(out);
                        }}
                        key={index}
                        details={out}
                      />
                    );
                  })
                : null}
            </>
          )}
          <div className="notification-weeek notificationsetsplit">
            {incomingRequestList?.length > 0 ? (
              <p>
                {findLabelText('Incoming', 'Incoming', 'Push_Notifications')}{' '}
                <span>
                  (
                  {incomingRequestList?.length
                    ? incomingRequestList?.length
                    : '0'}
                  )
                </span>
              </p>
            ) : null}
            {incomingRequestList?.length > 1 && !showManageFlag ? (
              <Link
                className="notificationsetsplit-link"
                to="#"
                onClick={() => {
                  setShowManageFlag(true);
                }}
              >
                {findLabelText('Manage', 'Manage', 'Notifications')}
              </Link>
            ) : null}
          </div>
          {incomingRequestList?.length > 0
            ? incomingRequestList.map((out: any, index) => {
                let isSelected = false;
                const checkData = selectedIncommingRequest.find(
                  val => val.id == out.id,
                );
                if (checkData == undefined) {
                  isSelected = false;
                } else {
                  isSelected = true;
                }
                return (
                  <IncomingRequestDetailsComponent
                    index={index}
                    showManageFlag={showManageFlag}
                    key={index}
                    isSelected={isSelected}
                    details={out}
                    inactiveApproveOrRejectCall={(status, id) => {
                      inactiveApproveOrRejectCall(status, id);
                    }}
                    onselectCheckBox={(details, index) => {
                      const checkData = selectedIncommingRequest.findIndex(
                        val => val.id == details.id,
                      );
                      if (checkData >= 0) {
                        const list = selectedIncommingRequest;
                        list.splice(checkData, 1);
                        setSelectedIncommingRequest([...list]);
                      } else {
                        const newList = selectedIncommingRequest;
                        newList.push(details);
                        setSelectedIncommingRequest([...newList]);
                      }
                    }}
                  />
                );
              })
            : null}
        </div>
      </div>
      {showManageFlag && selectedIncommingRequest.length > 0 ? (
        <div className="notification-cancel pb-0">
          <ul>
            <li>
              <Link
                className="btn-cancel-reject"
                to="#"
                onClick={() => {
                  bulkApproveOrReject(6);
                }}
              >
                {findLabelText('Reject', 'Reject', 'Notifications')}(
                {selectedIncommingRequest?.length})
              </Link>
            </li>
            <li>
              <Link
                className="btn-cancel-approve"
                to="#"
                onClick={() => {
                  bulkApproveOrReject(1);
                }}
              >
                {findLabelText('Approve', 'Approve', 'Push_Notifications')} (
                {selectedIncommingRequest?.length})
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default RequestNotification;
