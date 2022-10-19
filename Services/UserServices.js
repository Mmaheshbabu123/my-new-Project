import axios from 'axios';
import { USER_ENTITY_TYPE_ID } from '@/Constants';

let loginStatus;
const userLogin = async (state, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    }
  }
  let data = {
    "name": state.email,
    "pass": state.password
  }
  await axios.post(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/user/login?_format=json`, data, config)
  .then((response) => {
    let currentUserObj = setLocalStorageAndForwardToDashboard(response);
    loginStatus = {
      status: 200,
      currentUserObj,
      message: ''
    }
    }).catch((error) => {
      loginStatus = {
        status: 401,
        currentUserObj: {},
        message: "Sorry, unrecognized username or password"
      }
      console.error(error);
  })
  return loginStatus;
}

const setLocalStorageAndForwardToDashboard = (response) => {
    let { data: {
        csrf_token = '',
        current_user = {},
        logout_token = '',
        current_user: { uid = 0, roles = [] }
    }
    } = response;
    let role = roles.pop() || 'null';
    let roleType = USER_ENTITY_TYPE_ID[role] || 0;
    current_user['role'] = role;
    current_user['roleType'] = roleType;
    //store basic authenticate data in storage
    localStorage.setItem("current_user", JSON.stringify(current_user));
    localStorage.setItem("user_id", uid);
    localStorage.setItem("csrf_token", csrf_token);
    localStorage.setItem("logout_token", logout_token);
    //return data to login service
    return  current_user;
}


const userLogout = async (uid) => {
  await axios.get(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/user/logout?_format=json&token=${localStorage.getItem('logout_token')}`)
    .then(async (response) => {
      let url = `${window.location.origin}/user/logout`
      window.open(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/api/user/logout?entityid=${uid}&destination_url=${btoa(url)}`, '_self');
      // axios.get(`${process.env.NEXT_PUBLIC_APP_URL_DRUPAL}/api/user/logout?entityid=${uid}`).then(res => {
      //   localStorage.clear();
      //   window.open('/user/login', '_self');
      // })
    })
}

const backendLogin = () => {

}

export const userService = {
  userLogin,
  userLogout,
  backendLogin,
}
