import React, { useContext, useEffect, useState } from 'react';
import { permission_19 } from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';

const Assets = () => {
  const {
    scrollHeight,
    allPermissionList,
    setAllPermissionList,
  } = useContext(HRSettingsContext);
  const { asset } = allPermissionList;
  const [assetsList, updateAssets] = useState(asset?.asset_details);
  useEffect(() => {
    if (asset) {
      updateAssets(asset?.asset_details);
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      asset: {
        asset_details: assetsList,
      },
    });
  }, [assetsList]);

  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_19}
          title="Assets"
          list={assetsList}
          updatePermission={updateAssets}
        />
      </div>
    </div>
  );
};

export default Assets;
