import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetImgaeFromS3Bucket } from '../services/s3Bucket';
import { findFirstName } from '../assets/globals';
import { getSingleUserDetails, userSearchByName } from '../services/apiurl';
import { postData } from '../services/apicall';
import { validateLoginUser } from './commonMethod';
import Loader from './loader';
import { Search } from './imagepath';

interface OnBeHalfOfProps {
  selectedUser: CallableFunction;
  initialStateValue?: any;
  deleteOnBehalf?: any;
  setDeleteOnBehalf?: CallableFunction;
  initials?: string;
}

export const OnBeHalf: React.FC<OnBeHalfOfProps> = ({
  selectedUser,
  initialStateValue,
  deleteOnBehalf,
  setDeleteOnBehalf,
  initials = '',
}) => {
  const dispatch = useDispatch();

  const { beHalfOfDetails } = useSelector((state: any) => state.quickBook);

  const { userDetails } = useSelector((state: any) => state.app);
  const [searchText, updateSearchText] = useState('');
  const [userSearchLoaderFlag, updateSearchLoaderFlag] = useState(false);
  const [searchList, updateSearchList] = useState([]);
  const [selectedUserDetails, updatedSelectedUser] = useState<any>(null);
  const [allUsersList, setAllUsersList] = useState([]);
  const beHalfOfDetailsCopy = { ...beHalfOfDetails };

  const preparInitialData = () => {
    if (Object.keys(beHalfOfDetailsCopy).length > 0) {
      const preparData = {
        id: beHalfOfDetailsCopy?.userDetails?.id,
        first_name: '',
        last_name: '',
        name: beHalfOfDetailsCopy?.userDetails?.name,
        profile_photo: beHalfOfDetailsCopy?.userDetails?.profile_photo,
        team_name: beHalfOfDetailsCopy?.team_name,
        start_time: beHalfOfDetailsCopy?.start_time,
        end_time: beHalfOfDetailsCopy?.end_time,
      };
      updatedSelectedUser(preparData);
      getUserFullDetails(preparData.id, preparData.profile_photo, preparData);
      const removeData = {
        data: {},
        quickBookType: 'active',
      };
      // dispatch(setQuickBeHalfOfDetails(removeData));
    } else if (
      initialStateValue &&
      Object.keys(initialStateValue)?.length > 0
    ) {
      const preparData = {
        id: initialStateValue.id,
        first_name: initialStateValue.first_name,
        last_name: initialStateValue.last_name,
        name: initialStateValue.first_name + ' ' + initialStateValue.last_name,
        profile_photo: initialStateValue.profile_photo,
        team_name: initialStateValue?.team_name,
        full_date: initialStateValue?.full_date
          ? initialStateValue?.full_date
          : '',
      };
      updatedSelectedUser(preparData);
    } else {
      updatedSelectedUser({});
    }
  };
  useEffect(() => {
    updatedSelectedUser({});
  }, [initials]);
  useEffect(() => {
    preparInitialData();
    getAllUsersList();
  }, []);

  const getAllUsersList = () => {
    const slug = validateLoginUser()?.slug;
    if (slug && userDetails?.id) {
      let newSlug = '';
      if (slug == 'administrator') {
        newSlug = slug;
      } else if (
        validateLoginUser('team_manager')?.slug &&
        validateLoginUser('location_manager')?.slug
      ) {
        newSlug = 'team_manager,location_manager';
      } else {
        newSlug = slug;
      }
      const reqParams = {
        user_id: userDetails?.id,
        user_role: newSlug,
        search_test: searchText,
      };

      updateSearchLoaderFlag(true);
      postData(userSearchByName, reqParams, (data, res) => {
        updateSearchLoaderFlag(false);
        if (res.data.code == '200') {
          setAllUsersList(data);
        } else {
          setAllUsersList([]);
        }
      });
    }
  };

  // userSearchByName
  useEffect(() => {
    searchText && searchByUserName();
  }, [searchText]);

  const searchByUserName = () => {
    if (allUsersList.length > 0) {
      const newList: any = allUsersList?.filter((user: any) => {
        const name = user?.first_name + ' ' + user?.last_name;
        return (
          name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          user.team_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
      if (newList.length > 0) {
        updateSearchList(newList);
      } else {
        updateSearchList([]);
      }
    }
  };

  const getUserFullDetails = (userId, profile_photo, preparData) => {
    const reqParams = {
      user_id: userId,
    };
    postData(getSingleUserDetails, reqParams, (data, res) => {
      if (res.data.code == '200') {
        data = { ...data, profile_photo: profile_photo };
        selectedUser(
          data,
          beHalfOfDetailsCopy?.full_date ? beHalfOfDetailsCopy?.full_date : '',
          preparData,
        );
      } else {
        selectedUser({});
      }
    });
  };

  const searchListView = (obj, index) => {
    const name = obj?.first_name + ' ' + obj?.last_name;
    return (
      <div key={index}>
        <div className="week-book-details">
          <Link
            to="#"
            onClick={() => {
              const preparSelectdData = { ...obj, name: name };
              getUserFullDetails(
                preparSelectdData.id,
                preparSelectdData.profile_photo,
                selectedUserDetails,
              );
              updatedSelectedUser(preparSelectdData);
              updateSearchList([]);
              updateSearchText('');
            }}
          >
            <div className="week-book-inner">
              <div className="week-book-team">
                <div className="week-book-team-img">
                  {obj?.profile_photo ? (
                    <GetImgaeFromS3Bucket
                      imageFile={obj?.profile_photo}
                      type={'image'}
                      // FilePath="gat"
                      name={findFirstName(name)}
                      style="small"
                      userDetail={obj}
                    />
                  ) : (
                    <p className="user-firstletter user-firstletter-small">
                      {findFirstName(name)}
                    </p>
                  )}
                </div>
                <div className="week-book-team-content">
                  <h6>{name}</h6>
                  <p>{obj?.team_name}</p>
                </div>
              </div>
              <div className="week-book-delete"></div>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="week-book-info">
      <div className="week-book-card">
        <div className="week-book-header">
          <h5>Book for</h5>
        </div>
        <div className="week-book-body">
          <div className="week-book-search">
            <input
              type="text"
              className="form-control"
              value={searchText}
              onChange={e => {
                updateSearchText(e?.target?.value);
              }}
            />
            <div className="week-search-img">
              <Link to="#">
                <img src={Search} alt="icon" />
              </Link>
            </div>
          </div>

          {userSearchLoaderFlag ? <Loader /> : null}
          <div className="week-book-scroll">
            {searchText &&
              searchList.map((obj, index) => {
                return searchListView(obj, index);
              })}
          </div>

          {selectedUserDetails?.id ? (
            <div className="week-book-details">
              <div className="week-book-inner">
                <div className="week-book-team">
                  <div className="week-book-team-img">
                    {selectedUserDetails?.profile_photo ? (
                      <GetImgaeFromS3Bucket
                        imageFile={selectedUserDetails?.profile_photo}
                        type={'image'}
                        // FilePath="gat"
                        name={findFirstName(selectedUserDetails?.name)}
                        style="small"
                        userDetail={selectedUserDetails}
                      />
                    ) : (
                      <p className="user-firstletter user-firstletter-small">
                        {findFirstName(selectedUserDetails?.name)}
                      </p>
                    )}
                  </div>
                  <div className="week-book-team-content">
                    <h6>{selectedUserDetails?.name}</h6>
                    <p>{selectedUserDetails?.team_name}</p>
                  </div>
                </div>
                <div className="week-book-delete">
                  <Link
                    to="#"
                    onClick={() => {
                      updatedSelectedUser({});
                      selectedUser({});
                      setDeleteOnBehalf && setDeleteOnBehalf(!deleteOnBehalf);
                    }}
                  >
                    <i className="far fa-trash-can"></i>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="week-book-content">
              <h6>Yourself</h6>
              <p>Search and select a user to book for</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
