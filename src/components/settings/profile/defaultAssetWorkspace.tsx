import React, { useContext, useRef } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { Link } from 'react-router-dom';
import DropDownOptions from '../../dropDown/dropdownOptions';
import { Search } from '../../imagepath';
import { AssetNames, ButtonNames, TabNames } from '../constant';

const DefaultAssetWorkspace = () => {
  const {
    asertWorkSpace,
    setAsertWorkSpace,
    assetRef,
    assetListData,
    UpdateDefaultAssert,
  } = useContext(ProfileContext);
  return (
    <>
      <h6 style={{ fontSize: '14px' }}>
        {findLabelText('Workspaces', AssetNames.workspaces, TabNames.settings)}
      </h6>

      {asertWorkSpace?.status ? (
        <div className="img-group location-img-group" ref={assetRef}>
          <div className="filter-search filter-input locate-serch-fill input-place-grp default-assets default-edit-only">
            {!asertWorkSpace?.searchStatus &&
            asertWorkSpace?.searchValue == '' ? (
              <>
                <div
                  className="input-filter filter-edit-input edit-input-text"
                  onClick={() => {
                    setAsertWorkSpace({
                      ...asertWorkSpace,
                      searchStatus: true,
                    });
                  }}
                >
                  <h6>
                    {asertWorkSpace?.data?.length > 0 &&
                      asertWorkSpace?.data[0]?.name}
                  </h6>
                  <p>
                    {asertWorkSpace?.data?.length > 0 &&
                      asertWorkSpace?.data[0]?.location_name}
                  </p>
                </div>
              </>
            ) : (
              <input
                className="input-filter filter-edit-input"
                autoFocus={true}
                onFocus={() => {
                  setAsertWorkSpace({
                    ...asertWorkSpace,
                    workspaceFocusd: true,
                    searchStatus: true,
                  });
                }}
                value={
                  asertWorkSpace?.searchValue ? asertWorkSpace?.searchValue : ''
                }
                onChange={e => {
                  setAsertWorkSpace({
                    ...asertWorkSpace,
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
            {asertWorkSpace?.data?.length > 0 && asertWorkSpace?.data[0]?.name
              ? asertWorkSpace?.data[0]?.name
              : ''}
          </h4>

          <Link
            to="#"
            onClick={() =>
              setAsertWorkSpace({
                ...asertWorkSpace,
                status: !asertWorkSpace?.status,
              })
            }
            className="leave-edit-btn"
          >
            {findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)}
          </Link>
        </div>
      )}
      {(asertWorkSpace?.workspaceFocusd &&
        asertWorkSpace?.searchStatus &&
        asertWorkSpace?.searchValue == '') ||
      asertWorkSpace?.searchValue ? (
        <DropDownOptions
          options={
            asertWorkSpace?.searchValue
              ? assetListData.filterWorkSpaces
              : assetListData?.workSpaces
          }
          onChange={data => {
            UpdateDefaultAssert(
              assetListData?.workSpaces?.find(i => i?.value == data?.value),
              AssetNames.workspaces,
            );
            setAsertWorkSpace({
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
              workspaceFocusd: false,
            });
          }}
          type={'workspace'}
          hideAddButton={asertWorkSpace?.status}
          parentLocationChangeModel={asertWorkSpace?.status}
        />
      ) : null}
    </>
  );
};

export default DefaultAssetWorkspace;
