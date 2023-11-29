import React, { useContext } from 'react';
import { pencilIcon, permission_13 } from '../../imagepath';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent';
import { PersonalContext } from '../personalController';
import { PrefferedConfigurationLabel } from './constants';
import { useSelector } from 'react-redux';
import {
  hrPereferenceKeys,
  sectionNames,
} from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const DefaultWorkspace = () => {
  const { EditComponent, isAddDisable, AddComponent, allFieldPermissionType } =
    useContext(PersonalContext);
  const { preferenceDetails } = useSelector((state: any) => state?.hr);

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.preference_details &&
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
      title: `${findLabelText('Asset', 'Asset', 'Hr')}`,
      dataIndex: 'Assest',
      key: 'Assest',
      className: 'data-assest',
      render: (text, record) => (
        <p>
          <>{record?.default_workspace_name || ''}</>
        </p>
      ),
    },

    {
      title: `${findLabelText('Location', 'Location', 'Hr')}`,
      dataIndex: 'Location',
      key: 'Location',
      className: 'data-assest-location',
      render: (text, record) => (
        <p>
          <>{record?.default_workspace_location || ''}</>
        </p>
      ),
    },
    {
      title: '',
      className: 'data-edit-pencil',
      render: (text, record) => (
        <>
          {preferenceDetails[0]?.default_workspace_location ? (
            <div className="edit-pencil-icon">
              <Link
                to="#"
                onClick={() => {
                  findIndex(hrPereferenceKeys.workspace) == '2' &&
                    EditComponent(
                      PrefferedConfigurationLabel.DEFAULT_WORKSPACE,
                      record,
                    );
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            </div>
          ) : (
            <div>
              {' '}
              {AddComponent(
                PrefferedConfigurationLabel.DEFAULT_WORKSPACE,
                true,
                1,
                true,
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
        isAddDisable={isAddDisable}
        dataSource={
          findIndex(hrPereferenceKeys.workspace) == '0' ? [] : preferenceDetails
        }
        columns={columns}
        icon={permission_13}
        name={PrefferedConfigurationLabel.DEFAULT_WORKSPACE}
        isPreference={true}
      />
    </>
  );
};

export default DefaultWorkspace;
