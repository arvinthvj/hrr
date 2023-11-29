import React from 'react';

export interface ProfileProps {
  setMount: CallableFunction;
  profileData: Object | any;
  displayName: Object | any;
  setDisplayName: CallableFunction;
  about: Object | any;
  updateAbout: CallableFunction;
  aboutError: string | any;
  setAboutError: CallableFunction;
  charValidationMsg: boolean | any;
  setCharValidationMsg: CallableFunction;
  setStr: CallableFunction;
  vehicle_regNum: Object | any;
  setVehicle_regNum: CallableFunction;
  setProfileData: CallableFunction;
  location: Object | any;
  updateLocation: CallableFunction;
  locationOption: Array<any>;
  asertWorkSpace: Object | any;
  setAsertWorkSpace: CallableFunction;
  assetRef: any | null;
  assetListData: Object | any;
  UpdateDefaultAssert: CallableFunction;
  assetParking: Object | any;
  setAssetParking: CallableFunction;
  assetRoom: Object | any;
  setAssetRoom: CallableFunction;
  startTime: Object | any;
  setStartTime: CallableFunction;
  endTime: Object | any;
  setEndTime: CallableFunction | any;
  phoneNumber: Object | any;
  setPhoneNumber: CallableFunction;
  companyPhoneNumber: Object | any;
  setCompanyPhoneNumber: CallableFunction;
  email: Object | any;
  setEmail: CallableFunction;
}
export const ProfileContext = React.createContext<ProfileProps>({
  setMount: () => {},
  profileData: [],
  displayName: {},
  setDisplayName: () => {},
  about: {},
  updateAbout: () => {},
  aboutError: '',
  setAboutError: () => {},
  charValidationMsg: false,
  setCharValidationMsg: () => {},
  setStr: () => {},
  vehicle_regNum: {},
  setVehicle_regNum: () => {},
  setProfileData: () => {},
  location: {},
  updateLocation: () => {},
  locationOption: [],
  asertWorkSpace: {},
  setAsertWorkSpace: () => {},
  assetRef: null,
  assetListData: {},
  UpdateDefaultAssert: () => {},
  assetParking: {},
  setAssetParking: () => {},
  assetRoom: {},
  setAssetRoom: () => {},
  startTime: {},
  setStartTime: () => {},
  endTime: {},
  setEndTime: () => {},
  phoneNumber: {},
  setPhoneNumber: () => {},
  companyPhoneNumber: {},
  setCompanyPhoneNumber: () => {},
  email: {},
  setEmail: () => {},
});
