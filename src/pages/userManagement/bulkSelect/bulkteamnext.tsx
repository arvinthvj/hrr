import React from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../../../services/apicall';
import { UserManagementBulkAddandRemoveTeam } from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../../components/toast';
import { findLabelText } from '../../../components/commonMethod';
import { ApiStatusCode } from '../../../components/userManagement/constant';

const BulkTeamNext = ({
  finalbulkuserlist,
  setNextScreen,
  finalteamdata,
  handleBack,
}) => {
  const dispatch = useDispatch();

  const successCallBack = (data, res) => {
    if (res.data.code == ApiStatusCode.SUCCESS) {
      Toaster(res.data.code, res.data.message);
      dispatch(hideLoader());
      handleBack();
    }
  };

  const handleConfirm = () => {
    dispatch(showLoader());
    const usersId = finalbulkuserlist?.map(element => element.id);
    const teamIds = finalteamdata?.map(element => element.id);
    const paylod = { user_id: usersId.toString(), team_id: teamIds.toString() };
    postData(UserManagementBulkAddandRemoveTeam, paylod, successCallBack);
  };

  return (
    <div className="card-body locate-inner-card-body continue-inner-scroll">
      <div className="locations-user-header">
        <div className="selectset-path">
          <h4>
            <span>({finalbulkuserlist.length})</span>{' '}
            {findLabelText('Selected', 'Selected', 'User_Management')}
          </h4>
        </div>
      </div>
      <div className="locations-user-details">
        <h4>{findLabelText('The_users', 'The users', 'Common_Values')}:</h4>
        {finalbulkuserlist?.map((value, index) => {
          return <p key={index}>{value.display_name}</p>;
        })}
      </div>
      <div className="locations-user-details">
        <h4>
          {findLabelText(
            'Will_be_added_to_the_teams',
            'Will be added to the team(s)',
            'Common_Values',
          )}
          :
        </h4>
        {finalteamdata?.map((value) => {
          return (
            <>
              <p>{value.name}</p>
            </>
          );
        })}
      </div>
      <div className="location-btn-head location-user-btn">
        <Link
          to="#"
          className="btn btn-primary"
          onClick={() => handleConfirm()}
        >
          {findLabelText('Confirm', 'Confirm', 'Common_Values')}
        </Link>
        <Link
          to="#"
          className="btn link-cancels"
          onClick={() => setNextScreen(false)}
        >
          {findLabelText('Cancel', 'Cancel', 'User_Management')}
        </Link>
      </div>
    </div>
  );
};

export default BulkTeamNext;
