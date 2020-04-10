import axios from 'axios';
import { getAccessToken } from './localStorageService';

export default {
  setupInterceptors: (store:any, history:any) => {
    axios.interceptors.request.use(
      config => {
        const token = getAccessToken();
        if (token) {
          config.headers['Authorization'] = token;
        }

        config.headers['Content-Type'] = 'application/json';

        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        //if (error.response.status === 401) {
        //store.dispatch(accountActions.logout());
        //history.push('/login');
        //}

        //if (error.response.status === 404 || error.response.status === 400) {
        //history.push('/login');
        //}

        return Promise.reject(error);
      }
    );
  }
};
