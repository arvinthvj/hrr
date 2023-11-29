import React, { useContext } from 'react';
import { pencilIcon, permission_30 } from '../../imagepath';
import TableComponent from '../TableComponent';
import { Link } from 'react-router-dom';
import { PersonalContext } from '../personalController';
import { commonKeys, jobSecction } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Compensation = ({ informationList }) => {
  const { EditComponent, allFieldPermissionType } = useContext(PersonalContext);
  const data = [];
  informationList?.length > 0 &&
    informationList?.map(item => {
      if (item?.list_type == 'work_compensation') {
        data.push(item);
      }
    });

  const findPermission = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == jobSecction.CompensationandBonus &&
        obj.field_name == type,
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
      title: `${findLabelText('Pay_type', 'Pay type', 'Hr')}`,
      dataIndex: 'pay_type',
    },
    {
      title: `${findLabelText('Rate', 'Rate', 'Hr')}`,
      dataIndex: 'rate',
    },
    {
      title: `${findLabelText('Effective_date', 'Effective date', 'Hr')}`,
      dataIndex: 'effective_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Overtime', 'Overtime', 'Hr')}`,
      dataIndex: 'over_time',
    },
    {
      title: `${findLabelText('Change_reason', 'Change reason', 'Hr')}`,
      dataIndex: 'change_reason',
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
                EditComponent('Compensation & Bonus(es)', record)
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
      icon={permission_30}
      name={'Compensation & Bonus(es)'}
      langName={'Compensation_Bonus'}
    />
  );
};

export default Compensation;
