import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../components/datatable/index';
import { postData } from '../../services/apicall';
import { ApiUrl, deleteTeamDetails } from '../../services/apiurl';
import Toaster from '../../components/toast';
import { schema } from './schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { global } from '../../assets/constants/config';
import {
  hideLoader,
  setTeamHierarchy,
  showLoader,
} from '../../reduxStore/appSlice';
import FindTeam from '../../components/teamActionComponent/findTeam';
import SearchTeam from '../../components/teamActionComponent/searchTeam';
import TeamUpdateActions from '../../components/teamActionComponent/teamUpdateActions';
import { Col, Row } from 'antd';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { findLabelText } from '../../components/commonMethod';
import { icon_01, pencilIcon } from '../../components/imagepath';

type OptionsProps = {
  id: number | string;
  name: string;
};
type UserDetailsProps = {
  base_url: string;
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  display_name: string;
  profile_photo: string;
  status: number;
};
type LanguageProps = {
  language: {
    languages: {
      Team_Management: any;
      Common_Values: any;
      Dashboard: any;
      Location: any;
    };
  };
};
type TeamListProps = {
  id: number;
  name: string;
  member_count: number;
  status: number;
  manager_id: string;
  workspace_id: string | null;
  room_id: string | null;
  parking_id: string | null;
  member_id: Array<number>;
};
const TeamsManagement = () => {
  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [newChanges, setNewChanges] = useState<any>({});
  const [menu, setMenu] = useState<boolean>(false);
  const [createTeamFlag, updateCreateTeamFlag] = useState<boolean>(false);
  const [teamcheck, setTeamcheck] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('1');
  const [userSearchText, setUserSearchText] = useState<string>('');
  const [userSearchList, setUserSearchList] = useState<Array<UserDetailsProps>>(
    [],
  );
  const [disableSave, setDisableSave] = useState(true);
  const [noResultText, setNoResultText] = useState<string>('');
  const [parentTeamList, setParentTeamList] = useState<any>([]);
  const [selectedUserSearchList, setSelectedUserSearchList] = useState<
    Array<UserDetailsProps>
  >([]);
  const [primaryUserList, setPrimaryUserList] = useState<any>([]);
  const [backupSelectedMembers, setBackupSelectedMembers] = useState<
    Array<UserDetailsProps>
  >([]);
  const [selectedUserSearchBackup, setSelectedUserSearchBackup] = useState<
    Array<UserDetailsProps>
  >([]);
  const [selectedMenbers, setSelectedMembers] = useState<
    Array<UserDetailsProps>
  >([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    Array<OptionsProps>
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<Array<OptionsProps>>([]);
  const [selectedParking, setSelectedParking] = useState<Array<OptionsProps>>(
    [],
  );
  const [selectedWorkspaceBackup, setSelectedWorkspaceBackup] = useState<
    Array<OptionsProps>
  >([]);
  const [selectedRoomBackup, setSelectedRoomBackup] = useState<
    Array<OptionsProps>
  >([]);
  const [selectedParkingBackup, setSelectedParkingBackup] = useState<
    Array<OptionsProps>
  >([]);
  const [teamList, setTeamList] = useState<Array<TeamListProps> | any>([]);
  const [teamListCopy, setTeamListCopy] = useState<Array<TeamListProps> | any>(
    [],
  );
  const [listLoad, setListLoad] = useState<boolean>(false);
  const [newTeamCreate, setNewTeamCreate] = useState<boolean>(false);
  const [editTeamInfo, setEditTeamInfo] = useState<any>({});
  const [activeFlag, setActive] = useState<boolean>(true);
  const [leafFlag, setLeaf] = useState<boolean>(true);
  const [searchTeamNameText, setSearchTeamNameText] = useState<string>('');
  const [selectedTeamID, setSearchTeamID] = useState<string | number>('');
  const [parentTeamID, setParentTeamID] = useState<string | number>(0);
  const [teamEditDetails, setTeamEditDetails] = useState<OptionsProps | null>(
    null,
  );
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [teamDelete, setTeamDelete] = useState<boolean>(false);
  const [activeOnlyFlag, setActiveOnlyFlag] = useState<boolean>(true);
  const [inActiveOnlyFlag, setInActiveOnlyFlag] = useState<boolean>(false);
  const [leafTeamDisable, setLeafTeamDisable] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = global.common.countPerPage;
  const [userSearchLoading, setUserSearchLoading] = useState<boolean>(false);
  const { userDetails, teamHierarchy, teamMemberAndAssetCount } = useSelector(
    (state: any) => state.app,
  );
  const [isShowSubTeamList, setShowSubTeamList] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [orderBy, setOrderBy] = useState('desc');
  const [warningContent, setWarningContent] = useState('');
  const [warning, setWarning] = useState('');
  const [haveChilds, setHaveChilds] = useState<boolean>(false);
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const create = findLabelText(
    'Create_a_new_team',
    'Create a new team',
    'Common_Values',
  );
  const columns: any = [
    {
      title: findLabelText('Name', 'Name', 'Team_Management'),
      // dataIndex: 'name',
      render: (team, record) => (
        <>
          {record?.sub_team_count > 0 ? (
            <div className="name-groups">
              <h5>
                <Link
                  className="name-groups-text"
                  to="#"
                  // className="btn btn-edit openedit"
                  onClick={e => {
                    e.stopPropagation();
                    setShowSubTeamList(true);
                    updateCreateTeamFlag(false);
                    setCurrentPage(1);
                    sendData(record);
                  }}
                >
                  {team?.name?.length > 15
                    ? `${team?.name?.substring(0, 15)}...`
                    : team?.name}
                </Link>
              </h5>
            </div>
          ) : (
            <div className="name-groups">
              <h5>
                <Link className="default-name-text" to="#">
                  {team?.name?.length > 15
                    ? `${team?.name?.substring(0, 15)}...`
                    : team?.name}
                </Link>
              </h5>
            </div>
          )}
        </>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: findLabelText('Sub_teams', 'Sub-team(s)', 'Team_Management'),
      dataIndex: 'sub_team_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.sub_team_count - b.sub_team_count,
    },
    {
      title: findLabelText('Members', 'Members', 'Team_Management'),
      dataIndex: 'member_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.member_count - b.member_count,
    },
    {
      title: findLabelText('Workspaces', 'Workspaces', 'Team_Management'),
      dataIndex: 'workspace_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.workspace_count - b.workspace_count,
    },
    {
      title: findLabelText('Rooms', 'Rooms', 'Team_Management'),
      dataIndex: 'room_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.room_count - b.room_count,
    },
    {
      title: findLabelText('Parking', 'Parking', 'Team_Management'),
      dataIndex: 'parking_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.parking_count - b.parking_count,
    },
    {
      title: findLabelText('Managers', 'Manager(s)', 'Team_Management'),
      dataIndex: 'managers_count',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.managers_count - b.managers_count,
    },
    {
      title: findLabelText('Leaf', 'Leaf', 'Team_Management'),
      dataIndex: 'is_leaf',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a.is_leaf - b.is_leaf,
    },
    {
      title: findLabelText('Active', 'Active', 'Team_Management'),
      dataIndex: 'status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      // sorter: (a, b) => a?.status?.localeCompare(b?.status),
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: '',
      render: (team, record) => (
        <>
          <Link to="#">
            <img className="team-table-icon" src={pencilIcon} alt="icon" />
          </Link>
        </>
      ),
    },
  ];

  const sendData = obj => {
    const preparData = teamHierarchy ? [...teamHierarchy] : [];
    preparData.push(obj);
    dispatch(setTeamHierarchy(preparData));
    setParentTeamID(obj?.id);
  };

  const handleAdd = () => {
    setListLoad(false);
    clearErrors();
    clearData(true, true);
    setTeamEditDetails(null);
    updateCreateTeamFlag(true);
    setNewTeamCreate(true);
  };
  const changeUserSearchText = event => {
    setUserSearchText(event.target.value);
  };
  const changeActiveFlag = () => {
    if (editTeamInfo?.id) {
      let inActivate = false;
      // editTeamInfo?.child_team?.forEach(child => {
      //   if (child?.team_members?.length > 0) {
      //     inActivate = true;
      //     return;
      //   }
      // });
      if (editTeamInfo?.inactive_is_possible == 0) {
        inActivate = true;
      }
      if (activeFlag == false) {
        setActive(!activeFlag);
        setDisableSave(false);
        setNewChanges({ ...newChanges, status: 1 });
      } else if (selectedUserSearchList.length > 0 || inActivate) {
        setWarningContent(
          global?.validationLabel?.team_management?.cantInactiveWarning,
        );
        setWarning('NO_INACTIVE');
      } else {
        setWarningContent(
          global?.validationLabel?.team_management?.inactiveWarning,
        );
        setWarning('INACTIVE');
        setDisableSave(false);
        // setNewChanges({ ...newChanges, status: 0 });
      }
    } else {
      setActive(!activeFlag);
      setNewChanges({ ...newChanges, status: !activeFlag ? 0 : 1 });
      setDisableSave(false);
    }
  };
  const removeTeamHandler = () => {
    if (
      selectedUserSearchList.length > 0 ||
      selectedWorkspace.length > 0 ||
      selectedRoom.length > 0 ||
      selectedParking.length > 0 ||
      selectedMenbers.length > 0
    ) {
      setWarningContent(
        global?.validationLabel?.team_management?.cantDeleteWarning,
      );
      setWarning('NO_DELETE');
    } else {
      setWarningContent(
        global?.validationLabel?.team_management?.deleteWarning,
      );
      setWarning('DELETE');
    }
  };

  const getEditTeamDetails = id => {
    setListLoad(false);
    postData(ApiUrl.teamEditInfo, { team_id: id }, (successRes, res) => {
      if (res?.data?.code == '200') {
        setEditTeamInfo({ ...successRes });
        setSelectedMembers([...successRes?.manager_id]);
        setBackupSelectedMembers([...successRes?.manager_id]);
        setSelectedWorkspace([...successRes?.workspace_id]);
        setSelectedWorkspaceBackup([...successRes?.workspace_id]);
        setSelectedRoom([...successRes?.room_id]);
        setSelectedRoomBackup([...successRes?.room_id]);
        setSelectedParking([...successRes?.parking_id]);
        setSelectedParkingBackup([...successRes?.parking_id]);
        setSelectedUserSearchList([...successRes?.member_details]);
        setSelectedUserSearchBackup([...successRes?.member_details]);
        const leaf = successRes?.is_leaf_team;
        const status = successRes?.status;
        setLeaf(leaf == 0 ? false : true);
        setActive(status == 0 ? false : true);
        if (
          successRes?.child_team?.length == 0 &&
          successRes?.member_details?.length == 0 &&
          successRes?.workspace_id?.length == 0 &&
          successRes?.room_id?.length == 0 &&
          successRes?.parking_id?.length == 0 &&
          successRes?.manager_id?.length == 0
        ) {
          setIsDelete(true);
        }
        if (leaf == 0) {
          if (successRes?.child_team?.length > 0) {
            setHaveChilds(true);
            setLeafTeamDisable(true);
          }
        } else if (
          successRes?.workspace_id?.length > 0 ||
          successRes?.room_id?.length > 0 ||
          successRes?.parking_id?.length > 0 ||
          successRes?.member_details?.length > 0
        ) {
          setLeafTeamDisable(true);
        } else {
        }
      }
    });
  };
  const changeLeafFlag = () => {
    if (editTeamInfo?.id) {
      // false to true
      if (leafFlag == false) {
        // should not have childs
        if (editTeamInfo?.child_team?.length == 0) {
          setLeaf(!leafFlag);
          setDisableSave(false);
          setNewChanges({ ...newChanges, is_leaf_team: 1 });
        }
      } else {
        // true to false
        if (
          selectedUserSearchList.length == 0 &&
          selectedWorkspace.length == 0 &&
          selectedRoom.length == 0 &&
          selectedParking.length == 0
        ) {
          setWarningContent(
            global?.validationLabel?.team_management?.removeleafwarning,
          );
          setWarning('REMOVELEAF');
          setDisableSave(false);
          // setNewChanges({ ...newChanges, is_leaf_team: 0 });
        } else {
        }
      }
    } else {
      if (leafFlag == false) {
        setLeaf(!leafFlag);
        setDisableSave(false);
        setNewChanges({ ...newChanges, is_leaf_team: 1 });
      } else {
        setSelectedUserSearchList([]);
        setSelectedWorkspace([]);
        setSelectedParking([]);
        setSelectedRoom([]);
        setLeaf(!leafFlag);
        setDisableSave(false);
        setNewChanges({ ...newChanges, is_leaf_team: 0 });
      }
    }
  };
  const handleRemoveTeamDetail = () => {
    dispatch(showLoader());
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      // Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == '200') {
        Toaster(res?.data?.code, res?.data?.message);
        clearData();
        setTeamDelete(true);
      } else {
        Toaster(res?.code, res?.message);
      }
    };
    const val = {
      team_id: editTeamInfo?.id,
    };
    postData(deleteTeamDetails, val, getResponce);
    // setDisable(true);
  };

  const getIds = list => {
    const ids: any = [];
    if (list.length > 0) {
      for (const obj of list) {
        ids?.push(obj?.id);
      }
    }
    return ids;
  };
  const clearData = (hideRightsideView = true, isSetActive = false) => {
    setUserSearchText('');
    setEditTeamInfo({});
    setSelectedMembers([]);
    setSelectedWorkspace([]);
    setSelectedRoom([]);
    setSelectedParking([]);
    setSelectedWorkspaceBackup([]);
    setSelectedRoomBackup([]);
    setSelectedParkingBackup([]);
    setBackupSelectedMembers([]);
    setSelectedUserSearchBackup([]);
    setNewChanges({});
    setSelectedTab('1');
    setValue('teamName', '');
    setActive(isSetActive);
    setLeaf(true);
    setLeafTeamDisable(false);
    setIsDelete(false);
    setNewTeamCreate(false);
    // setDisableSave(false)
    if (hideRightsideView) {
      updateCreateTeamFlag(false);
    }
    setSelectedUserSearchList([]);
    setPrimaryUserList([]);
    // setListLoad(false);
  };
  const getTeamDetailsList = (teamId, record) => {
    clearErrors();
    setTeamEditDetails(record);
    if (record?.primary_team_user?.length > 0) {
      setPrimaryUserList(record?.primary_team_user);
    }
    if (record?.name) setValue('teamName', record?.name);
    if (record?.status) setActive(record?.status == 0 ? false : true);
    updateCreateTeamFlag(true);
  };

  const getRemovedId = () => {
    const removedId: any = [];
    if (selectedWorkspaceBackup?.length > 0) {
      const results = selectedWorkspaceBackup?.filter(({ id: id1 }) => {
        if (!selectedWorkspace?.some(({ id: id2 }) => id2 == id1)) return id1;
      });
      if (results?.length > 0) {
        for (const res of results) {
          removedId?.push(res?.id);
        }
      }
    }
    if (selectedRoomBackup?.length > 0) {
      const results = selectedRoomBackup?.filter(({ id: id1 }) => {
        if (!selectedRoom?.some(({ id: id2 }) => id2 == id1)) return id1;
      });
      if (results?.length > 0) {
        for (const res of results) {
          removedId.push(res?.id);
        }
      }
    }
    if (selectedParkingBackup?.length > 0) {
      const results = selectedParkingBackup?.filter(({ id: id1 }) => {
        if (!selectedParking?.some(({ id: id2 }) => id2 == id1)) return id1;
      });
      if (results?.length > 0) {
        for (const res of results) {
          removedId.push(res?.id);
        }
      }
    }
    return removedId?.length > 0 ? removedId?.toString() : '';
  };
  const updateTeamUsers = (removedMember, index, addMemberdetails, type) => {
    dispatch(showLoader());
    const members = {
      team_id: teamEditDetails?.id,
    };
    if (type == 'add') {
      members['member_id'] =
        getIds(selectedUserSearchList).toString() + ',' + addMemberdetails?.id;
    } else {
      members['user_remove_id'] = removedMember?.id ? removedMember.id : '';
    }
    postData(ApiUrl.addTeamMember, members, (successRes, res) => {
      dispatch(hideLoader());
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == 200) {
        if (index >= 0) {
          selectedUserSearchList.splice(index, 1);
          setSelectedUserSearchList([...selectedUserSearchList]);
        } else {
          selectedUserSearchList.push(addMemberdetails);
          setSelectedUserSearchList([...selectedUserSearchList]);
        }
        const list = JSON.parse(JSON.stringify(teamList));
        const checkData = list.findIndex(val => val.id == teamEditDetails?.id);
        list[checkData]['member_details'] = selectedUserSearchList;
        list[checkData]['member_id'] = getIds(selectedUserSearchList);
        list[checkData]['member_count'] = selectedUserSearchList.length;
        setTeamList([...list]);
      }
    });
  };
  const handlePageChange = (page, filter, sorter) => {
    setCurrentPage(page?.current);
    if (sorter?.column?.title == 'Name') {
      setSortBy('name');
      setOrderBy(sorter?.order == 'ascend' ? 'asc' : 'desc');
    } else {
      setSortBy('id');
      setOrderBy('desc');
    }
  };
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="content content-admin container-fluid pb-0">
            <Row>
              <Col
                span={createTeamFlag ? 18 : 24}
                className={` select-bulk-view user-only-blk d-flex main-space-remove  ${
                  createTeamFlag
                    ? 'locations-maindiv'
                    : 'locations-maindiv w-100'
                }`}
              >
                <div className="card card-table book-table-card-user book-table-card-user-info rooms-space-hidden w-100">
                  <SearchTeam
                    userSearchText={userSearchText}
                    userDetails={userDetails}
                    setTeamcheck={setTeamcheck}
                    selectedTeamID={selectedTeamID}
                    activeOnlyFlag={activeOnlyFlag}
                    inActiveOnlyFlag={inActiveOnlyFlag}
                    parentTeamID={parentTeamID}
                    currentPage={currentPage}
                    setUserSearchLoading={setUserSearchLoading}
                    setUserSearchList={setUserSearchList}
                    setTotalPage={setTotalPage}
                    setTeamList={setTeamList}
                    teamListCopy={teamListCopy}
                    setTeamListCopy={setTeamListCopy}
                    setSearchTeamID={setSearchTeamID}
                    setCurrentPage={setCurrentPage}
                    selectedUserSearchList={selectedUserSearchList}
                    setShowSubTeamList={setShowSubTeamList}
                    setNoResultText={setNoResultText}
                    sortBy={sortBy}
                    orderBy={orderBy}
                    listLoad={listLoad}
                    teamDelete={teamDelete}
                  />
                  <div className="card-body pt-0">
                    <FindTeam
                      activeOnlyFlag={activeOnlyFlag}
                      setActiveOnlyFlag={setActiveOnlyFlag}
                      inActiveOnlyFlag={inActiveOnlyFlag}
                      setInActiveOnlyFlag={setInActiveOnlyFlag}
                      updateCreateTeamFlag={updateCreateTeamFlag}
                      setParentTeamID={setParentTeamID}
                      handleAdd={() => {
                        teamcheck ? {} : handleAdd();
                      }}
                    />
                    {/* <div className="workspace-tables"> */}
                    <div className="table-resposnive user-table-resposnive">
                      <DataTable
                        dataSource={teamList}
                        handleAdd={() => {
                          teamcheck ? {} : handleAdd();
                        }}
                        columns={columns}
                        // create={create}
                        pageSize={pageSize}
                        disableAdd={teamcheck}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handlePageChange={handlePageChange}
                        handleRowClick={record =>
                          !isShowSubTeamList &&
                          (clearData(false),
                          getTeamDetailsList(record?.id, record),
                          getEditTeamDetails(record?.id))
                        }
                        dataFrom={'User'}
                        className={
                          isShowSubTeamList
                            ? ''
                            : 'table table-striped datatable user-new-table workspace-tables workspace-tables-info'
                        }
                        isEditOPen={
                          createTeamFlag && teamEditDetails?.id ? true : false
                        }
                      />
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </Col>
              <TeamUpdateActions
                createTeamFlag={createTeamFlag}
                selectedTab={selectedTab}
                teamEditDetails={teamEditDetails}
                setSelectedTab={setSelectedTab}
                updateCreateTeamFlag={updateCreateTeamFlag}
                setTeamEditDetails={setTeamEditDetails}
                clearData={clearData}
                setUserSearchText={setUserSearchText}
                setUserSearchList={setUserSearchList}
                updateTeamUsers={updateTeamUsers}
                activeFlag={activeFlag}
                changeActiveFlag={changeActiveFlag}
                leafFlag={leafFlag}
                changeLeafFlag={changeLeafFlag}
                selectedUserSearchList={selectedUserSearchList}
                setSelectedUserSearchList={setSelectedUserSearchList}
                setNewChanges={setNewChanges}
                disableSave={disableSave}
                setDisableSave={setDisableSave}
                newChanges={newChanges}
                teamList={teamList}
                setTeamList={setTeamList}
                selectedWorkspace={selectedWorkspace}
                selectedRoom={selectedRoom}
                selectedParking={selectedParking}
                setSelectedMembers={setSelectedMembers}
                userSearchList={userSearchList}
                setSelectedWorkspace={setSelectedWorkspace}
                setSelectedRoom={setSelectedRoom}
                setSelectedParking={setSelectedParking}
                selectedMenbers={selectedMenbers}
                teamcheck={teamcheck}
                noResultText={noResultText}
                userSearchText={userSearchText}
                changeUserSearchText={changeUserSearchText}
                userSearchLoading={userSearchLoading}
                getRemovedId={getRemovedId}
                activeOnlyFlag={activeOnlyFlag}
                backupSelectedMembers={backupSelectedMembers}
                primaryUserList={primaryUserList}
                warning={warning}
                warningContent={warningContent}
                setWarning={setWarning}
                setWarningContent={setWarningContent}
                setActive={setActive}
                removeTeamHandler={removeTeamHandler}
                handleRemoveTeamDetail={handleRemoveTeamDetail}
                leafTeamDisable={leafTeamDisable}
                setLeafTeamDisable={setLeafTeamDisable}
                setLeaf={setLeaf}
                selectedUserSearchBackup={selectedUserSearchBackup}
                setBackupSelectedMembers={setBackupSelectedMembers}
                setSelectedWorkspaceBackup={setSelectedWorkspaceBackup}
                setSelectedParkingBackup={setSelectedParkingBackup}
                setSelectedUserSearchBackup={setSelectedUserSearchBackup}
                setSelectedRoomBackup={setSelectedRoomBackup}
                setEditTeamInfo={setEditTeamInfo}
                editTeamInfo={editTeamInfo}
                setHaveChilds={setHaveChilds}
                haveChilds={haveChilds}
                setParentTeamList={setParentTeamList}
                parentTeamList={parentTeamList}
                isDelete={isDelete}
                setListLoad={setListLoad}
                listLoad={listLoad}
                newTeamCreate={newTeamCreate}
              />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsManagement;
