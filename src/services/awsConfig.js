import { Amplify, Auth } from 'aws-amplify';
import { store } from '../reduxStore';

const AwsData = store?.getState()?.app?.AwsData;
const userLoginEmail = store?.getState()?.app?.userLoginEmail;
const tenantList = store?.getState()?.app?.tenantList;
let tenantId = tenantList?.tenant_id
  ? tenantList?.tenant_id
  : userLoginEmail?.tenants?.[0]?.tenant_id;
const matchedTenant = AwsData[tenantId];
if (AwsData?.identityPoolId) {
  Amplify.configure({
    identityPoolId: matchedTenant
      ? matchedTenant?.identityPoolId
      : AwsData?.identityPoolId,
    region: AwsData?.region,
    identityPoolRegion: matchedTenant
      ? matchedTenant?.identityPoolRegion
      : AwsData?.identityPoolRegion,
    userPoolId: matchedTenant ? matchedTenant?.userPoolId : AwsData?.userPoolId,
    userPoolWebClientId: matchedTenant
      ? matchedTenant?.userPoolWebClientId
      : AwsData?.userPoolWebClientId,
    mandatorySignIn: false,
    signUpVerificationMethod: AwsData?.signUpVerificationMethod, // 'code' | 'link'
    oauth: {
      domain: matchedTenant ? matchedTenant?.domain : AwsData?.domain,
      redirectSignIn: AwsData?.redirectSignIn,
      redirectSignOut: AwsData?.redirectSignOut,
      responseType: AwsData?.responseType, // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  });
}
export const currentConfig = Auth.configure();
