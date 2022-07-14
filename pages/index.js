{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}

import ManageTypeIndex from "./manage/index";
import Link from 'next/link';
import { Layout } from "../components/layout/Layout";
import { useRouter } from 'next/router';
function Myoverview(props) {
  const {pathname,asPath,locales} = useRouter();
  const server_url = process.env.NEXT_PUBLIC_APP_URL;
  let dashboard_url = server_url.includes('test')?'https://test.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1':
   'http://uat.absolute-you.infanion.com/dashboard?access=administrator&check_logged_in=1';
    return (
        <div>
        <div className = 'go_to_dashboard'>
        <Link href={dashboard_url}>
          <a> Back to dashboard </a>
          </Link>
        </div>
{/* REMOVE THIS MANAGETYPE-INDEX COMPONENT TAG, AFTER ADDING DEVELOPMENT RELATED CODE  */}
         <ManageTypeIndex />


        </div>
        // <Layout title = { 'Absolute You' }>
        // </Layout>
    );
}

export default Myoverview;
