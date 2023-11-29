import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Notification_Calender,
  child_icon,
  compassion,
  holiday,
  jury,
  other_icon,
  pencilIcon,
  timeOff_3,
  training_icon,
} from '../imagepath';
import { postData } from '../../services/apicall';
import { list_hrRequest, update_hrRequest } from '../../services/apiurl';
import { findFirstName } from '../../assets/globals';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hrRequestSchema } from '../hr-component/personal/scehma';
import styled from 'styled-components';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import {
  ErrorMessage,
  Errorcode,
  hrRequestStatusType,
} from '../../assets/constants/config';
import { Tooltip } from 'antd';
import Toaster from '../toast';

const HRRequestPage = ({ requestType, pastRequest, searchText, listType }) => {
  const { control, watch } = useForm({
    resolver: yupResolver(hrRequestSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [reject, setReject] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const Error = styled.p({
    color: 'red',
  });

  useEffect(() => {
    listType == '' ? setRequestData([]) : setRequestData(initialData);
  }, [listType, initialData]);

  const getHRRequest = () => {
    const payload = {
      request_type: requestType,
      past_request: pastRequest,
      search: searchText,
      type: listType,
    };
    dispatch(showLoader());
    postData(list_hrRequest, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == '200') {
        Toaster(res?.data?.code, res?.data?.message);
        setRequestData(data);
        setInitialData(data);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };
  const Reason = watch('reason');
  const updateRequest = id => {
    const payload = {
      id: id,
      status: '1',
      reason: '',
    };
    dispatch(showLoader());
    postData(update_hrRequest, payload, (data, res) => {
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      dispatch(hideLoader());
      setReject('');
      getHRRequest();
    });
  };
  const updateRequestWithReason = id => {
    if (errorMsg == '') {
      const payload = {
        id: id,
        status: '2',
        reason: Reason,
      };
      dispatch(showLoader());
      postData(update_hrRequest, payload, (data, res) => {
        if (res?.data?.code == 200) {
          Toaster(res?.data?.code, res?.data?.message);
        } else {
          Toaster(Errorcode, ErrorMessage);
        }
        dispatch(hideLoader());
        setReject('');
        getHRRequest();
      });
    }
  };

  useEffect(() => {
    getHRRequest();
  }, [requestType, pastRequest, searchText]);

  const getIconImage = type => {
    switch (type) {
      case 'annual_leave_icon':
        return holiday;
      case 'sick_icon':
        return timeOff_3;
      case 'compassion_icon':
        return compassion;
      case 'childcare_icon':
        return child_icon;
      case 'paternity_icon':
        return child_icon;
      case 'maternity_icon':
        return child_icon;
      case 'furlough_icon':
        return other_icon;
      case 'other_icon':
        return other_icon;
      case 'toil_icon':
        return other_icon;
      case 'training_icon':
        return training_icon;
      case 'jury_icon':
        return jury;
      default:
        '';
    }
  };

  const validateError = event => {
    const value = event.target.value;

    if (value == '') {
      setErrorMsg('');
    } else if (value.length > 300) {
      setErrorMsg('Maximum number of characters reached (300)');
    } else if (!/^[a-zA-Z0-9]+$/.test(event.target.value)) {
      setErrorMsg('Only alphanumeric characters are allowed');
    } else {
      setErrorMsg('');
    }
  };

  const handleEdit = (e, obj) => {
    e.preventDefault();
    navigate('/hr-module', {
      state: {
        leave_id: obj?.id,
      },
    });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="hr_requests"
      role="tabpanel"
      aria-labelledby="hr-requests"
    >
      {requestData?.length > 0 &&
        requestData?.map((item, index) => {
          return (
            <div className="hr-leave-grid" key={index}>
              <div className="hr-leave-info">
                <div className="hr-leave-types">
                  <div className="hr-leave-head">
                    <h4>
                      <img
                        src={getIconImage(item?.icon_type)}
                        alt=""
                        style={{ width: '24px', height: '24px' }}
                      />{' '}
                      {item?.timeoff_type} leave
                    </h4>
                  </div>
                  <div className="hr-leave-request">
                    <div className="hr-leave-request-info">
                      <span>{item?.request}</span>
                      <div className="hr-request-details">
                        <Link to="#">
                          {item?.user_profile_photo ? (
                            <GetImgaeFromS3Bucket
                              imageFile={item?.user_profile_photo}
                              type={'image'}
                              name={findFirstName(item?.user_name)}
                            />
                          ) : (
                            <span
                              className="user-firstletter"
                              style={{ color: '#FFF' }}
                            >
                              {findFirstName(item?.user_name)}
                            </span>
                          )}
                        </Link>
                        <div className="hr-request-details-info">
                          <h6>
                            <Link to="#">{item?.user_name}</Link>
                          </h6>
                          <p>{item?.user_team}</p>
                        </div>
                      </div>
                    </div>
                    <div className="hr-leave-calendar">
                      <h6>
                        <img src={Notification_Calender} alt="" />
                        {item?.from_date} - {item?.to_date} -{' '}
                        <span>{item?.total_days} days(s)</span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="hr-leave-days">
                  <h6>
                    <span
                      className={`hr-leave-box ${
                        Number(item?.remaining_leave) > 0
                          ? 'hr-leave-success'
                          : 'hr-leave-danger'
                      }`}
                    >
                      {item?.remaining_leave}
                    </span>{' '}
                    day(s)
                  </h6>
                  <p>{item?.timeoff_type} leave</p>
                  <p>Remaining</p>
                </div>
                <div className="hr-leave-remaining">
                  <p>{item?.notes}</p>
                </div>
                <div
                  className={`hr-leave-right ${
                    item?.status == hrRequestStatusType.rejected
                      ? 'hr-leave-reason-rejected'
                      : ''
                  }`}
                >
                  {reject == item?.id ? (
                    <div className="hr-leave-right hr-leave-reason">
                      <div className="hr-leave-form-group">
                        <label>Reason</label>
                        <Controller
                          name="reason"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Optional"
                              onChange={val => {
                                onChange(val);
                                validateError(val);
                              }}
                              value={value?.slice(0, 300)}
                            />
                          )}
                        />
                        <Error>{errorMsg}</Error>
                      </div>
                      <div className="hr-leave-btns hr-leave-reason-btns">
                        <Link
                          to="#"
                          className="btn hr-leave-cancel-btn"
                          onClick={() => setReject('')}
                        >
                          Cancel
                        </Link>
                        <Link
                          to="#"
                          className="btn reject-btn"
                          onClick={() => updateRequestWithReason(item?.id)}
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                  ) : item?.status == hrRequestStatusType.approved ||
                    item?.status == hrRequestStatusType.rejected ||
                    item?.status == hrRequestStatusType.pending ? (
                    <>
                      {item?.status == hrRequestStatusType.rejected &&
                        item?.reason && (
                          <div className="hr-leave-cover">
                            <h6>Reason</h6>
                            <div className="hr-leave-cover-text">
                              <Tooltip title={item?.reason}>
                                <p>{item?.reason}</p>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      <div
                        className={
                          item?.status == hrRequestStatusType.approved
                            ? 'hr-leave-approved'
                            : item?.status == hrRequestStatusType.pending
                            ? 'hr-leave-pending'
                            : 'hr-leave-rejected'
                        }
                      >
                        <h6>
                          {item?.status == hrRequestStatusType.approved
                            ? 'Approved'
                            : item?.status == hrRequestStatusType.pending
                            ? 'Pending'
                            : 'Rejected'}
                        </h6>
                        {item?.status == hrRequestStatusType.pending && (
                          <Link to="#" onClick={e => handleEdit(e, item)}>
                            <img src={pencilIcon} alt="editIcon" />
                          </Link>
                        )}
                        {item?.status == hrRequestStatusType.rejected && (
                          <div className="hr-leave-request-text">
                            <p>{item?.requested_on}</p>
                          </div>
                        )}
                      </div>
                      {item?.status !== hrRequestStatusType.rejected && (
                        <div className="hr-leave-request-text">
                          <p>{item?.requested_on}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="hr-leave-btns">
                        <Link
                          to="#"
                          className="btn reject-btn"
                          onClick={() => {
                            setReject(item?.id);
                          }}
                        >
                          Reject
                        </Link>
                        <Link
                          to="#"
                          className="btn approve-btn"
                          onClick={() => updateRequest(item?.id)}
                        >
                          Approve
                        </Link>
                      </div>
                      <div className="hr-leave-request-text">
                        <p>{item?.requested_on}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HRRequestPage;
