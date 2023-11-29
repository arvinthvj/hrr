import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { educationIcon, pencilIcon } from '../../imagepath';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Education = () => {
  const {
    EditComponent,
    educationList,
    updateViewDocuments,
    allFieldPermissionType,
    isAddDisable,
    createRecordFlag,
  } = useContext(PersonalContext);

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.education && obj.field_name == key,
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

  const data = educationList?.filter(
    (arr, index, self) => index === self.findIndex(t => t?.id === arr?.id),
  );

  const columns = [
    {
      title: `${findLabelText('Organisation', 'Organisation', 'Hr')}`,
      dataIndex: 'organisation',
    },
    {
      title: `${findLabelText('Level', 'Level', 'Hr')}`,
      dataIndex: 'level',
    },
    {
      title: `${findLabelText('Qualification', 'Qualification', 'Hr')}`,
      dataIndex: 'qualification_studyfield',
    },
    {
      title: `${findLabelText('From', 'From', 'Hr')}`,
      dataIndex: 'from_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('To', 'To', 'Hr')}`,
      dataIndex: 'to_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Docs', 'Docs', 'Hr')}`,
      render: (text, record) => {
        const list = record?.file_upload ? record?.file_upload.split(',') : [];
        return (
          <>
            {findIndex(commonKeys.edit) ? (
              <Link
                to={''}
                onClick={() => {
                  const obj = {
                    type: 'Education',
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
                    EditComponent('Education', record);
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
      icon={educationIcon}
      name={'Education'}
    />
  );
};

export default Education;
