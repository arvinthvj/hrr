import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import Scrollbars from 'react-custom-scrollbars';
import { BookingContext } from '../context/context';
import { PlanTextLabel } from '../planModuleComponent/constants';

const RoomCapacity = () => {
  const { capacityList, selectedCapacity, setInitialCapacity } =
    useContext(BookingContext);
  const [isShowCapacityMenu, setShowCapacityMenu] = useState(false);
  return (
    <li>
      <div className="booking-down-dropdown">
        <Link
          to="#"
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => setShowCapacityMenu(!isShowCapacityMenu)}
        >
          {findLabelText(
            PlanTextLabel.Capacity,
            PlanTextLabel.Capacity,
            PlanTextLabel.Book,
          )}
          <span>{selectedCapacity}+ </span>
        </Link>

        <ul
          className="dropdown-menu book-dropdown-menu"
          style={{ display: isShowCapacityMenu ? 'block' : 'none' }}
        >
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax="50vh"
            thumbMinSize={30}
            universal={true}
          >
            {capacityList && capacityList.length > 0
              ? capacityList.map((opt, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={'#'}
                        onFocus={() => {
                          setInitialCapacity(opt);
                        }}
                        onClick={() => setShowCapacityMenu(false)}
                        className="dropdown-item"
                      >
                        {opt}
                        {'+'}
                      </Link>
                    </li>
                  );
                })
              : null}
          </Scrollbars>
        </ul>
      </div>
    </li>
  );
};

export default RoomCapacity;
