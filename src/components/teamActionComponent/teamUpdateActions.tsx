import React, { useEffect, useState } from 'react';
import SelectTap from './selectTap';
import { useDispatch, useSelector } from 'react-redux';
import TeamAction from './teamAction';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../pages/TeamManagement/schema';
import { DropdownValues } from '../dropDownSearchComponent/DropDownSearch';
import TeamUpdateDetails from './teamUpdateDetails';
import { Link, useNavigate } from 'react-router-dom';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import { ApiUrl, GetUserMenuList } from '../../services/apiurl';
import Toaster from '../toast';
import { TeamSettingLabelText } from '../teamSettingComponent/constants';
import { findLabelText } from '../commonMethod';
import { Col, Row } from 'antd';
import { LeftAngle, Search, plus2 } from '../imagepath';
import DropDownOptions from '../dropDown/dropdownOptions';
import Loader from '../loader';
import SelectField from '../selectfield/select';
import { dashboardUrl } from '../../assets/constants/pageurl';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
// import { DeleteConfirmationModal } from '../deleteConfirmationModal/DeleteConfirmationModal';
import History from './history';
import { ConfirmationModal } from './confirmationModel';
interface TeamUpdateActionsProps {
  teamName: string;
  parentName?: string;
}
const TeamUpdateActions = ({
  disableSave,
  setDisableSave,
  createTeamFlag,
  selectedTab,
  teamEditDetails,
  setSelectedTab,
  updateCreateTeamFlag,
  setTeamEditDetails,
  clearData,
  setUserSearchText,
  setUserSearchList,
  updateTeamUsers,
  activeFlag,
  changeActiveFlag,
  selectedUserSearchList,
  leafFlag,
  changeLeafFlag,
  teamList,
  setTeamList,
  selectedWorkspace,
  selectedRoom,
  selectedParking,
  setSelectedMembers,
  userSearchList,
  setSelectedWorkspace,
  setSelectedRoom,
  setSelectedParking,
  selectedMenbers,
  teamcheck,
  noResultText,
  userSearchText,
  changeUserSearchText,
  userSearchLoading,
  getRemovedId,
  // getMembersRemoveId,
  activeOnlyFlag,
  backupSelectedMembers,
  primaryUserList,
  setNewChanges,
  newChanges,
  setSelectedUserSearchList,
  warning,
  setWarning,
  warningContent,
  setWarningContent,
  setActive,
  removeTeamHandler,
  handleRemoveTeamDetail,
  leafTeamDisable,
  setLeafTeamDisable,
  setLeaf,
  selectedUserSearchBackup,
  editTeamInfo,
  setEditTeamInfo,
  setBackupSelectedMembers,
  setSelectedWorkspaceBackup,
  setSelectedRoomBackup,
  setSelectedParkingBackup,
  setSelectedUserSearchBackup,
  setHaveChilds,
  haveChilds,
  parentTeamList,
  setParentTeamList,
  isDelete,
  setListLoad,
  listLoad,
  newTeamCreate,
}) => {
  const {
    handleSubmit,
    control,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TeamUpdateActionsProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      teamName: '',
    },
  });
  interface LanguageProps {
    language: {
      languages: {
        Team_Management: any;
        Common_Values: any;
        Dashboard: any;
        Location: any;
      };
    };
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hideHistory, setHideHistory] = useState<boolean>(false);
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const [labelChanges, setLabelChanges] = useState<any>({
    name: 'Team Name',
    status: 'Status',
    is_leaf_team: 'LeafStatus',
    parent_team: 'Parent Team',
    manager_id: 'Managers',
    member_details: 'Team Members',
    workspace_id: 'Workspaces',
    room_id: 'Rooms',
    parking_id: 'Parking',
  });
  const [resetuser, setResetUser] = useState({
    teamName: '',
    ParentName: '',
  });
  const [dummyParentList, setDummyParentList] = useState<any>([
    {
      id: 0,
      name: 'None',
      value: 0,
      label: 'None',
    },
  ]);
  const firstNameCapital = name => {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      return '-';
    }
  };

  useEffect(() => {
    if (userDetails?.roles?.length > 0) {
      const data = userDetails?.roles?.filter(el => {
        return el.slug === 'administrator';
      });
      setHideHistory(data?.length > 0 ? false : true);
    }
  }, []);

  useEffect(() => {
    setDisableSave(true);
    if (editTeamInfo?.id) {
      listParentTeams();
      setValue('teamName', editTeamInfo?.name);
      if (editTeamInfo?.parent_team?.id) {
        const dataChange = parentTeamDataChange([editTeamInfo?.parent_team]);
        setValue('parentName', dataChange[0]);
      } else {
        setValue('parentName', dummyParentList[0]);
      }
    } else {
      setValue('teamName', '');
      setValue('parentName', dummyParentList[0]);
    }
  }, [editTeamInfo]);

  const getIds = list => {
    const ids: any = [];
    if (list.length > 0) {
      for (const obj of list) {
        ids.push(obj?.id);
      }
    }
    return ids;
  };
  const getNames = list => {
    const names: any = [];
    if (Array.isArray(list)) {
      if (list.length > 0) {
        for (const obj of list) {
          names.push(obj?.name);
        }
      }
      return names;
    } else if (typeof list == 'object') {
      names.push(list?.name);
      return names;
    } else {
      return list;
    }
  };

  const compareArrays = (array1, array2) => {
    return array1?.filter(
      ({ id: id1 }) => !array2?.some(({ id: id2 }) => id2 === id1),
    );
  };

  const createOrUpdateTeam = formData => {
    setDisableSave(true);
    dispatch(showLoader());
    const removeIds = compareArrays(backupSelectedMembers, selectedMenbers);
    const teamMembersRemoveId = compareArrays(
      selectedUserSearchBackup,
      selectedUserSearchList,
    );
    const payload: any = {
      '0': {
        status: activeFlag ? 1 : 0,
        leaf_team: leafFlag ? 1 : 0,
        team_details: {
          name: formData?.teamName,
          parent_team_id: formData?.parentName?.id,
          manager_id: getIds(selectedMenbers)?.toString(),
        },
        removed_manager_id:
          getIds(removeIds)?.length > 0 ? getIds(removeIds).toString() : '',
        asset_edit_status: getRemovedId() == '' ? false : true,
        removed_asset_id: getRemovedId(),
        team_member_removed_id:
          getIds(teamMembersRemoveId)?.length > 0
            ? getIds(teamMembersRemoveId).toString()
            : '',
        workspace_id: getIds(selectedWorkspace)?.toString(),
        parking_id: getIds(selectedParking)?.toString(),
        room_id: getIds(selectedRoom)?.toString(),
        team_member_id: getIds(selectedUserSearchList)?.toString(),
      },
    };
    const url = ApiUrl.addTeamDetails;
    if (editTeamInfo?.id) {
      payload['0'].team_id = editTeamInfo?.id;
      const existing: any = {};
      const newObj: any = {};
      let is_changed = false;
      Object.keys(newChanges)?.forEach(key => {
        if (
          JSON.stringify(newChanges[key]) != JSON.stringify(editTeamInfo[key])
        ) {
          is_changed = true;
          const label = labelChanges[key];
          if (key == 'status') {
            existing[label] = editTeamInfo[key] == 0 ? 'Inactive' : 'Active';
            newObj[label] = newChanges[key] == 0 ? 'Inactive' : 'Active';
          } else if (key == 'is_leaf_team') {
            existing[label] = editTeamInfo[key] == 0 ? 'No' : 'Yes';
            newObj[label] = newChanges[key] == 0 ? 'No' : 'Yes';
          } else {
            existing[label] = getNames(editTeamInfo[key])?.toString();
            newObj[label] = getNames(newChanges[key])?.toString();
          }
        }
      });
      if (editTeamInfo?.name != formData?.teamName) {
        is_changed = true;
        existing.name = editTeamInfo?.name;
        newObj.name = formData?.teamName;
      }
      if (is_changed) {
        payload['0'].existing_fields = { ...existing, is_changed_value: 1 };
        payload['0'].new_datas = newObj;
      }
    }
    postData(url, payload, (successRes, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        setListLoad(true);
        Toaster(res?.data?.code, res?.data?.message);
        getUserMenuList();
        reset();
        clearData();
      } else {
        Toaster(res?.code, res?.message);
      }
    });
  };

  const getUserMenuList = () => {
    postData(GetUserMenuList, {}, (data, res) => {
      const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
      userDetailCopy['menuList'] = data?.menuList;
      userDetailCopy['roles'] = data?.roles;
      userDetailCopy['permission_group_id'] = data?.permission_group_id;
      const teamSettings = data?.menuList?.find(each => {
        return each?.name === 'Team_settings';
      });
      if (!teamSettings) {
        navigate(dashboardUrl);
      }

      dispatch(setUserDetails(userDetailCopy));
    });
  };

  const formKeys = {
    teamName: 'teamName',
    parentName: 'parentName',
  };

  const parentTeamDataChange = data => {
    const dataChange = data?.map((each: any) => {
      each.value = each?.id;
      each.label = each?.name;
      return each;
    });
    return dataChange;
  };

  useEffect(() => {
    if (newTeamCreate) {
      listParentTeams();
    }
  }, [newTeamCreate]);

  // useEffect(()=>{
  //   if(editTeamInfo?.parent_team?.id){
  //     listParentTeams();
  //     setParentTeamList([...parentTeamList, ])
  //   }
  // },[editTeamInfo?.id])

  const listParentTeams = () => {
    const payload = {
      team_id: editTeamInfo?.id ? editTeamInfo?.id : '',
      parent_team_id: editTeamInfo?.parent_team?.id
        ? editTeamInfo?.parent_team?.id
        : 0,
      status: editTeamInfo?.status ? editTeamInfo?.status : '',
    };
    postData(ApiUrl.getParentTeam, payload, (data, res) => {
      if (res?.data?.code == '200') {
        const dataChange = parentTeamDataChange(data);
        if (editTeamInfo?.id) {
          setParentTeamList([...dataChange]);
        } else {
          setValue('parentName', dataChange[0]);
          setParentTeamList([...dataChange]);
        }
      }
    });
  };
  const manuallyAddOrUpdateTeamList = saveDetails => {
    const list = JSON.parse(JSON.stringify(teamList));
    const checkData = list.findIndex(val => val.id == saveDetails.id);
    if (checkData >= 0) {
      list.splice(checkData, 1, saveDetails);
    } else {
      list.unshift(saveDetails);
    }
    setTeamList([...list]);
  };
  const handleClick = () => {
    setDisableSave(true);
    clearErrors();
    updateCreateTeamFlag(true);
    setTeamEditDetails(null);
    clearData(true, true);
    setValue('teamName', '');
    setValue('parentName', dummyParentList[0]);
  };
  const removeTeam = teamId => {
    dispatch(showLoader());
    postData(
      ApiUrl.deleteTeamDetails,
      { team_id: teamId },
      (successRes, res) => {
        dispatch(hideLoader());
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200) {
          clearData();
          manuallyDeleteTeamList(teamId);
        }
      },
    );
  };
  const manuallyDeleteTeamList = deleteID => {
    const list = JSON.parse(JSON.stringify(teamList));
    const checkData = list.findIndex(val => val.id == deleteID);
    if (checkData >= 0) {
      list.splice(checkData, 1);
    } else {
    }
    setTeamList([...list]);
  };
  return (
    <>
      {createTeamFlag ? (
        <div
          className={
            'col-lg-3 col-sm-12 main-space-remove-left locate-inner-card d-flex'
          }
        >
          <div className="card w-100 p-0">
            <div className="tab-content" id="nav-tabContents">
              <div
                className="tab-pane fade show active"
                id="nav-settings"
                role="tabpanel"
                aria-labelledby="nav-settings-tab"
              >
                <SelectTap
                  hideHistory={hideHistory}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  editTeamInfo={editTeamInfo}
                  teamEditDetails={teamEditDetails}
                  leafFlag={leafFlag}
                />
                <div className="location-set pt-0">
                  <div className="location-back-head mb-0">
                    <div className="user-new-heading">
                      <div className="user-back-arrow">
                        <Link
                          to="#"
                          className="link-cancel"
                          onClick={handleClick}
                        >
                          <img src={LeftAngle} alt="img" />
                        </Link>
                      </div>
                      {editTeamInfo?.id ? (
                        <div className="user-heading-content">
                          <h2>
                            {editTeamInfo?.name
                              ? firstNameCapital(editTeamInfo?.name)
                              : ''}
                          </h2>
                          {selectedTab == '1' ? (
                            <p>Settings</p>
                          ) : selectedTab == '2' ? (
                            <p>Members</p>
                          ) : (
                            !hideHistory && <p>History</p>
                          )}
                        </div>
                      ) : (
                        <div className="user-heading-content">
                          {selectedTab == '1' ? (
                            <h2>Settings</h2>
                          ) : selectedTab == '2' ? (
                            <h2>Members</h2>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-locationsets create-location-sets user-location-inner">
                {selectedTab == '1' ? (
                  <>
                    <div className="table-headercheck table-header-check-info">
                      <div className="checkbox-set">
                        <label className="check team-disable-check">
                          {findLabelText(
                            TeamSettingLabelText.Active,
                            TeamSettingLabelText.Active,
                            TeamSettingLabelText.Team_Management,
                          )}
                          <input
                            type="checkbox"
                            checked={activeFlag}
                            onChange={changeActiveFlag}
                          />
                          <span className="checkmark team-create-checkmark" />
                        </label>
                        <label className="check team-disable-check">
                          {findLabelText(
                            'Leaf team',
                            'Leaf team',
                            TeamSettingLabelText.Team_Management,
                          )}
                          <input
                            type="checkbox"
                            checked={leafFlag}
                            onChange={changeLeafFlag}
                            disabled={leafTeamDisable}
                          />
                          <span
                            className={`checkmark team-create-checkmark ${
                              editTeamInfo?.id
                                ? leafTeamDisable
                                  ? leafFlag
                                    ? 'team-disable-check'
                                    : 'team-disable-uncheck'
                                  : ''
                                : ''
                            }`}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="user-personal-inner">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name" className="text-black">
                              {languages?.Common_Values
                                ? languages?.Common_Values?.Team_name?.name
                                : 'Team name'}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <Controller
                              name="teamName"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <input
                                    value={value}
                                    type="text"
                                    maxLength={51}
                                    placeholder=""
                                    readOnly={teamcheck ? true : false}
                                    className="bg-white"
                                    onChange={val => {
                                      onChange(val);
                                      trigger('teamName');
                                      setDisableSave(false);
                                    }}
                                  />
                                </>
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                      {errors?.teamName?.message ? (
                        <label className="error-message-text-style">
                          {errors?.teamName?.message}
                        </label>
                      ) : null}
                    </div>

                    <div className="user-personal-inner user-personal-parent">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name" className="text-black">
                              Parent team
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search user-personal-search-select">
                            <Controller
                              name="parentName"
                              control={control}
                              render={({ field: { value, onChange } }: any) => {
                                return (
                                  <>
                                    <SelectField
                                      bgColor={'#FFFFFF'}
                                      value={parentTeamList?.filter(
                                        (option: any) => {
                                          return option?.id == value?.id;
                                        },
                                      )}
                                      options={parentTeamList}
                                      height={'35px'}
                                      onChangeValue={val => {
                                        onChange(val);
                                        trigger('parentName');
                                        setNewChanges({
                                          ...newChanges,
                                          parent_team: val,
                                        });
                                        setDisableSave(false);
                                      }}
                                      placeholder="None"
                                    />
                                  </>
                                );
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      {errors?.parentName?.message ? (
                        <label className="error-message-text-style">
                          {errors?.parentName?.message}
                        </label>
                      ) : null}
                    </div>
                    <div className={`user-personal-inner`}>
                      <DropdownValues
                        name={findLabelText(
                          TeamSettingLabelText.Managers,
                          TeamSettingLabelText.Managers,
                          TeamSettingLabelText.Team_Management,
                        )}
                        type="member"
                        searchIcon="search"
                        deleteIcon="deleteIcon"
                        selectedValue={selectedMenbers}
                        updateValue={val => {
                          setSelectedMembers(val);
                          setNewChanges({ ...newChanges, manager_id: val });
                          setDisableSave(false);
                        }}
                      />
                    </div>
                    <div
                      className={`user-personal-inner ${
                        leafFlag ? '' : 'team-disable-collapse'
                      }`}
                    >
                      <DropdownValues
                        name={findLabelText(
                          TeamSettingLabelText.Assigned_workspaces,
                          TeamSettingLabelText.Assigned_workspaces,
                          TeamSettingLabelText.Team_Management,
                        )}
                        type="workspace"
                        searchIcon="search"
                        deleteIcon="deleteIcon"
                        isDisableDropdown={leafFlag ? false : true}
                        leafFlag={leafFlag}
                        isShowDelete={false}
                        selectedValue={selectedWorkspace}
                        updateValue={val => {
                          setSelectedWorkspace(val);
                          setNewChanges({ ...newChanges, workspace_id: val });
                          setDisableSave(false);
                        }}
                      />
                    </div>
                    <div
                      className={`user-personal-inner ${
                        leafFlag ? '' : 'team-disable-collapse'
                      }`}
                    >
                      <DropdownValues
                        name={findLabelText(
                          TeamSettingLabelText.Assigned_rooms,
                          TeamSettingLabelText.Assigned_rooms,
                          TeamSettingLabelText.Team_Management,
                        )}
                        type="room"
                        searchIcon="search"
                        deleteIcon="deleteIcon"
                        isShowDelete={false}
                        isDisableDropdown={leafFlag ? false : true}
                        leafFlag={leafFlag}
                        selectedValue={selectedRoom}
                        updateValue={val => {
                          setSelectedRoom(val);
                          setNewChanges({ ...newChanges, room_id: val });
                          setDisableSave(false);
                        }}
                      />
                    </div>
                    <div
                      className={`user-personal-inner ${
                        leafFlag ? '' : 'team-disable-collapse'
                      }`}
                    >
                      <DropdownValues
                        name={findLabelText(
                          TeamSettingLabelText.Assigned_parking,
                          TeamSettingLabelText.Assigned_parking,
                          TeamSettingLabelText.Team_Management,
                        )}
                        type="parking"
                        searchIcon="search"
                        deleteIcon="deleteIcon"
                        isShowDelete={false}
                        isDisableDropdown={leafFlag ? false : true}
                        leafFlag={leafFlag}
                        selectedValue={selectedParking}
                        updateValue={val => {
                          setSelectedParking(val);
                          setNewChanges({ ...newChanges, parking_id: val });
                          setDisableSave(false);
                        }}
                      />
                    </div>
                    {selectedTab == '1' && editTeamInfo?.id ? (
                      !isDelete ? (
                        <div className="remove-team remove-disable">
                          <div className="remove-team-content">
                            <p>Remove team</p>
                            <span>
                              A team cannot be removed if it has active/inactive
                              leaf teams, assigned assets, or users.
                            </span>
                          </div>
                          <Link
                            to="#"
                            className="btn"
                            onClick={removeTeamHandler}
                          >
                            <i className="far fa-trash-can"></i>
                          </Link>
                        </div>
                      ) : (
                        <div className="remove-team">
                          <p>Remove team</p>
                          <Link
                            to="#"
                            className="btn"
                            onClick={removeTeamHandler}
                          >
                            <i className="far fa-trash-can"></i>
                          </Link>
                        </div>
                      )
                    ) : null}
                  </>
                ) : selectedTab == '2' ? (
                  <>
                    <div className="user-personal-inner">
                      <Row className="align-items-center">
                        <Col xl={8} lg={8} md={24} span={24}>
                          <div className="user-personal-label">
                            <label htmlFor="name">
                              {findLabelText(
                                TeamSettingLabelText.Add_users,
                                TeamSettingLabelText.AddUsers,
                                TeamSettingLabelText.Team_Management,
                              )}
                            </label>
                          </div>
                        </Col>
                        <Col xl={16} lg={16} md={24} span={24}>
                          <div className="user-personal-search">
                            <div className="user-personal-input">
                              <input
                                onChange={changeUserSearchText}
                                value={userSearchText}
                                type="text"
                                placeholder={findLabelText(
                                  TeamSettingLabelText.Find,
                                  TeamSettingLabelText.Find,
                                  TeamSettingLabelText.Team_Management,
                                )}
                                className="input-filter bg-white input-filter-locations"
                              />
                              <div className="user-personal-search-icon">
                                <Link to="#">
                                  <img src={Search} alt="img" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {userSearchText && userSearchList.length > 0 ? (
                        <DropDownOptions
                          type="member"
                          options={userSearchList}
                          onChange={opt => {
                            const checkData = selectedUserSearchList.find(
                              val => val.id == opt.id,
                            );
                            if (checkData == undefined) {
                              setUserSearchText('');
                              setUserSearchList([]);
                              setSelectedUserSearchList([
                                ...selectedUserSearchList,
                                opt,
                              ]);
                              setNewChanges({
                                ...newChanges,
                                member_details: [
                                  ...selectedUserSearchList,
                                  opt,
                                ],
                              });
                              setDisableSave(false);
                              // updateTeamUsers({}, -1, opt, "add");
                            }
                          }}
                        />
                      ) : userSearchLoading ? (
                        <Loader height={'30'} width={'30'} />
                      ) : (
                        <p className="no-result-text p-0">{noResultText}</p>
                      )}
                    </div>

                    <TeamUpdateDetails
                      setSelectedUserSearchList={setSelectedUserSearchList}
                      selectedUserSearchList={selectedUserSearchList}
                      updateTeamUsers={updateTeamUsers}
                      primaryUserList={primaryUserList}
                      setNewChanges={setNewChanges}
                      setDisableSave={setDisableSave}
                      newChanges={newChanges}
                    />
                  </>
                ) : selectedTab == '3' ? (
                  <History teamId={editTeamInfo?.id} />
                ) : // <>History</>
                null}
              </div>

              <TeamAction
                disableSave={disableSave}
                selectedTab={selectedTab}
                handleClick={handleClick}
                setUserSearchText={setUserSearchText}
                setUserSearchList={setUserSearchList}
                updateTeamUsers={updateTeamUsers}
                handleSubmit={handleSubmit}
                createOrUpdateTeam={createOrUpdateTeam}
                teamEditDetails={teamEditDetails}
                noResultText={noResultText}
                userSearchList={userSearchList}
                userSearchText={userSearchText}
                changeUserSearchText={changeUserSearchText}
                selectedUserSearchList={selectedUserSearchList}
                userSearchLoading={userSearchLoading}
              />
            </div>
          </div>
        </div>
      ) : null}
      {warning != '' && editTeamInfo?.id && (
        <div>
          <ConfirmationModal
            cancel={() => {
              setWarning('');
            }}
            confirm={() => {
              warning == 'INACTIVE'
                ? (setActive(false),
                  setNewChanges({ ...newChanges, status: 0 }))
                : warning == 'DELETE'
                ? handleRemoveTeamDetail()
                : warning == 'REMOVELEAF'
                ? (setLeaf(false),
                  setNewChanges({ ...newChanges, is_leaf_team: 0 }))
                : '';
              setWarning('');
            }}
            header={
              warning == 'INACTIVE' || warning == 'NO_INACTIVE'
                ? 'Make team inactive'
                : warning == 'DELETE' || warning == 'NO_DELETE'
                ? 'Confirm Delete'
                : warning == 'REMOVELEAF' || warning == 'NO_REMOVELEAF'
                ? 'Confirm change'
                : 'Change Team'
            }
            content={warningContent}
            proceedButton={
              warning == 'INACTIVE'
                ? 'Continue'
                : warning == 'NO_INACTIVE' || warning == 'NO_DELETE'
                ? ''
                : warning == 'DELETE'
                ? 'Delete'
                : warning == 'REMOVELEAF'
                ? 'Proceed'
                : 'Continue'
            }
            cancelButton={warning == 'NO_INACTIVE' ? 'Close' : 'Cancel'}
          />
        </div>
      )}
    </>
  );
};
export default TeamUpdateActions;
