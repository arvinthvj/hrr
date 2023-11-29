import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { LoginLabel } from '../../../components/loginComponents/constants';
const ReCaptcha = ({
  captchaRef,
  setCaptchaFlag,
  captchaFlag,
  orgWebSiteError,
  formik,
}) => {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-5 col-md-6 col-sm-12">
          <div className="trail-terms">
            <p>
              {LoginLabel.clicking_Sign_up}
              &nbsp;
              <a
                href="https://hybridhero.com/tc-uk/"
                target={'_blank'}
                rel="noreferrer"
              >
                {LoginLabel.Terms_Conditions}
              </a>
            </p>
            <p>
              {LoginLabel.please_read_HybridHero}
              &nbsp;
              <a
                href="https://hybridhero.com/privacy-policy/"
                target={'_blank'}
                rel="noreferrer"
              >
                {LoginLabel.Privacy_Policy}
              </a>
            </p>
          </div>
        </div>
        <div className="col-xl-6 col-lg-7  col-md-6 col-sm-12">
          <div className="trail-captcha">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA}
              onChange={value => {
                value ? setCaptchaFlag(true) : setCaptchaFlag(false);
              }}
              ref={captchaRef}
              // size={"compact"}
              size={'normal'}
            />
          </div>
          <div
            className={
              captchaFlag && orgWebSiteError == null
                ? 'trail-btn '
                : 'trail-btn fadeSubmit'
            }
            onClick={() => {
              !captchaFlag || orgWebSiteError ? {} : formik.handleSubmit();
            }}
          >
            <button className="btn" disabled={!captchaFlag}>
              {LoginLabel.Let_go}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReCaptcha;
