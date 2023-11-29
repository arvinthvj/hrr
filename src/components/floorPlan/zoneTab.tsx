import React from 'react';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { eye_slash_light } from '../imagepath';

interface ZoneTabProps {
  handleZone: CallableFunction | any;
  createZone: boolean;
  zone: object | any;
  setZone: CallableFunction | any;
  zoneSelected: object | any;
  setSelectedZone: CallableFunction | any;
  saveEnable: boolean;
  setCreateZone: CallableFunction | any;
  zoneList: object | any;
  shapeFun: object | any;
  selectedTab: string;
}

const ZoneTab: React.FC<ZoneTabProps> = ({
  handleZone,
  createZone,
  zone,
  setZone,
  zoneSelected,
  setSelectedZone,
  saveEnable,
  setCreateZone,
  zoneList,
  shapeFun,
  selectedTab,
}) => {
  return (
    <div
      className={`tab-pane fade show ${
        selectedTab == 'zonestab' ? 'active' : ''
      }`}
      id="zonestab"
      role="tabpanel"
      aria-labelledby="zones-tab"
    >
      <div className="floor-disabled">
        <div className="floor-tab-header">
          <div className="floor-zone-header">
            <h4>{findLabelText('Zones', 'Zones', 'Floorplan_Management')}</h4>
          </div>

          {createZone && (
            <>
              <div className="zone-name">
                <label>
                  {findLabelText(
                    'Zone_name',
                    'Zone name',
                    'Floorplan_Management',
                  )}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zone_name"
                  defaultValue={
                    zone?.name ||
                    (zoneSelected && zoneSelected?.floorplanzone_name)
                  }
                  value={
                    zone?.name ||
                    (zoneSelected && zoneSelected?.floorplanzone_name)
                  }
                  onChange={e => {
                    if (e?.target?.value == '') setSelectedZone('');
                    setZone({ ...zone, name: e?.target?.value });
                  }}
                />
              </div>
              <div className="floor-btns">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleZone}
                  disabled={saveEnable}
                >
                  {findLabelText(
                    'Save_changes',
                    ' Save changes',
                    'Floorplan_Management',
                  )}
                </button>
                <button
                  type="submit"
                  className="btn"
                  onClick={() => {
                    setSelectedZone('');
                    setZone({ name: '', capacity: 0 });
                    setCreateZone(false);
                  }}
                >
                  {findLabelText('Cancel', 'Cancel', 'Floorplan_Management')}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="zone-details">
          <div className="create-zone" onClick={() => setCreateZone(true)}>
            <Link to="#">
              <i className="fas fa-plus" />
              {findLabelText(
                'Create_a_new_zone',
                'Create a new Zone',
                'Floorplan_Management',
              )}
            </Link>
          </div>
          {zoneList.length > 0 &&
            zoneList?.map((i: any) => (
              <div
                className="zone-box zone-box-dark"
                key={i?.floorplanzone_id}
                id={i?.floorplanzone_id}
              >
                <div
                  className="zone-info"
                  draggable="true"
                  tabIndex={i?.floorplanzone_id}
                  onDragStart={() => {
                    shapeFun?.zoneDragStart(i);
                  }}
                  onDragEnd={() => shapeFun?.zoneDragEnd()}
                >
                  <Link to="#">
                    <img src={eye_slash_light} alt="img" />
                  </Link>
                  <p>{i?.floorplanzone_name}</p>
                </div>
                <div className="zone-select-link">
                  <Link
                    to="#"
                    onClick={() => {
                      setCreateZone(true);
                      setSelectedZone(i);
                    }}
                  >
                    {findLabelText('Edit', 'Edit', 'Floorplan_Management')}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ZoneTab;
