import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { create_plus } from '../../../components/imagepath';
import { AddSidebar } from './addsidebar';
import { EditSidebar } from './editsidebar';
import { useEffect } from 'react';
import { GetHealthAndSafetyList } from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import { global } from '../../../assets/constants/config';
import { DataTable } from '../../../components/datatable';
import { SearchField } from '../../../components/findComponent/searchField';
import { setSuperAdminBaseURL } from '../../../reduxStore/superAdmin/healthAndSafetySlice';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import { Row } from 'antd';
import { GlobalRolesLabel } from '../../../components/globalRolesComponents/constants';
const GlobaRoles = () => {
  const [menu, setMenu] = useState(false);
  const [addsidebar, setAddSidebar] = useState(false);
  const [editsidebar, setEditSidebar] = useState<boolean>(false);
  const [healthSafetyList, setHealthSafetyList] = useState<any>([]);
  const [editHealthSafetyList, setEditHealthSafetyList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(global.common.countPerPage);
  const [active, setActive] = useState(true);
  const [searchRole, setSearchRole] = useState<any>('');
  const [error, setError] = useState('');
  const [initial, setInitial] = useState('start');
  const dispatch = useDispatch();
  const handleClick = (type, roleDetails) => {
    setAddSidebar(current => !current);
    setEditSidebar(false);
    if (type != undefined && roleDetails) {
      if (active) {
        if (roleDetails.status == 1) {
          roleListUpdate(type, roleDetails);
        } else {
          const list = JSON.parse(JSON.stringify(healthSafetyList));
          const checkData = list.findIndex(val => val?.id == roleDetails?.id);
          if (checkData >= 0) {
            list.splice(checkData, 1);
          } else {
          }
          setHealthSafetyList([...list]);
        }
      } else {
        roleListUpdate(type, roleDetails);
      }
    }
  };
  const roleListUpdate = (type, roleDetails) => {
    const checkId = roleDetails?.id ? roleDetails?.id : roleDetails;
    const list = JSON.parse(JSON.stringify(healthSafetyList));
    const checkData = list.findIndex(val => val.id == checkId);
    if (checkData >= 0) {
      if (type == 'Update') {
        list.splice(checkData, 1, roleDetails);
      }
      if (type == 'Delete') {
        list.splice(checkData, 1);
        if (list.length == 0 && currentPage > 1)
          setCurrentPage(currentPage => currentPage - 1);
      }
    } else {
      if (type == 'Add') {
        list.unshift(roleDetails);
        if (list.length > 9) setCurrentPage(1);
      }
    }
    setHealthSafetyList([...list]);
  };
  const edithandleClick = (type, roleDetail) => {
    setEditSidebar(current => !current);
    setAddSidebar(false);
    if (type != undefined && roleDetail) {
      if (active) {
        if (roleDetail.status == 1) {
          roleListUpdate(type, roleDetail);
        } else {
          const list = JSON.parse(JSON.stringify(healthSafetyList));
          const checkData = list.findIndex(
            val => val?.id == (roleDetail?.id ? roleDetail?.id : roleDetail),
          );
          if (checkData >= 0) {
            list.splice(checkData, 1);
          } else {
          }
          setHealthSafetyList([...list]);
        }
      } else {
        roleListUpdate(type, roleDetail);
      }
    }
  };
  const handleAdd = (value: string, data: any) => {
    if (value === 'create') {
      setAddSidebar(true);
      setEditSidebar(false);
    }
    if (value === 'edit') {
      setAddSidebar(false);
      setEditSidebar(true);
      setEditHealthSafetyList(data);
    }
  };
  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const columns = [
    {
      title: 'Icon',
      dataIndex: 'health_safety_icons',
      render: record => (
        <div className="table-icon">
          <span>
            <GetImgaeFromS3Bucket
              imageFile={record}
              type={'image'}
              FilePath={'ghs'}
            />
          </span>
        </div>
      ),
      sorter: (a, b) =>
        a.health_safety_icons.length - b.health_safety_icons.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <>{text}</>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Active',
      dataIndex: 'status',
      render: (text, record) => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.status - b?.status,
    },
    {
      title: '',
      dataIndex: '',
      render: record => (
        <>
          <div className="text-end" onClick={() => handleAdd('edit', record)}>
            <Link to="#" className="btn btn-edit edit-open-link">
              {GlobalRolesLabel.Edit}
            </Link>
          </div>
        </>
      ),
    },
  ];
  const getHealthAndSafetyList = () => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      dispatch(hideLoader());
      if (data?.length == 0 && searchRole?.length > 0) {
        setError('No matching results found');
      } else {
        setError('');
      }
      if (res?.data?.code == 200) {
        dispatch(setSuperAdminBaseURL(data?.base_url));
        setHealthSafetyList(data?.List);
        setTotalPage(data?.totalPages);
      } else {
        setHealthSafetyList([]);
        setTotalPage(1);
      }
    };
    const payload = {
      name: searchRole,
      status: active == true ? 1 : 0,
      count_per_page: pageSize,
      page: currentPage,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(GetHealthAndSafetyList, payload, SuccessCallback);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (/[^a-zA-Z0-9\- _&#@\/]/.test(searchRole)) {
        setSearchRole(null);
      } else if (/^\s/.test(searchRole) && searchRole?.length > 2) {
        setSearchRole(null);
      } else if (searchRole?.length > 2 || (searchRole == '' && initial == ''))
        getHealthAndSafetyList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchRole]);
  useEffect(() => {
    getHealthAndSafetyList();
    setInitial('');
  }, [active, currentPage]);
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <Row className="position-relative">
              <div
                className={`col-xl-9 col-sm-12 settings-table main-space-remove ${
                  addsidebar || editsidebar ? 'main-space-remove ' : 'w-100'
                }`}
              >
                <div className="card card-table global-asset-card">
                  <div className="card-header">
                    <h3 className="card-titles">
                      {GlobalRolesLabel.Global_Health}&amp;
                      {GlobalRolesLabel.Safety_Roles}
                    </h3>
                    <SearchField
                      searchTenant={searchRole}
                      setSearchTenant={setSearchRole}
                      error={error}
                      setError={setError}
                    />
                  </div>
                  <div className="super-admin-table-create-info">
                    <div className="super-admin-table-create-btn create-btn-border">
                      <Link
                        to="#"
                        className="add-open-link"
                        onClick={() => handleAdd('create', '')}
                      >
                        <span>
                          <img src={create_plus} alt="img" />
                        </span>{' '}
                        {GlobalRolesLabel.Add_H}&amp;{GlobalRolesLabel.S_Role}
                      </Link>
                      <div className="super-admin-table-checkbox">
                        <label className="super_admin_custom_check d-inline-flex align-items-center">
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => {
                              setActive(!active);
                              setCurrentPage(1);
                            }}
                          />
                          {GlobalRolesLabel.Active_only}
                          <span className="super_admin_checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-resposnive">
                      <DataTable
                        dataSource={healthSafetyList}
                        columns={columns}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handlePageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {addsidebar && <AddSidebar handleClick={handleClick} />}
              {editsidebar && (
                <EditSidebar
                  edithandleClick={edithandleClick}
                  editHealthSafetyList={editHealthSafetyList}
                />
              )}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobaRoles;
