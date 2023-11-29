import React from 'react';
import { TimeRightIcon, TimeleftIcon, flooricon } from '../../imagepath';
import moment from 'moment';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
  getUserPreferedDateFormat,
} from '../../commonMethod';
import { Link } from 'react-router-dom';

const UpcomingBookingDetails = ({ location }) => {
  return (
    <div className="booking-addres-grp booking-addres-grp-info">
      <ul>
        <li>
          <div className="book-addres-detail">
            <h5>{getUserPreferedDateFormat(moment(location?.booking_date))}</h5>
            <div className="check-point">
              <img
                src={TimeleftIcon}
                alt="icon"
                className="me-2 book-addres-left-icon"
              />
              {getPrefereredTimeToDisplay(location?.start_time)}
              <img
                src={TimeRightIcon}
                alt="icon"
                className="ms-2 me-2 book-addres-right-icon"
              />
              {getPrefereredTimeToDisplay(location?.end_time)}
            </div>
            {location.checkin ? (
              <div className="check-in-active check-in-profile">
                <span />
                <h5>{findLabelText('Checked_in', 'Checked-in', 'Settings')}</h5>
              </div>
            ) : null}
          </div>
        </li>
        <li>
          <div className="user-book-locates">
            <div className="location-users up-book-users">
              <h5>{location?.workspaces?.[0]?.name}</h5>
              <p>{location?.location?.name}</p>
            </div>
            {location?.location?.name && (
              <Link to="#">
                <img src={flooricon} alt="img" />
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UpcomingBookingDetails;
