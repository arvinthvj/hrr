import React, { useContext } from 'react';
import { Pdf } from '../../../components/imagepath';
import { GlobalEnvironmentData } from '../../../components/context/context';
import { GlobalEnvironmentLabel } from '../../../components/globalEnvironmentComponent/constants';
const AuFile = () => {
  const { success, uploadFile, showFile } = useContext(GlobalEnvironmentData);
  return (
    <>
      {' '}
      <div className="form-group environment-download">
        <div className="download-set-up">
          <h6>
            {GlobalEnvironmentLabel.AU}&amp;{GlobalEnvironmentLabel.Cs}
          </h6>
          <span className="environment-upload">
            {GlobalEnvironmentLabel.Upload_PDF}
          </span>
          <div className="settings-template-btn">
            <label>
              {GlobalEnvironmentLabel.Upload_file}
              <input type="file" onChange={e => uploadFile(e, 'au_file')} />
            </label>
          </div>
          {(success.au == 'au_file' && success.auStatus) || showFile.au ? (
            <a
              href={showFile.au}
              target="_blank"
              className="d-flex align-item-center"
              rel="noreferrer"
            >
              <img src={Pdf} alt="pdf" className="me-2" />
              <span>{GlobalEnvironmentLabel.View_Pdf}</span>
            </a>
          ) : (
            <p>{GlobalEnvironmentLabel.No_file_uploaded}</p>
          )}
        </div>
      </div>
    </>
  );
};
export default AuFile;
