import React, { useEffect, useState } from 'react';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { Search } from '../imagepath';

interface AssetDirectoryTabProps {
  placedDesk: object | any;
  unplacedDesk: object | any;
  placedRoom: object | any;
  unplacedRoom: object | any;
  placedParking: object | any;
  unplacedParking: object | any;
  selectedTab: string;
}

const AssetDirectoryTab: React.FC<AssetDirectoryTabProps> = ({
  placedDesk,
  unplacedDesk,
  placedRoom,
  unplacedRoom,
  placedParking,
  unplacedParking,
  selectedTab,
}) => {
  const [unplacedRoomFilter, setUnplacedRoomFilter] = useState<any>([]);
  const [placedRoomFilter, setPlacedRoomFilter] = useState<any>([]);
  const [unplacedParkingFilter, setUnplacedParkingFilter] = useState<any>([]);
  const [placedParkingFilter, setPlacedParkingFilter] = useState<any>([]);
  const [placedDeskFilter, setPlacedDeskFilter] = useState<any>([]);
  const [unplacedDeskFilter, setUnplacedDeskFilter] = useState<any>([]);
  const [collapseClass, setCollapseClass] = useState({
    workspace: true,
    room: false,
    parking: false,
    deskAssign: false,
    deskUnassign: false,
    roomAssign: false,
    roomUnassign: false,
    parkingAssign: false,
    parkingUnassign: false,
  });
  const [search, setSearch] = useState('');

  const getSearchList = search => {
    const plcdDeskFltr = placedDesk
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setPlacedDeskFilter(plcdDeskFltr);
    const unplcdDeskFltr = unplacedDesk
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setUnplacedDeskFilter(unplcdDeskFltr);
    const plcdRoomFltr = placedRoom
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setPlacedRoomFilter(plcdRoomFltr);
    const unplcdRoomFltr = unplacedRoom
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setUnplacedRoomFilter(unplcdRoomFltr);
    const plcdParkFltr = placedParking
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setPlacedParkingFilter(plcdParkFltr);
    const unplcdParkFltr = unplacedParking
      ?.filter(
        (i: any) => i?.name?.toLowerCase()?.includes(search?.toLowerCase()),
      )
      ?.map((n: any) => n?.name);
    setUnplacedParkingFilter(unplcdParkFltr);
    setCollapseClass({
      workspace: true,
      room: true,
      parking: true,
      deskAssign: true,
      deskUnassign: true,
      roomAssign: true,
      roomUnassign: true,
      parkingAssign: true,
      parkingUnassign: true,
    });
  };

  useEffect(() => {
    if (search?.trim()?.length == 0) {
      setPlacedDeskFilter(placedDesk?.map((i: any) => i?.name));
      setUnplacedDeskFilter(unplacedDesk?.map((i: any) => i?.name));
      setPlacedRoomFilter(placedRoom?.map((i: any) => i?.name));
      setUnplacedRoomFilter(unplacedRoom?.map((i: any) => i?.name));
      setPlacedParkingFilter(placedParking?.map((i: any) => i?.name));
      setUnplacedParkingFilter(unplacedParking?.map((i: any) => i?.name));
      setCollapseClass({
        workspace: true,
        room: false,
        parking: false,
        deskAssign: false,
        deskUnassign: false,
        roomAssign: false,
        roomUnassign: false,
        parkingAssign: false,
        parkingUnassign: false,
      });
    }
    const debounce = setTimeout(() => {
      search?.trim() && getSearchList(search);
    }, 500);
    return () => clearTimeout(debounce);
  }, [
    search,
    placedDesk,
    unplacedDesk,
    placedRoom,
    unplacedRoom,
    placedParking,
    unplacedParking,
  ]);

  return (
    <div
      className={`tab-pane fade show ${
        selectedTab == 'settingstab' ? 'active' : ''
      }`}
      id="settingstab"
      role="tabpanel"
      aria-labelledby="settings-tab"
    >
      <div className="floor-tab-header">
        <div className="floor-settings-header floor-directory-header">
          <h4>
            {findLabelText('Directory', 'Directory', 'Floorplan_Management')}
          </h4>
        </div>
        <div className="filter-search filter-input building-filter-search">
          <input
            type="text"
            placeholder={findLabelText('Find', 'Find', 'Asset_Management')}
            className="input-filter"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="img-group">
            <Link to="#">
              <img src={Search} alt="img" />
            </Link>
          </div>
        </div>
      </div>
      <div className="floor-settings-tabs">
        <div id="directory-accordion">
          <div className="directory-card">
            <div
              className="directory-header"
              id="heading-1"
              onClick={() =>
                setCollapseClass({
                  ...collapseClass,
                  workspace: !collapseClass.workspace,
                })
              }
            >
              <h5 className="directory-head">
                <Link
                  role="button"
                  data-bs-toggle="collapse"
                  to="#collapse-1"
                  aria-expanded={`${
                    collapseClass.workspace == true ? 'true' : 'false'
                  }`}
                  aria-controls="collapse-1"
                >
                  {findLabelText(
                    'Workspaces',
                    'Workspaces',
                    'Floorplan_Management',
                  )}
                </Link>
                <span id="desk-count-total">
                  {placedDesk?.length}/
                  {unplacedDesk?.length + placedDesk?.length}
                </span>
              </h5>
            </div>
            <div
              id="collapse-1"
              className="collapse show"
              data-bs-parent="#accordion"
              aria-labelledby="heading-1"
              style={{
                display: `${
                  collapseClass.workspace == true ? 'block' : 'none'
                }`,
              }}
            >
              <div className="directory-body">
                <div id="accordion-1">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-1-1"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          deskUnassign: !collapseClass.deskUnassign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="unassignColapsBtn"
                          data-bs-toggle="collapse"
                          to=""
                          aria-expanded={`${
                            collapseClass.deskUnassign == true
                              ? 'true'
                              : 'false'
                          }`}
                          aria-controls="collapse-1-1"
                        >
                          {findLabelText(
                            'Unassigned',
                            'Unassigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_1_1_unAsignCount">
                          {unplacedDesk?.length}
                        </span>
                      </h5>
                    </div>

                    {unplacedDesk?.length > 0 &&
                      unplacedDesk?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-1-1"
                          data-bs-parent="#accordion-1"
                          aria-labelledby="heading-1-1"
                          className="collapse unassignAccordin"
                          style={{
                            display: `${
                              collapseClass.deskUnassign == true &&
                              unplacedDeskFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link className="assignBtn" to="#">
                                {findLabelText(
                                  'Assign',
                                  'Assign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div id="accordion-1-2">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-1-2"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          deskAssign: !collapseClass.deskAssign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="assignColapsBtn"
                          data-bs-toggle="collapse"
                          to=""
                          aria-expanded={`${
                            collapseClass.deskAssign == true ? 'true' : 'false'
                          }`}
                          aria-controls="collapse-1-2"
                        >
                          {findLabelText(
                            'Assigned',
                            'Assigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_1_2_asignCount">
                          {placedDesk?.length}
                        </span>
                      </h5>
                    </div>
                    {placedDesk?.length > 0 &&
                      placedDesk?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-1-2"
                          className="collapse assignAccordin"
                          data-bs-parent="#accordion-1-2"
                          aria-labelledby="heading-1-2"
                          style={{
                            display: `${
                              collapseClass.deskAssign == true &&
                              placedDeskFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link className="unassign-desk" to="#">
                                {findLabelText(
                                  'Unassign',
                                  'Unassign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="directory-card directory-card-no-border">
            <div
              className="directory-header"
              id="heading-2"
              onClick={() =>
                setCollapseClass({
                  ...collapseClass,
                  room: !collapseClass.room,
                })
              }
            >
              <h5 className="directory-head">
                <Link
                  className="collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  to="#collapse-2"
                  aria-expanded={`${
                    collapseClass.room == true ? 'true' : 'false'
                  }`}
                  aria-controls="collapse-2"
                >
                  {findLabelText('Rooms', 'Rooms', 'Floorplan_Management')}
                </Link>
                <span id="room-count-total">
                  {placedRoom?.length}/
                  {unplacedRoom?.length + placedRoom?.length}
                </span>
              </h5>
            </div>
            <div
              id="collapse-2"
              className="collapse"
              data-bs-parent="#accordion"
              aria-labelledby="heading-2"
              style={{
                display: `${collapseClass.room == true ? 'block' : 'none'}`,
              }}
            >
              <div className="directory-body">
                <div id="accordion-2">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-2-1"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          roomUnassign: !collapseClass.roomUnassign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="unassignColapsBtnRoom"
                          data-bs-toggle="collapse"
                          to="#collapse-2-1"
                          aria-expanded={`${
                            collapseClass.roomUnassign == true
                              ? 'true'
                              : 'false'
                          }`}
                          aria-controls="collapse-2-1"
                        >
                          {findLabelText(
                            'Unassigned',
                            'Unassigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_2_1_unAsignCount">
                          {unplacedRoom?.length}
                        </span>
                      </h5>
                    </div>
                    {unplacedRoom?.length > 0 &&
                      unplacedRoom?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-2-1"
                          className="collapse unassignAccordinRoom"
                          data-bs-parent="#accordion-2"
                          aria-labelledby="heading-2-1"
                          style={{
                            display: `${
                              collapseClass.roomUnassign == true &&
                              unplacedRoomFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link className="assignRoomBtn" to="">
                                {findLabelText(
                                  'Assign',
                                  'Assign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div id="accordion-2-2">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-2-2"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          roomAssign: !collapseClass.roomAssign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="assignColapsBtnRoom"
                          data-bs-toggle="collapse"
                          to="#collapse-2-2"
                          aria-expanded={`${
                            collapseClass.roomAssign == true ? 'true' : 'false'
                          }`}
                          aria-controls="collapse-2-2"
                        >
                          {findLabelText(
                            'Assigned',
                            'Assigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_2_2_asignCount">
                          {placedRoom?.length}
                        </span>
                      </h5>
                    </div>
                    {placedRoom?.length > 0 &&
                      placedRoom?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-2-2"
                          className="collapse assignAccordinRoom"
                          data-bs-parent="#accordion-2-2"
                          aria-labelledby="heading-2-2"
                          style={{
                            display: `${
                              collapseClass.roomAssign == true &&
                              placedRoomFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link to="" className="unassign-room">
                                {findLabelText(
                                  'Unassign',
                                  'Unassign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="directory-card directory-card-no-border">
            <div
              className="directory-header"
              id="heading-3"
              onClick={() =>
                setCollapseClass({
                  ...collapseClass,
                  parking: !collapseClass.parking,
                })
              }
            >
              <h5 className="directory-head">
                <Link
                  className="collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  to="#collapse-3"
                  aria-expanded={`${
                    collapseClass.parking == true ? 'true' : 'false'
                  }`}
                  aria-controls="collapse-2"
                >
                  {findLabelText('Parking', 'Parking', 'Floorplan_Management')}
                </Link>
                <span id="park-count-total">
                  {placedParking?.length}/
                  {unplacedParking?.length + placedParking?.length}
                </span>
              </h5>
            </div>

            <div
              id="collapse-3"
              className="collapse"
              data-bs-parent="#accordion"
              aria-labelledby="heading-3"
              style={{
                display: `${collapseClass.parking == true ? 'block' : 'none'}`,
              }}
            >
              <div className="directory-body">
                <div id="accordion-3">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-3-1"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          parkingUnassign: !collapseClass.parkingUnassign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="unassignColapsBtnPark"
                          data-bs-toggle="collapse"
                          to="#collapse-3-1"
                          aria-expanded={`${
                            collapseClass.parkingUnassign == true
                              ? 'true'
                              : 'false'
                          }`}
                          aria-controls="collapse-3-1"
                        >
                          {findLabelText(
                            'Unassigned',
                            'Unassigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_3_1_unAsignCount">
                          {unplacedParking?.length}
                        </span>
                      </h5>
                    </div>
                    {unplacedParking?.length > 0 &&
                      unplacedParking?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-3-1"
                          className="collapse unassignAccordinPark"
                          data-bs-parent="#accordion-3"
                          aria-labelledby="heading-3-1"
                          style={{
                            display: `${
                              collapseClass.parkingUnassign == true &&
                              unplacedParkingFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link className="assignParkBtn" to="">
                                {findLabelText(
                                  'Assign',
                                  'Assign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div id="accordion-3-2">
                  <div className="directory-card">
                    <div
                      className="directory-header unassign-header"
                      id="heading-3-2"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          parkingAssign: !collapseClass.parkingAssign,
                        })
                      }
                    >
                      <h5 className="directory-head">
                        <Link
                          className="collapsed"
                          role="button"
                          id="assignColapsBtnPark"
                          data-bs-toggle="collapse"
                          to="#collapse-3-2"
                          aria-expanded={`${
                            collapseClass.parkingAssign == true
                              ? 'true'
                              : 'false'
                          }`}
                          aria-controls="collapse-3-2"
                        >
                          {findLabelText(
                            'Assigned',
                            'Assigned',
                            'Floorplan_Management',
                          )}
                        </Link>
                        <span id="acc_3_2_asignCount">
                          {placedParking?.length}
                        </span>
                      </h5>
                    </div>
                    {placedParking?.length > 0 &&
                      placedParking?.map((x: any) => (
                        <div
                          key={x?.workspace_id}
                          id="collapse-3-2"
                          className="collapse assignAccordinPark"
                          data-bs-parent="#accordion-3-2"
                          aria-labelledby="heading-3-2"
                          style={{
                            display: `${
                              collapseClass.parkingAssign == true &&
                              placedParkingFilter?.includes(x?.name)
                                ? 'block'
                                : 'none'
                            }`,
                          }}
                        >
                          <div className="directory-body">
                            <div
                              className="directory-desk"
                              id={x?.name}
                              desk_id={x?.workspace_id}
                            >
                              <span>{x?.name}</span>
                              <Link to="" className="unassign-park">
                                {findLabelText(
                                  'Unassign',
                                  'Unassign',
                                  'Floorplan_Management',
                                )}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDirectoryTab;
