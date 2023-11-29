import React, { useContext, useEffect, useState } from 'react';
import {
  QuickBookAssetCardContext,
  QuickBookContext,
  QuickBookDayContext,
} from '../context/context';
import LocationSelector from './locationSelector';
import ChooseAssetHeader from './chooseAssetHeader';
import ChooseAssetBody from './chooseAssetBody';

type AssetCardProps = {
  loadingStatus: boolean;
  type: string;
  setLoading: CallableFunction;
  changeWorkspaces: CallableFunction;
  editWorkspaces: CallableFunction;
};

const ChooseAsset: React.FC<AssetCardProps> = ({
  type,
  loadingStatus,
  setLoading,
  changeWorkspaces,
  editWorkspaces,
}) => {
  const {
    responseData,
    handleSelection,
    selectedAsset,
    setFloorId,
    floorId,
    setTimeZone,
    gotoGlobal,
    setGotoGlobal,
    setResponseData,
    updateSelectedAsset,
    setChooseFlag,
  } = useContext(QuickBookAssetCardContext);
  const { setUTCFormat, setInitial } = useContext(QuickBookContext);
  const { editDetails } = useContext(QuickBookDayContext);
  const [selected, setSelected] = useState({});
  const [searchResult, setSearchReasult] = useState<any>([]);
  const [locationpage, setLocationpage] = useState(false);
  const [findAndRemoveAssets, updateRemoveAssets] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>();
  const [locationSelectName, setLocationSelectName] = useState('');

  useEffect(() => {
    const removeIds = [];
    updateRemoveAssets([...filterByReference(responseData, removeIds)]);
  }, [responseData]);

  const sortBySelected = item => {
    const arr = [...findAndRemoveAssets];
    const fromIndex = arr.findIndex(object => {
      return object.asset_id === item.asset_id;
    });
    const element = arr.splice(fromIndex, 1)[0];
    arr.splice(0, 0, element);
    setSearchReasult([...arr]);
  };

  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  useEffect(() => {
    setSearchReasult(findAndRemoveAssets);
    const getSelected = findAndRemoveAssets.find(
      a => a?.asset_id == selectedAsset?.asset_id,
    );
    if (getSelected == undefined) {
      if (findAndRemoveAssets.length > 0) {
        setSelected(findAndRemoveAssets[0]);
        sortBySelected(findAndRemoveAssets[0]);
      } else {
        setSelected({});
      }
    } else {
      setSelected(getSelected);
      sortBySelected(getSelected);
    }
  }, [findAndRemoveAssets]);

  const filterByReference = (arr1, arr2) => {
    let res = [];
    if (arr2.length > 0) {
      res = arr1?.filter(el => {
        return !arr2.find(element => {
          return element == el?.asset_id;
        });
      });
    } else {
      res = arr1;
    }
    return res;
  };

  useEffect(() => {
    const defaultLocation = {
      label: selectedAsset?.location_name,
      value: '',
    };
    setDefaultValue(defaultLocation);
    setLocationSelectName(selectedAsset?.location_name);
  }, [selectedAsset]);

  return (
    <>
      {locationpage || gotoGlobal ? (
        <LocationSelector
          setLocationpage={setLocationpage}
          selectedAsset={selectedAsset}
          setFloorId={setFloorId}
          floorId={floorId}
          setTimeZone={setTimeZone}
          setUTCFormat={setUTCFormat}
          gotoGlobal={gotoGlobal}
          setGotoGlobal={setGotoGlobal}
          setInitial={setInitial}
          editWorkspaces={editWorkspaces}
        />
      ) : (
        <>
          <div className="change-popup change-popup-inner choose-workspace">
            <ChooseAssetHeader
              type={type}
              setLocationpage={setLocationpage}
              locationSelectName={locationSelectName}
              setSearchReasult={setSearchReasult}
              changeWorkspaces={changeWorkspaces}
            />
            <ChooseAssetBody
              loadingStatus={loadingStatus}
              searchResult={searchResult}
              setSearchReasult={setSearchReasult}
              setSelected={setSelected}
              selected={selected}
              changeWorkspaces={changeWorkspaces}
            />
          </div>
        </>
      )}
    </>
  );
};
export default ChooseAsset;
