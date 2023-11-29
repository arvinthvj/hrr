import PrivateRoute from '..';

import {
  companySettingsUrl,
  reportingUrl,
} from '../../../assets/constants/pageurl';
import CompanySettings from '../../../pages/companysettings';

import Reporting from '../../../pages/reporting';

const PrivateRoutes = () => {
  return (
    <>
      <PrivateRoute component={<CompanySettings />} path={companySettingsUrl} />

      <PrivateRoute component={Reporting} path={reportingUrl} exact />
      {/* <Route path="*" component={NotFound} /> */}
    </>
  );
};

export default PrivateRoutes;
