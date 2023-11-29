import React, { useContext, useEffect, useState } from 'react';
import RemoveDiv from './removeDiv';
import Footer from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { postData } from '../../../services/apicall';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import {
  addHrBenefits,
  deleteBenefit,
  updateHrBenefits,
} from '../../../services/apiurl';
import Toaster from '../../toast';
import {
  HR_BENEFIT_SECTION_NAME,
  HR_BENEFIT_TYPE,
} from '../benefits/constants';
import InputComponent from '../inputComponent';
import { benefitSchema } from '../benefits/schema';
import { ErrorMessage, Errorcode } from '../../../assets/constants/config';

const GeneralBenifit = ({ checkIsOpned }) => {
  const {
    Error,
    editData,
    EditComponent,
    getHrBenefitsData,
    userID,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(benefitSchema) });

  useEffect(() => {
    updateData();
  }, [editData]);

  const updateData = () => {
    if (Object.keys(editData)?.length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setId(editData?.id);
      setValue('name', editData?.name, validateError);
      setValue('email', editData?.email, validateError);
      setValue('comment', editData?.comment, validateError);
      setValue('link', editData?.link, validateError);
    } else {
      resetData();
    }
  };

  const resetData = () => {
    setId('');
    setValue('name', '');
    setValue('email', '');
    setValue('comment', '');
    setValue('link', '');
  };

  const onEditSubmit = data => {
    const payload = {
      user_id: userID,
      type: HR_BENEFIT_TYPE.GENERAL_BENEFIT,
      name: data?.name,
      email: data?.email,
      comment: data?.comment,
      link: data?.link,
    };
    if (id) payload['id'] = id;
    dispatch(showLoader());
    postData(updateHrBenefits, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrBenefitsData();
      checkIsOpned(false);
      resetData();
      EditComponent('', {});
    });
  };

  const onSubmit = data => {
    const payload = {
      user_id: userID,
      type: HR_BENEFIT_TYPE.GENERAL_BENEFIT,
      name: data?.name,
      email: data?.email,
      comment: data?.comment,
      link: data?.link,
    };
    dispatch(showLoader());
    postData(addHrBenefits, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      getHrBenefitsData();
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
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Benefit"
                name="name"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['name']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="ID/Email"
                name="email"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={50}
              />
            )}
          />
          <Error>{errors?.['email']?.message}</Error>
        </div>
        <div className="form-group tab-form-group">
          <Controller
            name="comment"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Comment"
                name="comment"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={300}
              />
            )}
          />
          <Error>{errors?.['comment']?.message}</Error>
        </div>

        <div className="form-group tab-form-group">
          <Controller
            name="link"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                Label="Link"
                name="link"
                placeholder=""
                onChange={onChange}
                trigger={trigger}
                value={value}
                maxLength={100}
              />
            )}
          />
          <Error>{errors?.['link']?.message}</Error>
        </div>
        {id && (
          <RemoveDiv
            name={HR_BENEFIT_SECTION_NAME.GENERAL_BENEFITS}
            payload={{ id: id }}
            api={deleteBenefit}
            checkIsOpned={checkIsOpned}
            resetData={resetData}
            list={getHrBenefitsData}
          />
        )}
      </div>
      <div>
        <Footer
          handleSubmit={handleSubmit(
            Object.keys(editData)?.length > 0 ? onEditSubmit : onSubmit,
          )}
          isDirty={isDirty}
          isValid={true}
          editData={editData}
          resetData={updateData}
          isPreference={Object.keys(errors).length == 0 ? false : true}
        />
      </div>
    </div>
  );
};

export default GeneralBenifit;
