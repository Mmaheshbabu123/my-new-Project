import {  useContext } from 'react';
import { useRouter } from 'next/router';
import { appRoutes } from "./appRoutes";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';

export { RouteGuard };

//check if you are on the client (browser) or server
const isClientRendering = () => typeof window !== "undefined";

let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.FORGOT_PASSWORD,
    appRoutes.RESET_PASSWORD,
    appRoutes.EMAIL_SENT,
    appRoutes.VERIFY_EMAIL,
    appRoutes.NEWS_FEED_PAGE,
    appRoutes.ABOUT_US_PAGE,
  ];

function RouteGuard({ children }) {

  const { contextState: { isAuthenticated = 0 } } = useContext(UserAuthContext);
  const router = useRouter();

  /**
 * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
 */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isClientRendering() && !isAuthenticated && pathIsProtected) {
    router.push({
        pathname: appRoutes.LOGIN_PAGE,
        query: { returnUrl: router.asPath }
    });
  }

  return children;


  // const [authorized, setAuthorized] = useState(false);
  //
  //   useEffect(() => {
  //       // on initial load - run auth check
  //       authCheck(router.asPath);
  //
  //       // on route change start - hide page content by setting authorized to false
  //       const hideContent = () => setAuthorized(false);
  //       router.events.on('routeChangeStart', hideContent);
  //
  //       // on route change complete - run auth check
  //       router.events.on('routeChangeComplete', authCheck)
  //
  //       // unsubscribe from events in useEffect return function
  //       return () => {
  //           router.events.off('routeChangeStart', hideContent);
  //           router.events.off('routeChangeComplete', authCheck);
  //       }
  //
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

    // function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        // const path = url.split('?')[0];
        // if (!localStorage.getItem('user_id') && !Number(localStorage.getItem('user_id')) && !unprotectedRoutes.includes(path)) {
        //     setAuthorized(false);
        //     router.push({
        //         pathname: '/user/login',
        //         query: { returnUrl: router.asPath }
        //     });
        // } else {
        //     setAuthorized(true);
        // }
    // }
}
