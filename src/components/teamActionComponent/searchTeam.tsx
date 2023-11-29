import React, { useEffect, useState } from 'react';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import {
  hideLoader,
  setTeamHierarchy,
  setTeamMemberAndAssetCount,
  showLoader,
} from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CFind } from '../findComponent/Find';
import { Search, filter_icon } from '../imagepath';
import { findLabelText } from '../commonMethod';
import { TeamSettingLabelText } from '../teamSettingComponent/constants';
import { AssetNameAndIcons } from './constant';
type LanguageProps = {
  language: {
    languages: {
      Team_Management: any;
      Common_Values: any;
      Dashboard: any;
      Location: any;
    };
  };
};
const SearchTeam = ({
  userSearchText,
  userDetails,
  setTeamcheck,
  selectedTeamID,
  activeOnlyFlag,
  currentPage,
  setUserSearchLoading,
  setUserSearchList,
  setNoResultText,
  setTotalPage,
  setTeamList,
  setTeamListCopy,
  teamListCopy,
  setSearchTeamID,
  setCurrentPage,
  selectedUserSearchList,
  inActiveOnlyFlag,
  parentTeamID,
  setShowSubTeamList,
  sortBy,
  orderBy,
  listLoad,
  teamDelete,
}) => {
  const dispatch = useDispatch();
  const { languages } = useSelector((state: LanguageProps) => state.language);
  const [teamSearch, setTeamSearch] = useState<string>('');
  // const [noResultText, setNoResultText] = useState('');
  const [noSearchResult, setNoSearchResult] = useState('');
  useEffect(() => {
    userSearchText && getUserList();
  }, [userSearchText]);
  useEffect(() => {
    if (userDetails?.roles?.length > 0) {
      const data = userDetails?.roles?.filter(el => {
        return (
          el.slug === 'administrator' ||
          el.slug === 'facility_manager' ||
          el?.slug === 'team_manager'
        ); // added extra permissions
      });
      setTeamcheck(data?.length > 0 ? false : true);
    }
    getListofTeams();
  }, [
    selectedTeamID,
    activeOnlyFlag,
    inActiveOnlyFlag,
    currentPage,
    parentTeamID,
    sortBy,
    orderBy,
    listLoad,
    teamDelete,
  ]);

  useEffect(() => {
    let debounceTimer;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      getListofTeams(teamSearch);
    }, 500);
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [teamSearch]);

  const getUserList = () => {
    // filterList(
    //   activeOnlyFlag ? 1 : 0,
    //   inActiveOnlyFlag ? 0 : 1,
    //   userSearchText,
    //   'search',
    // );
    setUserSearchLoading(true);
    postData(
      ApiUrl.searchUserName,
      { name: userSearchText },
      (successRes: { List: any }) => {
        setUserSearchLoading(false);
        // dispatch(hideLoader())
        if (successRes?.List?.length > 0) {
          const userList = getUserDifferenceList(
            successRes?.List,
            selectedUserSearchList,
          );
          if (userList?.length === 0) {
            setUserSearchList([]);
            setNoResultText('User is already added');
          } else {
            setUserSearchList(userList);
            setNoResultText('');
          }
        } else {
          setUserSearchList([]);
          setNoResultText('No matching resuls found');
        }
      },
    );
  };

  function getUserDifferenceList(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }

  const filterList = (status, status1, search, type) => {
    const workLocationCopy = JSON.parse(JSON.stringify(teamListCopy));
    let lists = [];
    let listsData = [];
    if (status == 0 && status1 == 1) {
      setTeamList([]);
    } else {
      lists = workLocationCopy?.filter((ele, i) => {
        return ele?.status == status || ele?.status == status1;
      });
      setTeamList(lists);
      if (type) {
        listsData = lists?.filter((ele: any, i) => {
          return ele?.name
            ?.toLowerCase()
            ?.includes(search?.trim()?.toLowerCase());
        });
        setTeamList(listsData);
      }
    }
  };
  const getListofTeams = (search = '') => {
    if (parentTeamID == 0) {
      const preparData = [];
      dispatch(setTeamHierarchy(preparData));
    }
    if (!activeOnlyFlag && !inActiveOnlyFlag) {
      dispatch(setTeamMemberAndAssetCount({}));
      setTeamList([]);
      setTotalPage(1);
      return;
    }
    if (search == '') {
      dispatch(showLoader());
    }
    const list = {
      team_id: selectedTeamID,
      parent_team_id: parentTeamID,
      status:
        activeOnlyFlag && inActiveOnlyFlag
          ? ''
          : !activeOnlyFlag && !inActiveOnlyFlag
          ? 'None'
          : activeOnlyFlag
          ? '1'
          : '0',
      name: search,
      limit: '10',
      page: currentPage,
      skip: '0',
      sort_by: sortBy, // sort by column name should be specified here
      order_by: orderBy, // Order by asc or desc should be specified here, must be asc or desc
    };

    postData(ApiUrl.teamLists, list, (successRes, res) => {
      setShowSubTeamList(false);
      if (search == '') {
        dispatch(hideLoader());
      }
      if (successRes?.List?.length > 0) {
        setNoSearchResult('');
        setTotalPage(successRes?.totalPages);
        const countDetails = {
          memberCount: {
            user_count: successRes?.overall_counts?.members_count,
          },
          assertCount: [
            {
              id: 1,
              name: AssetNameAndIcons.workspace,
              icon_images: AssetNameAndIcons.deskIcon,
              count: successRes?.overall_counts?.workspaces_count,
            },
            {
              id: 2,
              name: AssetNameAndIcons.room,
              icon_images: AssetNameAndIcons.roomIcon,
              count: successRes?.overall_counts?.rooms_count,
            },
            {
              id: 3,
              name: AssetNameAndIcons.parking,
              icon_images: AssetNameAndIcons.parkingIcon,
              count: successRes?.overall_counts?.parking_count,
            },
          ],
        };
        dispatch(setTeamMemberAndAssetCount(countDetails));
        const preparlist: any = [];
        for (const obj of successRes?.List) {
          const preparObj: any = obj;
          preparObj['active'] = obj.status == '0' ? 'No' : 'Yes';
          preparlist.push(preparObj);
        }
        setTeamList([...preparlist]);
        setTeamListCopy([...preparlist]);
      } else {
        dispatch(setTeamMemberAndAssetCount({}));
        setTeamList([]);
        setTotalPage(1);
        if (search) {
          setNoSearchResult('No Results Found');
        }
      }
    });
  };
  return (
    <div className="card-headers">
      <h3 className="card-titles">
        {languages?.Common_Values?.Team_settings?.name
          ? languages?.Common_Values?.Team_settings?.name
          : findLabelText(
              TeamSettingLabelText.Team_manage,
              TeamSettingLabelText.Team_manage,
              TeamSettingLabelText.Team_Management,
            )}
      </h3>
      <div className="col-lg-6 col-sm-6 col-12">
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-12 ">
            <div className="filter-detail float-end">
              {/* <Link to="#" className="filter-tag">
                {findLabelText(
                  TeamSettingLabelText.Filter,
                  TeamSettingLabelText.Filter,
                  TeamSettingLabelText.Team_Management,
                )}
                <img src={filter_icon} className="ms-2" alt="img" />
              </Link> */}
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-12">
            {/* <CFind
              name="Teams"
              type="team"
              status={activeOnlyFlag}
              handleChange={val => {
                setTeamSearch(val);
                // filterList(
                //   activeOnlyFlag ? 1 : 0,
                //   inActiveOnlyFlag ? 0 : 1,
                //   val,
                //   'search',
                // );
                // setSearchTeamID(val?.id);
                setCurrentPage(1);
              }}
              // setNoResultText={setNoResultText}
              // noResultText={noResultText}
            /> */}
            <div className="filter-search filter-input">
              <input
                // value={isShowSearch ? displaySearch : ''}
                maxLength={31}
                onChange={e => setTeamSearch(e.target.value)}
                type="text"
                placeholder={findLabelText('Find', 'Find', 'Location')}
                className="input-filter"
              />
              <div className="img-group">
                <Link to="#">
                  <img src={Search} alt="img" />
                </Link>
              </div>
              {noSearchResult !== '' ? (
                <p className="no-result-text">{noSearchResult}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchTeam;
