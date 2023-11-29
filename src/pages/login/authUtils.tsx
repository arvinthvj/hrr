import { Auth } from 'aws-amplify';
import {
  CognitoHostedUIIdentityProvider,
  SSOLoginStatus,
} from '../../components/loginComponents/constants';
import { loginUrl } from '../../assets/constants/pageurl';
import { store } from '../../reduxStore';
type Tenant = {
  tenant_id: number;
  tenant_name: string;
  login_type: string | number;
  web_identity_provider: number | string;
};

export function handleFederatedSignIn(
  value: Tenant | undefined,
  navigate: any,
) {
  const userLoginEmail = store?.getState()?.app?.userLoginEmail;
  const tenantList = store?.getState()?.app?.tenantList;
  const AwsData = store?.getState()?.app?.AwsData;
  const tenantId = tenantList?.tenant_id
    ? tenantList.tenant_id
    : userLoginEmail?.tenants?.[0]?.tenant_id;
  const matchedTenant = AwsData[tenantId];
  let selectMicrosoft = CognitoHostedUIIdentityProvider.Microsoft;
  if (matchedTenant?.identity_provider) {
    selectMicrosoft = matchedTenant?.identity_provider;
  }
  if (
    value?.login_type == SSOLoginStatus.Type &&
    value?.web_identity_provider == SSOLoginStatus.Microsoft
  ) {
    Auth.federatedSignIn({
      provider: selectMicrosoft,
    });
  } else if (
    value?.login_type == SSOLoginStatus.Type &&
    value?.web_identity_provider == SSOLoginStatus.Google
  ) {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  } else if (
    value?.login_type == SSOLoginStatus.Type &&
    value?.web_identity_provider == SSOLoginStatus.Okta
  ) {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Okta,
    });
  } else {
    navigate(loginUrl, {
      state: {
        details: 'Login',
      },
    });
  }
}
