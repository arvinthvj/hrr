import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFloorType, setSaveChanges } from '../../reduxStore/appSlice';
import {
  new_desk1,
  new_desk2,
  new_desk3,
  new_desk4,
  new_desk5,
  new_desk6,
  new_desk7,
  new_desk8,
  new_parking1,
  new_parking2,
  new_parking3,
  new_parking4,
  new_parking5,
  new_parking6,
  new_parking7,
  new_parking8,
  new_room1,
  new_room2,
  new_room3,
  new_room4,
  new_room5,
  new_room6,
} from '../../components/imagepath';
import { postData } from '../../services/apicall';

import Toaster from '../../components/toast';
import { assetsList } from '../../assets/constants/config';
import {
  amenitiesListenc,
  floorplanLocationList,
  jpublishApi,
  locationListApi,
  planTypeApi,
  workSpaceListsenc,
  zoneAddApi,
  zoneListApi,
  zoneUpdateApi,
} from '../../services/apiurl';
import FloorTabsHeader from './floorTabsHeader';
import AssetShapesTab from './assetShapesTab';
import BuildingTab from './buildingTab';
import ZoneTab from './zoneTab';
import AssetDirectoryTab from './assetDirectoryTab';

export const FloorTab = props => {
  const dispatch = useDispatch();
  const { floorType } = useSelector((state: any) => state.app);
  const drawZone = useRef(null);
  const drawSquareRoom = useRef(null);
  const drawCshapedRoom = useRef(null);
  const drawLshapedRoom = useRef(null);
  const drawWall = useRef(null);
  const drawWallDash = useRef(null);
  const drawStairs = useRef(null);
  const drawLifts = useRef(null);
  const drawDoors = useRef(null);
  const drawWindows = useRef(null);
  const placedDesks = useRef(null);
  const showConsole = useRef(null);
  const reformRef = useRef(null);
  const drawSingledesk = useRef(null);
  const drawShape2 = useRef(null);
  const drawShape3 = useRef(null);
  const drawShape4 = useRef(null);
  const drawShape5 = useRef(null);
  const drawShape6 = useRef(null);
  const drawShape7 = useRef(null);
  const drawShape8 = useRef(null);
  const drawRoomXXS = useRef(null);
  const drawRoomXS = useRef(null);
  const drawRoomS = useRef(null);
  const drawRoomM = useRef(null);
  const drawRoomL = useRef(null);
  const drawRoomXL = useRef(null);
  const drawParking = useRef(null);
  const drawParking2 = useRef(null);
  const drawParking3 = useRef(null);
  const drawParking4 = useRef(null);
  const drawParking5 = useRef(null);
  const drawParking6 = useRef(null);
  const drawParking7 = useRef(null);
  const drawParking8 = useRef(null);
  const drawOneWayR = useRef(null);
  const drawOneWayL = useRef(null);
  const drawTwoWay = useRef(null);
  const drawTwoWay90 = useRef(null);
  const workspaceDraggableText = useRef(null);
  const [floorTypeData, setFloorTypeData] = useState<any>([]);
  const [unplacedDesk, setUnplacedDesk] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [placedData, setPlacedData] = useState([]);
  const placedRef = useRef([]);
  const [placedId, setPlacedId] = useState([]);
  const [placedDesk, setPlacedDesk] = useState([]);
  const [deskRef, setDeskRef] = useState<any>('');
  const [floorName, setFloorName] = useState<any>({});
  const [locationList, setLocationList] = useState([]);
  const [unplacedRoom, setUnplacedRoom] = useState([]);
  const [placedRoom, setPlacedRoom] = useState([]);
  const [unplacedParking, setUnplacedParking] = useState([]);
  const [placedParking, setPlacedParking] = useState([]);
  const [deskShapes, setDeskShapes] = useState([]);
  const [shapes, setShapes] = useState<any>([]);
  const [zone, setZone] = useState<any>({ name: null, capacity: 0 });
  const [zoneList, setZoneList] = useState([]);
  const [zoneSelected, setSelectedZone] = useState<any>('');
  const [saveEnable, setSaveEnable] = useState(false);
  const [createZone, setCreateZone] = useState(false);
  const [selectedTab, setSelectedTab] = useState('workspacestab');

  const {
    floorData,
    setAfterSave,
    setLoading,
    setUnplacedCount,
    unplacedCount,
    publish,
    shapeFun,
    reformData,
  } = props;

  placedRef.current = [];

  const refData = name => {
    switch (name) {
      case 'Cshape Wall':
        return { ref: drawCshapedRoom, id: 'draw_cshapedroom' };
      case 'Lshape Wall':
        return { ref: drawLshapedRoom, id: 'draw_lshapedroom' };
      case 'Wall':
        return { ref: drawWall, id: 'draw_wall' };
      case 'Square Room':
        return { ref: drawSquareRoom, id: 'draw_squareroom' };
      case 'Partition-':
      case 'Partition':
        return { ref: drawWallDash, id: 'draw_wall_dash' };
      case 'Stairs':
        return { ref: drawStairs, id: 'draw_stairs' };
      case 'Lifts':
        return { ref: drawLifts, id: 'draw_lifts' };
      case 'Doors':
      case 'Gap/doorway':
        return { ref: drawDoors, id: 'draw_doors' };
      case 'Windows':
        return { ref: drawWindows, id: 'draw_windows' };
      case 'Desk-1':
        return {
          ref: drawSingledesk,
          id: 'draw_singledesk',
          name: '1 desk',
          imgSrc: new_desk1,
        };
      case 'Desk-2':
        return {
          ref: drawShape2,
          id: 'draw_shape2',
          name: '2 desks line',
          imgSrc: new_desk2,
        };
      case 'Desk-3':
        return {
          ref: drawShape3,
          id: 'draw_shape3',
          name: '2 desks facing',
          imgSrc: new_desk3,
        };
      case 'Desk-4':
        return {
          ref: drawShape4,
          id: 'draw_shape4',
          name: '3 desks',
          imgSrc: new_desk4,
        };
      case 'Desk-5':
        return {
          ref: drawShape5,
          id: 'draw_shape5',
          name: '4 desks',
          imgSrc: new_desk5,
        };
      case 'Desk-6':
        return {
          ref: drawShape6,
          id: 'draw_shape6',
          name: '6 desks',
          imgSrc: new_desk6,
        };
      case 'Desk-7':
        return {
          ref: drawShape7,
          id: 'draw_shape7',
          name: 'L desk',
          imgSrc: new_desk7,
        };
      case 'Desk-8':
        return {
          ref: drawShape8,
          id: 'draw_shape8',
          name: '8 desks',
          imgSrc: new_desk8,
        };
      case 'Room-1':
        return {
          ref: drawRoomXXS,
          id: 'draw_room_xxs',
          name: 'XX-S',
          imgSrc: new_room1,
        };
      case 'Room-2':
        return {
          ref: drawRoomXS,
          id: 'draw_room_xs',
          name: 'X-S',
          imgSrc: new_room2,
        };
      case 'Room-3':
        return {
          ref: drawRoomS,
          id: 'draw_room_s',
          name: 'S',
          imgSrc: new_room3,
        };
      case 'Room-4':
        return {
          ref: drawRoomM,
          id: 'draw_room_m',
          name: 'M',
          imgSrc: new_room4,
        };
      case 'Room-5':
        return {
          ref: drawRoomL,
          id: 'draw_room_l',
          name: 'L',
          imgSrc: new_room5,
        };
      case 'Room-6':
        return {
          ref: drawRoomXL,
          id: 'draw_room_xl',
          name: 'XL',
          imgSrc: new_room6,
        };
      case 'Parking-1':
        return {
          ref: drawParking,
          id: 'draw_parking',
          name: '1 Space',
          imgSrc: new_parking1,
        };
      case 'Parking-2':
        return {
          ref: drawParking2,
          id: 'draw_parking2',
          name: '2 Spaces line',
          imgSrc: new_parking2,
        };
      case 'Parking-3':
        return {
          ref: drawParking3,
          id: 'draw_parking3',
          name: '2 Spaces facing',
          imgSrc: new_parking3,
        };
      case 'Parking-4':
        return {
          ref: drawParking4,
          id: 'draw_parking4',
          name: '3 Spaces',
          imgSrc: new_parking4,
        };
      case 'Parking-5':
        return {
          ref: drawParking5,
          id: 'draw_parking5',
          name: '4 Spaces',
          imgSrc: new_parking5,
        };
      case 'Parking-6':
        return {
          ref: drawParking6,
          id: 'draw_parking6',
          name: '6 Spaces',
          imgSrc: new_parking6,
        };
      case 'Parking-7':
        return {
          ref: drawParking7,
          id: 'draw_parking7',
          name: '5 Spaces',
          imgSrc: new_parking7,
        };
      case 'Parking-8':
        return {
          ref: drawParking8,
          id: 'draw_parking8',
          name: '10 Spaces',
          imgSrc: new_parking8,
        };
      case 'One way R':
        return { ref: drawOneWayR, id: 'draw_oneway_R' };
      case 'One way L':
        return { ref: drawOneWayL, id: 'draw_oneway_L' };
      case 'Two way':
        return { ref: drawTwoWay, id: 'draw_twoway' };
      case 'Two way 90':
        return { ref: drawTwoWay90, id: 'draw_twoway_90' };
    }
  };

  const handleZoneList = () => {
    const zoneListInput = {
      floorplan_id: floorData ? floorData?.floorplan_id : null,
      location_id: floorData
        ? String(floorData?.location_id)
        : String(floorName?.location?.id),
    };
    postData(zoneListApi, zoneListInput, (data, res) => {
      if (res?.data?.code == 200) {
        setZoneList(data);
        createZone &&
          props?.shapeFun.getZoneUpdate &&
          props?.shapeFun.getZoneUpdate(data);
      }
    });
  };

  function spliceIntoChunks(arr, chunkSize) {
    const res: any = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  useEffect(() => {
    if (assetsList?.length > 0) {
      const type = assetsList?.map(i => ({ ...i, icon: i?.icon_images }));
      setFloorTypeData(type);
      if (floorType == '') dispatch(setFloorType(type[0]?.id));
    }

    if (amenities.length < 0)
      postData(amenitiesListenc, '', (data, res) => {
        setAmenities(data);
      });
    if (locationList.length == 0)
      postData(locationListApi, '', (data, res) => {
        postData(floorplanLocationList, '', (data1: any, res) => {
          const locBook =
            data1 != 'No data' && data1?.length != 0
              ? data1?.map(s => String(s?.location_id))
              : [];
          const locToShow = data?.List?.filter(i => !locBook.includes(i?.id));
          setLocationList(locToShow);
        });
      });

    postData(planTypeApi, { version: 1 }, (data, res) => {
      const workShapes: any = [];
      const roomShapes: any = [];
      const parkingShapes: any = [];
      const buildingShapes: any = [];
      if (data !== 'No data' && data !== 'error' && data?.length > 0) {
        data?.map(i => {
          if (i?.planner_type_id == 1) workShapes.push(i);
          if (i?.planner_type_id == 2) roomShapes.push(i);
          if (i?.planner_type_id == 3) parkingShapes.push(i);
          if (i?.planner_type_id >= 4) buildingShapes.push(i);
        });
      }
      const deskSplit = spliceIntoChunks(workShapes, 2);
      const roomSplit = spliceIntoChunks(roomShapes, 2);
      const parkingSplit = spliceIntoChunks(parkingShapes, 2);
      deskSplit?.length > 0 && setDeskShapes(deskSplit);
      setShapes({
        deskSplit,
        roomSplit,
        parkingSplit,
        buildingShapes,
      });
    });
  }, []);

  useEffect(() => {
    if (
      floorTypeData.length > 0 &&
      (floorName?.location || floorData?.location_id)
    ) {
      floorTypeData?.map(i => {
        const locationData = {
          location_id: floorData
            ? floorData?.location_id
            : floorName?.location?.id,
          floor_plan_type_id: i?.id,
        };
        postData(workSpaceListsenc, locationData, (data, res) => {
          if (res?.data?.code == 200) {
            if (i?.id == 1) {
              setUnplacedDesk([]);
              setPlacedDesk([]);
              getPlacedUnplacedData(i?.id, data);
            }
            if (i?.id == 2) {
              setUnplacedRoom([]);
              setPlacedRoom([]);
              getPlacedUnplacedData(i?.id, data);
            }
            if (i?.id == 3) {
              setUnplacedParking([]);
              setPlacedParking([]);
              getPlacedUnplacedData(i?.id, data);
            }
          }
        });
      });
    }
    handleZoneList();
  }, [floorName?.location, floorTypeData, floorData?.location_id]);

  useEffect(() => {
    setUnplacedCount(!unplacedCount);
  }, [unplacedDesk?.length, unplacedRoom?.length, unplacedParking?.length]);

  const getPlacedUnplacedData = (id, data) => {
    let placed_data: any = [];
    let unplaced_data: any = [];
    if (data?.length > 0) {
      data?.map(i => {
        const checkdata = reformData?.find(x => x?.asset_id == i?.workspace_id);
        if (checkdata != undefined) placed_data.push(i);
        else unplaced_data.push(i);
      });
    }
    switch (id) {
      case 1: {
        placed_data.length > 0 && setPlacedDesk(placed_data);
        placed_data = [];
        unplaced_data.length > 0 && setUnplacedDesk(unplaced_data);
        unplaced_data = [];
      }
      case 2: {
        placed_data.length > 0 && setPlacedRoom(placed_data);
        placed_data = [];
        unplaced_data.length > 0 && setUnplacedRoom(unplaced_data);
        unplaced_data = [];
      }
      case 3: {
        placed_data.length > 0 && setPlacedParking(placed_data);
        placed_data = [];
        unplaced_data.length > 0 && setUnplacedParking(unplaced_data);
        unplaced_data = [];
      }
      default:
        '';
    }
  };

  useEffect(() => {
    setDeskRef({
      drawSingledesk: drawSingledesk.current,
      drawShape2: drawShape2.current,
      drawShape3: drawShape3.current,
      drawShape4: drawShape4.current,
      drawShape5: drawShape5.current,
      drawShape6: drawShape6.current,
      drawShape7: drawShape7.current,
      drawShape8: drawShape8.current,
      drawRoomXXS: drawRoomXXS.current,
      drawRoomXS: drawRoomXS.current,
      drawRoomS: drawRoomS.current,
      drawRoomM: drawRoomM.current,
      drawRoomL: drawRoomL.current,
      drawRoomXL: drawRoomXL.current,
      drawParking: drawParking.current,
      drawParking2: drawParking2.current,
      drawParking3: drawParking3.current,
      drawParking4: drawParking4.current,
      drawParking5: drawParking5.current,
      drawParking6: drawParking6.current,
      drawParking7: drawParking7.current,
      drawParking8: drawParking8.current,
    });
  }, [shapes]);

  useEffect(() => {
    if (publish > 0) handleSave();
    if (publish == 0)
      props.setFloorReff({
        drawZone: drawZone.current,
        drawSquareRoom: drawSquareRoom.current,
        drawCshapedRoom: drawCshapedRoom.current,
        drawLshapedRoom: drawLshapedRoom.current,
        drawWall: drawWall.current,
        drawWallDash: drawWallDash.current,
        drawStairs: drawStairs.current,
        drawLifts: drawLifts.current,
        drawDoors: drawDoors.current,
        drawWindows: drawWindows.current,
        drawOneWayL: drawOneWayL.current,
        drawOneWayR: drawOneWayR.current,
        drawTwoWay: drawTwoWay.current,
        drawTwoWay90: drawTwoWay90.current,
        placedDesks: placedDesks.current,
        showConsole: showConsole.current,
        reformRef: reformRef.current,
        workspaceDraggableText: workspaceDraggableText.current,
        deskReff: deskRef,
      });
  }, [drawSquareRoom.current, deskRef, publish]);

  const handleSave = () => {
    setSaveChanges(true);
    const saveData = props?.shapeFun.showSave();

    const coordinates: any = [];

    saveData?.boxes2 &&
      saveData?.boxes2?.map(i =>
        coordinates.push({
          no_workspace: '1',
          floorplan_type_id: i?.assettype || null,
          asset_type: i?.assettype,
          asset_name_id: i?.asset_name_id,
          asset_image_path: '/planner/images/desk001.jpg',
          workspace_id: i?.id || null,
          my_cordinate: [{ 0: { x: String(i?.x), y: String(i?.y) } }],
          width: String(i?.w),
          height: String(i?.h),
          degree: i?.r,
          label: i?.showText || null,
          type_info: i?.type,
          zone_id: i?.type == 'zone' ? i?.assettype : null,
        }),
      );

    saveData?.existingLines &&
      saveData?.existingLines?.map(i =>
        coordinates.push({
          no_workspace: '1',
          floorplan_type_id: 4,
          asset_type: 4,
          asset_name_id: 8,
          asset_image_path: '/planner/images/desk001.jpg',
          workspace_id: null,
          my_cordinate: [
            {
              0: {
                startX: String(i?.startX),
                startY: String(i?.startY),
                endX: String(i?.endX),
                endY: String(i?.endY),
              },
            },
          ],
          width: null,
          height: null,
          degree: null,
          label: null,
          type_info: i?.type,
          zone_id: null,
        }),
      );

    saveData?.polygons &&
      saveData?.polygons?.map(i =>
        coordinates.push({
          no_workspace: '0',
          floorplan_type_id: i?.assettype || null,
          asset_type: 1,
          asset_name_id: 8,
          asset_image_path: '/planner/images/zone001.jpg',
          workspace_id: null,
          my_cordinate: [{ points: i?.points, rects: i?.rects }],
          width: '0',
          height: '0',
          degree: String(i?.r),
          label: i?.zoneName || null,
          type_info: 'zone',
          zone_id: i?.zone_id || null,
        }),
      );

    saveData?.texts &&
      saveData?.texts?.map(i =>
        coordinates.push({
          no_workspace: '0',
          floorplan_type_id: 4,
          asset_type: 4,
          asset_name_id: 0,
          workspace_id: null,
          label: null,
          asset_image_path: '/planner/images/zone001.jpg',
          type_info: 'text',
          zone_id: null,
          height: i?.height,
          degree: i?.r,
          width: i?.width,
          my_cordinate: [
            {
              x: i?.x,
              y: i?.y,
              bold: i?.bold,
              color: i?.color,
              italic: i?.italic,
              size: i?.size,
              style: i?.style,
              text: i?.text,
              underine: i?.underine,
              underline: i?.underline,
            },
          ],
        }),
      );

    if (coordinates.length <= 0) {
      Toaster(400, 'Mandatory to create canvas');
      return false;
    } else if (
      (floorData?.floorplan_id ||
        floorName?.name ||
        floorData?.location_name) &&
      (floorData?.location_id || floorName?.location)
    ) {
      setLoading(true);
      setSaveEnable(true);
      const data = {
        code: 200,
        message: 'map request',
        bg_set: saveData?.imgBase64 ? 2 : 1,
        floorplan_id: floorData?.floorplan_id || ' ', // space must in empty quotes
        location_id: floorData?.location_id || floorName?.location?.id,
        zone_id: 1,
        floorplan_type_id: floorType,
        bg_floor_name: floorData?.floorplan_name || floorData?.location_name, // space must in empty quotes
        label_status: saveData?.labelShowHide ? 1 : 0,
        bg_ext: '.jpg',
        location_name: floorData?.location_name || floorName?.location?.name,
        capacity_limit: floorName?.capacity || '0',
        floor_name:
          floorData?.floorplan_name ||
          floorName?.name ||
          floorData?.location_name,
        bg_image: saveData?.imgBase64,
        bgimage_coordinates: [
          {
            x: saveData?.imageCoordinates.x,
            y: saveData?.imageCoordinates.y,
            img_height: saveData?.img_new_height,
            img_width: saveData?.img_new_width,
          },
        ],
        data: coordinates,
      };
      postData(jpublishApi, data, (data, res) => {
        setLoading(false);
        if (res?.data?.code == 200) {
          setAfterSave(data);
          setSaveEnable(false);
        }
        Toaster(res?.data?.code, res?.data?.message);
      });
    } else {
      Toaster('error', 'create floor name and location');
      return false;
    }
  };

  const handleZone = () => {
    if (zoneSelected && zone?.name !== '') {
      setSaveEnable(true);
      setSelectedZone('');
      const updateZone = {
        floorplanzone_id: zoneSelected,
        zone_name: zone?.name,
        capacity_limit: zone?.capacity || '0',
      };
      postData(zoneUpdateApi, updateZone, (data, res) => {
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200) {
          handleZoneList();
          setSelectedZone('');
          setZone({ name: null, capacity: 0 });
          setCreateZone(false);
        }
        setSaveEnable(false);
      });
    } else if (floorName?.location?.id || floorData?.location_id) {
      if (zone?.name !== '') {
        setSaveEnable(true);
        const zoneInput = {
          floorplan_id: floorData ? floorData?.floorplan_id : null,
          location_id: floorName?.location?.id || floorData?.location_id,
          zone_name: zone?.name,
          capacity_limit: zone?.capacity || '0',
        };
        postData(zoneAddApi, zoneInput, (data, res) => {
          setSaveEnable(false);
          setZone({ name: null, capacity: 0 });
          setSelectedZone('');
          Toaster(res?.data?.code, res?.data?.message);
          if (res?.data?.code == 200) {
            handleZoneList();
            setCreateZone(false);
          }
        });
      } else Toaster('error', 'Need Zone Name');
    } else Toaster('error', 'Mandatory to choose Location from Setting tab');
  };

  return (
    <div className="card w-100 p-0 floor-tab-card floor-tab-card-inner border-0">
      <FloorTabsHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="card-body">
        <div className="tab-content" id="myTabContent">
          <AssetShapesTab
            floorTypeData={floorTypeData}
            shapes={shapes}
            refData={refData}
            selectedTab={selectedTab}
          />
          <BuildingTab
            shapes={shapes}
            refData={refData}
            selectedTab={selectedTab}
          />
          <ZoneTab
            handleZone={handleZone}
            createZone={createZone}
            zone={zone}
            setZone={setZone}
            zoneSelected={zoneSelected}
            setSelectedZone={setSelectedZone}
            saveEnable={saveEnable}
            setCreateZone={setCreateZone}
            zoneList={zoneList}
            shapeFun={shapeFun}
            selectedTab={selectedTab}
          />
          <AssetDirectoryTab
            placedDesk={placedDesk}
            unplacedDesk={unplacedDesk}
            placedRoom={placedRoom}
            unplacedRoom={unplacedRoom}
            placedParking={placedParking}
            unplacedParking={unplacedParking}
            selectedTab={selectedTab}
          />
        </div>
      </div>
    </div>
  );
};
