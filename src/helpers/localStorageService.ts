import {loginModel} from '../models/loginModel';
import {userModel} from '../models/userModel';

export function setToken(data: loginModel) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  export function getAccessToken() {
    const token = localStorage.getItem('token');
    return token ? token.replace(/^"(.*)"$/, '$1') : token;
  }
  
  export function getLoggedInUser() :userModel|null {
    const user = localStorage.getItem('user');
    if(user){
        return JSON.parse(user);
    }

    return null;
  }

  export function getLoginType() :boolean {
    const aad = localStorage.getItem('aad');
    return aad? aad==='true':false;
  }
  
  export function getRefreshToken() {
    return localStorage.getItem('token');
  }
  
  export default function clearToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  