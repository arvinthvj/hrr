import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../../assets/css/antdstyle.css';
import { global } from '../../../assets/constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../services/apicall';
import {
  SuperAdminUserManagementAccessLevel,
  SuperAdminUserManagementList,
} from '../../../services/apiurl';
import { DataTable } from '../../../components/datatable';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import AddEditSidebar from './addEditsidebar';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import UserAction from './userAction';
import { UserSetting } from '../../../components/context/context';
import { Col, Row } from 'antd';
const UserManagementSuperAdmin = () => {
  const [menu, setMenu] = useState(false);
  const [searchlist, setSearchList] = useState<string | any>('' || null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [Listdata, setListData] = useState<Array<any>>([]);
  const [liststatus, setListStatus] = useState(true);
  const [createOrEdit, setCreateOrEditStateFlag] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState({});
  const [error, setError] = useState('');
  const [initial, setInitial] = useState('start');
  const [userPermissionCheck, setUserPermissionCheck] = useState(false);
  const [permissionList, setUserPermissionList] = useState([]);
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const [accessLevel, setAccessLevel] = useState<Array<any>>([]);
  const mainDivRef = useRef<any>(null);
  const pageSize = global.common.countPerPage;
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    setInitial('');
  }, [currentPage, liststatus]);
  useEffect(() => {
    getAccessLevel();
  }, []);
  const getAccessLevel = () => {
    dispatch(showLoader());
    const inputParam = {
      email: userDetails?.email,
    };
    postData(SuperAdminUserManagementAccessLevel, inputParam, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        if (userDetails?.roles?.length > 0) {
          let datasList: any = [];
          datasList = userDetails?.roles?.filter(el => {
            return el.slug === 'administrator';
          });
          setUserPermissionList(datasList);
          setUserPermissionCheck(
            datasList?.length > 0 && data?.id == 2 ? false : true,
          );
        }
      }
    });
  };
  const getList = () => {
    dispatch(showLoader());
    const inputParam = {
      name: searchlist,
      status: liststatus == true ? 1 : 0,
      count_per_page: pageSize,
      page: currentPage,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(SuperAdminUserManagementList, inputParam, (data, res) => {
      if (data.length == 0) {
        setError('No matching results found');
      }
      if (res?.data?.code == 200) {
        setTotalPage(data?.totalPages);
        setListData(data.List);
        let list: any;
        list = selectDatas(data.accesslevel_list);
        setAccessLevel([...list]);
      }
      dispatch(hideLoader());
    });
  };
  const selectDatas = items => {
    const list: any = [];
    if (items?.length > 0) {
      for (const obj of items) {
        obj['value'] = obj?.id;
        obj['label'] = obj?.name;
        list.push(obj);
      }
    }
    return list;
  };
  const handleAdd = (type?: string) => {
    handleClose();
    setCreateOrEditStateFlag(true);
  };
  const handleClose = (data?: any, status?: string) => {
    if (status == 'delete') {
      const removeKey = Listdata.filter((ele: any) => ele.id != data);
      setListData([...removeKey]);
      if (removeKey.length == 0 && currentPage > 1) {
        setCurrentPage(currentPage => currentPage - 1);
      }
    } else if (status == 'edit' && validatestatus(data.status, status, data)) {
      let ids: any;
      ids = accessLevel.find((ele: any) => ele.id == data?.access_type);
      let result: any[];
      result = Listdata?.map((items: any, index) => {
        return items.id === data.id
          ? {
              ...items,
              id: data.id,
              name: data.name,
              email: data.email,
              access_type: ids?.name,
              status: data.status,
            }
          : items;
      });
      setListData([...result]);
      if (userDetails?.email == data.email) {
        setUserPermissionCheck(
          permissionList?.length > 0 && ids?.id == 2 ? false : true,
        );
      }
    } else if (status == 'add' && validatestatus(data.status)) {
      let ids: any;
      ids = accessLevel.find((ele: any) => ele.id == data?.access_type);
      const list = {
        id: data.id,
        name: data.name,
        email: data.email,
        access_type: ids.name,
        status: data.status,
        check: data.status,
      };
      if (Listdata.length > 9 && currentPage == totalPage) {
        setCurrentPage(currentPage => currentPage + 1);
      }
      setListData([list, ...Listdata]);
    }
    setCreateOrEditStateFlag(false);
    setEditDetails({});
  };
  const validatestatus = (data_status?: any, status?: any, data?: any) => {
    if (liststatus && data_status == 0) {
      if (status == 'edit') {
        const removeKey = Listdata.filter((ele: any) => ele.id != data?.id);
        setListData([...removeKey]);
        if (removeKey.length == 0 && currentPage > 1) {
          setCurrentPage(currentPage => currentPage - 1);
        }
      }
      return false;
    } else {
      return true;
    }
  };
  const edit = record => {
    setCreateOrEditStateFlag(true);
    setEditDetails(record);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <div className="data-name">{record?.name}</div>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Access level',
      dataIndex: 'accesslevel',
      render: (text, record) => <>{record?.access_type}</>,
      sorter: (a, b) => a?.access_type?.length - b?.access_type?.length,
    },
    {
      title: 'Active',
      dataIndex: 'Active',
      render: (text, record) => <>{record?.status == '1' ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.status?.length - b?.status?.length,
    },
    {
      title: '',
      dataIndex: '',
      render: (text, record) => (
        <div
          className="text-end"
          onClick={() => {
            edit(record);
          }}
        >
          <Link to="#" className={'btn btn-edit edit-open-link'}>
            Edit
          </Link>
        </div>
      ),
    },
  ];
  const handlePageChange = page => {
    if (page?.current) {
      setCurrentPage(page?.current);
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (/[^a-zA-Z0-9\- _&#@\/]/.test(searchlist)) {
        setSearchList(null);
      } else if (/^\s/.test(searchlist) && searchlist?.length > 2) {
        setSearchList(null);
      } else if (searchlist?.length > 2 || (searchlist == '' && initial == ''))
        getList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchlist]);
  return (
    <UserSetting.Provider
      value={{
        searchlist: searchlist,
        setSearchList: setSearchList,
        error: error,
        setError: setError,
        handleAdd: handleAdd,
        liststatus: liststatus,
        setListStatus: setListStatus,
      }}
    >
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <Row className="position-relative">
              <Col
                span={createOrEdit ? 18 : 24}
                className={`main-space-remove settings-table  ${
                  createOrEdit ? 'main-space-remove ' : 'w-100'
                }`}
              >
                <div className="card card-table global-asset-card user-manage-card">
                  <UserAction />
                  <div className="card-body">
                    <div className="table-resposnive">
                      <DataTable
                        columns={columns}
                        handleAdd={() => {
                          handleAdd();
                        }}
                        dataSource={Listdata}
                        rowKey={record => record.id}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handlePageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              {createOrEdit && (
                <AddEditSidebar
                  closeRightSideSection={(data, status) => {
                    handleClose(data, status);
                  }}
                  editDetails={editDetails}
                  handleClose={handleClose}
                  accessLevel={accessLevel}
                  userPermissionCheck={userPermissionCheck}
                />
              )}
            </Row>
          </div>
        </div>
      </div>
    </UserSetting.Provider>
  );
};

export default UserManagementSuperAdmin;
