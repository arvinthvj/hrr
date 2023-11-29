import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TrialModalProps } from '../../../assets/globals/typeConstants';
import { LoginLabel } from '../../../components/loginComponents/constants';
const TrialModal: React.FC<TrialModalProps> = ({
  show,
  confirm,
  label = '',
}) => {
  return (
    <>
      <Modal show={show} centered className="main-modal">
        <Modal.Header closeButton={false}>
          <Modal.Title>{LoginLabel.Thank_Website}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invite-admin-info">
            <div className="form-group">
              <label>{label ? label : LoginLabel.registered_E_mail}</label>
            </div>
            <div className="float-end">
              <Link
                to="#"
                className="btn super-admin-btn-primary"
                onClick={() => {
                  confirm();
                }}
              >
                {LoginLabel.Ok}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrialModal;
