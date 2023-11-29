import React from 'react';
import { Modal } from 'react-bootstrap';

export const NotesViewer = ({ details, close }) => {
  return (
    <>
      <Modal show={true} centered size="sm">
        <div className="validation-modal">
          <div className="modal-header">
            <h4>{details.type} - Notes</h4>
            <button
              onClick={() => {
                close();
              }}
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="feather-x" />
            </button>
          </div>
          <div className="modal-body">
            <p className="notes-text">{details.notes}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NotesViewer;
