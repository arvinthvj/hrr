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

const EmployeeTimeoffDataAction = ({
  empDataAllList,
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
    const title = 'Employee Time off data';
    const row_header = [
      'Employee Name',
      'Team',
      'Country',
      'Total Annual Leave Allowance (days)',
      'Annual Leave Used (days)',
      'Sick Leave Used (days)',
      'Annual Leave Allowance Renewal Date',
      'Remaining Annual Leave Balance (days)',
    ];
    const rows = empDataAllList.map(day => ({
      'Employee Name': day?.employee_name,
      Team: day?.team,
      Country: day?.country,
      'Total Annual Leave Allowance (days)': day?.start_period_annual_leave_bal,
      'Annual Leave Used (days)': day?.annual_leave_used,
      'Sick Leave Used (days)': day?.sick_leave_used,
      'Annual Leave Allowance Renewal Date': day?.annual_leave_allowance_renewal_date,
      'Remaining Annual Leave Balance (days)': day?.remaining_annual_leave_balance,
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
      title: 'Employee Name',
      key: 'employee_name',
    },
    {
      title: 'Team',
      key: 'team',
    },
    {
      title: 'Country',
      key: 'country',
    },
    {
      title: 'Total Annual Leave Allowance (days)',
      key: 'start_period_annual_leave_bal',
    },
    {
      title: 'Annual Leave Used (days)',
      key: 'annual_leave_used',
    },
    {
      title: 'Sick Leave Used (days)',
      key: 'sick_leave_used',
    },
    {
      title: 'Annual Leave Allowance Renewal Date',
      key: 'annual_leave_allowance_renewal_date',
    },
    {
      title: 'Remaining Annual Leave Balance (days)',
      key: 'remaining_annual_leave_balance',
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
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Total Annual Leave Allowance (days)',
        dataIndex: 'start_period_annual_leave_bal',
        key: 'start_period_annual_leave_bal',
      },
      {
        title: 'Annual Leave Used (days)',
        dataIndex: 'annual_leave_used',
        key: 'annual_leave_used',
      },
      {
        title: 'Sick Leave Used (days)',
        dataIndex: 'sick_leave_used',
        key: 'sick_leave_used',
      },
      {
        title: 'Annual Leave Allowance Renewal Date',
        dataIndex: 'remaining_annual_leave_balance',
        key: 'remaining_annual_leave_balance',
      },
      {
        title: 'Remaining Annual Leave Balance (days)',
        dataIndex: 'end_period_annual_leave_bal',
        key: 'end_period_annual_leave_bal',
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
      .addSheet('Employee Time off data')
      .addColumns(excelImportColumn)
      .addDataSource(empDataAllList, {
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
        charttitle={'Employee Time off data'}
        filterdata={allLists}
        chart={false}
      />
      <h3>
        Employee Time off data
        <Popover content={'Employee Time off data'}>
          <img src={info} alt="" />
        </Popover>
        <CSVLink
          data={empDataAllList}
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
export default EmployeeTimeoffDataAction;
