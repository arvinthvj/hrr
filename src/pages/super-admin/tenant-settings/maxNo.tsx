import React, { useContext } from 'react';
import { TenantPortal } from '../../../components/context/context';
import { TenantLabelText } from '../../../components/tenantComponent/constants';
import { findLabelText } from '../../../components/commonMethod';
const MaxNo = () => {
  const {
    maxNoOfWorkSpace,
    setMaxNoOfWorkSpace,
    maxNoOfRooms,
    setMaxNoOfRooms,
    maxNoOfParking,
    setMaxNoOfParking,
    maxNoOfUser,
    setMaxNoOfUser,
  } = useContext(TenantPortal);
  return (
    <>
      <div className="form-group number-form-group">
        <label>
          {findLabelText(
            TenantLabelText.Max_Workspaces,
            TenantLabelText.Max_Workspaces,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="number-group">
          <input
            type="text"
            className="number-input"
            value={maxNoOfWorkSpace}
            onChange={e => {
              if (parseInt(e.target.value)) {
                setMaxNoOfWorkSpace(parseInt(e.target.value));
              } else if (e.target.value == '') {
                setMaxNoOfWorkSpace(0);
              }
            }}
          />
          <span
            className="number-btn"
            onClick={() => {
              setMaxNoOfWorkSpace(preve => parseInt(preve) + 1);
            }}
          >
            <b>+</b>
            <i className="fas fa-chevron-up" />
          </span>
          <span
            className="number-btn"
            onClick={() => {
              if (maxNoOfWorkSpace > 0) {
                setMaxNoOfWorkSpace(preve => parseInt(preve) - 1);
              }
            }}
          >
            <b>-</b>
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </div>
      <div className="form-group number-form-group">
        <label>
          {findLabelText(
            TenantLabelText.Max_Rooms,
            TenantLabelText.Max_Rooms,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="number-group">
          <input
            type="text"
            className="number-input"
            value={maxNoOfRooms}
            onChange={e => {
              if (parseInt(e.target.value)) {
                setMaxNoOfRooms(parseInt(e.target.value));
              } else if (e.target.value == '') {
                setMaxNoOfRooms(0);
              }
            }}
          />
          <span
            className="number-btn"
            onClick={() => {
              setMaxNoOfRooms(preve => parseInt(preve) + 1);
            }}
          >
            <b>+</b>
            <i className="fas fa-chevron-up" />
          </span>
          <span
            className="number-btn"
            onClick={() => {
              if (maxNoOfRooms > 0) {
                setMaxNoOfRooms(preve => parseInt(preve) - 1);
              }
            }}
          >
            <b>-</b>
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </div>
      <div className="form-group number-form-group">
        <label>
          {findLabelText(
            TenantLabelText.Max_Parking,
            TenantLabelText.Max_Parking,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="number-group">
          <input
            type="text"
            className="number-input"
            value={maxNoOfParking}
            onChange={e => {
              if (parseInt(e.target.value)) {
                setMaxNoOfParking(parseInt(e.target.value));
              } else if (e.target.value == '') {
                setMaxNoOfParking(0);
              }
            }}
          />
          <span
            className="number-btn"
            onClick={() => {
              setMaxNoOfParking(preve => parseInt(preve) + 1);
            }}
          >
            <b>+</b>
            <i className="fas fa-chevron-up" />
          </span>
          <span
            className="number-btn"
            onClick={() => {
              if (maxNoOfParking > 0) {
                setMaxNoOfParking(preve => parseInt(preve) - 1);
              }
            }}
          >
            <b>-</b>
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </div>
      <div className="form-group number-form-group">
        <label>
          {findLabelText(
            TenantLabelText.Max_Users,
            TenantLabelText.Max_Users,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="number-group">
          <input
            type="text"
            min="0"
            max="1500"
            className="number-input"
            value={maxNoOfUser}
            onChange={e => {
              if (parseInt(e.target.value) <= 1500) {
                setMaxNoOfUser(parseInt(e.target.value));
              } else if (e.target.value == '') {
                setMaxNoOfUser(0);
              }
            }}
          />
          <span
            className="number-btn"
            style={{ opacity: maxNoOfUser >= 1500 ? '' : '' }}
            onClick={() => {
              if (maxNoOfUser < 1500) {
                setMaxNoOfUser(preve => parseInt(preve) + 1);
              }
            }}
          >
            <b>+</b>
            <i className="fas fa-chevron-up" />
          </span>
          <span
            className="number-btn"
            style={{ opacity: maxNoOfUser == 0 ? '' : '' }}
            onClick={() => {
              if (maxNoOfUser > 0) {
                setMaxNoOfUser(preve => parseInt(preve) - 1);
              }
            }}
          >
            <b>-</b>
            <i className="fas fa-chevron-down" />
          </span>
        </div>
      </div>
    </>
  );
};

export default MaxNo;
