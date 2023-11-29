import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { tabIcon1, tabIcon2 } from '../../imagepath';
import { PersonalContext } from '../personalController';
import { findLabelText } from '../../commonMethod';

type RightScreenHeaderProps = {
  selectedTab: 'details' | 'history';
  changeTab: CallableFunction;
  checkIsOpned: CallableFunction;
};

const RightScreenHeader: React.FC<RightScreenHeaderProps> = ({
  selectedTab,
  changeTab,
  checkIsOpned,
}) => {
  const { addTitle, editTitle, EditComponent } = useContext(PersonalContext);
  return (
    <div className="card-header">
      <div className="tab-card-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={
                selectedTab == 'details' ? 'nav-link active' : 'nav-link'
              }
              to="#"
              onClick={() => changeTab('details')}
            >
              <img src={tabIcon1} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                selectedTab == 'history' ? 'nav-link active' : 'nav-link'
              }
              to="#"
              onClick={() => changeTab('history')}
            >
              <img src={tabIcon2} alt="" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="personal-tab-heading">
        <h4>
          <Link
            to="#"
            onClick={() => {
              checkIsOpned(false);
              EditComponent('', {});
            }}
          >
            <i className="fas fa-chevron-left" />
          </Link>
          {selectedTab == 'history'
            ? `${findLabelText('History', 'History', 'Hr')}`
            : addTitle
            ? addTitle == 'Assign a manager'
              ? 'Assign a manager'
              : addTitle
            : editTitle == 'Assign a manager'
            ? 'Assign a manager'
            : editTitle}
        </h4>
      </div>
    </div>
  );
};

export default RightScreenHeader;
