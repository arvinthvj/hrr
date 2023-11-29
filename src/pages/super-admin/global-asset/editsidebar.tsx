import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeftAngle, dropdown_angel } from '../../../components/imagepath';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { DeleteConfirmationModal } from '../../../components/deleteConfirmationModal/DeleteConfirmationModal';
import { global } from '../../../assets/constants/config';
import {
  GetImgaeFromS3Bucket,
  handleImageUploadtoS3Bucket,
} from '../../../services/s3Bucket';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../../reduxStore/appSlice';
import { imageTypeAll, svgType } from '../../../assets/globals';
import { AllowCanvas, Capacity } from './capacity';
import { GlobalLabelText } from '../../../components/dashboardComponent/globalAssertComponent/constants';
import { findLabelText } from '../../../components/commonMethod';
import { Col } from 'antd';
export const EditSidebar = ({
  edithandleClick,
  handleEditClick,
  editAssertData,
  handledelete,
}) => {
  const [active, setActive] = useState(editAssertData?.status || '');
  const [IconFile, setIconFile] = useState('');
  const [editBook, setEditBook] = useState<boolean>(false);
  const [iconImage, setIconImage] = useState<any>('');
  const [handledeleteid, sethandledeleteid] = useState('');
  const [iconType, setIconType] = useState('');
  const dispatch = useDispatch();
  const [assetTypeColapse, setAssetTypeColapse] = useState(true);
  const [infoLabelColapse, setInfoLabelColapse] = useState(true);
  const {
    register,
    clearErrors,
    handleSubmit,
    control,
    trigger,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const onHandleSubmit = data => {
    dispatch(showLoader());
    const id = editAssertData?.id;
    if (IconFile) {
      handleImageUploadtoS3Bucket(
        IconFile,
        'image',
        Icon => {
          handleEditClick(data, Icon, id, editBook, iconType);
        },
        '',
        'gat',
      );
    } else {
      handleEditClick(data, '', id, editBook, iconType);
    }
  };
  const onIconChange = e => {
    const file = e.target?.files[0];
    const validImg = imageTypeAll?.includes(file.type);
    const svgImg = svgType?.includes(file.type);
    if (!validImg) {
      setError('Upload', {
        type: 'required',
        message: `Please upload valid image type.`,
      });
      return false;
    }
    if (file.size > 2000000) {
      setError('Upload', {
        type: 'required',
        message: `File size must under 2MB!`,
      });
      validImage();
      return false;
    }
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (svgImg) {
        validImage();
      } else if (!svgImg && img.width <= 50 && img.height <= 50) {
        validImage();
      } else {
        validImage();
        setError('Upload', {
          type: 'required',
          message: `this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require under 50 x 50 size image.`,
        });
        return false;
      }
    };
    function validImage(data = false) {
      data && trigger('Upload');
      data && clearErrors(['Upload']);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        setIconImage(reader.result);
      };
      setIconFile(file);
    }
  };
  useEffect(() => {
    if (
      editAssertData?.name_details &&
      editAssertData?.name_details?.length > 0
    ) {
      const names = editAssertData?.name_details;
      for (const name of names) {
        setValue(`${name.language_name}`, name?.name);
      }
    }
    if (
      editAssertData?.label_details &&
      editAssertData?.label_details?.length > 0
    ) {
      const names = editAssertData?.label_details;
      for (const name of names) {
        setValue(`label${name?.language_name}`, name?.label);
      }
    }
    if (editAssertData?.allow_book_canvas)
      setEditBook(editAssertData?.allow_book_canvas == 0 ? false : true);
  }, [editAssertData]);

  return (
    <>
      <Col
        span={15}
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
                    className="edit-close-sidebar"
                    onClick={edithandleClick}
                  >
                    <img src={LeftAngle} alt="img" />
                  </Link>
                  {findLabelText(
                    GlobalLabelText.Edit_type,
                    GlobalLabelText.Edit_type,
                    GlobalLabelText.Common_Values,
                  )}
                </h2>
              </div>
              <div className="super-admin-settings-btn">
                <button
                  className="btn super-admin-btn-primary "
                  type="submit"
                  disabled={Boolean(errors?.Upload)}
                >
                  {findLabelText(
                    GlobalLabelText.Save_changes,
                    GlobalLabelText.Save_changes,
                    GlobalLabelText.Common_Values,
                  )}
                </button>
                <Link
                  to="#"
                  className="btn edit-close-sidebar"
                  onClick={edithandleClick}
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
                  <div className="accordion" id="accordionExampleThree">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <Link
                          to="#"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded={assetTypeColapse ? 'false' : 'true'}
                          aria-controls="collapseThree"
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
                        id="collapseThree"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExampleThree"
                        style={{ display: assetTypeColapse ? 'block' : 'none' }}
                      >
                        <div className="accordion-body asset-accordion-body">
                          {editAssertData?.name_details &&
                            editAssertData?.name_details?.length > 0 &&
                            editAssertData?.name_details?.map(
                              (language, index) => {
                                const languageName = language?.language_name;
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
                                            global.validationLabel
                                              .hsroleValidation.roleNameLength,
                                          message:
                                            global.validationLabel
                                              .hsroleValidation
                                              .lengthInvalidText,
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
                              },
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Capacity editAssertData={editAssertData} />
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
                        <>
                          <img src={iconImage && iconImage} alt="icon" />
                        </>
                      ) : (
                        editAssertData && (
                          <GetImgaeFromS3Bucket
                            imageFile={editAssertData?.image}
                            type={'image'}
                            FilePath={'gat'}
                          />
                        )
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
              <AllowCanvas editBook={editBook} setEditBook={setEditBook} />
              <div className="form-group">
                <div className="settings-accordion">
                  <div className="accordion" id="accordionExampleFour">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <Link
                          to="#"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded={infoLabelColapse ? 'false' : 'true'}
                          aria-controls="collapseFour"
                          onClick={() => setInfoLabelColapse(!infoLabelColapse)}
                        >
                          <p>
                            {findLabelText(
                              GlobalLabelText.AdditionalLabel,
                              GlobalLabelText.AdditionalLabel,
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
                        id="collapseFour"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExampleFour"
                        style={{ display: infoLabelColapse ? 'block' : 'none' }}
                      >
                        <div className="accordion-body asset-accordion-body">
                          {editAssertData?.label_details?.map(
                            (language, index) => {
                              const languageName = language?.language_name;
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
                                            trigger(`label${languageName}`);
                                          }}
                                        />
                                        {errors[`label${languageName}`]
                                          ?.message ? (
                                          <label
                                            htmlFor=""
                                            style={{ color: 'red' }}
                                          >
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
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="super-admin-remove-btn delete-tenant-btn">
                  <p>{GlobalLabelText.GlobalassetDelete}</p>
                  <button
                    className="btn enable"
                    data-bs-toggle={'modal'}
                    data-bs-target={'#delete-modal'}
                    onClick={e => {
                      e.preventDefault();
                      sethandledeleteid(editAssertData?.id);
                    }}
                  >
                    {findLabelText(
                      GlobalLabelText.Delete_asset_type,
                      GlobalLabelText.Delete_asset_type,
                      GlobalLabelText.Common_Values,
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Col>
      <DeleteConfirmationModal
        cancel={() => {}}
        confirm={() => {
          handledelete(handledeleteid, editAssertData?.image);
        }}
        header={findLabelText(
          GlobalLabelText.Delete_asset,
          GlobalLabelText.Delete_asset,
          GlobalLabelText.Common_Values,
        )}
        content={findLabelText(
          GlobalLabelText.GlobalDeleteContent,
          GlobalLabelText.GlobalDeleteContent,
          GlobalLabelText.Common_Values,
        )}
      />
    </>
  );
};

export default EditSidebar;
