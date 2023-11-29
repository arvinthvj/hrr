import React, { useEffect, useRef, useState } from 'react';
import { postData } from '../../../services/reportingapicall';
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
import { hrReports } from '../../../services/apiurl';

const HrEmployeeTimeOffDataAction = ({
  currentPage,
  setTotalPage,
  employeeAllList,
  list,
  setTotalRecords,
  handlePrint,
  setEmployeeAllList,
  setEmployeeList,
  signal,
}) => {
  const filterList = list?.filtersData ? list?.filtersData : {};
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

  const lists = {
    location_id: filterList.location_id,
    location_level: filterList.location_level,
    team: filterList.team,
    floor_type: filterList.floor_type,
    from_datetime: filterList.from_datetime,
    to_datetime: filterList.to_datetime,
  };

  const allLists = {
    location_id: filterList.location_id,
    location_level: filterList.location_level,
    team: filterList.team,
    floor_type: filterList.floor_type,
    from_datetime: filterList.from_datetime,
    to_datetime: filterList.to_datetime,
  };

  useEffect(() => {
    getListofTeams();
  }, [currentPage, list]);

  const getListofTeams = () => {
    const limitEmp = 10;
    if (currentPage == 1 || currentPage == undefined) {
      lists['skip'] = `${0}`;
    } else {
      const currentPages = currentPage - 1;
      lists['skip'] = `${currentPages * 10}`;
    }
    lists['limit'] = `${limitEmp}`;

    postData(hrReports.employeeByTimeOfData, lists, signal, null).then(
      successRes => {
        if (successRes?.data.emp_timeoff_data?.list?.length > 0) {
          const resPonseData = successRes?.data?.emp_timeoff_data?.list;
          const totalPazeSize = successRes?.data?.emp_timeoff_data?.totalPages;
          setTotalRecords(totalPazeSize);
          const totalPazeSizePerPage = Math.ceil(totalPazeSize / 10);
          setTotalPage(totalPazeSizePerPage);
          setEmployeeList(resPonseData);
          setEmployeeAllList(resPonseData);
        } else {
          setEmployeeList([]);
          setTotalPage(0);
          setTotalRecords(1);
          setEmployeeAllList([]);
        }
      },
    );
  };

  // CSV download
  const headers = [
    { label: 'Employee name', key: 'employee_name' },
    { label: 'Team', key: 'team' },
    { label: 'Country', key: 'country' },
    {
      label: 'Start Period Annual Leave Balance(days)',
      key: 'start_period_annual_leave_bal',
    },
    { label: 'Adjustments(days)', key: 'adjustments' },
    { label: 'Annual Leave Used(days)', key: 'annual_leave_used' },
    { label: 'Other Leave Used(days)', key: 'other_leave_used' },
    { label: 'Sick Leave Used(days)', key: 'sick_leave_used' },
    {
      label: 'Annual Leave Allowance Renewal Date',
      key: 'annual_leave_allowance_renewal_date',
    },
    {
      label: 'End Period Annual Leave Balance',
      key: 'end_period_annual_leave_bal',
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
        title: 'Start Period Annual Leave Balance(days)',
        dataIndex: 'start_period_annual_leave_bal',
        key: 'start_period_annual_leave_bal',
      },

      {
        title: 'Adjustments(days)',
        dataIndex: 'adjustments',
        key: 'adjustments',
      },

      {
        title: 'Annual Leave Used(days)',
        dataIndex: 'annual_leave_used',
        key: 'annual_leave_used',
      },
      {
        title: 'Other Leave Used(days)',
        dataIndex: 'other_leave_used',
        key: 'other_leave_used',
      },
      {
        title: 'Sick Leave Used(days)',
        dataIndex: 'sick_leave_used',
        key: 'sick_leave_used',
      },
      {
        title: 'Annual Leave Allowance Renewal Date',
        dataIndex: 'annual_leave_allowance_renewal_date',
        key: 'annual_leave_allowance_renewal_date',
      },

      {
        title: 'End Period Annual Leave Balance',
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
      .addSheet('Employee Time Off Data')
      .addColumns(excelImportColumn)
      .addDataSource(employeeAllList, {
        str2Percent: true,
      })
      .saveAs(
        `hybridhero_chart_${moment(new Date()).format('DDMMYYYYHHmm')}.xlsx`,
      );
  };

  function googlesheetmethodcall() {
    const title = 'Employee Time Off Data';
    const row_header = [
      'Employee Name',
      'Team',
      'Country',
      'Start Period Annual Leave Balance(days)',
      'Adjustments(days)',
      'Annual Leave Used(days)s',
      'Other Leave Used(days)',
      'Sick Leave Used(days)',
      'Annual Leave Allowance Renewal Date',
    ];
    const rows = employeeAllList.map(day => ({
      'Employee Name': day?.employee_name,
      Team: day?.team,
      Country: day?.country,
      'Start Period Annual Leave Balance(days)':
        day?.start_period_annual_leave_bal,
      'Adjustments(days)': day?.adjustments,
      'Annual Leave Used(days)': day?.annual_leave_used,
      'Other Leave Used(days)': day?.other_leave_used,
      'Sick Leave Used(days)': day?.sick_leave_used,
      'Annual Leave Allowance Renewal Date':
        day?.annual_leave_allowance_renewal_date,
      'End Period Annual Leave Balance': day?.end_period_annual_leave_bal,
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
        charttitle={'Employee Time Off Data'}
        filterdata={allLists}
        chart={false}
      />
      <h3>
        Employee Time Off Data
        <Popover content={'Employee Time Off Data'}>
          <img src={info} alt="" />
        </Popover>
        {employeeAllList && (
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
        )}
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
export default HrEmployeeTimeOffDataAction;
