import React, { useState } from 'react';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { Search, building_link_icon, dropdown_angel } from '../imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';

interface BuildingTabProps {
  shapes: object | any;
  refData: CallableFunction | any;
  selectedTab: string;
}

const BuildingTab: React.FC<BuildingTabProps> = ({
  shapes,
  refData,
  selectedTab,
}) => {
  const [wallsColapse, setWallsColapse] = useState(true);
  const [stairsColapse, setStairsColapse] = useState(true);
  const [doorsColapse, setDoorsColapse] = useState(true);
  const [roadsColapse, setRoadsColapse] = useState(true);
  return (
    <div
      className={`tab-pane fade show ${
        selectedTab == 'buildingtab' ? 'active' : ''
      }`}
      id="buildingtab"
      role="tabpanel"
      aria-labelledby="building-tab"
    >
      <div className="floor-tab-header">
        <div className="floor-building-header">
          <h4>
            {findLabelText('Building', 'Building', 'Floorplan_Management')}
          </h4>
        </div>
        <div className="filter-search filter-input building-filter-search">
          <input
            type="text"
            placeholder={findLabelText('Find', 'Find', 'Asset_Management')}
            className="input-filter"
          />
          <div className="img-group">
            <Link to="#">
              <img src={Search} alt="img" />
            </Link>
          </div>
        </div>
      </div>
      <div className="floor-faq-scroll">
        <div className="floor-faq">
          {/* Walls & deviders */}
          <div className="floor-manage">
            <div className="floor-manage-head">
              <Link
                data-bs-toggle="collapse"
                to="#collapseOne"
                role="button"
                aria-expanded={wallsColapse ? 'false' : 'true'}
                aria-controls="locate"
                onClick={() => setWallsColapse(!wallsColapse)}
              >
                {findLabelText(
                  'Walls_deviders',
                  'Walls & dividers',
                  'Floorplan_Management',
                )}
                <img
                  src={dropdown_angel}
                  alt="img"
                  className={
                    wallsColapse ? 'collapse-rotate' : 'collapse-norotate'
                  }
                />
              </Link>
            </div>
            <div
              className="collapse show"
              id="collapseOne"
              style={{ display: wallsColapse ? 'block' : 'none' }}
            >
              <div className="floor-manage-list">
                {shapes?.buildingShapes?.length > 0 &&
                  shapes?.buildingShapes
                    ?.filter(s => s?.planner_type_id == 4)
                    ?.map(i => (
                      <div
                        className="floor-manage-info"
                        key={i?.id}
                        ref={refData(i?.name)?.ref}
                        draggable="true"
                      >
                        <div
                          className="floor-manage-details"
                          id={refData(i?.name)?.id}
                          tabIndex={i?.id}
                        >
                          <GetImgaeFromS3Bucket
                            imageFile={i?.path}
                            type={'image'}
                            FilePath="gat"
                          />
                          <p>
                            {findLabelText(
                              i?.name?.split(' ').join('_'),
                              i?.name,
                              'Common_Values',
                            )}
                          </p>
                        </div>
                        <div className="floor-manage-link">
                          <Link to="#">
                            <img src={building_link_icon} alt="icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* Walls & deviders */}

          {/* Stairs & Lifts */}
          <div className="floor-manage">
            <div className="floor-manage-head">
              <Link
                data-bs-toggle="collapse"
                to="#collapseTwo"
                role="button"
                aria-expanded={stairsColapse ? 'false' : 'true'}
                aria-controls="locate"
                onClick={() => setStairsColapse(!stairsColapse)}
              >
                {findLabelText(
                  'Stairs_Lifts',
                  'Stairs & Lifts',
                  'Floorplan_Management',
                )}
                <img
                  src={dropdown_angel}
                  alt="img"
                  className={
                    stairsColapse ? 'collapse-rotate' : 'collapse-norotate'
                  }
                />
              </Link>
            </div>
            <div
              className="collapse show"
              id="collapseTwo"
              style={{ display: stairsColapse ? 'block' : 'none' }}
            >
              <div className="floor-manage-list">
                {shapes?.buildingShapes?.length > 0 &&
                  shapes?.buildingShapes
                    ?.filter(s => s?.planner_type_id == 5)
                    ?.map(i => (
                      <div
                        className="floor-manage-info"
                        key={i?.id}
                        ref={refData(i?.name)?.ref}
                        draggable="true"
                      >
                        <div
                          className="floor-manage-details"
                          id={refData(i?.name)?.id}
                          tabIndex={i?.id}
                        >
                          <GetImgaeFromS3Bucket
                            imageFile={i?.path}
                            type={'image'}
                            FilePath="gat"
                          />
                          <p>
                            {findLabelText(
                              i?.name?.split(' ').join('_'),
                              i?.name,
                              'Common_Values',
                            )}
                          </p>
                        </div>
                        <div className="floor-manage-link">
                          <Link to="#">
                            <img src={building_link_icon} alt="icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* Stairs & Lifts */}

          {/* Doors & Windows */}
          <div className="floor-manage">
            <div className="floor-manage-head">
              <Link
                data-bs-toggle="collapse"
                to="#collapseThree"
                role="button"
                aria-expanded={doorsColapse ? 'false' : 'true'}
                aria-controls="locate"
                onClick={() => setDoorsColapse(!doorsColapse)}
              >
                {findLabelText(
                  'Doors_Windows',
                  'Doors & Windows',
                  'Floorplan_Management',
                )}
                <img
                  src={dropdown_angel}
                  alt="img"
                  className={
                    doorsColapse ? 'collapse-rotate' : 'collapse-norotate'
                  }
                />
              </Link>
            </div>
            <div
              className="collapse show"
              id="collapseThree"
              style={{ display: doorsColapse ? 'block' : 'none' }}
            >
              <div className="floor-manage-list">
                {shapes?.buildingShapes?.length > 0 &&
                  shapes?.buildingShapes
                    ?.filter(s => s?.planner_type_id == 6)
                    ?.map(i => (
                      <div
                        className="floor-manage-info"
                        key={i?.id}
                        ref={refData(i?.name)?.ref}
                        draggable="true"
                      >
                        <div
                          className="floor-manage-details"
                          id={refData(i?.name)?.id}
                          tabIndex={i?.id}
                        >
                          <GetImgaeFromS3Bucket
                            imageFile={i?.path}
                            type={'image'}
                            FilePath="gat"
                          />
                          <p>
                            {findLabelText(
                              i?.name?.split(' ').join('_'),
                              i?.name,
                              'Common_Values',
                            )}
                          </p>
                        </div>
                        <div className="floor-manage-link">
                          <Link to="#">
                            <img src={building_link_icon} alt="icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* Doors & Windows */}

          {/* Roads */}
          <div className="floor-manage">
            <div className="floor-manage-head">
              <Link
                data-bs-toggle="collapse"
                to="#collapseFour"
                role="button"
                aria-expanded={roadsColapse ? 'false' : 'true'}
                aria-controls="locate"
                onClick={() => setRoadsColapse(!roadsColapse)}
              >
                {findLabelText('Roads', 'Roads', 'Floorplan_Management')}
                <img
                  src={dropdown_angel}
                  alt="img"
                  className={
                    roadsColapse ? 'collapse-rotate' : 'collapse-norotate'
                  }
                />
              </Link>
            </div>
            <div
              className="collapse show"
              id="collapseFour"
              style={{ display: roadsColapse ? 'block' : 'none' }}
            >
              <div className="floor-manage-list">
                {shapes?.buildingShapes?.length > 0 &&
                  shapes?.buildingShapes
                    ?.filter(s => s?.planner_type_id == 7)
                    ?.map(i => (
                      <div
                        className="floor-manage-info"
                        key={i?.id}
                        ref={refData(i?.name)?.ref}
                        draggable="true"
                      >
                        <div
                          className="floor-manage-details"
                          id={refData(i?.name)?.id}
                          tabIndex={i?.id}
                        >
                          <GetImgaeFromS3Bucket
                            imageFile={i?.path}
                            type={'image'}
                            FilePath="gat"
                          />
                          <p>
                            {findLabelText(
                              i?.name?.split(' ').join('_'),
                              i?.name,
                              'Common_Values',
                            ) + (i?.id == 51 ? '\u00B0' : '')}
                          </p>
                        </div>
                        <div className="floor-manage-link">
                          <Link to="#">
                            <img src={building_link_icon} alt="icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/* Roads */}

          <div className="floor-manage border-0">
            <div className="floor-create-link">
              <Link to="#">
                <i className="fas fa-plus" />{' '}
                {findLabelText(
                  'Contact_our_team_to_add_assets',
                  'Contact our team to add assets',
                  'Floorplan_Management',
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingTab;
