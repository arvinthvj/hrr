import React from 'react';
import { findLabelText } from '../../commonMethod';
import DefaultAssetWorkspace from './defaultAssetWorkspace';
import DefaultAssetParking from './defaultAssetParking';
import DefaultAssetRoom from './defaultAssetRoom';
import { ProfileFieldLabels, TabNames } from '../constant';

const DefaultAssets = () => {
  return (
    <div className="profile-about-grp">
      <div className="office-teams office-teams-info">
        <h3>
          {findLabelText(
            'Default_assets',
            ProfileFieldLabels.defaultAssets,
            TabNames.settings,
          )}
        </h3>
        <DefaultAssetWorkspace />
        <DefaultAssetParking />
        <DefaultAssetRoom />
      </div>
    </div>
  );
};

export default DefaultAssets;
