import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { emergencyIcon, pencilIcon } from '../../imagepath';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import {
  emergencyContactKeys,
  sectionNames,
} from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const Contact = () => {
  const {
    EditComponent,
    primaryList,
    allFieldPermissionType,
    isAddDisable,
    createRecordFlag,
  } = useContext(PersonalContext);

  const data = primaryList?.filter(
    (arr, index, self) => index === self.findIndex(t => t?.id === arr?.id),
  );

  const columns = [
    {
      title: `${findLabelText('Name', 'Name', 'Hr')}`,
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <>{record?.first_name + ' ' + record?.last_name}</>
      ),
    },
    {
      title: `${findLabelText('Relationship', 'Relationship', 'Hr')}`,
      dataIndex: 'relationship',
      key: 'Relationship',
    },
    {
      title: `${findLabelText('Number', 'Number', 'Hr')}`,
      dataIndex: 'contact_number',
      key: 'Number',
      render: (text, record) => (
        <>
          {record?.contact_ext ? record?.contact_ext : ''}{' '}
          {record?.contact_number ? record?.contact_number : ''}
        </>
      ),
    },
    {
      title: `${findLabelText('Email', 'Email', 'Hr')}`,
      dataIndex: 'email',
      key: 'Email',
      render: (text) => <>{text ? text : ''}</>,
    },
    {
      title: `${findLabelText('Primary_contact', 'Primary contact', 'Hr')}`,
      dataIndex: 'is_primary_contact',
      key: 'contact',
    },
    {
      title: '',
      render: (text, record) => (
        <>
          {findIndex(emergencyContactKeys.edit) && (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                  if (findIndex(emergencyContactKeys.edit) == '2') {
                    EditComponent('Emergency contact', record);
                  }
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

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.emergency_contact &&
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

  return (
    <>
      <TableComponent
        createRecordFlag={createRecordFlag}
        isAddDisable={isAddDisable}
        dataSource={data}
        columns={columns}
        icon={emergencyIcon}
        name={'Emergency contact'}
      />
    </>
  );
};

export default Contact;
