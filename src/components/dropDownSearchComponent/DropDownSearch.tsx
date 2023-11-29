import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  TeamIcon,
  desk,
  dropdown_angel,
  parking1,
  plus2,
  room,
  teamIcon,
} from '../imagepath';
import Loader from '../loader';
import { postData } from '../../services/apicall';
import {
  ApiUrl,
  AssetAvailableTaglists,
  AssetSearchTeams,
  AssetStoreAmenties,
  AssetTagsList,
} from '../../services/apiurl';
import DropDownOptions from '../dropDown/dropdownOptions';
import { useDispatch, useSelector } from 'react-redux';
import { firstLetterStyle } from '../../assets/constants/config';
import { findFirstName } from '../../assets/globals';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import Toaster from '../toast';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';

interface DropdownValuesProps {
  selectedValue: Array<any>;
  updateValue: CallableFunction;
  name: string;
  type: any;
  id?: number;
  searchIcon?: string;
  deleteIcon?: string;
  subName?: string;
  teamId?: string;
  single?: string;
  matchList?: Array<any>;
  matches?: string;
  asset?: string;
  isShowDelete?: boolean;
  isDisableDropdown?: boolean;
  leafFlag?: boolean;
}

export const DropdownValues: React.FC<DropdownValuesProps> = ({
  updateValue,
  selectedValue,
  name,
  type,
  id,
  searchIcon,
  deleteIcon,
  subName,
  teamId,
  single,
  matchList,
  matches,
  asset,
  isShowDelete = true,
  isDisableDropdown,
  leafFlag,
}) => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResultText, setNoResultText] = useState('');
  const { languages } = useSelector((state: any) => state.language);
  const [removedList, setRemovedList] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const findRef = useRef<any>(null);
  const [dropdownCollapse, setDropdownCollapse] = useState(true);

  // language
  const findLabelText = (module: any, text: any) => {
    const { Dropdown_components = {} } = { ...languages };
    const mod = module.split(' ').join('_');
    const label = Dropdown_components?.[mod]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };

  // for colapse id
  const findColapseId = name => {
    return name.split(' ').join('_');
  };

  useEffect(() => {
    if (!leafFlag) {
      if (type == 'member') {
      } else {
        setDropdownCollapse(false);
      }
    } else {
      setDropdownCollapse(true);
    }
  }, [leafFlag]);
  useEffect(() => {
    const handleClickOutside = event => {
      if (findRef?.current && !findRef?.current?.contains(event?.target)) {
        setSearch('');
        setSearchList([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

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

  // get list of options response
  const getSearchList = () => {
    setLoading(true);
    const postUrl = getUrl(name);
    let payload = {};
    if (teamId) {
      payload = { team_id: teamId, name: search?.trim() };
    } else {
      payload = id ? { id: id } : { name: search?.trim() };
    }
    if (postUrl !== '') {
      postData(postUrl, payload, successCallback);
    }
  };

  // get api url for different dropdown search
  const getUrl = (name: any) => {
    if (name !== '' && name !== null && name !== undefined) {
      switch (name) {
        case 'Available tags':
          return AssetAvailableTaglists;
        case 'Tags':
          return AssetTagsList;
        case 'Assign to teams':
          return AssetSearchTeams;
        case 'Manager(s)':
          return ApiUrl.searchUserName;
        case 'Availability to external teams':
          return AssetSearchTeams;
        case 'Availability to users within team':
          return ApiUrl.getUserDetailList;
        case 'Assigned workspaces':
          return ApiUrl.getSetingDetails + '/1';
        case 'Assigned rooms':
          return ApiUrl.getSetingDetails + '/2';
        case 'Assigned parking':
          return ApiUrl.getSetingDetails + '/3';
        default:
          return '';
      }
    } else return '';
  };

  const successCallback = (successRes: any) => {
    setLoading(false);
    const match = successRes !== 'error' ? findMatch(successRes) : '';
    if (
      match !== '' &&
      match !== undefined &&
      match !== null &&
      match?.length > 0
    ) {
      // setNoResultText("");
      setSearchList(match);
    } else {
      setSearchList([]);
      // setNoResultText("Already exists");
    }
  };

  const findMatch = (successRes: any) => {
    const res = successRes?.amenitiesvalues
      ? successRes?.amenitiesvalues
      : successRes?.List
      ? successRes?.List
      : successRes;
    if (res && res != 'No data' && res?.length > 0) {
      const match = res
        .filter(value => {
          const checkdata = value?.name
            ?.toLowerCase()
            .includes(search?.toLowerCase());
          if (checkdata) {
            setNoResultText('');
            return value;
          } else {
            setNoResultText('No matching results found');
          }
        })
        .filter(value => {
          const check =
            selectedValue?.length > 0
              ? selectedValue?.find(val => val?.id == value?.id)
              : null;
          if (check !== null || check !== undefined) {
            return value?.id != check?.id;
          } else {
            setNoResultText('');
            return value;
          }
        });
      // setNoResultText("");
      const selectName = selectedValue?.map(val =>
        val?.name?.toLowerCase()?.trim(),
      );
      selectName?.includes(search?.toLowerCase()?.trim())
        ? setNoResultText('Already exists')
        : setNoResultText('');

      if (selectName?.includes(search?.toLowerCase()?.trim())) {
        setNoResultText('Already exists');
      } else {
        if (
          typeof match == 'object' &&
          (name == 'Available tags' || name == 'Tags')
        ) {
          if (match?.length > 0) {
            const matchName = match?.map(val =>
              val?.name?.toLowerCase()?.trim(),
            );
            !matchName?.includes(search?.toLowerCase()?.trim()) &&
              match?.unshift({ id: null, name: search });
          } else {
            match?.unshift({ id: null, name: search });
          }
        }
        setNoResultText('');
      }
      if (matches) {
        let ids: any;

        ids = matchList?.map(c => c.id);

        return match?.filter(({ id }) => !ids.includes(id));
        //
      }
      return match;
    } else {
      if (name == 'Available tags' || name == 'Tags') {
        return [{ id: null, name: search }];
      } else {
        setNoResultText('No matching results found');
        return [];
      }
    }
  };

  const changeSearchText = event => {
    if (event?.target?.value?.trim()?.length > 30) {
      setNoResultText('Please enter less than 30 characters');
    } else {
      setNoResultText('');
      setSearch(event?.target?.value);
    }
  };

  const handleChange = opt => {
    if (opt?.id == null) {
      addValue();
    } else if (single !== 'single') {
      const checkData = selectedValue?.find(val => val?.id == opt?.id);
      if (checkData == undefined) {
        const newList = selectedValue;
        newList?.push(opt);
        updateValue(newList);
        setSearch('');
        setSearchList([]);
      }
    } else {
      updateValue([opt]);
      setSearch('');
      setSearchList([]);
    }
  };

  const addValue = () => {
    if (
      (name == 'Available tags' || name == 'Tags') &&
      search?.trim()?.length > 0 &&
      noResultText !== 'Already exists'
    ) {
      dispatch(showLoader());
      const SuccessCallback = (data, res) => {
        dispatch(hideLoader());
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200) {
          setSearch('');
          handleChange(data);
        } else {
        }
      };
      const payload = {
        name: search,
      };
      postData(AssetStoreAmenties, payload, SuccessCallback);
    }
  };

  return (
    <div className="locate-manage locate-list-inner-view" ref={findRef}>
      <div className="locate-managehead">
        <Link
          data-bs-toggle="collapse"
          to={`#${findColapseId(name)}`}
          role="button"
          aria-expanded={dropdownCollapse ? 'false' : 'true'}
          aria-controls={findColapseId(name)}
          onClick={() => {
            setDropdownCollapse(!dropdownCollapse);
          }}
        >
          {findLabelText(findColapseId(name), name)} &nbsp;
          {!asset && type == 'member'
            ? ''
            : selectedValue?.length > 0 && <>({selectedValue?.length})</>}{' '}
          <img
            src={dropdown_angel}
            alt="img"
            className={
              dropdownCollapse ? 'collapse-rotate' : 'collapse-norotate'
            }
          />
        </Link>
      </div>
      <div
        className="collapse show"
        id={findColapseId(name)}
        style={{ display: dropdownCollapse ? 'block' : 'none' }}
      >
        {subName ? <span>{subName}</span> : null}
        <div className="locate-managecontent border-0">
          <div className="filter-search filter-input mb-0">
            <input
              value={search}
              type="text"
              placeholder={findLabelText('Search', 'Search')}
              className="input-filter bg-white input-filter-locations"
              onChange={changeSearchText}
              disabled={isDisableDropdown}
            />
            <div className="img-group locations-img-group">
              <Link to="#" onClick={addValue}>
                <img src={searchIcon ? Search : plus2} alt="img" />
              </Link>
            </div>
          </div>
          {search && searchList && searchList?.length > 0 ? (
            <DropDownOptions
              type={type ? type : 'null'}
              options={searchList}
              onChange={opt => handleChange(opt)}
            />
          ) : loading ? (
            <Loader height={'30'} width={'30'} />
          ) : noResultText !== '' ? (
            <p className="no-result-text">{noResultText}</p>
          ) : null}
          {selectedValue?.length > 0
            ? selectedValue?.map((member, index) => {
                const image = member?.profile_photo
                  ? member?.profile_photo
                  : type === 'workspace'
                  ? desk
                  : type === 'room'
                  ? room
                  : type === 'parking'
                  ? parking1
                  : type === 'team'
                  ? teamIcon
                  : '';
                const className =
                  name === 'Manager(s)' || name === 'Team Manager(s)'
                    ? 'name-groups'
                    : 'locate-desk';
                const subClass =
                  name === 'Manager(s)' || name === 'Team Manager(s)'
                    ? 'work-name-img'
                    : 'locate-deskimg';
                return (
                  <div
                    key={index}
                    className="locate-managename team-managename"
                  >
                    <div className={className}>
                      {type !== 'null' && (
                        <div className={subClass}>
                          <Link to="#">
                            {image == 'null' ? null : image?.trim() ? (
                              type === 'member' && type != 'any' ? (
                                <GetImgaeFromS3Bucket
                                  imageFile={image}
                                  type={'image'}
                                  userDetail={member}
                                  name={findFirstName(member.name)}
                                  style={'manager'}
                                />
                              ) : (
                                <img src={image} alt="icon" />
                              )
                            ) : name === 'Manager(s)' ||
                              name === 'Team Manager(s)' ? (
                              <p
                                className="user-firstletter"
                                style={firstLetterStyle}
                              >
                                {findFirstName(member.name)}
                              </p>
                            ) : (
                              ''
                            )}
                          </Link>
                        </div>
                      )}
                      {type === 'workspace' ||
                      type === 'room' ||
                      type === 'parking' ? (
                        <div className="locate-deskcontent">
                          <h5>{member.name}</h5>
                          {/* <h6>-</h6> */}
                          <p>{member?.location_name}</p>
                        </div>
                      ) : (
                        <h5>
                          <Link to="#">{member.name}</Link>
                        </h5>
                      )}
                    </div>

                    {single !== 'single' && isShowDelete ? (
                      <div className="remove-links">
                        <Link
                          to="#"
                          onClick={() => {
                            const removeList = selectedValue;
                            //
                            removeList.splice(index, 1);
                            updateValue(removeList);
                            setSearch('');
                            setSearchList([]);
                          }}
                          className="remove-link"
                        >
                          {deleteIcon ? (
                            <i className="far fa-trash-can"></i>
                          ) : (
                            findLabelText('Remove', 'Remove')
                          )}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
