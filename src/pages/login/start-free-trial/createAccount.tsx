import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trial_icon } from '../../../components/imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../services/apicall';
import {
  hideLoader,
  setTenantDetails,
  setTrialToken,
  showLoader,
} from '../../../reduxStore/appSlice';
import * as yup from 'yup';
import {
  countryAllOptions,
  countryCodeValues,
} from '../../../assets/constants/config';
import { StartFreetrial } from '../../../services/apiurl';
import { loginWithTenantUrl } from '../../../assets/constants/pageurl';
import { useFormik } from 'formik';
import CustomSelect from './customSelect';
import TrialModal from './trialModal';
import CodeSelect from './codeSelect';
import { getImageFroms3Bucket } from '../../../services/s3Bucket';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import { CreateAccountFormProps } from '../../../assets/globals/typeConstants';
import ReCaptcha from './reCaptcha';
import { LoginLabel } from '../../../components/loginComponents/constants';
const CreateAccount = () => {
  const [termsAndConditionPdf, setTermsAndConditionPdf] = useState('');
  const [showTrialModal, setShowTrialModal] = useState(false);
  const orgRef = useRef<HTMLInputElement>(null);
  const [successOrErrorModalMsg, setSuccessOrErrorModalMsg] = useState('');
  const [orgWebSiteError, setOrgWebSiteError] = useState<string | null>(null);
  useEffect(() => {
    getPdfUrl();
  }, []);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootReduxProps) => state.app);
  useEffect(() => {
    dispatch(setTenantDetails([]));
  }, []);
  const [mobileState, setMobileState] = useState<string>('');
  const [headCountState, setheadCountState] = useState<string>('');
  const handlemobileState = event => {
    const limit = 12;
    setMobileState(event.target.value.slice(0, limit));
  };
  const handleheadCountState = event => {
    const limit = 6;
    setheadCountState(event.target.value.slice(0, limit));
  };
  const initialValues: CreateAccountFormProps = {
    first_name: '',
    last_name: '',
    tenant_email: '',
    mobile_no: mobileState,
    country: '',
    organisation: '',
    organisation_count: headCountState,
    organisation_optional: '',
    country_code: '+01',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      first_name: yup.string().required('First Name is required'),
      tenant_email: yup.string().email().required('Email is required'),
      last_name: yup.string().required('Last Name is required'),
      country: yup.string().required('Country is required'),
      organisation: yup.string().required('Organisation is required'),
      country_code: yup.string().required('Code'),
      mobile_no: yup
        .string()
        .required('Phone no is required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(2, 'Phone no must be more than 1 digit')
        .max(12, 'Phone no must be less than 12 digits'),
      organisation_count: yup
        .number()
        .positive('Cannot be a negative number')
        .min(1, 'Please Enter a number >0')
        .max(250000, 'Organisation Headcount cannot be more than 2,50,000')
        .nullable()
        .required('Organisation Headcount is required'),
    }),
    onSubmit: value => {
      if (captchaFlag && orgWebSiteError == null) {
        dispatch(showLoader());
        postData(StartFreetrial, value, getTrial);
      }
    },
  });
  const getTrial = (data, res) => {
    dispatch(setTrialToken(''));
    dispatch(hideLoader());
    formik.resetForm();
    if (res?.data?.code == 200) {
      setSuccessOrErrorModalMsg('');
    } else {
      setSuccessOrErrorModalMsg(res?.data?.message);
    }
    setShowTrialModal(true);
    setMobileState('');
    setheadCountState('');
  };
  const [captchaFlag, setCaptchaFlag] = useState<boolean>(false);
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];
  const getPdfUrl = () => {
    getImageFroms3Bucket(
      'sample-terms-conditions-agreement_1679920123319.pdf',
      'image',
      data => {
        if (data) setTermsAndConditionPdf(data);
      },
      false,
      'ges',
    );
  };
  const captchaRef = useRef();
  // For removing duplicates in Country Code
  const filtered = countryCodeValues
    .filter(
      (obj, index) =>
        index === countryCodeValues.findIndex(item => item.value === obj.value),
    )
    .sort((a, b) => +a.value.replace('+', '') - +b.value.replace('+', ''));
  return (
    <div className="main-wrapper">
      <div className="content align-items-center">
        <div className="w-100 ">
          <div className="trial-left"></div>
          <div className="trial-right">
            <div className="trial-account-content">
              <div className="trial-header">
                <Link to="#">
                  <img src={Trial_icon} alt="" />
                </Link>
              </div>
              <div className="trial-account-details">
                <div className="login-text-details">
                  <h3>{LoginLabel.Create_account}</h3>
                  {/* <p>Get started in just 1 easy step</p> */}
                  <p>{LoginLabel.No_required}</p>
                </div>
                <div className="trial-form">
                  <form action="">
                    <div className="trial-form-group">
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder="First Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.first_name}
                        />
                        {formik.errors.first_name &&
                        formik.touched.first_name ? (
                          <label className="error">
                            {formik.errors.first_name}
                          </label>
                        ) : null}
                      </div>
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder="Last Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.last_name}
                        />
                        {formik.errors.last_name && formik.touched.last_name ? (
                          <label className="error">
                            {formik.errors.last_name}
                          </label>
                        ) : null}
                      </div>
                    </div>
                    <div className="trial-form-group">
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          type="text"
                          name="tenant_email"
                          id="email"
                          placeholder="Work Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.tenant_email}
                        />
                        {formik.errors.tenant_email &&
                        formik.touched.tenant_email ? (
                          <label className="error">
                            {formik.errors.tenant_email}
                          </label>
                        ) : null}
                      </div>
                      <div className="form-group freeTrial phoneDF">
                        <div className="left">
                          <CustomSelect
                            options={filtered}
                            value={formik.values.country_code}
                            placeholder="+1"
                            onChange={value =>
                              formik.setFieldValue('country_code', value.value)
                            }
                          />
                        </div>
                        <div className="right">
                          <input
                            type="number"
                            name="mobile_no"
                            id="mobile_no"
                            min={'0'}
                            className="form-control"
                            placeholder="Phone No"
                            onKeyDown={e =>
                              exceptThisSymbols.includes(e.key) &&
                              e.preventDefault()
                            }
                            // readOnly={disableNo}
                            value={mobileState}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onInput={handlemobileState}
                          />
                          {formik.errors.mobile_no &&
                          formik.touched.mobile_no ? (
                            <label className="error">
                              {formik.errors.mobile_no}
                            </label>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="trial-form-group">
                      <div className="form-group freeTrial">
                        <CodeSelect
                          options={countryAllOptions}
                          value={formik.values.country}
                          placeholder="Country"
                          onChange={value =>
                            formik.setFieldValue('country', value.value)
                          }
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.country && formik.touched.country ? (
                          <label className="error">
                            {formik.errors.country}
                          </label>
                        ) : null}
                      </div>
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          type="text"
                          name="organisation"
                          id="organisation"
                          placeholder="Organisation Name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.organisation}
                        />

                        {formik.errors.organisation &&
                        formik.touched.organisation ? (
                          <label className="error">
                            {formik.errors.organisation}
                          </label>
                        ) : null}
                      </div>
                    </div>
                    <div className="trial-form-group">
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          ref={orgRef}
                          // readOnly={disableOrg}
                          onKeyDown={e =>
                            exceptThisSymbols.includes(e.key) &&
                            e.preventDefault()
                          }
                          type="number"
                          name="organisation_count"
                          id="organisation_count"
                          value={headCountState}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onInput={handleheadCountState}
                          placeholder="Organisation Headcount (No.)"
                        />
                        {formik.errors.organisation_count &&
                        formik.touched.organisation_count ? (
                          <label className="error">
                            {formik.errors.organisation_count}
                          </label>
                        ) : null}
                      </div>
                      <div className="form-group freeTrial">
                        <input
                          className="form-control"
                          type="text"
                          name="organisation_optional"
                          id="organisation_optional"
                          placeholder="Organisation Website (Optional)"
                          // onChange={formik.handleChange}
                          onChange={val => {
                            formik.setFieldValue(
                              'organisation_optional',
                              val.target.value,
                            );
                            const validation = [
                              '.com',
                              '.in',
                              '.co',
                              '.au',
                              '.uk',
                            ];
                            const string = val.target.value;
                            //
                            const newStr = string.split('w.');
                            //
                            const last = newStr[newStr.length - 1];
                            //
                            if (
                              validation.some(v => last.includes(v)) ||
                              val.target.value == ''
                            ) {
                              setOrgWebSiteError(null);
                            } else {
                              setOrgWebSiteError('Enter valid website name');
                            }
                          }}
                          value={formik.values.organisation_optional}
                        />
                        {orgWebSiteError ? (
                          <label className="error">{orgWebSiteError}</label>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
                <ReCaptcha
                  captchaRef={captchaRef}
                  setCaptchaFlag={setCaptchaFlag}
                  captchaFlag={captchaFlag}
                  orgWebSiteError={orgWebSiteError}
                  formik={formik}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <TrialModal
          show={showTrialModal}
          confirm={() => {
            setShowTrialModal(false);
            window.location.href = loginWithTenantUrl;
          }}
          label={successOrErrorModalMsg}
        />
      }
    </div>
  );
};
export default CreateAccount;
