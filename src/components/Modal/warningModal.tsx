import React from 'react';
import { Modal } from 'react-bootstrap';

type WarningModalProps = {
  title: string;
  description: string;
  onCancel: any;
  onConfirm: any;
  open: any;
  cancelBtn?: string;
  continueBtn?: string;
};

const WarningModal: React.FC<WarningModalProps> = ({
  title,
  description,
  onCancel,
  onConfirm,
  open,
  cancelBtn,
  continueBtn,
}) => {
  return (
    <Modal show={open} centered className="main-modal">
      <Modal.Header closeButton={false}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="invite-admin-info">
          <div className="form-group">
            <label>{description}</label>
          </div>
          <div className="booking-btns">
            {cancelBtn && (
              <div className="btn model" onClick={onCancel}>
                {cancelBtn}
              </div>
            )}
            {continueBtn && (
              <div className="btn model btn-primary" onClick={onConfirm}>
                {continueBtn}
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModal;
