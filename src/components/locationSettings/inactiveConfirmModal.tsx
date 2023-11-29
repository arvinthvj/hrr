import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export const InactiveConfirmModal = ({ changeStatus }) => {
  return (
    // Confirm Modal
    <Modal
      className="modal confirm-modal fade"
      id="confirm-modal"
      data-keyboard="false"
      data-backdrop="static"
      show={true}
      centered
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4>Confirm change</h4>
        </div>
        <div className="modal-body">
          <div className="confirm-content">
            <p>
              By making this location inactive, all bookings between now and the
              ‘Inactive Until’ date will be cancelled. This may impact child
              records in the hierarchy.
            </p>
          </div>
          <div className="confirm-btns">
            <Link
              to="#"
              className="btn"
              data-bs-dismiss="modal"
              onClick={() => {
                changeStatus(true);
              }}
            >
              Cancel
            </Link>
            <Link
              to="#"
              className="btn btn-confirm"
              data-bs-dismiss="modal"
              onClick={() => {
                changeStatus(false);
              }}
            >
              Confirm and proceed
            </Link>
          </div>
        </div>
      </div>
    </Modal>
    // Confirm Modal
  );
};
