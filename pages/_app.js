import '../styles/globals.css';
import '../styles/otpone.css';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
	return (
		<div className="container-fluid px-0">
			<Head>
				{/* Responsive meta tag */}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* bootstrap CDN */}
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
			</Head>
			<Layout>
				<div className='col-md-10 m-auto'>
				<Component {...pageProps} />
				</div>
			</Layout>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
				crossOrigin="anonymous"
			/>
		</div>
	);
}

export default MyApp;

// import '../styles/main.css';
// import '../styles/Announcement.css';
// import '../styles/EmployeeType.css'
// import '../styles/PcLinking.css';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import "react-datepicker/dist/react-datepicker.css";
// import Head from 'next/head';
// import Script from 'next/script'

// import {UTILITYFN} from '../components/UtilityFunctions/Utility';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../styles/globals.css";
// import "../styles/styleguide.css";
// import "../styles/layout.css";

// function MyApp({ Component, pageProps }) {
//   if(Component.toString().indexOf('TerminateContract') < 0 ){
//     UTILITYFN.resetUserSessionDataforMoveOut();
//   }
//   return(
//     <>
//     <Head>
// {/* // Responsive meta tag */}
// <meta name="viewport" content="width=device-width, initial-scale=1" />
// {/* //  bootstrap CDN */}
// {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>  */}
// </Head>
// <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></Script>

// <Component {...pageProps} />
// </>
//   )
// }

// export default MyApp
