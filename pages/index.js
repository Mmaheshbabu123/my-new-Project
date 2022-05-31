// import Head from 'next/head';
// import {Navbar} from '../components/layout/Navbar/Navbar';
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>


import { Layout } from "../components/layout/Layout";
import QuickAccess from "../components/DasboardComponent/QuickAccess";
import QuickActions from "../components/DasboardComponent/QuickActions";
import Link from 'next/link';

function getBreadCrum () {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                    <Link href="/myoverview">
                        <a className="tahoma-regular-normal-azure-24px" href="/myoverview">Mijn overzicht</a>
                    </Link>
                </li>
            </ol>
        </nav>
    );
}
function Myoverview(props) {
    const breadcrumHtml = getBreadCrum();
    return (
        <Layout title = { 'Mijn overzicht' } 
        breadcrum = { breadcrumHtml } >
            <QuickAccess />
            <QuickActions />
    
        </Layout>
    );
}

export default Myoverview;
// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>De Watergroep</title>
//         <meta name="description" content="Infanion" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Navbar />
//     </div>
//   )
// }
