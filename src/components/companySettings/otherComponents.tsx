import React from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import LabelWithCheckBox from './labelWithCheckBox';
import { Col, Row } from 'antd';

interface SettingsHeaderProps {
  image: string;
  lable: string;
  callBack: CallableFunction;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  image,
  lable,
  callBack,
}) => {
  return (
    <div className="company-header">
      <h4>
        <img src={image} alt="" /> {lable}
      </h4>
      <Link to="#" className="btn btn-primary" onClick={() => callBack()}>
        Save
      </Link>
    </div>
  );
};

interface UploadCompanyLogoProps {
  companylogo: string;
  onImageChange: CallableFunction | any;
  imageUrl: string;
}
export const UploadCompanyLogo: React.FC<UploadCompanyLogoProps> = ({
  onImageChange,
  companylogo,
  imageUrl,
}) => {
  return (
    <Row>
      <Col lg={12}>
        <div className="company-logo">
          <h6>
            {findLabelText('Company_logo', 'Company Logo', 'Company_Settings')}
          </h6>
          <div className="companylogo-upload">
            <input type="file" id="imgInp" onChange={onImageChange} />
            <Link to="#">
              {findLabelText(
                'Upload_image',
                'Upload image',
                'Company_Settings',
              )}
            </Link>
          </div>
          <h5>
            {'JPEG, PNG, 400x100px,160x160px,250x150px,350x75px'}{' '}
            {findLabelText('under', 'under', 'Company_Settings')} 1mb{' '}
          </h5>
        </div>
      </Col>
      <Col lg={7}>
        <div className="company-img">
          {companylogo && <img src={imageUrl} alt="img" id="blah" />}
        </div>
      </Col>
    </Row>
  );
};

interface WorkRemotlyCountProps {
  days: number;
  setDays: CallableFunction;
}
export const WorkRemotlyCount: React.FC<WorkRemotlyCountProps> = ({
  days,
  setDays,
}) => {
  const handleDaysChange = (e, type = '') => {
    const day =
      type == 'add' ? days + 1 : type == 'sub' ? days - 1 : e.target.value;
    if ((day >= 0 && day <= 5) || day == '') {
      setDays(day);
    }
  };
  return (
    <div className="maxnumberset p-0">
      <div className="maxnumbersetlabel">
        <h4>
          {findLabelText(
            'Minimum_days_in_office_per_week',
            'Minimum days in office per week',
            'Company_Settings',
          )}
        </h4>
        <h5>
          {findLabelText(
            'This_will_overwrite_the_setting_for_all_users',
            'This will overwrite the setting for all users',
            'Company_Settings',
          )}
        </h5>
      </div>
      <div className="maxnumbersetinput">
        <button
          className="top-arrow"
          style={{ opacity: days == 5 ? '0.3' : '' }}
          onClick={e => handleDaysChange(e, 'add')}
        >
          <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button>
        <input
          value={days}
          type="text"
          min="0"
          max="5"
          onInput={(e: any) => (e.target.value = e.target.value.slice(0, 2))}
          onChange={handleDaysChange}
        />
        <button
          className="down-arrow"
          style={{ opacity: days == 0 ? '0.3' : '' }}
          onClick={e => handleDaysChange(e, 'sub')}
        >
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

interface NotificationListProps {
  changeData: CallableFunction;
  email: number | null;
  push: number | null;
}
export const NotificationList: React.FC<NotificationListProps> = ({
  changeData,
  email,
  push,
}) => {
  return (
    <div className="form-settings">
      <h4>
        {findLabelText(
          'Notification_type_for_all_new_users',
          'Notification type for all new users',
          'Company_Settings',
        )}
      </h4>
      <LabelWithCheckBox
        label="Email"
        callBack={changeData}
        index={null}
        type="email"
        flag={email}
      />
      <LabelWithCheckBox
        label="Push"
        callBack={changeData}
        index={null}
        type="push"
        flag={push}
      />
    </div>
  );
};

interface QRCheckInProps {
  changeData: CallableFunction;
  enableQR: number | null;
  checkin: number | null;
}
export const QRCheckIn: React.FC<QRCheckInProps> = ({
  changeData,
  enableQR,
  checkin,
}) => {
  return (
    <div className="form-settings">
      <h4>{findLabelText('QR Check-in', 'QR Check-in', 'Company_Settings')}</h4>
      <LabelWithCheckBox
        label="Enable QR check-in"
        callBack={changeData}
        index={null}
        type="enableQR"
        flag={enableQR}
      />
      <LabelWithCheckBox
        label="QR check-in enforcement"
        callBack={changeData}
        index={null}
        type="checkin"
        flag={checkin}
        disabled={enableQR == 0 ? true : false}
      />
    </div>
  );
};

interface QRCheckinEnforcementProps {
  checkin: number | null;
  changeData: CallableFunction;
}
export const QRCheckinEnforcement: React.FC<QRCheckinEnforcementProps> = ({
  checkin,
  changeData,
}) => {
  return (
    <div className="toggle-start">
      <h5>
        {findLabelText(
          'QR_check_in_enforcement',
          'QR check-in enforcement',
          'Company_Settings',
        )}
      </h5>
      <div className="toogleclass">
        <label className="switch">
          <input
            type="checkbox"
            checked={checkin != 0 ? true : false}
            onChange={() => changeData('checkin', checkin)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

interface SettingsLanguageListProps {
  avalang: any;
  changeData: CallableFunction;
}
export const SettingsLanguageList: React.FC<SettingsLanguageListProps> = ({
  avalang,
  changeData,
}) => {
  return (
    <>
      <div className="settings-titles">
        <h5>
          {findLabelText(
            'Available_languages',
            'Available languages',
            'Company_Settings',
          )}
        </h5>
        <h6>
          {findLabelText(
            'Select_which_languages_are_available_to_your_users',
            'Select which languages are available to your users',
            'Company_Settings',
          )}
        </h6>
      </div>
      <div className="form-settings mb-0">
        {avalang?.map((item, index) => {
          return (
            <LabelWithCheckBox
              key={index}
              label={item?.name}
              callBack={(type, val, index) => changeData(type, item, index)}
              index={index}
              type="lang"
              flag={item.status}
            />
          );
        })}
      </div>
    </>
  );
};
