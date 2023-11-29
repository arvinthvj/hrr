import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { create_plus } from '../../../components/imagepath';
import 'antd/dist/antd.css';
import { AddSidebar } from './addsidebar';
import { EditSidebar } from './editsidebar';
import { useEffect } from 'react';
import { postData } from '../../../services/apicall';
import Toaster from '../../../components/toast';
import { postData as postdata } from '../../../services/apiservice';
import { global } from '../../../assets/constants/config';
import { DataTable } from '../../../components/datatable';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import {
  AddGlobalAssert,
  DeleteGlobalAssert,
  GetGlobalAssertList,
  GetLanguageList,
  UpdateGlobalAssert,
} from '../../../services/apiurl';
import { SearchField } from '../../../components/findComponent/searchField';
import {
  GetImgaeFromS3Bucket,
  deleteImageFromS3Bucket,
} from '../../../services/s3Bucket';
import { findLabelText } from '../../../components/commonMethod';
import { GlobalLabelText } from '../../../components/dashboardComponent/globalAssertComponent/constants';
import { Row } from 'antd';
const GlobalAsset = () => {
  const [menu, setMenu] = useState(false);
  const [addsidebar, setAddSidebar] = useState(false);
  const [editsidebar, setEditSidebar] = useState(false);
  const [editAssertData, setEditAssertData] = useState<any>({
    data: '',
    res: '',
  });
  const [initialdata, setInitialData] = useState<any>({});
  const [lang, setLang] = useState<any>({});
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(global.common.countPerPage);
  const [searchRole, setSearchRole] = useState<string | any>('' || null);
  const [error, setError] = useState('');
  const [initial, setInitial] = useState('start');
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const globalAssetTypeList = async () => {
    dispatch(showLoader());
    const payload = {
      name: searchRole || null,
      status: checked == true ? 1 : 0,
      page: currentPage || 1,
      count_per_page: pageSize,
      sort_by: 'id',
      order_by: 'desc',
    };
    postData(GetGlobalAssertList, payload, (data, res) => {
      dispatch(hideLoader());
      if (data.length == 0) {
        setError('No matching results found');
      }
      if (res?.data?.code == 200 || res?.data?.code == 204) {
        setInitialData(data);
      }
      res?.data?.code == 200 && setTotalPage(data?.totalPages);
    });
  };
  const Language = async () => {
    const res = await postdata(GetLanguageList);
    res && setLang({ data: res?.data, res: res });
  };
  const handleClick = () => {
    setAddSidebar(current => !current);
    setEditSidebar(false);
  };
  const handleListClick = (data, icon, edit, iconImage, iconType) => {
    const nameObjList: any = [];
    const names = Object.keys(data).filter(name => {
      let id;
      let nameObj;
      lang?.data?.map(val => {
        if (val.name === name) {
          id = val.id;
          nameObj = {
            name: data[name] ? data[name] : '',
            language: id,
            language_name: val?.name,
          };
          nameObjList.push(nameObj);
        }
      });
    });
    const labelarr: any = [];
    const Labelnames = Object.keys(data).filter(name => {
      let id;
      let nameObj;
      lang?.data?.filter(val => {
        if (`label${val.name}` === name) {
          id = val.id;
          nameObj = {
            label: data[name] ? data[name] : '',
            language: id,
            language_name: val?.name,
          };
          labelarr.push(nameObj);
        }
      });
    });
    const val = data?.active == true ? 1 : 0;
    const payload = {
      name: data?.English,
      name_details: nameObjList?.length > 0 ? nameObjList : [],
      status: val,
      capacity: parseInt(data?.add_capacity),
      allow_book_canvas: parseInt(data?.add_book),
      label_details: labelarr,
      label: data?.labelEnglish ? data?.labelEnglish : '',
      image_type: iconType,
      image: icon,
    };
    postData(AddGlobalAssert, payload, (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      dispatch(hideLoader());
      res?.data?.code == 200 && setAddSidebar(current => !current);
      if (res?.data?.code == 200) {
        if (checked) {
          if (payload.status == 1) {
            handleToAddNewAssetsList(payload, data);
          }
        } else {
          handleToAddNewAssetsList(payload, data);
        }
      }
    });
  };
  const handleToAddNewAssetsList = (payload, data) => {
    setInitialData(prev => {
      const prevData = prev?.List || [];
      const addData = {
        ...payload,
        id: data.id,
        image: data?.image,
      };
      const allData = [addData, ...prevData];
      return {
        ...prev,
        List: allData,
      };
    });
  };
  const handleEditClick = (data, icon, edit, editBook, iconType) => {
    const nameObjList: any = [];
    const names = Object.keys(data).filter(name => {
      let id;
      let nameObj;
      lang?.data?.map(val => {
        if (val?.name === name) {
          id = val?.id || val?.language;
          nameObj = {
            name: data[name],
            language: id,
            language_name: val?.name,
          };
          nameObjList.push(nameObj);
        }
      });
    });
    const labelarr: any = [];
    const Labelnames = Object.keys(data).filter(name => {
      let id;
      let nameObj;
      lang?.data?.filter(val => {
        if (`label${val.name}` === name) {
          id = val.id;
          nameObj = {
            label: data[name],
            language: id,
            language_name: val?.name,
          };
          labelarr.push(nameObj);
        }
      });
    });
    const val = data?.active == true ? 1 : 0;
    let payload = {
      id: edit,
      name: data?.English,
      name_details: nameObjList?.length > 0 ? nameObjList : [],
      status: val,
      capacity: editAssertData?.capacity == 1 ? 1 : 0,
      allow_book_canvas: editBook == true ? 1 : 0,
      label_details: labelarr,
      label: data?.labelEnglish,
      image_type: iconType,
      image: icon,
    };
    postData(UpdateGlobalAssert, payload, (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      dispatch(hideLoader());
      payload = { ...payload, image: data?.image };
      res?.data?.code == 200 && edithandleClick(),
        res?.data?.code == 200 &&
          icon &&
          deleteImageFromS3Bucket(
            editAssertData?.image,
            'image',
            '',
            '',
            'gat',
          );
      res?.data?.code == 200 && setEditAssertData({ data: '', res: '' });
      if (res?.data?.code == 200) {
        if (checked) {
          if (payload?.status == 1) {
            handleToEditNewAssetsList(payload);
          }
          if (payload?.status == 0) {
            const valid = false;
            handleToEditNewAssetsList(payload, valid);
          }
        } else {
          handleToEditNewAssetsList(payload);
        }
      }
    });
  };
  const handleToEditNewAssetsList = (payload, valid = true) => {
    const list = JSON.parse(JSON.stringify(initialdata));
    const checkData = list.List.findIndex(val => val.id == payload.id);
    if (checkData >= 0) {
      if (valid === false) {
        list.List.splice(checkData, 1);
      } else list.List.splice(checkData, 1, payload);
    } else {
      list.List.unshift(payload);
    }
    setInitialData(list);
  };
  const edithandleClick = () => {
    setEditSidebar(current => !current);
    setAddSidebar(false);
  };
  const handleAdd = value => {
    if (value === 'edit') {
      setEditSidebar(true);
      setAddSidebar(false);
    }
    if (value === 'create') {
      setAddSidebar(true);
      setEditSidebar(false);
    }
  };
  const data = initialdata?.List;
  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const columns = [
    {
      title: 'Icon',
      dataIndex: 'image',
      render: (text, record) => (
        <div className="table-icon">
          <span>
            {record?.image && (
              <GetImgaeFromS3Bucket
                imageFile={record?.image}
                type={'image'}
                FilePath={'gat'}
              />
            )}
          </span>
        </div>
      ),
      sorter: (a, b) => a?.image?.length - b?.image?.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a?.name?.length - b?.name?.length,
    },

    {
      title: 'Active',
      dataIndex: 'status',
      render: (text, record) => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.status?.length - b?.status?.length,
    },
    {
      title: '',
      dataIndex: '',
      render: (text, record) => (
        <>
          <div
            className="text-end"
            onClick={() => {
              handleAdd('edit');
              setEditAssertData({
                ...record,
                base_url: initialdata?.base_url,
              });
            }}
          >
            <Link to="#" className="btn btn-edit edit-open-link">
              Edit
            </Link>
          </div>
        </>
      ),
    },
  ];
  const handledelete = (id, fileName) => {
    dispatch(showLoader());
    deleteImageFromS3Bucket(fileName, 'image', data => {}, '', 'gat');
    const payload = { id: id };
    postData(DeleteGlobalAssert, payload, (data, res) => {
      dispatch(hideLoader());
      Toaster(res?.data?.code, res?.data?.message);
      res?.data?.code == 200 && edithandleClick();
      res?.data?.code == 200 &&
        setInitialData((prev: any) => {
          const List = prev.List;
          const index = List.filter(val => {
            return val?.id !== id;
          });
          return {
            ...prev,
            List: index,
          };
        });
    });
  };
  useEffect(() => {
    globalAssetTypeList();
    Language();
  }, []);
  useEffect(() => {
    globalAssetTypeList();
    setInitial('');
  }, [checked, currentPage]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (/[^a-zA-Z0-9\- _&#@\/]/.test(searchRole)) {
        setSearchRole(null);
      } else if (/^\s/.test(searchRole) && searchRole?.length > 2) {
        setSearchRole(null);
      } else if (searchRole?.length > 2 || (searchRole == '' && initial == ''))
        globalAssetTypeList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchRole]);
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            <Row className="row position-relative">
              <div
                className={`col-xl-9 col-sm-12 settings-table main-space-remove ${
                  addsidebar || editsidebar ? 'main-space-remove ' : 'w-100'
                }`}
              >
                <div className="card card-table global-asset-card">
                  <div className="card-header">
                    <h3 className="card-titles">
                      {findLabelText(
                        GlobalLabelText.GlobalAssetTypes,
                        GlobalLabelText.GlobalAssetTypes,
                        GlobalLabelText.Common_Values,
                      )}
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
                        onClick={() => {
                          handleAdd('create');
                          return () => {
                            handleAdd(false);
                          };
                        }}
                      >
                        <span>
                          <img src={create_plus} alt="img" />
                        </span>{' '}
                        {findLabelText(
                          GlobalLabelText.Asset_type,
                          GlobalLabelText.Asset_type,
                          GlobalLabelText.Common_Values,
                        )}
                      </Link>
                      <div className="super-admin-table-checkbox">
                        <label className="super_admin_custom_check d-inline-flex align-items-center">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                          />
                          {findLabelText(
                            GlobalLabelText.Active_only,
                            GlobalLabelText.Active_only,
                            GlobalLabelText.Common_Values,
                          )}
                          <span className="super_admin_checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-resposnive">
                      <DataTable
                        dataSource={data}
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
              </div>
              {addsidebar && (
                <AddSidebar
                  lang={lang}
                  handleClick={handleClick}
                  handleListClick={handleListClick}
                />
              )}
              {editsidebar && (
                <EditSidebar
                  edithandleClick={edithandleClick}
                  handleEditClick={handleEditClick}
                  editAssertData={editAssertData || ''}
                  handledelete={handledelete}
                />
              )}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalAsset;
