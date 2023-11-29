import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { menuDots } from '../../imagepath';
import { CSVLink } from 'react-csv';
import { Excel } from 'antd-table-saveas-excel';
import Emailpopup from '../charts/emailpopup';
import { info } from '../../imagepath';
import { Popover } from 'antd';
import moment from 'moment';
import { callgooglesheetApi } from '../charts/googlesheet';

const RoomsAction = ({
  roomAllList,
  handlePrint,
  allLists
}) => {
  const csvLinkRef: any = React.createRef();
  const [modalOpen, setModalOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => csvDownload()}>Download as CSV</a>,
    },
    {
      key: '2',
      label: <a rel="noopener noreferrer">Download as PNG</a>,
      disabled: true,
    },
    {
      key: '3',
      label: <a rel="noopener noreferrer">Download as PDF</a>,
      disabled: true,
    },
    {
      key: '5',
      label: <a onClick={() => excelDownload()}>Download as Excel sheet</a>,
    },
    {
      key: '6',
      label: (
        <a onClick={() => googlesheetmethodcall()}>Download as Google Sheet</a>
      ),
    },
    {
      type: 'divider',
    },
    {
      label: <a onClick={() => handlePrint()}>Print</a>,
      key: '7',
    },
    {
      key: '8',
      label: <a onClick={() => setModalOpen(true)}>Email</a>,
    },
  ];

  function googlesheetmethodcall() {
    const title = 'Utilisation by employee';
    const row_header = [
      'Rooms',
      'Capacity',
      'Avg. attendees',
      'Total Meetings',
      'Building',
      'Meeting Hours',
      'Avg. used time per day',
      'Attendance rate (%)',
      'Utilisation (%)',
      'Capacity Utilisation (%)',
    ];
    const rows = roomAllList.map(day => ({
      Rooms: day?.room_name,
      Capacity: day?.room_capacity,
      'Avg. attendees': day?.avg_attentees,
      'Total Meetings': day?.total_meetings,
      Building: day?.building,
      'Meeting Hours': day?.meeting_hours,
      'Avg. used time per day': day?.avg_usedtime_perday,
      'Attendance rate (%)': day?.attendance_rate,
      'Utilisation (%)': day?.utilization_percentage,
      'Capacity Utilisation (%)': day?.capacity_utilization,
    }));

    const output = {
      row_header: row_header,
      rows: rows,
      title,
    };
    callgooglesheetApi(output);
  }

  // CSV download
  const headers = [
    {
      label: 'Rooms',
      key: 'room_name',
    },
    {
      label: 'Capacity',
      key: 'room_capacity',
    },
    {
      label: 'Avg. attendees',
      key: 'avg_attentees',
    },
    {
      label: 'Total Meetings',
      key: 'total_meetings',
    },
    {
      label: 'Building',
      key: 'building',
    },
    {
      label: 'Meeting Hours',
      key: 'meeting_hours',
    },
    {
      label: 'Avg. used time per day',
      key: 'avg_usedtime_perday',
    },
    {
      label: 'Attendance rate (%)',
      key: 'attendance_rate',
    },
    {
      label: 'Utilisation (%)',
      key: 'utilization_percentage',
    },
    {
      label: 'Capacity Utilisation (%)',
      key: 'capacity_utilization',
    },
  ];

  const csvDownload = () => {
    const filenameNew = `hybridhero_chart_${moment(new Date()).format(
      'DDMMYYYYHHmm',
    )}`;

    if (csvLinkRef.current) {
      csvLinkRef.current.link.setAttribute('download', filenameNew);
      csvLinkRef.current.link.click();
    }
  };

  const excelDownload = () => {
    const excelImportColumn: any = [
      {
        title: 'Rooms',
        dataIndex: 'room_name',
        key: 'room_name',
      },
      {
        title: 'Capacity',
        dataIndex: 'room_capacity',
        key: 'room_capacity',
      },
      {
        title: 'Avg. attendees',
        dataIndex: 'avg_attentees',
        key: 'avg_attentees',
      },
      {
        title: 'Total Meetings',
        dataIndex: 'total_meetings',
        key: 'total_meetings',
      },
      {
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
      },
      {
        title: 'Meeting Hours',
        dataIndex: 'meeting_hours',
        key: 'meeting_hours',
      },
      {
        title: 'Avg. used time per day',
        dataIndex: 'avg_usedtime_perday',
        key: 'avg_usedtime_perday',
      },
      {
        title: 'Attendance rate (%)',
        dataIndex: 'attendance_rate',
        key: 'attendance_rate',
      },
      {
        title: 'Utilisation (%)',
        dataIndex: 'utilization_percentage',
        key: 'utilization_percentage',
      },
      {
        title: 'Capacity Utilisation (%)',
        dataIndex: 'capacity_utilization',
        key: 'capacity_utilization',
      },
    ];

    const excel = new Excel();

    excel.setTHeadStyle({
      background: 'FFFFFFFF',
      borderColor: 'E1E3E1',
      bold: false,
      fontSize: 11,
      fontName: 'Calibri',
    });
    excel.setRowHeight(0.45, 'cm');
    excel.setTBodyStyle({
      bold: false,
      fontSize: 11,
      fontName: 'Calibri',
    });

    excel
      .addSheet('Room data')
      .addColumns(excelImportColumn)
      .addDataSource(roomAllList, {
        str2Percent: true,
      })
      .saveAs(
        `hybridhero_chart_${moment(new Date()).format('DDMMYYYYHHmm')}.xlsx`,
      );
  };


  return (
    <div className="report-card-map-header">
      <Emailpopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        charttitle={'Room data'}
        filterdata={allLists}
        chart={false}
      />
      <h3>
        Room data
        <Popover content={'Room data'}>
          <img src={info} alt="" />
        </Popover>
        <CSVLink
          data={roomAllList}
          headers={headers}
          filename={`hybridhero_chart_${moment(new Date()).format(
            'DDMMYYYYHHmm',
          )}`}
          className="hidden"
          ref={csvLinkRef}
        >
          Download CSV
        </CSVLink>
      </h3>
      <Dropdown menu={{ items }}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <img src={menuDots} alt="" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};
export default RoomsAction;
