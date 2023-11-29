import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { menuDots } from '../../../components/imagepath';
import { CSVLink } from 'react-csv';
import { Excel } from 'antd-table-saveas-excel';
import Emailpopup from '../charts/emailpopup';
import { info } from '../../imagepath';
import { Popover } from 'antd';
import moment from 'moment';
import { callgooglesheetApi } from '../charts/googlesheet';
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
const EmployeeUtilizationAction = ({
  employeeAllList,
  handlePrint,
  allLists
}) => {
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const csvLinkRef: any = React.createRef();
  const [modalOpen, setModalOpen] = useState(false);


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => csvDownload()}>Download as CSV</a>,
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Download as PNG
        </a>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Download as PDF
        </a>
      ),
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


  // CSV download
  const headers = [
    // { label: 'Id', key: 'id' },
    { label: 'Employee name', key: 'employee_name' },
    { label: 'Team', key: 'team' },

    { label: 'Parking Bookings', key: 'parking_bookings' },
    {
      label: 'Parking Bookings percentage',
      key: 'parking_bookings_percentage',
    },
    { label: 'Parking Bookings status', key: 'parking_bookings_status' },

    { label: 'No-Show rate - Parking', key: 'no_show_rate_parking' },
    {
      label: 'No-Show rate - Parking percentage',
      key: 'no_show_rate_parking_percentage',
    },
    {
      label: 'No-Show rate - Parking status',
      key: 'no_show_rate_parking_status',
    },

    {
      label: 'Average Booking Duration - Parking',
      key: 'average_booking_duration_parking',
    },
    {
      label: 'Average Booking Duration - Parking percentage',
      key: 'average_booking_duration_parking_percentage',
    },
    {
      label: 'Average Booking Duration - Parking status',
      key: 'average_booking_duration_parking_status',
    },
  ];

  function googlesheetmethodcall() {
    const title = 'Utilisation by employee';
    const row_header = [
      'Employee name',
      'Team',
      'Parking Bookings',
      'Parking Bookings percentage',
      'Parking Bookings status',
      'No-Show rate - Parking',
      'No-Show rate - Parking percentage',
      'No-Show rate - Parking status',
      'Average Booking Duration - Parking',
      'Average Booking Duration - Parking percentage',
      'Average Booking Duration - Parking status',
    ];
    const rows = employeeAllList.map(day => ({
      'Employee name': day?.employee_name,
      Team: day?.team,
      'Parking Bookings': day?.parking_bookings,
      'Parking Bookings percentage': day?.parking_bookings_percentage,
      'Parking Bookings status': day?.parking_bookings_status,
      'No-Show rate - Parking': day?.no_show_rate_parking,
      'No-Show rate - Parking percentage': day?.no_show_rate_parking_percentage,
      'No-Show rate - Parking status': day?.no_show_rate_parking_status,
      'Average Booking Duration - Parking':
        day?.average_booking_duration_parking,
      'Average Booking Duration - Parking percentage':
        day?.average_booking_duration_parking_percentage,
      'Average Booking Duration - Parking status':
        day?.average_booking_duration_parking_status,
    }));

    const output = {
      row_header: row_header,
      rows: rows,
      title,
    };
    callgooglesheetApi(output);
  }

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
        title: 'Employee Name',
        dataIndex: 'employee_name',
        key: 'employee_name',
      },
      {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
      },
      {
        title: 'Parking Bookings',
        dataIndex: 'parking_bookings',
        key: 'parking_bookings',
      },

      {
        title: 'Parking Bookings percentage',
        dataIndex: 'parking_bookings_percentage',
        key: 'parking_bookings_percentage',
      },

      {
        title: 'Parking Bookings status',
        dataIndex: 'parking_bookings_status',
        key: 'parking_bookings_status',
      },

      {
        title: 'No-Show rate - Parking',
        dataIndex: 'no_show_rate_parking',
        key: 'no_show_rate_parking',
      },
      {
        title: 'No-Show rate - Parking percentage',
        dataIndex: 'no_show_rate_parking_percentage',
        key: 'no_show_rate_parking_percentage',
      },
      {
        title: 'No-Show rate - Parking status',
        dataIndex: 'no_show_rate_parking_status',
        key: 'no_show_rate_parking_status',
      },
      {
        title: 'Average Booking Duration - Parking',
        dataIndex: 'average_booking_duration_parking',
        key: 'average_booking_duration_parking',
      },

      {
        title: 'Average Booking Duration - Parking percentage',
        dataIndex: 'average_booking_duration_parking_percentage',
        key: 'average_booking_duration_parking_percentage',
      },

      {
        title: 'Average Booking Duration - Parking status',
        dataIndex: 'average_booking_duration_parking_status',
        key: 'average_booking_duration_parking_status',
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
      .addSheet('Utilisation by employee')
      .addColumns(excelImportColumn)
      .addDataSource(employeeAllList, {
        str2Percent: true,
      })
      .saveAs('Utilisation By employee.xlsx');
  };

  return (
    <div className="report-card-map-header">
      <Emailpopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        charttitle={'Utilisation by employee'}
        filterdata={allLists}
        chart={false}
      />
      <h3>
        Utilisation by employee
        <Popover content={'Utilisation by employee'}>
          <img src={info} alt="" />
        </Popover>
        <CSVLink
          data={employeeAllList}
          headers={headers}
          filename="Utilisation by employee"
          className="hidden d-none"
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
export default EmployeeUtilizationAction;
