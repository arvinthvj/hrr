import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LeftAngle } from '../imagepath';
import {
  CreateOrEditLocationContext,
  LocationSettingsContext,
} from '../context/context';
import { findLabelText } from '../commonMethod';
import SelectField from '../selectfield/select';
import { locationId } from './constant';


const LocationSelect = () => {
  const { editLocationDetails, handleClose } = useContext(
    LocationSettingsContext,
  );
  const {
    locationNameTitle,
    selectedLocationObj,
    locationLevel,
    setParentLocationSelected,
    setValue,
    setParentLocationSelectedName,
    setSelectedLocationObj,
  } = useContext(CreateOrEditLocationContext);

  return (
    <div className="location-set">
      <div className="location-back-head mb-0">
        <h2>
          <Link to="#" className="me-3" onClick={handleClose}>
            <img src={LeftAngle} alt="img" />
          </Link>
          {editLocationDetails?.id
            ? findLabelText('Edit', 'Edit', 'Location') +
              '  ' +
              locationNameTitle
            : findLabelText(
                'Create_a_new_location',
                'Create a new location',
                'Location',
              )}
        </h2>
      </div>
      <div className="location-select">
        {editLocationDetails?.id ? null : (
          <SelectField
            value={selectedLocationObj}
            options={locationLevel}
            height={'38px'}
            placeholder={'Select location level'}
            onChangeValue={value => {
              console.log('value---', value);
              console.log('selectedLocationObj---', selectedLocationObj);
                if ((locationId.includes(value?.id)) && (!locationId.includes(selectedLocationObj?.id))) {
                setParentLocationSelected({});
                setValue('parentLocation', {}, { shouldValidate: true });
                setParentLocationSelectedName('');
              }
              setSelectedLocationObj(value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LocationSelect;
