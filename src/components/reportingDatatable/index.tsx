import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Loader from '../loader';

import {
  arrow_backward,
  arrow_backward_ios,
  arrow_forward,
  arrow_forward_ios,
} from '../../components/imagepath';

interface ColumnsProps {
  title: string;
  dataIndex: string;
  render: any;
  sorter: CallableFunction;
}
interface props {
  dataSource: Array<string> | any;
  columns: ColumnsProps | any;
  create?: string;
  multiplecreate?: string;
  handleAdd?: CallableFunction;
  loading?: string;
  pageSize?: number;
  currentPage?: number;
  setCurrentPage?: any;
  totalPage?: number;
  handlePageChange?: CallableFunction | any;
  location?: string;
  showActiveInActive?: string;
  userPermissionCheck?: string;
  disableAdd?: boolean;
  rowKey?: any;
  isAddCreate?: boolean;
  className: any;
  dashboardActive: any;
  totalRecords: any;
}
export const DataTable = ({
  dataSource,
  columns,
  loading,
  pageSize,
  currentPage,
  setCurrentPage,
  totalPage,
  totalRecords,
  handlePageChange,
  location,
  className,
  }) => {
  const tableClass = className
    ? className
    : 'table table-striped datatable custom_pagination';

  const showTotal = (total, range) => {
    return `${range[0]}-${range[1]} of ${totalRecords ? totalRecords : 0}`;
  };

  const firstChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPage(1);
  };
  const lastChange = (totalPage, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPage(totalPage);
  };

  let lastActiveFirst = 'active';
  if (currentPage == totalPage) {
    lastActiveFirst = '';
  }

  let firstActiveFirst = 'active';
  if (currentPage == 1) {
    firstActiveFirst = '';
  }

  const renderPagination = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          {/* First */}
          <a className={`table-first ${firstActiveFirst}`}>
            {' '}
            <img src={arrow_forward_ios} onClick={(e) => firstChange(e)} />
          </a>
          <a className={`table-prev ${firstActiveFirst}`}>
            <img src={arrow_forward} />
          </a>
        </>
      );
    }
    if (type === 'next') {
      return (
        <>
          <a className={`table-first ${lastActiveFirst}`}>
            <img src={arrow_backward} />
          </a>
          {/* Last */}
          <a className={`table-last ${lastActiveFirst}`}>
            <img
              src={arrow_backward_ios}
              onClick={(e) => lastChange(totalPage , e)}
            />
          </a>
        </>
      );
    }
    return originalElement;
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!location ? (
            <Table
              className={tableClass}
              style={{ overflowX: 'auto' }}
              columns={columns}
              rowKey={
                (record: any) => record?.uniqId
              }
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: pageSize ? totalPage * pageSize : 0,
                showSizeChanger: false,
                showTotal: showTotal,
                itemRender: (current, type, originalElement) =>
                  renderPagination(current, type, originalElement),
              }}
              dataSource={dataSource}
              onChange={handlePageChange}
              
            />
          ) : (
            <Table
              className={tableClass}
              style={{ overflowX: 'auto' }}
              rowKey={
                (record: any) => record?.uniqId
              }
              dataSource={dataSource}
              columns={columns}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};
