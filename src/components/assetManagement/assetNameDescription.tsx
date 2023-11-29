import React, { useContext } from 'react';
import { findLabelText } from '../commonMethod';
import { UpdateAssetContext } from '../context/context';
import { Controller } from 'react-hook-form';
import { Col } from 'antd';
import { Descriptions } from './constant';

const AssetNameDescription = () => {
  const { activeControl, setActiveControl, control, trigger, errors } =
    useContext(UpdateAssetContext);

  return (
    <>
      <div className="table-headercheck">
        <div className="checkbox-set">
          <label className="check">
            {findLabelText('Active', 'Active', 'Team_Management')}
            <input
              type="checkbox"
              checked={activeControl}
              onChange={() => setActiveControl(!activeControl)}
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
      <Col lg={24}>
        <div className="filter-search filter-input">
          <label className="mb-0" htmlFor="name">
            {findLabelText('Name', 'Name', 'Team_Management')}
          </label>
          <span className="max-character">{Descriptions.nameLengthDesc}</span>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <input
                  value={value ? value : ''}
                  type="text"
                  maxLength={14}
                  placeholder={findLabelText('Name', 'Name', 'Team_Management')}
                  className="bg-white"
                  onChange={val => {
                    onChange(val);
                    trigger('name');
                  }}
                />
                {errors?.name?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors?.name?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24}>
        <div className="filter-search filter-input location-filter-input">
          <label htmlFor="description" className="description-label">
            {findLabelText('Description', 'Description', 'Location')}
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <textarea
                  maxLength={300}
                  value={value}
                  placeholder={findLabelText(
                    'Description',
                    'Description',
                    'Location',
                  ) + '\n\n\n\n Max 300 characters'}
                  className="bg-white"
                  onChange={val => {
                    onChange(val);
                    trigger('description');
                  }}
                />
                {errors?.description?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors?.description?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
    </>
  );
};

export default AssetNameDescription;
