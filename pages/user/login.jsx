import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import UserAuthContext from '@/Contexts/UserContext/UserAuthContext';
import Login from "@/components/PwaComponent/login";

const UserLogin = () => {
  const { contextState: { isAuthenticated = 0 } } = useContext(UserAuthContext);
  let uid = localStorage.getItem("user_id");

  const router = useRouter();
  isAuthenticated === 1 && uid ? router.push('/') : null
  return (
    <div>
      {
        isAuthenticated === 1 && uid ? null : <Login />
      }
    </div>
  )
}
export default UserLogin;
