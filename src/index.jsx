import React from 'react';
import * as ReactDOM from 'react-dom/client';
import AppRouter from './approuter';
import './assets/img/favicon.png';
import './assets/css/bootstrap.min.css';
import './assets/plugins/fontawesome/css/fontawesome.min.css';
import './assets/plugins/fontawesome/css/all.min.css';
import './assets/css/feather.css';
import './assets/css/style.css';
import './assets/css/admin-style.css';
import './assets/js/bootstrap-datetimepicker.min.js';
import './assets/plugins/daterangepicker/daterangepicker.js';
import './assets/css/bootstrap-datetimepicker.min.css';
import './assets/js/feather.min.js';
import './assets/css/super-admin.css';
import './assets/css/report.css';
import { registerServiceWorker } from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppRouter />);
registerServiceWorker();
if (module.hot) {
  // enables hot module replacement if plugin is installed
  module.hot.accept();
}
