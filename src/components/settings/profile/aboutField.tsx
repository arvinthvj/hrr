import React, { useContext, useEffect, useRef } from 'react';
import { findLabelText } from '../../commonMethod';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../pages/settings/schema/index';
import { ProfileContext } from '../../context/settingsContext';
import { specialChar } from '../../../assets/globals';
import {
  ButtonNames,
  ProfileFieldLabels,
  ProfileFields,
  TabNames,
  ValidationMessages,
} from '../constant';

interface DescriptionProps {
  description?: string;
}

const AboutField = () => {
  const {
    profileData,
    about,
    updateAbout,
    aboutError,
    setAboutError,
    charValidationMsg,
    setCharValidationMsg,
    setStr,
  } = useContext(ProfileContext);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<DescriptionProps>({
    resolver: yupResolver(schema),
  });
  const aboutRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (aboutRef.current && !aboutRef.current?.contains(event?.target)) {
        setAboutError(false);
        if (about.status) {
          updateAbout({
            data: profileData?.about,
            status: false,
            count: 0,
          });
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileData?.about, about.status]);

  return (
    <div className="about-view edit-about" ref={aboutRef}>
      <h3>
        {findLabelText('About', ProfileFieldLabels.about, TabNames.settings)}
        <Link
          to="#"
          onClick={() => {
            if (errors?.description?.message) {
              // Dont save
            } else {
              if (!charValidationMsg) {
                setStr(ProfileFields.description);
                updateAbout({
                  ...about,
                  status: !about.status,
                  count: about.count + 1,
                });
              }
            }
          }}
          className="leave-edit-about"
        >
          {about?.status
            ? findLabelText('Save', ButtonNames.SAVE, TabNames.settings)
            : findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
        </Link>
      </h3>
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <textarea
              className="form-control text-about"
              value={about?.data ? about?.data : ''}
              placeholder={'\n\n\n\n Max 300 characters'}
              disabled={about?.status === false}
              onChange={e => {
                if (e.target.value?.length <= 300) {
                  const findChar = specialChar.find(char =>
                    e.target.value.includes(char),
                  );
                  if (findChar == undefined) {
                    setCharValidationMsg(false);
                  } else {
                    setCharValidationMsg(true);
                  }
                  onChange(e.target.value);
                  trigger('description');
                  updateAbout({
                    ...about,
                    data: e.target.value,
                  });
                  setAboutError('');
                } else {
                  setAboutError(ValidationMessages.aboutCharLimit);
                }
              }}
            />
            {charValidationMsg ? (
              <label style={{ color: 'red' }}>
                {ValidationMessages.specialCharValidation}
              </label>
            ) : aboutError ? (
              <label style={{ color: 'red' }}>{aboutError}</label>
            ) : errors?.description?.message ? (
              <label style={{ color: 'red' }}>
                {errors?.description?.message}
              </label>
            ) : null}
          </>
        )}
      />
    </div>
  );
};

export default AboutField;
