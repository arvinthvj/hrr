import React, { useEffect, useState } from 'react';
import { pencilIcon } from '../imagepath';
import { Link } from 'react-router-dom';
import { Table, Tooltip } from 'antd';
import { findLabelText } from '../commonMethod';

const HrTimeOffProfiles = ({ setIsopened, setType, data, setEditData }) => {
  const [height, setHeight] = useState<any>(window.innerHeight);
  const [scrollHeight, setScrollHeight] = useState<any>();
  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  const letterSize =
    window.innerWidth < 1280
      ? 70
      : window.innerWidth < 1600
      ? 100
      : window.innerWidth < 1750
      ? 150
      : window.innerWidth < 1930
      ? 200
      : 300;

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
      title: `${findLabelText('Users', 'Users', 'HR_Management')}`,
      dataIndex: 'users',
      sorter: (a, b) => a.users - b.users,
    },
    {
      title: `${findLabelText('Description', 'Description', 'HR_Management')}`,
      dataIndex: 'description',
      render: text => (
        <>
          {' '}
          <Tooltip title={text}>
            {text.length > letterSize
              ? `${text.slice(0, letterSize)}...`
              : text}
          </Tooltip>
        </>
      ),
      sorter: (a, b) => a.description.localeCompare(b.description),
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

export default HrTimeOffProfiles;
