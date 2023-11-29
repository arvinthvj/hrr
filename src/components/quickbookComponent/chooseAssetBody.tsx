import React, { useContext } from 'react';
import Loader from '../loader';
import { Link } from 'react-router-dom';
import { QuickBookAssetCardContext } from '../context/context';
import { findLabelText } from '../commonMethod';
import { useDispatch } from 'react-redux';
import { setPlanPopup } from '../../reduxStore/quickBookSlice';
import { AssetStatusIds } from './constant';

type ChooseAssetProps = {
  loadingStatus: boolean;
  searchResult: Array<any> | any;
  setSearchReasult: CallableFunction;
  setSelected: CallableFunction;
  selected: Object | any;
  changeWorkspaces: CallableFunction;
}

const ChooseAssetBody: React.FC<ChooseAssetProps> = ({
  loadingStatus,
  searchResult,
  setSearchReasult,
  setSelected,
  selected,
  changeWorkspaces,
}) => {
  const dispatch = useDispatch();
  const {
    handleSelection,
    selectedAsset,
    selectedAssetId,
    setSelectedAssetId,
  } = useContext(QuickBookAssetCardContext);

  const handleSelect = item => {
    handleSelection(item);
    handleSelected(item);
    setSelected(item);
    setSelectedAssetId(item?.asset_id);
  };
  const handleSelected = item => {
    const newlist = [...searchResult];
    newlist.unshift(item);
    const cleanSearch = newlist?.filter(
      (arr, index, self) =>
        index === self.findIndex(t => t?.asset_id === arr?.asset_id),
    );
    setSearchReasult(cleanSearch);
  };
  return (
    <div className="card-body">
      {loadingStatus && <Loader />}
      {!loadingStatus && searchResult && searchResult?.length > 0 ? (
        searchResult?.map((item: any, idx: any) => {
          return (
            <div
              className="booking-location-grid booking-location-grid-info booking-location-grid-inner chooseworkspace"
              key={idx}
            >
              <div className="booking-desk">
                <div className="booking-desk-info">
                  <div className="booking-desk-details ms-0">
                    <h5>{item.asset_name}</h5>
                    <p>{item.location_name}</p>
                  </div>
                </div>
                <div className="booking-desk-change">
                  <Link
                    className="book-text-selected book-text-select"
                    to="#"
                    onClick={() => handleSelect(item)}
                    style={{
                      color:
                        item?.asset_id === selected?.asset_id ? 'black' : '',
                    }}
                  >
                    {item?.asset_id === selected?.asset_id
                      ? findLabelText('Selected', 'Selected', 'Common_Values')
                      : findLabelText(
                          'Select',
                          'Select',
                          'Floorplan_Management',
                        )}
                  </Link>
                </div>
              </div>
              <div className="booking-desk-list">
                <ul className="nav">
                  {item?.amenities &&
                    item?.amenities?.map((amenity, index) => (
                      <li key={index}>{amenity?.name}</li>
                    ))}
                </ul>
              </div>
              <div
                className={
                  item?.asset_status == AssetStatusIds.byRequest
                    ? 'booking-request'
                    : 'booking-available'
                }
              >
                <p>
                  {item?.asset_status == AssetStatusIds.available &&
                  item?.booking_status == '' ? (
                    <span />
                  ) : item?.asset_status == AssetStatusIds.byRequest ? (
                    <span />
                  ) : (
                    <span className="ps-0 booking-unavailable" />
                  )}{' '}
                  {item?.asset_status == AssetStatusIds.available &&
                  item?.booking_status == '' ? (
                    <>
                      {' '}
                      {findLabelText('Available', 'Available', 'Common_Values')}
                    </>
                  ) : item?.asset_status == AssetStatusIds.byRequest ? (
                    findLabelText(
                      'Available to request',
                      'Available to request',
                      'Common_Values',
                    )
                  ) : (
                    <>
                      {' '}
                      {findLabelText(
                        'Unavailable',
                        'Unavailable',
                        'Common_Values',
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      {!searchResult && searchResult?.length == 0 && (
        <div className="search-Norecords search-norecords-info">
          {' '}
          {findLabelText('No_records', 'No records', 'Common_Values')}{' '}
        </div>
      )}
      <div className="card-footer">
        <div className="booking-btns">
          <Link
            to="#"
            className={`btn prev_btn ${
              selectedAsset != null ? '' : 'opacity-50'
            }`}
            onClick={() => {
              dispatch(setPlanPopup(false));
              if (selectedAssetId == null) {
                changeWorkspaces();
              }
            }}
          >
            {findLabelText('Back', 'Back', 'Dashboard')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseAssetBody;
