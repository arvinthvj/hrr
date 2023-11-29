import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  setLocationActiveCount,
  setLocationLevelList,
  showLoader,
} from '../../reduxStore/appSlice';
import CreateEditLocation from './createOrEditLocation/createOrEditLocation';
import {
  AssetBulkStore,
  GetLanguageDetails,
  LocationBuildingAdditionalData,
  LocationFloorDetails,
  LocationLevelList,
  LocationListAPi,
  TimeZoneListAPI,
  locationMemberCount,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import { BulkUploadValidationModel } from '../../components/BulkUploadValidationModel/BulkUploadValidationModel';
import { handleImageUploadtoS3Bucket } from '../../services/s3Bucket';
import Toaster from '../../components/toast';
import { LocationSettingsContext } from '../../components/context/context';
import { OpenFloorplanEditorView } from '../../components/locationSettings/openFloorPlanEditView';
import { AssetBulkUpload } from '../../components/locationSettings/assetBulkUpload';
import LocationContainer from '../../components/locationSettings/locationContainer';
import UpdateAddAsset from '../../components/assetManagement/updateAddAsset';
import { AssetsConfiguration } from '../../components/assetManagement/assetConfiguration';
import {
  ApiStatusCode,
  AssetNameAndIcons,
  Buttontypes,
  Descriptions,
  countKey,
} from '../../components/locationSettings/constant';
import { Row } from 'antd';
import { setResetAssest } from '../../reduxStore/appSlice';

const AdminLocation = () => {
  const { userDetails } = useSelector((state: any) => state.app);
  const [openBulkUploadView, setOpenBulkUploadView] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [floorId, setFloorId] = useState('');
  const [addAssetInLocation, setAddAssetInLocation] = useState(false);
  const [editAssetValue, setEditAssetValue] = useState('');
  const [successAddAsset, setSuccessAddAsset] = useState('');
  const [bulkUploadAsset, setBulkUploadAsset] = useState('');
  const [bulkAssetData, setBulkAssetData] = useState<any>('');
  const [showBulkValidationModal, setShowBulkValidationModal] =
    useState<boolean>(false);
  const [modelLoader, setModelLoader] = useState(false);
  const [Loading, setLoading] = useState(false);
  const globalSearchLocation = useLocation();
  const { locationPaths, locationLevelList, locationActiveCount } = useSelector(
    (state: any) => state.app,
  );
  const [menu, setMenu] = useState(false);
  const [createOrEditLocation, setCreateOrEditStateFlag] = useState(false);
  const [editLocationDetails, setEditLocationDetails] = useState({});
  const [liststatus, setListStatus] = useState(true);
  const [listInActiveStatus, setListInActiveStatus] = useState(true);
  const [searchlist, setSearchList] = useState('');
  const [listData, setListData] = useState([]);
  const [listDataCopy, setListDataCopy] = useState([]);
  const [rightSideBar, setRightSideBar] = useState('');
  const [locationChange, setLocationChange] = useState(false);
  const [filteredId, setFilteredId] = useState(
    globalSearchLocation?.state?.search_id
      ? globalSearchLocation?.state?.search_id
      : 0,
  );
  const [buildingDetails, setBuildingDetails] = useState({});
  const [userPermissionCheck, setUserPermissionCheck] = useState(false);
  const lastLocation = locationPaths[locationPaths.length - 1];
  const [assetsDetails, setAssetsDetails] = useState([]);
  const [assetsMemberCountDetails, setAssetsMemnerCountDetails] =
    useState<any>(0);
  const [totalPage, setTotalPage] = useState(1);
  const [showAssetsConfiguration, updateAssetsConfigurationFlag] =
    useState(false);
  const selector = useSelector((state: any) => state?.assetManagement);
  const dispatch = useDispatch();

  useEffect(() => {
    getBuildingList();
  }, []);

  useEffect(() => {
    if (locationPaths?.length > 0) {
      const floorName = locationPaths.filter(option => {
        return option.location_type == 'Floor';
      });
      if (floorName.length == 0) {
        dispatch(setResetAssest(true));
      } else {
        dispatch(setResetAssest(false));
      }
    }
  }, [locationPaths]);

  const getLocationLevelList = () => {
    dispatch(showLoader());
    postData(LocationLevelList, {}, (success, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        const list = selectOgj(success);
        if (list.length > 0) {
          dispatch(setLocationLevelList(list));
        }
      } else {
        dispatch(setLocationLevelList([]));
      }
    });
  };

  const getTimeZoneList = buildDetails => {
    const buildingDetailCopy = JSON.parse(JSON.stringify(buildDetails));
    dispatch(showLoader());
    postData(TimeZoneListAPI, {}, (success, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        if (success?.length > 0) {
          const list: any = [];
          for (const obj of success) {
            obj['value'] = obj.id;
            obj['label'] =
              obj.alias_name + ',' + obj.timezone_name + ',' + obj.country_name;
            list.push(obj);
          }
          buildingDetailCopy['timezone_id'] = list;
          getLanguageDetails(buildingDetailCopy);
        }
      }
    });
  };

  const getLanguageDetails = buildDetails => {
    const buildingDetailCopy = JSON.parse(JSON.stringify(buildDetails));
    dispatch(showLoader());
    postData(GetLanguageDetails, {}, (success, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        if (success?.length > 0) {
          buildingDetailCopy['language'] = success;
          setBuildingDetails(buildingDetailCopy);
        }
      }
    });
  };

  const getBuildingList = () => {
    dispatch(showLoader());
    postData(LocationBuildingAdditionalData, {}, (success, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        getTimeZoneList(success);
      }
      getLocationLevelList();
    });
  };

  useEffect(() => {
    if (userDetails?.roles?.length > 0) {
      const datasList = userDetails?.roles?.filter(el => {
        return el.slug === 'administrator';
      });
      setUserPermissionCheck(datasList?.length > 0 ? true : false);
    }
    lastLocation?.level != 8 && getLocationAllList();
  }, [filteredId, locationChange]);

  const getLocationAllList = () => {
    dispatch(showLoader());
    const preparData = {
      filter_id:
        locationPaths?.length > 0
          ? locationPaths[locationPaths?.length - 1]?.id
          : filteredId,
      status: 0,
      search: searchlist,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(LocationListAPi, preparData, success => {
      setTotalPage(success?.totalPages);
      if (success?.List?.length > 0) {
        setListData(success?.List);
        setListDataCopy(success?.List);
        for (let i = 0; i < countKey?.length; i++) {
          totalCountData(countKey[i], success?.List, i);
        }
      } else {
        setListData([]);
        setAssetsDetails([]);
        setAssetsMemnerCountDetails(0);
      }
      dispatch(hideLoader());
    });
  };

  useEffect(() => {
    if (assetsDetails?.length > 0) {
      let data = {};
      if (lastLocation?.level == 8) {
        data = {
          memberCount: locationActiveCount?.memberCount,
          assetCount: locationActiveCount?.assetCount
            ? locationActiveCount?.assetCount
            : [],
          asserworkspaceMemberCount: assetsMemberCountDetails,
          asserworkspaceCount: assetsDetails ? assetsDetails : [],
        };
      } else {
        data = {
          memberCount: assetsMemberCountDetails,
          assetCount: assetsDetails ? assetsDetails : [],
          asserworkspaceMemberCount:
            locationActiveCount?.asserworkspaceMemberCount,
          asserworkspaceCount: locationActiveCount?.asserworkspaceCount
            ? locationActiveCount?.asserworkspaceCount
            : [],
        };
      }
      dispatch(setLocationActiveCount(data));
    }
  }, [assetsMemberCountDetails, assetsDetails]);

  const listDatas: any = [];
  const totalCountData = (key, arr, index) => {
    const initialValue = 0;
    let initial;
    let list = {};
    const sum = arr?.reduce((accumulator, curValue) => {
      return accumulator + curValue[key];
    }, initialValue);
    if (key == countKey[0]) {
      list = { user_count: sum };
      setAssetsMemnerCountDetails(list);
    } else if (key == countKey[1]) {
      initial = {
        id: 1,
        name: AssetNameAndIcons.workspace,
        icon_images: AssetNameAndIcons.deskIcon,
        count: sum,
      };
    } else if (key == countKey[2]) {
      initial = {
        id: 2,
        name: AssetNameAndIcons.room,
        icon_images: AssetNameAndIcons.roomIcon,
        count: sum,
      };
    } else if (key == countKey[3]) {
      initial = {
        id: 3,
        name: AssetNameAndIcons.parking,
        icon_images: AssetNameAndIcons.parkingIcon,
        count: sum,
      };
    }
    if (key != countKey[0]) {
      listDatas.push(initial);
      setAssetsDetails(listDatas);
    }
    return {
      memberCount: list,
      assertCount: listDatas,
    };
  };
  const selectOgj = items =>
    items?.map(item => {
      const obj = item;
      obj['value'] = item.id;
      obj['label'] = item.name;
      return obj;
    });
  const handleClose = () => {
    setCreateOrEditStateFlag(false);
    setEditLocationDetails({});
  };

  useEffect(() => {
    lastLocation?.level == 8 && getFloorDetails();
  }, [lastLocation]);

  const getFloorMemberCountDetails = () => {
    const preparData = {
      location_id: lastLocation.id,
    };
    dispatch(showLoader());
    postData(locationMemberCount, preparData, success => {
      dispatch(hideLoader());
      if (success?.user_count) {
        setAssetsMemnerCountDetails(success);
      } else {
        setAssetsMemnerCountDetails(0);
      }
    });
  };
  // ------------------------------Asset Bulk Upload-------------------
  const handleFileValidate = (file, ValidationReport) => {
    setModelLoader(true);
    handleImageUploadtoS3Bucket(file, 'csv', data => {
      const payload = {
        location_id: lastLocation?.id,
        file_path: data,
        asset_type: selector?.currenttap,
        type: '1',
      };
      postData(AssetBulkStore, payload, (data, res) => {
        ValidationReport(data);
        setBulkAssetData(data);
        data && setModelLoader(false);
        setShowBulkValidationModal(true);
      });
    });
  };
  const handleBulkUpload = () => {
    try {
      dispatch(showLoader());
      const payload = {
        file_path: bulkAssetData?.file_path,
        location_id: lastLocation?.id,
        asset_type: selector?.currenttap,
        type: '2',
      };
      postData(AssetBulkStore, payload, (data, res) => {
        dispatch(hideLoader());
        const list = { ...locationActiveCount };
        const modifiedArr = list?.asserworkspaceCount?.map(element =>
          element?.id === selector?.currenttap
            ? {
                ...element,
                count: element?.count + parseInt(data?.success_entries),
              }
            : element,
        );
        const obj = {
          ...locationActiveCount,
          asserworkspaceCount: modifiedArr,
        };
        dispatch(setLocationActiveCount(obj));
        Toaster(res?.data?.code, res?.data?.message);
        res?.data?.code == 200 && getFloorDetails();
        res?.data?.code == 200 && setBulkUploadAsset(data);
        res?.data?.code == 200 && setOpenBulkUploadView(false);
      });
    } catch {}
  };
  const getFloorDetails = () => {
    getFloorMemberCountDetails();
    const preparData = {
      location_id: lastLocation.id,
    };
    dispatch(showLoader());
    postData(LocationFloorDetails, preparData, success => {
      dispatch(hideLoader());
      if (success.length > 0) {
        const op = success?.map((e, i) => {
          const map = {
            ...e,
            icon_images:
              e.id == 1
                ? AssetNameAndIcons.deskIcon
                : e.id == 2
                ? AssetNameAndIcons.roomIcon
                : AssetNameAndIcons.parkingIcon,
          };
          return map;
        });
        setAssetsDetails(op);
      } else {
        setAssetsDetails([]);
      }
    });
  };
  const filterList = (status, status1, search, type) => {
    const workLocationCopy = JSON.parse(JSON.stringify(listDataCopy));
    let lists = [];
    let listsData = [];
    if (status == 0 && status1 == 1) {
      setListData([]);
      setAssetsDetails([]);
      setAssetsMemnerCountDetails(0);
    } else {
      lists = workLocationCopy?.filter((ele, i) => {
        return ele?.status == status || ele?.status == status1;
      });
      setListData(lists);
      if (type) {
        listsData = lists?.filter((ele: any, i) => {
          return ele?.name
            ?.toLowerCase()
            ?.includes(search?.trim()?.toLowerCase());
        });
        setListData(listsData);
      }
    }
  };

  return (
    <LocationSettingsContext.Provider
      value={{
        createOrEditLocation,
        setCreateOrEditStateFlag,
        lastLocation,
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
        setFilteredId,
        filteredId,
        setLocationChange,
        locationChange,
        handleClose,
        updateAssetsConfigurationFlag,
        userPermissionCheck,
        setListStatus,
        setListInActiveStatus,
        floorId,
        listData,
        setEditLocationDetails,
        editLocationDetails,
        totalPage,
        showAssetsConfiguration,
      }}
    >
      <>
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
          <div className="page-wrapper">
            <div className="content content-admin container-fluid pb-0">
              <Row>
                <LocationContainer />
                {createOrEditLocation ? (
                  <CreateEditLocation
                    locationLevelList={locationLevelList}
                    closeRightSideSection={() => {
                      handleClose();
                      getLocationAllList();
                    }}
                    buildingDetails={buildingDetails}
                    rightSideBar={rightSideBar}
                    locationPaths={locationPaths}
                  />
                ) : null}

                {lastLocation?.level == 8 &&
                !openBulkUploadView &&
                !addAssetInLocation ? (
                  <OpenFloorplanEditorView
                    rightSideBar={rightSideBar}
                    lastLocation={lastLocation}
                    locationPaths={locationPaths}
                  />
                ) : null}

                {lastLocation?.level == 8 &&
                !addAssetInLocation &&
                openBulkUploadView ? (
                  <AssetBulkUpload
                    HeadName={Descriptions.assetBulkUploadHeader}
                    CancelBulkUpload={() => {
                      setOpenBulkUploadView(false);
                    }}
                    handleFileValidate={handleFileValidate}
                    setModelLoader={setModelLoader}
                    openBulkUpload={() => {
                      setOpenBulkUploadView(true);
                      setAddAssetInLocation(false);
                    }}
                    asset_type={selector?.currenttap}
                  />
                ) : null}

                {lastLocation?.level == 8 &&
                !openBulkUploadView &&
                addAssetInLocation ? (
                  <UpdateAddAsset
                    addAssetInLocation={() => {
                      setAddAssetInLocation(true);
                      setOpenBulkUploadView(false);
                    }}
                    editData={editAssetValue}
                    successFun={(type, data, activeStatus) => {
                      setSuccessAddAsset(data);
                      if (type == Buttontypes.add || type == Buttontypes.edit) {
                        const list = { ...locationActiveCount };
                        const modifiedArr = list?.asserworkspaceCount?.map(
                          element =>
                            element?.id === floorId
                              ? {
                                  ...element,
                                  count: countData(element?.count, data?.count),
                                }
                              : element,
                        );
                        const obj = {
                          ...locationActiveCount,
                          asserworkspaceCount: modifiedArr,
                        };
                        dispatch(setLocationActiveCount(obj));
                      }
                      function countData(eleCount, dataCount) {
                        if (type == Buttontypes.add)
                          return eleCount + dataCount;
                        else if (type == Buttontypes.edit && activeStatus == 1)
                          return eleCount - 1;
                        else if (type == Buttontypes.edit && activeStatus == 2)
                          return eleCount + 1;
                        else return eleCount;
                      }
                    }}
                    CancelAssetInLocation={() => {
                      setAddAssetInLocation(false);
                    }}
                    locationId={locationId}
                    floorId={floorId}
                    setLoading={setLoading}
                  />
                ) : null}

                {showAssetsConfiguration && (
                  <AssetsConfiguration rightSideBar={rightSideBar} />
                )}
              </Row>
            </div>
          </div>
        </div>
        {showBulkValidationModal && (
          <BulkUploadValidationModel
            data={bulkAssetData ? bulkAssetData : ''}
            cancel={() => {
              setBulkAssetData('');
              setShowBulkValidationModal(false);
            }}
            modelLoader={modelLoader}
            confirm={() => {
              handleBulkUpload();
              setShowBulkValidationModal(false);
            }}
            header={Descriptions.assetBulkUploadValidationModalHeader}
            proceedButton={Buttontypes.upload}
          />
        )}
      </>
    </LocationSettingsContext.Provider>
  );
};
export default AdminLocation;
