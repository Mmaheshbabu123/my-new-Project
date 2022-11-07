import {  useContext } from 'react';
import { useRouter } from 'next/router';
import { appRoutes } from "./appRoutes";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';

// import {isMobile} from 'react-device-detect';

export { RouteGuard };

//check if you are on the client (browser) or server
const isClientRendering = () => typeof window !== "undefined";

function RouteGuard({ children }) {
  const router = useRouter();

  const { type = '' } = router.query;

  const { contextState: { isAuthenticated = 0 } } = useContext(UserAuthContext);

  const push_to_login = () => {
    router.push({
        pathname: appRoutes.LOGIN_PAGE,
        query: { returnUrl: router.asPath }
    });
  }
  /**
 * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
 */
  let pathIsProtected = !Object.values(appRoutes).includes(router.pathname);

  if(type === 'login' || type === 'register') {
      localStorage.clear();
      localStorage.setItem('type_register', type === 'register' ? 1 : 0);
      push_to_login();
  } else if (isClientRendering() && !isAuthenticated && pathIsProtected) {
     push_to_login()
  }

  return children;
}
