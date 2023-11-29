import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findFirstName } from '../../assets/globals';
import { flooricon } from '../../components/imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';

type searchProps = {
  workspace: string;
  user_id: string;
  booking_location_id: string;
  profile_photo: string;
  display_name: string;
  module: string;
  findSearchList: [];
  searchUser: string;
  handledetailPage: CallableFunction;
}

export const TeamSearch = ({
  findSearchList,
  searchUser,
  handledetailPage,
  setSearchUser,
}) => {
  const [searchList, setSearchList] = useState([]);
  const [noResultText, setNoResultText] = useState('');
  useEffect(() => {
    searchUser && getSearchList(findSearchList);
  }, [searchUser]);
  const getSearchList = list => {
    if (list?.length > 0) {
      setSearchList(list); // check response
      setNoResultText('');
    } else {
      setSearchList([]);
      setNoResultText('No matching results found');
    }
  };
  return (
    <div className="top-nav-search" style={{ display: 'contents' }}>
      <form role="search" method="get" className="search-form" action="">
        <>
          <div
            className={`global-search-section ${
              searchUser && searchList?.length > 0 ? 'd-block' : 'd-none'
            }`}
          >
            <div className="global-search-section-inner">
              {searchUser && searchList?.length > 0
                ? searchList?.map((searchValue: searchProps, index) => {
                    return (
                      <div className="global-search-grid" key={index}>
                        <div className="global-search-info location-icon-div">
                          <div className="table-avatar user-profile">
                            <Link
                              to={
                                searchValue?.workspace
                                  ? '/user-view-locate'
                                  : '#'
                              }
                              onClick={
                                searchValue?.workspace
                                  ? () =>
                                      handledetailPage(
                                        searchValue?.user_id,
                                        'viemManager',
                                        'teamsearch',
                                      )
                                  : () => {
                                      handledetailPage(searchValue);
                                      setSearchUser('');
                                    }
                              }
                              state={{
                                floorId: searchValue?.workspace
                                  ? searchValue?.booking_location_id
                                  : '',
                              }}
                              className="work-name-img work-name-img-big location-icon"
                            >
                              {searchValue?.profile_photo == '' ||
                              searchValue?.profile_photo == ' ' ? (
                                <p className="global-first-letter">
                                  <span>
                                    {findFirstName(searchValue?.display_name)}
                                  </span>
                                </p>
                              ) : (
                                <GetImgaeFromS3Bucket
                                  imageFile={searchValue?.profile_photo}
                                  type={'image'}
                                  FilePath={
                                    searchValue?.module != 'User'
                                      ? 'image'
                                      : 'gat'
                                  }
                                  userDetail={searchValue}
                                  name={findFirstName(
                                    searchValue?.display_name,
                                  )}
                                  style={'globalsearch'}
                                />
                              )}
                              <h6 className="ms-2">
                                {searchValue?.display_name}
                              </h6>
                            </Link>
                          </div>
                          {searchValue?.workspace && (
                            <Link
                              style={{ marginRight: '15px' }}
                              to="/user-view-locate"
                              state={{
                                floorId: searchValue?.booking_location_id,
                              }}
                            >
                              <img src={flooricon} alt="img" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </>
      </form>
      {noResultText != '' ? (
        <p className="no-result-text p-0">{noResultText}</p>
      ) : null}
    </div>
  );
};
