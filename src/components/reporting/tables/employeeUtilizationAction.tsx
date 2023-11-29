import React, { useState } from 'react';
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

const EmployeeUtilizationAction = ({
  employeeAllList,
  handlePrint,
  allLists,
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
      // disabled: true,
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

    { label: 'Desk openings', key: 'desk_openings' },
    { label: 'Desk openings status', key: 'desk_openings_status' },
    { label: 'Desk openings percentage', key: 'desk_openings_percentage' },

    { label: 'No shows desk', key: 'no_shows_desk' },
    { label: 'No shows desk percentage', key: 'no_shows_desk_percentage' },
    { label: 'No shows desk status', key: 'no_shows_desk_status' },

    { label: 'Unknown days', key: 'unknown_days' },
    { label: 'Unknown days percentage', key: 'unknown_days_percentage' },
    { label: 'Unknown days status', key: 'unknown_days_status' },

    { label: 'Remote days', key: 'remote_days' },
    { label: 'Remote days percentage', key: 'remote_days_percentage' },
    { label: 'Remote days status', key: 'remote_days_status' },
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
      // {
      //   title: 'Id',
      //   dataIndex: 'id',
      //   key: 'id',
      // },
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
        title: 'Desk openings',
        dataIndex: 'desk_openings',
        key: 'desk_openings',
      },

      {
        title: 'Desk openings percentage',
        dataIndex: 'desk_openings_percentage',
        key: 'desk_openings_percentage',
      },

      {
        title: 'Desk openings status',
        dataIndex: 'desk_openings_status',
        key: 'desk_openings_status',
      },

      {
        title: 'No shows desks',
        dataIndex: 'no_shows_desk',
        key: 'no_shows_desk',
      },
      {
        title: 'No shows percentage',
        dataIndex: 'no_shows_desk_percentage',
        key: 'no_shows_desk_percentage',
      },
      {
        title: 'No shows status',
        dataIndex: 'no_shows_desk_status',
        key: 'no_shows_desk_status',
      },
      {
        title: 'Unknown days',
        dataIndex: 'unknown_days',
        key: 'unknown_days',
      },

      {
        title: 'Unknown days percentage',
        dataIndex: 'unknown_days_percentage',
        key: 'unknown_days_percentage',
      },

      {
        title: 'Unknown days status',
        dataIndex: 'unknown_days_status',
        key: 'unknown_days_status',
      },
      {
        title: 'Remote days',
        dataIndex: 'remote_days',
        key: 'remote_days',
      },

      {
        title: 'Remote days percentage',
        dataIndex: 'remote_days_percentage',
        key: 'remote_days_percentage',
      },

      {
        title: 'Remote days status',
        dataIndex: 'remote_days_status',
        key: 'remote_days_status',
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
      .saveAs(
        `hybridhero_chart_${moment(new Date()).format('DDMMYYYYHHmm')}.xlsx`,
      );
  };

  function googlesheetmethodcall() {
    const title = 'Utilisation by employee';
    const row_header = [
      'Employee Name',
      'Team',
      'Desk openings',
      'Desk openings percentage',
      'Desk openings status',
      'No shows desks',
      'No shows percentage',
      'No shows status',
      'Unknown days',
      'Unknown days percentage',
      'Unknown days status',
      'Remote days',
      'Remote days percentage',
      'Remote days status',
    ];
    const rows = employeeAllList.map(day => ({
      'Employee Name': day?.employee_name,
      Team: day?.team,
      'Desk openings': day?.desk_openings,
      'Desk openings percentage': day?.desk_openings_percentage,
      'Desk openings status': day?.desk_openings_status,
      'No shows desks': day?.no_shows_desk,
      'No shows percentage': day?.no_shows_desk_percentage,
      'No shows status': day?.no_shows_desk_status,
      'Unknown days': day?.unknown_days,
      'Unknown days percentage': day?.unknown_days_percentage,
      'Unknown days status': day?.unknown_days_status,
      'Remote days': day?.remote_days,
      'Remote days percentage': day?.remote_days_percentage,
      'Remote days status': day?.remote_days_status,
    }));

    const output = {
      row_header: row_header,
      rows: rows,
      title,
    };
    callgooglesheetApi(output);
  }

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
          filename={`hybridhero_chart_${moment(new Date()).format(
            'DDMMYYYYHHmm',
          )}`}
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
