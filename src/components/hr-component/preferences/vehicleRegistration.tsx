import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PrefferedConfigurationLabel } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { useSelector } from 'react-redux';
import { PersonalContext } from '../personalController';
import InputComponent from '../inputComponent';
import {
  hrPereferenceKeys,
  sectionNames,
} from '../../../assets/constants/config';

const VehicleRegistration = () => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { preferenceDetails } = useSelector((state: any) => state?.hr);
  const {
    setVehicleRegNumber,
    setIsPrefereneceSaveButton,
    allFieldPermissionType,
    Error,
  } = useContext(PersonalContext);

  useEffect(() => {
    setVehicleNumberValue();
  }, [preferenceDetails]);

  const findIndex = key => {
    const findObj = allFieldPermissionType?.filter(
      obj =>
        obj.section_name == sectionNames.preference_details &&
        obj.field_name == key,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };

  const setVehicleNumberValue = () => {
    if (preferenceDetails?.length > 0) {
      setVehicleRegNumber(preferenceDetails[0]?.vehicle_register_no);
      setValue('number', preferenceDetails[0]?.vehicle_register_no);
    }
  };

  return (
    <div className="personal-details vehicle-registration">
      <div className="personal-group-info personal-group-inner">
        <div className="personal-group">
          {findIndex(hrPereferenceKeys.Vehicle_Number) < '1' ? (
            <InputComponent accessType="1" placeholder="" Optional="" />
          ) : (
            <Controller
              name="number"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  accessType={findIndex(hrPereferenceKeys.Vehicle_Number)}
                  Label={PrefferedConfigurationLabel.VEHICLE_REGISTRATION}
                  name="number"
                  placeholder=""
                  maxLength={10}
                  Optional=""
                  onChange={val => {
                    setVehicleRegNumber(val?.target?.value);
                    setIsPrefereneceSaveButton(false);
                    onChange(val);
                  }}
                  trigger={trigger}
                  value={value}
                />
              )}
            />
          )}
          <Error>{errors?.['number']?.message}</Error>
        </div>
      </div>
    </div>
  );
};

export default VehicleRegistration;
