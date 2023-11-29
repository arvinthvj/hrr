import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../services/apicall';
import {
  hideLoader,
  profileSettingImage,
  setBaseUrl,
  setCompLogo,
  setLoginToken,
  setLoginTokenExpires,
  setRefreshToken,
  setUserDetails,
  setWebSessionTimeOut,
  showLoader,
  storeRememberMeDetails,  
} from '../../reduxStore/appSlice';
import Toaster from '../../components/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CryptographyKey, SodiumPlus } from 'sodium-plus';
import { keyEnv, nonceEnv } from '../../assets/constants/config';
import { useEffect } from 'react';
import { global } from '../../assets/constants/config';
import { Auth, Hub } from 'aws-amplify';
import { authLogin, termsServices } from '../../services/apiurl';
import { loginWithTenantUrl } from '../../assets/constants/pageurl';
import { LoginProps } from '../../assets/globals/typeConstants';
import { RootReduxProps, TenantDetail } from '../../reduxStore/reduxInterface';
import { LoginLabel } from '../../components/loginComponents/constants';
import { useCookies } from 'react-cookie';
import { store } from '../../reduxStore';

const schema = yup
  .object({
    emailId: yup
      .string()
      .email(global.validationLabel.validEmail)
      .required(global.validationLabel.emailRequired),
    password: yup.string().required(global.validationLabel.passwordRequired),
  })
  .required();
const Login = () => {
  const dispatch = useDispatch();
  const { tenantDetails } = useSelector((state: RootReduxProps) => {
    return state.app;
  });
  const navigate = useNavigate();
  const getTenantDetails: TenantDetail | null =
    tenantDetails?.length > 0 ? tenantDetails[0] : null;
  useEffect(() => {
    if (getTenantDetails?.tenant_name) {
    } else {
      navigate(loginWithTenantUrl);
    }
  }, []);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
  });
  const reName = localStorage.getItem('rememnerme');
  const rememnermeData: string = reName ? JSON.parse(reName) : '';
  const [rememberPasswordFlag, setRememberPasswordFlag] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies<any>();
  const submitForm = async details => {
    const preparData = {
      email: details?.emailId,
      password: String(details?.password),
      tenant_name: getTenantDetails?.tenant_name
        ? getTenantDetails?.tenant_name
        : '',
      tenant_id: getTenantDetails?.tenant_id,
    };
    doLogin(preparData, false);
  };
  const getExpireTimeFromToken = jwtString => {
    const [header, payload, signature] = jwtString.split('.');
    const decodedHeader = JSON.parse(base64UrlDecode(header));
    const decodedPayload = JSON.parse(base64UrlDecode(payload));
    dispatch(setLoginTokenExpires(decodedPayload?.exp * 1000));
  };
  const base64UrlDecode = base64Url => {
    const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);
  };
  const doLogin = async (preparData, isSSOLogin) => {
    dispatch(showLoader());
    try {
      postData(authLogin, preparData, (data, res) => {
        if (res?.data?.data) {
          if (!isSSOLogin) {
            if (rememberPasswordFlag) {
              dispatch(storeRememberMeDetails(preparData));
            } else {
              dispatch(storeRememberMeDetails({}));
              localStorage.setItem('rememnerme', JSON.stringify(''));
            }
          }
          dispatch(setCompLogo(data?.company_logo));
          dispatch(profileSettingImage(data?.profile_photo));
          dispatch(setBaseUrl(data?.base_url));
          dispatch(setUserDetails(data));
          data?.session_expire_time &&
            dispatch(
              setWebSessionTimeOut(
                parseInt(data?.session_expire_time) * 60 * 1000,
              ),
            );
          dispatch(setLoginToken(res?.data?.access_token));
          dispatch(setRefreshToken(res?.data?.refresh_token));
          const expireTime = data?.session_expire_time
            ? parseInt(data?.session_expire_time) * 60 * 1000
            : store?.getState()?.app?.webSessionTimeOut;
          const expires = new Date(Date.now() + expireTime);
          getExpireTimeFromToken(res?.data?.access_token);
          setCookie('token', res?.data?.access_token, { path: '/', expires });
          setCookie('accessToken', res?.data?.access_token, {
            path: '/',
            expires,
          });
          setCookie('refreshToken', res?.data?.access_token, { path: '/' });
          setTimeout(() => {
            if (data?.is_login === 0) window.location.href = termsServices;
            dispatch(hideLoader());
          }, 1000);
        } else {
          Toaster(res?.data?.code, res?.data?.message);
          dispatch(hideLoader());
        }
      });
    } catch {
      dispatch(hideLoader());
    }
  };
  async function decryptMessage(ciphertextHex, nonceHex, keyHex) {
    let sodium;
    if (!sodium) sodium = await SodiumPlus.auto();
    const ciphertext = Buffer.from(ciphertextHex, 'hex');
    const nonce = Buffer.from(nonceHex, 'hex');
    const key = CryptographyKey.from(keyHex, 'hex');
    return sodium.crypto_secretbox_open(ciphertext, nonce, key);
  }

  const handleRememberMeClicked = () => {
    setRememberPasswordFlag(!rememberPasswordFlag);
  };

  useEffect(() => {
    if (rememnermeData) {
      const nonceHex = process.env.REACT_APP_NONCE_CODE || nonceEnv;
      const keyHex = process.env.REACT_APP_KEY_CODE || keyEnv;
      new Promise(() => {
        try {
          decryptMessage(rememnermeData, nonceHex, keyHex).then(plaintext => {
            const result = JSON.parse(new TextDecoder().decode(plaintext));
            if (result.email) {
              setValue('emailId', result.email);
              setRememberPasswordFlag(true);
            }
            if (result.password) {
              setRememberPasswordFlag(true);
              setValue('password', result.password);
            }
          });
        } catch (error) {}
      }).then(d => {});
    }
  }, []);
  const onNameChange = async (value, fieldName) => {
    const valid = await trigger(fieldName);
  };
  useEffect(() => {
    try {
      const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
        switch (event) {
          case 'signIn':
            if (data?.signInUserSession?.idToken?.payload) {
              const playload = data?.signInUserSession?.idToken?.payload;
              let groups = '';
              if (playload?.identities?.length > 0) {
                if (playload?.identities[0]?.providerName == 'Okta') {
                  const getIss = playload?.iss.split('com/')[1];
                  groups = getIss + '_Okta';
                } else {
                  groups = playload['cognito:groups'][1];
                }
              } else {
                groups = playload['cognito:groups'][1];
              }
              const email = playload.email;
              if (groups) {
                const preparData = {
                  email: email,
                  org_name: groups,
                  tenant_name: getTenantDetails?.tenant_name
                    ? getTenantDetails?.tenant_name
                    : '',
                  tenant_id: getTenantDetails?.tenant_id,
                };
                doLogin(preparData, false);
              } else {
                Toaster(
                  '400',
                  'This email is not matching with our organization.',
                );
              }
            }
            break;
          case 'signOut':
            break;
          case 'customOAuthState':
            break;
          default:
            return;
        }
      });
      Auth.currentAuthenticatedUser()
        .then(currentUser => {
          if (currentUser?.signInUserSession?.idToken?.payload) {
            const playload = currentUser?.signInUserSession?.idToken?.payload;
            let groups = '';
            if (playload?.identities?.length > 0) {
              if (playload?.identities[0]?.providerName == 'Okta') {
                const getIss = playload?.iss.split('com/')[1];
                groups = getIss + '_Okta';
              } else {
                groups = playload['cognito:groups'][1];
              }
            } else {
              groups = playload['cognito:groups'][1];
            }
            const email = playload.email;
            if (groups) {
              const preparData = {
                email: email,
                org_name: groups,
              };
              doLogin(preparData, false);
            } else {
              Toaster(
                '400',
                'This email is not matching with our organization.',
              );
            }
          }
        })
        .catch(() => {});
      return unsubscribe;
    } catch (error) {}
  }, []);
  return (
    <>
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
                            maxLength={64}
                            className="form-control"
                            type="text"
                            placeholder="Email address"
                          />
                          {errors?.emailId?.message ? (
                            <label className="error">
                              {errors?.emailId?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div className="input-group">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <>
                          <input
                            {...field}
                            value={value || ''}
                            onChange={({ target: { value } }) => {
                              onChange(value);
                              onNameChange(value, 'password');
                            }}
                            maxLength={30}
                            className="form-control"
                            type="password"
                            placeholder="Password"
                          />
                          {errors?.password?.message ? (
                            <label className="error">
                              {errors?.password?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div className="input-group">
                    <button type="submit" className="btn btn-primary">
                      {LoginLabel.Sign_in}
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

export default Login;
