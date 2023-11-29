import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { assetsList } from '../../../assets/constants/config';
import { setTapList } from '../../../reduxStore/assetManagementSlice';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import ParkingConfiguration from './parking';
import RoomConfiguration from './room';
import WorkSpaceConfiguration from './workspace';
import { Col } from 'antd';

export const AssetsConfiguration = ({ rightSideBar }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state?.assetManagement);
  const [id, setId] = useState(1);
  const getTapList = () => {
    assetsList?.length > 0 && dispatch(setTapList(assetsList));
  };

  useEffect(() => {
    getTapList();
  }, []);
  const selectionId = item => {
    setId(item?.id);
  };

  return (
    <Col
      span={6}
      className={`  left-right-space main-space-remove-left d-flex `}
    >
      <div className="card location-right-hight w-100 p-0">
        <ul className="nav assets-configuration-imageview">
          {selector?.taplist?.length > 0
            ? selector?.taplist?.map((item, index) => {
                return (
                  <li key={index} className={'location-assets-image-style'}>
                    <Link
                      to="#"
                      className={`${'workspacesmain '}${
                        item.id == id ? 'active' : null
                      }`}
                      onClick={() => selectionId(item)}
                    >
                      <GetImgaeFromS3Bucket
                        imageFile={item?.icon_images}
                        type={'image'}
                        FilePath="gat"
                      />
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
        {id == 1 && <WorkSpaceConfiguration />}
        {id == 2 && <RoomConfiguration />}
        {id == 3 && <ParkingConfiguration />}
      </div>
    </Col>
  );
};
