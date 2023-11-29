import React, { useContext, useState } from 'react';
import { PersonalContext } from '../personalController';
import { Link } from 'react-router-dom';
import { tabIcon1, tabIcon2, tabIcon3 } from '../../imagepath';
import { DeleteConfirmationModal } from '../../deleteConfirmationModal/DeleteConfirmationModal';
import { leaveKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const TimeOffHeader = ({ tabChange, setTabChange, deleteData, resetData }) => {
  const {
    editBookOff,
    upcomingData,
    setEditBookOff,
    details,
    allFieldPermissionType,
  } = useContext(PersonalContext);
  const [showDeletePopup, setDeletePopupFlag] = useState(false);
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj => obj.section_name == sectionNames.leave && obj.field_name == key,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };
  return (
    <>
      <div
        className={`card-header ${
          upcomingData?.[1]?.user_type == 'admin' ? '' : 'book-time-card-header'
        }`}
      >
        {upcomingData?.[1]?.user_type == 'admin' && (
          <div className="tab-card-header">
            <ul
              className="nav nav-tabs nav-book-tabs"
              id="personalTab"
              role="tablist"
            >
              <li
                className="nav-item"
                role="presentation"
                style={{
                  width:
                    findIndex(leaveKeys.AdjustLeave) != '2' &&
                    findIndex(leaveKeys.Audit) != '2'
                      ? '100%'
                      : findIndex(leaveKeys.AdjustLeave) != '2' ||
                        findIndex(leaveKeys.Audit) != '2'
                      ? '50%'
                      : '',
                }}
              >
                <Link
                  className={
                    tabChange == 'edit' ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => {
                    setTabChange('edit');
                  }}
                  to="#"
                >
                  <img src={tabIcon1} alt="" />
                </Link>
              </li>
              {findIndex(leaveKeys.AdjustLeave) == '2' && (
                <li
                  className="nav-item"
                  role="presentation"
                  style={{
                    width:
                      findIndex(leaveKeys.AdjustLeave) == '2' &&
                      findIndex(leaveKeys.Audit) != '2'
                        ? '50%'
                        : '',
                  }}
                >
                  <Link
                    to="#"
                    className={
                      tabChange == 'settings' ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      setTabChange('settings');
                    }}
                  >
                    <img src={tabIcon3} alt="" />
                  </Link>
                </li>
              )}
              {findIndex(leaveKeys.Audit) == '2' && (
                <li
                  className="nav-item"
                  role="presentation"
                  style={{
                    width:
                      findIndex(leaveKeys.AdjustLeave) != '2' &&
                      findIndex(leaveKeys.Audit) == '2'
                        ? '50%'
                        : '',
                  }}
                >
                  <Link
                    to="#"
                    className={
                      tabChange == 'history' ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => {
                      setTabChange('history');
                    }}
                  >
                    <img src={tabIcon2} alt="" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
        <div className="personal-tab-heading remove-button">
          <div>
            <h4>
              {upcomingData?.[1]?.user_type == 'admin' && editBookOff && (
                <Link
                  to="#"
                  onClick={() => {
                    setEditBookOff();
                    resetData();
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>
              )}
              {tabChange == 'edit'
                ? editBookOff
                  ? `${findLabelText('Edit_Leave', 'Edit Leave', 'Hr')}`
                  : ` ${findLabelText('Book_Leave', 'Book Leave', 'Hr')}`
                : tabChange == 'settings'
                ? `${findLabelText('adjust_leave', 'Adjust leave', 'Hr')}`
                : `${findLabelText('History', 'History', 'Hr')}`}
            </h4>
            {upcomingData?.[1]?.user_type == 'admin' && (
              <p className={`${editBookOff ? '' : 'ms-0'}`}>
                {details?.full_name?.length > 30
                  ? details?.full_name.slice(0, 30) + '...'
                  : details?.full_name}
              </p>
            )}
          </div>
          {(upcomingData?.[1]?.user_type == 'user' ||
            upcomingData?.[1]?.user_type == 'admin') &&
            editBookOff && (
              <Link
                to="#"
                className="btn"
                onClick={() => setDeletePopupFlag(true)}
              >
                <i className="far fa-trash-can" />
              </Link>
            )}
        </div>
      </div>
      {showDeletePopup && (
        <DeleteConfirmationModal
          cancel={() => {
            setDeletePopupFlag(false);
          }}
          confirm={() => {
            setDeletePopupFlag(false);
            deleteData();
          }}
          header={`Delete Leave`}
          content={`Are you sure you want to delete this Leave`}
        />
      )}
    </>
  );
};

export default TimeOffHeader;
