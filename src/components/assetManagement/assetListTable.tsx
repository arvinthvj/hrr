import React, { useContext, useState } from 'react';
import { DataTable } from '../datatable';
import { AssetManagementContext } from '../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { handleLocationEdit } from '../../reduxStore/appSlice';
import { global } from '../../assets/constants/config';

const AssetListTable = () => {
  const { workList, addAssetInLocation, location_id, totalPage } = useContext(
    AssetManagementContext,
  );
  const selector = useSelector((state: any) => state?.assetManagement);
  const [sideMenuType, setSideMenuType] = useState('workConfig');
  const [editData, setEditData] = useState({});
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(global?.common?.countPerPage);
  const dispatch = useDispatch();
  const handleAdd = (type, value = '') => {
    if (type === 'createNew' || type === 'edit') {
      setSideMenuType('createNew');
      setEditData(value);
      addAssetInLocation(type, value, location_id, selector?.currenttap);
    }
  };
  const sorting = (a, b, type) => {
    setCurrentPage(1);
    if (type == 'number') return a - b;
    else return a.localeCompare(b);
  };
  // Pagination
  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const columns = [
    {
      title: findLabelText('Name', 'Name', 'Team_Management'),
      dataIndex: 'name',
      key: 'name',
      render: text => <div className="font-table">{text}</div>,
      sorter: (a, b) => sorting(a.name, b.name, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Team', 'Team', 'Asset_Management'),
      dataIndex: 'team_details',
      key: 'team_details',
      render: record => (
        <>
          <div className="link-sets">
            <Link to="#">
              {record != '' && record != null ? record?.name : '-'}
            </Link>
          </div>
        </>
      ),
      sorter: (a, b) =>
        sorting(
          a?.team_details ? a?.team_details?.name : '',
          b?.team_details ? b?.team_details?.name : '',
          '',
        ),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Active', 'Active', 'Team_Management'),
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => sorting(a.status, b.status, 'number'),
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: text => (
        <>
          {text == 1
            ? findLabelText('Yes', 'Yes', 'Asset_Management')
            : findLabelText('No', 'No', 'Asset_Management')}
        </>
      ),
    },
    {
      title: '',
      key: 'edit',
      render: record => (
        <>
          <Link
            to="#"
            className="btn btn-edit openedit"
            onClick={() => {
              dispatch(handleLocationEdit(true));
              handleAdd('edit', record);
            }}
          >
            {findLabelText('Edit', 'Edit', 'Team_Management')}
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="workspace-tables">
      <div className="table-resposnive">
        <DataTable
          dataSource={workList}
          handleAdd={() => handleAdd('createNew')}
          columns={columns}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPage={Number(totalPage)}
          handlePageChange={handlePageChange}
          location={'yes'}
        />
      </div>
    </div>
  );
};

export default AssetListTable;
