import React from 'react';
import { Link } from 'react-router-dom';

export const DeleteSuperAdminUserConfirmModal = ({ cancel, confirm }) => {
  return (
    // Confirm Modal
    <div
      className="modal main-modal fade"
      id="remove-modal"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Remove user</h4>
          </div>
          <div className="modal-body">
            <div className="delete-info">
              <div className="main-modal-btns">
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
                  className="btn super-admin-delete-btn"
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
        </div>
      </div>
    </div>

    // Confirm Modal
  );
};
