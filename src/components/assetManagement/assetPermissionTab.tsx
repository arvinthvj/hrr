import React from 'react';
import UpdateAssetHeader from './updateAssetHeader';
import AssignToTeamsField from './assignToTeamsField';
import AvailabilityField from './availabilityField';
import AvailabilityToExternalAndWithinTeams from './availabilityToExternalAndWithinTeams';

const AssetPermissionTab = () => {
  return (
    <div id="asset-permision" className=" tab-pane active">
      <UpdateAssetHeader headerName={'Permissions'} />
      <div className="create-locationsets set-locate-tab">
        <AssignToTeamsField />
        <AvailabilityField />
        <AvailabilityToExternalAndWithinTeams />
      </div>
    </div>
  );
};

export default AssetPermissionTab;
