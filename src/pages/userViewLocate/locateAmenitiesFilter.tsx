import React from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../../components/commonMethod';
import {
  AssetTypes,
  LocateLabelText,
} from '../../components/locateComponent/constants';
import { Search, filter_icon, filters } from '../../components/imagepath';

const LocateAmenitiesFilter = ({
  handleClick,
  handleCancel,
  filter,
  setFilter,
  amenitiesFilter,
  filterSearch,
  handleFilterSearch,
  selectAll,
  statuschange,
  workspaceAmenities,
  onChangeCheckbox,
  roomSelectAll,
  roomStatuschange,
  roomAmenities,
  parkSelectAll,
  parkStatuschange,
  setSelectedAmenities,
  setFilterSearch,
  parkingAmenities,
  handleApply,
}) => {
  return (
    <div className="locat-panel">
      <div className="filter-detail locate-filter-detail">
        <Link to="#" className="filter-tag" onFocus={handleClick}>
          {findLabelText(
            LocateLabelText.Filter,
            LocateLabelText.Filter,
            LocateLabelText.Locate,
          )}
          <img src={filter_icon} alt="img" />
        </Link>
        <div
          className={` filter-viewdetails filter-view-details-info ${
            filter ? 'filter-viewdetails' : 'filter-viewdetails d-none'
          }`}
        >
          <div className="filter-viewdetailshead">
            <div className="row align-items-center">
              <div className="col-lg-5 col-sm-12">
                <div className="filter-heads filter-heads-inner">
                  <h2>
                    {findLabelText(
                      LocateLabelText.Filter,
                      LocateLabelText.Filter,
                      LocateLabelText.Locate,
                    )}
                    <img src={filters} alt="img" className="mx-2" />
                    <span>
                      (
                      {amenitiesFilter()?.work?.length > 0 ||
                      amenitiesFilter()?.room?.length > 0 ||
                      amenitiesFilter()?.park?.length > 0
                        ? amenitiesFilter()?.work?.length +
                          amenitiesFilter()?.room?.length +
                          amenitiesFilter()?.park?.length
                        : 0}
                      )
                    </span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12">
                <div className="filter-search  filter-input locate-filter-search filter-search-head">
                  <input
                    type="text"
                    placeholder={findLabelText(
                      LocateLabelText.Search,
                      LocateLabelText.Search,
                      LocateLabelText.Locate,
                    )}
                    value={filterSearch || ''}
                    className="input-filter"
                    onChange={e =>
                      handleFilterSearch(e?.target?.value.toLowerCase())
                    }
                  />
                  <div className="img-group">
                    <span>
                      <img src={Search} alt="img" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-8">
                <div className="filterpaths">
                  <div className="filterheader">
                    <div className="checkbox-set locate-fliter-icon">
                      <label className="check">
                        {findLabelText(
                          LocateLabelText.Workspaces,
                          LocateLabelText.Workspaces,
                          LocateLabelText.Locate,
                        )}
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={e => {
                            statuschange(e.target.checked);
                          }}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div
                    className="book-filter-scroll filtercontent collapse show"
                    id="collapseOne"
                  >
                    <ul className="mt-0">
                      {workspaceAmenities &&
                        workspaceAmenities?.map(a => (
                          <li key={a?.id}>
                            <h4>{a?.name}</h4>
                            <div className="checkbox-set">
                              <label className="check">
                                <input
                                  type="checkbox"
                                  checked={a?.checked}
                                  onChange={() => onChangeCheckbox(a, 'work')}
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-8">
                <div className="filterpaths">
                  <div className="filterheader">
                    <div className="checkbox-set locate-fliter-icon">
                      <label className="check">
                        {findLabelText(
                          LocateLabelText.Rooms,
                          LocateLabelText.Rooms,
                          LocateLabelText.Locate,
                        )}
                        <input
                          type="checkbox"
                          checked={roomSelectAll}
                          onChange={e => {
                            roomStatuschange(e.target.checked);
                          }}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div
                    className="book-filter-scroll filtercontent collapse show"
                    id="collapsefilter"
                  >
                    <ul className="mt-0">
                      {roomAmenities &&
                        roomAmenities?.map(a => (
                          <li key={a?.id}>
                            <h4>{a?.name}</h4>
                            <div className="checkbox-set">
                              <label className="check">
                                <input
                                  type="checkbox"
                                  checked={a?.checked}
                                  onChange={() => onChangeCheckbox(a, 'room')}
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-8">
                <div className="filterpaths">
                  <div className="filterheader">
                    <div className="checkbox-set locate-fliter-icon">
                      <label className="check">
                        {findLabelText(
                          LocateLabelText.Parking,
                          LocateLabelText.Parking,
                          LocateLabelText.Locate,
                        )}
                        <input
                          type="checkbox"
                          checked={parkSelectAll}
                          onChange={e => {
                            parkStatuschange(e.target.checked);
                          }}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div
                    className="book-filter-scroll filtercontent collapse show"
                    id="collapsefilter"
                  >
                    <ul className="mt-0">
                      {parkingAmenities &&
                        parkingAmenities?.map(a => (
                          <li key={a?.id}>
                            <h4>{a?.name}</h4>
                            <div className="checkbox-set">
                              <label className="check">
                                <input
                                  type="checkbox"
                                  checked={a?.checked}
                                  onChange={() =>
                                    onChangeCheckbox(a, AssetTypes.parking)
                                  }
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-btn-path">
              <Link className="btn-cancel" to="#" onClick={handleCancel}>
                {findLabelText(
                  LocateLabelText.Cancel,
                  LocateLabelText.Cancel,
                  LocateLabelText.Locate,
                )}
              </Link>
              <Link
                className={`btn btn-apply`}
                to="#"
                onClick={() => {
                  setFilter(current => !current);
                  handleApply();
                  const amenitiesSel = amenitiesFilter();
                  setSelectedAmenities(amenitiesSel);
                  setFilterSearch('');
                }}
              >
                {findLabelText(
                  LocateLabelText.Apply,
                  LocateLabelText.Apply,
                  LocateLabelText.Locate,
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateAmenitiesFilter;
