import Login from "@/components/PwaComponent/login";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const UserLogout = () => {
  const router = useRouter()
  const [ clear, setClear ] = useState(false);
  useEffect(() => {
    localStorage.clear();
    setClear(!clear);
    router.push('/user/login', undefined, { shallow: true })
  }, [])

  return(
    <>
      <Login />
    </>
  )
}
export default UserLogout;
