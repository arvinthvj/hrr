import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { specialChars } from '../../assets/globals';
import { QuickBookContext, QuickBookDayContext } from '../context/context';
import { QuickbookValidation } from './constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

interface CommentsProps {
  Comments?: string;
}

const QuickBookComments: React.FC = () => {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<CommentsProps>({
    resolver: yupResolver(schema),
  });
  const [showLimitErrormsg, setLimitErrormsg] = useState(false);
  const { editDetails } = useContext(QuickBookDayContext);
  const {
    isShowCharValidationMsg,
    setShowCharValidationMsg,
    setComment,
    comment,
  } = useContext(QuickBookContext);

  useEffect(() => {
    if (showLimitErrormsg) {
      setTimeout(() => {
        setLimitErrormsg(false);
      }, 2000);
    }
    if (editDetails?.data) {
      setValue('Comments', editDetails?.data?.comments);
      setComment(editDetails?.data?.comments);
    } else {
      setValue('Comments', comment);
      setComment(comment);
    }
  }, [editDetails]);

  return (
    <div className="comments-form-group form-group ">
      <Controller
        name="Comments"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <textarea
              style={{ borderColor: showLimitErrormsg ? 'red' : ' ' }}
              value={value}
              defaultValue={''}
              className="form-control"
              placeholder={'Comments \n\n\n\n Max 150 characters'}
              maxLength={150}
              onChange={val => {
                if (val.target.value.length < 150) {
                  const findChar = specialChars.find(char =>
                    val.target.value.includes(char),
                  );

                  if (findChar == undefined) {
                    setShowCharValidationMsg(false);
                  } else {
                    setShowCharValidationMsg(true);
                  }
                  onChange(val);
                  trigger('Comments');
                  setComment(val?.target?.value);
                  setLimitErrormsg(false);
                } else {
                  setLimitErrormsg(true);
                }
              }}
            />
            {isShowCharValidationMsg ? (
              <label style={{ color: 'red' }}>
                {QuickbookValidation.specialCharValidation}
              </label>
            ) : showLimitErrormsg ? (
              <label style={{ color: 'red' }}>
                {QuickbookValidation.charLimitValidation}
              </label>
            ) : errors.Comments?.message ? (
              <label style={{ color: 'red' }}>{errors.Comments?.message}</label>
            ) : null}
          </>
        )}
      />
    </div>
  );
};

export default QuickBookComments;
