import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropDownSelection from '../../selectfield/dropDownSelection';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { useSelector } from 'react-redux';
import {
  FloorType,
  PrefferedConfigurationLabel,
} from '../preferences/constants';
import { findLabelText } from '../../commonMethod';
import { bookLocation } from '../../imagepath';
import LocationSelectorComponent from '../../locationSelectorComponent';
import { postData } from '../../../services/apicall';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { hrGetAssestList, hrUpdateAssest } from '../../../services/apiurl';
import Toaster from '../../toast';
import { defaultPrefernceData } from '../preferences/schema';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const DefaultParking = ({ checkIsOpned }) => {
  const { Error, editData, EditComponent, getAllPreferenceDetail, userID } =
    useContext(PersonalContext);
  const { preferenceDetails, setUpdateApiFlag } = useSelector(
    (state: any) => state?.hr,
  );
  const dispatch = useDispatch();
  const locationState = useLocation();
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [defaultBuliding, setDefaultBuliding] = useState<any | undefined>(
    preferenceDetails?.[0]?.default_parking_building,
  );
  const [defaultFloor, setDefaultFloor] = useState<any | undefined>(
    preferenceDetails?.[0]?.default_parking_location,
  );
  const [floorId, setFloorId] = useState<any>(
    preferenceDetails?.[0]?.default_parking_location_id || '',
  );
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [assestList, setAssestList] = useState([]);
  const [updateFloor, setUpdateFloor] = useState(false);
  const selectRef = useRef<any>(null);
  const {
    setValue,
    control,
    trigger,
    getValues,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(defaultPrefernceData) });

  const handleLocationChange = data => {
    setUpdateFloor(true);
    setFloorId(data);
  };
  useEffect(() => {
    setFloorId(editData?.default_parking_location_id);
  }, [editData]);
  useEffect(() => {
    if (floorId && updateFloor) {
      const validateError = {
        shouldValidate: true,
      };
      setValue('workspace', {}, validateError);
      setAssestList([]);
      setUpdateFloor(false);
    }
  }, [floorId]);

  useEffect(() => {
    getAllParkingeDetails();
  }, [floorId, editData]);

  useEffect(() => {
    getFieldValue();
  }, []);

  useEffect(() => {
    updateData();
  }, [editData]);

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (
        dropdownRef?.current?.classList?.contains('d-block') &&
        !dropdownRef?.current?.contains(e.target) &&
        !selectRef.current.contains(e.target)
      ) {
        setLocationDropdown(false);
      }
    });
    return () => {
      window.removeEventListener('click', (e: any) => {
        if (
          dropdownRef?.current?.classList?.contains('d-block') &&
          !dropdownRef?.current?.contains(e.target) &&
          !selectRef.current.contains(e.target)
        ) {
          setLocationDropdown(false);
        }
      });
    };
  }, []);

  const getFieldValue = () => {
    const workSpaceValue = {
      label: preferenceDetails?.[0]?.default_parking_name,
      value: preferenceDetails?.[0]?.default_parking_name,
    };
    setValue('workspace', workSpaceValue);
  };

  const getAllParkingeDetails = () => {
    dispatch(showLoader());
    const payload = {
      location_id: floorId,
      floor_plan_type_id: FloorType.PARKING,
    };
    postData(hrGetAssestList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const array = [];
        data?.workspaceDetails?.forEach(dt => {
          const object = {
            label: dt?.name,
            value: dt?.name,
            id: dt?.workspace_id,
          };
          array.push(object);
        });

        setAssestList(array);
        dispatch(hideLoader());
      } 
    });
  };

  const updateData = () => {
    if (editData && Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      assestList?.find(
        ele =>
          ele.value == editData?.default_parking_name &&
          setValue('workspace', ele, validateError),
      );
    } else {
      resetData();
    }
  };

  const resetData = () => {
    setFloorId('');
    setValue('location', '');
    setValue('workspace', {});
  };

  const onEditSubmit = () => {
    const workspaceData = getValues('workspace');
    const payload = {
      location_id: parseInt(floorId),
      floor_plan_type_id: FloorType.PARKING,
      workspace_id: workspaceData?.id,
      user_id: userID,
    };
    dispatch(showLoader());
    postData(hrUpdateAssest, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
        getAllPreferenceDetail();
        checkIsOpned(false);
        resetData();
        setUpdateApiFlag(true);
        EditComponent('', {});
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const splitTet1 = () => {
    return (
      <div className="location-booking location-booking-info hr-location-info">
        <div className="booking-desk-details location-hierarchy">
          <h6>{defaultBuliding}</h6>
          <h6 className="ms-2">{defaultFloor}</h6>
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };

  return (
    <div
      className="tab-pane fade show active"
      id="preferred_tab"
      role="tabpanel"
      aria-labelledby="preferred-tab"
    >
      <div className="preferred-card-body">
        <div className="form-group tab-form-group preferred-location">
          <>
            <div
              className="change-quick-book-header location-change-header shadow-none mb-0 pb-0"
              onClick={() => setLocationDropdown(true)}
              ref={selectRef}
            >
              {splitTet1()}
            </div>
            <div
              className={`global-search-section global-search-section-info ${
                locationDropdown ? 'd-block' : 'd-none'
              }`}
              ref={dropdownRef}
            >
              <LocationSelectorComponent
                locationId={floorId || null}
                locationNames={defaultBuliding}
                setDefaultFloor={setDefaultFloor}
                setDefaultBuliding={setDefaultBuliding}
                handleLocationChange={handleLocationChange}
                floorId={locationState?.state?.search_location_id}
                setLocationDropdown={setLocationDropdown}
                setTimeZone={() => {
                  return;
                }}
              />
            </div>
          </>
          <Error>{errors?.['location']?.message}</Error>
        </div>

        <div className="form-group tab-form-group">
          <label>
            {findLabelText(
              'Default_Parking',
              PrefferedConfigurationLabel.DEFAULT_PARKING,
              'Hr',
            )}
          </label>
          <Controller
            name="workspace"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                options={assestList}
                minWidth="100px"
                height="35px"
                Value={value}
                backgroundColor="#FFF"
                onChange={value => {
                  onChange(value);
                  trigger('workspace');
                }}
                placeholder="Select Workspace"
              />
            )}
          />
          <Error>{errors?.['workspace']?.label?.message}</Error>
        </div>
        {preferenceDetails?.[0]?.default_parking_location_id && (
          <RemoveDiv
            name={PrefferedConfigurationLabel.DEFAULT_PARKING}
            payload={{
              location_id: floorId,
              floor_plan_type_id: FloorType.PARKING,
              workspace_id: 0,
              user_id: userID,
            }}
            api={hrUpdateAssest}
            checkIsOpned={checkIsOpned}
            resetData={resetData}
            list={getAllPreferenceDetail}
          />
        )}
      </div>
      <Footer
        handleSubmit={onEditSubmit}
        isDirty={isDirty}
        resetData={updateData}
        isValid={true}
        anyOneRequired={false}
        isPreference={Object.keys(errors).length == 0 ? false : true}
      />
    </div>
  );
};

export default DefaultParking;
