import React, { useContext, useEffect, useState } from 'react';
import {
  permission_12,
  permission_13,
  permission_14,
  permission_15,
} from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';

const Preferences = () => {
  const {
    scrollHeight,
    allPermissionList,
    setAllPermissionList,
    allPermissionStatus,
    setAllPermissionStatus,
  } = useContext(HRSettingsContext);
  const { prefrence } = allPermissionList;
  const { basic, workspace, room, parking } =
    prefrence?.prefrence_details?.reduce(
      (acc, item) => {
        if (item.field_name === 'workspace') {
          acc.workspace.push(item);
        } else if (item.field_name === 'Room') {
          acc.room.push(item);
        } else if (item.field_name === 'Parking') {
          acc.parking.push(item);
        } else if (
          item.field_name !== 'workspace' &&
          item.field_name !== 'Room' &&
          item.field_name !== 'Parking'
        ) {
          acc.basic.push(item);
        }
        return acc;
      },
      { basic: [], workspace: [], room: [], parking: [] },
    );
  const [basicList, updateBasicList] = useState(basic);
  const [preferredworkspaceList, updatePreferredworkspaceList] =
    useState(workspace);
  const [preferredRoomList, updatePreferredRoomList] = useState(room);
  const [preferredParkingList, updatePreferredParkingList] = useState(parking);

  useEffect(() => {
    if (prefrence && allPermissionStatus) {
      if (prefrence?.prefrence_details.length > 0) {
        const { basic, workspace, room, parking } =
          prefrence?.prefrence_details?.reduce(
            (acc, item) => {
              if (item.field_name === 'workspace') {
                acc.workspace.push(item);
              } else if (item.field_name === 'Room') {
                acc.room.push(item);
              } else if (item.field_name === 'Parking') {
                acc.parking.push(item);
              } else if (
                item.field_name !== 'workspace' &&
                item.field_name !== 'Room' &&
                item.field_name !== 'Parking'
              ) {
                acc.basic.push(item);
              }
              return acc;
            },
            { basic: [], workspace: [], room: [], parking: [] },
          );
        updateBasicList(basic);
        updatePreferredworkspaceList(workspace);
        updatePreferredRoomList(room);
        updatePreferredParkingList(parking);
        setAllPermissionStatus(false);
      }
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      prefrence: {
        prefrence_details: [
          ...basicList,
          ...preferredworkspaceList,
          ...preferredRoomList,
          ...preferredParkingList,
        ],
      },
    });
  }, [
    basicList,
    preferredworkspaceList,
    preferredRoomList,
    preferredParkingList,
  ]);
  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_12}
          title="Basic"
          list={basicList}
          updatePermission={updateBasicList}
        />

        <PermissionSection
          image={permission_13}
          title="Preferred workspace"
          list={preferredworkspaceList}
          updatePermission={updatePreferredworkspaceList}
        />

        <PermissionSection
          image={permission_14}
          title="Preferred room"
          list={preferredRoomList}
          updatePermission={updatePreferredRoomList}
        />
        <PermissionSection
          image={permission_15}
          title="Preferred parking"
          list={preferredParkingList}
          updatePermission={updatePreferredParkingList}
        />
      </div>
    </div>
  );
};

export default Preferences;
