import React, { forwardRef, useContext, useState } from 'react';
import { InputElementProps } from '../../assets/globals/typeConstants';
import { PersonalContext } from './personalController';
import { findLabelText } from '../commonMethod';

const InputComponentForNew = forwardRef((props: InputElementProps) => {
  const {
    Label,
    name,
    placeholder,
    Optional,
    disabled,
    trigger,
    onChange,
    onFocus,
    value,
    maxLength,
    accessType,
    errClass,
    defaultFunc = true,
  } = props;
  const { Error } = useContext(PersonalContext);
  const [error, setError] = useState(false);
  return (
    <>
      <div className="persnoal-label">
        {Label && (
          <label>
            {findLabelText(Label.replace(/\s+/g, '_'), Label, 'Hr')}
            {Optional && (
              <span>
                {findLabelText(Optional.replace(/\s+/g, '_'), Optional, 'Hr')}
              </span>
            )}
          </label>
        )}
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={val => {
          if (defaultFunc && maxLength && maxLength < val.target.value.length) {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 2000);
          } else {
            onChange && onChange(val);
            trigger && name && trigger(name);
          }
        }}
        className={
          accessType == '1' || disabled
            ? 'form-control form-control-disabled'
            : errClass
            ? 'form-control is-invalid-field'
            : 'form-control'
        }
        placeholder={placeholder}
        disabled={accessType == '1' || disabled ? true : false}
        maxLength={maxLength && maxLength + 1}
        onFocus={val => {
          onFocus && onFocus(val);
        }}
      />
      {error && (
        <Error>{`Maximum number of ${maxLength} characters exceeded`}</Error>
      )}
    </>
  );
});

export default InputComponentForNew;
