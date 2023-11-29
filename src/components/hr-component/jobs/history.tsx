import React, { useContext } from 'react';
import { pencilIcon, permission_27 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, jobSecction } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const History = ({ informationList }) => {
  const { EditComponent, allFieldPermissionType } = useContext(PersonalContext);
  const data = [];
  informationList?.length > 0 &&
    informationList?.map(item => {
      if (item?.list_type == 'work_history') {
        data.push(item);
      }
    });

  const findPermission = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == jobSecction.workhistory && obj.field_name == type,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };

  const columns = [
    {
      title: `${findLabelText('Job_Title', 'Job Title', 'Hr')}`,
      dataIndex: 'role',
    },
    {
      title: `${findLabelText('Grade', 'Grade', 'Hr')}`,
      dataIndex: 'grade',
    },
    {
      title: `${findLabelText('Status', 'Status', 'Hr')}`,
      dataIndex: 'work_status',
    },
    {
      title: `${findLabelText('Department', 'Department', 'Hr')}`,
      dataIndex: 'department',
    },
    {
      title: `${findLabelText('Position_start', 'Position start', 'Hr')}`,
      dataIndex: 'position_start',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Position_end', 'Position end', 'Hr')}`,
      dataIndex: 'position_end',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: '',
      render: (text, record) => (
        <>
          <div className="edit-pencil-icon">
            <Link
              to=""
              onClick={() =>
                findPermission(commonKeys.edit) === '2' &&
                EditComponent('Work History', record)
              }
            >
              <img src={pencilIcon} alt="" />
            </Link>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <TableComponent
        createRecordFlag={findPermission(commonKeys.create) === '2'}
        isAddDisable={findPermission(commonKeys.create) ? '' : 'yes'}
        dataSource={data}
        columns={columns}
        icon={permission_27}
        name={'Work History'}
      />
    </>
  );
};

export default History;
