import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { goalManagement } from '../personal/scehma';
import { PersonalContext } from '../personalController';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { hrCalendar } from '../../imagepath';
import moment from 'moment';
import DatePickerComponent from '../../datepicker/index';
import { findLabelText, validateLoginUser } from '../../commonMethod';
import Loader from '../../loader';
import { GetImgaeFromS3Bucket } from '../../../services/s3Bucket';
import { findFirstName } from '../../../assets/globals';
import { postData } from '../../../services/apicall';
import {
  getSingleUserDetails,
  userSearchByName,
} from '../../../services/apiurl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';

interface goalProps {
  beHalfOfDetailsCopy: any;
  initialStateValue: any;
}
const Goal: React.FC<goalProps> = ({
  beHalfOfDetailsCopy = {},
  initialStateValue,
}) => {
  const { Error } = useContext(PersonalContext);
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [searchText, updateSearchText] = useState('');
  const [userSearchLoaderFlag, updateSearchLoaderFlag] = useState(false);
  const [searchList, updateSearchList] = useState([]);
  const [selectedUserDetails, updatedSelectedUser] = useState<any>(null);
  const [allUsersList, setAllUsersList] = useState([]);

  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(goalManagement) });
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
      //   const removeData = {
      //     data: {},
      //     quickBookType: 'active',
      //   };
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
  const { userDetails } = useSelector((state: any) => state.app);

  const getUserFullDetails = (userId, profile_photo, preparData) => {
    const reqParams = {
      user_id: userId,
    };
    postData(getSingleUserDetails, reqParams, (data, res) => {
      if (res.data.code == '200') {
        data = { ...data, profile_photo: profile_photo };
        // selectedUser(
        //   data,
        //   beHalfOfDetailsCopy?.full_date ? beHalfOfDetailsCopy?.full_date : '',
        //   preparData,
        // );
      } else {
        // selectedUser({});
      }
    });
  };
  useEffect(() => {
    updatedSelectedUser({});
  }, []);
  useEffect(() => {
    preparInitialData();
    getAllUsersList();
  }, []);
  // userSearchByName
  useEffect(() => {
    searchText && searchByUserName();
  }, [searchText]);
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
  const handleAddGoal = (data: any) => {
    console.log(data, 'adddata');
  };
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
  const searchListView = (obj, index) => {
    const name = obj?.first_name + ' ' + obj?.last_name;
    return (
      <div key={index}>
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
          <div className="goal-assign-profile">
            <div className="goal-assign-img">
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
            <div className="goal-assign-content">
              <h6>{name}</h6>
              <p>{obj?.team_name}</p>
            </div>
            <div className="week-book-delete"></div>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <div
      className="tab-pane fade show active"
      id="add_goal"
      role="tabpanel"
      aria-labelledby="add-goal"
    >
      <div className="goal-inner">
        <Row>
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>{findLabelText('Title', 'Title', 'Hr')}</label>
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group tab-description ">
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <textarea
                        maxLength={50}
                        value={value}
                        placeholder={'\n\n\n\n Max 50 characters'}
                        className="form-control-text-area"
                        onChange={e => {
                          onChange(e);
                          trigger('title');
                        }}
                      />
                    </>
                  )}
                />
                <Error>{errors?.['title']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="goal-inner">
        <Row className="align-items-center">
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>{findLabelText('Category', 'Issue Category', 'Hr')}</label>{' '}
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group">
                <Controller
                  name={'category'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DropDownSelection
                      options={[
                        { label: 'Productivity', value: 'Productivity' },
                        { label: 'Productivity01', value: 'Productivity01' },
                      ]}
                      minWidth="100px"
                      height="35px"
                      Value={value}
                      backgroundColor="#FFF"
                      onChange={(value: any) => {
                        onChange(value);
                        trigger('category');
                      }}
                      placeholder=""
                    />
                  )}
                />
                <Error>{errors?.['category']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="goal-inner">
        <Row className="align-items-center">
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>{findLabelText('Target', 'Target', 'Hr')}</label>
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group goal-icon-calendar">
                <Controller
                  name="targetDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name=""
                      handleChange={date => {
                        setStartDate(date);
                        // setEndDate(null);
                        setValue('To', null);
                      }}
                      placeholder="DD/MM/YYYY"
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['targetDate']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="goal-inner">
        <Row className="align-items-center">
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>
                {findLabelText('Revised Target', 'Revised Target', 'Hr')}
              </label>
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group goal-icon-calendar">
                <Controller
                  name="revisedTargetDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name=""
                      placeholder="DD/MM/YYYY"
                      handleChange={date => {
                        setStartDate(date);
                        // setEndDate(null);
                        setValue('To', null);
                      }}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['revisedTargetDate']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="goal-inner">
        <Row className=" align-items-center">
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>{findLabelText('Achieved', 'Achieved', 'Hr')}</label>
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group goal-icon-calendar">
                <Controller
                  name="achievedDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePickerComponent
                      suffixIcon={<img src={hrCalendar} alt="" />}
                      name=""
                      placeholder="DD/MM/YYYY"
                      handleChange={date => {
                        setStartDate(date);
                        // setEndDate(null);
                        setValue('To', null);
                      }}
                      onChange={onChange}
                      trigger={trigger}
                      value={value}
                    />
                  )}
                />
                <Error>{errors?.['achievedDate']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <div className="goal-inner goal-inner-border">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-12">
            <div className="goal-label">
              <label>Status</label>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="goal-input">
              <select className="select">
                <option>On track</option>
                <option>Upcoming</option>
                <option>Complete</option>
              </select>
            </div>
          </div>
        </div>
      </div> */}
      <div className="goal-inner">
        <Row className=" align-items-center">
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>{findLabelText('Status', 'Status', 'Hr')}</label>{' '}
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group">
                <Controller
                  name={'status'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DropDownSelection
                      options={[
                        { label: 'On track', value: 'On track' },
                        { label: 'Upcoming', value: 'Upcoming' },
                        { label: 'Complete', value: 'Complete' },
                      ]}
                      minWidth="100px"
                      height="35px"
                      Value={value}
                      backgroundColor="#FFF"
                      onChange={(value: any) => {
                        onChange(value);
                        trigger('status');
                      }}
                      placeholder=""
                    />
                  )}
                />
                <Error>{errors?.['status']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="goal-inner">
        <div className="goal-assign-info">
          <label>Assigned to</label>
          <div className="goal-assign-grid">
            <div className="goal-input">
              <input
                type="text"
                className="form-control"
                value={searchText}
                onChange={e => {
                  updateSearchText(e?.target?.value);
                }}
              />
              {/* <input type="text" className="form-control" /> */}
            </div>
            {userSearchLoaderFlag ? <Loader /> : null}
            <div className="week-book-scroll">
              {searchText &&
                searchList.map((obj, index) => {
                  return searchListView(obj, index);
                })}
              {selectedUserDetails?.id ? (
                <div className="goal-assign-profile">
                  <div className="goal-assign-img">
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
                  <div className="goal-assign-content">
                    <h6>{selectedUserDetails?.name}</h6>
                    <p>{selectedUserDetails?.team_name}</p>
                  </div>
                  <div className="week-book-delete">
                    <Link
                      to="#"
                      onClick={() => {
                        updatedSelectedUser({});
                        //   selectedUser({});
                        //   setDeleteOnBehalf && setDeleteOnBehalf(!deleteOnBehalf);
                      }}
                    >
                      <i className="far fa-trash-can"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="week-book-content">
                  <h6>Yourself</h6>
                  <p>Search and select a user to assigned for</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="goal-inner">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="goal-label">
              <label>Describe your goal</label>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="goal-input goal-textarea">
              <textarea
                type="text"
                className="form-control"
                placeholder="Max 1500 characters"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="goal-inner">
        <Row>
          <Col lg={8} md={24}>
            <div className="goal-label">
              <label>
                {findLabelText(
                  'Describe your goal',
                  'Describe your goal',
                  'Hr',
                )}
              </label>
            </div>
          </Col>
          <Col lg={16} md={24}>
            <div className="goal-input">
              <div className="form-group tab-form-group tab-description ">
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <textarea
                        maxLength={1500}
                        value={value}
                        placeholder={
                          //   findLabelText('Optional', 'Optional', 'Hr') +
                          'Max 1500 characters'
                        }
                        className="form-control-text-area"
                        onChange={e => {
                          onChange(e);
                          trigger('description');
                        }}
                      />
                    </>
                  )}
                />
                <Error>{errors?.['description']?.message}</Error>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="comments-title">
        <p>Comments</p>
      </div>
      <div className="comments-grid">
        <div className="comments-header">
          <h4>
            Chris Burke <span>12 Jun 2023</span>
          </h4>
        </div>
        <div className="comments-body">
          <p>
            Lorem ipsum dolor sit amet consectetur. Faucibus commodo nunc id in
            nulla ullamcorper ultricies. Sed commodo est diam donec bibendum
            fermentum dictum ultrices. Eu vel feugiat nunc maecenas ac risus.
            Volutpat tempus dignissim tellus gravida pellentesque at enim in
            risus. A diam eget ut lectus. Fusce viverra donec pellentesque
            tortor est quis felis amet ac. Eu vitae eget id habitant neque
            egestas.
          </p>
        </div>
      </div>
      <div className="comments-grid">
        <div className="comments-header">
          <h4>
            Barry Allen <span>12 Jun 2023</span>
          </h4>
        </div>

        {/* <textarea
            type="text"
            className="form-control"
            defaultValue={'Lorem ipsum'}
          /> */}
        <div className="comments-body">
          <div className="goal-input">
            <div className="form-group">
              <Controller
                name="comment"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <textarea
                      value={value}
                      placeholder={'Enter a comment'}
                      className="form-control -text-area"
                      onChange={e => {
                        onChange(e);
                        trigger('comment');
                      }}
                    />
                  </>
                )}
              />
              <Error>{errors?.['comment']?.message}</Error>
            </div>
          </div>
        </div>
      </div>
      <div className="comment-submit">
        <a href="#">Submit comment</a>
      </div>
      <div className="remove-contact">
        <p>Remove Goal</p>
        <a href="#" className="btn">
          <i className="far fa-trash-can" />
        </a>
      </div>
    </div>
  );
};

export default Goal;
