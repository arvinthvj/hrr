import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getImageFroms3Bucket } from '../../../services/s3Bucket';
import { Link } from 'react-router-dom';

interface ImageProps {
  type: string;
  url: string;
}

export const DocumentViewer = ({ details, close }) => {
  const [updatedFileURL, updateFiles] = useState<Array<ImageProps>>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getPdfUrl();
  }, []);
  const getPdfUrl = async () => {
    const images: Array<ImageProps> = [];
    const promises = details?.list.map(obj => {
      return new Promise(resolve => {
        getImageFroms3Bucket(
          obj,
          'image',
          data => {
            const prepare = {
              type: obj.toLowerCase().includes('pdf') ? 'pdf' : 'png',
              url: data,
            };
            images.push(prepare);
            resolve(null);
          },
          false,
          'ghr',
        );
      });
    });

    await Promise.all(promises);
    updateFiles([...images]);
  };

  return (
    <>
      <Modal
        show={true}
        centered
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="validation-modal pdf-modal">
          <div className="modal-header">
            <h4>{details.type} Documents</h4>
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
          <div className="modal-body-info">
            <div className="modal-body">
              {index !== 0 && (
                <div className="accept-btn accept-btn-left">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    onClick={() => {
                      setIndex(index - 1);
                    }}
                  >
                    <i className="feather-chevron-left"></i>
                  </Link>
                </div>
              )}
              {updatedFileURL.length > 0 ? (
                updatedFileURL[index].type == 'pdf' ? (
                  <div className="updated-file-url">
                    {/* {pdfTC && ( */}
                    <embed
                      src={updatedFileURL[index].url}
                      type="application/pdf"
                      // frameBorder="0"
                      // scrolling="auto"
                      height="700px"
                      width="100%"
                    ></embed>
                    {/* )} */}
                  </div>
                ) : (
                  <div className="updated-file-img">
                    <img
                      src={updatedFileURL[index].url}
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                )
              ) : null}

              {updatedFileURL.length - 1 !== index && (
                <div className="accept-btn accept-btn-right">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    onClick={() => {
                      setIndex(index + 1);
                    }}
                  >
                    <i className="feather-chevron-right"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocumentViewer;
