import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
interface antdProps {
  list: [];
  label: string;
  setValue: CallableFunction;
}
type listProps = {
  value: string;
  label: string;
};
const AntdSelect: React.FC<antdProps> = ({ list, label, setValue }) => {
  const listData = list?.map((item: listProps) => (
    <Option key={item.value}>{item?.label}</Option>
  ));

  return (
    <Select
      //   style={{ minWidth: 200, height: "40px" }}
      onChange={value => {
        setValue(value);
      }}
      placeholder={label}
    >
      {listData}
    </Select>
  );
};

export default AntdSelect;
