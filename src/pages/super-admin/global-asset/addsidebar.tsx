import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LeftAngle,
  dropdown_angel,
  upload_chair_icon,
} from '../../../components/imagepath';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { global } from '../../../assets/constants/config';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../../reduxStore/appSlice';
import { imageTypeAll, svgType } from '../../../assets/globals';
import { findLabelText } from '../../../components/commonMethod';
import { GlobalLabelText } from '../../../components/dashboardComponent/globalAssertComponent/constants';
import { Col } from 'antd';
export const AddSidebar = ({ lang, handleClick, handleListClick }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    trigger,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const [active, setActive] = useState(true);
  const [IconFile, setIconFile] = useState('');
  const [iconImage, setIconImage] = useState<any>(null);
  const [iconType, setIconType] = useState('');
  const dispatch = useDispatch();
  const [assetTypeColapse, setAssetTypeColapse] = useState(true);
  const [infoLabelColapse, setInfoLabelColapse] = useState(true);
  const onHandleSubmit = data => {
    dispatch(showLoader());
    handleImageUploadtoS3Bucket(
      IconFile,
      'image',
      Icon => {
        handleListClick(data, Icon, lang?.data, iconImage, iconType);
      },
      '',
      'gat',
    );
  };
  const onIconChange = e => {
    try {
      const file = e.target?.files[0];
      const validImg = imageTypeAll?.includes(file.type);
      const svgImg = svgType?.includes(file.type);
      if (!validImg || file.size > 2000000) {
        setValue('Upload', undefined);
        if (!validImg) {
          setError('Upload', {
            type: 'required',
            message: `Please upload valid image type.`,
          });
          setIconImage(null);
        }
        if (file.size > 2000000) {
          setIconImage(null);
          setError('Upload', {
            type: 'required',
            message: `File size must under 2MB!`,
          });
        }
      } else {
        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
          if (svgImg) {
            setValue('Upload', e.target.value);

            clearErrors(['Upload']);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
              setIconImage(reader.result);
            };
            file && setIconFile(file);
          } else if (!svgImg && img.width <= 50 && img.height <= 50) {
            setValue('Upload', e.target.value);

            clearErrors(['Upload']);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
              setIconImage(reader.result);
            };
            file && setIconFile(file);
          } else {
            setError('Upload', {
              type: 'required',
              message: `this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require under 50 x 50 size image.`,
            });
            setValue('Upload', undefined);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
              setIconImage(reader.result);
            };
            file && setIconFile(file);
          }
        };
      }
    } catch (error) {}
  };
  useEffect(() => {
    setIconFile(upload_chair_icon.split(',')[1]);
    setIconType('svg');
  }, []);
  return (
    <Col
      className={
        'col-xl-3 col-sm-12 main-space-remove-left book-right-card-team super-admin-space-remove list-manage-teams user-list-man'
      }
    >
      <form onSubmit={handleSubmit(onHandleSubmit)}>
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
                {findLabelText(
                  GlobalLabelText.Asset_type,
                  GlobalLabelText.Asset_type,
                  GlobalLabelText.Common_Values,
                )}
              </h2>
            </div>
            <div className="super-admin-settings-btn">
              <button
                className="btn super-admin-btn-primary"
                type="submit"
                disabled={Boolean(errors?.Upload)}
              >
                {findLabelText(
                  GlobalLabelText.Save,
                  GlobalLabelText.Save,
                  GlobalLabelText.Common_Values,
                )}
              </button>
              <Link
                to="#"
                onClick={handleClick}
                className="btn add-close-sidebar"
              >
                {findLabelText(
                  GlobalLabelText.Cancel,
                  GlobalLabelText.Cancel,
                  GlobalLabelText.Common_Values,
                )}
              </Link>
            </div>
          </div>
          <div className="card-body super-admin-settings-card-body">
            <div className="super-admin-table-checkbox sidebar-checkbox">
              <label className="super_admin_custom_check d-inline-flex align-items-center">
                <input
                  type="checkbox"
                  checked={active}
                  onClick={() => {
                    setActive(prev => !prev);
                  }}
                  {...register('active')}
                />
                {findLabelText(
                  GlobalLabelText.Active,
                  GlobalLabelText.Active,
                  GlobalLabelText.Common_Values,
                )}
                <span className="super_admin_checkmark" />
              </label>
            </div>
            <div className="form-group">
              <div className="settings-accordion">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded={assetTypeColapse ? 'false' : 'true'}
                        aria-controls="collapseOne"
                        onClick={() => setAssetTypeColapse(!assetTypeColapse)}
                      >
                        {findLabelText(
                          GlobalLabelText.Asset_type_name,
                          GlobalLabelText.Asset_type_name,
                          GlobalLabelText.Common_Values,
                        )}
                        <img
                          src={dropdown_angel}
                          alt="img"
                          className={`collapse-rotate-info ${
                            assetTypeColapse
                              ? 'collapse-rotate'
                              : 'collapse-norotate'
                          }`}
                        />
                      </Link>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                      style={{ display: assetTypeColapse ? 'block' : 'none' }}
                    >
                      <div className="accordion-body asset-accordion-body">
                        {lang &&
                          lang?.data?.length > 0 &&
                          lang?.data?.map((language, index) => {
                            const languageName = language?.name;
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
                                      message: `Please enter the ${languageName} name`,
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
                                          trigger(languageName);
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
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group number-form-group">
              <label>
                {findLabelText(
                  GlobalLabelText.Capacity,
                  GlobalLabelText.Capacity,
                  GlobalLabelText.Common_Values,
                )}
                <span className="token-hours">
                  {findLabelText(
                    GlobalLabelText.later_date,
                    GlobalLabelText.later_date,
                    GlobalLabelText.Common_Values,
                  )}
                </span>
              </label>
              <div className="settings-radio-btns">
                <label className="super_admin_custom_radio">
                  <input
                    type="radio"
                    defaultValue={1}
                    defaultChecked={true}
                    value={1}
                    {...register('add_capacity')}
                  />
                  <span className="super_admin_checkmark" />
                  {findLabelText(
                    GlobalLabelText.Single,
                    GlobalLabelText.Single,
                    GlobalLabelText.Common_Values,
                  )}
                </label>
                <label className="super_admin_custom_radio">
                  <input
                    type="radio"
                    defaultValue="add_multiple"
                    value={0}
                    {...register('add_capacity')}
                  />
                  <span className="super_admin_checkmark" />
                  {findLabelText(
                    GlobalLabelText.Multiple,
                    GlobalLabelText.Multiple,
                    GlobalLabelText.Common_Values,
                  )}
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>
                {findLabelText(
                  GlobalLabelText.Icon,
                  GlobalLabelText.Icon,
                  GlobalLabelText.Common_Values,
                )}
              </label>
              <div className="upload-img-icon">
                <div className="upload-icon">
                  <span>
                    {iconImage ? (
                      <img src={iconImage} alt="icon" />
                    ) : (
                      <img src={upload_chair_icon} alt="icon" />
                    )}
                  </span>
                </div>
                <div className="upload-icon-link">
                  <label>
                    {findLabelText(
                      GlobalLabelText.Upload,
                      GlobalLabelText.Upload,
                      GlobalLabelText.Common_Values,
                    )}
                    <Controller
                      name={'Upload'}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Please upload an valid icon',
                        },
                      }}
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
                    <label className="text-danger"></label>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="settings-radio-label">
                {findLabelText(
                  GlobalLabelText.Allow_canvas,
                  GlobalLabelText.Allow_canvas,
                  GlobalLabelText.Common_Values,
                )}
              </label>
              <div className="settings-radio-btns">
                <label className="super_admin_custom_radio">
                  <input
                    type="radio"
                    defaultValue={1}
                    defaultChecked={true}
                    value={1}
                    {...register('add_book')}
                  />
                  <span className="super_admin_checkmark" />
                  {findLabelText(
                    GlobalLabelText.Yes,
                    GlobalLabelText.Yes,
                    GlobalLabelText.Common_Values,
                  )}
                </label>
                <label className="super_admin_custom_radio">
                  <input
                    type="radio"
                    defaultValue="add_book_no"
                    value={0}
                    {...register('add_book')}
                  />
                  <span className="super_admin_checkmark" />
                  {findLabelText(
                    GlobalLabelText.No,
                    GlobalLabelText.No,
                    GlobalLabelText.Common_Values,
                  )}
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="settings-accordion">
                <div className="accordion" id="accordionExampleTwo">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded={infoLabelColapse ? 'false' : 'true'}
                        aria-controls="collapseTwo"
                        onClick={() => setInfoLabelColapse(!infoLabelColapse)}
                      >
                        <p>
                          {findLabelText(
                            GlobalLabelText.Additional_label,
                            GlobalLabelText.Additional_label,
                            GlobalLabelText.Common_Values,
                          )}
                          <span className="additional-info-label">
                            {findLabelText(
                              GlobalLabelText.registration_number,
                              GlobalLabelText.registration_number,
                              GlobalLabelText.Common_Values,
                            )}
                          </span>
                        </p>
                        <img
                          src={dropdown_angel}
                          alt="img"
                          className={`collapse-rotate-info ${
                            infoLabelColapse
                              ? 'collapse-rotate'
                              : 'collapse-norotate'
                          }`}
                        />
                      </Link>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExampleTwo"
                      style={{ display: infoLabelColapse ? 'block' : 'none' }}
                    >
                      <div className="accordion-body asset-accordion-body">
                        {lang &&
                          lang?.data?.length > 0 &&
                          lang?.data?.map((val, index) => {
                            const languageName = val?.name;
                            return (
                              <div className="inner-form-group" key={index}>
                                <label htmlFor="name">{languageName}</label>
                                <Controller
                                  name={`label${languageName}`}
                                  control={control}
                                  key={index}
                                  rules={{
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
                                          trigger(`label${languageName}`);
                                        }}
                                      />
                                      {errors[`label${languageName}`]
                                        ?.message ? (
                                        <label style={{ color: 'red' }}>
                                          {
                                            errors[`label${languageName}`]
                                              ?.message
                                          }
                                        </label>
                                      ) : null}
                                    </>
                                  )}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Col>
  );
};

export default AddSidebar;
