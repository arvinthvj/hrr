import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../reportingDatatable/index';
import { useSelector } from 'react-redux';
import { global } from '../../../assets/constants/config';
import EmployeeUtilizationAction from '../tables/employeeUtilizationAction';
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
  const { allLists, currentPage, setCurrentPage, employeeAllList } = props;
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
      // sorter: (a, b) => a.team - b.team,
      sorter: (a, b) => a.team.localeCompare(b.team),
    },

    {
      title: findLabelText('Desk bookings', 'Desk bookings'),
      dataIndex: 'desk_openings',

      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.desk_openings_status}`}
              >
                {details.desk_openings} {record.desk_openings_percentage}%
              </Link>
            </div>
          </>
        );
      },
      sorter: (a, b) => a.desk_openings - b.desk_openings,
    },

    {
      title: findLabelText('No-shows-desks', 'No-shows-desks'),
      dataIndex: 'no_shows_desk',
      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.no_shows_desk_status}`}
              >
                {details.no_shows_desk} {record.no_shows_desk_percentage}%
              </Link>
            </div>
          </>
        );
      },

      sorter: (a, b) => a.no_shows_desk - b.no_shows_desk,
    },
    {
      title: findLabelText('Unknown days', 'Unknown days'),
      dataIndex: 'unknown_days',
      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.unknown_days_status}`}
              >
                {details.unknown_days} {record.unknown_days_percentage}%
              </Link>
            </div>
          </>
        );
      },

      sorter: (a, b) => a.unknown_days - b.unknown_days,
    },

    {
      title: findLabelText('Remote days', 'Remote days'),
      dataIndex: 'remote_days',
      render: (details, record) => {
        return (
          <>
            <div className="text-center table-fig-column">
              <span className="table-fig">
                {findLabelText(details, details)}
              </span>
              <Link
                to="#"
                className={`status-badge status-${record?.remote_days_status}`}
              >
                {details.remote_days} {record.remote_days_percentage}%
              </Link>
            </div>
          </>
        );
      },
      sorter: (a, b) => a.remote_days - b.remote_days,
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
            allLists={allLists}
            employeeAllList={employeeAllList}
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
