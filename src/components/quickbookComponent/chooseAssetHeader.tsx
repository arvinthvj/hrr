import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPlanPopup } from '../../reduxStore/quickBookSlice';
import {
  findLabelText,
  getPrefereredTimeToDisplay,
  getUserPreferedDateFormat,
} from '../commonMethod';
import {
  QuickBookAssetCardContext,
  QuickBookContext,
} from '../context/context';
import { Search, bookLocation, filter_icon } from '../imagepath';
import { Controller, useForm } from 'react-hook-form';
import { specialChars } from '../../assets/globals';
import { QuickbookValidation } from './constant';

type ChooseAssetProps = {
  type: string;
  setLocationpage: CallableFunction;
  locationSelectName: string;
  setSearchReasult: CallableFunction;
  changeWorkspaces: CallableFunction;
}

type AssetSearchProps = {
  Search?: string;
};

const ChooseAssetHeader: React.FC<ChooseAssetProps> = ({
  type,
  setLocationpage,
  locationSelectName,
  setSearchReasult,
  changeWorkspaces,
}) => {
  const { selectedAsset, selectedAssetId, responseData } = useContext(
    QuickBookAssetCardContext,
  );
  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<AssetSearchProps>({});
  const {
    setUTCFormat,
    startDate,
    startTime,
    endTime,
    isShowCharValidationMsg,
    setShowCharValidationMsg,
  } = useContext(QuickBookContext);
  const dispatch = useDispatch();
  const [defaultBuliding, setDefaultBuliding] = useState('');
  const [defaultFloor, setDefaultFloor] = useState('');

  const handleLocationPage = () => {
    setLocationpage(true);
  };
  const searchList = (value = '') => {
    if (value?.trim() == '') {
      setSearchReasult(responseData);
      return;
    }
    if (value?.trim()?.length > 0) {
      const val = value?.trim().toLowerCase();
      const valued = responseData?.filter(v => {
        return v?.asset_name?.toLowerCase().includes(val);
      });
      setSearchReasult(valued);
    }
  };
  const splitTet = () => {
    const textsplit = locationSelectName?.toString()?.split(',');
    const buildingName =
      textsplit?.length > 0 && textsplit[0] != ''
        ? textsplit[0]
        : defaultBuliding;
    const floorName = textsplit?.length > 1 ? textsplit[1] : defaultFloor;
    return (
      <>
        <h6>{buildingName ? buildingName : 'Select the location...'}</h6>
        <p>{floorName}</p>
      </>
    );
  };
  return (
    <div className="change-quick-book-header">
      <div className="quick-book-header p-0">
        <Link
          to="#"
          className={`clear-book ${selectedAsset != null ? '' : 'opacity-50'}`}
          onClick={() => {
            dispatch(setPlanPopup(false));
            if (selectedAssetId == null) {
              changeWorkspaces();
            }
          }}
        >
          <i className="fas fa-angle-left" />
        </Link>
        <h4>
          {findLabelText(type?.split(' ').join('_'), type, 'Common_Values')}
        </h4>
      </div>
      <div className="change-quick-date change-quick-date-inner">
        {getUserPreferedDateFormat(startDate)}{' '}
        <span className="change-quick-date-cricle"></span>
        {getPrefereredTimeToDisplay(startTime) +
          findLabelText('to ', ' to ', 'Common_Values') +
          getPrefereredTimeToDisplay(endTime)}
      </div>
      <div className="filter-detail filter-detail-inner d-flex justify-content-start">
        <Link to="#" className="filter-tag">
          {findLabelText('Filter', 'Filter', 'Locate')}
          <img src={filter_icon} className="ms-2" alt="img" />
        </Link>
      </div>
      <div className="filter-input">
        <Link to="#" onClick={handleLocationPage}>
          <div className="location-booking mb-2 mt-2">
            <div className="booking-desk-details">{splitTet()}</div>
            <span>
              <div>
                <img src={bookLocation} alt="img" />
              </div>
            </span>
          </div>
        </Link>
      </div>
      <div className="filter-search filter-input choose-filter-input">
        <Controller
          name="Search"
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <input
                value={value}
                type="text"
                defaultValue={''}
                className="input-filter"
                placeholder={findLabelText('Find', 'Find', 'Locate')}
                onChange={val => {
                  searchList(val.target.value);
                  if (searchList?.length > 0) {
                    const findChar = specialChars.find(char =>
                      val.target.value.includes(char),
                    );
                    if (findChar == undefined) {
                      setShowCharValidationMsg(false);
                    } else {
                      setShowCharValidationMsg(true);
                    }
                    onChange(val);
                    trigger('Search');
                  } else {
                  }
                }}
              />
              {isShowCharValidationMsg ? (
                <label style={{ color: 'red' }}>
                  {QuickbookValidation.specialCharValidation}
                </label>
              ) : errors.Search?.message ? (
                <label style={{ color: 'red' }}>{errors.Search?.message}</label>
              ) : null}
            </>
          )}
        />
        <div className="img-group">
          <Link to="#">
            <img src={Search} alt="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ChooseAssetHeader;
