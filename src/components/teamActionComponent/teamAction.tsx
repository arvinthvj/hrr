import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import DropDownOptions from '../dropDown/dropdownOptions';
import { useSelector } from 'react-redux';
import { plus2 } from '../imagepath';
import { findLabelText } from '../commonMethod';
import { TeamSettingLabelText } from '../teamSettingComponent/constants';
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
const TeamAction = ({
  selectedTab,
  handleClick,
  setUserSearchText,
  setUserSearchList,
  updateTeamUsers,
  handleSubmit,
  createOrUpdateTeam,
  teamEditDetails,
  noResultText,
  userSearchList,
  userSearchText,
  changeUserSearchText,
  selectedUserSearchList,
  userSearchLoading,
  disableSave
}) => {
  const { languages } = useSelector((state: LanguageProps) => state.language);
  return (
    <>
      {
        selectedTab != "3" && (
          <div className="user-footer">
            <div className="user-footer-btn">
              <Link to="#" className="btn link-cancel" onClick={handleClick}>
                {languages?.Common_Values
                  ? languages?.Common_Values?.Cancel?.name
                  : findLabelText(
                    TeamSettingLabelText.Cancel,
                    TeamSettingLabelText.Cancel,
                    TeamSettingLabelText.Team_Management
                  )}
              </Link>
              <Link
                className={`btn btn-primary ${disableSave === true ? "disabledbutton" : ""
              }`}
                to="#"
                onClick={handleSubmit(createOrUpdateTeam)}
              >
                {findLabelText(
                  TeamSettingLabelText.Save,
                  TeamSettingLabelText.Save,
                  TeamSettingLabelText.Team_Management,
                )}
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
};
export default TeamAction;
