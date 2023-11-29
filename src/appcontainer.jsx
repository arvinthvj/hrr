import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RouteObject } from './routes/path';
import AuthRoute from './routes/AuthRoute';
import UnAuthRoute from './routes/UnAuthRoute';
import {
  confirmPassword,
  createAccount,
  dashboardUrl,
  forgotPasswordUrl,
  loginUrl,
  loginWithTenantUrl,
  pageNotFound,
  profileResetPasswordUrl,
  termServiceUrl,
  userLogin,
} from './assets/constants/pageurl';
import ForgotPassword from './pages/login/forgot-password';
import ConfirmPassword from './pages/login/confirmPassword';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetQuickBookEditOpen,
  SetScheduleBookOpen,
  setQuickBookState,
} from './reduxStore/quickBookSlice';
import LoadingSpinner from './components/spinner';
import {
  getAwsData,
  hideAllLoader,
  hideLoader,
  profileSettingImage,
  setShowMobileMenu,
  setUserDetails,
  showLoader,
} from './reduxStore/appSlice';
import { getDecryptedData, postData } from './services/apicall';
import { Sidebartwo } from './components/sidebar/sidebar';
import { Headertwo } from './components/header/header';
import LoginWithTenant from './pages/login/loginWithTenant';
import CreateAccount from './pages/login/start-free-trial/createAccount';
import { ULAPages } from './assets/constants/pageurl';
import NotFound from './pages/notFound';
import SelectTenant from './pages/login/selectTenant';
import UserLogin from './pages/login/userLogin';
import { Cookies } from 'react-cookie';
import { store } from './reduxStore';
import { activityEvents, en_us_format_date } from './assets/constants/config';
import { _doLogout, getExpireTimeFromToken } from './components/commonMethod';
import { getSecretValueFromKeyVault } from './services/s3Bucket';
import { refreshTokenAPI } from './services/axioservice';
import {
  GetUserMenuList,
  UserTimezoneDetails,
  getProfileDatas,
  getIntercomSecret
} from './services/apiurl';
const AWS = require('aws-sdk');
import { getDataWithToken } from './services/apiservice';
const unAuth = [
  {
    id: 1,
    path: loginUrl,
    element: <UserLogin />,
  },
  {
    id: 2,
    path: forgotPasswordUrl,
    element: <ForgotPassword />,
  },
  {
    id: 3,
    path: confirmPassword,
    element: <ConfirmPassword />,
  },
  {
    id: 4,
    path: loginWithTenantUrl,
    element: <LoginWithTenant />,
  },
  {
    id: 5,
    path: profileResetPasswordUrl,
    element: <ConfirmPassword />,
  },
  {
    id: 6,
    path: createAccount,
    element: <CreateAccount />,
  },
  {
    id: 7,
    path: pageNotFound,
    element: <NotFound />,
  },
  {
    id: 8,
    path: userLogin,
    element: <SelectTenant />,
  },
];

const AppContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, userDetails, showMobileMenu } = useSelector(
    state => state.app,
  );
  const [showHeader, setShowHeader] = useState(false);
  const navigate = useNavigate();
  const { menuList } = userDetails;
  const AuthPathName = [];
  const cookies = new Cookies();
  const boot = async (intercomSecretValue)=>{
    if(userDetails?.is_login == 1){
      window.Intercom('boot',{
        api_base: intercomSecretValue.INTERCOM_API_BASE,
        app_id: intercomSecretValue.INTERCOM_APP_ID,
        name: userDetails?.display_name,
        email: userDetails?.email,
        user_id: userDetails?.tenant_info?.tenant_name + userDetails?.email,
        company: {
          name: userDetails?.tenant_info?.tenant_name,
          id: userDetails?.tenant_info?.tenant_id
        },
        user_hash: userDetails?.hash                
      })
    }else{
      window.Intercom('boot',{
        api_base: intercomSecretValue.INTERCOM_API_BASE,
        app_id: intercomSecretValue.INTERCOM_APP_ID,
      })
    }
  }
  const getIntercomSecretVAlue =async() =>{
    const interComresult = await getDataWithToken(getIntercomSecret);
    if(interComresult){
      boot(interComresult)
    }
  }

  useEffect(() => {
    getIntercomSecretVAlue()    
  },[])

  useEffect(() => {
    const activityListener = () => {
      let existingAccessToken = cookies?.get('accessToken');
      let expireTime = store?.getState()?.app?.webSessionTimeOut;
      if (existingAccessToken) {
        const exp = store?.getState()?.app?.expire;
        const call_refresh = store?.getState()?.app?.callRefresh;
        const shouldRefreshTime = Math.round(exp - 60 * 1000 - Date.now());
        if (shouldRefreshTime <= 0 && call_refresh) {
          refreshTokenAPI();
        }
        let expires = new Date(Date.now() + expireTime);
        cookies.set('accessToken', existingAccessToken, { path: '/', expires });
      }
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, activityListener);
    });

    // Clean up event listeners on unmount
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, activityListener);
      });
    };
  }, []);

  const getUserProfile = userId => {
    postData(getProfileDatas, '', (data, res) => {
      if (res?.data?.code == 200) {
        dispatch(profileSettingImage(data?.profile_photo));
        getTimeZoneDetails(userId, data);
      }
    });
  };

  const getTimeZoneDetails = (userId, userData) => {
    const payload = { user_id: userId };
    if (userId)
      postData(UserTimezoneDetails, payload, (data, res) => {
        if (res?.data?.code == 200) {
          const userDetailsCopy = JSON.parse(JSON.stringify(userData));
          userDetailsCopy['alias_name'] = data?.alias_name;
          userDetailsCopy['location'] = [data?.location];
          userDetailsCopy['timezone'] = data?.timezone;
          userDetailsCopy['timezone_id'] = data?.timezone_id;
          userDetailsCopy['default_workspace_timezone_id'] =
            data?.default_workspace_timezone_id;
          userDetailsCopy['default_workspace_timezone_name'] =
            data?.default_workspace_timezone_name;
          userDetailsCopy['default_workspace_timezone_alias_name'] =
            data?.default_workspace_timezone_alias_name;
          userDetailsCopy['default_room_timezone_id'] =
            data?.default_room_timezone_id;
          userDetailsCopy['default_room_timezone_name'] =
            data?.default_room_timezone_name;
          userDetailsCopy['default_room_timezone_alias_name'] =
            data?.default_room_timezone_alias_name;
          userDetailsCopy['default_parking_timezone_id'] =
            data?.default_parking_timezone_id;
          userDetailsCopy['default_parking_timezone_name'] =
            data?.default_parking_timezone_name;
          userDetailsCopy['default_parking_timezone_alias_name'] =
            data?.default_parking_timezone_alias_name;

          getUserMenuList(userDetailsCopy);
        }
      });
  };

  const getUserMenuList = userData => {
    postData(GetUserMenuList, {}, (data, res) => {
      if (res?.data?.code == 200) {
        const userDetailCopy = JSON.parse(JSON.stringify(userData));
        userDetailCopy['menuList'] = data?.menuList;
        userDetailCopy['roles'] = data?.roles;
        userDetailCopy['permission_group_id'] = data?.permission_group_id;
        dispatch(setUserDetails(userDetailCopy));
      }
    });
  };

  useEffect(() => {
    dispatch(setQuickBookState('close'));
    dispatch(SetScheduleBookOpen(false));
    dispatch(SetQuickBookEditOpen({ openState: false }));

    const userId = cookies?.get('accessToken')
      ? getExpireTimeFromToken(cookies?.get('accessToken'))?.user_id
      : '';
    let unAuthPathName = unAuth?.map(val => val?.path);
    unAuthPathName?.push('/terms-sevices');
    if (unAuthPathName?.includes(location?.pathname) && loading > 0) {
      setTimeout(() => {
        console.log('loader stopped');
        dispatch(hideAllLoader());
      }, 5000);
    }
    menuList?.map(v => {
      if (v?.type == 'user') {
        ULAPages.user
          .filter(g => g?.name.toLowerCase() == v?.name.toLowerCase())
          .map(c => c?.path.map(o => AuthPathName.push(o)));
      }
      if (v?.type == 'admin') {
        ULAPages.admin
          .filter(g => g?.name.toLowerCase() == v?.name.toLowerCase())
          .map(c => c?.path.map(o => AuthPathName.push(o)));
      }
      if (v?.type == 'super_admin') {
        ULAPages.super_admin
          .filter(g => g?.name.toLowerCase() == v?.name.toLowerCase())
          .map(c => c?.path.map(o => AuthPathName.push(o)));
      }
    });
    ULAPages.commonpages.map(g => AuthPathName.push(g));
    AuthPathName.includes(location?.pathname)
      ? setShowHeader(true)
      : setShowHeader(false);
    let validPath =
      unAuthPathName?.includes(location?.pathname) ||
      AuthPathName.includes(location?.pathname);
    if (validPath && userDetails?.id == userId)
      navigate(location?.pathname + location?.search);
    else {
      if (userId) {
        getUserProfile(userId);
      }
      !validPath
        ? userDetails?.is_login == 1
          ? navigate(dashboardUrl)
          : navigate(loginWithTenantUrl)
        : location?.pathname == termServiceUrl
        ? userDetails?.is_login == 0
          ? navigate(termServiceUrl)
          : navigate(dashboardUrl)
        : '';
    }
  }, [location.pathname]);

  // const sscb = (data, res) => {
  //   console.log(data);
  //   setSecretValueInKeyVault('', data, res => {});
  //   data && getDecryptedData(data, ensb);
  // };
  // useEffect(() => {
  //   let data = {
  //     323: {
  //       domain: "hybridherosso.auth.eu-west-1.amazoncognito.com",
  //       userPoolId: "eu-west-1_TBEGlCad0",
  //       userPoolWebClientId: "1hn5fjer8p9kkes734qjpqd810",
  //       identityPoolId: "eu-west-1:f3d01663-b928-4495-a92a-32ec571453f9",
  //       identityPoolRegion: "eu-west-1",
  //       identity_provider: "AzureMultitenant",
  //       clientScretId: "gsf0sd5un6d80ncjd8ifv89ns838kmodftoh9cq15h4hc7kh6gs",
  //     },
  //     519: {
  //       domain: "hybridherosso.auth.eu-west-1.amazoncognito.com",
  //       identityPoolId: "eu-west-1:f3d01663-b928-4495-a92a-32ec571453f9",
  //       identityPoolRegion: "eu-west-1",
  //       identity_provider: "microsoft",
  //       userPoolId: "eu-west-1_TBEGlCad0",
  //       userPoolWebClientId: "1hn5fjer8p9kkes734qjpqd810",
  //       clientScretId: "gsf0sd5un6d80ncjd8ifv89ns838kmodftoh9cq15h4hc7kh6gs",
  //     },
  //     mandatorySignIn: "false",
  //     redirectSignIn: "https://app2.hybridhero.com/login",
  //     redirectSignOut: "https://app2.hybridhero.com/",
  //     region: "eu-west-1",
  //     responseType: "token",
  //     signUpVerificationMethod: "token",
  //     domain: "hybridhero.auth.eu-west-1.amazoncognito.com",
  //     userPoolId: "eu-west-1_v2yAhog2m",
  //     userPoolWebClientId: "7baf1msf7f2m9b1gre8n49tj9n",
  //     identityPoolId: "eu-west-1:c9c6118b-d969-45f2-bf24-50a682d29f72",
  //     identityPoolRegion: "eu-west-1",
  //     clientScretId: "k5asef6m155g2g8nin7r8t4gmbe4n8ouomebc9nful29a9lqhqq",
  //   };
  //   DataEncrpt(data, sscb);
  // }, []);

  // Use the secret
  const ensb = (data, res) => {
    data && dispatch(getAwsData(data));
  };
  useEffect(() => {
    function fetchSecret() {
      try {
        getSecretValueFromKeyVault('', secret => {
          if (secret) {
            getDecryptedData(secret?.SecretString, ensb);
          }
        });
      } catch (error) {}
    }
    fetchSecret();
  }, []);
  const toggleMobileMenu = () => {
    dispatch(setShowMobileMenu(!showMobileMenu));
  };

  return (
    <>
      <div className={`main-wrapper ${showMobileMenu ? 'slide-nav' : ''}`}>
        {showHeader && userDetails?.is_login == 1 ? (
          <>
            <Sidebartwo />
            <Headertwo onMenuClick={() => toggleMobileMenu()} />
          </>
        ) : null}
        {loading > 0 && <LoadingSpinner />}
        <Routes>
          {unAuth?.map(item => (
            <Route
              key={item?.id}
              path={item?.path}
              element={<UnAuthRoute>{item?.element}</UnAuthRoute>}
            />
          ))}
          {RouteObject?.map(route => (
            <Route
              key={route?.id}
              path={route?.path}
              element={<AuthRoute>{route?.element}</AuthRoute>}
            />
          ))}
        </Routes>
        <div
          className={`sidebar-overlay ${showMobileMenu ? 'opened' : ''}`}
          onClick={() => toggleMobileMenu()}
        ></div>
      </div>
    </>
  );
};
export default AppContainer;
