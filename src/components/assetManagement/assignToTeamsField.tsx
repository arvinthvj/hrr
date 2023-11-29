import React, { useContext } from 'react';
import { DropdownAsset } from './dropDownAsset';
import { UpdateAssetContext } from '../context/context';
import { AddAssetLabels, Descriptions } from './constant';

const AssignToTeamsField = () => {
  const { editData, selectedTeams, setSelectedTeams, externalTeam } =
    useContext(UpdateAssetContext);
  const TeamChanges = val => {
    setSelectedTeams(val);
  };
  return (
    <div className="locate-manage available-team-blk border-0 mb-3">
      <DropdownAsset
        name={AddAssetLabels.assignToTeams}
        id={editData?.workspace_id}
        subName=""
        single="single"
        data={editData}
        selectedValue={selectedTeams}
        matchList={externalTeam}
        matches={'yes'}
        updateValue={val => TeamChanges(val)}
        image={'yes'}
        apiName={'team'}
      />{' '}
      {selectedTeams?.length == 0 && (
        <label
          className="user-management-team-error-message"
          style={{ color: 'red' }}
        >
          {Descriptions.pleaseSelectTeam}
        </label>
      )}
    </div>
  );
};

export default AssignToTeamsField;
