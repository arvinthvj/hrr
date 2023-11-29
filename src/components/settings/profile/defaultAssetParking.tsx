import React, { useContext } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { Search } from '../../imagepath';
import { Link } from 'react-router-dom';
import DropDownOptions from '../../dropDown/dropdownOptions';
import { AssetNames, ButtonNames, TabNames } from '../constant';

const DefaultAssetParking = () => {
  const {
    assetParking,
    setAssetParking,
    assetRef,
    assetListData,
    UpdateDefaultAssert,
  } = useContext(ProfileContext);
  return (
    <>
      <h6 style={{ fontSize: '14px' }}>
        {findLabelText('Parking', AssetNames.parking, TabNames.settings)}
      </h6>

      {assetParking?.status ? (
        <div className="img-group location-img-group" ref={assetRef}>
          <div className="filter-search filter-input locate-serch-fill input-place-grp default-assets default-edit-only">
            {!assetParking?.searchStatus && assetParking?.searchValue == '' ? (
              <>
                <div
                  className="input-filter filter-edit-input edit-input-text"
                  onClick={() => {
                    setAssetParking({
                      ...assetParking,
                      searchStatus: true,
                    });
                  }}
                >
                  <h6>
                    {assetParking?.data?.length > 0 &&
                      assetParking?.data[0]?.name}
                  </h6>
                  <p>
                    {assetParking?.data?.length > 0 &&
                      assetParking?.data[0]?.location_name}
                  </p>
                </div>
              </>
            ) : (
              <input
                className="input-filter filter-edit-input"
                autoFocus={true}
                onFocus={() => {
                  setAssetParking({
                    ...assetParking,
                    parkingFocusd: true,
                    searchStatus: true,
                  });
                }}
                value={
                  assetParking?.searchValue ? assetParking?.searchValue : ''
                }
                onChange={e => {
                  setAssetParking({
                    ...assetParking,
                    searchValue: e?.target?.value,
                  });
                }}
              />
            )}
            <div className="img-group location-img-group edit-img-group">
              <Link to="#">
                <img src={Search} alt="img" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="office-views-team">
          <h4>
            {assetParking?.data?.length > 0 && assetParking?.data[0]?.name
              ? assetParking?.data[0]?.name
              : ''}
          </h4>
          <Link
            to="#"
            onClick={() =>
              setAssetParking({
                ...assetParking,
                status: !assetParking?.status,
              })
            }
            className="leave-edit-btn"
          >
            {findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
          </Link>
        </div>
      )}
      {(assetParking?.parkingFocusd &&
        assetParking?.searchStatus &&
        assetParking?.searchValue == '') ||
      assetParking?.searchValue ? (
        <DropDownOptions
          options={
            assetParking?.searchValue
              ? assetListData?.filterParking
              : assetListData?.Parking
          }
          onChange={data => {
            UpdateDefaultAssert(
              assetListData?.Parking?.find(i => i?.value == data?.value),
              AssetNames.parking,
            );
            setAssetParking({
              status: false,
              data: [
                {
                  name: data?.name,
                  id: data?.id || data?.value,
                  location_name: data?.location_name,
                  label: data?.name,
                },
              ],
              searchValue: '',
              searchStatus: false,
            });
          }}
          type={'parking'}
          hideAddButton={assetParking?.status}
          parentLocationChangeModel={assetParking?.status}
        />
      ) : null}
    </>
  );
};

export default DefaultAssetParking;
