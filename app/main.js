/* eslint-env es6 */

import 'bootstrap/dist/css/bootstrap.css';
import './static/stylesheets/style.css';
import './executor.jsx';
require.context('./static/', true, /^\.\/.*\.(html|png|svg|gif)/);
