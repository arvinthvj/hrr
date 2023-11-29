import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setting_icon } from '../../components/imagepath';
import { postData } from '../../services/apicall';
import { useDispatch, useSelector } from 'react-redux';
import { imageType } from '../../assets/globals';
import {
  hideLoader,
  setCompLogo,
  setUserDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import {
  addCompanySettingsList,
  companySettingsList,
} from '../../services/apiurl';
import Toaster from '../../components/toast';
import {
  getImageFroms3Bucket,
  handleImageUploadtoS3Bucket,
} from '../../services/s3Bucket';
import {
  NotificationList,
  QRCheckIn,
  QRCheckinEnforcement,
  SettingsHeader,
  SettingsLanguageList,
  UploadCompanyLogo,
  WorkRemotlyCount,
} from '../../components/companySettings/otherComponents';
import { GeneralSettingsLabels } from '../../components/companySettings/constant';
const CompanySettingTab = props => {
  //  state
  const [email, setEmail] = useState<number | null>(null);
  const [push, setPush] = useState<number | null>(null);
  const [checkin, setCheckIn] = useState<number | null>(null);
  const [enableQR, setEnableQR] = useState<number | null>(null);
  const [days, setDays] = useState(1);
  const [avalang, setAvaLang] = useState<any>([]);
  const [companylogo, setCompanyLogo] = useState('');
  const [imageUrl, setImageUrl] = useState<any>(null);
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state: any) => state.app);

  // useRef
  const imgRef = useRef('');
  useEffect(() => {
    getData();
  }, []);

  const sucessCallBack = data => {
    dispatch(hideLoader());
    const compLogo = data?.company_logo;
    setCompanyLogo(compLogo);
    dispatch(setCompLogo(compLogo));
    setEmail(data?.notification_type_email);
    setPush(data?.notification_type_push);
    setCheckIn(data?.qr_checkin_enforcement);
    setEnableQR(data?.enable_qr_checkin);
    setDays(
      data?.min_office_per_week ? parseInt(data?.min_office_per_week) : 1,
    );
    const userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
    userDetailsCopy.qr_checkin = data?.qr_checkin_enforcement;
    dispatch(setUserDetails(userDetailsCopy));
    if (data?.available_languages?.length > 0) {
      setAvaLang(data?.available_languages);
    }
  };
  const splitValue = (data, value) => {
    const selectedId = data?.find(ele => ele.id == value);
    return selectedId ? selectedId?.value : '';
  };
  const updatefun = (res, data) => {
    getData();
    Toaster(data?.data?.code, data?.data?.message);
  };

  const getData = () => {
    postData(companySettingsList, {}, sucessCallBack);
  };
  const saveCompanySetting = () => {
    dispatch(showLoader());
    const ids = avalang.map((i: any) => {
      if (i?.status == 1) return i?.id;
    });
    const data = {
      min_office_per_week: days,
      no_of_days_wfh: days,
      notification_type_email: email,
      notification_type_push: push,
      qr_checkin_enforcement: checkin,
      enable_qr_checkin: enableQR,
      available_languages: ids.toString(),
      save_status: 1,
    };
    postData(addCompanySettingsList, data, updatefun);
  };

  const changeData = (type, value, index = '') => {
    if (type == 'email') {
      const val = value == 0 ? 1 : 0;
      setEmail(email == 0 ? 1 : 0);
    }
    if (type == 'push') {
      const val = value == 0 ? 1 : 0;
      setPush(push == 0 ? 1 : 0);
    }
    if (type == 'checkin') {
      const val = value == 0 ? 1 : 0;
      setCheckIn(checkin == 0 ? 1 : 0);
    }
    if (type == 'enableQR') {
      const val = value == 0 ? 1 : 0;
      setEnableQR(enableQR == 0 ? 1 : 0);
      if (val == 0) {
        setCheckIn(0);
      }
    }
    if (type == 'lang') {
      const lang: any = avalang;
      lang[index].status = value.status == 0 ? 1 : 0;
      setAvaLang([...lang]);
      const ids: any = [];
      for (const i of lang) {
        if (i.status == 1) {
          ids.push(i.id);
        }
      }
    }
  };

  const onImageChange = e => {
    dispatch(showLoader());
    const file = e.target.files[0];
    const valiedImg = imageType.includes(file.type);
    if (!valiedImg) {
      dispatch(hideLoader());
      Toaster('error', ' Please upload valid image type');
      return false;
    }
    if (file.size > 1000000) {
      dispatch(hideLoader());
      Toaster('error', 'File size must under 1MB!');
      return false;
    }
    const sucessCallBack = (data, res) => {
      try {
        if (res?.data?.code == 200) {
          // let logo=data?.find(e=>e.id==1)
          dispatch(setCompLogo(data?.company_logo));
          Toaster(res?.data?.code, res?.data?.message);
          getData();
        }
      } catch (err) {}
    };

    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (
        (img.width <= 400 && img.height <= 100) ||
        (img.width <= 160 && img.height <= 160) ||
        (img.width <= 250 && img.height <= 150) ||
        (img.width <= 350 && img.height <= 75)
      ) {
        validImage();
      } else {
        dispatch(hideLoader());
        Toaster(
          'error',
          `This image doesn't look like the size we wanted. It's 
        ${img.width} x ${img.height} but we require under 400x100, 160x160, 250x150, 350x75 size image.`,
        );
        return false;
      }
    };
    function validImage() {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        setImageUrl(`${reader?.result}`);
      };
      handleImageUploadtoS3Bucket(
        file,
        'image',
        data => {
          const dataz = { company_logo: data, no_of_days_wfh: days };
          postData(addCompanySettingsList, dataz, sucessCallBack);
        },
        true,
      );
    }
  };

  useEffect(() => {
    if (companylogo) {
      getImageFroms3Bucket(
        companylogo,
        'image',
        data => {
          setImageUrl(data);
        },
        true,
      );
    }
  }, [companylogo]);
  return (
    <>
      <div className="card-body">
        <SettingsHeader
          image={setting_icon}
          lable={GeneralSettingsLabels.companySettings}
          callBack={() => saveCompanySetting()}
        />
        <div className="settings-path">
          <UploadCompanyLogo
            onImageChange={onImageChange}
            companylogo={companylogo}
            imageUrl={imageUrl}
          />
          <NotificationList changeData={changeData} email={email} push={push} />
          <QRCheckIn
            changeData={changeData}
            enableQR={enableQR}
            checkin={checkin}
          />
          <WorkRemotlyCount days={days} setDays={setDays} />
          <SettingsLanguageList avalang={avalang} changeData={changeData} />
        </div>
      </div>
    </>
  );
};
export default CompanySettingTab;
