import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AssetWokconfigGetData,
  AssetWokconfigUpdate,
} from '../../../services/apiurl';
import { postData } from '../../../services/apicall';
import { useDispatch } from 'react-redux';
import Toaster from '../../toast';
import { DropdownValues } from '../../dropDownSearchComponent/DropDownSearch';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { findLabelText } from '../../commonMethod';
import { Descriptions } from '../constant';

const ParkingConfiguration = () => {
  const dispatch = useDispatch();
  const [allowBooking, setAllowBooking] = useState(0);
  const [bookingUpto, setBookingUpto] = useState(0);
  const [requiresCheck, setRequiresCheck] = useState(true);
  const [mandatoryCheck, setMandatoryCheck] = useState(true);
  const [sendReminders, setSendReminders] = useState(0);
  const [cancelBooking, setCancelBooking] = useState(0);
  const [userCheckIn, setUserCheckIn] = useState(0);
  const [userCheckout, setUserCheckOut] = useState(0);
  const [id, setId] = useState('');
  // managersSearch
  const [selectedMenbers, setSelectedMembers] = useState([]);

  const handleCounter = (value, type) => {
    if (type === 'allowBooking' && value >= 0 && value <= 100) {
      setAllowBooking(value++);
    }
    if (type === 'bookingUpto' && value >= 0 && value <= 20) {
      setBookingUpto(value++);
    }
    if (type === 'sendReminders' && value >= 0 && value <= 60) {
      setSendReminders(value++);
    }
    if (type === 'cancelBooking' && value >= 0 && value <= 60) {
      setCancelBooking(value++);
    }
    if (type === 'userCheckIn' && value >= 0 && value <= 60) {
      setUserCheckIn(value++);
    }
    if (type === 'userCheckout' && value >= 0 && value <= 60) {
      setUserCheckOut(value++);
    }
  };

  // Get Workconfig Data
  // Fetch APIs List AssetWokSpaceList
  const getResponce = (data, res) => {
    dispatch(hideLoader());
    if (res?.data?.code == 200) {
      setAllowBooking(data?.allow_bookings);
      setBookingUpto(data?.user_booking);
      setSendReminders(data?.check_in_reminders);
      setCancelBooking(data?.cancel_check_in);
      setUserCheckIn(data?.user_check_in);
      setUserCheckOut(data?.user_check_out);
      setRequiresCheck(data?.check_in_require == 1 ? true : false);
      setId(data?.id);
      setMandatoryCheck(data?.registration == 1 ? true : false);
      setSelectedMembers(data?.amenitiesvalues);
    }
  };

  const getWokSpaceConfig = () => {
    dispatch(showLoader());
    postData(AssetWokconfigGetData, { id: 3 }, getResponce);
  };

  useEffect(() => {
    getWokSpaceConfig();
  }, []);

  const handleUpdate = () => {
    dispatch(showLoader());
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == 200) {
        getWokSpaceConfig();
      }
    };

    const payload = {
      allow_bookings: allowBooking,
      user_booking: bookingUpto,
      check_in_require: requiresCheck === true ? 1 : 0,
      check_in_reminders: !requiresCheck ? sendReminders : 0,
      user_check_in: !requiresCheck ? userCheckIn : 0,
      registration: mandatoryCheck ? 1 : 0,
      cancel_check_in: !requiresCheck ? cancelBooking : 0,
      id: id,
      amenities: selectedMenbers?.map((val: any) => val?.id).toString(),
    };
    postData(AssetWokconfigUpdate, payload, getResponce);
  };

  return (
    <>
      <div className="location-set ">
        <div className="location-back-head mb-0">
          <h2>
            {findLabelText(
              'Parking_configuration',
              'Parking configuration',
              'Common_Values',
            )}
          </h2>
        </div>
        <div className="location-back-heads">
          <p>
            {findLabelText(
              'These_settings_control_how_spaces_behave_across_the_organisation',
              'These settings control how spaces behave across the organisation',
              'Asset_Management',
            )}
          </p>
        </div>
        <div className="location-btn-head">
          <Link to="#" className="btn btn-primary" onClick={handleUpdate}>
            {findLabelText('Save_changes', 'Save changes', 'Common_Values')}
          </Link>
        </div>
      </div>
      <div className="allow-book">
        <div className="allow-bookset">
          <div className="allowworkspace">
            <h4>
              {findLabelText(
                'Allow_bookings_to_be_made',
                'Allow bookings to be made',
                'Asset_Management',
              )}
              :
            </h4>
            <div className="allow-booksetinput">
              <div className="form-group number-form-group">
                <div className="number-group">
                  <input
                    type="text"
                    min="1"
                    max="100"
                    onInput={(e: any) =>
                      (e.target.value = e.target.value.slice(0, 3))
                    }
                    className="number-input"
                    value={allowBooking}
                    onChange={e => {
                      handleCounter(e?.target?.value, 'allowBooking');
                    }}
                  />
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (allowBooking < 100) {
                        setAllowBooking((preve: any) => parseInt(preve) + 1);
                      }
                    }}
                  >
                    <b>+</b>
                    <i className="fas fa-chevron-up" />
                  </span>
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (allowBooking >= 1) {
                        setAllowBooking((preve: any) => parseInt(preve) - 1);
                      }
                    }}
                  >
                    <b>-</b>
                    <i className="fas fa-chevron-down" />
                  </span>
                </div>
              </div>
              <div className="days-unlimit-blk">
                <h5>
                  {findLabelText(
                    'days_in_advance',
                    'days in advance',
                    'Asset_Management',
                  )}
                </h5>
                <h6>
                  0 ={' '}
                  {findLabelText('unlimited', 'unlimited', 'Asset_Management')}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="allow-bookset">
          <div className="allowworkspace">
            <h4>
              {findLabelText(
                'Allow_consecutive_bookings_(shuffle)',
                'Allow consecutive bookings (shuffle)',
                'Asset_Management',
              )}
              :
            </h4>
            <div className="allow-booksetinput">
              <div className="form-group number-form-group">
                <div className="number-group">
                  <input
                    type="text"
                    min="1"
                    max="20"
                    onInput={(e: any) =>
                      (e.target.value = e?.target?.value?.slice(0, 2))
                    }
                    className="number-input"
                    value={bookingUpto}
                    onChange={e => {
                      handleCounter(e?.target?.value, 'bookingUpto');
                    }}
                  />
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (bookingUpto <= 30) {
                        setBookingUpto((preve: any) => parseInt(preve) + 1);
                      }
                    }}
                  >
                    <b>+</b>
                    <i className="fas fa-chevron-up" />
                  </span>
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (bookingUpto >= 1) {
                        setBookingUpto((preve: any) => parseInt(preve) - 1);
                      }
                    }}
                  >
                    <b>-</b>
                    <i className="fas fa-chevron-down" />
                  </span>
                </div>
              </div>
              <div className="days-unlimit-blk">
                <h5>/{findLabelText('month', 'month', 'Asset_Management')}</h5>
                <h6>
                  0 ={' '}
                  {findLabelText('unlimited', 'unlimited', 'Asset_Management')}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="organisation-list  organisation-radioset">
          <div className="allow-bookset mb-0">
            <div className="allowworkspace">
              <h4 className="mw-100">
                {findLabelText(
                  'Mandatory_registration',
                  'Mandatory registration',
                  'Asset_Management',
                )}
              </h4>
            </div>
          </div>
          <ul>
            <li>
              {findLabelText('Yes', 'Yes', 'Asset_Management')}
              <div className="schedule-calendar">
                <label className="custom_radio">
                  <input
                    type="radio"
                    name="actionss"
                    onChange={() => setMandatoryCheck(true)}
                    checked={mandatoryCheck}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </li>
            <li>
              {findLabelText('No', 'No', 'Asset_Management')}
              <div className="schedule-calendar">
                <label className="custom_radio">
                  <input
                    type="radio"
                    name="actionss"
                    id="watch-me"
                    onChange={() => setMandatoryCheck(false)}
                    checked={!mandatoryCheck}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="organisation-list  organisation-radioset">
          <div className="allow-bookset mb-0">
            <div className="allowworkspace">
              <h4 className="mw-100">
                {findLabelText(
                  'Automatic_check_in',
                  'Automatic check-in',
                  'Asset_Management',
                )}
              </h4>
              <span>{Descriptions.checkinManualy}</span>
            </div>
          </div>
          <ul>
            <li>
              {findLabelText('Yes', 'Yes', 'Asset_Management')}
              <div className="schedule-calendar">
                <label className="custom_radio">
                  <input
                    type="radio"
                    name="actions"
                    onChange={() => setRequiresCheck(true)}
                    checked={requiresCheck}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </li>
            <li>
              {findLabelText('No', 'No', 'Asset_Management')}
              <div className="schedule-calendar">
                <label className="custom_radio">
                  <input
                    type="radio"
                    name="actions"
                    id="watch-me"
                    onChange={() => setRequiresCheck(false)}
                    checked={!requiresCheck}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </li>
          </ul>
        </div>
        {!requiresCheck && (
          <div id="show-me">
            <div className="allow-bookset">
              <div className="allowworkspace">
                <h4>
                  {findLabelText(
                    'Check_in_reminders',
                    'Check in reminders',
                    'Asset_Management',
                  )}
                  :
                </h4>
                <div className="allow-booksetinput">
                  <div className="form-group number-form-group">
                    <div className="number-group">
                      <input
                        type="text"
                        min="0"
                        max="60"
                        onInput={(e: any) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
                        className="number-input"
                        value={sendReminders}
                        onChange={e => {
                          handleCounter(e?.target?.value, 'sendReminders');
                        }}
                      />
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (sendReminders <= 60) {
                            setSendReminders(
                              (preve: any) => parseInt(preve) + 1,
                            );
                          }
                        }}
                      >
                        <b>+</b>
                        <i className="fas fa-chevron-up" />
                      </span>
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (sendReminders >= 1) {
                            setSendReminders(
                              (preve: any) => parseInt(preve) - 1,
                            );
                          }
                        }}
                      >
                        <b>-</b>
                        <i className="fas fa-chevron-down" />
                      </span>
                    </div>
                  </div>
                  <div className="days-unlimit-blk">
                    <h5>
                      {findLabelText(
                        'minutes_before_start',
                        'minutes before start',
                        'Asset_Management',
                      )}
                    </h5>
                    <h6>
                      0 ={' '}
                      {findLabelText(
                        'unlimited',
                        'unlimited',
                        'Asset_Management',
                      )}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="allow-bookset">
              <div className="allowworkspace">
                <h4>
                  {findLabelText(
                    'Cancel_a_booking',
                    'Cancel a booking',
                    'Asset_Management',
                  )}
                  :
                </h4>
                <div className="allow-booksetinput">
                  <div className="form-group number-form-group">
                    <div className="number-group">
                      <input
                        type="text"
                        min="1"
                        max="60"
                        onInput={(e: any) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
                        className="number-input"
                        value={cancelBooking}
                        onChange={e => {
                          handleCounter(e?.target?.value, 'cancelBooking');
                        }}
                      />
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (cancelBooking <= 60) {
                            setCancelBooking(
                              (preve: any) => parseInt(preve) + 1,
                            );
                          }
                        }}
                      >
                        <b>+</b>
                        <i className="fas fa-chevron-up" />
                      </span>
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (cancelBooking >= 1) {
                            setCancelBooking(
                              (preve: any) => parseInt(preve) - 1,
                            );
                          }
                        }}
                      >
                        <b>-</b>
                        <i className="fas fa-chevron-down" />
                      </span>
                    </div>
                  </div>
                  <div className="days-unlimit-blk">
                    <h5>
                      {findLabelText(
                        'Minutes_after_no_check_in',
                        'Minutes after no check in',
                        'Asset_Management',
                      )}
                    </h5>
                    <h6>
                      0 ={' '}
                      {findLabelText(
                        'unlimited',
                        'unlimited',
                        'Asset_Management',
                      )}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="allow-bookset">
              <div className="allowworkspace">
                <h4>
                  {findLabelText(
                    'Allow_early_Check_in',
                    'Allow early Check in',
                    'Asset_Management',
                  )}
                  :
                </h4>
                <div className="allow-booksetinput">
                  <div className="form-group number-form-group">
                    <div className="number-group">
                      <input
                        type="text"
                        min="1"
                        max="60"
                        onInput={(e: any) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
                        className="number-input"
                        value={userCheckIn}
                        onChange={e => {
                          handleCounter(e?.target?.value, 'userCheckIn');
                        }}
                      />
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (userCheckIn <= 60) {
                            setUserCheckIn((preve: any) => parseInt(preve) + 1);
                          }
                        }}
                      >
                        <b>+</b>
                        <i className="fas fa-chevron-up" />
                      </span>
                      <span
                        className="number-btn"
                        onClick={() => {
                          if (userCheckIn >= 1) {
                            setUserCheckIn((preve: any) => parseInt(preve) - 1);
                          }
                        }}
                      >
                        <b>-</b>
                        <i className="fas fa-chevron-down" />
                      </span>
                    </div>
                  </div>
                  <h5>
                    {findLabelText(
                      'minutes_before_start',
                      'minutes before start',
                      'Asset_Management',
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}
        <DropdownValues
          name="Available tags"
          type="null"
          selectedValue={selectedMenbers}
          updateValue={val => setSelectedMembers(val)}
        />
      </div>
    </>
  );
};

export default ParkingConfiguration;
