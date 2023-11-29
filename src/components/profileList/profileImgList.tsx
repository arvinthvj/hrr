import React, { useState } from 'react';
import { findFirstName } from '../../assets/globals';
import { useSelector } from 'react-redux';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { findLabelText } from '../commonMethod';
import { LabelText } from '../dashboardComponent/constants';
import { Col, Layout } from 'antd';
type YourTeamDetailsProps = {
  profilelist: any[] | undefined;
  type: any;
  handledetailPage: any;
};
const ProfileImgList: React.FC<YourTeamDetailsProps> = ({
  profilelist,
  type,
  handledetailPage,
}) => {
  const { languages } = useSelector((state: RootReduxProps) => state.language);
  const [summaryLength, setSummaryLength] = useState(6);
  return (
    <>
      {profilelist !== undefined && (
        <Col className="team-members working-remotely">
          <div className="floor mb-0">
            <h5>{type}</h5>
          </div>
          <div className="team-box">
            <ul>
              <li>
                <div className="team-groups floor-groups floor-groups-scroll">
                  <div className="avatar-group">
                    <>
                      {profilelist?.length > 0
                        ? profilelist
                            ?.slice(0, summaryLength)
                            ?.map((imgurl, index) => {
                              return (
                                <div
                                  className="avatar"
                                  key={index}
                                  onClick={() => handledetailPage(imgurl)}
                                >
                                  {imgurl?.profile_photo == undefined ||
                                  imgurl?.profile_photo == '' ||
                                  imgurl?.profile_photo == ' ' ? (
                                    <p className="avatar-text border">
                                      <span>
                                        {findFirstName(imgurl?.display_name)}
                                      </span>
                                    </p>
                                  ) : (
                                    <>
                                      <GetImgaeFromS3Bucket
                                        imageFile={imgurl?.profile_photo}
                                        type={'image'}
                                        userDetail={imgurl}
                                        name={findFirstName(
                                          imgurl?.display_name,
                                        )}
                                        style={'profile'}
                                      />
                                    </>
                                  )}
                                </div>
                              );
                            })
                        : null}
                    </>
                    {profilelist?.length > summaryLength && (
                      <div
                        className="avatar"
                        onClick={() => setSummaryLength(profilelist?.length)}
                      >
                        <span className="avatar-title rounded-circle border border-white">
                          + {profilelist?.length - summaryLength}
                        </span>
                      </div>
                    )}
                  </div>
                  {profilelist?.length <= 0 ? (
                    <Layout className="working-no-records woking-records">
                      {findLabelText(
                        LabelText.No_records,
                        LabelText.NoRecords,
                        LabelText.Common_Values,
                      )}
                    </Layout>
                  ) : null}
                </div>
              </li>
            </ul>
          </div>
        </Col>
      )}
    </>
  );
};
export default ProfileImgList;
