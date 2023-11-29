import React, { useContext, useEffect, useRef } from 'react';
import { LocationSettingsContext } from '../context/context';
import LocationHeaderAndAssetCounts from './locationHeaderAndAssetCounts';
import FloorAssetManagement from '../../pages/locationSettings/assetmanage';
import LocationList from './locationList';
import { useSelector } from 'react-redux';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { Search } from '../imagepath';
import { Card, Col } from 'antd';

const LocationContainer = () => {
  const {
    createOrEditLocation,
    lastLocation,
    showAssetsConfiguration,
    setRightSideBar,
    setSearchList,
    filterList,
    liststatus,
    listInActiveStatus,
    assetsDetails,
    setOpenBulkUploadView,
    addAssetInLocation,
    setAddAssetInLocation,
    setEditAssetValue,
    setLocationId,
    setFloorId,
    successAddAsset,
    bulkUploadAsset,
  } = useContext(LocationSettingsContext);
  const { sideBarWidth } = useSelector((state: any) => state.app);
  const mainDivRef = useRef<any>();
  useEffect(() => {
    widthCalc();
  }, [sideBarWidth, mainDivRef?.current?.offsetWidth, createOrEditLocation]);
  useEffect(() => {
    if (lastLocation?.level == 8) {
      widthCalc();
    }
  }, [lastLocation]);

  const widthCalc = () => {
    const mainDivWidth = mainDivRef?.current?.offsetWidth;
    setRightSideBar(screen.width - (mainDivWidth + sideBarWidth));
  };
  const searchListData = value => {
    setSearchList(value);
    filterList(liststatus ? 1 : 0, listInActiveStatus ? 0 : 1, value, 'search');
  };
  return (
    <Col
      span={
        createOrEditLocation ||
        lastLocation?.level == 8 ||
        showAssetsConfiguration
          ? 18
          : 24
      }
      className={`location-left-hight main-space-remove  ${
        createOrEditLocation ||
        lastLocation?.level == 8 ||
        showAssetsConfiguration
          ? 'locations-maindiv'
          : 'locations-maindiv w-100 main-space-remove'
      }`}
      ref={mainDivRef}
    >
      <div
        className={
          lastLocation?.level == 8
            ? 'card card-table location-card-table rooms-space-hidden location-card-table-info w-100'
            : 'card card-table location-card-table rooms-space-hidden location-card-table-inner w-100'
        }
      >
        <div className="card-headers">
          <h3 className="card-titles">
            {findLabelText(
              'Location_settings',
              'Location settings',
              'Location',
            )}
          </h3>
          <div className="filter-search filter-input">
            <input
              type="text"
              placeholder={findLabelText(
                'Find_in location',
                'Find...',
                'Location',
              )}
              className="input-filter"
              onChange={e =>
                lastLocation?.level == 8 ? {} : searchListData(e.target.value)
              }
              disabled={lastLocation?.level == 8 ? true : false}
            />
            <div className="img-group">
              <Link to="#">
                <img src={Search} alt="img" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <LocationHeaderAndAssetCounts />
          <LocationList />
        </div>
      </div>
      {lastLocation?.level == 8 ? (
        <FloorAssetManagement
          location_id={lastLocation?.id}
          assetsDetails={assetsDetails}
          openBulkUpload={() => {
            setOpenBulkUploadView(true);
            setAddAssetInLocation(false);
          }}
          addAssetInLocation={(status, value, location_id, floor_Id) => {
            setAddAssetInLocation(true);
            setOpenBulkUploadView(false);
            setEditAssetValue(value);
            setLocationId(location_id);
            setFloorId(floor_Id);
          }}
          cancelBulkasset={() => {
            setAddAssetInLocation(false);
            setOpenBulkUploadView(false);
          }}
          successAddAsset={successAddAsset}
          bulkUploadAsset={bulkUploadAsset}
        />
      ) : null}
    </Col>
  );
};

export default LocationContainer;
