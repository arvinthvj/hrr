import React from 'react';
import { useSelector } from 'react-redux';
import FloorProfileImgList from '../profileList/floorProfileList';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
const TeamManager = ({ responceSummary, handledetailPage, selectValue }) => {
  const { languages } = useSelector((state: RootReduxProps) => state?.language);
  return (
    <>
      <div className="team-grid team-box profile-view">
        {responceSummary?.team_managers?.length > 0 ? (
          <div className="team-members">
            <ul>
              <li>
                {responceSummary?.team_managers?.map((value, index) => {
                  return (
                    <div className="floor mb-0" key={index}>
                      <p>{value?.display_name}</p>
                      <Link
                        to="#"
                        onClick={() =>
                          handledetailPage(value?.id, 'viemManager')
                        }
                      >
                        {findLabelText(
                          TeamManagerLabelText.View_profile,
                          TeamManagerLabelText.ViewProfile,
                          TeamManagerLabelText.Team,
                        )}
                      </Link>
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
        ) : (
          <div className="working-no-records text-center">
            {findLabelText(
              TeamManagerLabelText.No_records,
              TeamManagerLabelText.NoRecords,
              TeamManagerLabelText.Common_Values,
            )}
          </div>
        )}
      </div>
      {responceSummary?.user_details?.floors?.length == 0 ? (
        <div className="work-head">
          <h5>
            {responceSummary?.user_details?.floors?.length == 0 &&
            languages?.Dashboard
              ? languages?.Dashboard?.Working_from?.name
              : findLabelText(
                  TeamManagerLabelText.Working_from,
                  TeamManagerLabelText.WorkingFrom,
                  TeamManagerLabelText.Dashboard,
                )}
            {responceSummary?.user_details?.floors?.length == 0 &&
              responceSummary?.location_details?.building_name}
          </h5>
          <span>
            {responceSummary?.user_details?.floors?.length == 0 &&
              responceSummary?.location_details?.street_name}
          </span>
        </div>
      ) : null}
      <div className="team-remote-grp">
        <div className="remote-team"></div>
      </div>
      <div className="team-grid team-box">
        <div className="team-members working-remotely">
          <ul>
            {responceSummary?.user_details?.floors &&
            Object.keys(responceSummary?.user_details?.floors)?.length > 0 ? (
              Object.keys(responceSummary?.user_details?.floors).map(
                (buildName, index) => {
                  return (
                    <div key={index}>
                      <div className="work-head">
                        <h5>
                          {findLabelText(
                            TeamManagerLabelText.Working_from,
                            TeamManagerLabelText.WorkingFrom,
                            TeamManagerLabelText.Dashboard,
                          )}{' '}
                          {buildName}
                        </h5>
                      </div>
                      {responceSummary?.user_details?.floors &&
                        Object?.keys(
                          responceSummary?.user_details?.floors?.[buildName],
                        ).map((floor, index) => {
                          const floorPersonList =
                            responceSummary?.user_details?.floors[buildName]?.[
                              floor
                            ];

                          return (
                            <div key={index}>
                              <FloorProfileImgList
                                baseUrl={responceSummary.base_url}
                                index={index}
                                type={floor}
                                profilelist={floorPersonList}
                                handledetailPage={handledetailPage}
                                locatelabel={selectValue?.value}
                              />
                            </div>
                          );
                        })}
                    </div>
                  );
                },
              )
            ) : (
              <div className="working-no-records text-center">
                {responceSummary?.user_details &&
                  findLabelText(
                    TeamManagerLabelText.No_records,
                    TeamManagerLabelText.NoRecords,
                    TeamManagerLabelText.Common_Values,
                  )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default TeamManager;
