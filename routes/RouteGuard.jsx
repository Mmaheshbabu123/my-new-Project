import {  useContext } from 'react';
import { useRouter } from 'next/router';
import { appRoutes } from "./appRoutes";
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
// import {isMobile} from 'react-device-detect';

export { RouteGuard };

//check if you are on the client (browser) or server
const isClientRendering = () => typeof window !== "undefined";

function RouteGuard({ children }) {

  const { contextState: { isAuthenticated = 0 } } = useContext(UserAuthContext);
  const router = useRouter();

  /**
 * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
 */
  let pathIsProtected = !Object.values(appRoutes).includes(router.pathname);

  if (isClientRendering() && !isAuthenticated && pathIsProtected) {

    router.push({
        pathname: appRoutes.LOGIN_PAGE,
        query: { returnUrl: router.asPath }
    });

  }

  return children;
}
