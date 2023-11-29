import React, { useContext, useEffect, useRef, useState } from 'react';
import InputComponent from '../inputComponent';
import { hrCalendar } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import RemoveDiv from './removeDiv';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ErrorMessage,
  Errorcode,
  global,
} from '../../../assets/constants/config';
import Toaster from '../../toast';
import { hrUploadFileType } from '../../../assets/globals';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import moment from 'moment';
import { postData } from '../../../services/apicall';
import {
  deleteVaccinationDetails,
  storeVaccinationDetails,
  updateVaccinationDetails,
} from '../../../services/apiurl';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { PersonalContext } from '../personalController';
import { Link } from 'react-router-dom';
import { getUserPreferedDateFormatToSave } from '../../commonMethod';

export const schema = yup
  .object({
    vaccination_type: yup
      .string()
      .required(global.validationLabel.hrModuleValidation.vaccination_type)
      .max(global.validationLabel.hrModuleValidation.vaccinationTypeLength)
      .matches(
        global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      )
      .trim(),
    vaccination_number: yup
      .string()
      .required(global.validationLabel.hrModuleValidation.vaccination_number)
      .max(global.validationLabel.hrModuleValidation.vaccinationTypeLength)
      .matches(
        global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      )
      .trim(),
    vaccinated_date: yup.string().required('Enter the date').nullable(),
  })
  .required();

const Vaccination = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    getUserPersonalDetails,
    setVaccinationList,
    EditComponent,
    detailsId,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [date, setDate] = useState('');

  const resetAllRecord = () => {
    reset();
    setFile([]);
    setError(true);
    EditComponent('Vaccination status', {});
  };

  const formKeys = {
    vaccination_type: 'vaccination_type',
    vaccination_number: 'vaccination_number',
    vaccinated_date: 'vaccinated_date',
    file_upload: 'file_upload',
  };
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [files, setFile] = useState<Array<any>>([]);
  const [error, setError] = useState(true);

  const onSubmit = async data => {
    (data.user_id = detailsId),
      (data.vaccinated_date = getUserPreferedDateFormatToSave(date));

    data.file_upload = files.toString();
    // var fileKey:Array<any> = await getS3ImageKeys()
    if (editData?.id) {
      data.id = editData?.id;
    }
    dispatch(showLoader());
    const url = editData?.id
      ? updateVaccinationDetails
      : storeVaccinationDetails;
    postData(url, data, (data, res) => {
      dispatch(hideLoader());
      if (res.data.code == '200') {
        Toaster(res?.data?.code, res?.data?.message);
        setVaccinationList([]);
        getUserPersonalDetails();
        checkIsOpned(false);
        resetAllRecord();
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setValue(
        formKeys.vaccination_type,
        editData?.vaccination_type,
        validateError,
      );
      setValue(
        formKeys.vaccinated_date,
        moment(editData?.vaccinated_date),
        validateError,
      );
      setValue(
        formKeys.vaccination_number,
        editData?.vaccination_number,
        validateError,
      );
      setDate(editData?.vaccinated_date);

      if (editData?.file_upload != '') {
        const list = editData?.file_upload.split(',');
        setFile([...list]);
      } else {
        setFile([]);
      }
    } else {
      setValue(formKeys.vaccination_type, '');
      setValue(formKeys.vaccinated_date, '');
      setValue(formKeys.vaccination_number, '');
      setFile([]);
      setDate('');
    }
  };

  useEffect(() => {
    updateData();
  }, [editData]);

  const findError = file => {
    console.log('file', file);
    file ? setError(false) : setError(true);
  };

  const handleFileInputChange = e => {
    const image = e.target.files[0];
    const valiedImg = hrUploadFileType.includes(image.type);
    if (valiedImg) {
      if (image.size > 1000000) {
        Toaster('error', 'File size must under 1MB!');
      } else {
        dispatch(showLoader());
        handleImageUploadtoS3Bucket(
          image,
          'image',
          data => {
            files.push(data);
            setFile([...files]);
            dispatch(hideLoader());
            findError(files);
          },
          false,
          'ghr',
        );
      }
    } else {
      Toaster('error', ' Please upload valid file type');
    }
  };

  const removeImage = index => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    files.splice(index, 1);
    setFile([...files]);
  };

  const deleteVaccination = () => {
    dispatch(showLoader());
    postData(
      deleteVaccinationDetails,
      {
        id: editData?.id,
      },
      (data, res) => {
        dispatch(hideLoader());
        if (res.data.code == '200') {
          Toaster(res?.data?.code, res?.data?.message);
          setVaccinationList([]);
          checkIsOpned = { checkIsOpned };
          getUserPersonalDetails();
          resetAllRecord();
        } else {
          Toaster(Errorcode, ErrorMessage);
        }
      },
    );
  };

  return (
    <div
      className="tab-pane fade show active"
      id="emergency_tab"
      role="tabpanel"
      aria-labelledby="emergency-tab"
    >
      <div
        className="personal-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <Controller
            name={formKeys.vaccination_type}
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <InputComponent
                  Label="Vaccination type"
                  Optional=""
                  value={value}
                  onChange={e => {
                    onChange(e?.target?.value);
                  }}
                  trigger={trigger}
                  name={formKeys.vaccination_type}
                  maxLength={50}
                />
                <Error> {errors[formKeys.vaccination_type]?.message}</Error>
              </>
            )}
          />
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Date</label>
                <Controller
                  name="vaccinated_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      disabledFutureDate=""
                      name="Date"
                      handleChange={value => {
                        setDate(value);
                      }}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name={formKeys.vaccination_number}
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <InputComponent
                  Label="Vaccination number"
                  placeholder=""
                  Optional=""
                  value={value}
                  trigger={trigger}
                  onChange={e => {
                    onChange(e?.target?.value);
                  }}
                  name={formKeys.vaccination_number}
                  maxLength={50}
                />
                <Error>{errors[formKeys.vaccination_number]?.message}</Error>
              </>
            )}
          />
        </div>
        <div className="form-group tab-form-group tab-files">
          {files.length > 0 &&
            files.map((obj, index) => {
              return (
                obj != '' && (
                  <div key={index} className="tab-files-text">
                    <p>{obj}</p>
                    <Link
                      to="#"
                      className="btn"
                      onClick={() => {
                        removeImage(index);
                        files?.length > 0 ? setError(false) : setError(true);
                      }}
                    >
                      <i className="far fa-trash-can" />
                    </Link>
                  </div>
                )
              );
            })}

          <div className="tab-file-upload">
            <label>
              <i className="fas fa-plus" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={val => {
                  handleFileInputChange(val);
                }}
              />
            </label>
            <div className="tab-file-upload-content">
              <p>Maximum file size: 1 MB</p>
              <p>Accepted formats: PDF, JPEG</p>
            </div>
          </div>
        </div>
        {files?.length == 0 && Object.keys(editData)?.length > 0 ? (
          <Error>Please Upload (PDF, JPEG)</Error>
        ) : (
          ''
        )}
        {editData?.id && (
          <RemoveDiv
            confirmDelete={() => {
              deleteVaccination();
            }}
            name={'Vaccination'}
          />
        )}
      </div>
      <div className="tab-footer personal-footer">
        <Link
          to="#"
          className="btn"
          onClick={() => {
            EditComponent('', {});
          }}
        >
          Cancel
        </Link>
        {Object.keys(editData)?.length > 0 ? (
          <Link
            to="#"
            className={`btn btn-primary ${
              (!isDirty || !isValid || files?.length == 0) && error
                ? 'disable'
                : ''
            }`}
            onClick={
              (!isDirty || !isValid || files?.length == 0) && error
                ? () => {
                    return;
                  }
                : handleSubmit(onSubmit)
            }
          >
            Save
          </Link>
        ) : (
          <Link
            to="#"
            className={`btn btn-primary ${
              !isDirty || !isValid || files?.length == 0 ? 'disable' : ''
            }`}
            onClick={
              !isDirty || !isValid || files?.length == 0
                ? () => {
                    return;
                  }
                : handleSubmit(onSubmit)
            }
          >
            Save
          </Link>
        )}
      </div>
    </div>
  );
};

export default Vaccination;
