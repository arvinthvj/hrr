import React, { useEffect, useState } from 'react';
import SelectField from '../selectfield/select';
import { postData } from '../../services/apicall';
import { TimeZoneListAPI } from '../../services/apiurl';

interface quickBookTimeZone {
  alias_name: string;
  timezone_name: string;
  country_name: string;
  id: number;
  standard_name: number;
}

const SelectTimeZone = () => {
  const [timezoneList, setTimezoneList] = useState<any>([]);
  const [timeZone, setTimeZone] = useState('');
  const [quickBookTimeZone, setQuickBookTimeZone] = useState<
    Array<quickBookTimeZone>
  >([]);

  const options = quickBookTimeZone?.map((item, index) => ({
    label: `${item?.alias_name}, ${item?.timezone_name}, ${item?.country_name}`,
    value: item?.timezone_name.trim(),
    id: item?.id,
    key: index,
    name: item?.standard_name,
  }));

  useEffect(() => {
    postData(TimeZoneListAPI, {}, (data, res) => {
      setQuickBookTimeZone(data);
    });
  }, []);

  return (
    <>
      <div className="mb-3">
        <SelectField
          value={timezoneList}
          options={options}
          height={'40px'}
          onChangeValue={value => {
            setTimezoneList(value);
            setTimeZone(value?.name);
          }}
          placeholder="Timezone"
        />
      </div>
      {timezoneList?.id == '' ? (
        <label style={{ color: 'red' }}>Please Select Time Zone</label>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectTimeZone;
