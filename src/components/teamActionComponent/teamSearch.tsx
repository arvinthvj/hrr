import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TeamSearch } from '../../pages/teamlist/teamSearch';
import { Search } from '../imagepath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { useSelector } from 'react-redux';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { findLabelText, getUserPreferedDateFormat } from '../commonMethod';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
const TeamSearchList = ({
  startDate,
  reference,
  searchUser,
  userTableListDataCopy,
  handledetailPage,
  setUserTableListDataCopy,
  setUserTableListData,
  userTableListDataSave,
  setSearchUser,
}) => {
  const { languages } = useSelector((state: RootReduxProps) => state?.language);
  const handleSearch = value => {
    if (value?.trim() === '') {
      setUserTableListData([...userTableListDataSave]);
    }
    setSearchUser(value);
    const lists = userTableListDataSave?.filter((ele, i) => {
      return (
        ele?.first_name
          ?.toLowerCase()
          ?.includes(value?.trim()?.toLowerCase()) ||
        ele?.last_name?.toLowerCase()?.includes(value?.trim()?.toLowerCase()) ||
        ele?.display_name
          ?.toLowerCase()
          ?.includes(value?.trim()?.toLowerCase()) ||
        ele?.email?.toLowerCase()?.includes(value?.trim()?.toLowerCase())
        //  ||
        // permissionGroupId(ele)
      );
    });
    function permissionGroupId(ele) {
      const data = ele?.health_safety?.filter(element => {
        if (
          element?.name?.toLowerCase()?.includes(value?.trim()?.toLowerCase())
        ) {
          return element;
        }
      });
      return data?.length > 0 ? true : false;
    }
    if (lists?.length > 0) {
      setUserTableListDataCopy(lists);
    } else {
      setUserTableListDataCopy([]);
    }
  };
  const sortby = [
    { id: 1, text: 'Name' },
    { id: 2, text: 'Jane' },
    { id: 3, text: 'Ralph' },
  ];
  return (
    <div className="team-find-grp">
      <h4>{getUserPreferedDateFormat(startDate)}</h4>
      <div
        ref={reference}
        className="filter-search filter-input filter-input-team team-filter-input team-search-bottom"
      >
        <input
          className="input-filter"
          type="text"
          value={searchUser}
          placeholder={findLabelText(
            TeamManagerLabelText.Find,
            TeamManagerLabelText.Find,
            TeamManagerLabelText.Team,
          )}
          onChange={e => handleSearch(e?.target?.value)}
        />
        <div className="img-group team-img-groups">
          <Link to="#">
            <img src={Search} alt="img" />
          </Link>
        </div>
        {
          <TeamSearch
            findSearchList={userTableListDataCopy}
            searchUser={searchUser}
            handledetailPage={handledetailPage}
            setSearchUser={setSearchUser}
          />
        }
      </div>
      <div className="team-sort-name justify-content-sm-end">
        <div className="sort-by">
          <label>
            {findLabelText(
              TeamManagerLabelText.Sort_by,
              TeamManagerLabelText.Sortby,
              TeamManagerLabelText.Team,
            )}
            :{' '}
          </label>
          <div>
            <Select2
              className="select w-100"
              data={sortby}
              options={{
                placeholder: findLabelText(
                  TeamManagerLabelText.Name,
                  TeamManagerLabelText.Name,
                  TeamManagerLabelText.Team,
                ),
              }}
              disabled="disabled"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamSearchList;
