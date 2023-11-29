import React, { useEffect, useState } from 'react';
import { findLabelText } from '../../../components/commonMethod';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { ApiStatusCode } from '../../../components/userManagement/constant';
import { LeftAngle } from '../../../components/imagepath';
import { addAndUpdateUserDetailsNew, editInfo } from '../../../services/apiurl';
import { postData } from '../../../services/apicall';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../../../components/toast';
interface createUserFormProps {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
}

const BulkEditConfirm = ({
  setNewChanges,
  newChanges,
  handleClick,
  finalbulkuserlist,
  bulkEditDetails,
  setSelectedTab,
  locationOption,
  permission,
  teamlist,
  handslist,
  hrPermissionGroup,
  secondaryTeam,
  workspaceSearchList,
  roomSearchList,
  parkingSearchList,
  setDisableSave,
  removeTeamId,
  removePrimaryId,
  teamstatus,
  successData,
  SetFinalBulkUserList,
}: any) => {
  const [bulkUsers, setBulkUsers] = useState<any>([]);
  const [notificationList, setNotificationList] = useState<any>([]);
  const [personalDefaultsList, setpersonalDefaultList] = useState<any>([]);
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<createUserFormProps>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const handleClear = () => {
    handleClick();
    reset();
  };
  useEffect(() => {
    const userIds = finalbulkuserlist?.map(e => e?.id)?.toString();
    postData(editInfo, { user_ids: userIds }, (successRes, res) => {
      if (res?.data?.code == '200') {
        setBulkUsers(successRes?.List);
      }
    });
  }, [finalbulkuserlist]);
  const labelChanges = {
    first_name: 'First name',
    last_name: 'Last name',
    display_name: 'Display name',
    email: 'Email',
    location_id: 'Default Location',
    default_workspace: 'Default Workspace',
    default_room: 'Default Room',
    default_parking: 'Default Parking',
    start_working_hours: 'Default Start Hour',
    end_working_hours: 'Default End Hour',
    workspace_count: 'Workspaces',
    room_count: 'Rooms',
    parking_count: 'parking',
    min_office_days: 'Minimum days in office',
    permission_group_id: 'Permission Groups',
    hr_permission_group_id: 'HR Permission Groups',
    health_safety_id: 'Emergency Responders',
    checkin_push_alert: 'Check in alerts(Push)',
    checkin_email_alert: 'Check in alerts(Email)',
    booking_push_alert: 'Booking change alerts(Push)',
    booking_email_alert: 'Booking change alerts(Email)',
    primary_team_id: 'Primary Team',
    team_id: 'Secondary Team',
  };
  const existObj = {
    location_id: locationOption,
    default_workspace: workspaceSearchList,
    default_room: roomSearchList,
    default_parking: parkingSearchList,
    permission_group_id: permission,
    hr_permission_group_id: hrPermissionGroup,
    health_safety_id: handslist,
    primary_team_id: teamlist,
    team_id: secondaryTeam,
  };
  const onSubmit = e => {
    e.preventDefault();
    setDisableSave(true);
    const newPayload = {};
    bulkUsers?.forEach((each, index) => {
      let removeFilter;
      let changeTeam = '';
      if (each?.teams?.length > 0) {
        removeFilter = each?.teams?.filter(team => {
          return removeTeamId?.includes(team?.id);
        });
        if (removeFilter) {
          removeFilter = removeFilter?.map(each => each.id)?.toString();
        }
      }
      if (each?.primary_teams[0]?.id != teamstatus[0]?.id) {
        changeTeam = each?.primary_teams[0]?.id;
      }
      each.workspace_id = each?.default_workspace?.id;
      each.default_workspace = each?.default_workspace?.name;
      each.room_id = each?.default_room?.id;
      each.default_room = each?.default_room?.name;
      each.parking_id = each?.default_parking?.id;
      each.default_parking = each?.default_parking?.name;
      each.permission_id = each?.permission?.map(e => e?.id)?.toString();
      each.permission_group_id = each?.permission
        ?.map(e => e?.name)
        ?.toString();
      each.hr_permission_id = each?.hr_roles?.map(e => e?.group_id)?.toString();
      const hr_roles = [];
      existObj?.hr_permission_group_id?.forEach(role => {
        each?.hr_roles?.forEach(hr => {
          if (hr?.group_id == role?.id) {
            hr_roles?.push(role?.group_name);
          }
        });
      });
      each.hr_permission_group_id = hr_roles?.toString()
        ? hr_roles?.toString()
        : '';
      each.hands_id = each?.healy_safety?.map(e => e?.id)?.toString();
      each.health_safety_id = each?.healy_safety?.map(e => e?.name)?.toString();
      each.primary_id = each?.primary_teams?.map(e => e?.id)?.toString();
      each.primary_team_id = each?.primary_teams?.map(e => e?.name)?.toString();
      each.secondary_id = each?.teams?.map(e => e?.id)?.toString();
      each.team_id = each?.teams?.map(e => e?.name)?.toString();
      const is_changed_obj_exist: any = {};
      const is_changed_obj_new: any = {};
      Object.keys(newChanges)?.forEach(key => {
        if (newChanges[key] != each[key]) {
          const newLabel = labelChanges[key] ? labelChanges[key] : key;
          if (key == 'location_id') {
            const locationName = existObj[key]?.find(e => e?.value == each[key])
              ?.label;
            is_changed_obj_exist[newLabel] = locationName ? locationName : '';
            is_changed_obj_new[newLabel] = newChanges[key];
          } else {
            is_changed_obj_exist[newLabel] = existObj[key]?.find(
              e => e?.id == each[key],
            )?.name
              ? existObj[key]?.find(e => e?.id == each[key])?.name
              : each[key];
            is_changed_obj_new[newLabel] = newChanges[key];
          }
        }
      });
      const is_changed_value =
        Object.keys(is_changed_obj_exist)?.length > 0 ? 1 : 0;
      is_changed_obj_exist.is_changed_value = is_changed_value;
      newPayload[index] = {
        status: bulkEditDetails?.status
          ? bulkEditDetails?.status
          : each?.status,
        isBulkEdit: 1,
        user_id: each?.id,
        personal_defaults: {
          location_id: bulkEditDetails?.location_id
            ? bulkEditDetails?.location_id
            : each?.location_id,
          default_workspace: bulkEditDetails?.default_workspace
            ? bulkEditDetails?.default_workspace
            : each?.workspace_id,
          default_room: bulkEditDetails?.default_room
            ? bulkEditDetails?.default_room
            : each?.room_id,
          default_parking: bulkEditDetails?.default_parking
            ? bulkEditDetails?.default_parking
            : each?.parking_id,
          start_working_hour: bulkEditDetails?.start_working_hours
            ? bulkEditDetails?.start_working_hours
            : each?.start_working_hour,
          end_working_hour: bulkEditDetails?.end_working_hours
            ? bulkEditDetails?.end_working_hours
            : each?.end_working_hour,
        },
        personal_limits: {
          workspace_count: bulkEditDetails?.workspace_count
            ? bulkEditDetails?.workspace_count
            : each?.workspace_count,
          room_count: bulkEditDetails?.room_count
            ? bulkEditDetails?.room_count
            : each?.room_count,
          parking_count: bulkEditDetails?.parking_count
            ? bulkEditDetails?.parking_count
            : each?.parking_count,
          min_office_days: bulkEditDetails?.min_office_days
            ? bulkEditDetails?.min_office_days
            : each?.min_office_days
            ? each?.min_office_days
            : 0,
        },
        permission_groups: {
          permission_group_id: bulkEditDetails?.permission_group_id
            ? bulkEditDetails?.permission_group_id
            : each?.permission?.map(e => e?.id)?.toString(),
        },
        hr_permission_groups: {
          hr_permission_group_id: bulkEditDetails?.hr_permission_group_id
            ? bulkEditDetails?.hr_permission_group_id
            : each?.hr_roles?.map(e => e?.group_id)?.toString(),
        },
        emergency_responders: {
          health_safety_id: bulkEditDetails?.health_safety_id
            ? bulkEditDetails?.health_safety_id
            : each?.healy_safety?.map(e => e?.id)?.toString(),
        },
        notification_preferences: {
          checkin_push: bulkEditDetails?.checkin_push
            ? bulkEditDetails?.checkin_push
            : each?.checkin_push_alert,
          checkin_email: bulkEditDetails?.checkin_email
            ? bulkEditDetails?.checkin_push
            : each?.checkin_email_alert,
          bookingchange_push: bulkEditDetails?.bookingchange_push
            ? bulkEditDetails?.bookingchange_push
            : each?.booking_push_alert,
          bookingchange_email: bulkEditDetails?.bookingchange_email
            ? bulkEditDetails?.bookingchange_email
            : each?.booking_email_alert,
        },
        primary_team_id: bulkEditDetails?.primary_team_id
          ? bulkEditDetails?.primary_team_id
          : each?.primary_teams?.map(e => e?.id)?.toString(),
        team_id: bulkEditDetails?.team_id
          ? bulkEditDetails?.team_id
          : each?.teams?.map(e => e?.id)?.toString(),
        profile_photo: '',
        existing_fields: is_changed_value ? is_changed_obj_exist : {},
        new_datas: is_changed_value ? is_changed_obj_new : {},
        team_remove_id: removeFilter ? removeFilter : '',
        primary_team_remove_id: changeTeam?.toString(),
      };
    });
    dispatch(showLoader());
    postData(addAndUpdateUserDetailsNew, newPayload, (sucessRes, res) => {
      if (res.data.code == '200') {
        setNewChanges({});
        setBulkUsers([]);
        dispatch(hideLoader());

        Toaster(res.data.code, res.data.message);
        successData(sucessRes, 'bulk-edit');
        // SetFinalBulkUserList([])
        handleClear();
      } else {
        Toaster(res.data.code, res.data.message);
      }
    });
  };
  useEffect(() => {
    const notify: any = [];
    Object.keys(newChanges)?.forEach(each => {
      if (
        each == 'booking_email_alert' ||
        each == 'booking_push_alert' ||
        each == 'checkin_push_alert' ||
        each == 'checkin_email_alert'
      ) {
        notify.push(each);
      }
    });
    setNotificationList(notify);
  }, [
    newChanges?.booking_email_alert,
    newChanges?.booking_push_alert,
    newChanges?.checkin_push_alert,
    newChanges?.checkin_email_alert,
  ]);

  useEffect(() => {
    const defaults: any = [];
    Object.keys(newChanges)?.forEach(each => {
      if (
        each == 'default_workspace' ||
        each == 'default_room' ||
        each == 'default_parking' ||
        each == 'start_working_hour' ||
        each == 'end_working_hour' ||
        each == 'location_id'
      ) {
        defaults.push(newChanges[each]);
      }
    });
    setpersonalDefaultList(defaults);
  }, [
    newChanges?.default_workspace,
    newChanges?.default_room,
    newChanges?.default_parking,
    newChanges?.start_working_hour,
    newChanges?.end_working_hour,
    newChanges?.location_id,
  ]);
  const handleTab = () => {
    setSelectedTab('1');
  };
  return (
    <div className="create-locationsets create-scroll create-locationsets-inner create-locationsets-inner-info p-0">
      <div className="location-scroll location-scroll-inner-height">
        <div className="location-set pb-0" id="location-set">
          <div className="location-back-head">
            <div className="user-new-heading">
              <div className="user-back-arrow">
                <Link to="#" className="link-cancel" onClick={handleTab}>
                  <img src={LeftAngle} alt="img" />
                </Link>
              </div>
              <div className="user-heading-content">
                <h2>The Following Users:</h2>
              </div>
            </div>
          </div>
          <div className="user-select-grid">
            <div className="user-select-heading">
              <h4>
                Selected <span>({finalbulkuserlist?.length})</span>{' '}
              </h4>
            </div>
            <div className="user-select-info">
              {finalbulkuserlist?.length > 0 &&
                finalbulkuserlist?.map(user => {
                  return (
                    <div className="user-select-list" key={user?.id}>
                      <p>
                        {user?.display_name}{' '}
                        <span>{user?.primary_teams[0]?.name}</span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="user-bulk-grid">
          <div className="user-bulk-heading">
            <p>The following changes will be made to all selected users:</p>
          </div>
          {Object.keys(newChanges)?.map((key, index) => {
            if (key == 'primary_team_id') {
              return (
                <div
                  className="user-bulk-list"
                  key={`user-primary-list-${index}`}
                >
                  <h6>New primary team:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'team_id') {
              return (
                <div
                  className="user-bulk-list"
                  key={`user-secondary-list-${index}`}
                >
                  <h6>New Secondary Teams:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'hr_permission_group_id') {
              return (
                <div
                  className="user-bulk-list"
                  key={`user-hr-permission-list-${index}`}
                >
                  <h6>New Role:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'permission_group_id') {
              return (
                <div className="user-bulk-list" key={`user-bulk-list-${index}`}>
                  <h6>Permission group:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'status') {
              return (
                <div className="user-bulk-list" key={`user-status-${index}`}>
                  <h6>Active/ inactive:</h6>
                  <p>{newChanges[key] ? 'Active' : 'Inactive'}</p>
                </div>
              );
            }

            if (key == 'workspace_count') {
              return (
                <div
                  className="user-bulk-list"
                  key={`workspace-count-${index}`}
                >
                  <h6>Workspace Count:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'room_count') {
              return (
                <div className="user-bulk-list" key={`room-count-${index}`}>
                  <h6>Room Count:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'parking_count') {
              return (
                <div className="user-bulk-list" key={`parking-count-${index}`}>
                  <h6>Parking Count:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
            if (key == 'health_safety') {
              return (
                <div className="user-bulk-list" key={`healthy-safety-${index}`}>
                  <h6>Emergency responders:</h6>
                  <p>{newChanges[key]}</p>
                </div>
              );
            }
          })}

          {notificationList?.length > 0 && (
            <div className="user-bulk-list">
              <h6>Notifications:</h6>
              {notificationList?.map((notify, index) => {
                return <p key={index}>Active {notify}</p>;
              })}
            </div>
          )}

          {personalDefaultsList?.length > 0 && (
            <div className="user-bulk-list">
              <h6>Personal Defaults:</h6>
              {personalDefaultsList?.map((def, index) => {
                return <p key={index}>{def} </p>;
              })}
            </div>
          )}
        </div>

        <div className="user-footer">
          <div className="user-footer-btn">
            <Link to="#" className="btn link-cancel" onClick={handleClear}>
              {findLabelText('Cancel', 'Cancel', 'User_Management')}
            </Link>
            <Link className={`btn btn-primary`} to="#" onClick={onSubmit}>
              {findLabelText('Confirm', 'Confirm', 'Settings')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEditConfirm;
