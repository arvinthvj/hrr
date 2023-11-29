/** Public Routes Start */
export const baseUrl = '/';
export const loginUrl = '/login';
export const userLoginUrl = '/user/login';
export const loginWithTenantUrl = '/';
export const forgotPasswordUrl = '/forgot-password';
export const termServiceUrl = '/terms-sevices';
export const notFoundUrl = '/404';
export const userViewProfile = '/user-view-profile';
export const teamList = '/team-list';
export const hrModule = '/hr-module';
export const hrSettings = '/hr-settings';
export const hrRequest = '/hr-request';
export const companySettingUrl = '/company-settings';
export const dashboardUrl = '/dashboard';
export const notificationUrl = '/notification';

// export const adminSettingLocationCountryUrl = "/admin-settings-location-country";
// export const adminSettingLocationGlobalUrl = "/admin-settings-location-global";
// export const adminSettingLocationCityUrl = "/admin-settings-location-city";
// export const locationAddressUrl = "/admin-settings-location-street-address";
// export const locationBulidingUrl = "/admin-settings-location-buliding";
// export const locationFloorUrl = "/admin-settings-location-floor";
// export const locationZoneUrl = "/admin-settings-location-zone";
// export const locationNeighbourUrl = "/admin-settings-location-neighbour";
// export const locationRegionUrl = "/admin-settings-location-region";
// export const locationStateUrl = "/admin-settings-location-state";
// export const locationSubrapUrl = "/admin-settings-location-subrap";

export const userManagementUrl = '/admin-user-management';
export const teamManagementUrl = '/admin-teams-management';
export const userManagementTeamUrl = '/admin-user-management-team';
export const userviewlocateUrl = '/user-view-locate';
export const profileSettingsUrl = '/profile-settings';
export const organisationSettingsUrl = '/organisation-settings';
export const languageSettingsUrl = '/language-settings';
export const notificationSettingsUrl = '/notification-settings';
export const securitySettingsUrl = '/security-settings';
export const supportSettingsUrl = '/support-settings';
export const bookUrl = '/book';
export const planUrl = '/plan';
export const assetManagementUrl = '/admin-settings-asset-management';
export const userBulkSelectUrl = '/admin-user-bulk-select';
export const confirmPassword = '/user/user-change-password';
export const floorplanManagementUrl = '/admin-settings-floor-management';
export const floorDetailsUrl = '/admin-settings-floor-details';
export const profileResetPasswordUrl = '/user/profile-reset-password';

export const adminLocation = '/admin-settings-location';

// super-admin

export const tenantSettingUrl = '/super-admin/tenant-settings';
export const globalSettingUrl = '/super-admin/global-asset';
export const notificationSuperAdminUrl = '/super-admin/notifications';
export const globalRolesUrl = '/super-admin/global-roles';
export const globalEnvironmentUrl = '/super-admin/global-environment';
export const userManagementSuperAdminUrl = '/super-admin/user-management';

export const hrRequestUrl = '/hr-request';

// Create Account
export const createAccount = '/account/createaccount';

// page not found
export const pageNotFound = '/page-not-found';
export const userLogin = '/user/login';

/** Public Routes End*/

export const ULAPages = {
  commonpages: [
    '/profile-settings',
    '/organisation-settings',
    '/language-settings',
    '/notification-settings',
    '/security-settings',
    '/support-settings',
    '/notification',
  ],
  user: [
    { name: 'Dashboard', path: ['/dashboard'] },
    { name: 'Locate', path: ['/user-view-locate', '/team-list'] },
    { name: 'Book', path: ['/book'] },
    { name: 'Plan', path: ['/plan'] },
    { name: 'Team', path: ['/team-list'] },
    { name: 'People', path: ['/hr-module'] },
    { name: 'Wellbeing', path: ['#'] },
    { name: 'Reports', path: ['#'] },
    { name: 'Analytics', path: ['/analytics'] },
    { name: 'HR_request', path: ['/hr-request'] },
  ],
  admin: [
    { name: 'General_settings', path: ['/company-settings'] },
    {
      name: 'Location_settings',
      path: ['/admin-settings-location', '/admin-settings-floor-details'],
    },
    { name: 'User_settings', path: ['/admin-user-management'] },
    { name: 'Team_settings', path: ['/admin-teams-management'] },
    { name: 'People_settings', path: ['/hr-settings'] },
    { name: 'HR_request', path: ['/hr-request'] },
    { name: 'Billing', path: ['#'] },
  ],
  super_admin: [
    { name: 'tenant_settings', path: ['/super-admin/tenant-settings'] },
    { name: 'global_asset_types', path: ['/super-admin/global-asset'] },
    {
      name: 'global_environment_settings',
      path: ['/super-admin/global-environment'],
    },
    { name: 'global_hs_roles', path: ['/super-admin/global-roles'] },
    { name: 'user_settings', path: ['/super-admin/user-management'] },
  ],
};

export const analytics = '/analytics';
