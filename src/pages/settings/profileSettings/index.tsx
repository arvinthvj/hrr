import React, { useEffect, useRef, useState } from 'react';
import { postData } from '../../../services/apicall';
import {
  EditProfile,
  UserDefaultAssetList,
  getProfileDatas,
  locationListApi,
} from '../../../services/apiurl';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  profileSettingImage,
  setUserDetails,
  showLoader,
} from '../../../reduxStore/appSlice';
import Toaster from '../../../components/toast';
import ProfileNameAndImage from '../../../components/settings/profile/profileNameAndImage';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import {
  ProfileContext,
  ProfileProps,
} from '../../../components/context/settingsContext';
import TeamDetail from '../../../components/settings/profile/teamDetail';
import AboutField from '../../../components/settings/profile/aboutField';
import VehicleRegistrationField from '../../../components/settings/profile/vehicleRegistrationField';
import LocationField from '../../../components/settings/profile/locationField';
import DefaultAssets from '../../../components/settings/profile/defaultAssets';
import DefaultWorkingHours from '../../../components/settings/profile/defaultWorkingHours';
import ContactDetail from '../../../components/settings/profile/contactDetail';
import UpcomingBookings from '../../../components/settings/profile/upcomingBookings';
import { Content } from 'antd/lib/layout/layout';
import { Col, Row } from 'antd';
import DateFormat from '../../../components/settings/profile/dateFormat';
import TimeFormat from '../../../components/settings/profile/timeFormat';

const initialAssetData = {
  workSpaces: [],
  filterWorkSpaces: [],
  Parking: [],
  filterParking: [],
  Rooms: [],
  filterRooms: [],
};

const ProfileSettings = () => {
  const [str, setStr] = useState<any>('');
  const assetRef = useRef<any>(null);
  const [assetListData, setAssetListData] = useState<any>(initialAssetData);
  // --------workspace------------------------------------------------
  const [asertWorkSpace, setAsertWorkSpace] = useState<any>({
    status: false,
    data: [],
    searchValue: '',
    searchStatus: false,
    workspaceFocusd: false,
  });
  // --------parking------------------------------------------------
  const [assetParking, setAssetParking] = useState<any>({
    status: false,
    data: [],
    searchValue: '',
    searchStatus: false,
    parkingFocusd: false,
  });
  // --------room------------------------------------------------
  const [assetRoom, setAssetRoom] = useState<any>({
    status: false,
    data: [],
    searchValue: '',
    searchStatus: false,
    RoomFocusd: false,
  });

  const { userDetails } = useSelector((state: any) => state.app);
  const [charValidationMsg, setCharValidationMsg] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [aboutError, setAboutError] = useState<any>('');
  const [about, updateAbout] = useState<any>({
    status: false,
    data: '',
    count: 0,
  });
  const [vehicle_regNum, setVehicle_regNum] = useState<any>({
    status: false,
    data: '',
  });
  const [location, updateLocation] = useState<any>({
    status: false,
    data: {},
    count: 0,
  });
  const [displayName, setDisplayName] = useState<any>({
    status: false,
    data: '',
    count: 0,
  });

  const [phoneNumber, setPhoneNumber] = useState<any>({
      status: false,
      data: '',
      count: 0,
    }),
    [locationOption, setLocationOption] = useState<any>([]),
    [profileData, setProfileData] = useState<any>([]),
    [didMount, setDidMount] = useState<boolean>(true),
    [loading, setLoading] = useState<boolean>(true),
    [mount, setMount] = useState<boolean>(false),
    [startTime, setStartTime] = useState<any>({
      data: userDetails?.start_working_hour
        ? userDetails?.start_working_hour
        : '07:00',
      count: 0,
    }),
    [endTime, setEndTime] = useState<any>({
      data: userDetails?.end_working_hour
        ? userDetails?.end_working_hour
        : '22:00',
      count: 0,
    });
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState<any>({
    status: false,
    data: '',
    count: 0,
  });
  const [email, setEmail] = useState<any>({
    status: false,
    data: '',
    count: 0,
  });
  useEffect(() => {
    setLoading(true);
    dispatch(showLoader());
    postData(locationListApi, '', locationList);
    postData(getProfileDatas, '', getProfileData);
    () => setMount(false);
  }, [mount]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (displayName.count % 2 == 0 && displayName.count !== 0) {
      if (displayName?.status) {
        updateProfileCall('name');
      }
    }
  }, [displayName.count, displayName.status]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (about.count % 2 == 0 && about.count !== 0) {
      if (about?.data?.length > 300) {
        updateAbout({
          ...about,
          status: !about.status,
          count: about.count + 1,
        });
      } else {
        updateProfileCall('about');
      }
    }
  }, [about.count]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (location.count % 2 == 0 && location.count !== 0) {
      if (location?.status) {
        updateProfileCall('location');
      }
    }
  }, [location.count, location.status]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (startTime.count !== 0) updateProfileCall('start');
  }, [startTime.count]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (endTime.count !== 0) updateProfileCall('end');
  }, [endTime.count]);

  useEffect(() => {
    if (didMount) {
      setDidMount(false);
      return;
    } else if (phoneNumber.count % 2 == 0 && phoneNumber.count !== 0) {
      if (phoneNumber.status) {
        updateProfileCall('phone');
      }
    }
  }, [phoneNumber.count, phoneNumber.status]);

  const updateProfileCall = type => {
    if (!charValidationMsg) {
      setLoading(true);
      dispatch(showLoader());
      const updateData = {};
      if (type == 'phone') {
        updateData['phone'] = phoneNumber.data;
        updateData['company_phone'] = companyPhoneNumber.data;
        updateData['company_email'] = email.data;
      }
      if (type == 'name') updateData['display_name'] = displayName.data;
      if (type == 'about') updateData['about'] = about.data;
      if (type == 'location')
        updateData['location_id'] =
          location?.data[0]?.value || userDetails?.location_id;
      if (type == 'start') updateData['start_working_hour'] = startTime.data;
      if (type == 'end') updateData['end_working_hour'] = endTime.data;
      postData(EditProfile, updateData, afterUpdate);
    }
  };
  const afterUpdate = (data, res) => {
    setAboutError('');
    setLoading(false);
    dispatch(hideLoader());
    Toaster(res?.data?.code, res?.data?.message);
    if (str === 'description') {
      updateAbout({
        ...about,
        status: false,
        count: 0,
      });
      setAboutError('');
    } else if (str === 'location') {
      updateLocation({
        ...location,
        status: false,
        count: 0,
      });
    } else if (str === 'contact') {
      setPhoneNumber({
        ...phoneNumber,
        status: false,
        count: 0,
      });
      setCompanyPhoneNumber({
        ...companyPhoneNumber,
        status: false,
        count: 0,
      });
      setEmail({
        ...email,
        status: false,
        count: 0,
      });
    } else if (str === 'name') {
      setDisplayName({
        ...displayName,
        status: false,
        count: 0,
      });
    }
    if (res?.data?.code == '200') {
      const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
      userDetailCopy.location = [data?.location];
      userDetailCopy.location_id = data?.location_id;
      userDetailCopy.start_working_hour = data?.start_working_hour;
      userDetailCopy.end_working_hour = data?.end_working_hour;
      userDetailCopy.timezone = data?.location?.timezone;
      userDetailCopy.timezone_id = data?.location?.timezone_id;
      dispatch(setUserDetails(userDetailCopy));
      setProfileData(data);
    }
    localStorage.setItem('updateUserDetails', JSON.stringify(data));
  };

  const getProfileData = (data, res) => {
    if (res?.data?.code == 200) {
      setProfileData(data);
      if (
        data?.default_workspace ||
        data?.default_parking ||
        data?.default_room
      ) {
        setAsertWorkSpace({
          ...asertWorkSpace,
          data: data?.default_workspace || [],
        });
        setAssetParking({
          ...assetParking,
          data: data?.default_parking || [],
        });
        setAssetRoom({ ...assetRoom, data: data?.default_room || [] });
      }
      setVehicle_regNum({ ...vehicle_regNum, data: data?.vehicle_register_no });
      dispatch(profileSettingImage(data?.profile_photo));
      setDisplayName({ ...displayName, data: data?.display_name });
      updateAbout({ ...about, data: data?.about });
      updateLocation({ ...location, data: [data?.location] });
      setPhoneNumber({ ...phoneNumber, data: data?.phone });
      setCompanyPhoneNumber({ ...phoneNumber, data: data?.company_phone });
      setEmail({ ...phoneNumber, data: data?.company_email });
      setStartTime({ ...startTime, data: data?.start_working_hour });
      setEndTime({ ...endTime, data: data?.end_working_hour });

      if (profileData.length > 0) {
        setTimeout(() => {
          dispatch(hideLoader());
        }, 2000);
      }
    } else {
      Toaster(res?.data?.code, res?.data?.message);
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  const locationList = data => {
    setLocationOption(data?.List.map(i => ({ name: i?.name, value: i?.id })));
    setTimeout(() => {
      setLoading(false);
      dispatch(hideLoader());
    }, 2000);
  };

  const settingAssetListData = () => {
    dispatch(showLoader());
    postData(UserDefaultAssetList, '', (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == '204') {
        setAsertWorkSpace({
          ...asertWorkSpace,
          data: [],
        });
        setAssetListData(prev => {
          return { ...prev, workSpaces: [] };
        });
        setAssetParking({
          ...assetParking,
          data: [],
        });
        setAssetListData(prev => {
          return { ...prev, Parking: [] };
        });
        setAssetRoom({
          ...assetRoom,
          data: [],
        });
        setAssetListData(prev => {
          return { ...prev, Rooms: [] };
        });
        return;
      }
      function valuesMap(id) {
        return data?.workspaceDetails
          ?.filter(item => item.floor_plan_type_id === id)
          .map(item => ({
            name: item.name,
            value: item.workspace_id,
            location_name: item.location_name,
            label: item.name,
          }));
      }
      data?.workspaceDetails?.length > 0 &&
        setAssetListData(prev => {
          return {
            ...prev,
            workSpaces: valuesMap(1),
          };
        });
      setAssetListData(prev => {
        return {
          ...prev,
          Rooms: valuesMap(2),
        };
      });
      setAssetListData(prev => {
        return {
          ...prev,
          Parking: valuesMap(3),
        };
      });
    });
  };
  useEffect(() => {
    settingAssetListData();
  }, []);
  const FillterdAssetList = (floor_plan_type_id, searchValue) => {
    setAssetListData(prev => {
      if (floor_plan_type_id == '1') {
        const Mapped: any = assetListData?.workSpaces;
        const filterd = Mapped?.filter(i => {
          return i?.name?.toLowerCase()?.includes(searchValue?.toLowerCase());
        });
        if (searchValue) {
          return {
            ...prev,
            filterWorkSpaces: filterd,
          };
        } else {
          return { ...prev, filterWorkSpaces: Mapped };
        }
      }
      if (floor_plan_type_id == '2') {
        const Mapped = assetListData?.Parking;
        const filterd = Mapped?.filter(i => {
          return i?.name?.toLowerCase()?.includes(searchValue?.toLowerCase());
        });
        if (searchValue) {
          return {
            ...prev,
            filterParking: filterd,
          };
        } else {
          return { ...prev, filterParking: Mapped };
        }
      }
      if (floor_plan_type_id == '3') {
        const Mapped = assetListData?.Rooms;
        const filterd = Mapped?.filter(i => {
          return i?.name?.toLowerCase()?.includes(searchValue?.toLowerCase());
        });
        if (searchValue) {
          return {
            ...prev,
            filterRooms: filterd,
          };
        } else {
          return { ...prev, filterRooms: Mapped };
        }
      }
    });
  };
  useEffect(() => {
    asertWorkSpace?.searchValue &&
      FillterdAssetList('1', asertWorkSpace?.searchValue);
    assetParking?.searchValue &&
      FillterdAssetList('2', assetParking?.searchValue);
    assetRoom?.searchValue && FillterdAssetList('3', assetRoom?.searchValue);
  }, [
    asertWorkSpace?.searchValue,
    assetParking?.searchValue,
    assetRoom?.searchValue,
  ]);
  const UpdateDefaultAssert = (id: any, AssertName) => {
    let AssetDefaultName = '';
    if (AssertName == 'Workspaces') {
      AssetDefaultName = 'default_workspace';
    }
    if (AssertName == 'Room') {
      AssetDefaultName = 'default_room';
    }
    if (AssertName == 'Parking') {
      AssetDefaultName = 'default_parking';
    }
    const payload = {
      [AssetDefaultName]: id?.value,
      type: 'Asset',
    };
    dispatch(showLoader());
    AssertName &&
      postData(EditProfile, payload, (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.code == 200) {
          Toaster(res?.data?.code, res?.data?.message);
          const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
          userDetailCopy.default_workspace_timezone_id =
            data?.default_workspace_timezone;
          userDetailCopy.default_room_timezone_id = data?.default_room_timezone;
          userDetailCopy.default_parking_timezone_id =
            data?.default_parking_timezone;

          userDetailCopy.default_workspace_timezone_name =
            data?.default_workspace?.[0]?.timezone;
          userDetailCopy.default_room_timezone_name =
            data?.default_room?.[0]?.timezone;
          userDetailCopy.default_parking_timezone_name =
            data?.default_parking?.[0]?.timezone;

          userDetailCopy.default_workspace_timezone_alias_name =
            data?.default_workspace?.[0]?.alias_name;
          userDetailCopy.default_room_timezone_alias_name =
            data?.default_room?.[0]?.alias_name;
          userDetailCopy.default_parking_timezone_alias_name =
            data?.default_parking?.[0]?.alias_name;
          dispatch(setUserDetails(userDetailCopy));

          if (AssertName == 'Workspaces') {
            setAsertWorkSpace({
              status: false,
              data: [
                {
                  name: id?.name,
                  id: id?.id || id?.value,
                  location_name: id?.location_name,
                  label: id?.name,
                },
              ],
              searchValue: '',
              searchStatus: false,
            });
          }
          if (AssertName == 'Room') {
            setAssetRoom({
              status: false,
              data: [
                {
                  name: id?.name,
                  id: id?.id || id?.value,
                  location_name: id?.location_name,
                  label: id?.name,
                },
              ],
              searchValue: '',
              searchStatus: false,
            });
          }
          if (AssertName == 'Parking') {
            setAssetParking({
              status: false,
              data: [
                {
                  name: id?.name,
                  id: id?.id || id?.value,
                  location_name: id?.location_name,
                  label: id?.name,
                },
              ],
              searchValue: '',
              searchStatus: false,
            });
          }
        }
      });
  };

  const resetAssetValues = () => {
    setAsertWorkSpace(prev => {
      return {
        ...prev,
        data: prev.data,
        status: false,
        searchStatus: false,
        searchValue: '',
        workspaceFocusd: false,
      };
    });
    setAssetParking(prev => {
      return {
        ...prev,
        data: prev.data,
        parkingFocusd: false,
        searchStatus: false,
        searchValue: '',
        status: false,
      };
    });
    setAssetRoom(prev => {
      return {
        ...prev,
        data: prev.data,
        RoomFocusd: false,
        searchStatus: false,
        searchValue: '',
        status: false,
      };
    });
  };

  // Click outside Assets handle function
  useEffect(() => {
    const handleClickOutside = event => {
      if (assetRef.current && !assetRef.current?.contains(event?.target)) {
        if (asertWorkSpace.status && event.target.className !== '') {
          resetAssetValues();
        } else if (assetParking.status && event.target.className !== '') {
          resetAssetValues();
        } else if (assetRoom.status && event.target.className !== '') {
          resetAssetValues();
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [asertWorkSpace.status, assetParking.status, assetRoom.status]);

  return (
    <ProfileContext.Provider
      value={{
        setMount,
        profileData,
        displayName,
        setDisplayName,
        updateAbout,
        about,
        aboutError,
        setAboutError,
        vehicle_regNum,
        setVehicle_regNum,
        setProfileData,
        location,
        updateLocation,
        locationOption,
        asertWorkSpace,
        setAsertWorkSpace,
        charValidationMsg,
        setCharValidationMsg,
        assetRef,
        assetListData,
        UpdateDefaultAssert,
        assetParking,
        setAssetParking,
        assetRoom,
        setAssetRoom,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        phoneNumber,
        setPhoneNumber,
        setStr,
        setCompanyPhoneNumber,
        companyPhoneNumber,
        email,
        setEmail,
      }}
    >
      <>
        <div className="main-wrapper">
          <div className="page-wrapper">
            <Content className="content">
              <Row>
                <SettingsHeaderTabs activeTab={'Profile'} />
                <Col span={18} className="main-space-remove">
                  <div className="view-profiles setting-views-profile card view-profiles-card-info">
                    <ProfileNameAndImage />
                    <Row>
                      <Col span={11}>
                        <div className="profile-about-grp">
                          <TeamDetail />
                          <AboutField />
                          <VehicleRegistrationField />
                          <LocationField />
                          <DateFormat />
                          <TimeFormat />
                        </div>
                      </Col>
                      <Col span={2} />
                      <Col span={11}>
                        <DefaultAssets />
                        <div className="profile-about-grp">
                          <DefaultWorkingHours />
                          <ContactDetail />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={6} className="main-space-remove-left d-flex">
                  {location && (
                    <UpcomingBookings
                      location={location}
                      setLoading={setLoading}
                    />
                  )}
                </Col>
              </Row>
            </Content>
          </div>
        </div>
      </>
    </ProfileContext.Provider>
  );
};

export default ProfileSettings;
