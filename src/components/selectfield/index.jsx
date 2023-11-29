import React from 'react';
import Select from 'react-select';
import { icon1 } from '../imagepath';
// create a component
const SelectField = ({
  value,
  options,
  errorMessage,
  error,
  label,
  placeholder,
  onChangeValue,
  isImage,
  ...props
}) => {
  const colourStyles = {
    menu: provided => ({ ...provided, zIndex: 9999 }),
    control: styles => ({
      ...styles,
      minHeight: 48,
      fontFamily: 'Lato',
      paddingLeft: '56px',
      borderColor: '#000',
      input: styles => ({
        ...styles,
        color: theme.colors.secondary,
        height: 12,
      }),
      placeholder: styles => ({
        ...styles,
        fontSize: 3,
        color: '#000',
      }),
      singleValue: styles => ({
        ...styles,
        fontSize: '2px',
      }),
      indicatorsContainer: styles => ({
        ...styles,
        borderColor: '#000',
      }),
    }),
  };
  return (
    <>
      <div className="form-group">
        <div className="form-focus">
          <label className="form-name">{label}</label>
          <Select
            styles={colourStyles}
            options={options}
            placeholder={placeholder}
            width="100%"
            className={`select floating ${error && 'select-error'}`}
            value={value}
            isImage={isImage}
            onChange={onChangeValue}
            {...props}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
          <span className="form-icon top-space">
            <img src={icon1} alt="" />
          </span>
        </div>
        {error && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
};

export default SelectField;
