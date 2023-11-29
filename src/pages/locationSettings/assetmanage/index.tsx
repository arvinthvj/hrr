import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assetsList } from '../../../assets/constants/config';
import { setTapList } from '../../../reduxStore/assetManagementSlice';
import AssetManagement from '../../../components/assetManagement/assetManagement';

const FloorAssetManagement = ({
  location_id,
  openBulkUpload,
  assetsDetails,
  addAssetInLocation,
  cancelBulkasset,
  successAddAsset,
  bulkUploadAsset,
}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state?.assetManagement);

  const getTapList = () => {
    if (assetsList?.length > 0) {
      dispatch(setTapList(assetsList));
    }
  };

  useEffect(() => {
    getTapList();
  }, []);

  return (
    <>
      {
        <AssetManagement
          location_id={location_id}
          openBulkUpload={openBulkUpload}
          count={
            assetsDetails?.length > 0
              ? assetsDetails?.[
                  selector?.currenttap == 1
                    ? 0
                    : selector?.currenttap == 2
                    ? 1
                    : 2
                ]?.count
              : 0
          }
          addAssetInLocation={addAssetInLocation}
          cancelBulkasset={cancelBulkasset}
          successAddAsset={successAddAsset}
          bulkUploadAsset={bulkUploadAsset}
        />
      }
    </>
  );
};

export default FloorAssetManagement;
