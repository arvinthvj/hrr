import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findFirstName } from '../../assets/globals';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { FloorProfileImgItemProps } from '../../assets/globals/typeConstants';
import { icon_01 } from '../imagepath';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
import { findLabelText } from '../commonMethod';
const CommonWork = ({
  type,
  name,
  module,
  data,
  setViewData,
  setPageChange,
  pageChange,
  setSelectValue,
  setSearchUser,
}) => {
  const handledetailPage = (value: FloorProfileImgItemProps, type = '') => {
    if (type !== '') {
      setViewData({ type: 'viemManager', values: value });
      setSearchUser('');
    } else {
      setViewData({ type: 'user', values: value });
    }
    setSelectValue({});
    setPageChange(!pageChange);
  };
  return (
    <div className="work-team-group">
      <div className="team-work-head">
        <div className="office-address-list">
          <h3>{findLabelText(type, name, module)}</h3>
        </div>
      </div>
      {data?.length > 0 ? (
        <div className="table-responsive out-table-responsive">
          <table className="table table-striped work-space mb-0">
            <thead>
              <tr>
                <th>
                  {findLabelText(
                    TeamManagerLabelText.Name,
                    TeamManagerLabelText.Name,
                    TeamManagerLabelText.Team,
                  )}
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="table-avatar user-profile">
                          <div className="work-name-img work-name-img-big">
                            <div className="profile">
                              <span />
                            </div>
                            <Link
                              to="#"
                              onClick={() => handledetailPage(record)}
                            >
                              {record?.profile_photo == undefined ||
                              record?.profile_photo == '' ||
                              record?.profile_photo == ' ' ? (
                                <p>
                                  <span>
                                    {findFirstName(record?.display_name)}
                                  </span>
                                </p>
                              ) : (
                                <GetImgaeFromS3Bucket
                                  imageFile={record?.profile_photo}
                                  type={'image'}
                                  userDetail={record}
                                  name={findFirstName(record?.display_name)}
                                />
                              )}
                            </Link>
                          </div>
                          <div>
                            <h5>
                              <Link
                                to="#"
                                onClick={() => handledetailPage(record)}
                              >
                                {record?.full_name}
                              </Link>
                            </h5>
                          </div>
                          <div className="names-icons">
                            {record?.health_safety.length > 0
                              ? record?.health_safety.map((icon, index) => {
                                  return (
                                    <Link to="#" key={index}>
                                      <GetImgaeFromS3Bucket
                                        imageFile={icon.health_safety_icons}
                                        type={'image'}
                                        FilePath={'ghs'}
                                      />
                                    </Link>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      </td>
                      <td className="text-end view-table-profile">
                        <Link to="#" onClick={() => handledetailPage(record)}>
                          <img src={icon_01} alt="icon" className="me-1" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-records">
          {findLabelText(
            TeamManagerLabelText.No_records,
            TeamManagerLabelText.NoRecords,
            TeamManagerLabelText.Common_Values,
          )}
        </div>
      )}
    </div>
  );
};
export default CommonWork;
