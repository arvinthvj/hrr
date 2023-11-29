import React, { useContext } from 'react';
import { pencilIcon, permission_19 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { useSelector } from 'react-redux';
import { HR_ASSETS_SECTION_NAME } from './constants';
import { hrAssets, sectionNames } from '../../../assets/constants/config';
import { findLabelText, getUserPreferedDateFormat } from '../../commonMethod';

const Assets = () => {
  const {
    EditComponent,
    AddComponent,
    allFieldPermissionType,
    updateViewDocuments,
  } = useContext(PersonalContext);
  const { hrAssetsDetails } = useSelector((state: any) => state?.hr);

  const findIndex = key => {
    const findObj = allFieldPermissionType?.filter(
      obj =>
        obj.section_name == sectionNames.asset_details && obj.field_name == key,
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
      title: `${findLabelText('Category', 'Category', 'Hr')}`,
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: `${findLabelText('Description', 'Description', 'Hr')}`,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: `${findLabelText('Serial_no', 'Serial no.', 'Hr')}`,
      dataIndex: 'serial_no',
      key: 'serial_no',
    },
    {
      title: `${findLabelText('Loaned', 'Loaned', 'Hr')}`,
      dataIndex: 'loaned_date',
      key: 'loaned_date',
      render: text => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Returned', 'Returned', 'Hr')}`,
      dataIndex: 'returned_date',
      key: 'returned_date',
      render: text => <div>{getUserPreferedDateFormat(text)}</div>,
    },
    {
      title: `${findLabelText('Cost', 'Cost', 'Hr')}`,
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: `${findLabelText('Notes', 'Notes', 'Hr')}`,
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: `${findLabelText('File', 'File', 'Hr')}`,

      dataIndex: 'file_upload',
      key: 'file_upload',
      render: (text, record) => {
        const list = record?.file_upload ? record?.file_upload.split(',') : [];
        return (
          <Link
            to={''}
            onClick={() => {
              const obj = {
                type: 'Assets',
                list: list,
              };
              updateViewDocuments(obj);
            }}
          >
            <span>{list.length}</span>
          </Link>
        );
      },
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
                  findIndex(hrAssets.asset) == '2' &&
                    EditComponent(HR_ASSETS_SECTION_NAME.ASSETS, record);
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          ) : (
            <div>
              {AddComponent(HR_ASSETS_SECTION_NAME.ASSETS, true, 1, false)}
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TableComponent
        isAddDisable={findIndex(hrAssets.asset) ? '' : 'yes'}
        dataSource={findIndex(hrAssets.asset) == '0' ? [] : hrAssetsDetails}
        columns={columns}
        icon={permission_19}
        name={HR_ASSETS_SECTION_NAME.ASSETS}
        createRecordFlag={findIndex(hrAssets.asset) === '2'}
      />
    </>
  );
};

export default Assets;
