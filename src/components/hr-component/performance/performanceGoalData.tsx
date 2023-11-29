import React, { useContext, useState } from 'react';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { useSelector } from 'react-redux';
import { findLabelText } from '../../commonMethod';
import { pencilIcon, permission_19 } from '../../imagepath';
import { Link } from 'react-router-dom';
import jsonData from './data.json';
import { findIndex } from '../../../assets/plugins/fontawesome/js/v4-shims';
import { DataTable } from '../../datatable';
import { Row, Col, Card, Dropdown, Menu } from 'antd';

interface Item {
  title: string;
  category: string;
  status: string;
  daystogo: number;
  target: string;
}

const PerformanceGoalData: React.FC = () => {
  const { AddComponent, createRecordFlag,EditComponent } = useContext(PersonalContext);

  const { goaldata, totalPages, countPerPage } = jsonData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(countPerPage);

  //   const findIndex = key => {
  //     const findObj = allFieldPermissionType?.filter(
  //       obj =>
  //         obj.section_name == sectionNames.asset_details && obj.field_name == key,
  //     );
  //     let maxPermission = -Infinity;
  //     for (const item of findObj) {
  //       const permission = parseInt(item.permission, 10);
  //       if (!isNaN(permission) && permission > maxPermission) {
  //         maxPermission = permission;
  //       }
  //     }
  //     return String(maxPermission);
  //   };

  const sorting = (a, b, type) => {
    setCurrentPage(1);
    if (type == 'number') return a - b;
    else return a.localeCompare(b);
  };

  // Pagination
  const handlePageChange = page => {
    setCurrentPage(page?.current);
  };
  const columns = [
    {
      title: `${findLabelText('Title', 'Title', 'Hr')}`,
      dataIndex: 'title',
      key: 'title',
      render: text => <div className="">{text}</div>,
      sorter: (a, b) => sorting(a.title, b.title, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: `${findLabelText('Category', 'Category', 'Hr')}`,
      dataIndex: 'category',
      key: 'category',
      render: text => <div className="">{text}</div>,
      sorter: (a, b) => sorting(a.category, b.category, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
        title: `${findLabelText('Assigned to', 'Assigned to', 'Hr')}`,
        dataIndex: 'assigned_to',
        key: 'assigned_to',
        render: text => <div className="">{text}</div>,
        sorter: (a, b) => sorting(a.assigned_to, b.assigned_to, ''),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },

    {
      title: `${findLabelText('Status', 'Status', 'Hr')}`,
      dataIndex: 'status',
      key: 'status',
   render: (text, record) => (
    <span className="goal-status goal-success">
        {text}
    </span>
    

   ),
      sorter: (a, b) => sorting(a.status, b.status, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],

    },
    {
        title: `${findLabelText('Days_to_go', 'Days to go', 'Hr')}`,
        dataIndex: 'days_to_go',
        key: 'days_to_go',
        render: text => <div className="">{text}</div>,
        sorter: (a, b) => sorting(a.days_to_go, b.days_to_go, ''),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },

    {
      title: `${findLabelText('Target', 'Target', 'Hr')}`,
      dataIndex: 'target',
      key: 'target',
      render: text => <div className="">{text}</div>,
      sorter: (a, b) => sorting(a.target, b.target, ''),
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    

    {
      title: '',
      render: (text, record) => (
        <>
          {record?.id ? (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                    EditComponent(record);
                    // EditComponent(HR_GOALDATA_SECTION_NAME.GOAL_DATA, record);
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          ) : (
            <div>
              {AddComponent( true, 1, false)}
            </div>
          )}
        </>
      ),
    },
  ];
  const menu = (
    [
        { label: 'Download Report', key: 'item-1' }, // remember to pass the key prop
        { label: 'item 2', key: 'item-2' },
      ]
  );
  return (
    <>
    {/* <Col xl={7} lg={12} className="d-flex"> */}
     {/* <div className="col-xl-7 col-lg-12 d-flex">
                                <div className="card goal-card w-100">
                                    <div className="card-body">
                                        <div className="performance-card-header">
                                            <h4>
                                                Goal Data{" "}
                                                <img src="assets/img/icons/tooltip-icon.svg" alt="" />
                                            </h4>
                                            <div className="goal-table-dropdown">
                                                <div className="dropdown">
                                                    <a
                                                        href="javascript:void(0);"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="true"
                                                    >
                                                        <i className="fa fa-ellipsis" />
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="dropdown-item"
                                                            >
                                                                Download report
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="dropdown-item"
                                                            >
                                                                Download SVG
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="goal-table">
                                            <div className="table-responsive">
                                            <DataTable
        // isAddDisable={true}
        dataSource={goaldata}
        columns={columns}
        pageSize={pageSize}
          currentPage={currentPage}
          totalPage={Number(totalPages)}
          handlePageChange={handlePageChange}
        // icon={permission_19}
        // name={HR_GOALDATA_SECTION_NAME.GOAL_DATA}
        // createRecordFlag={""}
        />
                                 
                                            </div>
                                            {AddComponent(
                                                'Add a Goal',
                                                createRecordFlag,
                                            )}
                                        </div> 
                                    </div>
                                </div>
                            </div>  */}
  <Col xl={14} lg={12} className="d-flex">
    <Card className="goal-card w-100 goal_card_data">
      <div className="card-body">
        <div className="performance-card-header">
          <h4>
            Goal Data{" "}
            <img src="assets/img/icons/tooltip-icon.svg" alt="" />
          </h4>
              <div className="goal-table-dropdown">
                <div className="dropdown">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="fa fa-ellipsis" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item"
                      >
                        Download report
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item"
                      >
                        Download SVG
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
          {/* <div className="goal-table-dropdown"> */}
          {/* <Dropdown menu={{menu}} placement="bottomRight">
              <a href="javascript:void(0);" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                 ...
              </a>
            </Dropdown> */}
          {/* </div> */}
        </div>

        <div className="goal-table">
          <div className="table-responsive">
            <DataTable
              dataSource={goaldata}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPage={Number(totalPages)}
              handlePageChange={handlePageChange}
            />
          </div>
          {AddComponent(
            'Add a Goal',
            createRecordFlag,
          )}
        </div>
      </div>
    </Card>
  </Col>
    </>
  );
};

export default PerformanceGoalData;
