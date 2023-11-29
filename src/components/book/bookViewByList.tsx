import React, { useContext, useEffect, useRef, useState } from 'react';
import { findLabelText, validateOnBehalfOfUser } from '../commonMethod';
import { Link } from 'react-router-dom';
import { BookingContext } from '../context/context';
import { dayIcon, monthIcon, teamIcon } from '../imagepath';
import { PlanTextLabel, ViewByIds } from '../planModuleComponent/constants';

const BookViewByList = () => {
  const { viewBy, setViewBy } = useContext(BookingContext);
  const [show, setShow] = useState(false);
  const componentRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <div className="book-view">
      <p>{findLabelText('View_by', 'View by', 'Book')}</p>
      <div className="book-dropdown" ref={componentRef}>
        <Link
          to="#"
          onClick={() => setShow(true)}
          className="dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src={
              viewBy == ViewByIds.month
                ? monthIcon
                : viewBy == ViewByIds.team
                ? teamIcon
                : dayIcon
            }
            alt="img"
          />{' '}
          {viewBy == ViewByIds.month
            ? findLabelText(
                PlanTextLabel.Month,
                PlanTextLabel.Month,
                PlanTextLabel.Book,
              )
            : viewBy == ViewByIds.team
            ? findLabelText(
                PlanTextLabel.Team,
                PlanTextLabel.Team,
                PlanTextLabel.Book,
              )
            : findLabelText(
                PlanTextLabel.Day,
                PlanTextLabel.Day,
                PlanTextLabel.Book,
              )}
        </Link>
        <div className={`dropdown-menu ${show ? 'show' : ''}`}>
          <Link
            to="#"
            onClick={() => {
              setViewBy('1');
              setShow(false);
            }}
            className={
              viewBy == ViewByIds.month
                ? 'dropdown-item active'
                : 'dropdown-item'
            }
          >
            <img src={monthIcon} alt="img" />{' '}
            {findLabelText(
              PlanTextLabel.Month,
              PlanTextLabel.Month,
              PlanTextLabel.Book,
            )}
          </Link>
          <Link
            to="#"
            style={{ opacity: '0.25' }}
            className={
              viewBy == ViewByIds.day ? 'dropdown-item active' : 'dropdown-item'
            }
          >
            <img src={dayIcon} alt="img" />{' '}
            {findLabelText(
              PlanTextLabel.Day,
              PlanTextLabel.Day,
              PlanTextLabel.Book,
            )}
          </Link>
          <Link
            to="#"
            style={{ opacity: !validateOnBehalfOfUser() ? '0.3' : '' }}
            className={
              viewBy == ViewByIds.team
                ? 'dropdown-item active'
                : 'dropdown-item'
            }
            onClick={() => {
              if (!validateOnBehalfOfUser()) {
              } else {
                setViewBy('2');
                setShow(false);
              }
            }}
          >
            <img src={teamIcon} alt="img" />{' '}
            {findLabelText(
              PlanTextLabel.Team,
              PlanTextLabel.Team,
              PlanTextLabel.Book,
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookViewByList;
