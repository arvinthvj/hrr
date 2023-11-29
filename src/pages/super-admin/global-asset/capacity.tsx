import React, { useState } from 'react';
import { findLabelText } from '../../../components/commonMethod';
import { GlobalLabelText } from '../../../components/dashboardComponent/globalAssertComponent/constants';
import { Col } from 'antd';
export const Capacity = ({ editAssertData }) => {
  return (
    <>
      <div className="form-group number-form-group">
        <label>
          {findLabelText(
            GlobalLabelText.Capacity,
            GlobalLabelText.Capacity,
            GlobalLabelText.Common_Values,
          )}
          <span className="token-hours">
            {findLabelText(
              GlobalLabelText.later_date,
              GlobalLabelText.later_date,
              GlobalLabelText.Common_Values,
            )}
          </span>
        </label>
        <div className="settings-radio-btns disable">
          <label className="super_admin_custom_radio custom_radio_dark">
            <input
              type="radio"
              name="edit_capacity"
              checked={(editAssertData?.capacity == 1 && true) || false}
              readOnly
            />
            <span className="super_admin_checkmark custom_radio_dark_checkmark" />{' '}
            {findLabelText(
              GlobalLabelText.Single,
              GlobalLabelText.Single,
              GlobalLabelText.Common_Values,
            )}
          </label>
          <label className="super_admin_custom_radio custom_radio_dark">
            <input
              type="radio"
              checked={(editAssertData?.capacity == 0 && true) || false}
              readOnly
            />
            <span className="super_admin_checkmark custom_radio_dark_checkmark" />{' '}
            {findLabelText(
              GlobalLabelText.Multiple,
              GlobalLabelText.Multiple,
              GlobalLabelText.Common_Values,
            )}
          </label>
        </div>
      </div>
    </>
  );
};
export const AllowCanvas = ({ editBook, setEditBook }) => {
  return (
    <Col className="form-group">
      <label className="settings-radio-label">
        {findLabelText(
          GlobalLabelText.Allow_canvas,
          GlobalLabelText.Allow_canvas,
          GlobalLabelText.Common_Values,
        )}
      </label>
      <div className="settings-radio-btns">
        <label className="super_admin_custom_radio">
          <input
            type="radio"
            checked={editBook ? true : false}
            onChange={() => setEditBook(!editBook)}
          />
          <span className="super_admin_checkmark" />{' '}
          {findLabelText(
            GlobalLabelText.Yes,
            GlobalLabelText.Yes,
            GlobalLabelText.Common_Values,
          )}
        </label>
        <label className="super_admin_custom_radio">
          <input
            type="radio"
            checked={editBook ? false : true}
            onChange={() => setEditBook(!editBook)}
          />
          <span className="super_admin_checkmark" />{' '}
          {findLabelText(
            GlobalLabelText.No,
            GlobalLabelText.No,
            GlobalLabelText.Common_Values,
          )}
        </label>
      </div>
    </Col>
  );
};
