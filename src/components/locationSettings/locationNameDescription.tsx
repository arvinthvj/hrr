import React, { useContext, useState } from 'react';
import { Controller } from 'react-hook-form';
import { findLabelText } from '../commonMethod';
import { CreateOrEditLocationContext } from '../context/context';
import { specialChar } from '../../assets/globals';
import { Col, Row } from 'antd';
import { ValidationMessages } from './constant';

const LocationNameDescription = () => {
  const {
    selectedLocationObj,
    counter,
    setCounter,
    charValidationMsg,
    setCharValidationMsg,
    control,
    trigger,
    errors,
  } = useContext(CreateOrEditLocationContext);
  const [showLimitErrormsg, setLimitErrormsg] = useState(false);
  return (
    <Row>
      <Col lg={24}>
        <div className="filter-search filter-input location-filter-input">
          <label htmlFor="name">
            {findLabelText(
              selectedLocationObj.name,
              selectedLocationObj.name,
              'Location',
            )}{' '}
            {findLabelText('name', 'name', 'Common_Values')}
          </label>
          <Controller
            name="locationName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <input
                  value={value}
                  type="text"
                  placeholder={findLabelText(
                    'Location_name',
                    'Location name',
                    'Location',
                  )}
                  className="bg-white"
                  onChange={val => {
                    onChange(val);
                    trigger('locationName');
                  }}
                />
                {errors.locationName?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.locationName?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24}>
        <div className="filter-search filter-input location-filter-input">
          <label className="description-label" htmlFor="name">
            {findLabelText('Description', 'Description', 'Location')}
            <span>{counter}/300</span>
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <textarea
                  style={{
                    borderColor: showLimitErrormsg ? 'red' : ' ',
                  }}
                  placeholder={'\n\n\n\n Max 300 characters'}
                  value={value}
                  className="bg-white description-error-msg"
                  onChange={val => {
                    if (val.target.value.length <= 300) {
                      const findChar = specialChar.find(char =>
                        val.target.value.includes(char),
                      );
                      if (findChar == undefined) {
                        setCharValidationMsg(false);
                      } else {
                        setCharValidationMsg(true);
                      }
                      onChange(val);
                      trigger('description');
                      setCounter(val.target.value.length);
                      setLimitErrormsg(false);
                    } else {
                      setLimitErrormsg(true);
                    }
                  }}
                />
                {charValidationMsg ? (
                  <label style={{ color: 'red' }}>
                    {ValidationMessages.specialChar}
                  </label>
                ) : showLimitErrormsg ? (
                  <label style={{ color: 'red' }}>
                    {ValidationMessages.charlimitExceed}
                  </label>
                ) : errors.description?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.description?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
    </Row>
  );
};

export default LocationNameDescription;
