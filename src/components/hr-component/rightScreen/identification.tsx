import React, { useContext, useEffect, useState } from 'react';
import InputComponent from '../inputComponent';
import { hrCalendar } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import FileUpload from '../fileUpload';
import RemoveDiv from './removeDiv';
import DropDownSelection from '../../selectfield/dropDownSelection';
import Footer from './footer';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import { PersonalContext } from '../personalController';
import { yupResolver } from '@hookform/resolvers/yup';
import { identification } from '../personal/scehma';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import Toaster from '../../toast';
import {
  AddIdentificationAndVisaAndClearance,
  DeleteIdentificationAndVisaAndClearance,
  EditIdentificationAndVisaAndClearance,
} from '../../../services/apiurl';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { hrUploadFileType } from '../../../assets/globals';
import { getUserPreferedDateFormatToSave } from '../../commonMethod';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const Identification = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    getUserPersonalDetails,
    setIdentificationList,
    countryList,
    detailsId,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const [id, setId] = useState('');
  const [files, setFile] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(identification) });
  const [fromDate, setFromDate] = useState('');
  const [ToDate, setToDate] = useState('');

  const disabledDate = current => {
    return current && current < moment(fromDate).startOf('day');
  };
  const disabledToDate = current => {
    return current && current > moment(ToDate).endOf('day');
  };

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('type', editData?.type, validateError);
      setValue('number', editData?.id_number, validateError);
      setValue(
        'IssueDate',
        editData?.issue_date != '' ? moment(editData?.issue_date) : '',
        validateError,
      );
      setValue(
        'ExpiryDate',
        editData?.expiry_date != '' ? moment(editData?.expiry_date) : '',
        validateError,
      );
      setFromDate(editData?.issue_date);
      setToDate(editData?.expiry_date);
      countryList?.find(
        ele =>
          ele.value == editData?.issue_country &&
          setValue('country', ele, validateError),
      );
      setValue('status', editData?.status, validateError);
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
    setValue('type', '');
    setValue('number', '');
    setValue('ExpiryDate', '');
    setValue('IssueDate', '');
    setValue('country', {});
    setValue('status', '');
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
      document_types: 'identification',
      type: data?.type,
      id_number: data?.number,
      issue_date: getUserPreferedDateFormatToSave(fromDate),
      expiry_date: getUserPreferedDateFormatToSave(ToDate),
      issue_country: data?.country?.value,
      status: data?.status,
      notes: '',
      file_upload: files.toString(),
    };
    dispatch(showLoader());
    postData(AddIdentificationAndVisaAndClearance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setIdentificationList([]);
      getUserPersonalDetails();
      resetData();
    });
  };
  const onEditSubmit = data => {
    const payload = {
      user_id: detailsId,
      id: id,
      document_types: 'identification',
      type: data?.type,
      id_number: data?.number,
      issue_date: getUserPreferedDateFormatToSave(fromDate),
      expiry_date: getUserPreferedDateFormatToSave(ToDate),
      issue_country: data?.country?.value,
      status: data?.status,
      notes: '',
      file_upload: files.toString(),
    };
    dispatch(showLoader());
    postData(EditIdentificationAndVisaAndClearance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      checkIsOpned(false);
      setIdentificationList([]);
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
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Type"
                name="type"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['type']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="number"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="ID number"
                name="number"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['number']?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Issue</label>
                <Controller
                  name="IssueDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="IssueDate"
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
                <Error>{errors?.['IssueDate']?.message}</Error>
              </div>
            </li>
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Expiry</label>
                <Controller
                  name="ExpiryDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      handleChange={value => {
                        setToDate(value);
                      }}
                      disabledFutureDate={disabledDate}
                      name="ExpiryDate"
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['ExpiryDate']?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group tab-form-group">
          <label>Issue country</label>
          <Controller
            name="country"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                options={countryList}
                minWidth="100px"
                height="35px"
                Value={value}
                backgroundColor="#FFF"
                onChange={value => {
                  onChange(value);
                  trigger('country');
                }}
                placeholder=""
              />
            )}
          />
          <Error>{errors?.['country']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Status"
                name="status"
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['status']?.message}</Error>
        </div>
        <FileUpload
          files={files}
          handleFileInputChange={handleFileInputChange}
          removeImage={removeImage}
        />
        {id && (
          <RemoveDiv
            name={'Identification'}
            payload={{ id: id }}
            api={DeleteIdentificationAndVisaAndClearance}
            list={getUserPersonalDetails}
            setList={setIdentificationList}
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

export default Identification;
