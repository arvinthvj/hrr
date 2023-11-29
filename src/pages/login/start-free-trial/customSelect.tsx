import React from 'react';
import ReactSelect from 'react-select';
import {
  CountrySelectProps,
  CustomSelectProps,
} from '../../../assets/globals/typeConstants';

const CustomSelect: React.FC<CustomSelectProps> = ({
  onChange,
  options,
  value,
  className,
  placeholder,
}) => {
  const defaultValue = (
    options: CountrySelectProps[] | null,
    value: string | undefined,
  ) => {
    return options ? options.find(option => option.value === value) : '';
  };
  const styles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'white',
      borderStyle: 'hidden',
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? '0' : '0',
      color: '#5B5857',
      fontSize: '16px',
      '&:hover': {
        border: state.isFocused ? 0 : 0,
        color: 'black',
      },
      width: '80px',
      height: '40px',
      outline: 'none',
    }),
    menu: base => ({ ...base, width: '80px' }),
    menuList: base => ({ ...base, padding: '0', width: '80px' }),
    container: base => ({
      ...base,
      border: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#5897fb' : 'white',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: '#5897fb',
      },
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none',
    }),
    valueContainer: (base, state) => ({
      ...base,
      padding: '0 14px',
      border: '0',
      width: '50px',
      // height: "40px",
      color: state.selected ? '#5B5857' : '#5B5857',
    }),
    value: base => ({ ...base, color: '#5B5857' }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: 'black',
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '250ms',
    }),
    singleValue: base => ({ ...base, margin: '0', top: '45%' }),
    placeholder: base => ({ ...base, color: '#5B5857', fontWeight: '400' }),
  };

  return (
    <div className={className}>
      <ReactSelect
        styles={styles}
        value={defaultValue(options, value)}
        // value={value}
        // value={options.value}
        defaultValue={options?.[0]}
        onChange={(value: string) => onChange(value)}
        options={options}
        placeholder={placeholder}
        onInputChange={(inputValue: string) =>
          inputValue.length <= 4 ? inputValue : inputValue.substr(0, length)
        }
      />
    </div>
  );
};

export default CustomSelect;
