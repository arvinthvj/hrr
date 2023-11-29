import React, { useContext, useState } from 'react';
import { LocationSettingsContext } from '../context/context';
import { DataTable } from '../datatable';
import { findLabelText } from '../commonMethod';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  setLocationPaths,
  showLoader,
} from '../../reduxStore/appSlice';
import { Link } from 'react-router-dom';
import { postData } from '../../services/apicall';
import { LocationEditApi } from '../../services/apiurl';
import { global } from '../../assets/constants/config';

const TeamList = () => {
  const {
    listData,
    setCreateOrEditStateFlag,
    updateAssetsConfigurationFlag,
    handleClose,
    setFilteredId,
    setEditLocationDetails,
    totalPage,
    lastLocation,
    setSearchList,
    setAddAssetInLocation,
  } = useContext(LocationSettingsContext);
  const { locationPaths } = useSelector((state: any) => state.app);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = global.common.countPerPage;
  const dispatch = useDispatch();

  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const sorting = (a, b, type) => {
    setCurrentPage(1);
    if (type == 'number') return a - b;
    else return a.localeCompare(b);
  };
  const sendData = obj => {
    setCreateOrEditStateFlag(false);
    updateAssetsConfigurationFlag(false);
    const preparData = [...locationPaths];
    preparData.push(obj);
    dispatch(setLocationPaths(preparData));
    handleClose();
    setFilteredId(obj.id);
    setSearchList('');
  };
  const arrayjoin = type => {
    const joinedStr = locationPaths?.map(list => list[type]).join(',');
    return joinedStr;
  };
  const editDetails = editData => {
    dispatch(showLoader());
    const payload = {
      parentid: arrayjoin('id'),
      parent_level: arrayjoin('level'),
      parent_type: arrayjoin('location_type'),
      id: editData.id,
    };
    Object.keys(payload).forEach(function (key) {
      if (payload[key] === '') {
        delete payload[key];
      }
    });
    postData(LocationEditApi, payload, success => {
      dispatch(hideLoader());
      setEditLocationDetails(success);
      setCreateOrEditStateFlag(true);
    });
  };
  const columns = [
    {
      title: findLabelText('Name', 'Name', 'Location'),
      dataIndex: 'name',
      width: '270px',
      render: (text, recode) => (
        <button
          type="button"
          className="table-link-btn"
          onClick={() => {
            setCurrentPage(1);
            sendData(recode);
          }}
        >
          {recode.name}
        </button>
      ),
      sorter: (a, b) => sorting(a.name, b.name, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },

    {
      title: findLabelText('Location_Type', 'Location Type', 'Common_Values'),
      dataIndex: 'locationType',
      render: (text, recode) => (
        <>
          {findLabelText(
            recode?.location_type,
            recode?.location_type,
            'Location',
          )}
        </>
      ),
      sorter: (a, b) => sorting(a.location_type, b.location_type, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Members', 'Members', 'Location'),
      dataIndex: 'members',
      render: (text, recode) => <>{recode?.member_count}</>,
      sorter: (a, b) => sorting(a.member_count, b.member_count, 'number'),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Workspaces', 'Workspaces', 'Location'),
      dataIndex: 'workspaces',
      render: (text, recode) => <>{recode?.workspace_count}</>,
      sorter: (a, b) => sorting(a.workspace_count, b.workspace_count, 'number'),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Rooms', 'Rooms', 'Location'),
      dataIndex: 'rooms',
      render: (text, recode) => <>{recode?.room_count}</>,
      sorter: (a, b) => sorting(a.room_count, b.room_count, 'number'),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Parking', 'Parking', 'Location'),
      dataIndex: 'parking',
      render: (text, recode) => <>{recode?.parking_count}</>,
      sorter: (a, b) => sorting(a.parking_count, b.parking_count, 'number'),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: findLabelText('Active', 'Active', 'Location'),
      dataIndex: 'status',
      render: (text, recode) => (
        <>
          {recode.status == 1
            ? findLabelText('Yes', 'Yes', 'Company_Settings')
            : findLabelText('No', 'No', 'Company_Settings')}
        </>
      ),
      sorter: (a, b) => sorting(a.status, b.status, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: '',
      render: data => (
        <>
          <Link
            to="#"
            className="btn btn-edit openedit"
            onClick={() => {
              handleClose();
              editDetails(data);
              updateAssetsConfigurationFlag(false);
              setAddAssetInLocation(false);
            }}
          >
            {findLabelText('Edit', 'Edit', 'Location')}
          </Link>
        </>
      ),
    },
  ];
  return (
    <>
      {lastLocation?.level == 8 ? null : (
        <div className="workspace-tables workspace-tables-info">
          <div className="table-resposnive">
            <DataTable
              dataSource={listData}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPage={Number(totalPage)}
              handlePageChange={handlePageChange}
              location={'yes'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TeamList;
