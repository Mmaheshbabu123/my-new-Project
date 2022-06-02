import '../styles/main.css';
import '../styles/Announcement.css';
import Head from 'next/head';


import {UTILITYFN} from '../components/UtilityFunctions/Utility';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import "../styles/styleguide.css";
import "../styles/layout.css";

function MyApp({ Component, pageProps }) {
  if(Component.toString().indexOf('TerminateContract') < 0 ){
    UTILITYFN.resetUserSessionDataforMoveOut();
  }
  return(
    <>
    <Head>
// Responsive meta tag
<meta name="viewport" content="width=device-width, initial-scale=1" />
//  bootstrap CDN
</Head>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<Component {...pageProps} />
</>
  ) 
}

export default MyApp
