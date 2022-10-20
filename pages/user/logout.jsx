import React, { useState, useEffect } from 'react';

const UserLogout = () => {
  const [ clear, setClear ] = useState(false);
  useEffect(() => {
    localStorage.clear();
    setClear(!clear);
  }, [])

  if(clear) {
    window.open('/user/login');
  }

return(
  <>  </>
)
}
export default UserLogout;
