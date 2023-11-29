import React, { useContext } from 'react';
import { pencilIcon, permission_16 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { useSelector } from 'react-redux';
import { HR_BENEFIT_SECTION_NAME } from './constants';
import { hrBenefitKey, sectionNames } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const GeneralBenefits = () => {
  const { EditComponent, allFieldPermissionType } = useContext(PersonalContext);
  const { hrBenefitsDetails } = useSelector((state: any) => state?.hr);

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
      className: 'data-benefit-info',
      dataIndex: 'name',
      key: 'name',
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
          {record?.id && (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                  findIndex(hrBenefitKey.general_benefits) == '2' &&
                    EditComponent(
                      HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS,
                      record,
                    );
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        isAddDisable={findIndex(hrBenefitKey.general_benefits) ? '' : 'yes'}
        dataSource={
          findIndex(hrBenefitKey.general_benefits) == '0'
            ? []
            : hrBenefitsDetails
        }
        columns={columns}
        icon={permission_16}
        name={HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS}
        createRecordFlag={findIndex(hrBenefitKey.general_benefits) === '2'}
      />
    </>
  );
};

export default GeneralBenefits;
