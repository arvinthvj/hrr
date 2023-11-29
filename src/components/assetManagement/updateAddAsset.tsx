import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  assetSchema,
  schema,
} from '../../pages/locationSettings/assetmanage/schema';
import { DeleteConfirmationModal } from '../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { permision_asset, setting_asset } from '../../components/imagepath';
import {
  hideLoader,
  setResetAssest,
  showLoader,
} from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import {
  AssetWokSpaceListAdd,
  AsseteditUpdateData,
  userManagementlocationList,
} from '../../services/apiurl';
import Toaster from '../../components/toast';
import AssetSettingsTab from './assetSettingsTab';
import { UpdateAssetContext } from '../context/context';
import AssetPermissionTab from './assetPermissionTab';
import { Col } from 'antd';
import { Descriptions } from './constant';
import { findLabelText } from '../commonMethod';

interface UpdateAssetFormProps {
  name?: string;
  description?: string;
}

const UpdateAddAsset = ({
  sideMenuType = 'createNew',
  editData,
  setLoading,
  successFun,
  CancelAssetInLocation,
  locationId,
  floorId,
  addAssetInLocation,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<UpdateAssetFormProps>({
    resolver: yupResolver(assetSchema),
  });
  const dispatch = useDispatch();
  const [activeControl, setActiveControl] = useState(true);
  const { userDetails, tenantDetails, isResetAssest } = useSelector(
    (state: any) => state?.app,
  );
  const [userStatus, setUserStatus] = useState(1);
  const [title, setTitle] = useState('');
  const [unavailableResone, setUnavailaleResone] = useState('');
  const [locationSearch, setLocationSearch] = useState(''),
    [locationSearchList, setlocationSearchList] = useState([]),
    [selectLocationList, setSelecteLocationSearchList] = useState([]);
  // setTime
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('18:00');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  // Teams
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [withinTeam, setWithinTeam] = useState([]);
  const [externalTeam, setExternalTeam] = useState([]);
  // clea the values
  const [resetcom, setRestCom] = useState({
    name: '',
    description: '',
  });
  // HideBluk
  const [removebtn, setRemoveBtn] = useState(true);
  const { languages } = useSelector((state: any) => state?.language);
  const [capacity, setCapacity] = useState(1);
  const [isShowPermissionTab, setShowPermissionTab] = useState(false);
  const [openWarningPopup, setOpenWarningPopup] = useState(false);

  useEffect(() => {
    if (locationSearch?.trim()?.length == 0) {
      setlocationSearchList([]);
    }
    const debounce = setTimeout(() => {
      locationSearch && getLocationList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [locationSearch]);

  const getLocationList = () => {
    postData(
      userManagementlocationList,
      { name: locationSearch },
      successRes => {
        if (successRes?.List?.length > 0) {
          setlocationSearchList(successRes?.List);
        } else {
          setlocationSearchList([]);
        }
      },
    );
  };

  useEffect(() => {
    isResetAssest && handleBack();
  }, [isResetAssest]);

  const handleBack = () => {
    try {
      reset(resetcom);
      setSelecteLocationSearchList(userDetails?.location);
      setUserStatus(1);
      setUnavailaleResone('');
      CancelAssetInLocation();
    } catch (e) {}
  };

  const prepareSuccessData = (success, payload) => {
    const list = {};
    (list['workspace_id'] = success?.[0].id ? success?.[0].id : payload?.id),
      (list['name'] = success?.[0]?.name),
      (list['description'] = payload?.description),
      (list['location'] = selectLocationList),
      (list['workspace_type'] = 'Workspace'),
      (list['amenities'] = selectedAmenities),
      (list['team_details'] = selectedTeams?.[0]),
      (list['start_time'] = payload?.start_time),
      (list['capacity'] = payload?.capacity),
      (list['end_time'] = payload?.end_time),
      (list['status'] = payload?.status),
      (list['asset_capacity'] = payload?.capacity),
      (list['status_availables_id'] = payload?.status_availables_id),
      (list['reason'] = payload?.reason),
      (list['external_team'] = externalTeam),
      (list['external_team_res'] = withinTeam),
      (list['count'] = editData?.workspace_id ? 0 : 1);

    return list;
  };

  const onSubmit = data => {
    if (selectLocationList?.length == 0) {
    } else {
      dispatch(showLoader());
      if (!editData) {
        const getResponse = (data, res) => {
          dispatch(hideLoader());
          Toaster(res?.data?.code, res?.data?.message);
          if (res?.data?.code == 200) {
            handleBack();
            dispatch(setResetAssest(false));
            successFun('Add', prepareSuccessData(data, payload));
          }
        };
        const payload = {
          name: data?.name,
          floor_plan_type_id: floorId,
          location_floor_id: locationId,
          status: activeControl === true ? 1 : 0,
          location_id: locationId.toString(),
          status_availables_id: userStatus,
          start_time: startTime,
          end_time: endTime,
          amenities: selectedAmenities
            ?.map((value: any) => value?.id)
            .toString(),
          reason: unavailableResone,
          description: data?.description,
          team: selectedTeams?.map((value: any) => value?.id).toString(),
          external_team_res: withinTeam
            ?.map((value: any) => value?.id)
            .toString(),
          tenant_id: tenantDetails[0]?.tenant_id,
        };
        if (floorId == 2) {
          payload['capacity'] = capacity;
        }
        if (userStatus != 3) {
          payload['external_team'] = externalTeam
            ?.map((value: any) => value?.id)
            .toString();
        }
        postData(AssetWokSpaceListAdd, payload, getResponse);
      } else {
        const getResponce = (data, res) => {
          setLoading(false);
          dispatch(hideLoader());
          Toaster(res?.data?.code, res?.data?.message);
          if (res?.data?.code == 200) {
            let activeStatus = 0;
            if (editData?.status == 1 && payload?.status == 0) {
              activeStatus = 1;
            } else if (editData?.status == 0 && payload?.status == 1) {
              activeStatus = 2;
            }
            successFun('Edit', prepareSuccessData(data, payload), activeStatus);
            handleBack();
            dispatch(setResetAssest(false));
          }
        };
        const payload = {
          name: data?.name !== editData?.name ? data?.name : null,
          floor_plan_type_id: floorId,
          location_floor_id: locationId,
          status: activeControl === true ? 1 : 0,
          location_id: locationId.toString(),
          status_availables_id: userStatus,
          start_time: startTime,
          end_time: endTime,
          amenities: selectedAmenities
            ?.map((value: any) => value?.id)
            .toString(),
          reason: unavailableResone,
          description: data?.description,
          id: editData?.workspace_id,
          team: selectedTeams?.map((value: any) => value?.id).toString(),
          external_team_res: withinTeam
            ?.map((value: any) => value?.id)
            .toString(),
        };
        if (floorId == 2) {
          payload['capacity'] = capacity;
        }
        if (userStatus != 3) {
          payload['external_team'] = externalTeam
            ?.map((value: any) => value?.id)
            .toString();
        }
        postData(AsseteditUpdateData, payload, getResponce);
      }
    }
  };
  const updateEditData = data => {
    setActiveControl(data?.status == 0 ? false : true);
    setTitle(data?.name);
    setValue('name', data?.name);
    setValue('description', data?.description);
    setUserStatus(data?.status_availables_id);
    setUnavailaleResone(data?.reason);
    setStartTime(data?.start_time ? data?.start_time : '10:00');
    setEndTime(data?.end_time ? data?.end_time : '18:00');
    setSelecteLocationSearchList(data?.location);
    setCapacity(data?.asset_capacity ? data?.asset_capacity : 1);
    setSelectedAmenities(arrayValidation(data?.amenities));
    setSelectedTeams(
      data?.team_details != '' ? arrayValidation([data?.team_details]) : [],
    );
    setWithinTeam(
      data?.external_team_res?.[0]?.id
        ? arrayValidation(
            data?.external_team_res?.[0]?.id ? data?.external_team_res : [],
          )
        : data?.external_team_res?.id
        ? [data?.external_team_res]
        : [],
    );
    const arrayUniqueByKey = [
      ...new Map(data?.external_team?.map(item => [item['id'], item])).values(),
    ];
    setExternalTeam(arrayValidation(arrayUniqueByKey));
  };

  function arrayValidation(data) {
    if (data !== '' && data !== null && data !== undefined) return data;
    else return [];
  }

  useEffect(() => {
    if (editData?.workspace_id) {
      reset(resetcom);
      updateEditData(editData);
      setRemoveBtn(true);
    } else {
      reset(resetcom);
      setTitle('');
      setValue('name', '');
      setValue('description', '');
      setSelecteLocationSearchList(userDetails?.location);
      setUserStatus(1);
      setUnavailaleResone('');
      setSelectedAmenities([]);
      setSelectedTeams([]);
      setRemoveBtn(false);
      setStartTime('10:00');
      setEndTime('18:00');
      setCapacity(1);
      setWithinTeam([]);
      setExternalTeam([]);
    }
  }, [editData]);

  return (
    <>
      <UpdateAssetContext.Provider
        value={{
          handleBack,
          editData,
          handleSubmit,
          selectedAmenities,
          setSelectedAmenities,
          floorId,
          onSubmit,
          activeControl,
          control,
          trigger,
          setStartTime,
          startTime,
          setEndTime,
          endTime,
          capacity,
          setCapacity,
          selectedTeams,
          setSelectedTeams,
          externalTeam,
          setExternalTeam,
          userStatus,
          setUserStatus,
          withinTeam,
          setWithinTeam,
          selectLocationList,
          successFun,
          setActiveControl,
          errors,
          setOpenWarningPopup,
        }}
      >
        <Col
          span={6}
          className=" works-assets-edit main-space-remove-left workspacediv book-right-card add-edit-workspace list-save-btn"
        >
          <div
            className={`card border-0 p-0 d-flex ${
              sideMenuType === 'createNew'
                ? 'd-flex locations-detailsview'
                : 'd-flex locations-detailsview d-none'
            }`}
          >
            <div className="asset-tab-group">
              <div className="asset-select-path">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        !isShowPermissionTab ? 'active' : ''
                      } `}
                      data-bs-toggle="pill"
                      to="#asset-settings"
                      onClick={() => setShowPermissionTab(false)}
                    >
                      <img src={setting_asset} alt="img" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        isShowPermissionTab ? 'active' : ''
                      } `}
                      data-bs-toggle="pill"
                      to="#asset-permision"
                      onClick={() => setShowPermissionTab(true)}
                    >
                      <img src={permision_asset} alt="img" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                {!isShowPermissionTab ? (
                  <AssetSettingsTab />
                ) : (
                  <AssetPermissionTab />
                )}
              </div>
            </div>
            {removebtn && (
              <div
                className="create-para-btn create-btn-remove edit-workspace-btn"
                id="create-btn-remove"
              >
                <span className="remove-set-plan">
                  {Descriptions.assetRemoveDesc}
                </span>
                <Link to="#" className="btn btn-removlocation disabled">
                  {findLabelText(
                    'Remove_asset',
                    'Remove asset',
                    'Common_Values',
                  )}
                </Link>
              </div>
            )}
          </div>
        </Col>
      </UpdateAssetContext.Provider>
      {openWarningPopup && (
        <DeleteConfirmationModal
          cancel={() => {
            setUserStatus(userStatus);
            setOpenWarningPopup(false);
          }}
          confirm={() => {
            setOpenWarningPopup(false);
            setUserStatus(3);
          }}
          header={'Confirm change'}
          content={
            'By making this unavailable, all existing bookings on this asset will be cancelled.'
          }
          proceedButton={'Confirm and proceed'}
        />
      )}
    </>
  );
};

export default UpdateAddAsset;
