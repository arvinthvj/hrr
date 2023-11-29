import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { findLabelText } from '../../commonMethod';

const FormFooter = ({ handleSubmit, isDirty, errors, setCancel }) => {
  const { addPersonalDetail } = useContext(PersonalContext);
  return (
    <div className="personal-footer">
      <Link
        to="#"
        className="btn"
        onClick={() => {
          setCancel(Math.random());
        }}
      >
        {findLabelText('Cancel', 'Cancel', 'Hr')}
      </Link>
      <Link
        to="#"
        className={`btn btn-primary ${
          !isDirty || Object.keys(errors).length > 0 ? 'disable' : ''
        }`}
        onClick={
          !isDirty || Object.keys(errors).length > 0
            ? () => {
                return;
              }
            : handleSubmit(addPersonalDetail)
        }
      >
        {findLabelText('Save', 'Save', 'Hr')}
      </Link>
    </div>
  );
};

export default FormFooter;
