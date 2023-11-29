import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { findLabelText } from '../../commonMethod';

const FormFooter = () => {
  const {
    isPreferenceSaveButton,
    resetPreferenceData,
    updatePreferenceTimeData,
  } = useContext(PersonalContext);

  return (
    <div className="personal-footer">
      <Link to="#" className="btn" onClick={resetPreferenceData}>
        {findLabelText('Cancel', 'Cancel', 'Hr')}
      </Link>
      <Link
        to="#"
        className={
          isPreferenceSaveButton ? 'btn btn-primary disable' : 'btn btn-primary'
        }
        onClick={updatePreferenceTimeData}
      >
        {findLabelText('Save', 'Save', 'Hr')}
      </Link>
    </div>
  );
};

export default FormFooter;
