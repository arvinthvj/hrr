import React from 'react';
import Select, { components } from 'react-select';
import { dropdownAngle } from '../../imagepath';
type SelectFieldProps = {
  suffixImage?: string | any;
  height?: number | string;
  width?: number;
  minWidth?: string;
  options: any;
  value: any;
  onChangeValue: any;
  placeholder?: string;
  bgColor?: string;
  isSearchable?: boolean;
  disabled?: boolean;
  showStyle?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  suffixImage,
  height,
  width,
  minWidth,
  options,
  value,
  onChangeValue,
  placeholder,
  bgColor,
  isSearchable = true,
  disabled,
  showStyle = true,
}) => {
  const sImage = suffixImage ? suffixImage : '';
  const containerHeight = height ? height : '40px';
  const containerWidth = width ? width : null;
  const opt = options ? options : [];
  const IndicatorSeparator = ({}) => {
    return <span />;
  };
  const customStyles = {
    option: provided => ({
      ...provided,
    }),
    placeholder: base => ({
      ...base,
      color: '#1B1B1B',
      fontWeight: 400,
    }),
    control: () => ({
      height: containerHeight,
      border: '1px solid #F2F2F2',
      display: 'flex',
      borderRadius: '10px',
      background: bgColor ? bgColor : '#FAFAFA',
      width: minWidth ? minWidth : containerWidth,
      minWidth: minWidth ? minWidth : '200px',
    }),
    singleValue: () => ({
      fontFamily: 'Avenir',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: minWidth ? '20px' : '25px',
      color: '#1B1B1B',
    }),
  };

  const customStylesWithoutControl = {
    option: provided => ({
      ...provided,
    }),
    placeholder: base => ({
      ...base,
      color: '#1B1B1B',
      fontWeight: 400,
    }),
  };
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img
          src={suffixImage ? sImage : dropdownAngle}
          alt="img"
          className={
            props?.selectProps?.menuIsOpen ? 'img-rotate rotate' : 'img-rotate'
          }
        />
      </components.DropdownIndicator>
    );
  };
  function valueCheck() {
    if (value?.id || value?.[0]?.id || value?.value) return true;
    else false;
  }
  return (
    <>
      <Select
        components={{ IndicatorSeparator, DropdownIndicator }}
        styles={showStyle ? customStyles : customStylesWithoutControl}
        defaultValue={opt ? opt[0] : null}
        options={opt}
        placeholder={placeholder}
        value={valueCheck() ? value : null}
        onChange={onChangeValue}
        isSearchable={isSearchable}
        isDisabled={disabled}
      />
    </>
  );
};

export default SelectField;
