import React, { useContext, useEffect } from 'react';
import { QuickBookContext, QuickBookDayContext } from '../context/context';
import { Controller, useForm } from 'react-hook-form';
import { findLabelText } from '../commonMethod';

const QuickbookSubject = () => {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({});
  const { setSubject, subject, subjectValidate, subjectSetValidate } =
    useContext(QuickBookContext);
  const { editRoomDetails } = useContext(QuickBookDayContext);
  useEffect(() => {
    if (editRoomDetails) {
      setValue('subject', editRoomDetails?.subjects);
      setSubject(editRoomDetails?.subjects);
    } else {
      if (subject) {
        setValue('subject', subject);
        setSubject(subject);
      }
    }
  }, []);
  return (
    <div className="rooms-form ">
      <div className="form-group">
        <Controller
          name="subject"
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <input
                className="form-control"
                value={value ? value : ''}
                type="text"
                placeholder={findLabelText('Subject', 'Subject', 'Dashboard')}
                onChange={val => {
                  onChange(val);
                  setSubject(val?.target?.value);
                  if (val?.target?.value) subjectSetValidate('');
                  else
                    subjectSetValidate(
                      global.validationLabel.userManagement.subjectRequird,
                    );
                  trigger('subject');
                }}
              />
            </>
          )}
        />
        {subjectValidate && (
          <label style={{ color: 'red' }}>{subjectValidate}</label>
        )}
      </div>
    </div>
  );
};

export default QuickbookSubject;
