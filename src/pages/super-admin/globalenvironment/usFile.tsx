import React, { useContext } from 'react';
import { GlobalEnvironmentData } from '../../../components/context/context';
import { Pdf } from '../../../components/imagepath';
import { GlobalEnvironmentLabel } from '../../../components/globalEnvironmentComponent/constants';
const UsFile = () => {
  const { success, uploadFile, showFile } = useContext(GlobalEnvironmentData);
  return (
    <>
      {' '}
      <div className="form-group environment-download">
        <div className="download-set-up">
          <h6>
            {GlobalEnvironmentLabel.US_T}&amp;{GlobalEnvironmentLabel.Cs}
          </h6>
          <span className="environment-upload">
            {' '}
            {GlobalEnvironmentLabel.Upload_PDF}
          </span>
          <div className="settings-template-btn">
            <label>
              {' '}
              {GlobalEnvironmentLabel.Upload_file}
              <input type="file" onChange={e => uploadFile(e, 'us_file')} />
            </label>
          </div>
          {(success.us == 'us_file' && success.usStatus) || showFile.us ? (
            <a
              href={showFile.us}
              target="_blank"
              className="d-flex align-item-center"
              rel="noreferrer"
            >
              <img src={Pdf} alt="pdf" className="me-2" />
              <span>{GlobalEnvironmentLabel.View_us_Pdf}</span>
            </a>
          ) : (
            <p>{GlobalEnvironmentLabel.No_file_uploaded}</p>
          )}
        </div>
      </div>
    </>
  );
};
export default UsFile;
