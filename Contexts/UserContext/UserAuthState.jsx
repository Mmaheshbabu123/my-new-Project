import { useState, useEffect } from 'react';
import UserAuthContext from './UserAuthContext';

const UserAuthState = (props) => {

  const [contextState, setContextState] = useState({
    hydration: false,
  });

  useEffect(() => {
    let userObj = {};
      userObj = localStorage.getItem("current_user");
      userObj = userObj && userObj.length > 10 ? {isAuthenticated: 1, ...JSON.parse(userObj)} : {isAuthenticated: 0};
      //user authenticate data.
      setContextState({...contextState,
        hydration: true,
        ...userObj
      })
  }, [])

  const updateUserContext = obj => setContextState({...contextState, ...obj })

  return (
    <UserAuthContext.Provider value={{
      contextState,
      updateUserContext,
    }}> {contextState.hydration && props.children}
    </UserAuthContext.Provider>
  )

}
export default UserAuthState;
