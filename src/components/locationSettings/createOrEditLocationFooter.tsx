import React, { useContext } from 'react';
import {
  CreateOrEditLocationContext,
  LocationSettingsContext,
} from '../context/context';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import {
  GetUserMenuList,
  LocationSaveApi,
  LocationUpdateApi,
  UserTimezoneDetails,
} from '../../services/apiurl';
import { setDefaultweek } from '../../reduxStore/quickBookSlice';
import Toaster from '../toast';
import { Descriptions } from './constant';
import { Col, Row } from 'antd';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';
import { useNavigate } from 'react-router-dom';
import { dashboardUrl } from '../../assets/constants/pageurl';
import { RootReduxProps } from '../../reduxStore/reduxInterface';

const CreateOrEditLocationFooter = () => {
  const navigate = useNavigate();
  const { editLocationDetails, handleClose } = useContext(
    LocationSettingsContext,
  );
  const {
    handleSubmit,
    selectedmemberList,
    charValidationMsg,
    selectedmemberListBackup,
    defaultworkingweek,
    validateDefaultDayAndHours,
    hoursList,
    selectedLocationObj,
    parentLocationSelected,
    activesatate,
    untileDate,
    closeRightSideSection,
    parentLocationBackupSelected,
    setShowDeletePopup,
  } = useContext(CreateOrEditLocationContext);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);

  const onSubmit = data => {
    if (!charValidationMsg) {
      const selectMemList = selectedmemberList?.map(item => item?.user_id);
      const removeManagerId: any = [];
      if (selectedmemberListBackup?.length > 0) {
        const results = selectedmemberListBackup?.filter(
          ({ id: id1 }) =>
            !selectedmemberList?.some(({ id: id2 }) => id2 === id1),
        );
        if (results?.length > 0) {
          for (const res of results) {
            removeManagerId.push(res.id);
          }
        }
      }

      const workingWeek: any = [];
      for (const obj of defaultworkingweek) {
        if (obj.selected == '1') {
          workingWeek.push(obj.id);
        }
      }

      const newHoursList: any = [];
      for (let i = 0; i < hoursList?.length; i++) {
        if (!validateDefaultDayAndHours(hoursList[i])) {
          const prepardata = {
            id: hoursList[i].id,
            days: hoursList[i].days,
            start_time: '',
            end_time: '',
            selected: '0',
          };
          newHoursList.push(prepardata);
        } else {
          const prepardata = hoursList[i];
          prepardata['selected'] = '1';
          prepardata['start_time'] =
            prepardata.start_time == '' ? '07:00' : prepardata.start_time;
          prepardata['end_time'] =
            prepardata.end_time == '' ? '19:00' : prepardata.end_time;
          newHoursList.push(prepardata);
        }
      }

      const payLoad = {
        description: data.description,
        name: data.locationName,
        location_level: selectedLocationObj.id,
        parent_location: parentLocationSelected?.id
          ? parentLocationSelected?.id
          : '0',
        parent:
          parentLocationSelected?.id && parentLocationSelected?.parent_name
            ? parentLocationSelected?.parent_name
            : 'Global',
        status: activesatate ? '1' : '0',
      };

      if (!activesatate) {
        payLoad['status_date'] = untileDate
          ? moment(untileDate).format(dateFormat_YYYY_MM_DD)
          : '';
      }

      if (selectMemList.length > 0) {
        payLoad['manager_id'] = selectMemList.toString();
      }
      if (removeManagerId.length > 0) {
        payLoad['remove_manager_id'] = removeManagerId.toString();
      }

      if (editLocationDetails?.id) {
        payLoad['id'] = editLocationDetails?.id;
      }

      if (selectedLocationObj?.id == 7) {
        // Building
        if (data?.language?.id) {
          payLoad['default_language_id'] = data?.language?.id;
        }
        if (data?.timezone?.id) {
          payLoad['timezone_id'] = data?.timezone?.id;
        }
        if (data?.currency?.id) {
          payLoad['currency_id'] = data?.currency?.id;
        }
        if (data?.weekstart?.id) {
          payLoad['week_start'] = data?.weekstart?.id;
        }
        if (workingWeek.length > 0) {
          payLoad['working_week'] = workingWeek.toString();
        } else {
          payLoad['working_week'] = '';
        }
        payLoad['hour_id'] = newHoursList;
      }

      if (
        parentLocationSelected?.id == 0 ||
        parentLocationSelected?.id == parentLocationBackupSelected?.id
      ) {
        // do nothing
      } else {
        payLoad['parent_change'] = 'Yes';
      }

      const getUserMenuList = () => {
        postData(GetUserMenuList, {}, (data, res) => {
          const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
          userDetailCopy['menuList'] = data?.menuList;
          userDetailCopy['roles'] = data?.roles;
          userDetailCopy['permission_group_id'] = data?.permission_group_id;
          const locationSettings = data?.menuList?.find(each => {
            return each?.name === 'Location_settings';
          });
          if (!locationSettings) {
            navigate(dashboardUrl);
          }

          dispatch(setUserDetails(userDetailCopy));
        });
      };

      dispatch(showLoader());
      postData(
        editLocationDetails?.id ? LocationUpdateApi : LocationSaveApi,
        payLoad,
        (success, res) => {
          if (res?.data?.code == 200) {
            dispatch(setDefaultweek(workingWeek));
            closeRightSideSection();
            getUserMenuList();
            getTimeZoneDetails();
          }
          dispatch(hideLoader());
          Toaster(res?.data?.code, res?.data?.message);
        },
      );
    }
  };

  const getTimeZoneDetails = () => {
    const payload = { user_id: userDetails?.id };
    postData(UserTimezoneDetails, payload, (data, res) => {
      if (res?.data?.code == 200) {
        const userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
        userDetailsCopy['alias_name'] = data?.alias_name;
        userDetailsCopy['location'] = [data?.location];
        userDetailsCopy['timezone'] = data?.timezone;
        userDetailsCopy['timezone_id'] = data?.timezone_id;
        userDetailsCopy['default_workspace_timezone_id'] =
          data?.default_workspace_timezone_id;
        userDetailsCopy['default_workspace_timezone_name'] =
          data?.default_workspace_timezone_name;
        userDetailsCopy['default_workspace_timezone_alias_name'] =
          data?.default_workspace_timezone_alias_name;
        userDetailsCopy['default_room_timezone_id'] =
          data?.default_room_timezone_id;
        userDetailsCopy['default_room_timezone_name'] =
          data?.default_room_timezone_name;
        userDetailsCopy['default_room_timezone_alias_name'] =
          data?.default_room_timezone_alias_name;
        userDetailsCopy['default_parking_timezone_id'] =
          data?.default_parking_timezone_id;
        userDetailsCopy['default_parking_timezone_name'] =
          data?.default_parking_timezone_name;
        userDetailsCopy['default_parking_timezone_alias_name'] =
          data?.default_parking_timezone_alias_name;

        dispatch(setUserDetails(userDetailsCopy));
      }
    });
  };

  return (
    <Row>
      {editLocationDetails?.id ? (
        <Col lg={24} className="create-para-btn">
          <p>
            {findLabelText(
              'Description_for_remove_location',
              Descriptions.removeLocationDesc,
              'Location',
            )}
          </p>
          <Link
            to="#"
            onClick={() => {
              setShowDeletePopup(true);
            }}
            data-bs-toggle={editLocationDetails.is_delete == '0' ? '' : 'modal'}
            data-bs-target={
              editLocationDetails.is_delete == '0'
                ? ''
                : '#delete-location-modal'
            }
            className={
              editLocationDetails.is_delete == '0'
                ? 'btn btn-removlocation btn-removlocation-info disabled'
                : 'btn btn-removlocation btn-removlocation-info'
            }
          >
            {findLabelText(
              'Remove_location',
              'Remove location',
              'Common_Values',
            )}
          </Link>
        </Col>
      ) : null}

      <Col lg={24} className="location-btn-head location-save-btn-position">
        <Link
          className="btn btn-primary"
          to="#"
          onClick={handleSubmit(onSubmit)}
        >
          {editLocationDetails?.id
            ? findLabelText('Save_changes', 'Save Changes', 'Location')
            : findLabelText('Save', 'Save', 'Location')}
        </Link>
        <Link className="btn link-cancels" to="#" onClick={handleClose}>
          {findLabelText('Cancel', 'Cancel', 'Common_Values')}
        </Link>
      </Col>
    </Row>
  );
};

export default CreateOrEditLocationFooter;
