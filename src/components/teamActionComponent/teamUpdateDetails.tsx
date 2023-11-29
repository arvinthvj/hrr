import React from 'react';
import { Link } from 'react-router-dom';
import { findFirstName } from '../../assets/globals';
import { firstLetterStyle } from '../../assets/constants/config';
import { useSelector } from 'react-redux';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
import { findLabelText } from '../commonMethod';
const TeamUpdateDetails = ({
  selectedUserSearchList,
  updateTeamUsers,
  primaryUserList,
  setSelectedUserSearchList,
  setNewChanges,
  newChanges,
  setDisableSave,
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
  const { languages } = useSelector((state: LanguageProps) => state.language);
  return (
    <>
      <div className="locate-manage border-0 locate-list-view locate-list-inner pt-0">
        {selectedUserSearchList?.length > 0
          ? selectedUserSearchList?.map((member, index) => {
              const image = member?.profile_photo
                ? member?.base_url + member?.profile_photo
                : '';

              return (
                <div
                  key={index}
                  className="locate-managename team-managename team-managename-border"
                >
                  <div className="name-groups">
                    <div className="work-name-img work-name-img-small">
                      <Link to="#">
                        {image ? (
                          <img
                            src={image}
                            alt="icon"
                            className="border-radius-0"
                          />
                        ) : (
                          <p
                            className="user-firstletter user-firstletter-small"
                            style={firstLetterStyle}
                          >
                            {findFirstName(member?.name)}
                          </p>
                        )}
                      </Link>
                    </div>
                    <div className="work-name-details">
                      <h5>
                        <Link to="#">{member?.name}</Link>
                      </h5>
                      {primaryUserList?.includes(member?.id) && <p>Primary</p>}
                    </div>
                  </div>
                  {!primaryUserList?.includes(member?.id) ? (
                    <div className="remove-links">
                      <Link
                        to="#"
                        className="remove-link"
                        onClick={() => {
                          const newList = selectedUserSearchList?.filter(
                            user => {
                              return user?.id !== member?.id;
                            },
                          );
                          setSelectedUserSearchList(newList);
                          setNewChanges({
                            ...newChanges,
                            member_details: newList,
                          });
                          setDisableSave(false);
                          // updateTeamUsers(member, index, null, "remove");
                        }}
                      >
                        <i className="far fa-trash-can"></i>
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
export default TeamUpdateDetails;
