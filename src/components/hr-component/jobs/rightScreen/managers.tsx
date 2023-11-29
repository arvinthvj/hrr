import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userFindParamDetails, workManager } from '../../../../services/apiurl';
import { postData } from '../../../../services/apicall';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import Toaster from '../../../toast';
import { PersonalContext } from '../../personalController';
import Footer from '../../rightScreen/footer';
import { Link } from 'react-router-dom';
import { Search } from '../../../imagepath';
import { findFirstName, findFirst_LastName } from '../../../../assets/globals';
import { getImageFroms3Bucket } from '../../../../services/s3Bucket';
import { ErrorMessage, Errorcode } from '../../../../assets/constants/config';
import { findLabelText } from '../../../commonMethod';

const AddManagers = ({ checkIsOpned }) => {
  const { GetJobDetails, editData, details, userID, rightSidebarHeight } =
    useContext(PersonalContext);
  const { updateDetails, orgDetail, image } = useSelector(
    (state: any) => state?.app,
  );

  const dispatch = useDispatch();
  const [searchList, setSearchList] = useState([]);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
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
    const payload = { search: e.target.value, status: 1 };
    postData(userFindParamDetails, payload, data => {
      setSearchList(data);
    });
  };
  const handleChange = (item: any) => {
    const arr = [];
    arr.push(item);
    setSearchList(arr);
    setEnableSaveButton(true);
  };

  const onSubmit = () => {
    const payload = {
      user_id: userID,
      name_id: searchList?.[0]?.id,
      name: searchList?.[0]?.name,
    };
    dispatch(showLoader());
    postData(workManager.Add, payload, (data, res) => {
      dispatch(hideLoader());
      console.log('data', data);
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
    });
  };

  useEffect(() => {
    const editList = [];
    Object.keys(editData).length > 0 && editList.push(editData);
    setSearchList(editList);
  }, [editData]);

  const handleDelete = item => {
    const payload = { id: item?.id };
    dispatch(showLoader());
    postData(workManager.Delete, payload, (data, res) => {
      setSearchList([]);
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        console.log('data--', data);
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
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
                  {details?.first_name && details?.last_name
                    ? findFirst_LastName(
                        details?.first_name,
                        details?.last_name,
                      )
                    : findFirstName(
                        updateDetails?.display_name || details?.display_name,
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
                  {findLabelText('Manager', 'Manager', 'Hr')}
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
                    render={({ field: { value } }) => (
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleSearch}
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
                  {searchList?.length > 0 &&
                    searchList?.map((item: any, index) => {
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
                          {Object.keys(editData).length > 0 && (
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
                    })}
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

export default AddManagers;
