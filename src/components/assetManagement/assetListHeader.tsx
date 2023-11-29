import React, { useContext, useState } from 'react';
import { findLabelText } from '../commonMethod';
import { useSelector } from 'react-redux';
import { AssetManagementContext } from '../context/context';
import { Link } from 'react-router-dom';
import { AddAssetLabels, AssetNames } from './constant';

const AssetListHeader = () => {
  const {
    count,
    addAssetInLocation,
    location_id,
    openBulkUpload,
    statusActive,
    filterList,
    statusInActive,
    setActivateStatus,
    setInActivateStatus,
  } = useContext(AssetManagementContext);
  const selector = useSelector((state: any) => state?.assetManagement);
  const [bulkSelectFlag, setBulkSelectFlag] = useState(true);

  const activeChanges = value => {
    filterList(value ? 1 : 0, statusInActive ? 0 : 1);
    setActivateStatus(value);
  };
  const inActiveChanges = value => {
    filterList(statusActive ? 1 : 0, value ? 0 : 1);
    setInActivateStatus(value);
  };
  const name =
    selector?.currenttap == 1
      ? AssetNames.workspace
      : selector?.currenttap == 2
      ? AssetNames.room
      : AssetNames.parking;
  return (
    <div className="floor-assets-table-set-spilt">
      <div className="floor-assets-border-line"></div>
      <div style={{ paddingTop: 10, paddingBottom: 8 }}>
        <div className="table-headername head-workspce-blk">
          <h2>
            {findLabelText(name, name, 'Location')}
            <span className="split-code-space"> - </span>
            <span className="code-space-count"> {count} </span>
          </h2>
        </div>
        <div className="addAnActiveStatusRow">
          <div className="addWorkSpaceRowView">
            <div>
              <Link
                to={'#'}
                className={`btn-createnew opencreate`}
                onClick={() => {
                  addAssetInLocation(
                    true,
                    '',
                    location_id,
                    selector?.currenttap,
                  );
                }}
              >
                <i className="fa fa-plus me-2" />
                <span>
                  {selector?.currenttap == 1
                    ? AddAssetLabels.addWorkspace
                    : selector?.currenttap == 2
                    ? AddAssetLabels.addRoom
                    : AddAssetLabels.addParking}
                </span>
              </Link>
            </div>
            <div className="location-assets-line-space"></div>
            <div>
              <Link
                to={'#'}
                className={`btn-createnew opencreate new-work-icon`}
                onClick={() => {
                  openBulkUpload(
                    selector?.currenttap == 1
                      ? AssetNames.workspace
                      : selector?.currenttap == 2
                      ? AssetNames.room
                      : AssetNames.parking,
                  );
                }}
              >
                <i className="fa fa-plus me-2 workspace-mix" />
                <i className="fa fa-plus workspace-mix-add" />
                <span>
                  {' '}
                  {selector?.currenttap == 1
                    ? AddAssetLabels.addMultiWorkspace
                    : selector?.currenttap == 2
                    ? AddAssetLabels.addMultiRoom
                    : AddAssetLabels.addMultiParking}
                </span>
              </Link>
            </div>
          </div>
          <div className="statusRowView location-status-view">
            <div className="checkbox-set" style={{ opacity: '0.3' }}>
              <label className="check">
                {AddAssetLabels.bulkSelect}
                <input type="checkbox" defaultChecked={bulkSelectFlag} />
                <span className="checkmark" />
              </label>
            </div>
            <div className="location-assets-line-space"></div>
            <div className="checkbox-set">
              <label className="check">
                {AddAssetLabels.active}
                <input
                  type="checkbox"
                  checked={statusActive}
                  onChange={e => activeChanges(e.target.checked)}
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className="location-assets-line-space"></div>
            <div className="checkbox-set">
              <label className="check">
                {AddAssetLabels.inactive}
                <input
                  type="checkbox"
                  checked={statusInActive}
                  onChange={e => inActiveChanges(e.target.checked)}
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="floor-assets-border-line"></div>
    </div>
  );
};

export default AssetListHeader;
