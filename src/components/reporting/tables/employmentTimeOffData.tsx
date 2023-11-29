import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../reportingDatatable/index';
import { global } from '../../../assets/constants/config';
import HrEmployeeTimeOffDataAction from './hrEmployeeTimeOffDataAction';
import { useReactToPrint } from 'react-to-print';
import PrintableDataTable from '../../reportingDatatable/indexPrint';

const EmploymentTimeOffData = (props: any) => {
  const { list, data, signal } = props;
  const componentRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const [employeeAllList, setEmployeeAllList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setEmployeeAllList(data);
    }
  }, [data]);

  const columns: any = [
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      render: (text: string) => (
        <>
          <div className="name-groups">
            <h5>
              <Link to="#">{text}</Link>
            </h5>
          </div>
        </>
      ),
      sorter: (a, b) => a.employee_name.localeCompare(b.employee_name),
    },
    {
      title: 'Team',
      dataIndex: 'team',
      render: text => <>{text ? text : ''}</>,
      sorter: (a, b) => a.team.localeCompare(b.team),
    },

    {
      title: (
        <div className="reporting-title">
          <p>Country</p> <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'country',
      render: text => <>{text ? text : ''}</>,
      sorter: (a, b) => a.country.localeCompare(b.country),
    },

    {
      title: (
        <div className="reporting-title">
          <p>
            Start Period Annual <br /> Leave Balance (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'start_period_annual_leave_bal',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) =>
        a.start_period_annual_leave_bal - b.start_period_annual_leave_bal,
    },
    {
      title: (
        <div className="reporting-title">
          <p>
            Adjustments <br /> (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'adjustments',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) => a.adjustments - b.adjustments,
    },

    {
      title: (
        <div className="reporting-title">
          <p>
            Annual Leave Used <br /> (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'annual_leave_used',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) => a.annual_leave_used - b.annual_leave_used,
    },
    {
      title: (
        <div className="reporting-title">
          <p>
            Other Leave Used <br /> (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'other_leave_used',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) => a.other_leave_used - b.other_leave_used,
    },

    {
      title: (
        <div className="reporting-title">
          <p>
            Sick Leave Used <br /> (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'sick_leave_used',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) => a.sick_leave_used - b.sick_leave_used,
    },

    {
      title: (
        <div className="reporting-title">
          <p>
            Annual Leave Used Allowance <br /> Renewal Date
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'annual_leave_allowance_renewal_date',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) =>
        a.annual_leave_allowance_renewal_date -
        b.annual_leave_allowance_renewal_date,
    },
    {
      title: (
        <div className="reporting-title">
          <p>
            End Period Annual <br /> Leave Balance (days)
          </p>{' '}
          <i className="feather-alert-circle"></i>
        </div>
      ),
      dataIndex: 'end_period_annual_leave_bal',
      render: text => <p className="text-center">{text ? text : 0}</p>,
      sorter: (a, b) =>
        a.end_period_annual_leave_bal - b.end_period_annual_leave_bal,
    },
  ];

  const pageSize = global.common.countPerPage;

  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart chart-table">
          <HrEmployeeTimeOffDataAction
            currentPage={currentPage}
            setTotalPage={setTotalPage}
            employeeAllList={employeeAllList}
            list={list}
            setTotalRecords={setTotalRecords}
            handlePrint={handlePrint}
            setEmployeeAllList={setEmployeeAllList}
            setEmployeeList={setEmployeeList}
            signal={signal}
          />
          <DataTable
            dataSource={employeeList}
            columns={columns}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
            totalRecords={totalRecords}
          />
          <div style={{ display: 'none' }}>
            <PrintableDataTable
              title={'Employee Time Off Data'}
              ref={componentRef}
              columns={columns}
              dataSource={employeeAllList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmploymentTimeOffData;
