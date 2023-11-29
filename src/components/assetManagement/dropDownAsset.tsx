import { Search, dropdown_angle, teamIcon } from '../../components/imagepath';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiUrl, AssetSearchTeams } from '../../services/apiurl';
import { postData } from '../../services/apicall';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { findFirstName } from '../../assets/globals';
import Loader from '../../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { handleLocationEdit } from '../../reduxStore/appSlice';
import { Descriptions } from './constant';
import { findLabelText } from '../commonMethod';

interface DropdownAssetPros {
  name?: string;
  subName?: string;
  teamId?: number | string;
  selectedValue?: any;
  updateValue?: any;
  apiName?: any;
  matches?: any;
  matchList?: any;
  parentLocationChangeModel?: any;
  hideAddButton?: any;
  teamName?: string;
  single?: any;
  image?: any;
  id?: any;
  data?: any;
}
export const DropdownAsset: React.FC<DropdownAssetPros> = ({
  name,
  subName,
  teamId,
  selectedValue,
  updateValue,
  apiName,
  matches,
  matchList,
  parentLocationChangeModel,
  hideAddButton,
  teamName,
  single,
  image,
  id,
  data,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultText, setNoResultText] = useState('');
  const [userteamCollapse, setUserteamCollapse] = useState(true);
  const { locationEdit } = useSelector((state: any) => state?.app);

  useEffect(() => {
    if (search?.trim()?.length == 0) {
      setSearchList([]);
      setNoResultText('');
    }
    const debounce = setTimeout(() => {
      search && getSearchList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (locationEdit) {
        setSearchList([]);
        setSearch('');
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [locationEdit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== '') {
        dispatch(handleLocationEdit(false));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const getUrl = apiName => {
    if (apiName !== '' && apiName !== null && apiName !== undefined) {
      switch (apiName) {
        case 'team':
          return AssetSearchTeams;
        case 'groupUser':
          return ApiUrl.getUserDetailList;
        default:
          return '';
      }
    } else return '';
  };
  const getSearchList = () => {
    setLoading(true);
    const postUrl = getUrl(apiName);
    const payload = { name: search?.trim() };
    if (teamId) {
      payload['team_id'] = teamId;
    }
    if (postUrl !== '') {
      postData(postUrl, payload, (data, res) => {
        setLoading(false);
        if (apiName == 'team') {
          setNoResultText('');
          if (matches) {
            const ids = matchList?.map(c => c.id);
            const res = data?.List?.filter(
              item =>
                !ids.includes(item?.id) &&
                item?.name?.toLowerCase()?.includes(search?.toLowerCase()),
            );
            setSearchList(res);
            res?.length == 0 && setNoResultText(Descriptions.noMatchFound);
          }
        } else if (data?.List?.length == 0 || data?.length == 0) {
          setNoResultText(Descriptions.noMatchFound);
          setSearchList([]);
        } else {
          setSearchList(data);
          setNoResultText('');
        }
        dispatch(handleLocationEdit(false));
      });
    }
  };
  const changeSearchText = event => {
    if (event?.target?.value?.trim()?.length > 30) {
      setNoResultText(Descriptions.charLimitMsg);
    } else if (apiName == 'groupUser' && !teamId) {
      setNoResultText(Descriptions.pleaseSelectTeam);
    } else {
      setNoResultText('');
      setSearch(event?.target?.value);
    }
  };

  const handleChange = opt => {
    if (opt?.id == null) {
    } else if (single !== 'single') {
      const checkData = selectedValue?.find(val => val?.id == opt?.id);
      if (checkData == undefined) {
        const newList = selectedValue;
        newList?.push(opt);
        updateValue(newList);
        setSearch('');
        setSearchList([]);
      } else {
        updateValue(selectedValue);
        setSearch('');
        setSearchList([]);
      }
    } else {
      updateValue([opt]);
      setSearch('');
      setSearchList([]);
    }
  };

  return (
    <>
      <div className="locate-manage">
        <div className="locate-managehead">
          <Link
            data-bs-toggle="collapse"
            to="#userteam"
            role="button"
            aria-expanded={userteamCollapse ? 'false' : 'true'}
            aria-controls="locate"
            onClick={() => setUserteamCollapse(!userteamCollapse)}
          >
            {name}
            <img
              src={dropdown_angle}
              alt="img"
              className={
                userteamCollapse ? 'collapse-rotate' : 'collapse-norotate'
              }
            />
          </Link>
        </div>
        <div
          className="collapse show"
          id="userteam"
          style={{ display: userteamCollapse ? 'block' : 'none' }}
        >
          <div className="approve-work-group">
            <div className="team-asign-blk">
              <span>{subName}</span>
              <div className="filter-search filter-input">
                <div className="position-relative">
                  <input
                    type="text"
                    value={search}
                    onChange={changeSearchText}
                    className="input-filter bg-white"
                  />
                  <div className="img-group">
                    <Link to="#">
                      <img src={Search} alt="img" />
                    </Link>
                  </div>
                </div>
                {loading && <Loader height={'30'} width={'30'} />}
                {noResultText && (
                  <p className="no-result-text">{noResultText}</p>
                )}
                <div
                  className={
                    searchList?.length > 0
                      ? 'locate-manage locatedropdown locate-absolute'
                      : ''
                  }
                >
                  {searchList &&
                    searchList?.map((opt: any, index) => (
                      <div
                        key={index}
                        className="locate-managename"
                        onClick={() => {
                          handleChange(opt);
                        }}
                      >
                        <div className="name-groups">
                          <div className="work-name-img work-name-img-small">
                            <Link
                              to="#"
                              data-bs-toggle={
                                parentLocationChangeModel ? 'modal' : ''
                              }
                              data-bs-target={
                                parentLocationChangeModel
                                  ? '#parent-confirm-modal'
                                  : ''
                              }
                            >
                              {image ? (
                                <img
                                  src={teamIcon}
                                  alt="icon"
                                  style={{ width: '20px' }}
                                />
                              ) : opt?.profile_image?.trim() ||
                                opt?.profile_photo?.trim() ? (
                                <GetImgaeFromS3Bucket
                                  imageFile={
                                    opt?.profile_image
                                      ? opt?.profile_image
                                      : opt?.profile_photo
                                  }
                                  type={'image'}
                                  userDetail={opt}
                                  name={findFirstName(
                                    opt?.name ? opt?.name : opt?.full_name,
                                  )}
                                  style={'small'}
                                />
                              ) : (
                                <p className="user-firstletter user-firstletter-small">
                                  {findFirstName(
                                    opt?.name ? opt?.name : opt?.full_name,
                                  )}
                                </p>
                              )}
                            </Link>
                          </div>
                          <h5>
                            <Link
                              to="#"
                              data-bs-toggle={
                                parentLocationChangeModel ? 'modal' : ''
                              }
                              data-bs-target={
                                parentLocationChangeModel
                                  ? '#parent-confirm-modal'
                                  : ''
                              }
                            >
                              {opt?.name ? opt?.name : opt?.full_name}
                            </Link>
                          </h5>
                        </div>
                        <div className="remove-links">
                          <Link
                            data-bs-toggle={
                              parentLocationChangeModel ? 'modal' : ''
                            }
                            data-bs-target={
                              parentLocationChangeModel
                                ? '#parent-confirm-modal'
                                : ''
                            }
                            to="#"
                            className="remove-link"
                          >
                            {hideAddButton ? '' : 'Add'}
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {selectedValue &&
              selectedValue?.map((val, index) => (
                <div key={index} className="asset-pmo-team">
                  <div className="locate-managename p-0 pb-2">
                    <div className="locate-desk">
                      <div className="locate-deskimg d-flex">
                        {!image ? (
                          val?.profile_image?.trim() ||
                          val?.profile_photo?.trim() ? (
                            <GetImgaeFromS3Bucket
                              imageFile={
                                val?.profile_image
                                  ? val?.profile_image
                                  : val?.profile_photo
                              }
                              type={'image'}
                              userDetail={val}
                              name={findFirstName(
                                val?.name ? val?.name : val?.full_name,
                              )}
                            />
                          ) : (
                            <p className="user-firstletter user-firstletter-small">
                              {findFirstName(
                                val?.name ? val?.name : val?.full_name,
                              )}
                            </p>
                          )
                        ) : (
                          <img src={teamIcon} alt="img" />
                        )}
                      </div>
                      <div className="locate-deskcontent">
                        <h4 className={single ? 'pmo-text' : ''}>
                          {val?.name ? val?.name : val?.full_name}
                        </h4>
                        {teamName && <h6>{teamName}</h6>}
                      </div>
                    </div>
                    {!single && (
                      <div className="remove-links">
                        <Link
                          to="#"
                          onClick={() => {
                            const removeList = selectedValue;
                            removeList.splice(index, 1);
                            updateValue(removeList);
                            setSearch('');
                            setSearchList([]);
                          }}
                          className="remove-link"
                        >
                          {findLabelText('Remove', 'Remove', 'Team_Management')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
