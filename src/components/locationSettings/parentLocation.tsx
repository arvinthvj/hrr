import React, { useContext } from 'react';
import { findLabelText } from '../commonMethod';
import { Controller } from 'react-hook-form';
import { CreateOrEditLocationContext } from '../context/context';
import { Link } from 'react-router-dom';
import { Search } from '../imagepath';
import DropDownOptions from '../dropDown/dropdownOptions';
import Loader from '../loader';
import Col from 'antd/es/grid/col';

const ParentLocation = () => {
  const {
    parentLocationSearchText,
    setParentLocationSearchText,
    parentLocationSelectedName,
    setParentLocationSelectedName,
    parentLocationSearchList,
    setParentLocationSearchList,
    setParentLocationSelected,
    setValue,
    setParentlocationTempData,
    parentSearchLoading,
    control,
    trigger,
    errors,
    setShowParentChangePopup,
  } = useContext(CreateOrEditLocationContext);
  const changeParentLocationSearchText = event => {
    setParentLocationSearchText(event.target.value);
    setParentLocationSelectedName(event.target.value);
    trigger('parentLocation');
    if (event.target.value == '') {
      setParentLocationSearchList([]);
      setParentLocationSelected({});
      setValue('parentLocation', {}, { shouldValidate: true });
    }
  };
  return (
    <Col lg={24}>
      <div className="filter-search filter-input location-filter-input">
        <label htmlFor="name">
          {findLabelText('Parent_location', 'Parent location', 'Location')}
        </label>
        <Controller
          name="parentLocation"
          control={control}
          render={({ field: {} }) => (
            <>
              <div className="filter-search filter-input mb-0">
                <input
                  type="text"
                  placeholder={findLabelText('Find', 'Find', 'Location')}
                  className="input-filter bg-white input-filter-locations"
                  onChange={changeParentLocationSearchText}
                  value={
                    parentLocationSearchText
                      ? parentLocationSearchText
                      : parentLocationSelectedName
                      ? parentLocationSelectedName
                      : ''
                  }
                />
                <div className="img-group admin-adds locations-img-group locations-img-group-info">
                  <Link to="#">
                    <img src={Search} alt="img" />
                  </Link>
                </div>
              </div>
              {errors.parentLocation?.value?.message ? (
                <label style={{ color: 'red' }}>
                  {errors.parentLocation?.value?.message}
                </label>
              ) : null}
            </>
          )}
        />

        {parentLocationSearchText && parentLocationSearchList?.length > 0 ? (
          <DropDownOptions
            parentLocationChangeModel={true}
            type="null"
            options={parentLocationSearchList}
            onChange={opt => {
              setShowParentChangePopup(true);
              setParentlocationTempData(opt);
              setParentLocationSearchList([]);
            }}
          />
        ) : parentSearchLoading ? (
          <Loader height={'30'} width={'30'} />
        ) : null}
      </div>
    </Col>
  );
};

export default ParentLocation;
