import React, { useContext } from 'react';
import { pencilIcon, permission_17 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { HR_BENEFIT_SECTION_NAME } from './constants';
import { hrBenefitKey, sectionNames } from '../../../assets/constants/config';
import { useSelector } from 'react-redux';
import { findLabelText } from '../../commonMethod';

const HealthInsurance = () => {
  const { EditComponent, allFieldPermissionType, AddComponent } =
    useContext(PersonalContext);
  const { hrBenefitsInsuranceDetails } = useSelector((state: any) => state?.hr);

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
      title: `${findLabelText('Benefit', 'Benefit', 'Hr')}`,
      dataIndex: 'name',
      key: 'name',
      className: 'data-benefit-info',
      render: text => <p>{text}</p>,
    },
    {
      title: `${findLabelText('ID_Email', 'ID/Email', 'Hr')}`,
      dataIndex: 'email',
      key: 'email',
      className: 'data-benefit-info',
      render: text => <p>{text}</p>,
    },
    {
      title: `${findLabelText('hr_Comment', 'Comment', 'Hr')}`,
      dataIndex: 'comment',
      key: 'comment',
      className: 'data-benefit-info',
      render: text => <p>{text}</p>,
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
      className: 'data-edit-pencil',
      render: (text, record) => (
        <>
          {record?.id ? (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                  findIndex(hrBenefitKey.health_insurance) == '2' &&
                    EditComponent(
                      HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE,
                      record,
                    );
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          ) : (
            <div>
              {AddComponent(
                HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE,
                true,
                1,
                false,
              )}
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        isAddDisable={findIndex(hrBenefitKey.health_insurance) ? '' : 'yes'}
        dataSource={
          findIndex(hrBenefitKey.health_insurance) == '0'
            ? []
            : hrBenefitsInsuranceDetails
        }
        columns={columns}
        icon={permission_17}
        name={HR_BENEFIT_SECTION_NAME.HEALTH_INSURANCE}
        createRecordFlag={findIndex(hrBenefitKey.health_insurance) === '2'}
      />
    </>
  );
};

export default HealthInsurance;
