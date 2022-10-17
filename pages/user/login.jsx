import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Login from "@/components/PwaComponent/login";

const UserLogin = () => {
  const { contextState: { isAuthenticated = 0 } } = useContext(UserAuthContext);
  const router = useRouter();
  isAuthenticated === 1 ? router.push('/') : null
  return (
    <div>
      {
        isAuthenticated === 1 ? null : <Login />
      }
    </div>
  )
}
export default UserLogin;
