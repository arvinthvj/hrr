import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '../../reportingDatatable/index';
import { useSelector } from 'react-redux';
import { global } from '../../../assets/constants/config';
import RoomsAction from './roomsAction';
import PrintableDataTable from '../../reportingDatatable/indexPrint';
import { useReactToPrint } from 'react-to-print';

interface RoomListProps {
  id: number;
  name: string;
  member_count: number;
  status: number;
  manager_id: string;
  workspace_id: string | null;
  room_id: string | null;
  parking_id: string | null;
  member_id: Array<number>;
}

interface LanguageProps {
  language: {
    languages: {
      // Team_Management: any;
      // Common_Values: any;
      // Dashboard: any;
      // Location: any;
      Book: any;
    };
  };
}

const Rooms = (props: any) => {
  const componentRef = useRef();
  const { allLists, currentPage, setCurrentPage, roomAllList ,roomList} = props;

  const { languages } = useSelector((state: LanguageProps) => state.language);
  const pageSize = global.common.countPerPage;

  const findLabelText = (module: string, text: string) => {
    const { Book } = { ...languages };
    const label = Book?.[module]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };

  const handlePageChange = page => setCurrentPage(page?.current);

  const columns: any = [
    {
      title: findLabelText('Rooms', 'Room Name'),
      dataIndex: 'room_name',
      render: (text: string) => (
        <>
          <div className="name-groups">
            <h5>
              <Link to="#">{text}</Link>
            </h5>
          </div>
        </>
      ),
      sorter: (a, b) => a.room_name.localeCompare(b.room_name),
    },
    {
      title: findLabelText('Capacity', 'Capacity'),
      dataIndex: 'room_capacity',
      render: text => <>{text ? text : 0}</>,
      sorter: (a, b) => a.room_capacity - b.room_capacity,
    },
    {
      title: findLabelText('Avg. attendees', 'Avg. attendees'),
      dataIndex: 'avg_attentees',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      // sorter: (a, b) => a.desk_openings - b.desk_openings,
    },
    {
      title: findLabelText('Total Meetings', 'Total Meetings'),
      dataIndex: 'total_meetings',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      // sorter: (a, b) => a.no_shows_desk - b.no_shows_desk,
    },
    {
      title: findLabelText('Building', 'Building'),
      dataIndex: 'building',
    },
    {
      title: findLabelText('Meeting Hours', 'Meeting Hours'),
      dataIndex: 'meeting_hours',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      // sorter: (a, b) => a.remote_days - b.remote_days,
    },
    {
      title: findLabelText('Avg. used time per day', 'Avg. used time per day'),
      dataIndex: 'avg_usedtime_perday',
      render: (details, record) => {
        const countAsString = String(details?.count);

        const countWithoutDot =
          typeof countAsString === 'string' && countAsString.includes('.')
            ? countAsString.replace('.', '') // If it's a string and contains a dot, remove the dot
            : details?.count; // Otherwise, keep the original value

        return (
          <>
            <div className="text-center">
              <span>{countWithoutDot}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
    },
    {
      title: findLabelText('Attendance rate (%)', 'Attendance rate (%)'),
      dataIndex: 'attendance_rate',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      // sorter: (a, b) => a.remote_days - b.remote_days,
    },
    {
      title: findLabelText('Utilisation (%)', 'Utilisation (%)'),
      dataIndex: 'utilization_percentage',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      sorter: (a, b) => a?.details?.count - b?.details?.count,
    },
    {
      title: findLabelText(
        'Capacity Utilisation (%)',
        'Capacity Utilisation (%)',
      ),
      dataIndex: 'capacity_utilization',
      render: (details, record) => {
        return (
          <>
            <div className="text-center">
              <span>{details?.count}</span>
              <Link to="#" className={`status-badge status-${details?.ratio}`}>
                &nbsp; &nbsp; {details?.average}%
              </Link>
            </div>
          </>
        );
      },
      // sorter: (a, b) => a.remote_days - b.remote_days,
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart">
          <RoomsAction
            roomAllList={roomAllList}
            allLists={allLists} // propsdata
            handlePrint={handlePrint}
          />
          <DataTable
            dataSource={roomList}
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
              title={'Room data'}
              ref={componentRef}
              columns={columns}
              dataSource={roomAllList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
