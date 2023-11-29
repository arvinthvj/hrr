import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { pencilIcon, vaccinationIcon } from '../../imagepath';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { commonKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Vaccination = () => {
  const {
    EditComponent,
    vaccinationList,
    updateViewDocuments,
    allFieldPermissionType,
    isAddDisable,
    createRecordFlag,
  } = useContext(PersonalContext);
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.vaccination && obj.field_name == key,
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
  const data = vaccinationList?.filter(
    (arr, index, self) => index === self.findIndex(t => t?.id === arr?.id),
  );

  const columns = [
    {
      title: `${findLabelText('Vaccination_type', 'Vaccination type', 'Hr')}`,
      dataIndex: 'vaccination_type',
    },
    {
      title: `${findLabelText('Date', 'Date', 'Hr')}`,
      dataIndex: 'vaccinated_date',
      render: (text) => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText(
        'Vaccination_number',
        'Vaccination number',
        'Hr',
      )}`,
      dataIndex: 'vaccination_number',
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
                    type: 'Vaccination',
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
            <div
              className="edit-pencil-icon"
              onClick={() => {
                if (findIndex(commonKeys.edit) == '2') {
                  EditComponent('Vaccination status', record);
                }
              }}
            >
              <Link to="#">
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
      icon={vaccinationIcon}
      name={'Vaccination status'}
    />
  );
};

export default Vaccination;
