import React from 'react';
import { Link } from 'react-router-dom';
import { adminLocation } from '../../assets/constants/pageurl';
import { findLabelText } from '../commonMethod';

interface FloorPlanHeaderProps {
  floorDetails: object | any;
  afterSave: object | any;
  setPublish: CallableFunction | any;
}

const FloorPlanHeader: React.FC<FloorPlanHeaderProps> = ({
  floorDetails,
  afterSave,
  setPublish,
}) => {
  return (
    <div className="card-headers">
      <h4>
        <Link to={adminLocation}>
          <i className="fas fa-angle-left" />
        </Link>
        {floorDetails
          ? floorDetails?.floorplan_name || floorDetails?.location_name
          : Object.keys(afterSave).length > 0
          ? afterSave?.floorplan_name
          : ''}
      </h4>
      <div className="floor-top-btns">
        <Link to={adminLocation} className="btn">
          {findLabelText('Close', 'Close', 'Floorplan_Management')}
        </Link>
        <Link
          to=""
          onClick={() => setPublish(prev => prev + 1)}
          className="btn btn-primary"
        >
          {findLabelText('Publish', 'Publish', 'Floorplan_Management')}
        </Link>
      </div>
    </div>
  );
};

export default FloorPlanHeader;
