import React, { useContext, useEffect } from 'react';
import DefaultLanguage from './defaultLanguages';
import DefaultWorkspace from './defaultWorkspace';
import PreferredRoom from './defaultRoom';
import DefaultParking from './defaultParking';
import FormFooter from './footer';
import { postData } from '../../../services/apicall';
import { hrGetPreferencesList } from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { setPreferenceData } from '../../../reduxStore/hrSlice';
import { useSelector } from 'react-redux';
import VehicleRegistration from './vehicleRegistration';
import { PersonalContext } from '../personalController';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';
import Toaster from '../../toast';

const PreferenceManagement = () => {
  const dispatch = useDispatch();
  const { userID, scrollHeight } = useContext(PersonalContext);
  const { preferenceDetails } = useSelector((state: any) => state?.hr);

  useEffect(() => {
    getAllPreferenceDetails();
  }, []);

  const getAllPreferenceDetails = () => {
    dispatch(showLoader());
    postData(hrGetPreferencesList, { user_id: userID }, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setPreferenceData(data));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  return (
    <>
      {preferenceDetails?.length > 0 && (
        <>
          <div
            className="personal-info tab-scroll"
            style={{ height: scrollHeight }}
          >
            <DefaultLanguage />
            <DefaultWorkspace />
            <PreferredRoom />
            <DefaultParking />
            <VehicleRegistration />
          </div>
          <FormFooter />
        </>
      )}
    </>
  );
};

export default PreferenceManagement;
