import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export const ParentChangeConfirmModal = ({ cancel, confirm }) => {
  return (
    // Confirm Modal
    <Modal
      className="modal confirm-modal fade"
      id="parent-confirm-modal"
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
              You are attempting to change the parent location. Please be
              advised that this will delete all current and future bookings for
              all child locations.
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
              Cancel
            </Link>
            <Link
              to="#"
              className="btn btn-confirm"
              data-bs-dismiss="modal"
              onClick={() => {
                confirm();
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
