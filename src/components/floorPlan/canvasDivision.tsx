import React from 'react';
import {
  cshapewall,
  doorway,
  floor_img,
  lift,
  lshapewall,
  new_desk1,
  new_desk7,
  new_lshapedesk_select,
  new_parking1,
  new_parking_select,
  new_parking_white,
  new_room1,
  new_room1_select,
  new_room1_white,
  new_room2,
  new_room2_select,
  new_room2_white,
  new_room3,
  new_room3_select,
  new_room3_white,
  new_room4,
  new_room4_select,
  new_room4_white,
  new_room5,
  new_room5_select,
  new_room5_white,
  new_room6,
  new_room6_select,
  new_room6_white,
  new_singledesk_select,
  parkingDesk,
  parkingDeskSelected,
  regular_l,
  regular_l_select,
  room_select_img,
  shape2,
  shape2_select,
  shape3,
  shape3_select,
  shape4,
  shape4_select,
  shape5,
  shape5_select,
  shape5_withoutText,
  singledesk,
  singledesk_cursor,
  singledesk_select,
  square_cursor,
  square_room,
  stairs,
  onewayroadL,
  onewayroadR,
  twowayroad,
  twowayroad90,
  text_cursor,
  window,
} from '../imagepath';
import Loader from '../loader';
import { findLabelText } from '../commonMethod';

const CanvasDivision = ({
  loading,
  canvasDiv,
  canvasImg,
  lshapewallImg,
  cshapewallImg,
  singledeskImg,
  singledeskSelect,
  singledeskWithoutText,
  shape2Img,
  shape2Select,
  shape3Img,
  shape3Select,
  shape4Img,
  shape4Select,
  shape5Img,
  shape5Select,
  shape5WithoutText,
  squareRoom,
  singleDeskDragImg,
  textDragImg,
  squareDragImg,
  parkingImg,
  parkingImgSelect,
  parkingImgWhite,
  regularL,
  regularLSelect,
  roomImg,
  roomImgSelect,
  roomSImgwhite,
  roomXXS,
  roomXXSSelect,
  roomXXSWhite,
  roomXS,
  roomXSSelect,
  roomXSWhite,
  roomM,
  roomMSelect,
  roomMWhite,
  roomL,
  roomLSelect,
  roomLWhite,
  roomXL,
  roomXLSelect,
  roomXLWhite,
  doorwayImg,
  windowImg,
  liftImg,
  stairsImg,
  oneWayRImg,
  oneWayLImg,
  twoWayImg,
  twoWay90Img,
  canvasTextDiv,
  canvasText,
  canvasRef,
}) => {
  return (
    <div
      className="floor-img canvas_div"
      id="canvas_div"
      style={{
        backgroundColor: '#eeeeee',
        overflow: 'hidden',
        height: '518px',
      }}
      ref={canvasDiv}
    >
      <img
        src={floor_img}
        className="img-fluid"
        id="canvas_img"
        ref={canvasImg}
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={lshapewall}
        ref={lshapewallImg}
        id="lshapewall_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={cshapewall}
        ref={cshapewallImg}
        id="cshapewall_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={singledesk}
        ref={singledeskImg}
        id="singledesk_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={new_singledesk_select}
        ref={singledeskSelect}
        id="singledesk_select_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={new_desk1}
        ref={singledeskWithoutText}
        id="singledesk_withoutText_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape2}
        ref={shape2Img}
        id="shape2_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape2_select}
        ref={shape2Select}
        id="shape2_select_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape3}
        ref={shape3Img}
        id="shape3_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape3_select}
        ref={shape3Select}
        id="shape3_select_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape4}
        ref={shape4Img}
        id="shape4_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape4_select}
        ref={shape4Select}
        id="shape4_select_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape5}
        ref={shape5Img}
        id="shape5_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={new_lshapedesk_select}
        ref={shape5Select}
        id="shape5_select_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={shape5_withoutText}
        ref={shape5WithoutText}
        id="shape5_withoutText_img"
        alt="img"
        style={{ display: 'none' }}
      />

      <img
        src={square_room}
        ref={squareRoom}
        id="square_room_img"
        alt="img"
        style={{ display: 'none' }}
      />

      <img
        src={singledesk_cursor}
        ref={singleDeskDragImg}
        id="singledeskdrag_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={text_cursor}
        ref={textDragImg}
        id="textdrag_img"
        alt="img"
        style={{ display: 'none' }}
      />
      <img
        src={square_cursor}
        id="squaredrag_img"
        alt="img"
        style={{ display: 'none' }}
        ref={squareDragImg}
      />

      <img
        src={new_parking1}
        id="parking_img"
        alt="img"
        style={{ display: 'none' }}
        ref={parkingImg}
      />
      <img
        src={new_parking_select}
        id="parking_img_select"
        alt="img"
        style={{ display: 'none' }}
        ref={parkingImgSelect}
      />
      <img
        src={new_parking_white}
        id="parking_img_white"
        alt="img"
        style={{ display: 'none' }}
        ref={parkingImgWhite}
      />
      <img
        src={regular_l}
        id="regular_l"
        alt="img"
        style={{ display: 'none' }}
        ref={regularL}
      />
      <img
        src={regular_l_select}
        id="regular_l_select"
        alt="img"
        style={{ display: 'none' }}
        ref={regularLSelect}
      />
      <img
        src={new_room3}
        id="room_img"
        alt="img"
        style={{ display: 'none' }}
        ref={roomImg}
      />
      <img
        src={new_room3_select}
        id="room_select_img"
        alt="img"
        style={{ display: 'none' }}
        ref={roomImgSelect}
      />
      <img
        src={new_room3_white}
        id="room3_white_img"
        alt="img"
        style={{ display: 'none' }}
        ref={roomSImgwhite}
      />
      <img
        src={new_room1}
        id="room_xxs"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXXS}
      />
      <img
        src={new_room1_select}
        id="room_xxs_select"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXXSSelect}
      />
      <img
        src={new_room1_white}
        id="room_xxs_white"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXXSWhite}
      />
      <img
        src={new_room2}
        id="room_xs"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXS}
      />
      <img
        src={new_room2_select}
        id="room_xs_select"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXSSelect}
      />
      <img
        src={new_room2_white}
        id="room_xs_white"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXSWhite}
      />
      <img
        src={new_room4}
        id="room_m"
        alt="img"
        style={{ display: 'none' }}
        ref={roomM}
      />
      <img
        src={new_room4_select}
        id="room_m_select"
        alt="img"
        style={{ display: 'none' }}
        ref={roomMSelect}
      />
      <img
        src={new_room4_white}
        id="room_m_white"
        alt="img"
        style={{ display: 'none' }}
        ref={roomMWhite}
      />
      <img
        src={new_room5}
        id="room_l"
        alt="img"
        style={{ display: 'none' }}
        ref={roomL}
      />
      <img
        src={new_room5_select}
        id="room_l_select"
        alt="img"
        style={{ display: 'none' }}
        ref={roomLSelect}
      />
      <img
        src={new_room5_white}
        id="room_l_white"
        alt="img"
        style={{ display: 'none' }}
        ref={roomLWhite}
      />
      <img
        src={new_room6}
        id="room_xl"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXL}
      />
      <img
        src={new_room6_select}
        id="room_xl_select"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXLSelect}
      />
      <img
        src={new_room6_white}
        id="room_xl_white"
        alt="img"
        style={{ display: 'none' }}
        ref={roomXLWhite}
      />

      <img
        src={doorway}
        id="doorway"
        alt="img"
        style={{ display: 'none' }}
        ref={doorwayImg}
      />
      <img
        src={window}
        id="window"
        alt="img"
        style={{ display: 'none' }}
        ref={windowImg}
      />
      <img
        src={lift}
        id="lift"
        alt="img"
        style={{ display: 'none' }}
        ref={liftImg}
      />
      <img
        src={stairs}
        id="stairs"
        alt="img"
        style={{ display: 'none' }}
        ref={stairsImg}
      />
      <img
        src={onewayroadR}
        id="onewayroadR"
        alt="img"
        style={{ display: 'none' }}
        ref={oneWayRImg}
      />
      <img
        src={onewayroadL}
        id="onewayroadL"
        alt="img"
        style={{ display: 'none' }}
        ref={oneWayLImg}
      />
      <img
        src={twowayroad}
        id="twowayroad"
        alt="img"
        style={{ display: 'none' }}
        ref={twoWayImg}
      />
      <img
        src={twowayroad90}
        id="twowayroad90"
        alt="img"
        style={{ display: 'none' }}
        ref={twoWay90Img}
      />

      <div
        id="canvas_text_div"
        ref={canvasTextDiv}
        style={{
          display: 'none',
          position: 'relative',
          height: '0px',
          width: '40px',
        }}
        className="canvas_text_div"
      >
        <textarea
          ref={canvasText}
          name="canvas_text"
          id="canvas_text"
          style={{
            background: 'transparent',
            borderWidth: '1px',
            border: 'none',
            color: 'black',
            caretColor: 'transparent',
          }}
          placeholder="Text"
        />
        <button id="canvas_text_done" style={{ display: 'none' }}>
          {findLabelText('Done', 'Done', 'Floorplan_Management')}
        </button>
      </div>
      {loading && <Loader />}
      <canvas id="canvas" width="600" ref={canvasRef} />
    </div>
  );
};

export default CanvasDivision;
