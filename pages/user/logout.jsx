import Login from "@/components/PwaComponent/login";
import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'

const UserLogout = () => {
  // const router = useRouter()
  const [ login ] = useState(false);
  useEffect(() => {
    localStorage.clear();
    window.open('/user/login', '_self');
  }, [])

  return(
    <>
      {login && <Login />}
    </>
  )
}
export default UserLogout;
