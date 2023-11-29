import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postData } from '../../services/apicall';
import {
  ApiUrl,
  AssetworkSpaceListsencsearch,
  searchUserManagement,
} from '../../services/apiurl';
import DropDownOptions from '../dropDown/dropdownOptions';
import { Search } from '../imagepath';
import Loader from '../loader';

interface FindProps {
  handleChange: CallableFunction;
  type: any;
  status: any;
  name: string;
  id?: number;
  isShowSearch?: boolean;
  location_id?: string;
  placeholder?: string;
  setShowSearch?: CallableFunction | any;
}

export const CFind: React.FC<FindProps> = ({
  handleChange,
  status,
  type,
  name,
  id,
  isShowSearch = true,
  location_id = '',
  placeholder,
  setShowSearch,
}) => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displaySearch, setDisplaySearch] = useState('');
  const [noResultText, setNoResultText] = useState('');
  const findRef = useRef<any>(null);
  const { languages } = useSelector((state: any) => state?.language);

  useEffect(() => {
    if (!isShowSearch) {
      handleChange(null);
      setSearch('');
      setDisplaySearch('');
      setNoResultText('');
    }
  }, [isShowSearch]);

  const handleSearch = e => {
    name == 'Users' && setShowSearch(true);
    if (e === '' && e?.trim() !== displaySearch.trim()) {
      handleChange(null);
      setSearch(e?.trim());
    } else if (e?.trim()?.length <= 30 && e?.trim() !== displaySearch.trim()) {
      setSearch(e?.trim());
    }
    // if (e?.trim()?.length <= 31) setDisplaySearch(e);
    if (e?.trim()?.length > 30) {
      setNoResultText('Please enter less than 30 characters');
    } else {
      setNoResultText('');
      setDisplaySearch(e);
    }
  };

  const updateValue = opn => {
    handleChange(opn);
    setDisplaySearch(opn?.name);
    setSearch('');
  };

  const getSearchList = () => {
    setLoading(true);
    const postUrl = getUrl();
    const payload = getPayload();
    if (postUrl !== '') {
      postData(postUrl, payload, successCallback);
    }
  };
  const successCallback = (successRes: any) => {
    setLoading(false);
    const list = successRes?.List
      ? successRes?.List
      : successRes.length > 0
      ? successRes
      : [];
    if (
      list !== '' &&
      list !== 'No data' &&
      list !== undefined &&
      list !== null &&
      list?.length > 0
    ) {
      setNoResultText('');
      setSearchList(list);
    } else {
      setNoResultText('No matching results found');
      setSearchList([]);
    }
  };

  // get api url for different dropdown search
  const getUrl = () => {
    if (name !== '' && name !== null && name !== undefined) {
      switch (name) {
        case 'Users':
          return searchUserManagement;
        case 'Teams':
          return ApiUrl.searchTeamName;
        case 'Asset':
          return AssetworkSpaceListsencsearch;
        default:
          return '';
      }
    } else return '';
  };

  // get payload for different dropdown search
  const getPayload = () => {
    if (name !== '' && name !== null && name !== undefined) {
      switch (name) {
        case 'Users':
          return { search: search, status: status ? 1 : 0 };
        case 'Teams':
          return { name: search, status: status ? '1' : '0' };
        case 'Asset':
          return {
            name: search,
            status: status == true ? 1 : 2,
            floor_plan_type_id: id,
            location_id: location_id ? location_id : '',
          };
        default:
          return null;
      }
    } else return null;
  };

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
    const handleClickOutside = event => {
      if (findRef?.current && !findRef?.current?.contains(event?.target)) {
        setSearchList([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const findLabelText = (module, text, key) => {
    const getKey = languages?.[key];
    const label = getKey?.[module]?.['name'];
    if (label !== null && label !== undefined && label !== '') return label;
    else return text;
  };

  return (
    <div className="filter-search filter-input" ref={findRef}>
      <input
        value={isShowSearch ? displaySearch : ''}
        onChange={e => handleSearch(e?.target?.value)}
        type="text"
        placeholder={
          placeholder
            ? placeholder
            : findLabelText('Find', 'Find', 'Location') +
              (name == 'Asset' ? '...' : '')
        }
        className="input-filter"
      />
      <div className="img-group">
        <Link to="#">
          <img src={Search} alt="img" />
        </Link>
      </div>
      {search && searchList && searchList?.length > 0 ? (
        <DropDownOptions
          hideAddButton
          type={type}
          options={searchList?.length > 0 ? searchList : []}
          onChange={opn => {
            updateValue(opn);
            setSearchList([]);
          }}
        />
      ) : loading ? (
        <div className="locate-managename no-result-box">
          <div className="name-groups">
            <Loader height={'30'} width={'30'} />
          </div>
        </div>
      ) : noResultText !== '' ? (
        <p className="no-result-text">{noResultText}</p>
      ) : null}
    </div>
  );
};