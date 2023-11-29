import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { Search } from '../imagepath';
import { TenantLabelText } from '../tenantComponent/constants';
import { findLabelText } from '../commonMethod';

export const SearchField = ({
  searchTenant,
  setSearchTenant,
  error,
  setError,
}) => {
  const onSubmit = e => {
    let value = e.target.value;
    if (value === '') {
      setError('');
    } else if (/[^a-zA-Z0-9\- _&#@\/]/.test(value)) {
      setError('Special Characters not allowed');
    } else if (/^\s/.test(value)) {
      setError('Space Not Allowed in First Characters');
    } else if (value?.length < 3) {
      setError('please enter 3 to 30 characters');
    } else if (value?.length > 30) {
      setError('Letters must be below 30 characters');
      e.target.blur();
    } else {
      setError('');
    }
    setSearchTenant(value);
  };

  return (
    <>
      <div className="super-admin-filter-search">
        <input
          value={searchTenant ? searchTenant : ''}
          type="text"
          placeholder={findLabelText(
            TenantLabelText.Find,
            TenantLabelText.Find,
            TenantLabelText.Common_Values,
          )}
          className="form-control"
          onChange={e => onSubmit(e)}
        />
        <div className="filter-img">
          <Link to="#">
            <GetImgaeFromS3Bucket
              imageFile="SearchIcon_1675333763674.svg"
              type="image"
              FilePath="gat"
            />
          </Link>
        </div>
        <p style={{ color: 'red', position: ' absolute' }}>{error}</p>
      </div>
    </>
  );
};
