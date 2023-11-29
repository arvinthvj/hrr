import React, { useContext } from 'react';
import { LocationSettingsContext } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationPaths } from '../../reduxStore/appSlice';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { NavigationPath } from './navigationPath';
import { AssetsCounts } from './assetsCounts';

const LocationHeaderAndAssetCounts = () => {
  const {
    setFilteredId,
    filteredId,
    lastLocation,
    showAssetsConfiguration,
    setSearchList,
    liststatus,
    listInActiveStatus,
    successAddAsset,
    bulkUploadAsset,
    setLocationChange,
    locationChange,
    handleClose,
    updateAssetsConfigurationFlag,
    userPermissionCheck,
    filterList,
    setListStatus,
    setListInActiveStatus,
    setCreateOrEditStateFlag,
    floorId,
  } = useContext(LocationSettingsContext);
  const { locationPaths, locationActiveCount } = useSelector(
    (state: any) => state.app,
  );
  const dispatch = useDispatch();
  const updateCurrentPage = data => {
    if (data.length == 0) {
      setFilteredId(0);
      if (filteredId == 0) setLocationChange(!locationChange);
    } else {
      const obj = data[data.length - 1];
      setFilteredId(obj.id);
    }
    handleClose();
  };
  const goToPreviousLocation = () => {
    try {
      let list: any = [];
      if (locationPaths.length) {
        list = locationPaths?.map(i => i);
        const preparData = [...list];
        dispatch(setLocationPaths(preparData));
        setTimeout(() => {
          updateCurrentPage(preparData);
        }, 500);
      }
    } catch (error) {}
  };
  const getLocationName = recode => {
    const name = recode?.name;
    return name;
  };
  const activeChanges = value => {
    filterList(value ? 1 : 0, listInActiveStatus ? 0 : 1);
    setListStatus(value);
  };
  const inActiveChanges = value => {
    filterList(liststatus ? 1 : 0, value ? 0 : 1);
    setListInActiveStatus(value);
  };
  const handleAdd = () => {
    handleClose();
    updateAssetsConfigurationFlag(false);
    setTimeout(() => {
      setCreateOrEditStateFlag(true);
    }, 500);
  };
  return (
    <div className="table-set-spilt">
      <div className="breadcrumbs">
        <NavigationPath
          updateCurrentPage={length => {
            updateCurrentPage(length);
          }}
          showEdit={locationPaths?.length > 0 ? false : true}
          onClickEdit={() => {
            updateAssetsConfigurationFlag(!showAssetsConfiguration);
            handleClose();
          }}
          hideButton={userPermissionCheck}
        />
      </div>
      <div
        className={
          lastLocation?.level == 8
            ? 'table-header table-header-bottom'
            : 'table-header border-bottom-0 location-display'
        }
      >
        <div className="create-notify-blk">
          <div className="table-headername table-headername-inner d-flex align-items-center">
            {locationPaths?.length == 0 ? null : (
              <Link
                to={'#'}
                onClick={() => {
                  setSearchList('');
                  goToPreviousLocation();
                  handleClose();
                }}
              ></Link>
            )}
            <h2>
              {locationPaths?.length == 0
                ? findLabelText('Organisation', 'Organisation', 'Settings')
                : getLocationName(locationPaths[locationPaths.length - 1])}
            </h2>
          </div>
          {lastLocation?.level == 8 ? null : (
            <>
              {' '}
              <div className="check-header-blk">
                <div className="table-headersort">
                  <div className="table-headercheck me-0">
                    <div className="checkbox-set">
                      <label className="check">
                        {findLabelText('Active', 'Active', 'Location')}
                        <input
                          type="checkbox"
                          checked={liststatus}
                          onChange={e => activeChanges(e.target.checked)}
                        />
                        <span className="checkmark location-checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="table-headersort">
                  <div className="table-headercheck me-0">
                    <div className="checkbox-set">
                      <label className="check">
                        {findLabelText('Inactive', 'Inactive', 'Location')}
                        <input
                          type="checkbox"
                          checked={listInActiveStatus}
                          onChange={e => inActiveChanges(e.target.checked)}
                        />
                        <span className="checkmark location-checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {lastLocation?.level == 8 ? null : (
          <div className="create-new-locatebox">
            <Link
              to={'#'}
              className={`btn-createnew opencreate`}
              onClick={() => handleAdd()}
            >
              <i className="fa fa-plus me-2" />
              <span>{'Create a new location'}</span>
            </Link>
          </div>
        )}
      </div>
      {
        <AssetsCounts
          assetsDetails={
            lastLocation?.level == 8
              ? locationActiveCount?.asserworkspaceCount
              : locationActiveCount?.assetCount
          }
          memberCount={
            lastLocation?.level == 8
              ? locationActiveCount?.asserworkspaceMemberCount
              : locationActiveCount?.memberCount
          }
          floorId={floorId}
          addsuccessdata={successAddAsset}
        />
      }
    </div>
  );
};

export default LocationHeaderAndAssetCounts;
