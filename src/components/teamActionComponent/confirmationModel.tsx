import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

interface ConfirmationModalProps {
  cancel?: CallableFunction | any;
  confirm?: CallableFunction | any;
  header?: string;
  content?: string;
  proceedButton?: string;
  cancelButton?: string;
  warning?: any;
  open?: boolean;
}

export const ConfirmationModal: React.FC<
  ConfirmationModalProps
> = ({
  cancel,
  confirm,
  header,
  content,
  proceedButton = 'Delete',
  cancelButton = 'Cancel',
  warning,
  open = true,
}) => {
  return (
    <Modal show={open} centered className="team-modal">
      <div className="main-modal">
        <div className="modal-header">
          <h4>{header}</h4>
        </div>
        <div className="modal-body">
          <div className="delete-info">
            <div className="delete-content">
              <p>{content}</p>
            </div>
            <div className="main-modal-btns">
              <Link
                to="#"
                className="btn cancel edit"
                data-bs-dismiss="modal"
                onClick={cancel}
              >
                {cancelButton}
              </Link>
              {proceedButton && !warning && (
                <Link
                  to="#"
                  className="btn super-admin-delete-btn"
                  data-bs-dismiss="modal"
                  onClick={confirm}
                >
                  {proceedButton}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
