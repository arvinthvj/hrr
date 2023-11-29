import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { global } from '../../../assets/constants/config';
import { postData } from '../../../services/apicall';
import { postDatawithtoken } from '../../../services/apiservice';
import {
  addGlobalSetting,
  globalEnvironmentList,
  uploadFileApi,
} from '../../../services/apiurl';
import * as Yup from 'yup';
import Toaster from '../../../components/toast';
import { fileType, imageTypeAll } from '../../../assets/globals';
import {
  hideLoader,
  setBottomCompLogo,
  showLoader,
} from '../../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import { Pdf, image_preview } from '../../../components/imagepath';
import {
  getImageFroms3Bucket,
  handleImageUploadtoS3Bucket,
  setSecretValueInKeyVault,
} from '../../../services/s3Bucket';
import { GlobalEnvironmentData } from '../../../components/context/context';
import UkFile from './ukFile';
import AuFile from './auFile';
import UsFile from './usFile';
import { Col, Row } from 'antd';
import { GlobalEnvironmentLabel } from '../../../components/globalEnvironmentComponent/constants';
const GlobalEnvironment = props => {
  const [menu, setMenu] = useState(false);
  const [imgType, setIconType] = useState<any>('');
  const [imageerror, setImageerror] = useState({ status: {}, error: '' });
  const [showFile, setShowFile] = useState({
    hyperlink: '',
    uk: '',
    au: '',
    us: '',
  });
  const [success, setSuccess] = useState<any>(
    { ukStatus: false, uk: '' },
    { auStatus: false, au: '' },
    { usStatus: false, us: '' },
  );
  const [imageCollection, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL: any = '';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setShowFile((setShowFile: any) => {
          return {
            ...setShowFile,
            hyperlink: reader.result,
          };
        });
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    const validImg: any = imageTypeAll.find(image => image === file.type);
    if (!validImg) {
      setImageerror({
        status: true,
        error: 'Please upload valid image type like as (png, jpeg and svg)',
      });
      ref.current.value = '';
      return false;
    } else {
      setIconType(validImg?.name);
      setImageerror({
        status: false,
        error: '',
      });
      handleImageUploadtoS3Bucket(
        file,
        'image',
        data => {
          setImage(data);
        },
        '',
        'ges',
      );
      getBase64(file)
        .then(result => {
          file['base64'] = result;
          setPreviewImage(file.base64.split(',')[1]);
        })
        .catch(err => {});
    }
  };
  const nameschema = Yup.object().shape({
    name: Yup.string()
      .required(global.validationLabel.userManagement.nameRequired)
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(30)
      .trim(),
  });
  interface validate {
    name: string;
  }
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<validate>({
    resolver: yupResolver(nameschema),
  });
  const onSubmit = values => {
    dispatch(showLoader());
    const payload = {
      name: values.name,
      image_icon: imageCollection,
      icon_type: imgType,
    };
    postData(addGlobalSetting, payload, (data, res) => {
      dispatch(hideLoader());
      dispatch(setBottomCompLogo(data?.image_icon));
      setSecretValueInKeyVault(
        `${process?.env?.REACT_APP_BottomLogo_SecretId}`,
        data?.image_icon,
        a => {},
      );
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == 200) {
        listAPI();
      }
    });
  };
  const clearData = () => {
    reset({ name: '' });
    ref.current.value = '';
    setImageerror({ status: {}, error: '' });
    setShowFile(setShowFile => {
      return {
        ...setShowFile,
        hyperlink: '',
      };
    });
  };
  const uploadFile = (e, values) => {
    dispatch(showLoader());
    const file = e.target.files[0];
    const formData = new FormData();
    const valiedFile = fileType.includes(file.type);
    if (!valiedFile) {
      Toaster('error', ' Please upload pdf file only');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toaster('error', 'Pdf file must smaller than 2MB!');
      return false;
    }
    handleImageUploadtoS3Bucket(
      file,
      'image',
      data => {
        // let formData = "";
        if (values == 'us_file') {
          formData.append('us_file', data);
        }
        if (values == 'uk_file') {
          formData.append('uk_file', data);
        }
        if (values == 'au_file') {
          formData.append('au_file', data);
        }
        postDatawithtoken(uploadFileApi, formData)
          .then(res => {
            if (res.data.code == 200) {
              if (values == 'us_file') {
                setSuccess(success => {
                  return {
                    ...success,
                    usStatus: true,
                    us: values,
                  };
                });
              }
              if (values == 'uk_file') {
                setSuccess(success => {
                  return {
                    ...success,
                    ukStatus: true,
                    uk: values,
                  };
                });
              }
              if (values == 'au_file') {
                setSuccess(success => {
                  return {
                    ...success,
                    auStatus: true,
                    au: values,
                  };
                });
              }

              listAPI();
            }
            dispatch(hideLoader());
            Toaster(res?.data?.code, res?.data?.message);
          })
          .catch(err => {});
      },
      '',
      'ges',
    );
  };
  const listAPI = () => {
    const payload = {};
    postData(globalEnvironmentList, payload, (res, data) => {
      const globalsettings = res.globalsettings;
      for (let i = 0; i < globalsettings?.length; i++) {
        if (globalsettings[i].file_type == 'hyperlink') {
          setValue('name', globalsettings[i].name);
          getImageFroms3Bucket(
            globalsettings[i].image_icon,
            'image',
            data => {
              setShowFile(setShowFile => {
                return {
                  ...setShowFile,
                  hyperlink: data,
                };
              });
            },
            false,
            'ges',
          );
        }
        if (globalsettings[i].file_type == 'au') {
          getImageFroms3Bucket(
            globalsettings[i].name,
            'image',
            data => {
              setShowFile(setShowFile => {
                if (globalsettings[i].name == '') {
                  return {
                    ...setShowFile,
                    au: '',
                  };
                }
                return {
                  ...setShowFile,
                  au: data,
                };
              });
            },
            false,
            'ges',
          );
        }
        if (globalsettings[i].file_type == 'uk') {
          getImageFroms3Bucket(
            globalsettings[i].name,
            'image',
            data => {
              setShowFile(setShowFile => {
                if (globalsettings[i].name == '') {
                  return {
                    ...setShowFile,
                    uk: '',
                  };
                }
                return {
                  ...setShowFile,
                  uk: data,
                };
              });
            },
            false,
            'ges',
          );
        }
        if (globalsettings[i].file_type == 'us') {
          getImageFroms3Bucket(
            globalsettings[i].name,
            'image',
            data => {
              setShowFile(setShowFile => {
                if (globalsettings[i].name == '') {
                  return {
                    ...setShowFile,
                    us: '',
                  };
                }
                return {
                  ...setShowFile,
                  us: data,
                };
              });
            },
            false,
            'ges',
          );
        }
      }
    });
  };
  useEffect(() => {
    listAPI();
  }, []);
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <>
          <div className="page-wrapper">
            <div className="content container-fluid pb-0">
              <Row>
                <Col className="col-xl-9 col-sm-12 d-flex settings-table main-space-remove">
                  <div className="card card-table w-100 environment-card">
                    <div className="card-header">
                      <h3 className="card-titles">
                        {GlobalEnvironmentLabel.environmentSetting}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-9 col-md-12">
                          <div className="environment-info">
                            <form>
                              <div className="hyper-link-div">
                                <div>
                                  <div className="form-group hyperlink-form-group">
                                    <label>
                                      {GlobalEnvironmentLabel.PoweredBy}
                                    </label>
                                    <Controller
                                      name="name"
                                      control={control}
                                      render={({
                                        field: { value, onChange },
                                      }) => (
                                        <>
                                          <input
                                            value={value}
                                            type="text"
                                            className="form-control"
                                            placeholder="Example:(PMO Office)"
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
                                  <div className="pb-4">
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="imgInp"
                                      onChange={handleFileInputChange}
                                      ref={ref}
                                    />
                                    {imageerror.status ? (
                                      <p style={{ color: 'red' }}>
                                        {imageerror.error}
                                      </p>
                                    ) : (
                                      <p></p>
                                    )}
                                  </div>
                                </div>
                                <div className="upload-icon upload-icon-img">
                                  <span>
                                    <img
                                      src={
                                        showFile.hyperlink
                                          ? showFile.hyperlink
                                          : image_preview
                                      }
                                      alt="icon"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="form-group environment-btns">
                                <button
                                  className="btn btn-primary"
                                  onClick={handleSubmit(onSubmit)}
                                >
                                  {GlobalEnvironmentLabel.Save}
                                </button>
                                <Link
                                  to="#"
                                  className="btn"
                                  onClick={clearData}
                                >
                                  {GlobalEnvironmentLabel.Cancel}
                                </Link>
                              </div>
                              <GlobalEnvironmentData.Provider
                                value={{
                                  success: success,
                                  uploadFile: uploadFile,
                                  showFile: showFile,
                                }}
                              >
                                <UkFile />
                                <AuFile />
                                <UsFile />
                              </GlobalEnvironmentData.Provider>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="col-xl-3 col-sm-12 d-flex main-space-remove-left super-admin-space-remove">
                  <div className="card w-100 environment-card"></div>
                </div>
              </Row>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default GlobalEnvironment;
