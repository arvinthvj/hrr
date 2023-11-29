import React, { useContext } from 'react';
import { UpdateAssetContext } from '../context/context';
import { Link } from 'react-router-dom';
import { LeftAngle } from '../imagepath';
import { findLabelText } from '../commonMethod';

const UpdateAssetHeader = ({ headerName }) => {
  const { handleBack, editData, handleSubmit, onSubmit } =
    useContext(UpdateAssetContext);

  return (
    <div className="location-set">
      <div className="location-back-head work-space-locate">
        <div className="permision-back-head">
          <Link to="#" onClick={handleBack} className="me-3 link-mainset">
            <img src={LeftAngle} alt="img" />
          </Link>
          <h2>
            {headerName}
            <span className="permision-desk">
              {editData?.name ? editData?.name : null}
            </span>
          </h2>
        </div>
        <Link
          style={{
            opacity: 0.3,
          }}
          to="#"
          className="asset-clone"
        >
          {' '}
          Clone
        </Link>
      </div>
      <div className="location-btn-head ">
        <Link to="#" onClick={handleBack} className=" link-mainset">
          {findLabelText('Cancel', 'Cancel', 'Common_Values')}
        </Link>
        <Link
          to="#"
          className="btn btn-primary save-change-btn"
          onClick={handleSubmit(onSubmit)}
        >
          {!editData?.workspace_id
            ? findLabelText('Save', 'Save', 'Common_Values')
            : findLabelText('Save_changes', 'Save changes', 'Common_Values')}
        </Link>
      </div>
    </div>
  );
};

export default UpdateAssetHeader;
