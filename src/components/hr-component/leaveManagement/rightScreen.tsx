import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  child_icon,
  compassion,
  hrCalendar,
  jury,
  other_icon,
  timeOff_2,
  timeOff_3,
  training_icon,
} from '../../imagepath';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { leaveManagement } from '../personal/scehma';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { PersonalContext } from '../personalController';
import { postData } from '../../../services/apicall';
import {
  bookedTimeOff,
  checkBookedTimeOff,
  listTimeOffTypes,
  personalChangeHistoryAPI,
} from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import DatePickerComponent from '../../datepicker/index';
import { Timetype } from '../constants';
import FileUpload from '../fileUpload';
import { hrUploadFileType } from '../../../assets/globals';
import Toaster from '../../toast';
import {
  hideLoader,
  showLoader,
  updateBlinkIcon,
} from '../../../reduxStore/appSlice';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import moment from 'moment';
import {
  ErrorMessage,
  ErrorMessageForLeave,
  Errorcode,
  dateFormat_GMT_Format,
  leaveKeys,
  sectionNames,
} from '../../../assets/constants/config';
import { Progress } from 'antd';
import SettingsTab from './settingsTab';
import TimeOffHeader from './header';
import LeaveHistoryList from './leaveHistoryList';
import DropDownSelectionWithImage from '../../selectfield/dropDownSelectionWithImage';
import {
  findLabelText,
  getUserPreferedDateFormat,
  getUserPreferedDateFormatToSave,
} from '../../commonMethod';

const TimeOffRightScreen = () => {
  const {
    Error,
    editBookOff,
    setEditBookOff,
    getListData,
    allFieldPermissionType,
    userID,
    setLeaveId,
    rightSidebarHeightForLeave,
  } = useContext(PersonalContext);
  const [leaveTypeList, setLeaveTypeList] = useState([]);
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [amount, setAmount] = useState([]);
  const [tabChange, setTabChange] = useState('edit');
  const [days, setDays] = useState<number>(1);
  const [files, setFile] = useState<Array<any>>([]);
  const [historyList, setHistoryList] = useState<Array<any>>([]);
  const [fromDateError, setFromDateError] = useState(false);
  const [remainingDays, setRemainingDays] = useState<any>();
  const [leaveTypeID, setLeaveTypeID] = useState<any>();
  const [height, setHeight] = useState<boolean>(false);
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(leaveManagement) });

  const dispatch = useDispatch();
  useEffect(() => {
    if (editBookOff) {
      const validateError = {
        shouldValidate: true,
      };
      setAmount([]);
      leaveTypeList?.find(
        ele =>
          ele?.value == editBookOff?.type &&
          setValue('type', ele, validateError),
      );
      setValue('notes', editBookOff?.notes, validateError);
      setValue('From', moment(editBookOff?.from_date), validateError);
      setStartDate(moment(editBookOff?.from_date));
      setValue('To', moment(editBookOff?.to_date), validateError);
      setEndDate(moment(editBookOff?.to_date));
      const list = editBookOff?.file_upload?.split(',');
      setFile([...list]);
    }
  }, [editBookOff]);
  const getIconImage = type => {
    switch (type) {
      case 'annual_leave_icon':
        return timeOff_2;
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
  const getLeaveList = () => {
    const payload = { user_id: userID };
    postData(listTimeOffTypes, payload, (data, res) => {
      if (res?.data?.code == 200) {
        const options = data?.map(item => ({
          image: getIconImage(item?.icon_type),
          label: item?.name,
          value: item?.name,
          id: item?.id,
        }));
        setLeaveTypeList(options);
      }
    });
  };

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} className="options">
      <img src={data.image} alt="Prefix Image" className="option-image" />
      <span>{label}</span>
    </div>
  );

  const handleFileInputChange = e => {
    const image = e.target.files[0];
    const valiedImg = hrUploadFileType.includes(image.type);
    if (valiedImg) {
      if (image.size > 1000000) {
        Toaster('error', 'File size must under 1MB!');
      } else {
        dispatch(showLoader());
        handleImageUploadtoS3Bucket(
          image,
          'image',
          data => {
            files.push(data);
            setFile([...files]);
            dispatch(hideLoader());
          },
          false,
          'ghr',
        );
      }
    } else {
      Toaster('error', ' Please upload valid file type');
    }
  };

  const removeImage = index => {
    files.splice(index, 1);
    setFile([...files]);
  };

  useEffect(() => {
    setValue('From', moment(new Date()));
    setValue('To', moment(new Date()));
  }, []);
  useEffect(() => {
    if (userID) {
      getLeaveList();
    }
  }, [userID]);

  useEffect(() => {
    setValue('type', leaveTypeList?.[0]);
  }, [leaveTypeList]);
  const handleCalculation = (type, date) => {
    const updatedData = amount.map(amt => {
      if (amt.booked_date === date) {
        return {
          ...amt,
          booked_session: type?.value,
        };
      }
      return amt;
    });
    setAmount(updatedData);
    calculateDays(updatedData);
  };
  const calculateDays = data => {
    let total = 0;
    for (const booking of data) {
      if (booking.booked_session === 'Full Day') {
        total += 1;
      } else {
        total += 0.5;
      }
    }
    setDays(total);
  };
  const onSubmit = data => {
    const payload = {
      timeoff_type: data?.type?.id,
      from_date: getUserPreferedDateFormatToSave(startDate),
      to_date: getUserPreferedDateFormatToSave(endDate),
      total_days: days,
      notes: data?.notes ? data?.notes : '',
      file_upload: files.toString(),
      amount: amount,
      user_id: userID,
    };
    if (editBookOff?.id) {
      payload['id'] = editBookOff?.id;
    }
    const url = editBookOff?.id ? bookedTimeOff?.Update : bookedTimeOff?.Add;
    dispatch(showLoader());
    postData(url, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
        dispatch(updateBlinkIcon(true));
      } else {
        Toaster(res?.status, res?.message);
      }
      getHistoryList();
      setEditBookOff();
      getListData();
      resetData();
      setLeaveId('');
    });
  };
  const resetData = () => {
    setValue('type', {});
    setValue('notes', '');
    setValue('From', moment(new Date()));
    setValue('To', moment(new Date()));
    setStartDate(moment(new Date()));
    setEndDate(moment(new Date()));
    setFile([]);
    setDays(1);
    setAmount([]);
    setEditBookOff(null);
    amount?.map((item, index) => {
      setValue(`amountType${index + 1}`, {});
    });
  };

  const deleteData = () => {
    dispatch(showLoader());
    postData(
      bookedTimeOff.Delete,
      { id: editBookOff?.id, user_id: userID },
      (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.code == 200) {
          Toaster(res?.data?.code, res?.data?.message);
        } else {
          Toaster(Errorcode, ErrorMessage);
        }
        getListData();
        resetData();
        setEditBookOff();
        setLeaveId('');
      },
    );
  };
  const Fromdate = watch('From');
  const Todate = watch('To');
  const Type = watch('type');

  useEffect(() => {
    setLeaveTypeID(Type?.id);
  }, [Type]);
  const checkLeave = () => {
    if (Fromdate && Todate && userID && leaveTypeID) {
      const payload = {
        user_id: userID,
        timeofftype: leaveTypeID,
        from_date: moment(Fromdate).format(dateFormat_GMT_Format),
        to_date: moment(Todate).format(dateFormat_GMT_Format),
        type: editBookOff ? 'edit' : 'add',
        booked_timeoff_id: editBookOff ? editBookOff?.id : '',
      };
      dispatch(showLoader());
      setAmount([]);
      postData(checkBookedTimeOff, payload, (data, res) => {
        dispatch(hideLoader());
        if (res?.status == '200') {
          res?.data?.message == ErrorMessageForLeave
            ? setFromDateError(true)
            : setFromDateError(false);
          setRemainingDays(data);
          calculateDays(data?.days_detail);
          setDays(data?.total_booking_days);
        } else {
          setFromDateError(false);
          Toaster(res?.status, res?.message);
        }
      });
    }
  };

  useEffect(() => {
    const Amount = remainingDays?.days_detail?.map(item => {
      return {
        booked_date: item?.date,
        booked_session: item?.value,
      };
    });
    setAmount(Amount);
  }, [remainingDays]);

  useEffect(() => {
    checkLeave();
  }, [leaveTypeID, userID, Todate]);

  const getHistoryList = () => {
    const payload = {
      user_id: userID,
      type: 'booked_timeoff',
      type_id: editBookOff?.id,
    };
    if (userID) {
      dispatch(showLoader());
      postData(personalChangeHistoryAPI, payload, (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.code == 200) {
          if (data?.length > 0) {
            setHistoryList(data);
          } else {
            setHistoryList([]);
          }
        } else {
          Toaster(Errorcode, ErrorMessage);
        }
      });
    }
  };

  useEffect(() => {
    getHistoryList();
  }, [editBookOff, userID]);

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj => obj.section_name == sectionNames.leave && obj.field_name == key,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };

  return (
    <>
      <div className="col-xl-3 col-lg-12 d-flex main-space-remove-left">
        <div className="card personal-card flex-fill">
          <TimeOffHeader
            tabChange={tabChange}
            setTabChange={setTabChange}
            deleteData={deleteData}
            resetData={resetData}
          />
          {tabChange == 'edit' ? (
            <>
              <div
                className="card-body personal-card-body book-time-card-body"
                style={{
                  height: rightSidebarHeightForLeave,
                  maxHeight: rightSidebarHeightForLeave,
                }}
              >
                <div>
                  <div className="form-group tab-form-group">
                    <label>{findLabelText('Type', 'Type', 'Hr')}</label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <DropDownSelectionWithImage
                          options={leaveTypeList}
                          CustomOption={CustomOption}
                          minWidth="75px"
                          height="35px"
                          Value={value}
                          backgroundColor="#FFF"
                          onChange={value => {
                            onChange(value);
                            trigger('type');
                          }}
                          placeholder=""
                        />
                      )}
                    />
                    <Error>{errors?.['type']?.message}</Error>
                  </div>
                  <div className="form-group tab-form-group tab-inner-group">
                    <ul className="nav">
                      <li>
                        <div className="form-group tab-form-group inside-calandar-image">
                          <label>{findLabelText('From', 'From', 'Hr')}</label>
                          <Controller
                            name="From"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePickerComponent
                                suffixIcon={<img src={hrCalendar} alt="" />}
                                name="From"
                                handleChange={date => {
                                  setStartDate(date);
                                  setEndDate(null);
                                  setValue('To', null);
                                }}
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                              />
                            )}
                          />
                          <Error>{errors?.['From']?.message}</Error>
                        </div>
                      </li>
                      {fromDateError && (
                        <div className="error-form-group">
                          <h6>
                            You have already requested time off for this period
                          </h6>
                          <p>
                            You can continue and make another request, but we
                            just wanted to let you know.
                          </p>
                        </div>
                      )}
                      <li>
                        <div className="form-group tab-form-group inside-calandar-image">
                          <label>{findLabelText('To', 'To', 'Hr')}</label>
                          <div className="book-icon-info">
                            <Controller
                              name="To"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <DatePickerComponent
                                  suffixIcon={<img src={hrCalendar} alt="" />}
                                  name="To"
                                  handleChange={value => {
                                    setEndDate(value);
                                  }}
                                  onChange={onChange}
                                  trigger={trigger}
                                  value={value}
                                />
                              )}
                            />
                            <Error>{errors?.['To']?.message}</Error>
                          </div>
                        </div>
                      </li>
                      {fromDateError && (
                        <div className="error-form-group">
                          <h6>
                            You have already requested time off for this period
                          </h6>
                          <p>
                            You can continue and make another request, but we
                            just wanted to let you know.
                          </p>
                        </div>
                      )}
                    </ul>
                  </div>
                  <div className="form-group tab-form-group">
                    <div className="book-amount-grid">
                      <div className="book-amount-header">
                        <p>{findLabelText('amount', 'Amount', 'Hr')}</p>
                      </div>
                      <div
                        className="book-amount-list-info"
                        style={{ height: height ? '160px' : '' }}
                      >
                        <div className="book-amount-list">
                          {amount?.map((item, index) => {
                            return (
                              <div className="book-amount-date" key={index}>
                                <p>
                                  {getUserPreferedDateFormat(item?.booked_date)}
                                </p>
                                <div className="book-amount-select">
                                  {Timetype?.find(
                                    type => type?.value == item?.booked_session,
                                  ) ? (
                                    <Controller
                                      name={`amountType${index + 1}`}
                                      control={control}
                                      render={({ field: { onChange } }) => (
                                        <DropDownSelection
                                          options={Timetype}
                                          width="68px"
                                          minWidth="68px"
                                          height="35px"
                                          selectedValue={Timetype?.find(
                                            type =>
                                              type?.value ==
                                              item?.booked_session,
                                          )}
                                          setHeight={setHeight}
                                          backgroundColor="#FFF"
                                          onChange={value => {
                                            onChange(value);
                                            trigger(`amountType${index + 1}`);
                                            handleCalculation(
                                              value,
                                              item?.booked_date,
                                            );
                                          }}
                                          placeholder=""
                                        />
                                      )}
                                    />
                                  ) : (
                                    <div className="leave-types">
                                      {item?.booked_session}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="book-amount-footer">
                        <p>
                          {findLabelText('Total', 'Total', 'Hr')}:{' '}
                          <span>
                            {days} {findLabelText('Days', 'Days', 'Hr')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group tab-form-group tab-description notes-form-group">
                    <label>{findLabelText('Notes', 'Notes', 'Hr')}</label>
                    <Controller
                      name="notes"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <textarea
                            maxLength={301}
                            value={value}
                            placeholder={findLabelText(
                              'Optional',
                              'Optional',
                              'Hr',
                            ) + '\n\n\n\n Max 300 characters'}
                            className="form-control-text-area"
                            onChange={e => {
                              onChange(e);
                              trigger('notes');
                            }}
                          />
                        </>
                      )}
                    />
                    <Error>{errors?.['notes']?.message}</Error>
                  </div>
                  <FileUpload
                    files={files}
                    handleFileInputChange={handleFileInputChange}
                    removeImage={removeImage}
                  />
                </div>
              </div>
              <div className="book-time-footer">
                {remainingDays != undefined && (
                  <div className="remaining-grid">
                    <p>
                      After this booking you will have{' '}
                      <span>{remainingDays?.remaining_days}</span> days holiday
                      remaining
                    </p>
                    <Progress
                      percent={
                        Number.isInteger(
                          remainingDays?.remaining_days_percentage,
                        )
                          ? remainingDays?.remaining_days_percentage
                          : remainingDays?.remaining_days_percentage?.toFixed(1)
                      }
                      type="circle"
                      strokeColor="#8DEAC3"
                      width={70}
                      strokeWidth={8}
                      className="anticlockwise-progress"
                    />
                    <div className="remaining-circle-bar"></div>
                  </div>
                )}
                <div className="personal-footer">
                  <Link to="#" className="btn" onClick={() => resetData()}>
                    {findLabelText('Cancel', 'Cancel', 'Hr')}
                  </Link>
                  {findIndex(leaveKeys.BookTimeOff) == '2' && (
                    <Link
                      to="#"
                      className={`btn btn-primary ${
                        Object.keys(errors).length > 0 ||
                        remainingDays?.remaining_days < 0 ||
                        days == 0 ||
                        leaveTypeList?.length == 0
                          ? 'disable'
                          : ''
                      }`}
                      onClick={
                        Object.keys(errors).length > 0 ||
                        remainingDays?.remaining_days < 0 ||
                        days == 0 ||
                        leaveTypeList?.length == 0
                          ? handleSubmit(() => {
                              return;
                            })
                          : handleSubmit(onSubmit)
                      }
                    >
                      {findLabelText('send_request', 'Send Request', 'Hr')}
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : tabChange == 'settings' ? (
            <SettingsTab leaveTypeList={leaveTypeList} />
          ) : tabChange == 'history' ? (
            <LeaveHistoryList historyList={historyList} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default TimeOffRightScreen;
