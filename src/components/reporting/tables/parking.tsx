import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../reportingDatatable/index';
import { useSelector } from 'react-redux';
import { global } from '../../../assets/constants/config';

import EmployeeUtilizationAction from '../tables/parking_action';
import PrintableDataTable from '../../reportingDatatable/indexPrint';
import { useReactToPrint } from 'react-to-print';


interface LanguageProps {
  language: {
    languages: {
      Team_Management: any;
      Common_Values: any;
      Dashboard: any;
      Location: any;
    };
  };
}

const EmployessUtilization = (props: any) => {
  const componentRef = useRef();
  const { allLists, currentPage, setCurrentPage, employeeAllList,employeeList } = props;
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const findLabelText = (module: string, text: string) => {
    const { Team_Management } = { ...languages };
    const label = Team_Management?.[module]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };

  const columns: any = [
    {
      title: findLabelText('Employee Name', 'Employee Name'),
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
      title: findLabelText('Team', 'Team'),
      dataIndex: 'team',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.team.localeCompare(b.team),
    },

    {
      title: findLabelText('Parking Bookings', 'Parking Bookings'),
      dataIndex: 'parking_bookings',

      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.parking_bookings_status}`}
              >
                {details.parking_bookings_status}{' '}
                {record.parking_bookings_percentage}%
              </Link>
            </div>
          </>
        );
      },
      sorter: (a, b) => a.parking_bookings - b.parking_bookings,
    },

    {
      title: findLabelText('No-Show rate - Parking', 'No-Show rate - Parking'),
      dataIndex: 'no_show_rate_parking',
      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.no_show_rate_parking_status}`}
              >
                {details.no_show_rate_parking}{' '}
                {record.no_show_rate_parking_percentage}%
              </Link>
            </div>
          </>
        );
      },

      sorter: (a, b) => a.no_show_rate_parking - b.no_show_rate_parking,
    },
    {
      title: findLabelText(
        'Average Booking Duration - Parking',
        'Average Booking Duration - Parking',
      ),
      dataIndex: 'average_booking_duration_parking',
      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.average_booking_duration_parking_status}`}
              >
                {details.average_booking_duration_parking}{' '}
                {record.average_booking_duration_parking_percentage}%
              </Link>
            </div>
          </>
        );
      },

      sorter: (a, b) =>
        a.average_booking_duration_parking - b.average_booking_duration_parking,
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
        <div className="card card-shadow card-chart">
          <EmployeeUtilizationAction
            employeeAllList={employeeAllList}
            allLists={allLists}
            handlePrint={handlePrint}
          />

          <DataTable
            dataSource={employeeList}
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
              title={'Utilisation by employee'}
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

export default EmployessUtilization;
