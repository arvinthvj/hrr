import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  userManagementBulkUplode,
  userManagementUserList,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import Create from './create';
import Edit from './edit';
import userManagementContext from './context';
import { useDispatch, useSelector } from 'react-redux';
import { global } from '../../assets/constants/config';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { handleImageUploadtoS3Bucket } from '../../services/s3Bucket';
import { AssetBulkUpload } from '../../components/locationSettings/assetBulkUpload';
import { BulkUploadValidationModel } from '../../components/BulkUploadValidationModel/BulkUploadValidationModel';
import Toaster from '../../components/toast';
import UserManagementHeader from '../../components/userManagement/userManagementHeader';
import UserTable from '../../components/userManagement/userTable';
import {
  ApiStatusCode,
  UserDataEvent,
  UserSettingsLabels,
} from '../../components/userManagement/constant';
import { Col, Row } from 'antd';
import BulkEditUserList from './bulkSelect/bulkEditUserList';

const UserManagement = props => {
  const globalSearchLocation = useLocation();
  const mainDivRef = useRef<any>();
  const [menu, setMenu] = useState(false);
  const [location, setLocation] = useState(false);
  const [editlocation, setEditLocation] = useState(false);
  const [Listdata, setListData] = useState<any>([]);
  const [editusersdata, setEditUsersData] = useState<any>([]);
  const [mount, setMount] = useState(false);
  const [teamlist, setTeamList] = useState<any>([]);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [modelLoader, setModelLoader] = useState<any>('');
  const [bulkAssetData, setBulkAssetData] = useState<any>('');
  const [userPermissionCheck, setUserPermissionCheck] =
    useState<boolean>(false);

  const [loading, setLoading] = useState(true);

  const [liststatus, setListStatus] = useState<boolean>(true);
  const [listInActiveStatus, setListInActiveStatus] = useState<boolean>(true);
  const [searchtype, setSearchType] = useState(
    globalSearchLocation?.state?.search_type,
  );
  const [searchid, setSearchId] = useState(
    globalSearchLocation?.state?.search_id,
  );

  const [totalPage, setTotalPage] = useState<number | any>(1);
  const [currentPage, setCurrentPage] = useState<number | any>(1);
  const pageSize = global.common.countPerPage;

  const [rightSideBar, setRightSideBar] = useState<any>('');

  const [bulkselect, setBulkSelect] = useState<boolean>(false);

  const [bulkListselectlist, setBulkListSelectList] = useState<any>([]);
  const [finalbulkuserlist, SetFinalBulkUserList] = useState<any>([]);
  const [showBulkValidationModal, setShowBulkValidationModal] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const { sideBarWidth, userDetails } = useSelector((state: any) => state.app);
  const [isShowSearch, setShowSearch] = useState(false);

  const dispatchUserDataEvent = (actionType, payload) => {
    switch (actionType) {
      case UserDataEvent.editUser:
        setEditUsersData([...editusersdata, payload]);
        return;
      case UserDataEvent.useMount:
        return;
      case UserDataEvent.addTeam:
        setTeamList([...teamlist, payload]);
        return;

      default:
        return;
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };

  useEffect(() => {
    widthCalc();
  }, [
    sideBarWidth,
    mainDivRef?.current?.offsetWidth,
    location,
    editlocation,
    bulkselect,
    bulkUpload,
  ]);

  const widthCalc = () => {
    const mainDivWidth = mainDivRef?.current?.offsetWidth;
    setRightSideBar(screen.width - (mainDivWidth + sideBarWidth));
  };

  const sucessCallBack = (data, res) => {
    if (res?.data?.code == ApiStatusCode.SUCCESS) {
      const listData = data?.List;
      const filterList = [];
      if (listInActiveStatus == true && liststatus == false) {
        data?.List.map(element => {
          if (element.status == 0) {
            filterList.push(element);
          }
        });
        setTotalPage(data?.totalPages);
        setListData(filterList);
      } else if (listInActiveStatus == false && liststatus == true) {
        data?.List.map(element => {
          if (element.status == 1) {
            filterList.push(element);
          }
        });
        setTotalPage(data?.totalPages);
        setListData(filterList);
      } else if (listInActiveStatus == true && liststatus == true) {
        if (searchtype == 'user' && searchid) {
          data?.List.map(element => {
            if (element.id == searchid) {
              filterList.push(element);
            }
          });
          setTotalPage(data?.totalPages);
          setListData(filterList);
        } else {
          setTotalPage(data?.totalPages);
          setListData(data?.List);
        }
      } else if (listInActiveStatus == false && liststatus == false) {
        if (searchtype == 'user' && searchid) {
          data?.List.map(element => {
            if (element.id == searchid) {
              filterList.push(element);
            }
          });
          setTotalPage(data?.totalPages);
          setListData(filterList);
        } else {
          data?.List.map(element => {
            if (element.status != 1 && element.status != 0) {
              filterList.push(element);
            }
          });
          setTotalPage(data?.totalPages);
          setListData(filterList);
        }
      } else {
        setTotalPage(data?.totalPages);
        setListData(data?.List);
      }
    }
    dispatch(hideLoader());
  };
  useEffect(() => {
    if (userDetails?.roles?.length > 0) {
      const datasList = userDetails?.roles?.filter(el => {
        return el.slug === 'administrator';
      });
      setUserPermissionCheck(datasList?.length > 0 ? true : false);
    }
    getList();
    () => setMount(false);
  }, [liststatus, listInActiveStatus, searchid, searchtype]);

  const getList = () => {
    dispatch(showLoader());
    setLoading(true);
    const inputParam = {
      search_id: searchid,
      search_type: searchtype,
      status: liststatus == true ? 1 : 0,
      count_per_page: pageSize,
      page: currentPage,
    };

    postData(userManagementUserList, inputParam, sucessCallBack);
  };

  const create = UserSettingsLabels.inviteNewUser;

  const handleClick = () => {
    setLocation(current => !current);
    setEditLocation(false);
  };

  const edithandleClick = () => {
    setEditLocation(current => !current);
    setLocation(false);
  };

  const handleAdd = (value, data) => {
    if (value == 'create') {
      setLocation(true);
      setEditLocation(false);
      setBulkSelect(false);
      setBulkUpload(false);
    }
    if (value == 'edit') {
      setLocation(false);
      setEditLocation(true);
      setBulkSelect(false);
      setEditUsersData(data);
      setBulkUpload(false);
    }
    if (value === 'MultipleUpload' && userPermissionCheck) {
      setBulkUpload(true);
      setLocation(false);
      setEditLocation(false);
      setBulkSelect(false);
    }
  };
  const handleBulkCancel = () => {
    setBulkSelect(!bulkselect);
    setBulkListSelectList([]);
    SetFinalBulkUserList([]);
  };

  const handleBulkControl = () => {
    setBulkSelect(!bulkselect);
    setLocation(false);
    setEditLocation(false);
    setBulkUpload(false);
  };
  const RemoveUsers = id => {
    const list: any = JSON.parse(JSON.stringify(Listdata));
    const checkData = list.findIndex(val => val.id == id);
    if (checkData >= 0) {
      list.splice(checkData, 1);
    }
    setListData([...list]);
  };

  const handleaddSearchValue = opn => {
    setSearchType(opn?.type);
    setSearchId(opn?.id);

    setMount(true);
  };

  const successData = saveDetails => {
    if (Array.isArray(saveDetails)) {
      getList();
      return;
    }
    if (validatestatus(saveDetails?.status, saveDetails?.id)) {
      const checkData = Listdata.findIndex(val => val.id == saveDetails.id);
      if (checkData >= 0) {
        Listdata.splice(checkData, 1, saveDetails);
      } else {
        Listdata.unshift(saveDetails);
      }
      setListData([...Listdata]);
    }
    if (userDetails?.email == saveDetails?.email) {
      if (saveDetails?.permission?.length > 0) {
        const datasList = saveDetails?.permission?.filter(el => {
          return el.name === 'Administrator';
        });
        setUserPermissionCheck(datasList?.length > 0 ? true : false);
      }
    }
    getList();
  };

  const validatestatus = (status, id) => {
    if (liststatus && status == 0) {
      const removeKey = Listdata.filter(ele => ele.id != id);
      setListData([...removeKey]);
      if (removeKey.length == 0 && currentPage > 1) {
        setCurrentPage(currentPage => currentPage - 1);
      }
      return false;
    } else {
      return true;
    }
  };

  const handleFileValidate = (file, ValidationReport) => {
    setModelLoader(true);
    handleImageUploadtoS3Bucket(file, 'csv', data => {
      const payload = {
        file: data,
        type: '1',
      };
      postData(userManagementBulkUplode, payload, (data, res) => {
        ValidationReport(data);
        setBulkAssetData(data);
        data && setModelLoader('');
        setShowBulkValidationModal(true);
      });
    });
  };
  const handleBulkUpload = () => {
    dispatch(showLoader());
    const payload = {
      file: bulkAssetData?.file_path,
      type: '2',
    };
    postData(userManagementBulkUplode, payload, (data, res) => {
      dispatch(hideLoader());
      res?.data?.code == 200 && getList();
      res?.data?.code == 200 && setBulkUpload(false);
      Toaster(res?.data?.code, res?.data?.message);
    });
  };
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <>
          <div className="page-wrapper">
            <div className="content content-admin container-fluid pb-0">
              <Row>
                <Col
                  span={
                    location || editlocation || bulkselect || bulkUpload
                      ? 18
                      : 24
                  }
                  className={`  select-bulk-view user-only-blk d-flex main-space-remove  ${
                    location || editlocation || bulkselect || bulkUpload
                      ? 'locations-maindiv'
                      : 'locations-maindiv w-100'
                  }`}
                  ref={mainDivRef}
                >
                  <div className="card card-table book-table-card-user book-table-card-user-info new-user-table-card rooms-space-hidden w-100">
                    <UserManagementHeader
                      bulkselect={bulkselect}
                      handleBulkControl={handleBulkControl}
                      liststatus={liststatus}
                      handleaddSearchValue={handleaddSearchValue}
                      setCurrentPage={setCurrentPage}
                      isShowSearch={isShowSearch}
                      setShowSearch={setShowSearch}
                    />
                    {
                      <UserTable
                        liststatus={liststatus}
                        setListStatus={setListStatus}
                        listInActiveStatus={listInActiveStatus}
                        setListInActiveStatus={setListInActiveStatus}
                        Listdata={Listdata}
                        handleAdd={handleAdd}
                        bulkselect={bulkselect}
                        bulkListselectlist={bulkListselectlist}
                        finalbulkuserlist={finalbulkuserlist}
                        setBulkListSelectList={setBulkListSelectList}
                        SetFinalBulkUserList={SetFinalBulkUserList}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handlePageChange={handlePageChange}
                        create={create}
                        userPermissionCheck={userPermissionCheck}
                        handleBulkControl={handleBulkControl}
                        searchid={searchid}
                        setShowSearch={setShowSearch}
                        isEditOpen={editlocation}
                      />
                    }
                  </div>
                </Col>
                <userManagementContext.Provider
                  value={{
                    editusersdata,
                    mount,
                    teamlist,
                    dispatchUserDataEvent,
                  }}
                >
                  {location && (
                    <Create
                      location={location}
                      handleClick={handleClick}
                      rightSideBar={rightSideBar}
                      setLoading={setLoading}
                      successData={(data, field) => {
                        successData(data);
                      }}
                    />
                  )}
                  {editlocation && (
                    <Edit
                      editusersdatas={editusersdata}
                      editlocation={editlocation}
                      edithandleClick={edithandleClick}
                      rightSideBar={rightSideBar}
                      setLoading={setLoading}
                      removeSuccess={RemoveUsers}
                      successData={(data, field) => {
                        successData(data);
                      }}
                    />
                  )}
                  {bulkselect && (
                    <BulkEditUserList
                      finalbulkuserlist={finalbulkuserlist}
                      SetFinalBulkUserList={SetFinalBulkUserList}
                      handleClick={handleClick}
                      setBulkSelect={setBulkSelect}
                      successData={(data, field) => {
                        successData(data);
                      }}
                    />
                  )}
                  {bulkUpload && (
                    <AssetBulkUpload
                      HeadName={UserSettingsLabels.userBulkUpload}
                      sampleDownload={'user'}
                      CancelBulkUpload={() => {
                        setBulkUpload(false);
                      }}
                      handleFileValidate={handleFileValidate}
                      setModelLoader={setModelLoader}
                    />
                  )}
                  {showBulkValidationModal && (
                    <BulkUploadValidationModel
                      data={bulkAssetData ? bulkAssetData : ''}
                      cancel={() => {
                        setBulkAssetData('');
                        setShowBulkValidationModal(false);
                      }}
                      modelLoader={modelLoader}
                      confirm={() => {
                        handleBulkUpload();
                        setShowBulkValidationModal(false);
                      }}
                      header={UserSettingsLabels.userUploadValidation}
                      proceedButton="Upload"
                    />
                  )}
                </userManagementContext.Provider>
              </Row>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default UserManagement;
