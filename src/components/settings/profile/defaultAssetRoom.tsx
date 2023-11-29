import React, { useContext } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { Search } from '../../imagepath';
import { Link } from 'react-router-dom';
import DropDownOptions from '../../dropDown/dropdownOptions';
import { AssetNames, ButtonNames, TabNames } from '../constant';

const DefaultAssetRoom = () => {
  const {
    assetRoom,
    setAssetRoom,
    assetRef,
    assetListData,
    UpdateDefaultAssert,
  } = useContext(ProfileContext);
  return (
    <>
      <h6 style={{ fontSize: '14px' }}>
        {findLabelText('Room', AssetNames.room, TabNames.settings)}
      </h6>

      {assetRoom?.status ? (
        <div className="img-group location-img-group" ref={assetRef}>
          <div className="filter-search filter-input locate-serch-fill input-place-grp default-assets default-edit-only">
            {!assetRoom?.searchStatus && assetRoom?.searchValue == '' ? (
              <>
                <div
                  className="input-filter filter-edit-input edit-input-text"
                  onClick={() => {
                    setAssetRoom({
                      ...assetRoom,
                      searchStatus: true,
                    });
                  }}
                >
                  <h6>
                    {assetRoom?.data?.length > 0 && assetRoom?.data[0]?.name}
                  </h6>
                  <p>
                    {assetRoom?.data?.length > 0 &&
                      assetRoom?.data[0]?.location_name}
                  </p>
                </div>
              </>
            ) : (
              <input
                className="input-filter filter-edit-input"
                autoFocus={true}
                onFocus={() => {
                  setAssetRoom({
                    ...assetRoom,
                    RoomFocusd: true,
                    searchStatus: true,
                  });
                }}
                value={assetRoom?.searchValue ? assetRoom?.searchValue : ''}
                onChange={e => {
                  setAssetRoom({
                    ...assetRoom,
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
            {assetRoom?.data?.length > 0 && assetRoom?.data[0]?.name
              ? assetRoom?.data[0]?.name
              : ''}
          </h4>
          <Link
            to="#"
            onClick={() =>
              setAssetRoom({
                ...assetRoom,
                status: !assetRoom?.status,
              })
            }
            className="leave-edit-btn"
          >
            {findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
          </Link>
        </div>
      )}
      {(assetRoom?.RoomFocusd &&
        assetRoom?.searchStatus &&
        assetRoom?.searchValue == '') ||
      assetRoom?.searchValue ? (
        <DropDownOptions
          options={
            assetRoom?.searchValue
              ? assetListData?.filterRooms
              : assetListData?.Rooms
          }
          onChange={data => {
            UpdateDefaultAssert(
              assetListData?.Rooms?.find(i => i?.value == data?.value),
              AssetNames.room,
            );
            setAssetRoom({
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
          type={'room'}
          hideAddButton={assetRoom?.status}
          parentLocationChangeModel={assetRoom?.status}
        />
      ) : null}
    </>
  );
};

export default DefaultAssetRoom;
