import React, { useContext } from 'react';
import { DropdownAsset } from './dropDownAsset';
import { UpdateAssetContext } from '../context/context';
import { Descriptions } from './constant';

const AvailabilityToExternalAndWithinTeams = () => {
  const {
    editData,
    userStatus,
    selectedTeams,
    externalTeam,
    setExternalTeam,
    withinTeam,
    setWithinTeam,
  } = useContext(UpdateAssetContext);
  const externalChanges = val => {
    setExternalTeam(val);
  };
  return (
    <>
      {userStatus != 3 && (
        <div className="locate-manage available-team-blk border-0 mb-3">
          <DropdownAsset
            id={editData?.workspace_id}
            name={Descriptions.availToExternalTeams}
            subName={Descriptions.availToExternalTeamSubName}
            selectedValue={externalTeam}
            matchList={selectedTeams}
            updateValue={val => externalChanges(val)}
            image={'yes'}
            matches={'yes'}
            apiName={'team'}
          />
        </div>
      )}
      <div className="locate-manage available-team-blk border-0">
        <DropdownAsset
          id={editData?.workspace_id}
          name={Descriptions.availToUserWithinTeam}
          subName={Descriptions.availToUserWithinTeamSubname}
          teamId={selectedTeams?.[0]?.id}
          teamName={selectedTeams?.[0]?.name}
          selectedValue={withinTeam}
          updateValue={val => setWithinTeam(val)}
          apiName={'groupUser'}
        />
      </div>
    </>
  );
};

export default AvailabilityToExternalAndWithinTeams;
