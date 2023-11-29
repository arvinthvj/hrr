import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Select, { components } from 'react-select';
import {
  dropdownAngle,
  dropdownAngleGrey,
  location,
  upImage,
} from '../imagepath';
import { SelectDropDownProps } from '../../assets/globals/typeConstants';

// eslint-disable-next-line react/display-name
const DropDownSelection = forwardRef((props: SelectDropDownProps, ref) => {
  const {
    suffixImage,
    height,
    width,
    options,
    onChange,
    selectedValue,
    minWidth,
    padding,
    placeholder,
    status,
    backgroundColor,
    Value,
    isDisabled,
    setHeight,
    errClass,
    disabledIcon,
  } = props;

  const sImage = suffixImage ? suffixImage : '';
  const containerHeight = height ? height : '40px';
  const containerWidth = width ? width : null;
  const color = backgroundColor ? backgroundColor : '#FAFAFA';

  const opt = options ? options : [];
  const [value, setValue] = useState(selectedValue ? selectedValue : null);

  const label = placeholder ? placeholder : disabledIcon ? '' : 'Select';

  // const [isFocused, setFocused] = useState(value ? true : false)
  // const handleFocus = () => setFocused(true)
  // const handleBlur = () => setFocused(value ? true : false)

  const IndicatorSeparator = ({}) => {
    return <span />;
  };

  useImperativeHandle(ref, () => ({
    updateInitialValue(val) {
      setValue(val);
    },
  }));

  const customStyles = {
    option: provided => ({
      ...provided,
    }),
    menuPortal: provided => ({
      ...provided,
      zIndex: 9999,
    }),
    menu: provided => ({
      ...provided,
      zIndex: 9999,
    }),
    menuList: provided => ({
      ...provided,
      overflow: 'auto',
      maxHeight: '150px',
      zIndex: 99999,
      paddingTop: 0,
      paddingRight: 0,
    }),
    control: () => ({
      height: containerHeight,
      border: errClass ? '1px solid #BA3B46' : '1px solid #F2F2F2',
      display: 'flex',
      borderRadius: '10px',
      background: isDisabled ? '#FAFAFA' : color,
      width: containerWidth,
      minWidth: minWidth || '200px',
    }),

    // singleValue: () => ({
    //   fontFamily: "Avenir",
    //   fontStyle: "normal",
    //   fontWeight: "500",
    //   fontSize: "18px",
    //   lineHeight: "25px",
    //   color: "#1B1B1B",
    // }),
  };

  const DropdownIndicator = props => {
    // props?.selectProps?.menuIsOpen
    return (
      <components.DropdownIndicator {...props}>
        {status ? (
          <img src={location} alt="img" />
        ) : (
          <img
            src={isDisabled ? dropdownAngleGrey : dropdownAngle}
            alt="img"
            className={
              props?.selectProps?.menuIsOpen
                ? 'img-rotate rotate'
                : 'img-rotate'
            }
          />
        )}
      </components.DropdownIndicator>
    );
  };
  const handleDropdownOpen = () => {
    setHeight && setHeight(true);
  };
  const handleDropdownClose = () => {
    setHeight && setHeight(false);
  };

  return (
    <>
      <Select
        isDisabled={isDisabled}
        components={{
          IndicatorSeparator,
          DropdownIndicator,
        }}
        styles={customStyles}
        defaultValue={value}
        options={opt}
        placeholder={label}
        onMenuOpen={handleDropdownOpen}
        onMenuClose={handleDropdownClose}
        value={Value ? Value : value}
        // menuPosition={"fixed"}
        // onBlur={handleFocus}
        // onFocus={handleBlur}
        onChange={val => {
          setValue(val);
          onChange(val);
        }}
      />
    </>
  );
});

export default DropDownSelection;
