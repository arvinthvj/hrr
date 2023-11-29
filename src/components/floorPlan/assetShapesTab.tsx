import React, { useState } from 'react';
import { Col, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setFloorType } from '../../reduxStore/appSlice';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { findLabelText } from '../commonMethod';
const { Option } = Select;

interface AssetShapesTabProps {
  floorTypeData: object | any;
  shapes: object | any;
  refData: CallableFunction | any;
  selectedTab: string;
}

const AssetShapesTab: React.FC<AssetShapesTabProps> = ({
  floorTypeData,
  shapes,
  refData,
  selectedTab,
}) => {
  const [floorChange, setFloorChange] = useState(1);
  const { floorType } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const handleFloorType = value => {
    setFloorChange(value);
    dispatch(setFloorType(value));
  };
  const floorOptions = floorTypeData?.map(item => (
    <Option key={item?.id}>
      <GetImgaeFromS3Bucket
        imageFile={item?.icon}
        type={'image'}
        FilePath="gat"
      />
      {findLabelText(item?.name, item?.name, 'Dashboard')}
    </Option>
  ));

  return (
    <div
      className={`tab-pane fade show ${
        selectedTab == 'workspacestab' ? 'active' : ''
      }`}
      id="workspacestab"
      role="tabpanel"
      aria-labelledby="workspaces-tab"
    >
      <div className="floor-workspaces">
        {/* new-design */}
        <div className="floor-tab-header floor-tab-header-info">
          <Row>
            <Col span={24}>
              <div className="floor-dropdown">
                <Select
                  placeholder="Select"
                  optionFilterProp="children"
                  className="dropdown-toggle"
                  showArrow={false}
                  bordered={false}
                  onChange={e => handleFloorType(e)}
                  value={floorOptions[floorType - 1] || ''}
                >
                  {floorOptions}
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div className="floor-mangement-scroll">
          {shapes?.deskSplit?.length > 0 &&
            shapes?.deskSplit?.map((i, index) => {
              return (
                <div
                  className="floor-desk-imgs"
                  key={index}
                  style={{ display: floorChange == 1 ? 'block' : 'none' }}
                >
                  <ul className="nav">
                    {i?.length > 0 &&
                      i?.map(s => {
                        return (
                          <li key={s?.id}>
                            <div className="floor-desk-grid">
                              <p>{refData(s?.name)?.name}</p>
                              <div
                                className="floor-desk-box"
                                ref={refData(s?.name)?.ref}
                              >
                                <GetImgaeFromS3Bucket
                                  imageFile={s?.path}
                                  type={'image'}
                                  FilePath="gat"
                                  id={refData(s?.name)?.id}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
          {shapes?.roomSplit?.length > 0 &&
            shapes?.roomSplit?.map((i, index) => {
              return (
                <div
                  className="floor-desk-imgs"
                  key={index}
                  style={{ display: floorChange == 2 ? 'block' : 'none' }}
                >
                  <ul className="nav">
                    {i?.length > 0 &&
                      i?.map(s => {
                        return (
                          <li key={s?.id}>
                            <div className="floor-desk-grid">
                              <p>{refData(s?.name)?.name}</p>
                              <div
                                className="floor-desk-box"
                                ref={refData(s?.name)?.ref}
                              >
                                <GetImgaeFromS3Bucket
                                  imageFile={s?.path}
                                  type={'image'}
                                  FilePath="gat"
                                  id={refData(s?.name)?.id}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
          {shapes?.parkingSplit?.length > 0 &&
            shapes?.parkingSplit?.map((i, index) => {
              return (
                <div
                  className="floor-desk-imgs"
                  key={index}
                  style={{ display: floorChange == 3 ? 'block' : 'none' }}
                >
                  <ul className="nav">
                    {i?.length > 0 &&
                      i?.map(s => {
                        return (
                          <li key={s?.id}>
                            <div className="floor-desk-grid">
                              <p>{refData(s?.name)?.name}</p>
                              <div
                                className="floor-desk-box"
                                ref={refData(s?.name)?.ref}
                              >
                                <GetImgaeFromS3Bucket
                                  imageFile={s?.path}
                                  type={'image'}
                                  FilePath="gat"
                                  id={refData(s?.name)?.id}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AssetShapesTab;
