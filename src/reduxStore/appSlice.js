import { createSlice } from '@reduxjs/toolkit';
import { Amplify } from 'aws-amplify';
import { redirectToLogin } from '../assets/globals';
import { postData } from '../services/apicall';
import moment from 'moment';
import store from './store';
import { dateFormat_YYYY_MM_DD } from '../assets/constants/config';

const initialState = {
  loading: 0,
  userDetails: {},
  recentUrl: '',
  locationEdit: false,
  locationPaths: [],
  sideBarWidth: '',
  companyLogo: '',
  userLoginEmail: '',
  bottomcompanyLogo: '',
  baseURL: '',
  tenantList: '',
  sideBarData: [],
  updateUserDetails: [],
  floorRefs: false,
  saveChanges: false,
  blinkIcon: false,
  notificationTab: '',
  newNotificationReceived: false,
  newNotificationAllRecord: {},
  reqNotificationAllRecord: {},
  floorType: '',
  floorEditDetail: {},
  locationLevelList: [],
  rememberMeDetails: '',
  AwsData: {},
  token: '',
  fcmToken: '',
  orgDetail: {},
  showMobileMenu: false,
  selectedQuickBookAsset: {},
  tenantDetails: [],
  bookingAndNotificationCounts: {},
  expire: '',
  isResetAssest: true,
  userDateTimeFormat: {},
  userManagementBulkEdit: [],
  teamHierarchy: [],
  teamMemberAndAssetCount: {},
  webSessionTimeOut: 15 * 60 * 1000, // milliseconds
  callRefresh: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoader: state => {
      if (state.loading < 0) {
        state.loading = 1;
      } else {
        state.loading = state.loading + 1;
      }
    },
    handleLocationEdit: (state, { payload }) => {
      state.locationEdit = payload;
    },
    hideLoader: state => {
      state.loading = state.loading - 1;
    },
    hideAllLoader: state => {
      state.loading = 0;
    },
    setRecentUrl: (state, { payload }) => {
      const { pathname } = window.location;
      if (
        pathname == '/admin-settings-floor-details' ||
        pathname == '/admin-settings-location'
      ) {
        // Do nothing
      } else {
        state.locationPaths = [];
      }
      state.recentUrl = payload;
    },
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
    },
    setWebSessionTimeOut: (state, { payload }) => {
      state.webSessionTimeOut = payload;
    },
    setUserManagementBulkEdit: (state, { payload }) => {
      state.userManagementBulkEdit.push = payload;
    },
    removeUserManagementBulkEdit: state => {
      state.userManagementBulkEdit = [];
    },
    setUserDateTimeFormat: (state, { payload }) => {
      state.userDateTimeFormat = payload;
    },
    setLocationPaths: (state, { payload }) => {
      state.locationPaths = payload;
    },
    setTeamHierarchy: (state, {payload}) => {
      state.teamHierarchy = payload;
    },
    setTeamMemberAndAssetCount: (state, {payload}) => {
      state.teamMemberAndAssetCount = payload;
    },
    setSideBarWidth: (state, { payload }) => {
      state.sideBarWidth = payload;
    },
    logout: state => {
      state.loading = 0;
      state.response = '';
      state.userDetails = {};
      state.locationPaths = [];
      redirectToLogin();
    },
    setCompLogo: (state, { payload }) => {
      state.companyLogo = payload;
    },
    setBottomCompLogo: (state, { payload }) => {
      state.bottomcompanyLogo = payload;
    },
    setSideBarData: (state, { payload }) => {
      state.sideBarData = payload;
    },
    setUpdateUserDetails: (state, { payload }) => {
      state.updateUserDetails = payload;
    },
    setFloorRefs: (state, { payload }) => {
      state.floorRefs = payload;
    },
    setSaveChanges: (state, { payload }) => {
      state.saveChanges = payload;
    },
    updateNewNotificationFlag: (state, { payload }) => {
      state.newNotificationReceived = payload;
    },
    updateNotificationTab: (state, { payload }) => {
      state.notificationTab = payload;
    },
    updateBlinkIcon: (state, { payload }) => {
      state.blinkIcon = payload;
    },
    updateNotificationDetails: (state, { payload }) => {
      state.newNotificationAllRecord = payload;
    },

    updateRequestNotificationDetails: (state, { payload }) => {
      state.reqNotificationAllRecord = payload;
    },

    setFloorType: (state, { payload }) => {
      state.floorType = payload;
    },
    setFloorEditDetail: (state, { payload }) => {
      state.floorEditDetail = payload;
    },
    setLocationLevelList: (state, { payload }) => {
      state.locationLevelList = payload;
    },
    storeRememberMeDetails: (state, { payload }) => {
      state.rememberMeDetails = payload;
    },
    setBaseUrl: (state, { payload }) => {
      state.baseURL = payload;
    },
    setLoginToken: (state, { payload }) => {
      state.token = payload;
    },
    setFcmToken: (state, { payload }) => {
      state.fcmToken = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
    setLoginTokenExpires: (state, { payload }) => {
      state.expire = payload;
    },
    setCallRefresh: (state, { payload }) => {
      state.callRefresh = payload;
    },
    setOrgDetail: (state, { payload }) => {
      state.orgDetail = payload;
    },
    profileSettingImage: (state, { payload }) => {
      state.image = payload;
    },
    setShowMobileMenu: (state, { payload }) => {
      state.showMobileMenu = payload;
    },
    getAwsData: (state, { payload }) => {
      state.AwsData = payload;
      const userLoginEmail = state.userLoginEmail;
      const tenantList = state.tenantList;
      let tenantId = tenantList?.tenant_id
        ? tenantList.tenant_id
        : userLoginEmail?.tenants?.[0]?.tenant_id;
      const matchedTenant = payload[tenantId];
      Amplify.configure({
        Auth: {
          identityPoolId: matchedTenant
            ? matchedTenant?.identityPoolId
            : payload?.identityPoolId,
          region: payload?.region,
          identityPoolRegion: matchedTenant
            ? matchedTenant?.identityPoolRegion
            : payload?.identityPoolRegion,
          userPoolId: matchedTenant
            ? matchedTenant?.userPoolId
            : payload?.userPoolId,
          userPoolWebClientId: matchedTenant
            ? matchedTenant?.userPoolWebClientId
            : payload?.userPoolWebClientId,
          mandatorySignIn: false,
          signUpVerificationMethod: payload?.signUpVerificationMethod, // 'code' | 'link'
          oauth: {
            domain: matchedTenant ? matchedTenant?.domain : payload?.domain,
            redirectSignIn: payload?.redirectSignIn,
            redirectSignOut: payload?.redirectSignOut,
            responseType: payload?.responseType, // or 'token', note that REFRESH token will only be generated when the responseType is code
          },
        },
      });
      let amplifyConfig = Amplify._config;
      // Update the "oauth" configuration inside the "Auth" object
      amplifyConfig = {
        identityPoolId: matchedTenant
          ? matchedTenant?.identityPoolId
          : payload?.identityPoolId,
        region: payload?.region,
        identityPoolRegion: matchedTenant
          ? matchedTenant?.identityPoolRegion
          : payload?.identityPoolRegion,
        userPoolId: matchedTenant
          ? matchedTenant?.userPoolId
          : payload?.userPoolId,
        userPoolWebClientId: matchedTenant
          ? matchedTenant?.userPoolWebClientId
          : payload?.userPoolWebClientId,
        mandatorySignIn: false,
        signUpVerificationMethod: payload?.signUpVerificationMethod, // 'code' | 'link'
        oauth: {
          domain: matchedTenant ? matchedTenant?.domain : payload?.domain,
          redirectSignIn: payload?.redirectSignIn,
          redirectSignOut: payload?.redirectSignOut,
          responseType: payload?.responseType, // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      };
      Amplify.configure(amplifyConfig);
      // getAwsData: (state, { payload }) => {
      //   state.AwsData = payload;
      //   Amplify.configure({
      //     Auth: {
      //       identityPoolId: payload?.identityPoolId,
      //       region: payload?.region,
      //       identityPoolRegion: payload?.identityPoolRegion,
      //       userPoolId: payload?.userPoolId,
      //       userPoolWebClientId: payload?.userPoolWebClientId,
      //       mandatorySignIn: false,
      //       signUpVerificationMethod: payload?.signUpVerificationMethod, // 'code' | 'link'
      //       oauth: {
      //         domain: payload?.domain,
      //         redirectSignIn: payload?.redirectSignIn,
      //         redirectSignOut: payload?.redirectSignOut,
      //         responseType: payload?.responseType, // or 'token', note that REFRESH token will only be generated when the responseType is code
      //       },
      //     },
      //   });
      // },
    },
    UpdatedQuickBookSelectedValue: (state, { payload }) => {
      state.selectedQuickBookAsset = payload;
    },

    setTenantDetails: (state, { payload }) => {
      state.tenantDetails = payload;
    },

    setUserLoginEmail: (state, { payload }) => {
      state.userLoginEmail = payload;
    },
    setTenantList: (state, { payload }) => {
      state.tenantList = payload;
    },
    setTermsPDFData: (state, { payload }) => {
      state.termsPDFData = payload;
    },
    setTrialToken: (state, { payload }) => {
      state.trialToken = payload;
    },
    setLocationActiveCount: (state, { payload }) => {
      state.locationActiveCount = payload;
    },
    setNotificationOpen: (state, { payload }) => {
      state.notificationOpen = payload;
    },
    settodayNotificationOpen: (state, { payload }) => {
      state.todayNotificationOpen = payload;
    },
    getBookingAndNotificationCount: state => {
      const todayDate = moment(new Date()).format(dateFormat_YYYY_MM_DD);
      let prepareRequest = {
        user_id: state.userDetails?.id,
        booking_date: todayDate,
      };
      let bookingDashData;
      const getResponse = new Promise((success, reject) => {
        postData('book/api/bookingdashinfo', prepareRequest, (data, res) => {
          bookingDashData = data;

          data && success(data);
        });
      });
      getResponse
        .then(res => {
          store.dispatch(check(res));
        })
        .catch(error => {});
    },
    check: (state, { payload }) => {
      state.bookingAndNotificationCounts = payload;
    },
    setResetAssest: (state, { payload }) => {
      state.isResetAssest = payload;
    },
  },
});

export const {
  showLoader,
  setFloorType,
  setFloorEditDetail,
  setLocationLevelList,
  setFloorRefs,
  setBottomCompLogo,
  setSaveChanges,
  setRecentUrl,
  hideLoader,
  setUpdateUserDetails,
  setUserManagementBulkEdit,
  removeUserManagementBulkEdit,
  setSideBarData,
  setUserDetails,
  setUserDateTimeFormat,
  setUserLoginEmail,
  setTenantList,
  setTermsPDFData,
  logout,
  setLocationPaths,
  setSideBarWidth,
  setCompLogo,
  changeLocationNavigation,
  updateNewNotificationFlag,
  updateNotificationTab,
  updateBlinkIcon,
  updateNotificationDetails,
  updateRequestNotificationDetails,
  storeRememberMeDetails,
  setBaseUrl,
  getAwsData,
  setLoginToken,
  setFcmToken,
  setRefreshToken,
  setLoginTokenExpires,
  profileSettingImage,
  setOrgDetail,
  setShowMobileMenu,
  UpdatedQuickBookSelectedValue,
  setTenantDetails,
  setTrialToken,
  setLocationActiveCount,
  setNotificationOpen,
  settodayNotificationOpen,
  hideAllLoader,
  getBookingAndNotificationCount,
  check,
  handleLocationEdit,
  setResetAssest,
  setTeamHierarchy,
  setTeamMemberAndAssetCount,
  setWebSessionTimeOut,
  setCallRefresh,
} = appSlice.actions;

export default appSlice.reducer;
