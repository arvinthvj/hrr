import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headertwo } from '../../../components/header/header';
import { Sidebartwo } from '../../../components/sidebar/sidebar';
import { Search } from '../../../components/imagepath';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import MessageModal from './messagemodal';
import StatusModal from './statusmodal';

const Notifications = props => {
  const [menu, setMenu] = useState(false);

  // const toggleMobileMenu = () => {
  //   setMenu(!menu)
  // }

  const data = [
    {
      id: 1,
      timestamp: '27/10/2022, 07:00:28 +00:00',
      users: 'mics@bing.com',
      message: 'View',
      status: 'View',
    },
    {
      id: 2,
      timestamp: '27/10/2022, 07:00:28 +00:00',
      users: 'bics@bing.com',
      message: 'View',
      status: 'View',
    },
  ];

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.timestamp.length - b.timestamp.length,
    },
    {
      title: 'User',
      dataIndex: 'users',
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.users.length - b.users.length,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (text, record) => (
        <Link to="#" data-bs-toggle="modal" data-bs-target="#message-modal">
          {text}
        </Link>
      ),
      sorter: (a, b) => a.message.length - b.message.length,
    },
    {
      title: '',
      dataIndex: '',
      render: (text, record) => <></>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <Link to="#" data-bs-toggle="modal" data-bs-target="#status-modal">
          {text}
        </Link>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
  ];

  return (
    <>
      {/* Main Wrapper */}
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        {/* Header */}
        {/* <Headertwo {...props} onMenuClick={() => toggleMobileMenu()} /> */}
        {/* /Header */}
        {/* Sidebar */}
        {/* <Sidebartwo /> */}
        {/* /Sidebar */}
        <>
          {/* Page Wrapper */}
          <div className="page-wrapper">
            <div className="content container-fluid pb-0">
              {/* Notifications */}
              <div className="row">
                <div className="col-xl-9 col-md-12 d-flex space-remove-right">
                  <div className="card card-table w-100">
                    <div className="card-header">
                      <h3 className="card-titles">Notifications</h3>
                      <div className="filter-search">
                        <input
                          type="text"
                          placeholder="Find"
                          className="form-control"
                        />
                        <div className="filter-img">
                          <Link to="#">
                            <img src={Search} alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="table-create-info">
                      <div className="table-create-btn create-btn-border notification-tenant">
                        <div className="notification-text">
                          <span>Active tenant:</span>
                          <p>Bing</p>
                        </div>
                        <Link to="#">
                          Send test notification to tenant admin
                        </Link>
                        <div className="table-checkbox">
                          <label className="custom_check d-inline-flex align-items-center">
                            <input
                              type="checkbox"
                              name="active"
                              defaultChecked=""
                            />
                            Active only <span className="checkmark" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-resposnive">
                        <Table
                          pagination={{
                            total: data.length,
                            showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          }}
                          style={{ overflowX: 'auto' }}
                          columns={columns}
                          dataSource={data}
                          rowKey={record => record.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-12 d-flex notifications-space-remove-left">
                  <div className="card settings-card notifications-card w-100">
                    <div className="settings-sidebar-header">
                      <div className="settings-inner-header">
                        <h2>Select Tenant</h2>
                      </div>
                      <div className="filter-search">
                        <input
                          type="text"
                          placeholder="Find"
                          className="form-control"
                        />
                        <div className="filter-img">
                          <Link to="#">
                            <img src={Search} alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card-body settings-card-body">
                      <div className="notification-info">
                        <div className="notification-list">
                          <span>Arpin Van Lines</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Accenture</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Bridgewater</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>CB Insights</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Biovia</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Allianz</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Asset4</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Aquicore</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>CitySourced</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>CARFAX</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Alarm.com</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Bing</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>AllState Insurance Group</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Adaptive</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Chubb</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>BaleFire Global</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>Cloudspyre</span>
                          <Link to="#">Select</Link>
                        </div>
                        <div className="notification-list">
                          <span>CliniCast</span>
                          <Link to="#">Select</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Notifications */}
            </div>
          </div>
          {/* /Page Wrapper */}
        </>
        <MessageModal />
        <StatusModal />
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Notifications;
