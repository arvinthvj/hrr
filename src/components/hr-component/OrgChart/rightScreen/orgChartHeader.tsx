import React from 'react';
import { Link } from 'react-router-dom';
import { Search, tabIcon2, tabIcon4, tabIcon5 } from '../../../imagepath';
import { ORG_CHART_TAB_NAME } from '../constant';
import { findLabelText } from '../../../commonMethod';
import { setSearchValueOrgChart } from '../../../../reduxStore/hrSlice';
import { useDispatch, useSelector } from 'react-redux';

type OrgChartRightScreenHeaderProps = {
  selectedTab: 'directory' | 'history' | 'unassign' | '';
  changeTab: CallableFunction;
  tabName: string;
  setTabName: CallableFunction;
};

const OrgChartRightScreenHeader: React.FC<OrgChartRightScreenHeaderProps> = ({
  selectedTab,
  changeTab,
  tabName,
  setTabName,
}) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state: any) => state?.hr);

  return (
    <div className="card-header">
      <div className="tab-card-header">
        <ul
          className="nav nav-tabs nav-book-tabs"
          id="orgChartTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <Link
              className={
                selectedTab == 'directory' ? 'nav-link active' : 'nav-link'
              }
              to="#"
              onClick={() => {
                changeTab('directory');
                setTabName(ORG_CHART_TAB_NAME.DIRECTORY);
                dispatch(setSearchValueOrgChart(''));
              }}
            >
              <img src={tabIcon4} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                selectedTab == 'unassign' ? 'nav-link active' : 'nav-link'
              }
              to="#"
              onClick={() => {
                changeTab('unassign');
                setTabName(ORG_CHART_TAB_NAME.UNASSIGNED_USER);
                dispatch(setSearchValueOrgChart(''));
              }}
            >
              <img src={tabIcon5} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                selectedTab == 'history' ? 'nav-link active' : 'nav-link'
              }
              to="#"
              onClick={() => {
                changeTab('history');
                setTabName(ORG_CHART_TAB_NAME.HISTORY);
                dispatch(setSearchValueOrgChart(''));
              }}
            >
              <img src={tabIcon2} alt="" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="personal-tab-heading org-chart-heading remove-button">
        <h4>{findLabelText(tabName.replace(/\s+/g, '_'), tabName, 'Hr')}</h4>
      </div>
      {(tabName === ORG_CHART_TAB_NAME.DIRECTORY ||
        tabName === ORG_CHART_TAB_NAME.UNASSIGNED_USER) && (
        <div className="org-chart-search">
          <div className="direct-search">
            <input
              type="text"
              placeholder={findLabelText('Find', 'Find', 'Locate')}
              className={`input-filter bg-white`}
              value={searchValue}
              onChange={e => {
                const val = e?.target?.value.toLowerCase();
                dispatch(setSearchValueOrgChart(val));
              }}
            />
            <div className="direct-icon">
              <span>
                <img src={Search} alt="img" />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgChartRightScreenHeader;
