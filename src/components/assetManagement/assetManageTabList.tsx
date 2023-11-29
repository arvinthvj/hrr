import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, filter_icon } from '../imagepath';
import { findLabelText } from '../commonMethod';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTap } from '../../reduxStore/assetManagementSlice';
import { AssetManagementContext } from '../context/context';
import { Col, Row } from 'antd';
import { AddAssetLabels } from './constant';

const AssetManageTabList = () => {
  const { cancelBulkasset, filterList, statusActive, statusInActive } =
    useContext(AssetManagementContext);
  const selector = useSelector((state: any) => state?.assetManagement);
  const dispatch = useDispatch();
  // Redux Dipacth
  const handeleSelectTap = type => {
    dispatch(setCurrentTap(type));
    cancelBulkasset();
  };
  const searchListData = value => {
    filterList(statusActive ? 1 : 0, statusInActive ? 0 : 1, value, 'search');
  };

  return (
    <Row>
      <Col span={12}>
        <div className="book-left-info">
          <div className="book-tabs m-0 book-sets-tab">
            <ul>
              {selector?.taplist?.length > 0
                ? selector?.taplist?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to="#"
                          className={`${'workspacesmain '}${
                            item.id == selector?.currenttap ? 'active' : null
                          }`}
                          onClick={() => handeleSelectTap(item?.id)}
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
          </div>
        </div>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={6} style={{ opacity: '0.2' }}>
            <div className="filter-detail float-end">
              <Link to="#" className="filter-tag">
                {findLabelText('Filter', 'Filter', 'Team_Management')}
                <img src={filter_icon} className="ms-2" alt="img" />
              </Link>
            </div>
          </Col>
          <Col span={2} />
          <Col span={16}>
            <div className="filter-search filter-input">
              <input
                type="text"
                placeholder={findLabelText(
                  'Find_in location',
                  selector?.currenttap == 1
                    ? AddAssetLabels.findWorkspace
                    : selector?.currenttap == 2
                    ? AddAssetLabels.findRoom
                    : AddAssetLabels.findParking,
                  'Location',
                )}
                className="input-filter"
                onChange={e => searchListData(e.target.value)}
              />
              <div className="img-group">
                <Link to="#">
                  <img src={Search} alt="img" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AssetManageTabList;
