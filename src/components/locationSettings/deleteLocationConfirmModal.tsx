import React from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { Modal } from 'react-bootstrap';

export const DeleteLocationConfirmModal = ({ cancel, confirm }) => {
  return (
    // Confirm Modal
    <Modal
      className="modal confirm-modal fade"
      // id="delete-location-modal"
      data-keyboard="false"
      data-backdrop="static"
      show={true}
      centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4>
            {' '}
            {findLabelText('Confirm_Delete', 'Confirm Delete', 'Common_Values')}
          </h4>
        </div>

        <div className="modal-body">
          <div className="confirm-content">
            <p>
              {' '}
              {findLabelText(
                'Description_for_confirm_delete_location',
                'You are attempting to delete the location, Please confirm.',
                'Location',
              )}
            </p>
          </div>
          <div className="confirm-btns">
            <Link
              to="#"
              className="btn"
              data-bs-dismiss="modal"
              onClick={() => {
                cancel();
              }}
            >
              {findLabelText('Cancel', 'Cancel', 'Common_Values')}
            </Link>
            <Link
              to="#"
              className="btn btn-confirm"
              data-bs-dismiss="modal"
              onClick={() => {
                confirm();
              }}
            >
              {findLabelText(
                'Confirm_and_proceed',
                'Confirm and proceed',
                'Location',
              )}
            </Link>
          </div>
        </div>
      </div>
    </Modal>
    // Confirm Modal
  );
};
