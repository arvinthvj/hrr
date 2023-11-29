import React, { useEffect, useRef, useState } from 'react';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Search, calendarGrey, newDateIcon } from '../imagepath';
import { postData } from '../../services/apicall';
import {
  GetTeamSummaryDetails,
  TeamBuildingLocationList,
  TeamGetTeamDetails,
} from '../../services/apiurl';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { useLocation } from 'react-router-dom';
import { setDashboardselctedTeam } from '../../reduxStore/dashboardSlice';
import SelectField from '../selectfield/select';
import { findLabelText, getUserPreferedDateFormat } from '../commonMethod';
import {
  TeamManagerLabelText,
  TeamSettingLabelText,
} from '../teamSettingComponent/constants';
import { dateFormat_DD_MM_YYYY } from '../../assets/constants/config';

const TeamAPIList = ({
  selectValue,
  startDate,
  setUserTableList,
  setUserTableListData,
  setUserTableListDataSave,
  setGlobalSearchLocation,
  setBaseUrl,
  setResponceSummary,
  setPageChange,
  setTeamList,
  setSelectValue,
  setStartDate,
  teamList,
}) => {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const calenderRef = useRef<HTMLInputElement>(null);
  const globalSearchLocation = useLocation();
  const { userDetails } = useSelector((state: RootReduxProps) => state?.app);
  const { dashboardselctedTeam } = useSelector(
    (state: RootReduxProps) => state?.dashboard,
  );
  const { languages } = useSelector((state: RootReduxProps) => state?.language);
  useEffect(() => {
    if (selectValue?.value) {
      getTeamsData();
      getSummaryList();
    }
  }, [selectValue, startDate]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (calenderRef.current && !calenderRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setGlobalSearchLocation(globalSearchLocation);
    if (globalSearchLocation?.state?.search_type == 'user') {
      setGlobalSearchLocation(globalSearchLocation);
      setPageChange(false);
    } else if (globalSearchLocation?.state?.search_type == 'team') {
      setPageChange(true);
    }
    getTeamList();
  }, [globalSearchLocation?.state]);
  // GetApi Responce
  const getTeamList = () => {
    // dispatch(showLoader());
    const getResponce = (data, res) => {
      // dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const list = selectOgj(data);
        setTeamList(list);
        if (globalSearchLocation?.state?.search_type == 'team') {
          const selectObj = {
            value: globalSearchLocation?.state?.search_id,
            label: globalSearchLocation?.state?.search_name,
          };
          setSelectValue(selectObj);
        } else if (list.length > 0) {
          // setSelectValue(list[0]);
          if (list?.length > 0) {
            let datas = [];
            if (list?.length > 0) {
              if (!dashboardselctedTeam?.value) {
                datas = data?.filter(ele => {
                  return ele?.primary_team == 1;
                });
                datas = selectOgj(datas);
              } else if (datas?.length == 0) {
                datas = list?.filter(ele => {
                  return ele?.value == dashboardselctedTeam?.value;
                });
              }
              setSelectValue(datas?.length > 0 ? datas[0] : list[0]);
            }
          }
        }
      }
    };
    postData(TeamBuildingLocationList, '', getResponce);
  };
  const selectOgj = items =>
    items?.map(item => {
      return { value: item?.id, label: item?.name };
    });
  // Fetch Teams Data getTeamsData
  const getTeamsData = () => {
    const getResponce = (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        setUserTableList(data);
        setUserTableListData(data?.user_details);
        setUserTableListDataSave(data?.user_details);
        setBaseUrl(data?.base_url);
      }
    };
    const payLoad = {
      date: moment(startDate).format(dateFormat_DD_MM_YYYY),
      team_id: selectValue.value,
      location_id: userDetails?.location_id,
    };
    if (payLoad.location_id) {
      dispatch(showLoader());
      postData(TeamGetTeamDetails, payLoad, getResponce);
    }
  };
  // getSummaryList
  const getSummaryList = () => {
    // dispatch(showLoader());
    const getResponceSummary = data => {
      // dispatch(hideLoader());
      setResponceSummary(data);
    };
    postData(
      GetTeamSummaryDetails,
      {
        team_id: selectValue?.value,
        location_id: userDetails?.location_id,
        date: moment(startDate).format(dateFormat_DD_MM_YYYY),
      },
      getResponceSummary,
    );
  };

  const handleTodayRedirect = () => {
    setStartDate(new Date());
    setShowDatePicker(false);
  };
  const handleChangeDate = name => {
    let newDate;
    if (name === 'add') newDate = moment(startDate).add(1, 'd');
    else newDate = moment(startDate).subtract(1, 'd');
    setStartDate(newDate._d);
    setShowDatePicker(false);
  };
  return (
    <div className="team-drop-grp align-items-start">
      <div className="team-default">
        <div className="sort-by">
          <label>
            {findLabelText(
              TeamManagerLabelText.Team,
              TeamManagerLabelText.Team,
              TeamSettingLabelText.TEAM,
            )}
            :{' '}
          </label>
          <SelectField
            placeholder={selectValue?.value}
            value={selectValue}
            options={teamList}
            height={'40px'}
            onChangeValue={value => {
              setSelectValue(value);
              dispatch(setDashboardselctedTeam(value));
            }}
          />
        </div>
      </div>
      <div
        className="date-teams-list new-date-list today-date-time"
        ref={calenderRef}
      >
        <div className="date-filter date-filter-locate team-date me-0">
          <div className="filter-date">
            <div className="current-date current-date-new">
              <img src={calendarGrey} style={{ cursor: 'default' }} alt="img" />
              <button className="datetimepicker" onClick={handleTodayRedirect}>
                {findLabelText(
                  TeamSettingLabelText.Today,
                  TeamSettingLabelText.Today,
                  TeamSettingLabelText.TEAM,
                )}
              </button>
              <img
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                }}
                style={{ cursor: 'default' }}
                className="new-date-icon"
                src={newDateIcon}
                alt="img"
              />
            </div>
          </div>
        </div>
        <div className="setting-picker">
          <div className="date-filter">
            <div className="filter-date">
              <div className="current-date team-current-date current-date-calendar new-date-calendar">
                <button onClick={() => handleChangeDate('sub')}>
                  <i className="fa fa-angle-left" />
                </button>
                <span
                  onClick={event => {
                    const list = [
                      'react-datepicker__header',
                      'react-datepicker__current-month',
                      'react-datepicker__header__dropdown react-datepicker__header__dropdown--scroll',
                      'react-datepicker__navigation react-datepicker__navigation--next',
                      'react-datepicker__navigation react-datepicker__navigation--previous',
                    ];
                    if (list.includes(event?.target?.className)) {
                      setShowDatePicker(true);
                    } else setShowDatePicker(!showDatePicker);
                  }}
                >
                  <DatePicker
                    open={showDatePicker}
                    selected={startDate}
                    onChange={currentdate => {
                      setStartDate(currentdate);
                      setShowDatePicker(false);
                    }}
                    type="text"
                    value={
                      startDate
                        ? getUserPreferedDateFormat(startDate)
                        : findLabelText(
                            TeamSettingLabelText.Today,
                            TeamSettingLabelText.Today,
                            TeamSettingLabelText.TEAM,
                          )
                    }
                    className="form-control datetimepicker datepicker-width"
                  />
                </span>
                <button onClick={() => handleChangeDate('add')}>
                  <i className="fa fa-angle-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamAPIList;
