import React, { useContext } from 'react';
import {
  permissionEye,
  permissionLock,
  permissionPencil,
  permissionUnLock,
} from '../../imagepath';
import { Link } from 'react-router-dom';
import { selectedPermission } from '../../../assets/constants/config';
import { HRSettingsContext } from '../../context/context';
import { findLabelText } from '../../commonMethod';

interface PermissionSectionHeaderProps {
  image: string;
  title: string;
  showPermissionOpt?: boolean;
  changeAllPermission: CallableFunction;
}

export const PermissionSectionHeader: React.FC<
  PermissionSectionHeaderProps
> = ({ image, title, showPermissionOpt, changeAllPermission }) => {
  return (
    <div className="permission-details-header-info">
      <div className="permission-details-header">
        <h4>
          <img src={image} alt="" />
          {title}
        </h4>
      </div>
      <div className="permission-details-right">
        {showPermissionOpt && (
          <ul className="nav permission-nav-list">
            <li>
              {findLabelText(
                'Set_all_fields_to',
                'Set all fields to:',
                'HR_Management',
              )}
            </li>
            <li>
              <Link
                onClick={() => changeAllPermission(selectedPermission.lock)}
                to={''}
              >
                <img src={permissionUnLock} alt="" />
              </Link>
            </li>
            <li>
              <Link
                onClick={() => changeAllPermission(selectedPermission.view)}
                to={''}
              >
                <img src={permissionEye} alt="" />
              </Link>
            </li>
            <li>
              <Link
                onClick={() => changeAllPermission(selectedPermission.edit)}
                to={''}
              >
                <img src={permissionPencil} alt="" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

interface PermissionListProps {
  option: {
    id: number;
    field_name: string;
    field_label: string;
    permission: number;
  };
  onChangePermission: CallableFunction;
  permissionKey: any;
}

export const PermissionList: React.FC<PermissionListProps> = ({
  option,
  onChangePermission,
  permissionKey,
}) => {
  return (
    <tr>
      <td style={{ textTransform: 'capitalize' }}>{option.field_label}</td>
      <td className="text-center">
        {permissionKey == 0
          ? `${findLabelText('No_access', 'No access', 'HR_Management')}`
          : permissionKey == 1
          ? `${findLabelText('View_access', 'View access', 'HR_Management')}`
          : `${findLabelText('Edit_access', 'Edit access', 'HR_Management')}`}
      </td>
      <td className="text-end">
        <ul className="nav permission-nav-list">
          <li>
            <Link
              onClick={() => onChangePermission(selectedPermission.lock)}
              to={''}
              className={permissionKey == 0 ? 'active' : ''}
            >
              <img
                src={permissionKey == 0 ? permissionLock : permissionUnLock}
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link
              onClick={() => onChangePermission(selectedPermission.view)}
              to={''}
              className={permissionKey == 1 ? 'active' : ''}
            >
              <img src={permissionEye} alt="" />
            </Link>
          </li>
          <li>
            <Link
              onClick={() => onChangePermission(selectedPermission.edit)}
              to={''}
              className={permissionKey == 2 ? 'active' : ''}
            >
              <img src={permissionPencil} alt="" />
            </Link>
          </li>
        </ul>
      </td>
    </tr>
  );
};

interface PermissionSectionProps {
  image: string;
  title: string;
  list: Array<any>;
  updatePermission: CallableFunction;
}
export const PermissionSection: React.FC<PermissionSectionProps> = ({
  image,
  title,
  list,
  updatePermission,
}) => {
  const { permissionGroupAccess } = useContext(HRSettingsContext);

  const changePermission = (type: string, index: number) => {
    const getList = [...list];
    permissionGroupAccess == 1
      ? (getList[index].permission_primay = type)
      : permissionGroupAccess == 2
      ? (getList[index].permission_org = type)
      : permissionGroupAccess == 3
      ? (getList[index].permission_dr = type)
      : permissionGroupAccess == 4
      ? (getList[index].permission_re = type)
      : (getList[index].permission = type);
    updatePermission(getList);
  };

  const changeAllPermission = (type: string) => {
    const getList = [...list];
    permissionGroupAccess == 1
      ? getList.map(opt => (opt['permission_primay'] = type))
      : permissionGroupAccess == 2
      ? getList.map(opt => (opt['permission_org'] = type))
      : permissionGroupAccess == 3
      ? getList.map(opt => (opt['permission_dr'] = type))
      : permissionGroupAccess == 4
      ? getList.map(opt => (opt['permission_re'] = type))
      : getList.map(opt => (opt['permission'] = type));
    updatePermission(getList);
  };

  return (
    <div className="permission-details">
      <PermissionSectionHeader
        image={image}
        title={title}
        showPermissionOpt
        changeAllPermission={changeAllPermission}
      />

      <div className="permission-details-table">
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {list.map((permissions, i) => {
                return (
                  <PermissionList
                    option={permissions}
                    permissionKey={
                      permissionGroupAccess == 1
                        ? permissions.permission_primay
                        : permissionGroupAccess == 2
                        ? permissions.permission_org
                        : permissionGroupAccess == 3
                        ? permissions.permission_dr
                        : permissionGroupAccess == 4
                        ? permissions.permission_re
                        : permissions.permission
                    }
                    key={i}
                    onChangePermission={t => changePermission(t, i)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
