import React, { useContext, useEffect, useRef } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { postData } from '../../../services/apicall';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import { Link } from 'react-router-dom';
import { EditProfile } from '../../../services/apiurl';
import { ButtonNames, ProfileFieldLabels, TabNames } from '../constant';

const VehicleRegistrationField = () => {
  const { vehicle_regNum, setVehicle_regNum, profileData, setProfileData } =
    useContext(ProfileContext);
  const vehicleRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: any) => state.app);
  const VehicleNumUpdate = status => {
    const payload = {
      vehicle_register_no: vehicle_regNum?.data,
    };
    if (status) {
      dispatch(showLoader());
      postData(EditProfile, payload, (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.code == 200) {
          setProfileData(data);
          const obj = {
            ...userDetails,
            vehicle_register_no: data?.vehicle_register_no
              ? data?.vehicle_register_no
              : '',
          };
          dispatch(setUserDetails(obj));
        }
        Toaster(res?.data?.code, res?.data?.message);
      });
    }
  };
  useEffect(() => {
    const handleClickOutside = event => {
      if (vehicleRef.current && !vehicleRef.current?.contains(event?.target)) {
        if (vehicle_regNum.status) {
          setVehicle_regNum({
            data: profileData?.vehicle_register_no,
            status: false,
          });
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileData?.vehicle_register_no, vehicle_regNum.status]);
  return (
    <div className="about-view edit-about edit-about-input" ref={vehicleRef}>
      <h3>
        {findLabelText(
          'Vehicle_Registration',
          ProfileFieldLabels.vehicleRegistration,
          TabNames.settings,
        )}
        <Link
          to="#"
          className="leave-edit-about"
          onClick={() => {
            VehicleNumUpdate(vehicle_regNum?.status);
            setVehicle_regNum({
              ...vehicle_regNum,
              status: !vehicle_regNum?.status,
            });
          }}
        >
          {vehicle_regNum?.status
            ? findLabelText('Save', ButtonNames.SAVE, TabNames.settings)
            : findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
        </Link>
      </h3>

      <input
        type="text"
        title="Maximum 10 characters allowed."
        className="form-control text-about"
        value={vehicle_regNum?.data ? vehicle_regNum?.data : ''}
        maxLength={10}
        disabled={!vehicle_regNum?.status}
        onChange={e => {
          setVehicle_regNum({
            ...vehicle_regNum,
            data: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default VehicleRegistrationField;
