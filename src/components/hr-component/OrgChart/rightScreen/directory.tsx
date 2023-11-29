import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalContext } from '../../personalController';
import { Link } from 'react-router-dom';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirstName } from '../../../../assets/globals';
import { setNodeSelect } from '../../../../reduxStore/hrSlice';
import { findLabelText } from '../../../commonMethod';

const Directory = ({ selectedTab, redirectUserPersonal }) => {
  const { getAssignedUser, setSelectedNodes } = useContext(PersonalContext);
  const { assignedUser, searchValue } = useSelector((state: any) => state?.hr);
  const [userList, setUserList] = useState(assignedUser || {});
  const dispatch = useDispatch();

  useEffect(() => {
    getAssignedUser();
  }, []);

  useEffect(() => {
    getFilterData();
  }, [searchValue]);

  const getFilterData = () => {
    if (selectedTab === 'directory') {
      const list = { ...assignedUser };
      if (searchValue === '') {
        setUserList(assignedUser);
        return;
      }
      const finalValue = {};
      Object.keys(list)?.forEach((value: any) => {
        if (value) {
          const filteredValues1 = list[value]?.filter(
            item =>
              item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
          );
          finalValue[value] = filteredValues1;
        }
      });
      setUserList(finalValue);
    }
  };

  const handleFind = (dt: any) => {
    setSelectedNodes(dt);
    dispatch(setNodeSelect(true));
  };

  return (
    <div
      className="tab-pane fade show active"
      id="directory_tab"
      role="tabpanel"
      aria-labelledby="directory-tab"
      key="directory-info-tab"
    >
      <div className="chart-card-body" key="chart-body">
        <div className="chart-user-info" key="user-info">
          {userList &&
            Object.keys(userList)?.map((value: any, index) => {
              return (
                <React.Fragment key={index}>
                  {value && userList[value]?.length > 0 && (
                    <>
                      <div
                        className="chart-user-text"
                        id={`alphabetic-${index}`}
                        key={`alphabetic-${index}`}
                      >
                        <h4 key={`h4-${index}`}>{value}</h4>
                      </div>
                      <div
                        className="chart-user-detils"
                        id={`user-details-${index}`}
                        key={`user-details-${index}`}
                      >
                        {userList[value]?.map((_dt: any, index) => {
                          return (
                            <div
                              className="direct-profile"
                              id={`profile-${index}`}
                              key={`profile-${index}`}
                            >
                              <div
                                className="direct-img"
                                id={`img-${index}`}
                                key={`img-${index}`}
                              >
                                <Link
                                  to={'#'}
                                  key={`profile-${index}`}
                                  onClick={() => redirectUserPersonal(_dt)}
                                >
                                  {_dt?.profile_photo ? (
                                    <GetImgaeFromS3Bucket
                                      imageFile={_dt?.profile_image}
                                      type={'image'}
                                      name={findFirstName(_dt?.name)}
                                      style="small"
                                      userDetail={_dt}
                                    />
                                  ) : (
                                    <p
                                      className="user-firstletter user-firstletter-small"
                                      key={`profile-name-${index}`}
                                    >
                                      {findFirstName(_dt?.name)}
                                    </p>
                                  )}
                                </Link>
                              </div>
                              <div
                                className="direct-content"
                                id={`content-${index}`}
                                key={`content-${index}`}
                              >
                                <h4>
                                  <Link
                                    to={'#'}
                                    key={`name-${index}`}
                                    onClick={() => redirectUserPersonal(_dt)}
                                  >
                                    {_dt?.name}
                                  </Link>
                                </h4>
                                <h6 key={`title-${index}`}>{_dt?.title}</h6>
                                <p key={`country-${index}`}>{_dt?.country}</p>
                              </div>
                              <div
                                className="direct-find direct-find-info"
                                id={`find-${index}`}
                                key={`find-${index}`}
                              >
                                <Link
                                  to={'#'}
                                  key={`find-${index}`}
                                  onClick={() => handleFind(_dt)}
                                >
                                  {findLabelText('Find', 'Find', 'Hr')}
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
              </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Directory;
