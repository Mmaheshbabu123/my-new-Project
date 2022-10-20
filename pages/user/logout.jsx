import React, { useState, useEffect } from 'react';

<<<<<<< HEAD

=======
>>>>>>> 6a7f880eb84d625fa8177fe092e26d323d002e89
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
