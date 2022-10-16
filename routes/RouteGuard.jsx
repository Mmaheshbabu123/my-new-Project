import { useState, useEffect } from 'react';
import { appRoutes } from "./appRoutes";
import { useRouter } from 'next/router';


export { RouteGuard };

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
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!localStorage.getItem('user_id') && !Number(localStorage.getItem('user_id')) && !unprotectedRoutes.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/user/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}
