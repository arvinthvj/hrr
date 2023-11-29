import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { timeOff_1, timeOff_2, timeOff_3, timeOff_4 } from '../../imagepath';
import { PersonalContext } from '../personalController';
import moment from 'moment';
import { dateFormat_DD_MMM } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const TimeGrid = ({ futureholidaysList }) => {
  const { gridDetails } = useContext(PersonalContext);
  const Grid1 = gridDetails?.[0]?.leave_used?.split(' of ');
  const Grid2 = gridDetails?.[0]?.next_holiday?.split(/\s(?=\d)/);
  const Grid3 = gridDetails?.[0]?.sick_days_used?.split('sick');
  const publicHolidays =
    futureholidaysList?.length > 0
      ? moment(futureholidaysList?.[0]?.date).format(dateFormat_DD_MMM)
      : '';

  return (
    <div className="time-grid-info">
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
          <div className="time-grid flex-fill">
            <div className="time-icon">
              <img src={timeOff_1} alt="" />
            </div>
            <div className="time-content">
              <h4>
                <span>{Grid1?.[0] && Grid1?.[0]}</span>
              </h4>
              <p>{Grid1?.[1] && <Link to="#">of {Grid1?.[1]}</Link>}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
          <div className="time-grid flex-fill">
            <div className="time-icon">
              <img src={timeOff_2} alt="" />
            </div>
            <div className="time-content">
              <p>
                <Link to="#">{Grid2?.[0] && Grid2?.[0]}</Link>
              </p>
              <h4>
                <span>{Grid2?.[1] && Grid2?.[1]}</span>
              </h4>
              <p>
                <Link to="#">{Grid2?.[2] && Grid2?.[2]}</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
          <div className="time-grid flex-fill">
            <div className="time-icon">
              <img src={timeOff_3} alt="" />
            </div>
            <div className="time-content">
              <h4>
                <span>{Grid3?.[0] && Grid3?.[0]}</span>
              </h4>
              <p>
                <Link to="#">
                  {findLabelText('sick_days_used', 'sick days used', 'Hr')}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 d-flex">
          <div className="time-grid flex-fill">
            <div className="time-icon">
              <img src={timeOff_4} alt="" />
            </div>
            <div className="time-content">
              <h4>
                <span>{publicHolidays}</span>
              </h4>
              <p>
                <Link to="#">
                  {findLabelText(
                    'next_public_holiday',
                    'next public holiday',
                    'Hr',
                  )}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeGrid;
