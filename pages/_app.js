import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/cooperation-agreement.css';
import '../styles/planning.css';
import Layout from '../components/layout/Layout';
import UserAuthState from '@/Contexts/UserContext/UserAuthState';
import Head from 'next/head';
import Script from 'next/script';
import { RouteGuard } from '../routes/RouteGuard';

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="container-fluid px-0">
				<Head>
					{/* Responsive meta tag */}
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
					{/* bootstrap CDN */}
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
						crossOrigin="anonymous"
					/>
				</Head>
				<UserAuthState>
					<Layout>
						<div className='col-md-9 col-lg-11 m-auto'>
							<RouteGuard>
								<Component {...pageProps} />
							</RouteGuard>
						</div>
					</Layout>
				</UserAuthState>
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
					crossOrigin="anonymous"
				/>
			</div>
		</QueryClientProvider>
	);
}

export default MyApp;
