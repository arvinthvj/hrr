import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LocationDeleteApi,
  LocationGetManagersApi,
  ParentLocationLists,
} from '../../../services/apiurl.js';
import { postData } from '../../../services/apicall.js';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice.js';
import Toaster from '../../../components/toast/index.jsx';
import { schema } from './schema';
import { buildingSchema } from './buildingSchema';
import LocationSelect from '../../../components/locationSettings/locationSelect';
import {
  CreateOrEditLocationContext,
  LocationSettingsContext,
} from '../../../components/context/context';
import CreateOrEditLocationHeader from '../../../components/locationSettings/createOrEditLocationHeader';
import LocationNameDescription from '../../../components/locationSettings/locationNameDescription';
import ParentLocation from '../../../components/locationSettings/parentLocation';
import BuildingFields from '../../../components/locationSettings/buildingFields';
import ManagersDropdown from '../../../components/locationSettings/managersDropdown';
import { InactiveConfirmModal } from '../../../components/locationSettings/inactiveConfirmModal';
import { ParentChangeConfirmModal } from '../../../components/locationSettings/parentChangeConfirmModal';
import { DeleteLocationConfirmModal } from '../../../components/locationSettings/deleteLocationConfirmModal';
import CreateOrEditLocationFooter from '../../../components/locationSettings/createOrEditLocationFooter';
import { Col } from 'antd';

export const locationId = [3,4,5,6,7,8];

const CreateEditLocation = ({
  locationLevelList,
  buildingDetails,
  locationPaths,
  closeRightSideSection,
  rightSideBar,
}) => {
  const dispatch = useDispatch();
  const { editLocationDetails } = useContext(LocationSettingsContext);
  const [selectedmemberList, setSelectedMemberhList] = useState<any>([]);
  const [selectedmemberListBackup, setSelectedMemberhListBacup] = useState<any>(
    [],
  );
  const [activesatate, setActiveState] = useState(true);
  const [locationNameTitle, setLocationNameTitle] = useState('');
  const [locationLevel, setLocationLevel] = useState([]);
  const [selectedLocationObj, setSelectedLocationObj] = useState<any>({});
  const [parentLocationSearchText, setParentLocationSearchText] = useState('');
  const [parentLocationSearchList, setParentLocationSearchList] = useState([]);
  const [parentLocationSelected, setParentLocationSelected] = useState<any>({});
  const [parentLocationSelectedName, setParentLocationSelectedName] =
    useState('');
  const [languageList, setLanguageList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [weekstart, setWorkingWeek] = useState([]);
  const [defaultworkingweek, setDefaultworkingWeek] = useState<any>([]);
  const [hoursList, setHoursList] = useState([]);
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [parentSearchLoading, setParentSearchLoading] = useState(false);
  const [untileDate, setUntileDate] = useState<any>(null);
  const [charValidationMsg, setCharValidationMsg] = useState(false);
  const [showInactivePopup, setShowInactivePopup] = useState(false);
  const [parentLocationBackupSelected, setParentLocationBackupSelected] =
    useState({});
  const [counter, setCounter] = useState(0);
  const [parentlocationTempData, setParentlocationTempData] = useState<any>({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showParentChangePopup, setShowParentChangePopup] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      selectedLocationObj?.id == 7 ? buildingSchema : schema,
    ),
  });
  useEffect(() => {
    clearErrors();
    setDefaultworkingWeek(
      buildingDetails?.working_week ? buildingDetails?.working_week : [],
    );
    setHoursList(buildingDetails?.hour_id ? buildingDetails?.hour_id : []);
    setLanguageList(
      selectDatas(buildingDetails?.language ? buildingDetails?.language : []),
    );
    setCurrencyList(selectDatas(buildingDetails?.currency));
    setWorkingWeek(selectDatas(buildingDetails?.week_start));
    setTimeZoneList(buildingDetails?.timezone_id);
    if (Object.keys(editLocationDetails).length > 0) {
      const tIds = buildingDetails?.timezone_id;
      if (editLocationDetails?.timezone_id && tIds.length > 0) {
        for (const obj of tIds) {
          if (obj.id == editLocationDetails?.timezone_id) {
            obj['value'] = obj.id;
            obj['label'] =
              obj.alias_name + ',' + obj.timezone_name + ',' + obj.country_name;
            setValue('timezone', obj);
          }
        }
      }
    }

    if (Object.keys(editLocationDetails).length > 0) {
      // do nothing
    } else {
      if (locationPaths?.length > 0) {
        const data = locationPaths[locationPaths.length - 1];
        setParentLocationSelected({
          id: data.id,
          value: data.id,
          name: data.name,
          parent_name: data.location_type,
        });
        setValue(
          'parentLocation',
          {
            id: data.id,
            value: data.id,
            name: data.name,
            label: data.name,
            parent_name: data.location_type,
          },
          { shouldValidate: true },
        );
        setParentLocationSelectedName(data.name);
        setParentLocationBackupSelected({
          id: data.id,
          value: data.id,
          name: data.name,
          parent_name: data.location_type,
        });
        const list = locationLevelList?.filter(
          obj => parseInt(obj.id) > parseInt(data.level),
        );
        setLocationLevel(list);
        if (list.length > 0) {
          setSelectedLocationObj(list[0]);
        }
      } else {
        setLocationLevel(locationLevelList);
        if (locationLevelList.length > 0) {
          if (locationPaths?.length > 0) {
            setSelectedLocationObj(locationLevelList[0]);
          }
        }
        setParentLocationSelected({
          id: '0',
          value: '0',
          name: 'Global',
        });
        setValue(
          'parentLocation',
          {
            id: '0',
            value: '0',
            name: 'Global',
            label: 'Global',
          },
          { shouldValidate: true },
        );
        setParentLocationSelectedName('Global');
        setParentLocationBackupSelected({
          id: '0',
          value: '0',
          name: 'Global',
        });
      }
    }
  }, []);

  useEffect(() => {
    parentLocationSearchText && getParentLocationList();
  }, [parentLocationSearchText]);

  const getParentLocationList = () => {
    setParentSearchLoading(true);
    const data = {
      search: parentLocationSearchText,
      location_level: selectedLocationObj.id,
    };
    postData(ParentLocationLists, data, successRes => {
      setParentSearchLoading(false);
      const defaultGlobal = {
        id: 0,
        name: 'Global',
        status: 1,
        value: 0,
        label: 'Global',
      };
      if (successRes != 'error' && successRes?.length > 0) {
        const list: any = [];
        for (const obj of successRes) {
          obj['user_id'] = obj?.id;
          list.push(obj);
        }
        if (findGlobal(parentLocationSearchText)) {
          list.push(defaultGlobal);
        }
        setParentLocationSearchList(list);
      } else {
        const l: any = [];
        if (findGlobal(parentLocationSearchText)) {
          l.push(defaultGlobal);
        }
        setParentLocationSearchList(l);
      }
    });
  };

  const findGlobal = searchKey => {
    if (locationId.includes(selectedLocationObj?.id)) return false;
    else return searchKey.toLowerCase().includes('g');
  };

  useEffect(() => {
    if (Object.keys(editLocationDetails).length > 0) {
      // do nothing
    } else {
      if (locationPaths?.length > 0) {
        getAddedMemberList();
      }
    }
  }, []);

  const getAddedMemberList = () => {
    dispatch(showLoader());
    const id = locationPaths[locationPaths.length - 1].id;
    const name = locationPaths[locationPaths.length - 1].location_type;
    const data = {
      id: id,
      type: name,
      parentid: arrayjoin('id'),
      parent_level: arrayjoin('level'),
      parent_type: arrayjoin('location_type'),
    };
    postData(LocationGetManagersApi, data, successRes => {
      dispatch(hideLoader());
      if (successRes?.length > 0) {
        setSelectedMemberhList(successRes);
      } else if (successRes && !successRes?.length) {
        const result = Object.keys(successRes)?.map(function (key) {
          return String(key), successRes[key];
        });
        setSelectedMemberhList(result);
      } else {
        setSelectedMemberhList([]);
      }
    });
  };
  function arrayjoin(type) {
    const joinedStr = locationPaths?.map(list => list[type]).join(',');
    return joinedStr;
  }
  useEffect(() => {
    setEditValues();
  }, []);

  const selectDatas = items => {
    const list: any = [];
    if (items?.length > 0) {
      for (const obj of items) {
        obj['value'] = obj.id;
        obj['label'] = obj.label;
        list.push(obj);
      }
    }
    return list;
  };

  const setEditValues = () => {
    if (Object.keys(editLocationDetails).length > 0) {
      if (editLocationDetails.name) {
        setValue('locationName', editLocationDetails.name);
        setLocationNameTitle(editLocationDetails.name);
      }
      if (editLocationDetails.description) {
        setValue('description', editLocationDetails.description);
        setCounter(editLocationDetails.description.length);
      }
      if (editLocationDetails.parent_location || editLocationDetails.parent) {
        setParentLocationSelected({
          id: editLocationDetails.parent_location,
          value: editLocationDetails.parent_location,
          name: editLocationDetails.parent,
        });
        setValue(
          'parentLocation',
          {
            id: editLocationDetails.parent_location,
            value: editLocationDetails.parent_location,
            name: editLocationDetails.parent,
            label: editLocationDetails.parent,
          },
          { shouldValidate: true },
        );
        setParentLocationSelectedName(editLocationDetails.parent);
        setParentLocationBackupSelected({
          id: editLocationDetails.parent_location,
          value: editLocationDetails.parent_location,
          name: editLocationDetails.parent,
        });
      }
      if (editLocationDetails.location_level) {
        const findLevel = locationLevelList.find(
          val => val.id == editLocationDetails.location_level,
        );
        setSelectedLocationObj({
          id: editLocationDetails.location_level,
          value: editLocationDetails.location_level,
          name: findLevel?.name ? findLevel?.name : '',
        });
      }
      if (editLocationDetails.status == '1') {
        // do nothing
      } else {
        if (editLocationDetails?.status_date) {
          if (editLocationDetails.status_date == '0000-00-00') {
            setUntileDate(null);
          } else {
            setUntileDate(
              editLocationDetails.status_date
                ? new Date(editLocationDetails.status_date)
                : null,
            );
          }
        }
      }
      setActiveState(editLocationDetails.status == '1' ? true : false);
      if (editLocationDetails?.manager?.length > 0) {
        setSelectedMemberhList(editLocationDetails.manager);
        setSelectedMemberhListBacup([...editLocationDetails.manager]);
      } else if (
        editLocationDetails?.manager &&
        !editLocationDetails?.manager?.length
      ) {
        const result = Object.keys(editLocationDetails?.manager)?.map(
          function (key) {
            return String(key), editLocationDetails?.manager[key];
          },
        );
        setSelectedMemberhList(result);
        setSelectedMemberhListBacup([...result]);
      } else {
        setSelectedMemberhList([]);
      }

      // ONLY FOR BUILDING START
      if (editLocationDetails?.language) {
        const obj = buildingDetails?.language?.find(
          (item: any) => item?.id == editLocationDetails?.language,
        );
        setValue('language', obj);
      }

      if (editLocationDetails?.currency?.length > 0) {
        setCurrencyList(selectDatas(editLocationDetails?.currency));
        for (const obj of editLocationDetails.currency) {
          if (obj.selected == '1') {
            const preparData = obj;
            preparData['value'] = obj.id;
            setValue('currency', preparData);
          }
        }
      }

      if (editLocationDetails?.week_start?.length > 0) {
        setWorkingWeek(selectDatas(editLocationDetails?.week_start));
        for (const obj of editLocationDetails.week_start) {
          if (obj.selected == '1') {
            const preparData = obj;
            preparData['value'] = obj.id;
            setValue('weekstart', obj);
          }
        }
      }

      if (editLocationDetails?.working_week?.length > 0) {
        setDefaultworkingWeek(editLocationDetails.working_week);
      }

      if (editLocationDetails?.hour_id?.length > 0) {
        setHoursList(editLocationDetails?.hour_id);
      } else {
        setHoursList([]);
      }
      // ONLY FOR BUILDING END
    }
  };

  const removeLocation = () => {
    dispatch(showLoader());
    const data = {
      id: editLocationDetails?.id,
    };
    postData(LocationDeleteApi, data, (success, res) => {
      dispatch(hideLoader());
      closeRightSideSection();
      Toaster(res.data.code, res.data.message);
    });
  };

  const validateDefaultDayAndHours = list => {
    const ind = defaultworkingweek.findIndex(item => list.days == item.label);
    let show = false;
    if (ind >= 0) {
      if (defaultworkingweek[ind].selected == 0) {
        show = false;
      } else {
        show = true;
      }
    }
    return show;
  };

  return (
    <CreateOrEditLocationContext.Provider
      value={{
        locationNameTitle,
        selectedLocationObj,
        locationLevel,
        setParentLocationSelected,
        setValue,
        parentLocationSelectedName,
        setParentLocationSelectedName,
        setSelectedLocationObj,
        activesatate,
        setActiveState,
        setShowInactivePopup,
        untileDate,
        setUntileDate,
        counter,
        setCounter,
        setCharValidationMsg,
        charValidationMsg,
        setParentLocationSearchText,
        parentLocationSearchList,
        setParentLocationSearchList,
        setParentlocationTempData,
        parentLocationSearchText,
        parentSearchLoading,
        languageList,
        currencyList,
        hoursList,
        timeZoneList,
        weekstart,
        defaultworkingweek,
        setDefaultworkingWeek,
        validateDefaultDayAndHours,
        setHoursList,
        selectedmemberList,
        setSelectedMemberhList,
        handleSubmit,
        selectedmemberListBackup,
        parentLocationSelected,
        control,
        trigger,
        errors,
        parentLocationBackupSelected,
        closeRightSideSection,
        setShowDeletePopup,
        setShowParentChangePopup,
      }}
    >
      <Col
        span={6}
        className={`  left-right-space main-space-remove-left d-flex `}
      >
        <> {console.log('selectedLocationObj 473', selectedLocationObj)}</>
        <div className="card location-right-hight location-right-card w-100 p-0 ">
          <LocationSelect />
          {selectedLocationObj?.id ? (
            <div className="create-locationsets create-location-sets">
              <CreateOrEditLocationHeader />
              <LocationNameDescription />
              <ParentLocation />
              {selectedLocationObj?.id == 7 ? <BuildingFields /> : null}
              <ManagersDropdown />
              <CreateOrEditLocationFooter />
            </div>
          ) : null}
        </div>
        {showInactivePopup && (
          <InactiveConfirmModal
            changeStatus={flag => {
              setActiveState(flag);
              setShowInactivePopup(false);
            }}
          />
        )}
        {showParentChangePopup && (
          <ParentChangeConfirmModal
            cancel={() => {
              setParentlocationTempData({});
              setParentLocationSelectedName(parentLocationSelected.name);
              setParentLocationSearchText('');
              setValue('parentLocation', parentLocationSelected, {
                shouldValidate: true,
              });
              setShowParentChangePopup(false);
            }}
            confirm={() => {
              setParentLocationSelected(parentlocationTempData);
              setParentLocationSelectedName(parentlocationTempData.name);
              setParentLocationSearchText('');
              const datas = parentlocationTempData;
              datas['value'] = parentlocationTempData.id;
              datas['label'] = parentlocationTempData.name;
              setValue('parentLocation', datas, { shouldValidate: true });
              setShowParentChangePopup(false);
            }}
          />
        )}
        {showDeletePopup && (
          <DeleteLocationConfirmModal
            cancel={() => {
              setShowDeletePopup(false);
            }}
            confirm={() => {
              removeLocation();
              setShowDeletePopup(false);
            }}
          />
        )}
      </Col>
    </CreateOrEditLocationContext.Provider>
  );
};

export default CreateEditLocation;
