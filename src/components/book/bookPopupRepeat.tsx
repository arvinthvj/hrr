import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dropdown_angle } from '../imagepath';

const BookPopupRepeat = ({ repeatOptions }) => {
  const [isShowRepeatMenu, setShowRepeatMenu] = useState(false);
  return (
    <div className="room-booking-date room-booking-date-info">
      <div className="booking-repeat-content">
        <h5>{'Repeat'}</h5>
      </div>
      <div className="booking-repeat-none">
        <span>
          <div className="booking-date">
            <Link
              to="#"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              onClick={() => {
                setShowRepeatMenu(!isShowRepeatMenu);
              }}
            >
              {'None'}
              <img
                src={dropdown_angle}
                alt="img"
                className={'collapse-norotate'}
              />
            </Link>
            <div className="dropdown-menu" style={{ display: 'none' }}>
              {repeatOptions?.map(ele => {
                return (
                  <Link
                    to="#"
                    key={ele?.id}
                    onClick={() => {
                      setShowRepeatMenu(false);
                    }}
                    className="dropdown-item active"
                  >
                    {ele?.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default BookPopupRepeat;
