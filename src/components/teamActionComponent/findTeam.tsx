import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TeamSettingLabelText } from '../teamSettingComponent/constants';
import { findLabelText } from '../commonMethod';
import { NavigationPath } from './navigationPath';
import { setTeamHierarchy } from '../../reduxStore/appSlice';
import { Link } from 'react-router-dom';
import { AssetsCounts } from './assetsCounts';
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
const FindTeam = ({
  activeOnlyFlag,
  setActiveOnlyFlag,
  inActiveOnlyFlag,
  setInActiveOnlyFlag,
  updateCreateTeamFlag,
  setParentTeamID,
  handleAdd,
}) => {
  const { teamHierarchy, teamMemberAndAssetCount } = useSelector(
    (state: any) => state.app,
  );
  const dispatch = useDispatch();
  const updateCurrentPage = data => {
    if (data?.length == 0) {
      setParentTeamID(0);
    } else {
      const obj = data[data?.length - 1];
      setParentTeamID(obj?.id);
    }
    updateCreateTeamFlag(false);
  };
  // const goToPreviousLocation = () => {
  //   try {
  //     let list: any = [];
  //     if (teamHierarchy?.length) {
  //       list = teamHierarchy?.map((i) => i);
  //       const preparData = [...list];
  //       dispatch(setTeamHierarchy(preparData));
  //       setTimeout(() => {
  //         updateCurrentPage(preparData);
  //       }, 500);
  //     }
  //   } catch (error) {}
  // };
  const getTeamName = record => {
    const name = record?.name;
    return name;
  };

  return (
    <>
      <div className="table-set-spilt">
        <div className="breadcrumbs">
          <NavigationPath
            updateCurrentPage={length => {
              updateCurrentPage(length);
            }}
          />
        </div>
        <div
          className={
            // lastLocation?.level == 8
            //   ? "table-header table-header-bottom : "
            'table-header border-bottom-0 location-display'
          }
        >
          <div className="create-notify-blk">
            <div className="table-headername table-headername-inner d-flex align-items-center">
              <h2>
                {teamHierarchy?.length > 0
                  ? getTeamName(teamHierarchy[teamHierarchy?.length - 1])
                  : findLabelText('All_teams', 'All teams', 'Settings')}
              </h2>
            </div>
            {
              <>
                {' '}
                <div className="check-header-blk">
                  <div className="table-headersort">
                    <div className="table-headercheck me-0">
                      <div className="checkbox-set">
                        <label className="check">
                          {findLabelText('Active', 'Active', 'Location')}
                          <input
                            type="checkbox"
                            checked={activeOnlyFlag}
                            onChange={e => setActiveOnlyFlag(e.target.checked)}
                          />
                          <span className="checkmark location-checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="table-headersort">
                    <div className="table-headercheck me-0">
                      <div className="checkbox-set">
                        <label className="check">
                          {findLabelText('Inactive', 'Inactive', 'Location')}
                          <input
                            type="checkbox"
                            checked={inActiveOnlyFlag}
                            onChange={e =>
                              setInActiveOnlyFlag(e.target.checked)
                            }
                          />
                          <span className="checkmark location-checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
          {
            <div className="create-new-locatebox">
              <Link
                to={'#'}
                className={`btn-createnew opencreate`}
                onClick={() => handleAdd()}
              >
                <i className="fa fa-plus me-2" />
                <span>
                  {findLabelText(
                    'Create_a_new_team',
                    'Create a new team',
                    'Common_Values',
                  )}
                </span>
              </Link>
            </div>
          }
        </div>
        {
          <AssetsCounts
            assetsDetails={teamMemberAndAssetCount?.assertCount}
            memberCount={teamMemberAndAssetCount?.memberCount}
          />
        }
      </div>
    </>
  );
};
export default FindTeam;
