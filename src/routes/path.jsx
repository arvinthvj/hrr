import React from 'react';
import TeamList from '../pages/teamlist/index';
import HRModule from '../pages/hrModule/index';
import UserviewProfile from '../pages/teamlist/userviewprofile/index';
import CompanySetting from '../pages/companysettings/index';
import Dashboard from '../pages/dashboard/index';
import UserManagement from '../pages/userManagement/index';
import TeamManagement from '../pages/TeamManagement/index';
import UserViewLocate from '../pages/userViewLocate/index';
import {
  adminLocation,
  analytics,
  assetManagementUrl,
  bookUrl,
  companySettingUrl,
  createAccount,
  dashboardUrl,
  floorDetailsUrl,
  floorPlanNew,
  floorplanManagementUrl,
  globalEnvironmentUrl,
  globalRolesUrl,
  globalSettingUrl,
  hrModule,
  hrRequest,
  hrSettings,
  languageSettingsUrl,
  notificationSettingsUrl,
  notificationSuperAdminUrl,
  notificationUrl,
  organisationSettingsUrl,
  planUrl,
  profileResetPasswordUrl,
  profileSettingsUrl,
  securitySettingsUrl,
  supportSettingsUrl,
  teamList,
  teamManagementUrl,
  tenantSettingUrl,
  termServiceUrl,
  userBulkSelectUrl,
  userManagementSuperAdminUrl,
  userManagementTeamUrl,
  userManagementUrl,
  userViewProfile,
  userviewlocateUrl,
} from '../assets/constants/pageurl';
import TermService from '../pages/login/terms-sevices';
import ProfileSettings from '../pages/settings/profileSettings';
import OrganisationSettings from '../pages/settings/organisationSettings';
import LanguageSettings from '../pages/settings/languageSettings';
import NotificationSettings from '../pages/settings/notificationSettings';
import SecuritySettings from '../pages/settings/securitySettings';
import SupportSettings from '../pages/settings/supportSettings';
import Book from '../pages/book';
import FloorDetails from '../pages/floordetails/index';
import AdminLocation from '../pages/locationSettings';

// super-admin

import TenantSettings from '../pages/super-admin/tenant-settings/index';
import GlobalAsset from '../pages/super-admin/global-asset/index';
import Notifications from '../pages/super-admin/notifications/index';
import GlobaRoles from '../pages/super-admin/globalroles/index';
import GlobalEnvironment from '../pages/super-admin/globalenvironment/index';
import UserManagementSuperAdmin from '../pages/super-admin/usermanagement/index';
import ConfirmPassword from '../pages/login/confirmPassword';
import HRSettings from '../pages/hrSettings';
import HRRequest from '../pages/hrRequest';
import NotificationAndRequests from '../components/newNotification';
import Analytics from '../pages/reporting';

export const RouteObject = [
  {
    id: 4,
    path: dashboardUrl,
    element: <Dashboard />,
  },
  {
    id: 5,
    path: termServiceUrl,
    element: <TermService />,
  },
  {
    id: 8,
    path: teamList,
    element: <TeamList />,
  },
  {
    id: 9,
    path: userViewProfile,
    element: <UserviewProfile />,
  },
  {
    id: 14,
    path: companySettingUrl,
    element: <CompanySetting />,
  },
  {
    id: 15,
    path: userManagementUrl,
    element: <UserManagement />,
  },
  {
    id: 16,
    path: teamManagementUrl,
    element: <TeamManagement />,
  },
  {
    id: 21,
    path: userviewlocateUrl,
    element: <UserViewLocate />,
  },
  {
    id: 22,
    path: profileSettingsUrl,
    element: <ProfileSettings />,
  },
  {
    id: 23,
    path: organisationSettingsUrl,
    element: <OrganisationSettings />,
  },
  {
    id: 24,
    path: languageSettingsUrl,
    element: <LanguageSettings />,
  },
  {
    id: 25,
    path: notificationSettingsUrl,
    element: <NotificationSettings />,
  },
  {
    id: 26,
    path: securitySettingsUrl,
    element: <SecuritySettings />,
  },
  {
    id: 27,
    path: supportSettingsUrl,
    element: <SupportSettings />,
  },
  {
    id: 28,
    path: planUrl,
    element: <Book />,
  },
  {
    id: 33,
    path: floorDetailsUrl,
    element: <FloorDetails />,
  },
  {
    id: 35,
    path: adminLocation,
    element: <AdminLocation />,
  },
  // {super-admin}
  {
    id: 36,
    path: tenantSettingUrl,
    element: <TenantSettings />,
  },
  {
    id: 37,
    path: globalSettingUrl,
    element: <GlobalAsset />,
  },
  {
    id: 38,
    path: notificationSuperAdminUrl,
    element: <Notifications />,
  },
  {
    id: 39,
    path: globalRolesUrl,
    element: <GlobaRoles />,
  },
  {
    id: 40,
    path: globalEnvironmentUrl,
    element: <GlobalEnvironment />,
  },
  {
    id: 41,
    path: userManagementSuperAdminUrl,
    element: <UserManagementSuperAdmin />,
  },
  {
    id: 42,
    path: hrModule,
    element: <HRModule />,
  },
  {
    id: 43,
    path: hrSettings,
    element: <HRSettings />,
  },
  {
    id: 44,
    path: hrRequest,
    element: <HRRequest />,
  },
  {
    id: 45,
    path: analytics,
    element: <Analytics />,
  },
  {
    id: 46,
    path: notificationUrl,
    element: <NotificationAndRequests />,
  },
];
