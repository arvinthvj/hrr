import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { teamList, userviewlocateUrl } from '../../assets/constants/pageurl';
import { findFirstName } from '../../assets/globals';
import { postData } from '../../services/apicall';
import { GlobalSearch } from '../../services/apiurl';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import Loader from '../loader';
import { findLabelText } from '../commonMethod';
import {
  AssetNamesAndIcons,
  GlobalSearchOptions,
  HeaderValidationMessages,
} from './constant';

export const HeaderSearch = () => {
  const ref = useRef<any>(null);
  const [displaySearch, setDisplaySearch] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultText, setNoResultText] = useState('');

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchUser('');
        setDisplaySearch('');
        setSearchList([]);
        setNoResultText('');
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    searchUser == '' && setSearchList([]);
    const debounce = setTimeout(() => {
      searchUser && getSearchList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchUser]);

  const handleSearch = e => {
    if (
      e == '' ||
      (e?.trim()?.length <= 30 && e?.trim() !== displaySearch.trim())
    )
      setSearchUser(e?.toLowerCase());
    if (e?.trim()?.length > 30) {
      setNoResultText(HeaderValidationMessages.charLength);
    } else {
      setNoResultText('');
      setDisplaySearch(e);
    }
  };

  const getSearchList = () => {
    setLoading(true);
    const SuccessCallback = (data, res) => {
      setLoading(false);
      if (res.data.code == 200) {
        const list: any = [];
        if (data?.List?.length > 0) {
          for (const item of data?.List) {
            if (item?.module == 'Asset') {
              if (item?.is_mapped == 1) {
                list.push(item);
              }
            } else {
              list.push(item);
            }
          }
        }
        if (list?.length > 0) {
          setSearchList(list); // check response
          setNoResultText('');
        } else {
          setSearchList([]);
          setNoResultText(HeaderValidationMessages.noResultFound);
        }
      } else {
        setSearchList([]);
        setNoResultText(HeaderValidationMessages.noResultFound);
      }
    };
    const payload = {
      search_name: searchUser?.trim(),
    };
    postData(GlobalSearch, payload, SuccessCallback);
  };

  const getPageUrl = module => {
    if (module) {
      switch (module) {
        case GlobalSearchOptions.user:
          return teamList;
        case GlobalSearchOptions.team:
          return teamList;
        case GlobalSearchOptions.asset:
        case GlobalSearchOptions.workspace:
        case GlobalSearchOptions.room:
        case GlobalSearchOptions.parking:
          return userviewlocateUrl;
        case GlobalSearchOptions.location:
          return userviewlocateUrl;
      }
    }
  };

  const getImageName = searchValue => {
    if (searchValue) {
      switch (searchValue?.module) {
        case GlobalSearchOptions.user:
          return searchValue?.image;
        case GlobalSearchOptions.team:
          return AssetNamesAndIcons.teamIcon;
        case GlobalSearchOptions.workspace:
          return AssetNamesAndIcons.deskIcon;
        case GlobalSearchOptions.room:
          return AssetNamesAndIcons.roomIcon;
        case GlobalSearchOptions.parking:
          return AssetNamesAndIcons.parkingIcon;
        case GlobalSearchOptions.location:
          return AssetNamesAndIcons.locationIcon;
        default:
          return AssetNamesAndIcons.deskIcon;
      }
    }
  };

  return (
    <div ref={ref} className="top-nav-search">
      <form role="search" method="get" className="search-form" action="">
        <div>
          <label>
            <input
              value={displaySearch}
              type="text"
              className="search-field"
              placeholder={findLabelText('Search', 'Search', 'Locate')}
              title="Search for:"
              onChange={e => handleSearch(e?.target?.value)}
            />
            <div className="search-seperator"></div>
          </label>
        </div>
        <>
          <div
            className={`global-search-section ${
              loading || (searchUser && searchList?.length > 0)
                ? 'd-block'
                : 'd-none'
            }`}
          >
            <div className="global-search-section-inner">
              {searchUser && searchList?.length > 0 ? (
                searchList?.map((searchValue: any, index) => {
                  const pageUrl: any = getPageUrl(searchValue?.module);
                  return (
                    <div className="global-search-grid" key={index}>
                      <Link
                        to={pageUrl}
                        state={{
                          search_id:
                            searchValue?.module != 'Location'
                              ? searchValue?.search_id
                              : null,
                          search_type: searchValue?.type?.toLowerCase(),
                          search_name: searchValue?.display_name,
                          search_location_id:
                            searchValue?.module == 'Location'
                              ? searchValue?.search_id
                              : searchValue?.location_id,
                          search_location_name: searchValue?.location,
                        }}
                        onClick={() => {
                          setSearchList([]);
                          setDisplaySearch('');
                          setSearchUser('');
                        }}
                      >
                        <div
                          className={`global-search-info ${
                            searchValue?.module == 'User'
                              ? 'global-search-user'
                              : ''
                          }`}
                        >
                          <div className="global-search-icon">
                            {searchValue?.image == '' ||
                            (searchValue?.image == null &&
                              searchValue?.module == 'User') ? (
                              <p className="global-first-letter">
                                <span>
                                  {findFirstName(searchValue?.display_name)}
                                </span>
                              </p>
                            ) : (
                              <GetImgaeFromS3Bucket
                                imageFile={getImageName(searchValue)}
                                type={'image'}
                                FilePath={
                                  searchValue?.module != 'User' ? 'gat' : ''
                                }
                                userDetail={searchValue}
                                name={findFirstName(searchValue?.display_name)}
                                style={'globalsearch'}
                              />
                            )}
                          </div>
                          <div className="global-search-content">
                            <h6>{searchValue?.display_name}</h6>
                            {searchValue?.description && (
                              <p>
                                <b>
                                  {findLabelText(
                                    'Description',
                                    'Description',
                                    'Locate',
                                  )}
                                  :{' '}
                                </b>{' '}
                                {searchValue?.description}
                              </p>
                            )}
                            {searchValue?.capacity && (
                              <p>
                                <b>
                                  {findLabelText(
                                    'Capacity',
                                    'Capacity',
                                    'Locate',
                                  )}
                                  :{' '}
                                </b>
                                {searchValue?.capacity}
                              </p>
                            )}
                            {searchValue?.location && (
                              <p>
                                <b>
                                  {findLabelText(
                                    'Location',
                                    'Location',
                                    'Team',
                                  )}
                                  :{' '}
                                </b>{' '}
                                {searchValue?.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : loading ? (
                <Loader height={'30'} width={'30'} />
              ) : null}
            </div>
          </div>
        </>
      </form>
      {noResultText != '' ? (
        <p className="no-result-text">{noResultText}</p>
      ) : null}
    </div>
  );
};
