import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Loader from '../loader';
// import { TableComponentProps } from "../../assets/globals/typeConstants";

interface ColumnsProps {
  title: string;
  dataIndex: string;
  render: any;
  sorter: CallableFunction;
}
type props = {
  dataSource: Array<string> | any;
  columns: ColumnsProps | any;
  create?: string;
  multiplecreate?: string;
  handleAdd?: CallableFunction;
  loading?: string;
  pageSize?: number;
  currentPage?: number;
  totalPage?: number;
  handlePageChange?: CallableFunction | any;
  location?: string;
  showActiveInActive?: string;
  userPermissionCheck?: string;
  disableAdd?: boolean;
  rowKey?: any;
  isAddCreate?: boolean;
  className?: any;
  handleRowClick?: CallableFunction | any;
  dataFrom?: string;
  liststatus?: boolean;
  setListStatus?: CallableFunction | any;
  listInActiveStatus?: boolean;
  setListInActiveStatus?: CallableFunction | any;
  bulkselect?: boolean;
  handleBulkControl?: CallableFunction | any;
  isEditOPen?: boolean;
  scroll?: boolean;
};
export const DataTable: React.FC<props> = ({
  dataSource,
  columns,
  create,
  multiplecreate,
  handleAdd,
  loading,
  pageSize,
  currentPage,
  totalPage,
  handlePageChange,
  location,
  showActiveInActive,
  userPermissionCheck,
  className,
  disableAdd,
  isAddCreate,
  handleRowClick,
  dataFrom,
  liststatus,
  setListStatus,
  listInActiveStatus,
  setListInActiveStatus,
  bulkselect,
  handleBulkControl,
  isEditOPen,
  scroll,
}) => {
  const tableClass = className ? className : 'table table-striped datatable';
  const [rowClick, setRowClick] = useState('');

  const handleClick = record => {
    setRowClick(record?.id);
    handleRowClick(record);
  };

  const getRowClassName = record => {
    return record?.id == rowClick ? 'user-table-select' : '';
  };

  return (
    <>
      {create && (
        <div className="create-btn">
          <div className="addAnActiveStatusRow">
            <div className="addWorkSpaceRowView">
              <div>
                <Link
                  to="#"
                  onClick={() => handleAdd && handleAdd('create')}
                  className="btn-createnew opencreate"
                >
                  <i className="fa fa-plus me-2" />
                  <span>{create}</span>
                </Link>
              </div>
              {multiplecreate && (
                <>
                  <div className="location-assets-line-space"></div>
                  <div>
                    <Link
                      style={{
                        opacity: userPermissionCheck == 'desabled' ? '0.3' : '',
                      }}
                      to="#"
                      onClick={() => handleAdd && handleAdd('MultipleUpload')}
                      className="btn-createnew opencreate new-work-icon"
                    >
                      <i className="fa fa-plus me-2 workspace-mix" />
                      <i className="fa fa-plus workspace-mix-add" />
                      <span>{multiplecreate}</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
            {showActiveInActive && (
              <div className="statusRowView location-status-view">
                <div className="checkbox-set">
                  <label className="check">
                    Bulk select
                    <input
                      type="checkbox"
                      checked={bulkselect}
                      onChange={() => handleBulkControl()}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="location-assets-line-space"></div>
                <div className="checkbox-set">
                  <label className="check">
                    Active
                    <input
                      type="checkbox"
                      checked={liststatus}
                      onChange={() => setListStatus(!liststatus)}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="location-assets-line-space"></div>
                <div className="checkbox-set">
                  <label className="check">
                    Inactive
                    <input
                      type="checkbox"
                      checked={listInActiveStatus}
                      onChange={() =>
                        setListInActiveStatus(!listInActiveStatus)
                      }
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          {!location ? (
            <Table
              // key={props}
              className={tableClass}
              rowClassName={dataFrom == 'User' && isEditOPen && getRowClassName}
              onRow={record => ({
                onClick: () => {
                  dataFrom == 'User' && handleClick(record);
                },
              })}
              style={{ overflowX: 'auto' }}
              columns={columns}
              rowKey={(record: any) =>
                record?.id ||
                record?.workspace_id ||
                record?.floorplan_id ||
                record?.tenant_id
              }
              scroll={scroll}
              pagination={
                (
                  totalPage
                    ? totalPage <= 1 || totalPage === undefined
                    : dataSource?.length < 10 ||
                      dataSource?.length === undefined
                )
                  ? false
                  : {
                      current: currentPage,
                      pageSize: pageSize,
                      total: pageSize ? totalPage * pageSize : 0,
                      showSizeChanger: false,
                    }
              }
              dataSource={dataSource}
              onChange={handlePageChange}
              // pageSize={3}
            />
          ) : (
            <Table
              className={tableClass}
              style={{ overflowX: 'auto' }}
              rowKey={(record: any) =>
                record?.id ||
                record?.workspace_id ||
                record?.floorplan_id ||
                record?.tenant_id
              }
              scroll={scroll}
              dataSource={dataSource}
              columns={columns}
              pagination={
                dataSource?.length < 10 || dataSource?.length === undefined
                  ? false
                  : {
                      current: currentPage,
                      pageSize: 10,
                      total: dataSource?.length,
                      showSizeChanger: false,
                    }
              }
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};
