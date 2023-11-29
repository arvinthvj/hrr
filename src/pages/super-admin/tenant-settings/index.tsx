import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { create_plus } from '../../../components/imagepath';
import { CreateSidebar } from './createsidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAllTenantCollection,
  GetTenantList,
  SuperAdminUserManagementAccessLevel,
} from '../../../services/apiurl';
import { postData } from '../../../services/apicall';
import { AdminTenantContext } from '../../../components/context/context';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { global } from '../../../assets/constants/config';
import { DataTable } from '../../../components/datatable';
import { SearchField } from '../../../components/findComponent/searchField';
import moment from 'moment';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import { findLabelText } from '../../../components/commonMethod';
import {
  TenantLabelText,
  tenantText,
} from '../../../components/tenantComponent/constants';
import { Col, Row } from 'antd';
const TenantSettings = props => {
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const [menu, setMenu] = useState(false);
  const [addsidebar, setAddSidebar] = useState(false);
  const [editsidebar, setEditSidebar] = useState(false);
  const [createsidebar, setCreateSidebar] = useState(false);
  const dispatch = useDispatch();
  const [tenantList, setTenantList] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(global.common.countPerPage);
  const [active, setActive] = useState(true);
  const [searchTenant, setSearchTenant] = useState<any>('');
  const [error, setError] = useState('');
  const [tenantRightsideOptions, setTenantRightsideOptions] = useState({});
  const [editDetails, setEditDetails] = useState({});
  const [initial, setInitial] = useState('start');
  const [userPermissionCheck, setUserPermissionCheck] = useState(false);
  const createHandleClick = () => {
    setCreateSidebar(current => !current);
  };

  const handleAdd = (value: string, details?: any) => {
    if (value === 'create') {
      setEditDetails(details);
      setCreateSidebar(true);
      setAddSidebar(false);
      setEditSidebar(false);
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => (
        <div className="data-name">
          <Link to="#">{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      render: (text, record) => <>{record?.plan?.name}</>,
      sorter: (a, b) => a.plan - b.plan,
    },
    {
      title: 'Trial',
      dataIndex: 'trial',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a.trial - b.trial,
    },
    {
      title: 'Renew date',
      dataIndex: 'end_date',
      render: (text, record) => (
        <>{moment(new Date(text)).format('DD/MM/YY')}</>
      ),
      sorter: (a, b) => a.end_date - b.end_date,
    },
    {
      title: 'Auto renew',
      dataIndex: 'auto_renew',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a.auto_renew - b.auto_renew,
    },
    {
      title: 'Users',
      dataIndex: 'total_user',
      render: (text, record) => (
        <>{`${text} / ${record.max_user ? record.max_user : 0}`}</>
      ),
      sorter: (a, b) => a.total_user - b.total_user,
    },
    {
      title: 'Workspaces',
      dataIndex: 'total_workspaces',
      render: (text, record) => (
        <>{`${text !== null ? text : 0} / ${
          record.no_of_workspaces ? record.no_of_workspaces : 0
        }`}</>
      ),
      sorter: (a, b) => a.total_workspaces - b.total_workspaces,
    },
    {
      title: 'Rooms',
      dataIndex: 'total_rooms',
      render: (text, record) => (
        <>{`${text !== null ? text : 0} / ${
          record.no_of_rooms ? record.no_of_rooms : 0
        }`}</>
      ),
      sorter: (a, b) => a.total_rooms - b.total_rooms,
    },
    {
      title: 'Parking',
      dataIndex: 'total_parking',
      render: (text, record) => (
        <>{`${text !== null ? text : 0} / ${
          record.no_of_parking ? record.no_of_parking : 0
        }`}</>
      ),
      sorter: (a, b) => a.total_parking - b.total_parking,
    },

    {
      title: 'Active',
      dataIndex: 'status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: '',
      dataIndex: '',
      render: details => (
        <>
          <div className="text-end ">
            <Link
              to="#"
              className="btn btn-edit edit-open-link"
              onClick={() => handleAdd('create', details)}
            >
              Edit
            </Link>
          </div>
        </>
      ),
    },
  ];
  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const getAllTenantDetails = () => {
    postData(GetAllTenantCollection, '', (success, res) => {
      setTenantRightsideOptions(success);
    });
  };
  useEffect(() => {
    getAllTenantDetails();
  }, []);

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
      if (userDetails?.roles?.length > 0) {
        const datasList = userDetails?.roles?.filter(el => {
          return el.slug === 'administrator';
        });
        setUserPermissionCheck(
          datasList?.length > 0 && data?.id == 2 ? false : true,
        );
      }
      // }
    });
  };
  const getTenantList = () => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      dispatch(hideLoader());
      if (data.length == 0) {
        setError('No matching results found');
      }
      if (res?.data?.code == 200) {
        setTenantList(data?.List);
        setTotalPage(data?.totalPages);
      } else {
        setTenantList([]);
        setTotalPage(1);
      }
    };
    const payload = {
      name: searchTenant,
      status: active == true ? 1 : 0,
      count_per_page: pageSize,
      page: currentPage,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(GetTenantList, payload, SuccessCallback);
  };
  useEffect(() => {
    getTenantList();
    setInitial('');
  }, [active, currentPage]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (/[^a-zA-Z0-9\- _&#@\/]/.test(searchTenant)) {
        setSearchTenant(null);
      } else if (/^\s/.test(searchTenant) && searchTenant?.length > 2) {
        setSearchTenant(null);
      } else if (
        searchTenant?.length > 2 ||
        (searchTenant == '' && initial == '')
      )
        getTenantList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchTenant]);
  const tenantListUpdate = saveDetails => {
    const list = JSON.parse(JSON.stringify(tenantList));
    const checkData = list.findIndex(
      val => val.tenant_id == saveDetails.tenant_id,
    );
    if (checkData >= 0) {
      list.splice(checkData, 1, saveDetails);
    } else {
      list.unshift(saveDetails);
    }
    setTenantList([...list]);
  };
  return (
    <React.Fragment>
      <AdminTenantContext.Provider
        value={{
          allConfigurations: tenantRightsideOptions,
        }}
      >
        <>
          <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
            <div className="page-wrapper">
              <div className="content container-fluid pb-0">
                <Row className="position-relative">
                  <Col
                    span={addsidebar || editsidebar || createsidebar ? 18 : 24}
                    className={`settings-table  ${
                      addsidebar || editsidebar || createsidebar
                        ? 'main-space-remove settings-table'
                        : 'w-100 main-space-remove settings-table'
                    }`}
                  >
                    <div className="card card-table tenant-card-table">
                      <div className="card-header">
                        <h3 className="card-titles">
                          {findLabelText(
                            TenantLabelText.Tenant_Settings,
                            TenantLabelText.Tenant_Settings,
                            TenantLabelText.Common_Values,
                          )}
                        </h3>
                        <SearchField
                          searchTenant={searchTenant}
                          setSearchTenant={setSearchTenant}
                          error={error}
                          setError={setError}
                        />
                      </div>
                      <div className="super-admin-table-create-info">
                        <div className="super-admin-table-create-btn create-btn-border">
                          <Link
                            to="#"
                            className="create-open-link"
                            onClick={() => handleAdd(tenantText.create)}
                          >
                            <span>
                              <img src={create_plus} alt="img" />
                            </span>{' '}
                            {findLabelText(
                              TenantLabelText.Create_a_new_tenant,
                              TenantLabelText.Create_a_new_tenant,
                              TenantLabelText.Common_Values,
                            )}
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
                              {findLabelText(
                                TenantLabelText.Active_only,
                                TenantLabelText.Active_only,
                                TenantLabelText.Common_Values,
                              )}
                              <span className="super_admin_checkmark" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="table-resposnive">
                          <DataTable
                            dataSource={tenantList}
                            isAddCreate={false}
                            columns={columns}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            handlePageChange={handlePageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                  {createsidebar ? (
                    <CreateSidebar
                      createhandleClick={createHandleClick}
                      userPermissionCheck={userPermissionCheck}
                      editDetails={editDetails}
                      removeSuccess={tenantId => {
                        createHandleClick();
                        const list = JSON.parse(JSON.stringify(tenantList));
                        const checkData = list.findIndex(
                          val => val.tenant_id == tenantId,
                        );
                        if (checkData >= 0) {
                          list.splice(checkData, 1);
                        } else {
                        }
                        setTenantList([...list]);
                      }}
                      saveSuccess={saveDetails => {
                        createHandleClick();
                        if (active) {
                          if (saveDetails.status == 1) {
                            tenantListUpdate(saveDetails);
                          } else {
                            const list = JSON.parse(JSON.stringify(tenantList));
                            const checkData = list.findIndex(
                              val => val.tenant_id == saveDetails.tenant_id,
                            );
                            if (checkData >= 0) {
                              list.splice(checkData, 1);
                            } else {
                            }
                            setTenantList([...list]);
                          }
                        } else {
                          tenantListUpdate(saveDetails);
                        }
                      }}
                    />
                  ) : null}
                </Row>
              </div>
            </div>
          </div>
        </>
      </AdminTenantContext.Provider>
    </React.Fragment>
  );
};

export default TenantSettings;
