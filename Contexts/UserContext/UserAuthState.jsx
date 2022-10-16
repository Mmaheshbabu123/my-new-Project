import { useState } from 'react';
import UserAuthContext from './UserAuthContext';

const UserAuthState = (props) => {
  const IS_SERVER = typeof window === "undefined";
  let userObj = {};
  if (!IS_SERVER) {
    userObj = localStorage.getItem("current_user");
    userObj = userObj && userObj.length > 10 ? {isAuthenticated: 1, ...JSON.parse(userObj)} : {isAuthenticated: 0};
  }
  //user authenticate data.
  const initialState = {
    ...userObj
  }
  const [contextState, setContextState] = useState(initialState);
  const updateUserContext = obj => setContextState({...contextState, ...obj })
  return (
    <UserAuthContext.Provider value={{
      contextState,
      updateUserContext,
    }}> {props.children}
    </UserAuthContext.Provider>
  )

}
export default UserAuthState;
