import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileResetPassword } from '../../../services/apiurl';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import Toaster from '../../../components/toast';
import { Link } from 'react-router-dom';
import { icon_02, send_icon } from '../../imagepath';
import { findLabelText } from '../../commonMethod';
import { validationSchema } from '../../validation';
import { global } from '../../../assets/constants/config';
import { Descriptions, ResetPasswordFields, TabNames } from '../constant';
import { Col, Row } from 'antd';

interface ResetPasswordProps {
  emailId?: string;
}

const schema = yup
  .object({
    emailId: yup
      .string()
      .email(global.validationLabel.validEmail)
      .required(global.validationLabel.emailRequired),
  })
  .required();

const ResetPassword = ({ setToggleResetPassword, toggleResetPassword }) => {
  const { loading } = useSelector((state: any) => state.app);
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordProps>({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const [showMailSentMessage, setShowMailSentMessage] = useState(false);

  const successCallBack = (data, res) => {
    dispatch(hideLoader());
    if (res?.data?.code === 200) {
      setShowMailSentMessage(true);
    } else {
      Toaster(res?.data?.code, res?.data?.message);
    }
  };

  const onSubmit = details => {
    setShowMailSentMessage(false);
    dispatch(showLoader());
    const data = {
      email: details.emailId,
    };
    postData(ProfileResetPassword, data, successCallBack);
  };

  return (
    <Col span={24} className="main-space-remove">
      <div className="setting-profile-group setting-profile-group-info card">
        <div className="setting-profile-head reset-head reset-head-info">
          <h3>
            <span>
              <Link
                to={'#'}
                onClick={() => setToggleResetPassword(!toggleResetPassword)}
              >
                <img src={icon_02} alt="icon" />{' '}
              </Link>
            </span>
            {findLabelText(
              'Reset_password',
              ResetPasswordFields.resetPassword,
              TabNames.settings,
            )}
          </h3>
        </div>
        <div className="organisation-settings border-bottom-0">
          <Row>
            <Col span={24}>
              <div className="reset-pass-setting reset-pass-setting-info">
                <p>
                  {findLabelText(
                    'Enter_your_email_and_well_send_you_a_link_to_reset_your_password',
                    Descriptions.resetPasswordDesc,
                    TabNames.settings,
                  )}
                </p>
              </div>
            </Col>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="reset-input-group">
                <Controller
                  name="emailId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <input
                        value={value ? value : ''}
                        onChange={val => {
                          onChange(val);
                          trigger('emailId');
                        }}
                        maxLength={validationSchema.email.maxLength}
                        className="form-control"
                        type="text"
                        placeholder={findLabelText(
                          'Email_address',
                          ResetPasswordFields.emailAddress,
                          'Log_in',
                        )}
                      />
                      {errors['emailId'] && errors['emailId']?.message ? (
                        <label className="error-message-text-style">
                          {errors['emailId']?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              <div className="reset-input-btn">
                <button
                  type="submit"
                  className={
                    loading ? 'btn btn-primary disable' : 'btn btn-primary'
                  }
                  disabled={loading}
                >
                  {findLabelText(
                    'Reset_password',
                    ResetPasswordFields.resetPassword,
                    TabNames.settings,
                  )}
                </button>
              </div>
              {showMailSentMessage && (
                <div className="email-sent-info">
                  <div className="email-sent-icon">
                    <img src={send_icon} alt="icon" />{' '}
                  </div>
                  <div className="email-sent-content">
                    <h4>
                      {findLabelText(
                        'Email_sent',
                        ResetPasswordFields.emailSent,
                        TabNames.settings,
                      )}
                    </h4>
                    <p>
                      {findLabelText(
                        'Check_your_email_and_open_the_link_we_sent_you_to_continue',
                        Descriptions.mailSentDesc,
                        TabNames.settings,
                      )}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </Row>
        </div>
      </div>
    </Col>
  );
};

export default ResetPassword;
