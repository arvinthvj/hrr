import React, { useContext } from 'react';
import UpdateAssetHeader from './updateAssetHeader';
import { DropdownValues } from '../dropDownSearchComponent/DropDownSearch';
import AssetNameDescription from './assetNameDescription';
import AssetAvailableTimepicker from './assetAvailableTimepicker';
import RoomCapacityField from './roomCapacityField';
import { UpdateAssetContext } from '../context/context';

const AssetSettingsTab = () => {
  const { selectedAmenities, setSelectedAmenities, floorId } =
    useContext(UpdateAssetContext);
  return (
    <div id="asset-settings" className="tab-pane active">
      <UpdateAssetHeader headerName={'Settings'} />
      <div className="create-locationsets set-locate-tab">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="single"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <AssetNameDescription />
            <AssetAvailableTimepicker />

            {floorId == 2 && <RoomCapacityField />}

            <DropdownValues
              name="Tags"
              type="null"
              asset={'yes'}
              selectedValue={selectedAmenities}
              updateValue={val => setSelectedAmenities(val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSettingsTab;
