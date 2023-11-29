import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  findFirstName,
  findFirst_LastName,
  imageType,
} from '../../../assets/globals';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, profileSettingImage } from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import {
  GetImgaeFromS3Bucket,
  deleteImageFromS3Bucket,
  getImageFroms3Bucket,
  handleImageUploadtoS3Bucket,
} from '../../../services/s3Bucket';
import { postData } from '../../../services/apicall';
import { EditProfile } from '../../../services/apiurl';
import { ProfileContext } from '../../context/settingsContext';
import { Link } from 'react-router-dom';
import { ValidationMessages } from '../constant';

const ProfileNameAndImage = () => {
  const { setMount, profileData, displayName, setDisplayName } =
    useContext(ProfileContext);
  const dispatch = useDispatch();
  const { image } = useSelector((state: any) => state.app);
  const [imageUrl, setImageUrl] = useState(null);
  const nameRef = useRef<any>(null);

  const sucessCallBack = (data, res) => {
    try {
      Toaster(res.data.code, res.data.message);
      if (res.data.code == 200) {
        setMount(true);
        deleteImageFromS3Bucket(image, 'image', '');
        dispatch(profileSettingImage(data?.profile_photo));
        dispatch(hideLoader());
        localStorage.setItem('updateUserDetails', JSON.stringify(data));
      }
    } catch (err) {}
  };

  const handleProfileEdit = e => {
    const file = e.target.files[0];
    const valiedImg = imageType.includes(file.type);
    if (!valiedImg) {
      dispatch(hideLoader());
      Toaster('error', ValidationMessages.invalidFileFormat);
      return false;
    }
    if (file.size > 120000) {
      dispatch(hideLoader());
      Toaster('error', ValidationMessages.fileSize);
      return false;
    }
    handleImageUploadtoS3Bucket(file, 'image', data => {
      setImageUrl(data);
      dispatch(profileSettingImage(data));
      const preparNewProfileReq = { profile_photo: data };
      postData(EditProfile, preparNewProfileReq, sucessCallBack);
    });
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (nameRef.current && !nameRef.current?.contains(event?.target)) {
        if (displayName.status) {
          setDisplayName({
            data: profileData?.display_name,
            status: false,
            count: 0,
          });
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileData?.display_name, displayName.status]);

  useEffect(() => {
    image &&
      getImageFroms3Bucket(image, 'image', data => {
        setImageUrl(data);
      });
  }, [image]);

  return (
    <div className="profile-img-group">
      <div className="big-view-img big-inner-img big-inner-img-profile">
        <label>
          <i className="fas fa-pen-to-square"></i>
          <input type="file" id="imgInp" onChange={handleProfileEdit} />
        </label>
        {profileData?.profile_photo ? (
          <Link to="#">
            {imageUrl && <img src={imageUrl} alt="My Image" />}
          </Link>
        ) : (
          <span className="user-firstletter">
            {profileData?.first_name && profileData?.last_name
              ? findFirst_LastName(
                  profileData?.first_name,
                  profileData?.last_name,
                )
              : findFirstName(
                  profileData?.display_name || profileData?.display_name,
                )}
          </span>
        )}
      </div>
      <div className="profiles-names" ref={nameRef}>
        <h4>
          {displayName.status === true ? (
            <input
              type="text"
              className="form-control text-about"
              defaultValue={displayName?.data || ''}
              onChange={e =>
                setDisplayName({
                  ...displayName,
                  data: e.target.value,
                })
              }
            />
          ) : (
            <Link to="#">{displayName?.data}</Link>
          )}
          <div className="names-icons">
            {profileData?.user_hs_roles?.length > 0
              ? profileData?.user_hs_roles?.map((icon, index) => {
                  return (
                    <div key={index} className="hs_icon">
                      <Link to="#" key={index}>
                        <GetImgaeFromS3Bucket
                          imageFile={icon.health_safety_icons}
                          type={'image'}
                          FilePath={'ghs'}
                        />
                      </Link>
                      <p>{icon.name}</p>
                    </div>
                  );
                })
              : null}
          </div>
          <span className="edit-profile-name"></span>
        </h4>
      </div>
    </div>
  );
};

export default ProfileNameAndImage;
