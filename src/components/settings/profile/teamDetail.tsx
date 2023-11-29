import React, { useContext } from 'react';
import { findLabelText } from '../../commonMethod';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../context/settingsContext';
import { teamList } from '../../../assets/constants/pageurl';
import {
  ButtonNames,
  ProfileFieldLabels,
  TabNames,
  ValidationMessages,
} from '../constant';

const TeamDetail = () => {
  const { profileData } = useContext(ProfileContext);
  return (
    <div className="office-teams">
      <h3>
        {findLabelText('Team', ProfileFieldLabels.team, TabNames.settings)}
      </h3>
      {profileData?.teams && profileData?.teams?.length > 0 ? (
        profileData?.teams?.map(i => (
          <div key={i?.id} className="office-views-team">
            <h4>{i?.name}</h4>
            <Link
              to={teamList}
              state={{
                search_id: i?.id,
                search_name: i?.name,
                search_type: 'team',
              }}
            >
              {findLabelText(
                'View_team',
                ButtonNames.VIEW_TEAM,
                TabNames.settings,
              )}
            </Link>
          </div>
        ))
      ) : (
        <p style={{ color: 'gray' }}>{ValidationMessages.noTeamAvailable}</p>
      )}
    </div>
  );
};

export default TeamDetail;
