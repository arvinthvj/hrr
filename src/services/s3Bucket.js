import React, { useEffect, useState } from 'react';
import { firstLetterStyle, imageTypes } from '../assets/constants/config';

import store from '../reduxStore/store';
import { getDataWithToken, postDatawithtoken } from './apiservice';
import { deleteS3, getFromS3, getSecret, putSecret, storeToS3 } from './apiurl';
const { userDetails } = store.getState().app;

const org_name = userDetails?.tenant_info?.tenant_name;
const tenant_id = userDetails?.tenant_info?.tenant_id;

export const GetImgaeFromS3Bucket = ({
  imageFile,
  type = 'image',
  FilePath = '',
  userDetail = userDetails,
  id = '',
  styles = {},
  name = '',
  style = '',
}) => {
  //
  const [imageUrl, setImageUrl] = useState(null);
  const fetchImage = async (imageFile, type) => {
    //
    try {
      let CommanFilePath = '';
      if (
        FilePath === 'gat' ||
        FilePath === 'ges' ||
        FilePath === 'ghs' ||
        FilePath === 'ghr'
      ) {
        CommanFilePath = `hhplus/${FilePath}`;
      } else {
        CommanFilePath = `${org_name}/${
          userDetail?.id
            ? userDetail?.id
            : userDetail?.user_id
            ? userDetail?.user_id
            : userDetail?.booking_userid
            ? userDetail?.booking_userid
            : userDetail?.search_id
            ? userDetail?.search_id
            : userDetail
        }`;
      }
      let commonType = '';
      if (FilePath === 'gat') {
        commonType = type + '/svg' + '/shapes';
      } else {
        commonType = type;
      }
      const payload = {
        filepath: `${CommanFilePath}/${commonType}/${imageFile}`,
        public: 0,
      };
      postDatawithtoken(getFromS3, payload)?.then(res => {
        if (res) {
          let fileSplit = imageFile?.split('.');
          let filetype = `${
            imageTypes.find(
              image => image.name === fileSplit[fileSplit?.length - 1],
            )?.type
          }`;
          const url = URL.createObjectURL(
            new Blob([res?.data], { type: filetype }),
          );
          setImageUrl(url);
        }
      });
    } catch (error) {
      setImageUrl(null);
    }
  };
  useEffect(() => {
    fetchImage(imageFile, type, FilePath);
  }, [imageFile, type, FilePath]);

  if (imageUrl) {
    if (id == '') return <img src={imageUrl} alt="I" style={styles} />;
    else return <img src={imageUrl} alt="I" id={id} />;
  } else {
    if (style == 'small') {
      return <p className="user-firstletter user-firstletter-small">{name}</p>;
    } else if (style == 'manager') {
      return (
        <p className="user-firstletter" style={firstLetterStyle}>
          {name}
        </p>
      );
    } else if (style == 'globalsearch') {
      return (
        <p className="global-first-letter">
          <span>{name}</span>
        </p>
      );
    } else if (style == 'hr') {
      return (
        // <Link to="#">
        <span className="user-firstletter">{name}</span>
        // </Link>
      );
    } else if (style == 'profile') {
      return (
        <p className="avatar-text">
          <span>{name}</span>
        </p>
      );
    } else if (style == 'dashboardprofile') {
      return (
        <p className="team-member-text">
          <span>{name}</span>
        </p>
      );
    } else if (style == 'teamprofile') {
      return (
        <p className="active-profile-text">
          <span>{name}</span>
        </p>
      );
    } else {
      return (
        <p>
          <span>{name}</span>
        </p>
      );
    }
  }
};

export const handleImageUploadtoS3Bucket = async (
  file,
  type = 'image',
  successCallBack,
  CompanyLogo = false,
  FilePath = '',
  tenantPath = '',
) => {
  var currentDateTime = Date.now();
  const formData = new FormData();

  let fileName = file?.name?.split('.');
  let CommanFilePath = '';
  if (
    FilePath === 'gat' ||
    FilePath === 'ges' ||
    FilePath === 'ghs' ||
    FilePath == 'tenant' ||
    FilePath == 'ghr'
  ) {
    if (FilePath == 'tenant') {
      CommanFilePath = `hhplus/${tenantPath}`;
    } else {
      CommanFilePath = `hhplus/${FilePath}`;
    }
  } else {
    CommanFilePath =
      CompanyLogo == true ? `${tenant_id}` : `${org_name}/${userDetails?.id}`;
  }
  let commonType = '';
  if (FilePath === 'gat') {
    commonType = type + '/svg' + '/shapes';
  } else {
    commonType = type;
  }

  let fileSplit = file?.name?.split('.');
  let filetype = `${
    imageTypes.find(image => image.name === fileSplit[fileSplit?.length - 1])
      ?.type
  }`;

  formData.append(
    'filepath',
    `${CommanFilePath}/${commonType}/${fileName?.[0]}_${currentDateTime}.${fileName?.[1]}`,
  ),
    formData.append('file', file),
    formData.append('public', CompanyLogo == true ? 1 : 0);

  postDatawithtoken(storeToS3, formData)?.then(res => {
    if (res) {
      let imagesetUrl = `${fileName[0]}_${currentDateTime}.${fileName[1]}`;
      successCallBack(imagesetUrl);
    }
  });
};
export const getImageFroms3Bucket = async (
  imageFile,
  type = 'image',
  successCallBack,
  CompanyLogo = false,
  FilePath = '',
  userDetail = userDetails,
) => {
  return new Promise((resolve, reject) => {
    //
    let CommanFilePath = '';
    if (
      FilePath === 'gat' ||
      FilePath === 'ges' ||
      FilePath === 'ghs' ||
      FilePath === 'ghr'
    ) {
      CommanFilePath = `hhplus/${FilePath}`;
    } else {
      CommanFilePath =
        CompanyLogo == true ? `${tenant_id}` : `${org_name}/${userDetail?.id}`;
    }
    let commonType = '';
    if (FilePath === 'gat') {
      commonType = type + '/svg' + '/shapes';
    } else {
      commonType = type;
    }

    const payload = {
      filepath: `${CommanFilePath}/${commonType}/${imageFile}`,
      public: 0,
    };

    postDatawithtoken(getFromS3, payload)?.then(res => {
      if (res) {
        let fileSplit = imageFile?.split('.');
        let filetype = `${
          imageTypes.find(
            image => image.name === fileSplit[fileSplit?.length - 1],
          )?.type
        }`;
        const blob = new Blob([res?.data], { type: filetype });
        const url = URL.createObjectURL(blob);
        successCallBack(url);
      }
    });
  });
};

export const getCSVFileFroms3Bucket = async (csvFile, successCallBack) => {
  const payload = {
    filepath: `${csvFile}`,
    public: 1,
  };
  postDatawithtoken(getFromS3, payload)?.then(res => {
    if (res) {
      let fileSplit = csvFile?.split('.');
      let filetype = `${
        imageTypes.find(
          image => image.name === fileSplit[fileSplit?.length - 1],
        )?.type
      }`;
      const SrcUrl = URL.createObjectURL(
        new Blob([res?.data], { type: filetype }),
      );
      successCallBack(SrcUrl);
    }
  });
};

export const getCommonImageFroms3Bucket = async (
  imageFile,
  type = 'image',
  successCallBack,
) => {
  let CommanFilePath = 'hhplus';

  const payload = {
    filepath: `${CommanFilePath}/${type}/${imageFile}`,
    public: 0,
  };
  postDatawithtoken(getFromS3, payload)?.then(res => {
    if (res) {
      let fileSplit = imageFile?.split('.');
      let filetype = `${
        imageTypes.find(
          image => image.name === fileSplit[fileSplit?.length - 1],
        )?.type
      }`;

      const ImageSrcUrl = URL.createObjectURL(
        new Blob([res?.data], { type: filetype }),
      );

      successCallBack(ImageSrcUrl);
    }
  });
};

export const SetCommanImagetoS3Bucket = async (
  file,
  type = 'image',
  successCallBack,
) => {
  let CommanFilePath = 'hhplus';
  let fileName = file?.name;

  const payload = {
    filepath: `${CommanFilePath}/${type}/${fileName}`,
    file: file,
    public: 0,
  };
  postDatawithtoken(storeToS3, payload)?.then(res => {
    if (res) {
      let imagesetUrl = `${fileName}`;
      successCallBack(imagesetUrl);
    }
  });
};

export const deleteImageFromS3Bucket = async (
  imageFile,
  type = 'image',
  successCallBack,
  CompanyLogo = 'false',
  FilePath = '',
) => {
  try {
    let CommanFilePath = '';
    if (FilePath === 'gat' || FilePath === 'ges' || FilePath === 'ghs') {
      CommanFilePath = `hhplus/${FilePath}`;
    } else {
      CommanFilePath =
        CompanyLogo == true ? `${tenant_id}` : `${org_name}/${userDetails?.id}`;
    }
    let commonType = '';
    if (FilePath === 'gat') {
      commonType = type + '/svg' + '/shapes';
    } else {
      commonType = type;
    }

    const payload = {
      filepath: `${CommanFilePath}/${commonType}/${imageFile}`,
      public: 0,
    };
    postDatawithtoken(deleteS3, payload)?.then(res => {
      if (res) {
        successCallBack(res);
      }
    });
  } catch (error) {
    // console.error(error);
  }
};

export const setSecretValueInKeyVault = async (
  secretName,
  secretValue,
  successCallBack,
) => {
  try {
    const formData = new FormData();
    formData.append('secretValue', secretValue),
      postDatawithtoken(putSecret, formData)?.then(data => {
        successCallBack(data);
      });
  } catch (err) {}
};

export const getSecretValueFromKeyVault = (secretId, successCallBack) => {
  getDataWithToken(getSecret)?.then(res => {
    if (res) {
      successCallBack(res);
      return res;
    }
  });
  //
};
