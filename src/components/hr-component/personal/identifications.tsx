import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { identificationIcon, pencilIcon } from '../../imagepath';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Identifications = () => {
  const {
    EditComponent,
    identificationList,
    updateViewDocuments,
    allFieldPermissionType,
    isAddDisable,
    createRecordFlag,
  } = useContext(PersonalContext);
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.identification &&
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
  const data = identificationList?.filter(
    (arr, index, self) => index === self.findIndex(t => t?.id === arr?.id),
  );

  const columns = [
    {
      title: `${findLabelText('Type', 'Type', 'Hr')}`,
      dataIndex: 'type',
    },
    {
      title: `${findLabelText('ID_num', 'ID num', 'Hr')}`,
      dataIndex: 'id_number',
    },
    {
      title: `${findLabelText('Issue_date', 'Issue date', 'Hr')}`,
      dataIndex: 'issue_date',
      render: text => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Expiry', 'Expiry', 'Hr')}`,
      dataIndex: 'expiry_date',
      render: text => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Issue_country', 'Issue country', 'Hr')}`,
      dataIndex: 'issue_country',
    },
    {
      title: `${findLabelText('Status', 'Status', 'Hr')}`,
      dataIndex: 'status',
    },
    {
      title: `${findLabelText('File', 'File', 'Hr')}`,
      render: (text, record) => {
        const list = record?.file_upload ? record?.file_upload.split(',') : [];
        return (
          <>
            {findIndex(commonKeys.edit) ? (
              <Link
                to={''}
                onClick={() => {
                  const obj = {
                    type: 'Identification',
                    list: list,
                  };
                  updateViewDocuments(obj);
                }}
              >
                <span>{list.length}</span>
              </Link>
            ) : (
              <span>{list.length}</span>
            )}
          </>
        );
      },
    },
    {
      title: '',
      render: (text, record) => (
        <>
          {findIndex(commonKeys.edit) && (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                  if (findIndex(commonKeys.edit) == '2') {
                    EditComponent('Identification', record);
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
  return (
    <TableComponent
      createRecordFlag={createRecordFlag}
      isAddDisable={isAddDisable}
      dataSource={data}
      columns={columns}
      icon={identificationIcon}
      name={'Identification'}
    />
  );
};

export default Identifications;
