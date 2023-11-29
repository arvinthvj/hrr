import React from 'react';

export const MessageModal = () => {
  return (
    <>
      {/* Message Modal */}
      <div
        className="modal validation-modal notification-modal fade"
        id="message-modal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Message</h4>
              <button
                type="button"
                className="close me-1"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="feather-x" />
              </button>
            </div>
            <div className="modal-body">
              <div className="notification-details-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                  accumsan consectetur ipsum, amet. Ante tellus sapien fames
                  elit ornare nulla posuere tortor eget. Est odio enim dignissim
                  suspendisse elit morbi. In dignissim elit risus pulvinar.
                  Maecenas aliquam, purus in elit nunc. Vitae, lectus vitae vel
                  aenean accumsan arcu ipsum mi. Aliquet sit augue tellus tellus
                  id et massa, vitae id. Tristique nunc felis nibh ipsum
                  consectetur feugiat leo. Donec consectetur semper gravida
                  nibh. In scelerisque pellentesque lobortis posuere sapien
                  suspendisse elit eros, sodales.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Message Modal */}
    </>
  );
};

export default MessageModal;
