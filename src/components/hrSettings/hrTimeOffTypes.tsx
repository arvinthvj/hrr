import React, { useEffect, useState } from 'react';
import { pencilIcon } from '../imagepath';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { findLabelText } from '../commonMethod';

const HrTimeOffTypes = ({ setIsopened, setType, data, setEditData }) => {
  const [height, setHeight] = useState<any>(window.innerHeight);
  const [scrollHeight, setScrollHeight] = useState<any>();
  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  const headerHeight = document?.querySelector('.header')?.clientHeight;
  const tabHeader = document?.querySelector(
    '.manager-tab-header',
  )?.clientHeight;
  const addButton = document?.querySelector('.time-add')?.clientHeight;
  const thead = document?.querySelector('.ant-table-thead')?.clientHeight;

  const calHeight = headerHeight + tabHeader + addButton + thead;

  useEffect(() => {
    const sHeight = height - calHeight;
    setScrollHeight(!Number.isNaN(sHeight) && sHeight);
  }, [height, calHeight]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const columns = [
    {
      title: `${findLabelText('Name', 'Name', 'HR_Management')}`,
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: `${findLabelText('Leave_type', 'Leave type', 'HR_Management')}`,
      dataIndex: 'leave_type',
      sorter: (a, b) => a.leave_type.localeCompare(b.leave_type),
    },
    {
      title: `${findLabelText('Country', 'Country', 'HR_Management')}`,
      dataIndex: 'country',
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: `${findLabelText('Come_off', 'Come off', 'HR_Management')}`,
      dataIndex: 'comp_off',
      sorter: (a, b) => a.comp_off.localeCompare(b.comp_off),
    },
    {
      title: `${findLabelText('Allowance', 'Allowance', 'HR_Management')}`,
      dataIndex: 'annual_allowance',
      sorter: (a, b) => a.annual_allowance - b.annual_allowance,
    },
    {
      title: `${findLabelText('Start', 'Start', 'HR_Management')}`,
      dataIndex: 'timeoff_year_start',
      sorter: (a, b) =>
        a.timeoff_year_start.localeCompare(b.timeoff_year_start),
    },
    {
      title: `${findLabelText(
        'Roll_forward',
        'Roll forward',
        'HR_Management',
      )}`,
      dataIndex: 'roll_forward',
      sorter: (a, b) => a.roll_forward - b.roll_forward,
    },
    {
      title: `${findLabelText('PTO', 'PTO', 'HR_Management')}`,
      dataIndex: 'paid_timeoff',
      sorter: (a, b) => a.paid_timeoff.localeCompare(b.paid_timeoff),
    },
    {
      title: `${findLabelText('Approval', 'Approval', 'HR_Management')}`,
      dataIndex: 'approval',
      sorter: (a, b) => a.approval.localeCompare(b.approval),
    },
    {
      title: `${findLabelText('Active', 'Active', 'HR_Management')}`,
      dataIndex: 'status',
      render: text => <>{text == 1 ? 'Yes' : 'No'}</>,
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: '',
      render: (text, record) => (
        <>
          {
            <div className="edit-pencil-icon">
              <Link to="#" onClick={() => handleRightScreen('edit', record)}>
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          }
        </>
      ),
    },
  ];
  const handleRightScreen = (type, data) => {
    setIsopened(true);
    setType(type);
    type == 'add' ? setEditData({}) : setEditData(data);
  };
  return (
    <div
      className="tab-pane fade show active"
      id="time_types"
      role="tabpanel"
      aria-labelledby="time-types"
    >
      <div className="time-type-info">
        <div className="time-add">
          <Link to="#" onClick={() => handleRightScreen('add', {})}>
            <i className="fas fa-plus" />
          </Link>
        </div>
        <div
          className="table-responsive"
          style={{ height: `${scrollHeight + 20}px` }}
        >
          <Table
            dataSource={data}
            columns={columns}
            className="table time-off-table"
            pagination={false}
            rowKey={record => record.id}
            scroll={{ y: `${scrollHeight - 20}px`, x: 'max-content' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HrTimeOffTypes;
