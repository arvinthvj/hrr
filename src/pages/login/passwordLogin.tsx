import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
  setTenantDetails,
  setTenantList,
  setTermsPDFData,
  setUserDetails,
  setUserLoginEmail,
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
import { Amplify, Auth, Hub } from 'aws-amplify';
import {
  authLogin,
  tenantLoginUrl,
  termsServices,
} from '../../services/apiurl';
import {
  baseUrl,
  forgotPasswordUrl,
  loginWithTenantUrl,
  userLoginUrl,
} from '../../assets/constants/pageurl';
import { LoginProps } from '../../assets/globals/typeConstants';
import { RootReduxProps, TenantDetail } from '../../reduxStore/reduxInterface';
import {
  LoginLabel,
  SSOLoginStatus,
} from '../../components/loginComponents/constants';
import { useCookies } from 'react-cookie';
import { currentConfig } from '../../services/awsConfig';
import { store } from '../../reduxStore';
Amplify.configure(currentConfig);
const schema = yup
  .object({
    password: yup.string().required(global.validationLabel.passwordRequired),
  })
  .required();
const PasswordLogin = () => {
  const dispatch = useDispatch();
  const { tenantDetails } = useSelector((state: RootReduxProps) => {
    return state.app;
  });
  const { userLoginEmail, tenantList } = useSelector((state: any) => {
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
  const [rememberPasswordFlag, setRememberPasswordFlag] = useState(false);
  const [path, setPath] = useState<boolean>(true);
  const [error, setError] = useState<any>('');
  const [cookies, setCookie, removeCookie] = useCookies<any>();

  const submitForm = async details => {
    const preparData = {
      email: userLoginEmail?.user_email,
      password: String(details?.password),
      tenant_name: tenantList?.tenant_name
        ? tenantList?.tenant_name
        : userLoginEmail?.tenants?.[0]?.tenant_name,
      tenant_id: tenantList?.tenant_id
        ? tenantList?.tenant_id
        : userLoginEmail?.tenants?.[0]?.tenant_id,
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
  const Redirection = (data, res) => {
    dispatch(setCompLogo(data?.company_logo));
    dispatch(profileSettingImage(data?.profile_photo));
    dispatch(setBaseUrl(data?.base_url));
    dispatch(setUserDetails(data));
    data?.session_expire_time &&
      dispatch(
        setWebSessionTimeOut(parseInt(data?.session_expire_time) * 60 * 1000),
      );
    dispatch(setLoginToken(res?.data?.access_token));
    dispatch(setRefreshToken(res?.data?.refresh_token));
    const expireTime = data?.session_expire_time
      ? parseInt(data?.session_expire_time) * 60 * 1000
      : store?.getState()?.app?.webSessionTimeOut;
    const expires = new Date(Date.now() + expireTime);
    getExpireTimeFromToken(res?.data?.access_token);
    setCookie('token', res?.data?.access_token, { path: '/', expires });
    setCookie('accessToken', res?.data?.access_token, { path: '/', expires });
    setCookie('refreshToken', res?.data?.access_token, { path: '/' });
    setTimeout(() => {
      if (data?.is_login === 0) window.location.href = termsServices;
      dispatch(hideLoader());
    }, 1000);
  };
  const doLogin = async (preparData, isSSOLogin) => {
    dispatch(showLoader());
    try {
      postData(authLogin, preparData, (data, res) => {
        dispatch(hideLoader());
        if (res?.data?.data) {
          if (!isSSOLogin) {
            if (rememberPasswordFlag) {
              dispatch(storeRememberMeDetails(preparData));
            } else {
              dispatch(storeRememberMeDetails({}));
              localStorage.setItem('rememnerme', JSON.stringify(''));
            }
          }
          TenantCheck(data, res);
        } else {
          if (res?.code == 422) {
            setError(LoginLabel.PSWError);
          } else {
            Toaster(res?.data?.code, res?.data?.message);
          }
          dispatch(hideLoader());
        }
      });
    } catch {
      dispatch(hideLoader());
    }
  };
  const TenantCheck = (loginData, loginRes) => {
    dispatch(showLoader());
    const preparData = {
      org_name: tenantList?.tenant_name
        ? tenantList?.tenant_name
        : userLoginEmail?.tenants?.[0]?.tenant_name,
    };
    postData(tenantLoginUrl, preparData, (data, res) => {
      dispatch(hideLoader());
      if (res.data?.code == SSOLoginStatus.StatusCode) {
        dispatch(setTermsPDFData(data));
        Redirection(loginData, loginRes);
      } else {
        Redirection(loginData, loginRes);
      }
    });
  };
  async function decryptMessage(ciphertextHex, nonceHex, keyHex) {
    let sodium;
    if (!sodium) sodium = await SodiumPlus.auto();
    const ciphertext = Buffer.from(ciphertextHex, 'hex');
    const nonce = Buffer.from(nonceHex, 'hex');
    const key = CryptographyKey.from(keyHex, 'hex');
    return sodium.crypto_secretbox_open(ciphertext, nonce, key);
  }
  const chooseType = () => {
    if (tenantList?.tenant_name) {
      if (tenantList?.web_identity_provider != 0) {
        return true;
      }
    } else if (userLoginEmail?.tenants?.length == 1) {
      if (userLoginEmail?.tenants?.[0]?.web_identity_provider != 0) {
        return true;
      }
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (chooseType()) {
      // dispatch(showLoader());
      setPath(false);
    } else {
      setPath(true);
    }
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
    setError('');
    const valid = await trigger(fieldName);
  };
  const signOut = async () => {
    try {
      await Auth.signOut();
      // Additional actions after sign out, such as redirecting the user
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };
  const SignIn = (data, errorToast) => {
    dispatch(hideLoader());
    if (data?.signInUserSession?.idToken?.payload && chooseType()) {
      console.log('Initial successs SSO', data);
      const playload = data?.signInUserSession?.idToken?.payload;
      let groups = '';
      let email = '';
      if (playload?.identities?.length > 0) {
        if (playload?.identities[0]?.providerName == 'Okta') {
          const getIss = playload?.iss.split('com/')[1];
          groups = getIss + '_Okta';
        } else {
          groups = playload['cognito:groups'][0];
        }
      } else {
        groups = playload['cognito:groups'][1];
      }
      if (playload.email) {
        email = playload?.email;
      } else if (playload?.identities[0]?.userId) {
        email = playload?.identities[0]?.userId;
      }
      if (groups) {
        const preparData = {
          email: email,
          org_name: groups,
          tenant_name: tenantList?.tenant_name
            ? tenantList?.tenant_name
            : userLoginEmail?.tenants?.[0]?.tenant_name,
          tenant_id: tenantList?.tenant_id
            ? tenantList?.tenant_id
            : userLoginEmail?.tenants?.[0]?.tenant_id,
        };
        if (
          userLoginEmail?.user_email?.toLowerCase().trim() ===
          email?.toLowerCase().trim()
        ) {
          doLogin(preparData, false);
        } else if (
          userLoginEmail?.user_email &&
          email &&
          tenantList?.login_type != 2
        ) {
          errorToast && Toaster('400', 'Email IDs do not match!');
          dispatch(setTenantList(''));
          dispatch(setTenantDetails(''));
          !tenantList?.tenant_name && dispatch(setUserLoginEmail(''));
          navigate(tenantList?.tenant_name ? userLoginUrl : baseUrl);
        }
      } else {
        Toaster('400', 'This email is not matching with our organization.');
      }
    }
  };
  useEffect(() => {
    try {
      // const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      //   dispatch(hideLoader());
      //   switch (event) {
      //     case "signIn":
      //       SignIn(data, false);
      //       break;
      //     case "signOut":
      //       break;
      //     case "customOAuthState":
      //       break;
      //     default:
      //       return;
      //   }
      // });
      const errorSubscription = Hub.listen('auth', data => {
        if (data.payload.event === 'signIn_failure') {
          // Handle the authentication error here
          console.error('Authentication Error:', data.payload.data);
        } else if (data.payload.event === 'API') {
          // Handle API error
          console.error('API Error:', data.payload.data);
        } else if (data.payload.event === 'storage') {
          // Handle storage error
          console.error('Storage Error:', data.payload.data);
        } else if (data.payload.event === 'parsingCallbackUrl') {
          // Handle parsingCallbackUrl error
          console.error('Error:', data);
          Toaster('400', 'Hub error');
        }
        // Add more conditions as needed to handle other error events
      });
      Auth.currentAuthenticatedUser()
        .then(currentUser => {
          SignIn(currentUser, true);
        })
        .catch(e => {});
      return errorSubscription;
      // return unsubscribe;
    } catch (e) {
      console.log(e, 'e');
    }
  }, []);
  return (
    <>
      {path ? (
        <>
          <form onSubmit={handleSubmit(submitForm)}>
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
              {error && <label className="error">{error}</label>}
            </div>
          </form>
          <div className="forgotpass">
            <Link to={forgotPasswordUrl}>{LoginLabel.Forgot_password}</Link>
          </div>
        </>
      ) : (
        <>
          <div className="loading-page">
            <p>Loading ....</p>
          </div>
          <div className="forgotpass">
            <Link to={baseUrl}>{LoginLabel.Go_back}</Link>
          </div>
        </>
      )}
    </>
  );
};

export default PasswordLogin;
