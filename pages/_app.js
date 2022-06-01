import '../styles/main.css';
import '../styles/Announcement.css';


import {UTILITYFN} from '../components/UtilityFunctions/Utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/layout.css";

function MyApp({ Component, pageProps }) {
  if(Component.toString().indexOf('TerminateContract') < 0 ){
    UTILITYFN.resetUserSessionDataforMoveOut();
  }
  return <Component {...pageProps} />
}

export default MyApp
