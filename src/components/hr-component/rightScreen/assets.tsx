import React, { useContext, useEffect, useState } from 'react';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { postData } from '../../../services/apicall';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import {
  addHrAssets,
  deleteHrAssets,
  updateHrAssets,
} from '../../../services/apiurl';
import Toaster from '../../toast';
import moment from 'moment';
import { HR_ASSETS_SECTION_NAME } from '../assests/constants';
import RemoveDiv from './removeDiv';
import InputComponent from '../inputComponent';
import { hrCalendar } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';
import { assetsSchema } from '../assests/schema';
import FileUpload from '../fileUpload';
import { handleImageUploadtoS3Bucket } from '../../../services/s3Bucket';
import { hrUploadFileType } from '../../../assets/globals';
import { getUserPreferedDateFormatToSave } from '../../commonMethod';

const Assets = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    EditComponent,
    userID,
    getHrAssetsData,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [files, setFile] = useState<Array<any>>([]);
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(assetsSchema) });

  const disabledDate = current => {
    return current && current < moment(loanDate).startOf('day');
  };
  const disabledToDate = current => {
    return current && current > moment(returnDate).endOf('day');
  };

  useEffect(() => {
    updateData();
  }, [editData]);

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('category', editData?.category, validateError);
      setValue('description', editData?.description, validateError);
      setValue('cost', editData?.cost, validateError);
      setValue('serial_no', editData?.serial_no, validateError);
      setValue('loaned_date', moment(editData?.loaned_date), validateError);
      editData?.returned_date &&
        setValue(
          'returned_date',
          moment(editData?.returned_date),
          validateError,
        );
      setValue('notes', editData?.notes, validateError);
      setLoanDate(editData?.loaned_date);
      setReturnDate(editData?.returned_date);

      if (editData?.file_upload?.length === 0) {
        setFile([]);
      } else {
        const list = editData?.file_upload.split(',');
        setFile([...list]);
      }
    } else {
      resetData();
    }
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

  const resetData = () => {
    setId('');
    setValue('category', '');
    setValue('description', '');
    setValue('serial_no', '');
    setValue('loaned_date', '');
    setValue('returned_date', '');
    setValue('notes', '');
    setValue('cost', '');
    setFile([]);
  };

  const onEditSubmit = data => {
    const payload = {
      user_id: userID,
      category: data?.category,
      description: data?.description,
      serial_no: data?.serial_no,
      cost: data?.cost,
      loaned_date: getUserPreferedDateFormatToSave(loanDate),
      returned_date: returnDate
        ? getUserPreferedDateFormatToSave(returnDate)
        : '',
      notes: data?.notes,
      file_upload: files.toString(),
    };
    if (id) payload['id'] = id;
    dispatch(showLoader());
    postData(updateHrAssets, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrAssetsData();
      checkIsOpned(false);
      resetData();
      EditComponent('', {});
    });
  };

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      category: data?.category,
      description: data?.description,
      serial_no: data?.serial_no,
      loaned_date: getUserPreferedDateFormatToSave(loanDate),
      returned_date: returnDate
        ? getUserPreferedDateFormatToSave(returnDate)
        : '',
      notes: data?.notes,
      cost: data?.cost,
      file_upload: files.toString(),
    };
    dispatch(showLoader());
    postData(addHrAssets, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrAssetsData();
      checkIsOpned(false);
      resetData();
      EditComponent('', {});
    });
  };

  return (
    <div>
      <div
        className="personal-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="form-group tab-form-group">
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Category"
                name="category"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={150}
              />
            )}
          />
          <Error>{errors?.['category']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Description"
                name="description"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={300}
              />
            )}
          />
          <Error>{errors?.['description']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="serial_no"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Serial no."
                name="serial_no"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['serial_no']?.message}</Error>
        </div>
        <div className="form-group tab-form-group tab-inner-group">
          <ul className="nav loaned-nav">
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Loaned date</label>
                <Controller
                  name="loaned_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="loaned_date"
                      handleChange={value => {
                        setLoanDate(value);
                        setValue('returned_date', null);
                      }}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                      disabledFutureDate={disabledToDate}
                    />
                  )}
                />
                <Error>{errors?.['loaned_date']?.message}</Error>
              </div>
            </li>
            <li>
              <div className="form-group tab-form-group inside-calandar-image">
                <label>Returned date</label>
                <Controller
                  name="returned_date"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name="returned_date"
                      handleChange={value => {
                        setReturnDate(value);
                      }}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                      disabledFutureDate={disabledDate}
                    />
                  )}
                />
                <Error>{errors?.['returned_date']?.message}</Error>
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group tab-form-group cost-group">
          <label>Cost</label>
          <div className="pay-group-inner">
            <Controller
              name="cost"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  name="cost"
                  Label=""
                  placeholder=""
                  onChange={onChange}
                  trigger={trigger}
                  value={value}
                  maxLength={50}
                />
              )}
            />
          </div>
          <div>
            <Error>{errors?.['cost']?.message}</Error>
          </div>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="notes"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Notes"
                name="notes"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={300}
              />
            )}
          />
          <Error>{errors?.['notes']?.message}</Error>
        </div>
        <FileUpload
          files={files}
          handleFileInputChange={handleFileInputChange}
          removeImage={removeImage}
        />

        {id && (
          <RemoveDiv
            name={HR_ASSETS_SECTION_NAME.ASSETS}
            payload={{ id: id }}
            api={deleteHrAssets}
            checkIsOpned={checkIsOpned}
            resetData={resetData}
            list={getHrAssetsData}
          />
        )}
      </div>
      <div>
        <Footer
          handleSubmit={handleSubmit(
            Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
          )}
          isDirty={isDirty}
          isValid={isValid}
          editData={editData}
          resetData={updateData}
          isPreference={Object.keys(errors).length == 0 ? false : true}
        />
      </div>
    </div>
  );
};

export default Assets;
