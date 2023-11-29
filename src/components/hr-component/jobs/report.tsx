import React, { useContext } from 'react';
import { pencilIcon, permission_29 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, jobSecction } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const Report = ({ informationList }) => {
  const { EditComponent, allFieldPermissionType } = useContext(PersonalContext);
  const data = [];
  informationList?.length > 0 &&
    informationList?.map(item => {
      if (item?.list_type == 'work_direct_reports') {
        data.push(item);
      }
    });

  const findPermission = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == jobSecction.DirectReport && obj.field_name == type,
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
      title: `${findLabelText('Name', 'Name', 'Hr')}`,
      dataIndex: 'name',
    },
    {
      title: `${findLabelText('Job_Title', 'Job Title', 'Hr')}`,
      dataIndex: 'role',
    },
    {
      title: '',
      render: (text, record) => (
        <>
          <div className="edit-pencil-icon">
            <Link
              to="#"
              onClick={() =>
                findPermission(commonKeys.edit) === '2' &&
                EditComponent('Direct report(s)', record)
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
      isAddDisable={findPermission(commonKeys.create) ? '' : 'yes'}
      dataSource={data}
      columns={columns}
      icon={permission_29}
      name={'Direct report(s)'}
      langName={'Direct_report_s'}
    />
  );
};

export default Report;
