import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { findLabelText } from '../../commonMethod';

interface propstype {
  handleSubmit?: any;
  isDirty?: boolean;
  isValid?: boolean;
  anyOneRequired?: boolean;
  cleanError?: boolean;
  files?: any;
  editData?: any;
  resetData?: any;
  isPreference?: any;
  fileUploadError?: any;
}

const Footer: React.FC<propstype> = ({
  handleSubmit,
  isDirty,
  isValid,
  files,
  editData,
  anyOneRequired,
  cleanError,
  isPreference,
  fileUploadError,
}) => {
  const { EditComponent } = useContext(PersonalContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isPreference) {
      if (isDirty) {
        setError(false);
      } else if (editData?.file_upload?.length == files?.length) {
        setError(true);
      } else if (
        JSON.stringify(editData?.file_upload?.split(',')) ===
        JSON.stringify(files)
      ) {
        setError(true);
      } else if (
        JSON.stringify(editData?.file_upload?.split(',')) !=
        JSON.stringify(files)
      ) {
        setError(false);
      }
    } else {
      setError(false);
    }
  }, [
    editData?.file_upload?.split(',')?.length,
    files?.length,
    editData,
    isDirty,
  ]);

  return (
    <div className="tab-footer personal-footer">
      <Link
        to="#"
        className="btn"
        onClick={() => {
          EditComponent('', {});
          setError(false);
        }}
      >
        {findLabelText('Cancel', 'Cancel', 'Hr')}
      </Link>
      <Link
        to="#"
        className={`btn btn-primary ${
          (!isDirty || !isValid || anyOneRequired || error) &&
          error &&
          (cleanError !== undefined ? cleanError : true) &&
          (fileUploadError !== undefined ? fileUploadError : true)
            ? 'disable'
            : ''
        }`}
        onClick={
          (!isDirty ||
            !isValid ||
            anyOneRequired ||
            (fileUploadError && fileUploadError)) &&
          error &&
          (cleanError !== undefined ? cleanError : true) &&
          (fileUploadError !== undefined ? fileUploadError : true)
            ? () => {
                return;
              }
            : () => {
                handleSubmit();
                setError(false);
              }
        }
      >
        {findLabelText('Save', 'Save', 'Hr')}
      </Link>
    </div>
  );
};

export default Footer;
