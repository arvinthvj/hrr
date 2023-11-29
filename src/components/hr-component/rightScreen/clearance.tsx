import React, { useContext, useEffect, useState } from 'react';
import InputComponent from '../inputComponent';
import { hrCalendar } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import FileUpload from '../fileUpload';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { clearance } from '../personal/scehma';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import moment from 'moment';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import {
  deleteVisaDetails,
  storeVisaDetails,
  updateVisaDetails,
} from '../../../services/apiurl';
import { postData } from '../../../services/apicall';
import Toaster from '../../toast';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { hrUploadFileType } from '../../../assets/globals';
import {
  ErrorMessage,
  Errorcode,
  global,
} from '../../../assets/constants/config';

import { useDispatch } from 'react-redux';
import {
  findLabelText,
  getUserPreferedDateFormatToSave,
} from '../../commonMethod';

const Clearance = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    getUserPersonalDetails,
    setClearanceList,
    EditComponent,
    countryList,
    detailsId,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(clearance) });
  const [files, setFile] = useState<Array<any>>([]);
  const [notesLimitExceeded, updatenotesFlag] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [ToDate, setToDate] = useState('');

  const disabledDate = current => {
    return current && current < moment(fromDate).startOf('day');
  };
  const disabledToDate = current => {
    return current && current > moment(ToDate).endOf('day');
  };

  const dispatch = useDispatch();

  const resetAllRecord = () => {
    reset();
    setFile([]);
    EditComponent('', {});
  };

  const formKeys = {
    document_types: 'document_types',
    type: 'type',
    id_number: 'id_number',
    issue_date: 'issue_date',
    expiry_date: 'expiry_date',
    issue_country: 'issue_country',
    status: 'status',
    notes: 'notes',
    file_upload: 'file_upload',
  };

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setValue(formKeys.type, editData?.type, validateError);
      setValue(formKeys.id_number, editData?.id_number, validateError);
      setValue(
        formKeys.issue_date,
        editData?.issue_date != '' ? moment(editData?.issue_date) : '',
        validateError,
      );
      setValue(
        formKeys.expiry_date,
        editData?.expiry_date != '' ? moment(editData?.expiry_date) : '',
        validateError,
      );
      setValue(formKeys.status, editData?.status, validateError);
      setValue(formKeys.notes, editData?.notes, validateError);
      setFromDate(editData?.issue_date);
      setToDate(editData?.expiry_date);

      countryList?.find(
        ele =>
          ele.value == editData?.issue_country &&
          setValue(formKeys.issue_country, ele, validateError),
      );
      if (editData?.file_upload != '') {
        const list = editData?.file_upload.split(',');
        setFile([...list]);
      } else {
        setFile([]);
      }
    } else {
      setValue(formKeys.type, '');
      setValue(formKeys.id_number, '');
      setValue(formKeys.issue_date, '');
      setValue(formKeys.expiry_date, '');
      setValue(formKeys.status, '');
      setValue(formKeys.notes, '');
      setValue(formKeys.issue_country, {});
      setFile([]);
    }
  };

  useEffect(() => {
    updateData();
  }, [editData]);

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

  const onsubmit = async data => {
    (data.user_id = detailsId),
      (data.issue_date = getUserPreferedDateFormatToSave(fromDate));
    data.expiry_date = getUserPreferedDateFormatToSave(ToDate);
    data.file_upload = files.toString();
    data.issue_country = data.issue_country.value;
    data.document_types = 'clearance';
    if (editData?.id) {
      data.id = editData?.id;
    }

    dispatch(showLoader());

    const url = editData?.id ? updateVisaDetails : storeVisaDetails;

    postData(url, data, (data, res) => {
      dispatch(hideLoader());
      if (res.data.code == '200') {
        Toaster(res?.data?.code, res?.data?.message);
        setClearanceList([]);
        checkIsOpned(false);
        getUserPersonalDetails();
        resetAllRecord();
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const deleteClearance = () => {
    dispatch(showLoader());
    postData(
      deleteVisaDetails,
      {
        id: editData?.id,
      },
      (data, res) => {
        dispatch(hideLoader());
        if (res.data.code == '200') {
          Toaster(res?.data?.code, res?.data?.message);
          setClearanceList([]);
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
            name={formKeys.type}
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Type"
                name={formKeys.type}
                placeholder=""
                onChange={e => {
                  onChange(e?.target?.value);
                }}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.[formKeys.type]?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name={formKeys.id_number}
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="ID number"
                name={formKeys.id_number}
                placeholder=""
                onChange={e => {
                  onChange(e?.target?.value);
                }}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.[formKeys.id_number]?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>{findLabelText('Issue', 'Issue', 'Hr')}</label>
                <Controller
                  name={formKeys.issue_date}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name={formKeys.issue_date}
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
                <Error>{errors?.[formKeys.issue_date]?.message}</Error>
              </div>
            </li>
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>{findLabelText('Expiry', 'Expiry', 'Hr')}</label>
                <Controller
                  name={formKeys.expiry_date}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name={formKeys.expiry_date}
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
                <Error>{errors?.[formKeys.expiry_date]?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group tab-form-group">
          <label>{findLabelText('Issue_country', 'Issue country', 'Hr')}</label>
          <Controller
            name={formKeys.issue_country}
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
          <Error>{errors?.[formKeys.issue_country]?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name={formKeys.status}
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Status"
                name={formKeys.status}
                onChange={e => {
                  onChange(e?.target?.value);
                }}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.[formKeys.status]?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name={formKeys.notes}
            control={control}
            render={({ field: { value, onChange } }) => (
              // <InputComponent
              //   Label="Notes"
              //   name={formKeys.notes}
              //   placeholder=""
              //   onChange={(e) => {
              //     const lenthValidation = 300;
              //     if (e?.target?.value.toString().length > lenthValidation) {
              //       updatenotesFlag(true);
              //     } else {
              //       updatenotesFlag(false);
              //       onChange(e?.target?.value);
              //     }
              //   }}
              //   trigger={trigger}
              //   value={value}
              // />
              <>
                <label>
                  <span>{findLabelText('Notes', 'Notes', 'Hr')}</span>{' '}
                </label>
                {/* <p className="label-Max-300-characters">Max 300 characters</p> */}
                <textarea
                  name={formKeys.notes}
                  value={value}
                  placeholder={'Optional \n\n\n\n Max 300 characters'}
                  className="form-control-text-area"
                  onChange={e => {
                    if (e?.target?.value?.length > 300) {
                      updatenotesFlag(true);
                      setTimeout(() => {
                        updatenotesFlag(false);
                      }, 2000);
                    } else {
                      onChange(e?.target?.value);
                      trigger(formKeys.notes);
                    }
                  }}
                />
              </>
            )}
          />
          {notesLimitExceeded ? (
            <Error>
              {global.validationLabel.hrModuleValidation.CharactersExceeded300}
            </Error>
          ) : (
            <Error>{errors?.[formKeys.notes]?.message}</Error>
          )}
        </div>
        <FileUpload
          files={files}
          handleFileInputChange={handleFileInputChange}
          removeImage={removeImage}
        />

        {editData?.id && (
          <RemoveDiv
            confirmDelete={() => {
              deleteClearance();
            }}
            name={'Clearance'}
          />
        )}
      </div>
      <Footer
        handleSubmit={handleSubmit(onsubmit)}
        isDirty={isDirty}
        isValid={isValid}
        files={files}
        editData={editData}
        resetData={updateData}
      />
    </div>
  );
};

export default Clearance;
