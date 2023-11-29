import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { pencilIcon, visaIcon } from '../../imagepath';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Visa = () => {
  const {
    EditComponent,
    clearanceList,
    updateViewDocuments,
    updateViewNotes,
    allFieldPermissionType,
    isAddDisable,
    createRecordFlag,
  } = useContext(PersonalContext);
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.certification && obj.field_name == key,
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
  const data = clearanceList?.filter(
    (arr, index, self) => index === self.findIndex(t => t?.id === arr?.id),
  );

  const columns = [
    {
      title: `${findLabelText('Type', 'Type', 'Hr')}`,
      dataIndex: 'type',
    },
    {
      title: `${findLabelText('Number', 'Number', 'Hr')}`,
      dataIndex: 'id_number',
    },
    {
      title: `${findLabelText('Issue_country', 'Issue country', 'Hr')}`,
      dataIndex: 'issue_country',
    },
    {
      title: `${findLabelText('Issue_date', 'Issue date', 'Hr')}`,
      dataIndex: 'issue_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Expiry', 'Expiry', 'Hr')}`,
      dataIndex: 'expiry_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Status', 'Status', 'Hr')}`,
      dataIndex: 'status',
    },
    {
      title: `${findLabelText('Notes', 'Notes', 'Hr')}`,
      dataIndex: 'notes',
      render: text => {
        return text.length > 0 ? (
          <Link
            to={''}
            onClick={() => {
              const obj = {
                type: 'Clearance types',
                notes: text,
              };
              updateViewNotes(obj);
            }}
          >
            {'View'}
          </Link>
        ) : (
          <span className={'notes-empty-style'}>{'View'}</span>
        );
      },
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
                    type: 'Clearance types',
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
                    EditComponent('Clearance types', record);
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
      icon={visaIcon}
      name={'Clearance types'}
    />
  );
};

export default Visa;
