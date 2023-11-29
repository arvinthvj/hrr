import React from 'react';
import { Notification_Calender, Notification_Topic } from '../imagepath';

const HRNotification = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="hr_notification"
      role="tabpanel"
      aria-labelledby="hr-notification"
    >
      <div className="hr-notification-card unread-notification">
        <div className="hr-notification-info">
          <div className="hr-topic">
            <img src={Notification_Topic} alt="" />
            <p>Topic</p>
          </div>
          <div className="hr-location">
            <p>Location</p>
            <p>(if specified)</p>
          </div>
          <div className="hr-notification-calendar">
            <div className="hr-noti-calc">
              <img src={Notification_Calender} alt="" />
            </div>
            <div className="hr-noti-content">
              <h6>16 Sep 21 - 20 Sep 22</h6>
              <p>08:00 - 08:00</p>
            </div>
          </div>
          <div className="hr-notification-text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Mauris ac dictum malesuada
              quam. Pulvinar enim amet venenatis nibh amet sollicitudin
              pharetra. Consequat at risus velit tristique sed vitae velit eget.
              Ullamcorper sed euismod amet quam blandit{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="hr-notification-card read-notification">
        <div className="hr-notification-info">
          <div className="hr-topic">
            <img src={Notification_Topic} alt="" />
            <p>Topic</p>
          </div>
          <div className="hr-location">
            <p>Location</p>
            <p>(if specified)</p>
          </div>
          <div className="hr-notification-calendar">
            <div className="hr-noti-calc">
              <img src={Notification_Calender} alt="" />
            </div>
            <div className="hr-noti-content">
              <h6>16 Sep 21 - 20 Sep 22</h6>
              <p>08:00 - 08:00</p>
            </div>
          </div>
          <div className="hr-notification-text">
            <p>
              Lorem ipsum dolor sit amet consectetur. Mauris ac dictum malesuada
              quam. Pulvinar enim amet venenatis nibh amet sollicitudin
              pharetra. Consequat at risus velit tristique sed vitae velit eget.
              Ullamcorper sed euismod amet quam blandit{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRNotification;
