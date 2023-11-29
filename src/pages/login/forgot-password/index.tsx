import React, { useEffect, useState } from 'react';
import { HDPlusLogo } from '../../../components/imagepath';
import { Controller, useForm } from 'react-hook-form';
import {
  emailValidation,
  minLengthValidation,
  requiredValidation,
  validationSchema,
} from '../../../components/validation';
import { Link, useNavigate } from 'react-router-dom';
import { loginUrl } from '../../../assets/constants/pageurl';
import { postData } from '../../../services/apicall';
import Toaster from '../../../components/toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { loginWithTenantUrl } from '../../../assets/constants/pageurl';
import {
  RootReduxProps,
  TenantDetail,
} from '../../../reduxStore/reduxInterface';
import { ForgotPasswordProps } from '../../../assets/globals/typeConstants';
import { LoginLabel } from '../../../components/loginComponents/constants';
type DataProps = {
  email: string;
  tenant_name: string | undefined;
  tenant_id: string | number | undefined;
};
const ForgotPassword: React.FC = () => {
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<ForgotPasswordProps>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tenantDetails } = useSelector((state: RootReduxProps) => state.app);
  const [isSubmitButton, setSubmitButton] = useState(false);
  const getTenantDetails: TenantDetail | null =
    tenantDetails?.length > 0 ? tenantDetails[0] : null;
  const formKeys = {
    emailId: 'emailId',
    password: 'password',
  };
  useEffect(() => {
    if (getTenantDetails?.tenant_name) {
    } else {
      navigate(loginWithTenantUrl);
    }
  }, []);

  const successCallBack = (data, res) => {
    dispatch(hideLoader());
    Toaster(res?.data?.code, res?.data?.message);
    if (res?.data?.code == '200') {
      handleGoHomeClicked();
      navigate('/');
    }
  };
  const onSubmit = details => {
    dispatch(showLoader());
    const data: DataProps = {
      email: details.emailId,
      tenant_name: getTenantDetails?.tenant_name,
      tenant_id: getTenantDetails?.tenant_id,
    };
    postData('/auth/api/forgetPassword', data, successCallBack);
  };

  const handleGoHomeClicked = () => {
    setSubmitButton(!isSubmitButton);
  };

  return (
    <>
      <div className="login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="login-set">
              <div className="loginbox login-inner-box">
                <div className="text-center login-logo">
                  <Link to="#">
                    <img src={HDPlusLogo} alt="" />
                  </Link>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group">
                    <Controller
                      name="emailId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <input
                            value={value}
                            onChange={val => {
                              onChange(val);
                              trigger('emailId');
                            }}
                            maxLength={validationSchema.email.maxLength}
                            className="form-control"
                            type="text"
                            placeholder={LoginLabel.Email_address}
                          />
                          {errors[formKeys.emailId] &&
                          errors[formKeys.emailId]?.message ? (
                            <label className="error">
                              {errors[formKeys.emailId]?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                      rules={{
                        required: requiredValidation('Email id'),
                        validate: { emailValidation },
                        minLength: minLengthValidation(
                          validationSchema.email.minLength,
                        ),
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <button
                      type="submit"
                      className={
                        !isSubmitButton
                          ? 'btn btn-primary disable'
                          : 'btn btn-primary'
                      }
                      disabled={!isSubmitButton ? false : true}
                    >
                      {LoginLabel.password_reset}
                    </button>
                  </div>
                </form>
                <div className="forgotpass" onClick={handleGoHomeClicked}>
                  <Link to={loginUrl}>{LoginLabel.Go_back}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
