import React from 'react';
import ReactSelect from 'react-select';
import {
  CodeSelectItemProps,
  CodeSelectProps,
} from '../../../assets/globals/typeConstants';
const CodeSelect: React.FC<CodeSelectProps> = ({
  onChange,
  options,
  value,
  className,
  placeholder,
}) => {
  const defaultValue = (
    options: CodeSelectItemProps[] | null,
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
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? '0' : '0',
      color: '#dddddd',
      fontSize: '16px',
      fontWeight: '400',
      height: '40px',
      '&:hover': {
        border: state.isFocused ? 0 : 0,
        color: 'black',
      },
      outline: 'none',
    }),
    menu: base => ({ ...base }),
    menuList: base => ({ ...base, padding: '0' }),
    container: base => ({ ...base, border: 0 }),
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
      padding: '0 15px',
      border: '0',
      color: state.selected ? 'black' : '#dddddd',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: 'black',
      fontSize: '12px',
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '250ms',
    }),
    singleValue: base => ({ ...base, margin: '0', padding: '0', top: '45%' }),
    placeholder: base => ({
      ...base,
      color: '#5B5857',
      fontWeight: '400',
      margin: '0',
    }),
  };
  return (
    <div className={className}>
      <ReactSelect
        styles={styles}
        value={defaultValue(options, value)}
        // value={options.value}
        onChange={value => onChange(value)}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CodeSelect;
