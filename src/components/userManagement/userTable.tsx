import React from 'react';
import { findLabelText, getPreferedTimeFormat } from '../commonMethod';
import { DataTable } from '../datatable';
import { Link } from 'react-router-dom';
import { findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { UserSettingsLabels } from './constant';
import moment from 'moment';
import { convertheBookingTimeToLocalDateTime } from '../commonMethod';
import {
  dateFormat_DD_MMM_YYYY1,
  dateFormat_DD_MM_YYYY,
  dateFormat_ddd_DD_MMM_HH_MM,
  timeFormat_24,
} from '../../assets/constants/config';
import { useSelector } from 'react-redux';

interface UserTableProps {
  liststatus: boolean;
  setListStatus: CallableFunction | any;
  listInActiveStatus: boolean;
  setListInActiveStatus: CallableFunction | any;
  Listdata: Array<any> | any;
  handleAdd: CallableFunction | any;
  bulkselect: boolean;
  bulkListselectlist: Array<any> | any;
  finalbulkuserlist: Array<any> | any;
  setBulkListSelectList: CallableFunction | any;
  SetFinalBulkUserList: CallableFunction | any;
  pageSize: number | any;
  currentPage: number | any;
  totalPage: number | any;
  handlePageChange: CallableFunction | any;
  create: string | any;
  userPermissionCheck: boolean | any;
  handleBulkControl: CallableFunction | any;
  searchid: any;
  setShowSearch: CallableFunction | any;
  isEditOpen: boolean | any;
}

const UserTableHeader = ({
  liststatus,
  setListStatus,
  searchid,
  setShowSearch,
}) => {
  return (
    <div className="table-set-spilt">
      <div className="breadcrumbs">
        <ul>
          <li className="breadcrumbs-list">
            {searchid ? (
              <Link
                to="#"
                className="all-users-text all-users-text-info"
                onClick={() => {
                  setShowSearch(false);
                }}
              >
                {findLabelText('All_users', 'All Users', 'User_Management')}
              </Link>
            ) : (
              <div className="all-users-text">
                {findLabelText('All_users', 'All Users', 'User_Management')}
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="table-header border-bottom-0">
        <div className="table-headername">
          {/* <h2>{findLabelText("Users", "Users", "User_Management")}</h2> */}
        </div>
        {/* <div className="table-headersort">
          <div className="table-headercheck m-0">
            <div className="checkbox-set">
              <label className="check">
                {findLabelText("Active_only", "Active only", "User_Management")}
                <input
                  type="checkbox"
                  checked={liststatus}
                  onChange={() => setListStatus(!liststatus)}
                />
                <span className="checkmark user-checkmark" />
              </label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
const UserTable: React.FC<UserTableProps> = ({
  liststatus,
  setListStatus,
  listInActiveStatus,
  setListInActiveStatus,
  Listdata,
  handleAdd,
  bulkselect,
  bulkListselectlist,
  finalbulkuserlist,
  setBulkListSelectList,
  SetFinalBulkUserList,
  pageSize,
  currentPage,
  totalPage,
  handlePageChange,
  create,
  userPermissionCheck,
  handleBulkControl,
  searchid,
  setShowSearch,
  isEditOpen,
}) => {
  const { userDateTimeFormat } = useSelector((state: any) => state?.app);
  const handleBulkListSelect = recode => {
    const ids = recode.id;
    if (!bulkListselectlist.includes(ids)) {
      setBulkListSelectList([...bulkListselectlist, ids]);
      SetFinalBulkUserList([...finalbulkuserlist, recode]);
    } else {
      const inx = bulkListselectlist.indexOf(ids);
      const list = bulkListselectlist.splice(inx, 1);
      setBulkListSelectList([...bulkListselectlist]);
      const index = finalbulkuserlist?.indexOf(
        finalbulkuserlist?.find(val => val?.id == ids),
      );
      finalbulkuserlist?.splice(index, 1);
      SetFinalBulkUserList([...finalbulkuserlist]);
    }
  };
  const getTimeZone = dateValue => {
    const dDate = new Date(dateValue);
    const dateTime = moment(dDate, dateFormat_ddd_DD_MMM_HH_MM);
    const datePart = dateTime.format(dateFormat_DD_MMM_YYYY1);
    const timePart = dateTime.format(timeFormat_24);
    return convertheBookingTimeToLocalDateTime(
      datePart,
      timePart,
      'UTC',
      getPreferedTimeFormat(),
      userDateTimeFormat?.date_pref
        ? userDateTimeFormat?.date_pref
        : dateFormat_DD_MM_YYYY,
    );
  };
  const columns = [
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Name', 'Name', 'User_Management')}
        </p>
      ),
      dataIndex: 'full_name',
      key: 'full_name',
      sortId: 1,
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      render: (text, record) => (
        <>
          <div className="name-groups">
            <div className="work-name-img work-name-img-table">
              <Link to="#">
                {record.profile_photo == undefined ||
                record.profile_photo?.trim() == '' ||
                record.profile_photo == ' ' ? (
                  <p>
                    <span>{findFirstName(record.full_name)}</span>
                  </p>
                ) : (
                  <>
                    <GetImgaeFromS3Bucket
                      imageFile={record?.profile_photo}
                      type={'image'}
                      userDetail={record}
                      name={findFirstName(record.full_name)}
                    />
                  </>
                )}
              </Link>
            </div>
            <h5>
              <Link to="#">{text}</Link>
            </h5>
          </div>
        </>
      ),
    },

    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Email', 'Email', 'User_Management')}
        </p>
      ),
      dataIndex: 'email',
      render: text => <>{text}</>,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Active', 'Active', 'User_Management')}
        </p>
      ),
      dataIndex: 'status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.status - b?.status,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Workspaces', 'Workspaces', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'workspace_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.workspace_count - b?.workspace_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Room', 'Room', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'room_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.room_count - b?.room_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Parking', 'Parking', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'parking_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.parking_count - b?.parking_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('In_office', 'In office', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('Per_week', 'Per week', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'min_office_days',
      render: text => <>{text}</>,
      sorter: (a, b) => a.min_office_days - b.min_office_days,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Primary_team', 'Primary team', 'User_Management')}
        </p>
      ),
      dataIndex: 'primary_teams',
      render: text => <>{text[0]?.name}</>,
      sorter: (a, b) =>
        a?.primary_teams[0]?.name.localeCompare(b?.primary_teams[0]?.name),
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Teams', 'Teams', 'User_Management')}
        </p>
      ),
      dataIndex: 'teams_count',
      render: text => <>{text}</>,
      sorter: (a, b) => a?.teams_count - b?.teams_count,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Admin', 'Admin', 'User_Management')}
        </p>
      ),
      dataIndex: 'admin_status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.admin_status - b?.admin_status,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText(
            'Permission_groups',
            'Permission groups',
            'User_Management',
          )}
        </p>
      ),
      dataIndex: 'permission_count',
      render: text => <>{text}</>,
      sorter: (a, b) => a?.permission_count - b?.permission_count,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Last_active', 'Last active', 'User_Management')}
        </p>
      ),
      dataIndex: 'last_active_login',
      render: text => <>{text != null ? getTimeZone(text) : ' '}</>,
      sorter: (a, b) =>
        a?.last_active_login?.localeCompare(b?.last_active_login),
    },

    // {
    //   title: "",
    //   render: (record) => (
    //     <>
    //       <Link
    //         to="#"
    //         className="btn btn-edit openedit"
    //         onClick={() => handleAdd("edit", record)}
    //       >
    //         {findLabelText("Edit", "Edit", "User_Management")}
    //       </Link>
    //     </>
    //   ),
    // },
  ];
  const bulkColumns = [
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Name', 'Name', 'User_Management')}
        </p>
      ),
      dataIndex: 'full_name',
      render: (text, record) => (
        <>
          <div className="name-groups">
            <div className="work-name-img work-name-img-table">
              <Link to="#">
                {record.profile_photo == undefined ||
                record.profile_photo == '' ? (
                  <p>
                    <span>{findFirstName(record.full_name)}</span>
                  </p>
                ) : (
                  <>
                    <GetImgaeFromS3Bucket
                      imageFile={record?.profile_photo}
                      type={'image'}
                      userDetail={record}
                      name={findFirstName(record.full_name)}
                    />
                  </>
                )}
              </Link>
            </div>
            <h5>
              <Link to="#">{text}</Link>
            </h5>
          </div>
        </>
      ),
      sorter: (a, b) => a.full_name.length - b.full_name.length,
    },

    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Email', 'Email', 'User_Management')}
        </p>
      ),
      dataIndex: 'email',
      render: text => <>{text}</>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Active', 'Active', 'User_Management')}
        </p>
      ),
      dataIndex: 'status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.status - b?.status,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Workspaces', 'Workspaces', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'workspace_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.workspace_count - b?.workspace_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Room', 'Room', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'room_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.room_count - b?.room_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('Parking', 'Parking', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('book_ahead', 'book ahead', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'parking_count',
      render: text => <>{text == null ? 0 : text}</>,
      sorter: (a, b) => a?.parking_count - b?.parking_count,
    },
    {
      title: (
        <p
          style={{
            textAlign: 'center',
            fontWeight: '500',
            lineHeight: 'normal',
          }}
        >
          {findLabelText('In_office', 'In office', 'User_Management')}{' '}
          <span
            style={{ display: 'block', fontSize: '12px', fontWeight: '400' }}
          >
            ({findLabelText('Per_week', 'Per week', 'User_Management')})
          </span>
        </p>
      ),
      dataIndex: 'min_office_days',
      render: text => <>{text}</>,
      sorter: (a, b) => a.min_office_days.localeCompare(b.min_office_days),
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Primary_team', 'Primary team', 'User_Management')}
        </p>
      ),
      dataIndex: 'primary_teams',
      render: text => <>{text[0]?.name}</>,
      sorter: (a, b) => a.primary_teams.localeCompare(b.primary_teams),
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Teams', 'Teams', 'User_Management')}
        </p>
      ),
      dataIndex: 'teams_count',
      render: text => <>{text}</>,
      sorter: (a, b) => a?.teams_count - b?.teams_count,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Admin', 'Admin', 'User_Management')}
        </p>
      ),
      dataIndex: 'admin_status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a?.admin_status - b?.admin_status,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText(
            'Permission_groups',
            'Permission groups',
            'User_Management',
          )}
        </p>
      ),
      dataIndex: 'permission_count',
      render: text => <>{text}</>,
      sorter: (a, b) => a?.permission_count - b?.permission_count,
    },
    {
      title: (
        <p style={{ fontWeight: '500', lineHeight: 'normal' }}>
          {findLabelText('Last_active', 'Last active', 'User_Management')}
        </p>
      ),
      dataIndex: 'last_active_login',
      render: text => <>{text != null ? getTimeZone(text) : ' '}</>,
      sorter: (a, b) => a?.last_active_login - b?.last_active_login,
    },
    {
      title: findLabelText('Select_all', 'Select all', 'User_Management'),
      className: 'linkselecthead',
      onHeaderCell: () => {
        return {
          onClick: () => {
            const bulkList = JSON.parse(JSON.stringify(bulkListselectlist));
            const finalList = JSON.parse(JSON.stringify(finalbulkuserlist));
            for (const user of Listdata) {
              if (!bulkList?.includes(user?.id)) {
                bulkList?.push(user?.id);
                finalList?.push(user);
              } else {
              }
            }
            setBulkListSelectList(bulkList);
            SetFinalBulkUserList(finalList);
          },
        };
      },
      render: record => (
        <>
          <div className="table-checkselect">
            <div className="checkbox-set">
              <label className="check">
                <input
                  type="checkbox"
                  checked={bulkListselectlist.includes(record.id)}
                  onChange={() => handleBulkListSelect(record)}
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="card-body pt-0">
      <UserTableHeader
        liststatus={liststatus}
        setListStatus={setListStatus}
        searchid={searchid}
        setShowSearch={setShowSearch}
      />
      {/* <div className="workspace-tables workspace-tables-info"> */}
      <div className="table-resposnive user-table-resposnive">
        <DataTable
          dataSource={Listdata}
          handleAdd={handleAdd}
          columns={bulkselect === false ? columns : bulkColumns}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
          create={create}
          multiplecreate={UserSettingsLabels.inviteMultipleUser}
          userPermissionCheck={
            userPermissionCheck
              ? UserSettingsLabels.inviteMultipleUser
              : UserSettingsLabels.disabled
          }
          showActiveInActive={'true'}
          className={
            bulkselect
              ? ''
              : 'table table-striped datatable user-new-table workspace-tables workspace-tables-info'
          }
          handleRowClick={record => !bulkselect && handleAdd('edit', record)}
          dataFrom={'User'}
          liststatus={liststatus}
          setListStatus={setListStatus}
          listInActiveStatus={listInActiveStatus}
          setListInActiveStatus={setListInActiveStatus}
          bulkselect={bulkselect}
          handleBulkControl={handleBulkControl}
          isEditOPen={isEditOpen}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default UserTable;
