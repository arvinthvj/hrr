import React from 'react';
import {
  cshapewall,
  desk_avail_filter,
  desk_booked_filter,
  desk_bookedme,
  desk_bookedme_filter,
  desk_request,
  desk_request_filter,
  desk_unavail,
  doorway,
  floor_img,
  lift,
  lshapewall,
  new_desk1,
  new_lshapedesk_select,
  new_parking1,
  new_parking_select,
  new_room1,
  new_room1_select,
  new_room2,
  new_room2_select,
  new_room3,
  new_room3_select,
  new_room4,
  new_room4_select,
  new_room5,
  new_room5_select,
  new_room6,
  new_room6_select,
  new_singledesk_select,
  pan_icon,
  parkingAvail,
  parkingAvailFilter,
  parkingBooked,
  parkingBookedFilter,
  parkingBookedme,
  parkingBookedmeFilter,
  parkingRequest,
  parkingRequestFilter,
  parkingUnavail,
  regularC_avail_filter,
  regularC_booked_filter,
  regularC_bookedme_filter,
  regularC_request_filter,
  regularL_avail_filter,
  regularL_booked_filter,
  regularL_bookedme_filter,
  regularL_request_filter,
  regular_c,
  regular_c_avail,
  regular_c_booked,
  regular_c_bookedme,
  regular_c_request,
  regular_c_select,
  regular_c_unavail,
  regular_l,
  regular_l_avail,
  regular_l_booked,
  regular_l_bookedme,
  regular_l_request,
  regular_l_unavail,
  room_avail,
  room_avail_filter,
  room_booked,
  room_booked_filter,
  room_bookedme,
  room_bookedme_filter,
  room_l_avail,
  room_l_avail_filter,
  room_l_booked,
  room_l_booked_filter,
  room_l_bookedme,
  room_l_bookedme_filter,
  room_l_req,
  room_l_req_filter,
  room_l_unavail,
  room_m_avail,
  room_m_avail_filter,
  room_m_booked,
  room_m_booked_filter,
  room_m_bookedme,
  room_m_bookedme_filter,
  room_m_req,
  room_m_req_filter,
  room_m_unavail,
  room_request,
  room_request_filter,
  room_unavail,
  room_xl_avail,
  room_xl_avail_filter,
  room_xl_booked,
  room_xl_booked_filter,
  room_xl_bookedme,
  room_xl_bookedme_filter,
  room_xl_req,
  room_xl_req_filter,
  room_xl_unavail,
  room_xs_avail,
  room_xs_avail_filter,
  room_xs_booked,
  room_xs_booked_filter,
  room_xs_bookedme,
  room_xs_bookedme_filter,
  room_xs_req,
  room_xs_req_filter,
  room_xs_unavail,
  room_xxs_avail,
  room_xxs_avail_filter,
  room_xxs_booked,
  room_xxs_booked_filter,
  room_xxs_bookedme,
  room_xxs_bookedme_filter,
  room_xxs_req,
  room_xxs_req_filter,
  room_xxs_unavail,
  shape2,
  shape2_avail,
  shape2_avail_filter,
  shape2_booked,
  shape2_booked_filter,
  shape2_bookedme,
  shape2_bookedme_filter,
  shape2_request,
  shape2_request_filter,
  shape2_select,
  shape2_unavail,
  shape3,
  shape3_avail,
  shape3_avail_filter,
  shape3_booked,
  shape3_booked_filter,
  shape3_bookedme,
  shape3_bookedme_filter,
  shape3_request,
  shape3_request_filter,
  shape3_select,
  shape3_unavail,
  shape4,
  shape4_select,
  shape5_avail,
  shape5_booked,
  shape5_bookedme,
  shape5_withoutText,
  singledesk_cursor,
  square_cursor,
  stairs,
  onewayroadL,
  onewayroadR,
  twowayroad,
  twowayroad90,
  text_cursor,
  window,
  zoom_minus_icon,
  zoom_plus_icon,
} from '../../components/imagepath';
import Floor from '../../assets/img/icons/desk-icon1.svg';
import { Link } from 'react-router-dom';
const ImageCollection = ({
  activeTool,
  canvasDiv,
  canvasImg,
  lshapewallImg,
  cshapewallImg,
  singledeskImg,
  singledeskSelect,
  shape2Img,
  shape2Select,
  shape3Img,
  shape3Select,
  shape4Img,
  shape4Select,
  shape5Img,
  shape5Select,
  singleDeskDragImg,
  textDragImg,
  squareDragImg,
  FloorRed,
  roomM,
  roomL,
  roomMSelect,
  roomLSelect,
  roomXL,
  roomXLSelect,
  canvasTextDiv,
  canvasText,
  canvasTextDone,
  canvasRef,
  setShowId,
  shapeFun,
  overId,
  setOverId,
  setActiveTool,
}) => {
  const imageCollect = [
    { id: 'canvas_img', ref: canvasImg, src: floor_img },
    { id: 'lshapewall_img', ref: lshapewallImg, src: lshapewall },
    { id: 'cshapewall_img', ref: cshapewallImg, src: cshapewall },
    { id: 'singledesk_img', ref: singledeskImg, src: new_desk1 },
    {
      id: 'singledesk_select_img',
      ref: singledeskSelect,
      src: new_singledesk_select,
    },
    { id: 'shape2_img', ref: shape2Img, src: shape2 },
    { id: 'shape2_select_img', ref: shape2Select, src: shape2_select },
    { id: 'shape3_img', ref: shape3Img, src: shape3 },
    { id: 'shape3_select_img', ref: shape3Select, src: shape3_select },
    { id: 'shape4_img', ref: shape4Img, src: shape4 },
    { id: 'shape4_select_img', ref: shape4Select, src: shape4_select },
    { id: 'shape2_img', ref: shape2Img, src: shape2 },
    { id: 'shape5_img', ref: shape5Img, src: shape5_withoutText },
    { id: 'shape5_select_img', ref: shape5Select, src: new_lshapedesk_select },
    {
      id: 'singledeskdrag_img',
      ref: singleDeskDragImg,
      src: singledesk_cursor,
    },
    { id: 'textdrag_img', ref: textDragImg, src: text_cursor },
    { id: 'squaredrag_img', ref: squareDragImg, src: square_cursor },
    { id: 'singledesk_img_red', ref: null, src: FloorRed },
    { id: 'singledesk_img_bookedme', ref: null, src: desk_bookedme },
    { id: 'desk_unavail', ref: null, src: desk_unavail },
    { id: 'parking_img', ref: null, src: new_parking1 },
    { id: 'parking_select_img', ref: null, src: new_parking_select },
    { id: 'parking_booked', ref: null, src: parkingBooked },
    { id: 'parking_bookedme', ref: null, src: parkingBookedme },
    { id: 'parking_request', ref: null, src: parkingRequest },
    { id: 'desk_request', ref: null, src: desk_request },
    { id: 'room_request', ref: null, src: room_request },
    { id: 'parking_avail', ref: null, src: parkingAvail },
    { id: 'parking_unavail', ref: null, src: parkingUnavail },
    { id: 'room_unavail', ref: null, src: room_unavail },
    { id: 'shape3_booked', ref: null, src: shape3_booked },
    { id: 'shape3_bookedme', ref: null, src: shape3_bookedme },
    { id: 'shape3_request', ref: null, src: shape3_request },
    { id: 'shape3_unavail', ref: null, src: shape3_unavail },
    { id: 'shape3_avail', ref: null, src: shape3_avail },
    { id: 'shape2_booked', ref: null, src: shape2_booked },
    { id: 'shape2_bookedme', ref: null, src: shape2_bookedme },
    { id: 'shape2_request', ref: null, src: shape2_request },
    { id: 'shape2_unavail', ref: null, src: shape2_unavail },
    { id: 'shape2_avail', ref: null, src: shape2_avail },
    { id: 'shape5_booked', ref: null, src: shape5_booked },
    { id: 'shape5_bookedme', ref: null, src: shape5_bookedme },
    { id: 'shape5_avail', ref: null, src: shape5_avail },
    { id: 'singledesk_img_aval', ref: null, src: Floor },
    { id: 'room_img', ref: null, src: new_room3 },
    { id: 'room_booked', ref: null, src: room_booked },
    { id: 'room_bookedme', ref: null, src: room_bookedme },
    { id: 'room_avail', ref: null, src: room_avail },
    { id: 'room_select_img', ref: null, src: new_room3_select },
    { id: 'room_xxs', ref: null, src: new_room1 },
    { id: 'room_xxs_select', ref: null, src: new_room1_select },
    { id: 'room_xxs_avail', ref: null, src: room_xxs_avail },
    { id: 'room_xxs_avail_filter', ref: null, src: room_xxs_avail_filter },
    { id: 'room_xxs_booked', ref: null, src: room_xxs_booked },
    { id: 'room_xxs_booked_filter', ref: null, src: room_xxs_booked_filter },
    { id: 'room_xxs_bookedme', ref: null, src: room_xxs_bookedme },
    {
      id: 'room_xxs_bookedme_filter',
      ref: null,
      src: room_xxs_bookedme_filter,
    },
    { id: 'room_xxs_req', ref: null, src: room_xxs_req },
    { id: 'room_xxs_req_filter', ref: null, src: room_xxs_req_filter },
    { id: 'room_xxs_unavail', ref: null, src: room_xxs_unavail },
    { id: 'room_xs', ref: null, src: new_room2 },
    { id: 'room_xs_select', ref: null, src: new_room2_select },
    { id: 'room_xs_avail', ref: null, src: room_xs_avail },
    { id: 'room_xs_avail_filter', ref: null, src: room_xs_avail_filter },
    { id: 'room_xs_booked', ref: null, src: room_xs_booked },
    { id: 'room_xs_booked_filter', ref: null, src: room_xs_booked_filter },
    { id: 'room_xs_bookedme', ref: null, src: room_xs_bookedme },
    { id: 'room_xs_bookedme_filter', ref: null, src: room_xs_bookedme_filter },
    { id: 'room_xs_req', ref: null, src: room_xs_req },
    { id: 'room_xs_req_filter', ref: null, src: room_xs_req_filter },
    { id: 'room_xs_unavail', ref: null, src: room_xs_unavail },
    { id: 'room_m', ref: roomM, src: new_room4 },
    { id: 'room_m_select', ref: roomMSelect, src: new_room4_select },
    { id: 'room_m_avail', ref: null, src: room_m_avail },
    { id: 'room_m_avail_filter', ref: null, src: room_m_avail_filter },
    { id: 'room_m_booked', ref: null, src: room_m_booked },
    { id: 'room_m_booked_filter', ref: null, src: room_m_booked_filter },
    { id: 'room_m_bookedme', ref: null, src: room_m_bookedme },
    { id: 'room_m_bookedme_filter', ref: null, src: room_m_bookedme_filter },
    { id: 'room_m_req', ref: null, src: room_m_req },
    { id: 'room_m_req_filter', ref: null, src: room_m_req_filter },
    { id: 'room_m_unavail', ref: null, src: room_m_unavail },
    { id: 'room_l', ref: roomL, src: new_room5 },
    { id: 'room_l_select', ref: roomLSelect, src: new_room5_select },
    { id: 'room_l_avail', ref: null, src: room_l_avail },
    { id: 'room_l_avail_filter', ref: null, src: room_l_avail_filter },
    { id: 'room_l_booked', ref: null, src: room_l_booked },
    { id: 'room_l_booked_filter', ref: null, src: room_l_booked_filter },
    { id: 'room_l_bookedme', ref: null, src: room_l_bookedme },
    { id: 'room_l_bookedme_filter', ref: null, src: room_l_bookedme_filter },
    { id: 'room_l_req', ref: null, src: room_l_req },
    { id: 'room_l_req_filter', ref: null, src: room_l_req_filter },
    { id: 'room_l_unavail', ref: null, src: room_l_unavail },
    { id: 'room_xl', ref: roomXL, src: new_room6 },
    { id: 'room_xl_select', ref: roomXLSelect, src: new_room6_select },
    { id: 'room_xl_avail', ref: null, src: room_xl_avail },
    { id: 'room_xl_avail_filter', ref: null, src: room_xl_avail_filter },
    { id: 'room_xl_booked', ref: null, src: room_xl_booked },
    { id: 'room_xl_booked_filter', ref: null, src: room_xl_booked_filter },
    { id: 'room_xl_bookedme', ref: null, src: room_xl_bookedme },
    { id: 'room_xl_bookedme_filter', ref: null, src: room_xl_bookedme_filter },
    { id: 'room_xl_req', ref: null, src: room_xl_req },
    { id: 'room_xl_req_filter', ref: null, src: room_xl_req_filter },
    { id: 'room_xl_unavail', ref: null, src: room_xl_unavail },
    { id: 'stairs_img', ref: null, src: stairs },
    { id: 'lifts_img', ref: null, src: lift },
    { id: 'doors_img', ref: null, src: doorway },
    { id: 'windows_img', ref: null, src: window },
    { id: 'onewayR_img', ref: null, src: onewayroadR },
    { id: 'onewayL_img', ref: null, src: onewayroadL },
    { id: 'twoway_img', ref: null, src: twowayroad },
    { id: 'twoway90_img', ref: null, src: twowayroad90 },
    { id: 'regular_c', ref: null, src: regular_c },
    { id: 'regular_l', ref: null, src: regular_l },
    { id: 'regular_c_select', ref: null, src: regular_c_select },
    { id: 'regular_l_select', ref: null, src: new_lshapedesk_select },
    { id: 'regular_l_booked', ref: null, src: regular_l_booked },
    { id: 'regular_c_booked', ref: null, src: regular_c_booked },
    { id: 'regular_c_bookedme', ref: null, src: regular_c_bookedme },
    { id: 'regular_l_bookedme', ref: null, src: regular_l_bookedme },
    { id: 'regular_c_unavail', ref: null, src: regular_c_unavail },
    { id: 'regular_l_unavail', ref: null, src: regular_l_unavail },
    { id: 'regular_c_avail', ref: null, src: regular_c_avail },
    { id: 'regular_l_avail', ref: null, src: regular_l_avail },
    { id: 'regular_l_request', ref: null, src: regular_l_request },
    { id: 'regular_c_request', ref: null, src: regular_c_request },
    { id: 'parkingAvailFilter', ref: null, src: parkingAvailFilter },
    { id: 'parkingBookedFilter', ref: null, src: parkingBookedFilter },
    { id: 'parkingBookedmeFilter', ref: null, src: parkingBookedmeFilter },
    { id: 'parkingRequestFilter', ref: null, src: parkingRequestFilter },
    { id: 'regularC_booked_filter', ref: null, src: regularC_booked_filter },
    {
      id: 'regularC_bookedme_filter',
      ref: null,
      src: regularC_bookedme_filter,
    },
    { id: 'regularC_avail_filter', ref: null, src: regularC_avail_filter },
    { id: 'regularC_request_filter', ref: null, src: regularC_request_filter },
    { id: 'regularL_booked_filter', ref: null, src: regularL_booked_filter },
    {
      id: 'regularL_bookedme_filter',
      ref: null,
      src: regularL_bookedme_filter,
    },
    { id: 'regularL_avail_filter', ref: null, src: regularL_avail_filter },
    { id: 'regularL_request_filter', ref: null, src: regularL_request_filter },
    { id: 'desk_bookedme_filter', ref: null, src: desk_bookedme_filter },
    { id: 'desk_booked_filter', ref: null, src: desk_booked_filter },
    { id: 'desk_request_filter', ref: null, src: desk_request_filter },
    { id: 'desk_avail_filter', ref: null, src: desk_avail_filter },
    { id: 'shape3_booked_filter', ref: null, src: shape3_booked_filter },
    { id: 'shape3_bookedme_filter', ref: null, src: shape3_bookedme_filter },
    { id: 'shape3_request_filter', ref: null, src: shape3_request_filter },
    { id: 'shape3_avail_filter', ref: null, src: shape3_avail_filter },
    { id: 'shape2_booked_filter', ref: null, src: shape2_booked_filter },
    { id: 'shape2_bookedme_filter', ref: null, src: shape2_bookedme_filter },
    { id: 'shape2_request_filter', ref: null, src: shape2_request_filter },
    { id: 'shape2_avail_filter', ref: null, src: shape2_avail_filter },
    { id: 'room_booked_filter', ref: null, src: room_booked_filter },
    { id: 'room_bookedme_filter', ref: null, src: room_bookedme_filter },
    { id: 'room_request_filter', ref: null, src: room_request_filter },
    { id: 'room_avail_filter', ref: null, src: room_avail_filter },
  ];
  return (
    <div
      className="floor-img canvas_div"
      id="canvas_div"
      style={{
        backgroundColor: '#eeeeee',
        marginTop: '20px',
        height: '518px',
        overflow: 'hidden',
      }}
      ref={canvasDiv}
    >
      {imageCollect?.map((ele, index) => {
        return (
          <img
            key={index}
            src={ele?.src}
            ref={ele?.ref}
            id={ele?.id}
            alt="img"
            style={{ display: 'none' }}
          />
        );
      })}
      <div
        id="canvas_text_div"
        ref={canvasTextDiv}
        style={{
          display: 'none',
          position: 'relative',
          height: '0px',
          width: '40px',
        }}
      >
        <input
          type="text"
          ref={canvasText}
          name="canvas_text"
          id="canvas_text"
          defaultValue="Text"
          style={{
            background: 'transparent',
            borderColor: '#0F62AB',
            borderWidth: '1px',
            border: 'none',
            color: 'transparent',
            caretColor: 'transparent',
            padding: '0px !important',
            width: '1px !important',
            maxWidth: '1px',
          }}
        />
        <button
          id="canvas_text_done"
          ref={canvasTextDone}
          style={{ display: 'none' }}
        >
          Done
        </button>
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onClick={() => {
          setShowId('');
          setShowId(shapeFun?.selectedBox);
        }}
        onMouseMove={() => {
          const mousehover = shapeFun?.onMouseHover();
          if (mousehover != overId || overId == '') {
            setOverId(mousehover);
          }
        }}
      />
      <div className="locate-canvas-btn">
        <ul>
          <li
            className={`toolSelection ${
              activeTool.pan == true &&
              activeTool.zoomOut == false &&
              activeTool.zoomIn == false
                ? 'active'
                : ''
            }`}
            onClick={() => {
              setActiveTool({
                pan: !activeTool.pan,
                zoomIn: false,
                zoomOut: false,
              });
              shapeFun.panlock();
            }}
          >
            <Link to="">
              <img src={pan_icon} alt="img" />
            </Link>
          </li>
          <li
            className={`toolSelection ${
              activeTool.zoomOut == true && activeTool.pan == false
                ? 'active'
                : ''
            }`}
            onClick={() => {
              if (activeTool.pan == false) {
                setActiveTool({
                  pan: false,
                  zoomIn: false,
                  zoomOut: true,
                });
              }
              shapeFun.scalezoom(-1);
            }}
          >
            <Link to="">
              <img src={zoom_minus_icon} alt="img" />
            </Link>
          </li>
          <li
            className={`toolSelection ${
              activeTool.zoomIn == true && activeTool.pan == false
                ? 'active'
                : ''
            }`}
            onClick={() => {
              if (activeTool.pan == false) {
                setActiveTool({
                  pan: false,
                  zoomOut: false,
                  zoomIn: true,
                });
              }
              shapeFun.scalezoom(1);
            }}
          >
            <Link to="">
              <img src={zoom_plus_icon} alt="img" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCollection;
