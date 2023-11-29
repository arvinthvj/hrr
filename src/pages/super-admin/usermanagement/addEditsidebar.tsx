import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LeftAngle } from '../../../components/imagepath';
import Toaster from '../../../components/toast';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postData } from '../../../services/apicall';
import {
  SuperAdminUserManagementaddUser,
  SuperAdminUserManagementdeleteUser,
  SuperAdminUserManagementeditUser,
} from '../../../services/apiurl';
import { emailschema } from '../../userManagement/schema';
import SelectField from '../../../components/selectfield/select';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootReduxProps,
  TenantDetail,
} from '../../../reduxStore/reduxInterface';
import { userManageLabel } from '../../../components/userManageComponent/constants';
import { Col } from 'antd';
import { DeleteConfirmationModal } from '../../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { LabelText } from '../../../components/dashboardComponent/constants';
type AccessLevel = {
  id: number | string;
  value: string;
};
type AddEditValidate = {
  access_Level: AccessLevel;
  name: string;
  email: string;
};
type AddEditSidebarProps = {
  handleClose: CallableFunction | any;
  editDetails: any;
  closeRightSideSection: CallableFunction;
  accessLevel: any;
  userPermissionCheck: boolean;
};
export const AddEditSidebar: React.FC<AddEditSidebarProps> = ({
  handleClose,
  editDetails,
  closeRightSideSection,
  accessLevel,
  userPermissionCheck,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<AddEditValidate>({
    resolver: yupResolver(emailschema),
  });
  const dispatch = useDispatch();
  const { tenantDetails } = useSelector((state: RootReduxProps) => state.app);
  const [active, setActive] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [accessLevelType, setAccessLevelType] = useState(
    accessLevel ? accessLevel : [],
  );
  const [resetuser, setResetUser] = useState({
    name: '',
    email: '',
    access_Level: {},
  });
  const getTenantDetails: TenantDetail | null =
    tenantDetails?.length > 0 ? tenantDetails[0] : null;
  useEffect(() => {
    setEditValues();
  }, [editDetails]);
  const setEditValues = () => {
    if (editDetails?.id) {
      clearErrors();
      setValue('email', editDetails.email);
      setActive(editDetails.status == '1' ? true : false);
      const item = accessLevelType.find(
        item => item.name === editDetails?.access_type,
      );
      setValue('access_Level', item);
      setValue('name', editDetails?.name);
    } else {
      reset(resetuser);
    }
  };
  const onSubmit = data => {
    dispatch(showLoader());
    const payLoad = {
      email: data.email,
      name: data.name,
      access_type: data?.access_Level?.value,
      status: active == true ? 1 : 0,
      org_name: getTenantDetails?.tenant_name
        ? getTenantDetails?.tenant_name?.toLowerCase()
        : '',
    };
    if (editDetails?.id) {
      payLoad['user_id'] = editDetails?.id;
    }
    postData(
      editDetails?.id
        ? SuperAdminUserManagementeditUser
        : SuperAdminUserManagementaddUser,
      payLoad,
      (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.code) {
          Toaster(res?.data?.code, res?.data?.message);
        }
        if (res?.data?.code == 200) {
          closeRightSideSection(data, editDetails?.id ? 'edit' : 'add');
        }
      },
    );
  };
  const removeLocation = () => {
    dispatch(showLoader());
    const data = {
      user_id: editDetails?.id,
    };
    postData(SuperAdminUserManagementdeleteUser, data, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code) {
        Toaster(res?.data?.code, res?.data?.message);
      }
      if (res?.data?.code == 200) {
        closeRightSideSection(editDetails?.id, 'delete');
      }
    });
  };
  return (
    <>
      <Col
        className={
          'col-xl-3 col-sm-12 main-space-remove-left book-right-card-team super-admin-space-remove list-manage-teams user-list-man'
        }
      >
        <div className="card super-admin-settings-card user-right-card">
          <div className="settings-sidebar-header">
            <div className="settings-inner-header">
              <h2>
                <Link
                  to="#"
                  className="add-close-sidebar"
                  onClick={handleClose}
                >
                  <img src={LeftAngle} alt="img" />
                </Link>{' '}
                {editDetails?.id ? '  Edit User' : ' Add User'}
              </h2>
            </div>
            <div className="super-admin-settings-btn">
              <Link
                className="btn super-admin-btn-primary"
                style={{
                  opacity: editDetails?.id && userPermissionCheck ? '0.3' : '',
                }}
                to="#"
                onClick={handleSubmit(
                  editDetails?.id && userPermissionCheck ? () => {} : onSubmit,
                )}
              >
                {editDetails?.id
                  ? userManageLabel.Save_Changes
                  : userManageLabel.Save}
              </Link>
              <Link
                to="#"
                className="btn add-close-sidebar"
                onClick={handleClose}
              >
                {userManageLabel.Cancel}
              </Link>
            </div>
          </div>
          <div className="card-body super-admin-settings-card-body">
            <div className="super-admin-table-checkbox sidebar-checkbox">
              <label className="super_admin_custom_check d-inline-flex align-items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={active}
                  onChange={() => {
                    editDetails?.id && userPermissionCheck
                      ? {}
                      : setActive(!active);
                  }}
                />
                {userManageLabel.Active}
                <span className="super_admin_checkmark" />
              </label>
            </div>
            <div className="form-group">
              <label>{userManageLabel.Name}</label>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      value={value}
                      type="text"
                      readOnly={
                        editDetails?.id && userPermissionCheck ? true : false
                      }
                      className="form-control"
                      onChange={val => {
                        onChange(val);
                        trigger('name');
                      }}
                    />
                    {errors.name?.message ? (
                      <label style={{ color: 'red' }}>
                        {errors.name?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div className="form-group">
              <label>{userManageLabel.Email}</label>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      type="text"
                      value={value}
                      readOnly={
                        editDetails?.id && userPermissionCheck ? true : false
                      }
                      className="form-control"
                      onChange={val => {
                        onChange(val);
                        trigger('email');
                      }}
                    />
                    {errors.email?.message ? (
                      <label style={{ color: 'red' }}>
                        {errors.email?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div className="form-group settings-select">
              <label htmlFor="name">{userManageLabel.Access_level}</label>
              <Controller
                name="access_Level"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <SelectField
                      bgColor={'#FFFFFF'}
                      value={accessLevelType?.filter(
                        (option: any) => option?.id == value?.id,
                      )}
                      options={accessLevelType}
                      height={'40px'}
                      onChangeValue={val => {
                        if (editDetails?.id && userPermissionCheck) {
                        } else {
                          onChange(val);
                          trigger('access_Level');
                        }
                      }}
                      placeholder="Please select..."
                    />
                    {errors?.access_Level?.value?.message ? (
                      <label style={{ color: 'red' }}>
                        {errors?.access_Level?.value?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            {editDetails?.id ? (
              <div className="form-group">
                <div className="form-group remove-user-btn">
                  <Link
                    to="#"
                    onClick={() =>
                      setDeleteOpen(userPermissionCheck ? false : true)
                    }
                    style={{ opacity: userPermissionCheck ? '0.3' : '' }}
                    className="btn"
                  >
                    {userManageLabel.Remove_user}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Col>
      <DeleteConfirmationModal
        open={deleteOpen}
        cancel={() => {
          setDeleteOpen(false);
        }}
        confirm={() => {
          removeLocation();
        }}
        header={LabelText.Remove_user}
        content={''}
        proceedButton={'Confirm and proceed'}
      />
    </>
  );
};

export default AddEditSidebar;
