import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../services/apicall';
import {
  getAwsData,
  hideLoader,
  setTenantDetails,
  setTenantList,
  setUserLoginEmail,
  showLoader,
} from '../../reduxStore/appSlice';
import Toaster from '../../components/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { global } from '../../assets/constants/config';
import { userLoginEmail } from '../../services/apiurl';
import { createAccount, userLoginUrl } from '../../assets/constants/pageurl';
import {
  LoginLabel,
  LoginStatus,
  SSOLoginStatus,
} from '../../components/loginComponents/constants';
import { handleFederatedSignIn } from './authUtils';
type Tenant = {
  tenant_id: number;
  tenant_name: string;
  login_type: string | number;
  web_identity_provider: number | string;
};
type TenantProps = {
  emailId: string;
};
type PrepareDataProps = {
  email: string;
};
const schema = yup
  .object({
    emailId: yup
      .string()
      .email(global.validationLabel.validEmail)
      .required(global.validationLabel.emailRequired),
  })
  .required();
const LoginWithTenant: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { AwsData } = useSelector((state: any) => {
    return state.app;
  });
  const [error, setError] = useState<any>('');
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<TenantProps>({
    resolver: yupResolver(schema),
  });
  const submitForm = async details => {
    const preparData = {
      email: details?.emailId,
    };
    doLogin(preparData, false, details?.emailId);
  };

  useEffect(() => {
    dispatch(setTenantDetails([]));
  }, []);
  const doLogin = async (preparData: PrepareDataProps, isSSOLogin, email) => {
    dispatch(showLoader());
    try {
      postData(userLoginEmail, preparData, (data, res) => {
        dispatch(hideLoader());
        if (res.data?.code == LoginStatus.success) {
          dispatch(setUserLoginEmail(data));
          dispatch(setTenantList(''));
          if (parseInt(data?.tenant_counts) >= SSOLoginStatus.TenantCount) {
            navigate(userLoginUrl);
          } else {
            const value: Tenant | undefined = data?.tenants?.[0];
            dispatch(setTenantDetails(data?.tenants));
            dispatch(getAwsData(AwsData));
            handleFederatedSignIn(value, navigate);
          }
        } else {
          if (res?.data?.code == LoginStatus.ErrorEmail) {
            setError(LoginLabel.EmailError);
          } else {
            Toaster(res?.data?.code, res?.data?.message);
          }
        }
      });
    } catch {
      dispatch(hideLoader());
    }
  };
  const onNameChange = async (value, fieldName) => {
    setError('');
    const valid = await trigger(fieldName);
  };
  const handleNavigate = () => {
    navigate(createAccount);
  };

  return (
    <>
      <div className="cardContainer-for-account">
        <div className="tenant-login-need-account-text">
          <span>{LoginLabel.Need_account}</span>
        </div>
        <button className="btn-outline-tenant-login" onClick={handleNavigate}>
          {LoginLabel.Start_today}
        </button>
      </div>
      <div className="login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="login-set">
              <div className="loginbox">
                <div className="text-center login-logo">
                  <Link to="#">
                    <img src={HDPlusLogo} alt="logo" height={102} width={109} />
                  </Link>
                </div>
                <div className="tenantLoginLabel">
                  <span>{LoginLabel.Log_account}</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="input-group addres-group">
                    <Controller
                      name="emailId"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <>
                          <input
                            {...field}
                            value={value || ''}
                            onChange={({ target: { value } }) => {
                              onChange(value);
                              onNameChange(value, 'emailId');
                            }}
                            className="form-control"
                            type="text"
                            placeholder="Company email address"
                          />
                          {errors?.emailId?.message ? (
                            <label className="error">
                              {errors?.emailId?.message}
                            </label>
                          ) : null}
                          {error && <label className="error">{error}</label>}
                        </>
                      )}
                    />
                  </div>

                  <div className="input-group">
                    <button type="submit" className="btn btn-primary">
                      {LoginLabel.Continue}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginWithTenant;
