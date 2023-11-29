import React, { useContext } from 'react';
import { UpdateAssetContext } from '../context/context';
import { AddAssetLabels, Descriptions } from './constant';
import { Col } from 'antd';

const RoomCapacityField = () => {
  const { capacity, setCapacity } = useContext(UpdateAssetContext);
  const handler = evt => {
    const keycode = evt.charCode || evt.keyCode;
    if (keycode == 46) {
      evt.preventDefault();
      return false;
    }
  };
  return (
    <Col lg={24}>
      <div className="room-capacity-info">
        <div className="room-capacity-details">
          <h6>{Descriptions.roomCapacity}</h6>
          <p>{Descriptions.roomCapacityDesc} </p>
        </div>
        <div className="room-capacity-input">
          <button className="top-arrow">
            <i
              style={{
                opacity: capacity == 100 ? '0.3' : '',
              }}
              onClick={() => {
                if (capacity < 100) {
                  setCapacity(preve => parseInt(preve) + 1);
                }
              }}
              className="fa fa-angle-up"
              aria-hidden="true"
            ></i>
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="1"
            value={capacity}
            min="1"
            max="100"
            onKeyPress={e => handler(e)}
            onChange={(e: any) => {
              if (e.target.value > 0 && e.target.value < 101) {
                setCapacity(e.target.value);
              } else {
              }
            }}
          />
          <button className="down-arrow">
            <i
              style={{
                opacity: capacity == 1 ? '0.3' : '',
              }}
              onClick={() => {
                if (capacity > 1) {
                  setCapacity(preve => parseInt(preve) - 1);
                }
              }}
              className="fa fa-angle-down"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default RoomCapacityField;
