import React from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../../../commonMethod';

interface HrJobReporterProps {
  isSave: any;
  resetAllData: any;
  updateUserReportees: any;
}

const OrgFooter = ({
  isSave,
  resetAllData,
  updateUserReportees,
}: HrJobReporterProps) => {
  return (
    <div className="tab-footer personal-footer">
      <Link to="#" className="btn" onClick={resetAllData}>
        {findLabelText('Cancel', 'Cancel', 'Hr')}
      </Link>
      <Link
        to="#"
        className={!isSave ? 'btn btn-primary disable' : 'btn btn-primary'}
        onClick={updateUserReportees}
      >
        {findLabelText('Save', 'Save', 'Hr')}
      </Link>
    </div>
  );
};

export default OrgFooter;
