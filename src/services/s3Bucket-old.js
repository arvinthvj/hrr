import React, { useEffect, useState } from 'react';
import { firstLetterStyle, imageTypes } from '../assets/constants/config';
const AWS = require('aws-sdk');

import store from '../reduxStore/store';
const { userDetails, AwsData } = store.getState().app;
// const org_name =
//   store?.getState()?.app?.tenantDetails?.length > 0
//     ? store?.getState()?.app?.tenantDetails[0]?.tenant_name
//     : store?.getState()?.app?.tenantList?.label;
// const tenant_id = store?.getState()?.app?.tenantDetails[0]?.tenant_id;
const org_name = userDetails?.tenant_info?.tenant_name;
const tenant_id = userDetails?.tenant_info?.tenant_id;

AWS.config.update({
  region: `${process.env.REACT_APP_S3_region}`,
  credentials: new AWS.Credentials({
    accessKeyId: `${process.env.REACT_APP_accessKeyId}`,
    secretAccessKey: `${process.env.REACT_APP_secretAccessKey}`,
  }),
});
const s3 = new AWS.S3();

// const Ps3 = new AWS.S3().config.update({
//   region: `${process.env.REACT_APP_S3_region}`,
// })
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
      const data = await s3
        .getObject({
          Bucket: `${process.env.REACT_APP_S3_BucketName}`,
          Key: `${CommanFilePath}/${commonType}/${imageFile}`,
        })
        .promise();
      let fileSplit = imageFile?.split('.');
      let filetype = `${
        imageTypes.find(
          image => image.name === fileSplit[fileSplit?.length - 1],
        )?.type
      }`;
      const url = URL.createObjectURL(
        new Blob([data.Body], { type: filetype }),
      );
      setImageUrl(url);
    } catch (error) {
      setImageUrl(null);
      // console.error(error);
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
  // const params = {
  //   Bucket: `${process.env.REACT_APP_S3_BucketName}`,
  //   Key: `${CommanFilePath}/${type}/${fileName[0]}_${currentDateTime}.${fileName[1]}`,
  //   // tenantName_id/image/file.name_currentDateTime
  //   Body: file,
  // }
  let commonType = '';
  if (FilePath === 'gat') {
    commonType = type + '/svg' + '/shapes';
  } else {
    commonType = type;
  }

  const param = {
    Bucket: `${process.env.REACT_APP_S3_BucketName}`,
    Key: `${CommanFilePath}/${commonType}/${fileName?.[0]}_${currentDateTime}.${fileName?.[1]}`,
    // Key: `${"hhplus/gat/image/svg/shapes/"}${fileName?.[0]}.${fileName?.[1]}`,
    // tenantName_id/image/file.name_currentDateTime
    Body: file,
  };
  if (CompanyLogo == true) {
    let fileSplit = file?.name?.split('.');
    let filetype = `${
      imageTypes.find(image => image.name === fileSplit[fileSplit?.length - 1])
        ?.type
    }`;
    //
    s3.putObject(
      {
        Bucket: `${process.env.REACT_APP_PUBLIC_S3_BucketName}`,
        Key: `${CommanFilePath}/${commonType}/${fileName?.[0]}_${currentDateTime}.${fileName?.[1]}`,
        // tenantName_id/image/file.name_currentDateTime
        Body: file,
        ContentType: filetype,
      },
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      },
    );
  }
  s3.putObject(param, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // `${userDetails?.first_name}_${userDetails?.id}/image/
    let imagesetUrl = `${fileName[0]}_${currentDateTime}.${fileName[1]}`;

    //

    successCallBack(imagesetUrl);
    // setPutFileName(
    //   `${userDetails?.first_name}_${userDetails?.id}/image/${fileName[0]}_${currentDateTime}.${fileName[1]}`,
    // )
    //
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
  // `${userDetails?.first_name}_${userDetails?.id}/image/${fileName[0]}_${currentDateTime}.${fileName[1]}`,
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
    s3.getObject(
      {
        Bucket: `${process.env.REACT_APP_S3_BucketName}`,
        Key: `${CommanFilePath}/${commonType}/${imageFile}`,
      },
      (err, data) => {
        if (err) {
          // console.error(err, "err from get object");
          // reject(err);
          return;
        }
        console.log(data,"data")
        let fileSplit = imageFile?.split('.');
        let filetype = `${
          imageTypes.find(
            image => image.name === fileSplit[fileSplit?.length - 1],
          )?.type
        }`;
        const ImageSrcUrl = URL.createObjectURL(
          new Blob([data.Body], { type: filetype }),
        );
        //
        // resolve(ImageSrcUrl);
        successCallBack(ImageSrcUrl);
      },
    );
  });
};

export const getCSVFileFroms3Bucket = async (csvFile, successCallBack) => {
  s3.getObject(
    {
      Bucket: `${process.env.REACT_APP_PUBLIC_S3_BucketName}`,
      Key: `${csvFile}`,
    },
    (err, data) => {
      if (err) {
        // console.error(err, "err from get object");
        return;
      }
      let fileSplit = csvFile?.split('.');
      let filetype = `${
        imageTypes.find(
          image => image.name === fileSplit[fileSplit?.length - 1],
        )?.type
      }`;
      const SrcUrl = URL.createObjectURL(
        new Blob([data.Body], { type: filetype }),
      );
      successCallBack(SrcUrl);
    },
  );
};

export const getCommonImageFroms3Bucket = async (
  imageFile,
  type = 'image',
  successCallBack,
) => {
  let CommanFilePath = 'hhplus';

  s3.getObject(
    {
      Bucket: `${process.env.REACT_APP_S3_BucketName}`,
      Key: `${CommanFilePath}/${type}/${imageFile}`,
    },
    (err, data) => {
      if (err) {
        // console.error(err, "err from get object");
        return;
      }
      let fileSplit = imageFile?.split('.');
      let filetype = `${
        imageTypes.find(
          image => image.name === fileSplit[fileSplit?.length - 1],
        )?.type
      }`;
      const ImageSrcUrl = URL.createObjectURL(
        new Blob([data.Body], { type: filetype }),
      );

      successCallBack(ImageSrcUrl);
    },
  );
};
export const SetCommanImagetoS3Bucket = async (
  file,
  type = 'image',
  successCallBack,
) => {
  let CommanFilePath = 'hhplus';
  let fileName = file?.name;

  const param = {
    Bucket: `${process.env.REACT_APP_S3_BucketName}`,
    Key: `${CommanFilePath}/${type}/${fileName}`,
    Body: file,
  };

  s3.putObject(param, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let imagesetUrl = `${fileName}`;
    successCallBack(imagesetUrl);
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
    s3.deleteObject(
      {
        Bucket: `${process.env.REACT_APP_S3_BucketName}`,
        Key: `${CommanFilePath}/${commonType}/${imageFile}`,
      },
      (err, data) => {
        if (err) {
          // console.error(err, "err from get object");
          // reject(err);
          return;
        }
        successCallBack(data);
      },
    );
  } catch (error) {
    // console.error(error);
  }
};
const secretManager = new AWS.SecretsManager({
  region: `${process?.env?.REACT_APP_S3_region}`,
  credentials: new AWS.Credentials({
    accessKeyId: `${process?.env?.REACT_APP_accessKeyId}`,
    secretAccessKey: `${process?.env?.REACT_APP_secretAccessKey}`,
    // Path: 'hhplus/development/check',
  }),
});

export const setSecretValueInKeyVault = async (
  secretName,
  secretValue,
  successCallBack,
) => {
  try {
    const params = {
      // SecretId: secretName,
      SecretString: secretValue,
    };
    let data = await secretManager.putSecretValue(params).promise();
    //
    successCallBack(data);
  } catch (err) {}
};
export const createSecretValueInKeyVault = async (
  secretName,
  secretValue,
  successCallBack,
) => {
  try {
    const params = {
      // SecretId: secretName,
      SecretString: secretValue,
      // Name: secretName,
    };
    let data = await secretManager.createSecret(params).promise();

    successCallBack(data);
  } catch (err) {}
};
export const getSecretValueFromKeyVault = async (secretId, successCallBack) => {
  const response = await secretManager
    .getSecretValue({
      SecretId: secretId,
    })
    .promise();
  successCallBack(response);
  //
  return response;
};
