import React, { useContext } from 'react';
import { findLabelText } from '../commonMethod';
import { BookingContext } from '../context/context';
import { bookingNameIcon, bookingWhiteIcon, partialIcon } from '../imagepath';
import { PlanTextLabel, ViewByIds } from '../planModuleComponent/constants';

const BookingStatusView = () => {
  const { viewBy } = useContext(BookingContext);
  return (
    <div className="booking-table-list">
      <ul className="nav">
        <li>
          <div className="booking-schedule">
            <span className="booking-available" />
            <p>
              {viewBy == ViewByIds.team
                ? findLabelText(
                    PlanTextLabel.In_Office,
                    PlanTextLabel.InOffice,
                    PlanTextLabel.Book,
                  )
                : findLabelText(
                    PlanTextLabel.Available,
                    PlanTextLabel.Available,
                    PlanTextLabel.Book,
                  )}
            </p>
          </div>
        </li>
        {viewBy != ViewByIds.team && (
          <li>
            <div className="booking-schedule">
              <span className="booking-booked" />
              <p>
                {findLabelText(
                  PlanTextLabel.Booked,
                  PlanTextLabel.Booked,
                  PlanTextLabel.Book,
                )}
              </p>
            </div>
          </li>
        )}
        <li>
          <div className="booking-schedule">
            <span className="booking-by-request" />
            <p>
              {viewBy == ViewByIds.team
                ? findLabelText(
                    PlanTextLabel.Working_remotely,
                    PlanTextLabel.Workingremotely,
                    PlanTextLabel.Book,
                  )
                : findLabelText(
                    PlanTextLabel.By_request,
                    PlanTextLabel.Byrequest,
                    PlanTextLabel.Book,
                  )}
            </p>
          </div>
        </li>
        <li>
          <div className="booking-schedule">
            <span className="booking-booked-name" />
            <p>
              {viewBy == ViewByIds.team ? (
                findLabelText(
                  PlanTextLabel.Booking,
                  PlanTextLabel.Booking,
                  PlanTextLabel.Book,
                )
              ) : (
                <>
                  {findLabelText(
                    PlanTextLabel.Booked_by,
                    PlanTextLabel.Bookedby,
                    PlanTextLabel.Book,
                  )}
                </>
              )}
            </p>
          </div>
        </li>
        <li>
          <div className="booking-schedule">
            <span className="booking-pending-name">
              <img
                src={
                  viewBy == ViewByIds.team ? bookingWhiteIcon : bookingNameIcon
                }
                alt="img"
              />
            </span>
            <p>
              {viewBy == ViewByIds.team ? (
                findLabelText(
                  PlanTextLabel.Out_of_office,
                  PlanTextLabel.Outofoffice,
                  PlanTextLabel.Book,
                )
              ) : (
                <>
                  {findLabelText(
                    PlanTextLabel.Pending,
                    PlanTextLabel.Pending,
                    PlanTextLabel.Book,
                  )}
                </>
              )}
            </p>
          </div>
        </li>
        <li>
          <div className="booking-schedule">
            <span className="booking-unavailable" />
            <p>
              {viewBy == ViewByIds.team
                ? findLabelText(
                    PlanTextLabel.Unknown,
                    PlanTextLabel.Unknown,
                    PlanTextLabel.Book,
                  )
                : findLabelText(
                    PlanTextLabel.Unavailable,
                    PlanTextLabel.Unavailable,
                    PlanTextLabel.Book,
                  )}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BookingStatusView;
