import React from 'react';

type LabelWithCheckBoxProps = {
  label: string;
  flag: number | null;
  type: string;
  callBack: CallableFunction;
  index: number | null;
  disabled?: boolean;
};
const LabelWithCheckBox: React.FC<LabelWithCheckBoxProps> = ({
  label,
  flag,
  callBack,
  type,
  index,
  disabled,
}) => {
  return (
    <div className="settings-group">
      <h5>{label}</h5>
      <div className="checkbox-set">
        <label className="check">
          <input
            type="checkbox"
            checked={flag == 0 ? false : true}
            onChange={() => callBack(type, flag, index)}
            disabled={disabled}
          />
          <span className="checkmark" />
        </label>
      </div>
    </div>
  );
};

export default LabelWithCheckBox;
