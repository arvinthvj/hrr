import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { global } from '../../../assets/constants/config';
import { imageTypeAll, svgType } from '../../../assets/globals';
import { DeleteConfirmationModal } from '../../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { LeftAngle, dropdown_angel } from '../../../components/imagepath';
import Toaster from '../../../components/toast';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import {
  DeleteHealthSafetyRole,
  UpdateHealthSafetyRole,
} from '../../../services/apiurl';
import {
  GetImgaeFromS3Bucket,
  handleImageUploadtoS3Bucket,
} from '../../../services/s3Bucket';
import { HealthAndSafety } from '../../../reduxStore/reduxInterface';
import { GlobalRolesLabel } from '../../../components/globalRolesComponents/constants';
type EditSidebarProps = {
  edithandleClick: CallableFunction | any;
  editHealthSafetyList: any;
};
export const EditSidebar: React.FC<EditSidebarProps> = ({
  edithandleClick,
  editHealthSafetyList,
}) => {
  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [icon, setIcon] = useState('');
  const [iconImage, setIconImage] = useState<string | any>('');
  const [iconType, setIconType] = useState('');
  const { superAdminBaseURL } = useSelector(
    (state: HealthAndSafety) => state.healthAndSafety,
  );
  const [roleNameColapse, setRoleNameColapse] = useState(true);
  const onSubmit = data => {
    dispatch(showLoader());
    const successCallBack = (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        handleClear('Update', preparSuccessData(data, nameObjList));
      }
    };
    const nameObjList: any = [];
    const names = Object.keys(data).filter(name => {
      if (name !== 'Upload' && name !== 'English') {
        const nameObj = {
          name: data[name],
          language: name,
        };
        nameObjList.push(nameObj);
      }
    });
    const payload = {
      health_safety_id: editHealthSafetyList?.id,
      name: data?.English,
      name_details: nameObjList?.length > 0 ? nameObjList : [],
      icon_type: iconType,
      status: active == true ? 1 : 0,
    };
    if (icon) {
      handleImageUploadtoS3Bucket(
        icon,
        'image',
        roleUrl => {
          payload['icon'] = roleUrl;
          postData(UpdateHealthSafetyRole, payload, successCallBack);
        },
        '',
        'ghs',
      );
    } else {
      payload['icon'] = editHealthSafetyList?.health_safety_icons;
      postData(UpdateHealthSafetyRole, payload, successCallBack);
    }
  };
  const preparSuccessData = (success, details) => {
    const list = success;
    list['health_safety_icons'] = success?.icon;
    list['name_details'] = details;
    return list;
  };
  const handleClear = (type?: string, roleDetails?: any) => {
    edithandleClick(type, roleDetails);
  };
  const onIconChange = e => {
    const file = e.target?.files[0];
    const validImg = imageTypeAll?.includes(file?.type);
    const svgImg = svgType?.includes(file.type);
    if (!validImg) {
      setValue('Upload', undefined);
      setError('Upload', {
        type: 'required',
        message: `Please upload valid image type.`,
      });
      return false;
    } else if (file?.size > 2000000) {
      setValue('Upload', undefined);
      setError('Upload', {
        type: 'required',
        message: `File size must under 2MB!`,
      });
      return false;
    } else {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        if (!svgImg && img?.width > 50 && img?.height > 50) {
          setValue('Upload', e.target.value);
          setError('Upload', {
            type: 'required',
            message: `This image size is ${img.width} x ${img.height} but we require under 50 x 50 size image.`,
          });
          return false;
        } else {
          setValue('Upload', e.target.value);
          setIcon(file);
          clearErrors(['Upload']);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            setIconImage(reader.result);
          };
        }
      };
    }
  };
  const deleteHealthSafetyRole = () => {
    dispatch(showLoader());
    const successCallBack = (data, res) => {
      Toaster(res.data.code, res.data.message);
      dispatch(hideLoader());
      if (res.data.code == 200) {
        handleClear('Delete', editHealthSafetyList?.id);
      }
    };
    const payload = {
      health_safety_id: editHealthSafetyList?.id,
    };
    postData(DeleteHealthSafetyRole, payload, successCallBack);
  };
  useEffect(() => {
    if (editHealthSafetyList) {
      reset();
      setValue('English', editHealthSafetyList?.name);
      if (
        editHealthSafetyList?.name_details &&
        editHealthSafetyList?.name_details?.length > 0
      ) {
        const names = editHealthSafetyList?.name_details;
        for (const name of names) setValue(`${name.language}`, name.name);
      }
      setActive(editHealthSafetyList?.status === 0 ? false : true);
    }
  }, [editHealthSafetyList]);
  return (
    <>
      <div
        className={
          'col-xl-3 col-sm-12 main-space-remove-left book-right-card-team super-admin-space-remove list-manage-teams user-list-man'
        }
      >
        <div className="card super-admin-settings-card global-asset-right-card">
          <div className="settings-sidebar-header">
            <div className="settings-inner-header">
              <h2>
                <Link
                  to="#"
                  className="edit-close-sidebar"
                  onClick={edithandleClick}
                >
                  <img src={LeftAngle} alt="img" />
                </Link>{' '}
                {GlobalRolesLabel.Edit_Health}&amp;
                {GlobalRolesLabel.Safety_Role}
              </h2>
            </div>
            <div className="super-admin-settings-btn">
              <button
                className="btn super-admin-btn-primary"
                disabled={Boolean(errors?.Upload)}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {GlobalRolesLabel.Save_changes}
              </button>
              <Link
                to="#"
                className="btn edit-close-sidebar"
                onClick={() => {
                  handleClear();
                }}
              >
                {GlobalRolesLabel.Cancel}
              </Link>
            </div>
          </div>
          <div className="card-body super-admin-settings-card-body">
            <div className="super-admin-table-checkbox sidebar-checkbox">
              <label className="super_admin_custom_check d-inline-flex align-items-center">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => setActive(!active)}
                />
                {GlobalRolesLabel.Active}{' '}
                <span className="super_admin_checkmark" />
              </label>
            </div>
            <div className="form-group">
              <div className="settings-accordion">
                <div className="accordion" id="accordionExampleTwo">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <a
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded={roleNameColapse ? 'false' : 'true'}
                        aria-controls="collapseTwo"
                        onClick={() => setRoleNameColapse(!roleNameColapse)}
                      >
                        {GlobalRolesLabel.Role_name}
                        <img
                          src={dropdown_angel}
                          alt="img"
                          className={`collapse-rotate-info ${
                            roleNameColapse
                              ? 'collapse-rotate'
                              : 'collapse-norotate'
                          }`}
                        />
                      </a>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExampleTwo"
                      style={{ display: roleNameColapse ? 'block' : 'none' }}
                    >
                      <div className="accordion-body asset-accordion-body">
                        {editHealthSafetyList && editHealthSafetyList?.name && (
                          <div className="inner-form-group">
                            <label htmlFor="name">{'English'}</label>
                            <Controller
                              name={'English'}
                              control={control}
                              rules={{
                                required: {
                                  value: true,
                                  message:
                                    global.validationLabel.hsroleValidation
                                      .roleName,
                                },
                                maxLength: {
                                  value:
                                    global.validationLabel.hsroleValidation
                                      .roleNameLength,
                                  message:
                                    global.validationLabel.hsroleValidation
                                      .lengthInvalidText,
                                },
                                pattern: {
                                  value:
                                    global.validationLabel.hsroleValidation
                                      .roleNameValidation,
                                  message:
                                    global.validationLabel.hsroleValidation
                                      .youCanOnlyUse,
                                },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <>
                                  <input
                                    value={value}
                                    type="text"
                                    placeholder=""
                                    className="form-control"
                                    onChange={val => {
                                      onChange(val);
                                      trigger('English');
                                    }}
                                  />
                                  {errors['English']?.message ? (
                                    <label style={{ color: 'red' }}>
                                      {errors['English']?.message}
                                    </label>
                                  ) : null}
                                </>
                              )}
                            />
                          </div>
                        )}
                        {editHealthSafetyList?.name_details &&
                          editHealthSafetyList?.name_details?.length > 0 &&
                          editHealthSafetyList?.name_details?.map(
                            (language, index) => {
                              const languageName = language?.language;
                              return (
                                <div className="inner-form-group" key={index}>
                                  <label htmlFor="name">{languageName}</label>
                                  <Controller
                                    name={`${languageName}`}
                                    control={control}
                                    key={index}
                                    rules={{
                                      required: {
                                        value: true,
                                        message:
                                          global.validationLabel
                                            .hsroleValidation.roleName,
                                      },
                                      maxLength: {
                                        value:
                                          global.validationLabel
                                            .hsroleValidation.roleNameLength,
                                        message:
                                          global.validationLabel
                                            .hsroleValidation.lengthInvalidText,
                                      },
                                      pattern: {
                                        value:
                                          global.validationLabel
                                            .hsroleValidation
                                            .roleNameValidation,
                                        message:
                                          global.validationLabel
                                            .hsroleValidation.youCanOnlyUse,
                                      },
                                    }}
                                    render={({
                                      field: { value, onChange },
                                    }) => (
                                      <>
                                        <input
                                          value={value}
                                          type="text"
                                          placeholder=""
                                          className="form-control"
                                          onChange={val => {
                                            onChange(val);
                                            trigger(`${languageName}`);
                                          }}
                                        />
                                        {errors[languageName]?.message ? (
                                          <label style={{ color: 'red' }}>
                                            {errors[languageName]?.message}
                                          </label>
                                        ) : null}
                                      </>
                                    )}
                                  />
                                </div>
                              );
                            },
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>{GlobalRolesLabel.Icon}</label>
              <div className="upload-img-icon">
                <div className="upload-icon">
                  <span>
                    {iconImage != '' ? (
                      <img
                        src={
                          iconImage
                            ? iconImage
                            : superAdminBaseURL +
                              editHealthSafetyList?.health_safety_icons
                        }
                        alt="icon"
                      />
                    ) : (
                      <GetImgaeFromS3Bucket
                        imageFile={editHealthSafetyList?.health_safety_icons}
                        type={'image'}
                        FilePath={'ghs'}
                      />
                    )}
                  </span>
                </div>
                <div className="upload-icon-link">
                  <label>
                    {' '}
                    {GlobalRolesLabel.Upload}
                    <Controller
                      name={'Upload'}
                      control={control}
                      render={({ field: { value } }) => (
                        <>
                          <input
                            value={value}
                            type="file"
                            accept=".png,.svg,.jpg,.jpeg"
                            placeholder=""
                            className="form-control"
                            onChange={onIconChange}
                          />
                          {errors.Upload?.message ? (
                            <label style={{ color: 'red' }}>
                              {errors.Upload?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="super-admin-remove-btn delete-tenant-btn">
                <p>{GlobalRolesLabel.Delete_Des}</p>
                <Link
                  className="btn enable"
                  to="#"
                  data-bs-toggle={'modal'}
                  data-bs-target={'#delete-modal'}
                >
                  {GlobalRolesLabel.Delete_H}&amp;{GlobalRolesLabel.S_Role}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        cancel={() => {}}
        confirm={() => {
          deleteHealthSafetyRole();
        }}
        header={GlobalRolesLabel.DeleteHeader}
        content={GlobalRolesLabel.Content}
      />
    </>
  );
};
export default EditSidebar;
