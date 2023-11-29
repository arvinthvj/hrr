import React, { useContext, useEffect, useState } from 'react';
import InputComponent from '../inputComponent';
import { hrCalendar } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import FileUpload from '../fileUpload';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { education } from '../personal/scehma';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import Toaster from '../../toast';
import {
  AddEducationAndCertificate,
  DeleteEducationAndCertificate,
  EditEducationAndCertificate,
} from '../../../services/apiurl';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { hrUploadFileType } from '../../../assets/globals';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../commonMethod';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const Education = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    getUserPersonalDetails,
    setEducationList,
    detailsId,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const [id, setId] = useState('');
  const [files, setFile] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState('');
  const [ToDate, setToDate] = useState('');
  const disabledDate = current => {
    return current && current < moment(fromDate).startOf('day');
  };
  const disabledToDate = current => {
    return current && current > moment(ToDate).endOf('day');
  };
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(education) });

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('organisation', editData?.organisation, validateError);
      setValue('level', editData?.level, validateError);
      setValue(
        'qualification',
        editData?.qualification_studyfield,
        validateError,
      );
      setValue(
        'FromDate',
        editData?.from_date != '' ? moment(editData?.from_date) : '',
        validateError,
      );
      setValue(
        'ToDate',
        editData?.to_date != '' ? moment(editData?.to_date) : '',
        validateError,
      );
      setFromDate(editData?.from_date);
      setToDate(editData?.to_date);
      if (editData?.file_upload != '') {
        const list = editData?.file_upload.split(',');
        setFile([...list]);
      } else {
        setFile([]);
      }
    } else {
      resetData();
    }
  };
  useEffect(() => {
    updateData();
  }, [editData]);

  const resetData = () => {
    setId('');
    setValue('organisation', '');
    setValue('level', '');
    setValue('qualification', '');
    setValue('FromDate', '');
    setValue('ToDate', '');
    setFile([]);
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
    files.splice(index, 1);
    setFile([...files]);
  };

  const onSubmit = data => {
    const payload = {
      user_id: detailsId,
      type: 'education',
      organisation: data?.organisation,
      level: data?.level,
      qualification_studyfield: data?.qualification,
      from_date: getUserPreferedDateFormatToSave(fromDate),
      to_date: getUserPreferedDateFormatToSave(ToDate),
      file_upload: files.toString(),
    };
    dispatch(showLoader());
    postData(AddEducationAndCertificate, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setEducationList([]);
      getUserPersonalDetails();
      resetData();
    });
  };
  const onEditSubmit = data => {
    const payload = {
      user_id: detailsId,
      id: id,
      type: 'education',
      organisation: data?.organisation,
      level: data?.level,
      qualification_studyfield: data?.qualification,
      from_date: getUserPreferedDateFormatToSave(fromDate),
      to_date: getUserPreferedDateFormatToSave(ToDate),
      file_upload: files.toString(),
    };
    dispatch(showLoader());
    postData(EditEducationAndCertificate, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setEducationList([]);
      getUserPersonalDetails();
      resetData();
    });
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
            name="organisation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Organisation"
                name="organisation"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={100}
              />
            )}
          />
          <Error>{errors?.['organisation']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="level"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Level"
                name="level"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['level']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="qualification"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Qualification"
                name="qualification"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={100}
              />
            )}
          />
          <Error>{errors?.['qualification']?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>{findLabelText('From', 'From', 'Hr')}</label>
                <Controller
                  name="FromDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="FromDate"
                      handleChange={value => {
                        setFromDate(value);
                      }}
                      disabledFutureDate={disabledToDate}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['FromDate']?.message}</Error>
              </div>
            </li>
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>{findLabelText('To', 'To', 'Hr')}</label>
                <Controller
                  name="ToDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="ToDate"
                      handleChange={value => {
                        setToDate(value);
                      }}
                      disabledFutureDate={disabledDate}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['ToDate']?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        <FileUpload
          files={files}
          handleFileInputChange={handleFileInputChange}
          removeImage={removeImage}
        />
        {id && (
          <RemoveDiv
            name={'education'}
            payload={{ id: id }}
            api={DeleteEducationAndCertificate}
            list={getUserPersonalDetails}
            setList={setEducationList}
            checkIsOpned={checkIsOpned}
          />
        )}
      </div>
      <Footer
        handleSubmit={handleSubmit(
          Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
        )}
        isDirty={isDirty}
        isValid={isValid}
        files={files}
        editData={editData}
        resetData={updateData}
      />
    </div>
  );
};

export default Education;
