import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  directReport,
  hrUserFindParamDetails,
} from '../../../../services/apiurl';
import { postData } from '../../../../services/apicall';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import Toaster from '../../../toast';
import { PersonalContext } from '../../personalController';
import Footer from '../../rightScreen/footer';
import { Link } from 'react-router-dom';
import { Search } from '../../../imagepath';
import { getImageFroms3Bucket } from '../../../../services/s3Bucket';
import { findFirstName, findFirst_LastName } from '../../../../assets/globals';
import { findLabelText } from '../../../commonMethod';

const AddReport = ({ checkIsOpned }) => {
  const {
    GetJobDetails,
    editData,
    details,
    EditComponent,
    userID,
    rightSidebarHeight,
  } = useContext(PersonalContext);
  const [id, setId] = useState("");
  const { userDetails, image, orgDetail, updateDetails } = useSelector(
    (state: any) => state?.app,
  );

  const dispatch = useDispatch();
  const [searchList, setSearchList] = useState([]);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [enableDelButton, setEnableDelButton] = useState(true);
  const [selectedValue, setSelectedValue] = useState([]);
  const { setValue, control } = useForm();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      getImageFroms3Bucket(image, 'image', data => {
        setImageUrl(data);
        return data;
      });
    }
  }, [image, orgDetail?.org_name]);

  const handleSearch = e => {
    setEnableDelButton(false);
    const payload = {
      search: e.target.value,
      status: 1,
      type: 'direct_report',
      user_id: userID,
    };
    postData(hrUserFindParamDetails, payload, (data, res) => {
      res?.data?.code == 200 && setSearchList(data);
    });
  };
  const handleChange = (item: any) => {
    setEnableDelButton(true);
    const arr = [];
    arr.push(item);
    setSelectedValue(arr);
    setEnableSaveButton(true);
    setValue('search', '');
  };

  const onSubmit = () => {
    const payload = {
      user_id: userID,
      name_id: selectedValue?.[0]?.id,
      name: selectedValue?.[0]?.name,
    };
    dispatch(showLoader());
    postData(directReport.Add, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      }
      if (res?.code == 422) {
        Toaster(res?.code, res?.message);
      }
      checkIsOpned(false);
      GetJobDetails();
      setSearchList([]);
      setValue('search', '');
      EditComponent('', {});
    });
  };

  useEffect(() => {
    const editList = [];
    Object.keys(editData).length > 0 && editList.push(editData);
    setSelectedValue(editList);
  }, [editData]);

  const handleDelete = item => {
    const payload = { id: item?.id };
    dispatch(showLoader());
    postData(directReport.Delete, payload, (data, res) => {
      setSearchList([]);
      setSelectedValue([]);
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
      }
      if (res?.code == 422) {
        Toaster(res?.code, res?.message);
      }
      GetJobDetails();
    });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="direct_tab"
      role="tabpanel"
      aria-labelledby="direct-tab"
    >
      <div
        className="personal-time-card-body"
        style={{ height: rightSidebarHeight, maxHeight: rightSidebarHeight }}
      >
        <div className="direct-profile">
          <div className="direct-img">
            {imageUrl ? (
              <Link to="#">
                <img src={imageUrl} alt="icon" />
              </Link>
            ) : (
              <Link to="#">
                <span className="user-firstletter">
                  {userDetails?.first_name && userDetails?.last_name
                    ? findFirst_LastName(
                        userDetails?.first_name,
                        userDetails?.last_name,
                      )
                    : findFirstName(
                        updateDetails?.display_name ||
                          userDetails?.display_name,
                      )}
                </span>
              </Link>
            )}
          </div>
          <div className="direct-content">
            <h4>
              <Link to="#">{details?.full_name}</Link>
            </h4>
            <h6>{details?.team_name}</h6>
            <p>{details?.location_name}</p>
          </div>
        </div>
        <div className="direct-accordion">
          <div id="direct-accordion">
            <div className="direct-header" id="heading-1">
              <h5 className="direct-head">
                <Link
                  role="button"
                  data-bs-toggle="collapse"
                  to="#collapse-1"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                >
                  {findLabelText('Direct reports', 'Direct reports', 'Hr')}
                </Link>
              </h5>
            </div>
            <div
              id="collapse-1"
              className="collapse show"
              data-bs-parent="#accordion"
              aria-labelledby="heading-1"
            >
              <div className="direct-body">
                <div className="direct-search">
                  <Controller
                    name="search"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input
                        type="text"
                        className="form-control"
                        onChange={e => {
                          handleSearch(e);
                          onChange(e);
                        }}
                        value={value}
                      />
                    )}
                  />
                  <div className="direct-icon">
                    <Link to="#">
                      <img src={Search} alt="search-icon" />
                    </Link>
                  </div>
                </div>
                <div className="direct-profile-details">
                  {[...(enableDelButton ? selectedValue : searchList)]?.length >
                    0 &&
                    [...(enableDelButton ? selectedValue : searchList)].map(
                      (item: any, index) => {
                        return (
                          <div className="direct-profile-info" key={index}>
                            <div className="direct-profile-text">
                              <Link to="#" onClick={() => handleChange(item)}>
                                <span className="user-firstletter">
                                  {findFirstName(item?.name)}
                                </span>
                                <p>{item?.name}</p>
                              </Link>
                            </div>
                            {Object.keys(editData).length > 0 &&
                              enableDelButton && (
                                <div className="direct-profile-delete">
                                  <Link
                                    to="#"
                                    className="btn"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <i className="far fa-trash-can" />
                                  </Link>
                                </div>
                              )}
                          </div>
                        );
                      },
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        handleSubmit={onSubmit}
        anyOneRequired={!enableSaveButton}
        isDirty={true}
        isValid={true}
      />
    </div>
  );
};

export default AddReport;
