import React, { useRef } from 'react';
import { DataTable } from '../../reportingDatatable/index';
import { useSelector } from 'react-redux';
import { global } from '../../../assets/constants/config';
import EmployeeTimeoffDataAction from './EmployeeTimeoffDataAction';
import PrintableDataTable from '../../reportingDatatable/indexPrint';
import { useReactToPrint } from 'react-to-print';

const EmployeeTimeoffData = (props: any) => {
  const componentRef = useRef();
  const { allLists, currentPage, setCurrentPage, empDataAllList, empDataList } =
    props;
  const pageSize = global.common.countPerPage;
  const handlePageChange = (page: any) => setCurrentPage(page?.current);

  const columns: any = [
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name - b.employee_name,
    },
    {
      title: 'Team',
      dataIndex: 'team',
      sorter: (a, b) => a.team - b.team,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      sorter: (a, b) => a.country - b.country,
    },
    {
      title: 'Total Annual Leave Allowance (days)',
      dataIndex: 'start_period_annual_leave_bal',
      sorter: (a, b) => a.start_period_annual_leave_bal - b.start_period_annual_leave_bal,
    },
    {
      title: 'Annual Leave Used (days)',
      dataIndex: 'annual_leave_used',
      sorter: (a, b) => a.annual_leave_used - b.annual_leave_used,
    },
    {
      title: 'Sick Leave Used (days)',
      dataIndex: 'sick_leave_used',
      sorter: (a, b) => a.sick_leave_used - b.sick_leave_used,
    },
    {
      title: 'Annual Leave Allowance Renewal Date',
      dataIndex: 'annual_leave_allowance_renewal_date',
      sorter: (a, b) =>
        a.annual_leave_allowance_renewal_date - b.annual_leave_allowance_renewal_date,
    },
    {
      title: 'Remaining Annual Leave Balance (days)',
      dataIndex: 'remaining_annual_leave_balance',
      sorter: (a, b) =>
        a.remaining_annual_leave_balance - b.remaining_annual_leave_balance,
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart">
          <EmployeeTimeoffDataAction
            empDataAllList={empDataAllList}
            allLists={allLists} // propsdata
            handlePrint={handlePrint}
          />
          
<DataTable
            dataSource={props?.employeeList}
            columns={columns}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={props?.totalPage}
            handlePageChange={handlePageChange}
            totalRecords={props?.totalRecords}
          />

          <div style={{ display: 'none' }}>
            <PrintableDataTable
              title={'Employee Time off data'}
              ref={componentRef}
              columns={columns}
              dataSource={empDataAllList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTimeoffData;
