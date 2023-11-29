import React, { useState } from 'react';
import { postData } from '../../../services/apicall';
import { EditProfile, getProfileDatas } from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useEffect } from 'react';
import { findLabelText } from '../../commonMethod';
import {
  Descriptions,
  NotificationAlertLabels,
  NotificationAlertTypes,
  TabNames,
} from '../constant';
import { Col, Row } from 'antd';

const NotificationAlerts = () => {
  const dispatch = useDispatch();
  const [checkingPush, setCheckPush] = useState(1);
  const [checkingemail, setCheckEmail] = useState(1);
  const [bookChangeEmail, setbookChangeEmail] = useState(1);
  const [bookChangePush, setbookChangePush] = useState(1);
  const [mount, setMount] = useState(false);

  const getNotificationList = () => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      if (res.data.code == 200) {
        dispatch(hideLoader());
        setCheckPush(data?.checkin_push);
        setCheckEmail(data?.checkin_email);
        setbookChangePush(data?.bookingchange_push);
        setbookChangeEmail(data?.bookingchange_email);
      }
    };
    postData(getProfileDatas, '', SuccessCallback);
  };

  const updateFun = () => {
    dispatch(hideLoader());
    getNotificationList();
  };

  const handleToogle = type => {
    dispatch(showLoader());
    let payload = {};
    // checkin_push
    if (type === NotificationAlertTypes.checkin_push) {
      payload = {
        checkin_push: checkingPush === 1 ? 0 : 1,
      };
    }
    // checkin_email
    if (type === NotificationAlertTypes.checkin_email) {
      payload = {
        checkin_email: checkingemail === 1 ? 0 : 1,
      };
    }
    // bookingchange_push
    if (type === NotificationAlertTypes.bookingchange_push) {
      payload = {
        bookingchange_push: bookChangePush === 1 ? 0 : 1,
      };
    }
    // bookingchange_email
    if (type === NotificationAlertTypes.bookingchange_email) {
      payload = {
        bookingchange_email: bookChangeEmail === 1 ? 0 : 1,
      };
    }
    postData(EditProfile, payload, updateFun);
  };

  useEffect(() => {
    getNotificationList();
    () => setMount(false);
  }, [mount]);
  return (
    <>
      <div className="organisation-settings">
        <Row>
          <Col span={10}>
            <div className="check-alert-grp">
              <div className="check-alerts">
                <h4>
                  {findLabelText(
                    'Check_in_alerts',
                    NotificationAlertLabels.check_in_alerts,
                    TabNames.settings,
                  )}
                </h4>
                <p>
                  {findLabelText(
                    'Notifications_to_remind_you_when_an_upcoming_check_in_is_required_You_will_also_be_notified_once_you_have_been_cheked_out',
                    Descriptions.checkinAlertDesc,
                    'Common_Values',
                  )}
                </p>
              </div>
              <div className="check-push">
                <div className="toogleclass mb-3">
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleToogle(NotificationAlertTypes.checkin_push)
                      }
                      checked={checkingPush == 1 ? true : false}
                    />
                    <span className="slider round" />
                  </label>
                  <h4>
                    {findLabelText(
                      'Push',
                      NotificationAlertLabels.push,
                      TabNames.settings,
                    )}
                  </h4>
                </div>
                <div className="toogleclass">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={checkingemail == 1 ? true : false}
                      onChange={() =>
                        handleToogle(NotificationAlertTypes.checkin_email)
                      }
                    />
                    <span className="slider round" />
                  </label>
                  <h4>
                    {findLabelText(
                      'Email',
                      NotificationAlertLabels.email,
                      TabNames.settings,
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="organisation-settings change-alerts">
        <Row>
          <Col span={10}>
            <div className="check-alert-grp">
              <div className="check-alerts">
                <h4>
                  {findLabelText(
                    'Booking_change_alerts',
                    NotificationAlertLabels.booking_change_alerts,
                    TabNames.settings,
                  )}
                </h4>
                <p>
                  {findLabelText(
                    'You_will_be_notified_when_a_booking_has_been_created_on_your_behalf_modified_accepted_or_rejected',
                    Descriptions.bookChangeAlertDesc,
                    'Common_Values',
                  )}
                </p>
              </div>
              <div className="check-push">
                <div className="toogleclass mb-3">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={bookChangePush == 1 ? true : false}
                      onChange={() =>
                        handleToogle(NotificationAlertTypes.bookingchange_push)
                      }
                    />
                    <span className="slider round" />
                  </label>
                  <h4>
                    {findLabelText(
                      'Push',
                      NotificationAlertLabels.push,
                      TabNames.settings,
                    )}
                  </h4>
                </div>
                <div className="toogleclass">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={bookChangeEmail == 1 ? true : false}
                      onChange={() =>
                        handleToogle(NotificationAlertTypes.bookingchange_email)
                      }
                    />
                    <span className="slider round" />
                  </label>
                  <h4>
                    {findLabelText(
                      'Email',
                      NotificationAlertLabels.email,
                      TabNames.settings,
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NotificationAlerts;
