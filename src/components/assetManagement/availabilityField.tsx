import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { dropdown_angle } from '../imagepath';
import { UpdateAssetContext } from '../context/context';
import { AvailabilityOptions, Descriptions } from './constant';

const AvailabilityField = () => {
  const { userStatus, setUserStatus, setOpenWarningPopup } =
    useContext(UpdateAssetContext);
  const [availColapse, setAvailColapse] = useState(true);
  const [showAvailOptions, setShowAvailOptions] = useState(false);
  const availability = [
    { name: AvailabilityOptions.available, id: 1 },
    { name: AvailabilityOptions.unAvailable, id: 3 },
    { name: AvailabilityOptions.availToRequest, id: 2 },
  ];
  return (
    <div className="locate-manage mb-3">
      <div className="locate-managehead">
        <Link
          data-bs-toggle="collapse"
          to="#locate"
          role="button"
          aria-expanded={availColapse ? 'false' : 'true'}
          aria-controls="locate"
          onClick={() => setAvailColapse(!availColapse)}
        >
          {Descriptions.availability}{' '}
          <img
            src={dropdown_angle}
            alt="img"
            className={availColapse ? 'collapse-rotate' : 'collapse-norotate'}
          />
        </Link>
      </div>
      <div
        className="collapse show"
        id="locate"
        style={{ display: availColapse ? 'block' : 'none' }}
      >
        <div className="approve-work-group">
          <div className="available-team-group team-avialable-space">
            <div className="team-availability">
              <h4>{Descriptions.availability}</h4>
              <span>{Descriptions.availabilityDesc}</span>
              <div className="book-view">
                <div className="book-dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle bg-white"
                    data-bs-toggle="dropdown"
                    onClick={() => setShowAvailOptions(!showAvailOptions)}
                  >
                    {userStatus == 1
                      ? AvailabilityOptions.available
                      : userStatus == 2
                      ? AvailabilityOptions.availToRequest
                      : AvailabilityOptions.unAvailable}
                  </Link>
                  <div
                    className="dropdown-menu"
                    style={{ display: showAvailOptions ? 'block' : 'none' }}
                  >
                    {availability?.map(ele => {
                      return (
                        <Link
                          to="#"
                          key={ele?.id}
                          onClick={() => {
                            setShowAvailOptions(false);
                            if (ele.id == 3) setOpenWarningPopup(true);
                            else setUserStatus(ele?.id);
                          }}
                          className="dropdown-item active"
                        >
                          {ele?.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityField;
