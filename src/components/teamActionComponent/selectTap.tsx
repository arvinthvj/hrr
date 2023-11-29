import React from 'react';
import { Link } from 'react-router-dom';
import { history_icon, member, setting_icon } from '../imagepath';
import { useSelector } from 'react-redux';
import { findLabelText } from '../commonMethod';
import { TeamSettingLabelText } from '../teamSettingComponent/constants';
const SelectTap = ({
  selectedTab,
  setSelectedTab,
  teamEditDetails,
  editTeamInfo,
  leafFlag,
  hideHistory
}) => {
  interface LanguageProps {
    language: {
      languages: {
        Team_Management: any;
        Common_Values: any;
        Dashboard: any;
        Location: any;
      };
    };
  }

  const { userDetails } = useSelector((state: any) => state.app);
  return (
    <>
      <div className="book-left-info book-team location-book-team">
        <div
          className={`book-tabs ${
            editTeamInfo?.id && !hideHistory? 'team-tabs' : 'create-team-tabs'
          } `}
        >
          <ul className="nav nav-tabs">
            <li>
              <Link
                to="#"
                className={
                  selectedTab == '1'
                    ? 'active settings-tab-radius'
                    : 'settings-tab-radius'
                }
                role="tab"
                aria-controls="nav-settings"
                onClick={() => setSelectedTab('1')}
              >
                <img src={setting_icon} alt="" />
              </Link>
            </li>
            {leafFlag ? (
              <li>
                <Link
                  to="#"
                  className={selectedTab == '2' ? 'active' : ''}
                  role="tab"
                  aria-controls="nav-profile"
                  onClick={() => setSelectedTab('2')}
                >
                  <img src={member} alt="" />
                </Link>
              </li>
            ) : (
              <li className="team-tab-users"></li>
            )}

            {editTeamInfo?.id && !hideHistory ? (
              <li>
                <Link
                  to="#"
                  className={selectedTab == '3' ? 'active' : ''}
                  role="tab"
                  aria-controls="nav-profile"
                  onClick={() => setSelectedTab('3')}
                >
                  <img src={history_icon} alt="" />
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};
export default SelectTap;
