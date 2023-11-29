import React, { useContext } from 'react';
import { pencilIcon, permission_18 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { useSelector } from 'react-redux';
import { HR_BENEFIT_SECTION_NAME } from './constants';
import { hrBenefitKey, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Pension = () => {
  const { EditComponent, AddComponent, allFieldPermissionType } =
    useContext(PersonalContext);
  const { hrPensionDetails } = useSelector((state: any) => state?.hr);

  const findIndex = key => {
    const findObj = allFieldPermissionType?.filter(
      obj =>
        obj.section_name == sectionNames.benefits_details &&
        obj.field_name == key,
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
      title: `${findLabelText('Provider', 'Provider', 'Hr')}`,
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: `${findLabelText('ID', 'ID', 'Hr')}`,
      dataIndex: 'id_number',
      key: 'id_number',
    },
    {
      title: `${findLabelText('Effective_from', 'Effective from', 'Hr')}`,
      dataIndex: 'effective_from',
      key: 'effective_from',
      render: text => <div>{getUserPreferedDateFormat(text)}</div>,
    },

    {
      title: `${findLabelText('Employee_pays', 'Employee pays', 'Hr')}`,
      dataIndex: 'employee_pays',
      key: 'employee_pays',
    },
    {
      title: `${findLabelText('Company_pays', 'Company pays', 'Hr')}`,
      dataIndex: 'company_pays',
      key: 'company_pays',
    },
    {
      title: `${findLabelText('Link', 'Link', 'Hr')}`,
      dataIndex: 'link',
      key: 'link',
      render: text => (
        <Link to={''} onClick={() => window.open(text, '_blank')}>
          Link
        </Link>
      ),
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
                  findIndex(hrBenefitKey.general_Pension) == '2' &&
                    EditComponent(HR_BENEFIT_SECTION_NAME.PENSION, record);
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          ) : (
            <div>
              {AddComponent(HR_BENEFIT_SECTION_NAME.PENSION, true, 1, false)}
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        isAddDisable={findIndex(hrBenefitKey.general_Pension) ? '' : 'yes'}
        dataSource={
          findIndex(hrBenefitKey.general_Pension) == '0' ? [] : hrPensionDetails
        }
        columns={columns}
        icon={permission_18}
        name={HR_BENEFIT_SECTION_NAME.PENSION}
        createRecordFlag={findIndex(hrBenefitKey.general_Pension) === '2'}
      />
    </>
  );
};

export default Pension;
