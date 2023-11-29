import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BulkTeam from './bulkSelect/bulkteam';
import Toaster from '../../components/toast';
import { useSelector } from 'react-redux';
import { findLabelText } from '../../components/commonMethod';
import { Card, Col } from 'antd';

const Bulk = ({
  bulkselect,
  handleBulkCancel,
  setBulkListSelectList,
  finalbulkuserlist,
  rightSideBar,
}) => {
  const [teamSelect, setTeamSelect] = useState(true);
  const [teamType, setTeamType] = useState('');

  const handleTeamClick = type => {
    if (type == 'addTeam') {
      if (finalbulkuserlist.length <= 0) {
        Toaster('400', 'User selection is required');
        return false;
      }
      setTeamSelect(!teamSelect);
      setTeamType(type);
    }
  };
  return (
    <Col
      span={6}
      className={`  left-right-space main-space-remove-left d-flex`}
    >
      <div className="card bulk-select-card w-100 p-0 position-sender">
        {teamSelect ? (
          <div className="location-set location-set-box">
            <div className="selectset-path">
              <h4>
                <span>({finalbulkuserlist.length})</span>{' '}
                {findLabelText('Selected', 'Selected', 'User_Management')}
              </h4>
              <Link to="#" onClick={() => setBulkListSelectList([])}>
                {findLabelText('Deselect', 'Deselect', 'User_Management')}
              </Link>
            </div>

            <div className="selectset-pathbtn">
              <Link
                to="#"
                className="btn btn-primarys w-100"
                onClick={() => handleTeamClick('addTeam')}
              >
                {findLabelText('Add_to_team', 'Add to team', 'User_Management')}
              </Link>
              <Link
                to="#"
                className="btn btn-primarys w-100 disabled"
                // disabled=""
              >
                {findLabelText(
                  'Remove_from_team',
                  'Remove from team',
                  'User_Management',
                )}
              </Link>
              <Link
                to="#"
                className="btn btn-primarys w-100"
                disabled="disabled"
              >
                {findLabelText('Make_active', 'Make active', 'User_Management')}
              </Link>
              <Link
                to="#"
                className="btn btn-inactive w-100"
                disabled="disabled"
              >
                {findLabelText(
                  'Make_inactive',
                  'Make inactive',
                  'User_Management',
                )}
              </Link>
            </div>

            <div className="location-btn-head">
              <Link
                to="#"
                className="btn link-cancels"
                onClick={handleBulkCancel}
              >
                {findLabelText('Cancel', 'Cancel', 'User_Management')}
              </Link>
              <Link className="link-deleteuser" to="#" disabled="disabled">
                {findLabelText(
                  'Delete_users',
                  'Delete user(s)',
                  'Common_Values',
                )}
              </Link>
            </div>
          </div>
        ) : (
          <BulkTeam
            setTeamSelect={setTeamSelect}
            finalbulkuserlist={finalbulkuserlist}
          />
        )}
      </div>
    </Col>
  );
};

export default Bulk;
