import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PersonalContext } from '../../personalController';
import { Link } from 'react-router-dom';
import { orgEdit } from '../../../imagepath';
import { useDispatch } from 'react-redux';
import {
  setHrJObs,
  setSearchValueOrgChart,
  setUserAssigneeData,
} from '../../../../reduxStore/hrSlice';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import { orgChartView } from '../../../../services/apiurl';
import { postData } from '../../../../services/apicall';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirstName } from '../../../../assets/globals';

const UnAssignedUser = ({
  selectedTab,
  setSelectedTab,
  redirectUserPersonal,
}) => {
  const dispatch = useDispatch();
  const { getUnAssignedUser, setSelectedNodes } = useContext(PersonalContext);
  const { unAssignedUsers, searchValue } = useSelector(
    (state: any) => state?.hr,
  );
  const [userList, setUserList] = useState(unAssignedUsers || {});

  useEffect(() => {
    getUnAssignedUser();
  }, []);

  useEffect(() => {
    getFilterData();
  }, [searchValue]);

  const getFilterData = () => {
    if (selectedTab === 'unassign') {
      const list = { ...unAssignedUsers };
      if (searchValue === '') {
        setUserList(unAssignedUsers);
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

  const findClicked = (data: any) => {
    setSelectedNodes(data);
    getOrgChartViewData(data?.id);
  };

  const getOrgChartViewData = (id: number) => {
    const payload = {
      user_id: id,
    };
    dispatch(showLoader());
    postData(orgChartView, payload, (data, res) => {
      dispatch(hideLoader());
      dispatch(setHrJObs(true));
      if (res?.data?.code == 200) {
        dispatch(setUserAssigneeData(data));
        dispatch(setSearchValueOrgChart(''));
        setSelectedTab('directory');
      }
    });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="directory_tab"
      role="tabpanel"
      aria-labelledby="directory-tab"
    >
      <div className="chart-card-body">
        <div className="chart-user-info">
          {userList &&
            Object.keys(userList)?.map((value: any, index) => {
              return (
                <>
                  {value && userList[value]?.length > 0 && (
                    <>
                      <div
                        className="chart-user-text"
                        id={`alphabetic-${index}`}
                        key={`alphabetic-${index}`}
                      >
                        <h4>{value}</h4>
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
                                    <p className="user-firstletter user-firstletter-small">
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
                                  <Link to={'#'}>{_dt?.name}</Link>
                                </h4>
                                <h6>{_dt?.title}</h6>
                                <p>{_dt?.country}</p>
                              </div>
                              <div
                                className="direct-find"
                                id={`find-${index}`}
                                key={`find-${index}`}
                              >
                                <Link to={'#'} onClick={() => findClicked(_dt)}>
                                  <img src={orgEdit} alt="" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UnAssignedUser;
