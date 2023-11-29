import React, { useContext, useEffect, useRef } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { Link } from 'react-router-dom';
import { Search } from '../../imagepath';
import { Select } from 'antd';
import { ButtonNames, ProfileFieldLabels, TabNames } from '../constant';
const { Option } = Select;
const LocationField = () => {
  const { profileData, location, updateLocation, setStr, locationOption } =
    useContext(ProfileContext);
  const locationRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        locationRef.current &&
        !locationRef.current?.contains(event?.target)
      ) {
        const id = location?.data?.[0]?.id || location?.data?.[0]?.value;
        if (
          location.status &&
          id !== profileData?.location?.[0]?.id &&
          event.target.className !== 'ant-select-item-option-content'
        ) {
          updateLocation({
            data: [profileData?.location],
            status: false,
            count: 0,
          });
        } else if (
          location.status &&
          event.target.className !== 'ant-select-item-option-content'
        ) {
          updateLocation({
            data: [profileData?.location],
            status: false,
            count: 0,
          });
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    profileData?.location?.[0]?.id,
    location?.data?.[0],
    location.status,
    location,
  ]);

  const locateOptions = locationOption?.map(item => (
    <Option key={item?.value}>{item?.name}</Option>
  ));

  return (
    <div className="about-view edit-location " ref={locationRef}>
      <h3>
        {findLabelText(
          'Location',
          ProfileFieldLabels.location,
          'Common_Values',
        )}
        <Link
          to="#"
          onClick={() => {
            setStr('location');
            updateLocation({
              ...location,
              status: true,
              count: location.count + 1,
            });
          }}
          className="leave-edit-btn location"
        >
          {location?.status
            ? findLabelText('Save', ButtonNames.SAVE, TabNames.settings)
            : findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
        </Link>
      </h3>
      <div className="filter-search filter-input locate-serch-fill input-place-grp">
        <Select
          showSearch
          optionFilterProp="children"
          onChange={data =>
            updateLocation({
              ...location,
              data: [locationOption?.find(i => i?.value === data)],
            })
          }
          className="input-filter"
          showArrow={false}
          bordered={false}
          disabled={!location?.status}
          value={location?.data ? location?.data?.[0]?.name : ''}
          filterOption={(input, option: any) =>
            option &&
            option?.children?.toLowerCase()?.includes(input.toLowerCase())
          }
        >
          {locateOptions}
        </Select>

        {location?.status ? (
          <div className="img-group location-img-group">
            <Link to="#">
              <img src={Search} alt="img" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LocationField;
