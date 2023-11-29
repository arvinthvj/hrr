import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { flooricon } from '../imagepath';
import { findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { useSelector } from 'react-redux';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { FloorDetailsProps } from '../../assets/globals/typeConstants';
import { Card, Col, Layout } from 'antd';
import { findLabelText } from '../commonMethod';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
const FloorProfileImgList: React.FC<FloorDetailsProps> = ({
  profilelist,
  type,
  handledetailPage,
  locatelabel,
  index,
}) => {
  // addViewMore
  const [summaryLength, setSummaryLength] = useState(6);
  return (
    <Fragment key={index}>
      {profilelist !== undefined && (
        <li>
          <Layout className="floor p-0">
            <p>{type}</p>
            <Link
              to="/user-view-locate"
              state={{
                floorId: profilelist?.[0]?.floor_id,
                locatelabel: locatelabel,
              }}
            >
              <img src={flooricon} alt="img" />
            </Link>
          </Layout>
          <div className="team-groups floor-groups floor-groups-scroll">
            <div className="avatar-group">
              {profilelist.length > 0 ? (
                profilelist?.slice(0, summaryLength)?.map((img, index) => {
                  return (
                    <div
                      style={{ cursor: 'pointer' }}
                      className="avatar"
                      key={index}
                      onClick={() => handledetailPage(img)}
                    >
                      {img?.profile_photo == undefined ||
                      img?.profile_photo == '' ||
                      img?.profile_photo == ' ' ? (
                        <p className="avatar-text border">
                          <span>{findFirstName(img?.display_name)}</span>
                        </p>
                      ) : (
                        <>
                          <GetImgaeFromS3Bucket
                            imageFile={img?.profile_photo}
                            type={'image'}
                            userDetail={img}
                            name={findFirstName(img?.display_name)}
                            style={'profile'}
                          />
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div>
                  {findLabelText(
                    TeamManagerLabelText.No_records,
                    TeamManagerLabelText.NoRecords,
                    TeamManagerLabelText.Common_Values,
                  )}
                </div>
              )}
              {profilelist.length > summaryLength && (
                <div
                  className="avatar"
                  onClick={() => setSummaryLength(profilelist.length)}
                >
                  <span className="avatar-title rounded-circle border border-white">
                    + {profilelist.length - summaryLength}
                  </span>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
    </Fragment>
  );
};

export default FloorProfileImgList;
