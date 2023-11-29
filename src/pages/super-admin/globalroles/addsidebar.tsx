import React from 'react';
import { Link } from 'react-router-dom';
import {
  LeftAngle,
  dropdown_angel,
  upload_plus_icon,
} from '../../../components/imagepath';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../../components/toast';
import { useEffect } from 'react';
import { AddHealthSafetyRole, GetLanguageList } from '../../../services/apiurl';
import { useState } from 'react';
import { postData } from '../../../services/apicall';
import { postData as postValueData } from '../../../services/apiservice';
import { global } from '../../../assets/constants/config';
import { setRoleLanguageList } from '../../../reduxStore/superAdmin/healthAndSafetySlice';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { imageTypeAll, svgType } from '../../../assets/globals';
import { GlobalRolesLabel } from '../../../components/globalRolesComponents/constants';
type AddSidebarProps = {
  handleClick: CallableFunction | any;
};
export const AddSidebar: React.FC<AddSidebarProps> = ({ handleClick }) => {
  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [healthSafetyLanguageList, setHealthSafetyLanguageList] = useState([]);
  const [active, setActive] = useState(true);
  const [icon, setIcon] = useState<string | any>('');
  const [iconImage, setIconImage] = useState<string | any>('');
  const [iconType, setIconType] = useState('');
  const [roleNameColapse, setRoleNameColapse] = useState(true);
  const onSubmit = data => {
    dispatch(showLoader());
    const successCallBack = (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        handleClear('Add', preparSuccessData(data, nameObjList));
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
    handleImageUploadtoS3Bucket(
      icon,
      'image',
      roleUrl => {
        const payload = {
          name: data?.English,
          name_details: nameObjList?.length > 0 ? nameObjList : [],
          icon: roleUrl,
          icon_type: iconType,
          status: active == true ? 1 : 0,
        };
        postData(AddHealthSafetyRole, payload, successCallBack);
      },
      '',
      'ghs',
    );
  };
  const preparSuccessData = (success, details) => {
    const list = success;
    list['health_safety_icons'] = success?.icon;
    list['name_details'] = details;
    return list;
  };
  const handleClear = (type?: string, roleDetails?: any) => {
    handleClick(type, roleDetails);
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
            setIconImage(reader?.result);
          };
        }
      };
    }
  };
  const getLanguageList = () => {
    dispatch(showLoader());
    postValueData(GetLanguageList)
      .then(res => {
        dispatch(hideLoader());
        if (res?.code == 200) {
          setHealthSafetyLanguageList(res?.data);
          dispatch(setRoleLanguageList(res?.data));
        } else {
          dispatch(hideLoader());
        }
      })
      .catch(err => {});
  };
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  useEffect(() => {
    const file = dataURLtoFile(upload_plus_icon, 'upload-plus-icon.svg');
    file && setIcon(file);
    getLanguageList();
  }, []);
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
                  className="add-close-sidebar"
                  onClick={handleClick}
                >
                  <img src={LeftAngle} alt="img" />
                </Link>{' '}
                {GlobalRolesLabel.Add_Health}&amp;{GlobalRolesLabel.Safety_Role}
              </h2>
            </div>
            <div className="super-admin-settings-btn">
              <button
                className="btn super-admin-btn-primary"
                disabled={Boolean(errors?.Upload)}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {GlobalRolesLabel.Save}
              </button>
              <Link
                to="#"
                className="btn add-close-sidebar"
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
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <a
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded={roleNameColapse ? 'false' : 'true'}
                        aria-controls="collapseOne"
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
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                      style={{ display: roleNameColapse ? 'block' : 'none' }}
                    >
                      <div className="accordion-body asset-accordion-body">
                        {healthSafetyLanguageList &&
                          healthSafetyLanguageList?.length > 0 &&
                          healthSafetyLanguageList?.map(
                            (language: any, index) => {
                              const languageName: string = language?.name;
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
                    <img
                      src={iconImage ? iconImage : upload_plus_icon}
                      alt="icon"
                    />
                  </span>
                </div>
                <div className="upload-icon-link">
                  <label>
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
                            className="bg-white"
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
          </div>
        </div>
      </div>
    </>
  );
};
export default AddSidebar;
