import React, { useContext, useState } from 'react';
import { pencilIcon, permission_29 } from '../../imagepath';
import TableComponent from '../TableComponent';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { commonKeys, jobSecction } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Manager = ({ informationList }) => {
  const { EditComponent, allFieldPermissionType } = useContext(PersonalContext);
  const [disableAddBtn, setDisableAddBtn] = useState(false);

  const findPermission = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj => obj.section_name == jobSecction.Managers && obj.field_name == type,
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
  const data = [];
  informationList?.length > 0 &&
    informationList?.map(item => {
      if (item?.list_type == 'work_manager') {
        data.push(item);
      }
    });
  const filteredData = data.filter(item => item.root_admin !== '');
  const columns = [
    {
      title: `${findLabelText('Name', 'Name', 'Hr')}`,
      dataIndex: 'name',
      className: 'root-manager',
      render: (text, record) => {
        if (record?.root_admin?.length > 0) {
          setDisableAddBtn(true);
          return {
            children: (
              <p style={{ position: 'absolute', top: '25%', zIndex: '999' }}>
                {record?.root_admin}
              </p>
            ),
          };
        }
        return text;
      },
    },
    {
      title: `${findLabelText('Start', 'Start', 'Hr')}`,
      dataIndex: 'start_date',
      render: (text, record) =>
        record?.root_admin?.length > 0 ? null : (
          <div>{getUserPreferedDateFormat(text)}</div>
        ),
    },
    {
      title: `${findLabelText('End', 'End', 'Hr')}`,
      dataIndex: 'end_date',
      render: (text, record) =>
        record?.root_admin?.length > 0 ? null : (
          <div>{getUserPreferedDateFormat(text)}</div>
        ),
    },
    {
      title: `${findLabelText('Job_Title', 'Job Title', 'Hr')}`,
      dataIndex: 'role',
      render: (text, record) =>
        record?.root_admin?.length > 0 ? null : <>{text}</>,
    },
    {
      title: '',
      render: (text, record) =>
        record?.root_admin?.length > 0 ? null : (
          <>
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() =>
                  findPermission(commonKeys.edit) === '2' &&
                  EditComponent('Assign a manager', record)
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
    <TableComponent
      createRecordFlag={findPermission(commonKeys.create) === '2'}
      isAddDisable={
        disableAddBtn ? 'yes' : findPermission(commonKeys.create) ? '' : 'yes'
      }
      dataSource={filteredData}
      columns={columns}
      icon={permission_29}
      name={'Manager(s)'}
      langName={'Manager_s'}
    />
  );
};

export default Manager;
