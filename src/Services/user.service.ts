import {AxiosRequestConfig, AxiosResponse} from 'axios';
import Axios from 'axios';


export const userService = {
    login,    
    getAll
   
};

function login(email:string, password:string, rememberMe:boolean) {

    const credentials = {
        email: email,
        password: password,
        //RememberMe: rememberMe
    };

    const requestOptions: AxiosRequestConfig = {
        url: 'http://localhost:8080/login/',
        method: 'POST',
        data: credentials
    };


    return Axios(requestOptions)
        .then(handleResponse)
        .then((data) => {
            // user details and jwt token stored in local storage
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            return data;

        });
}

function getAll() {
    const token = localStorage.getItem('token');
    console.log('token'+ token);
    const requestOptions: AxiosRequestConfig = {
        url: 'http://localhost:8080/user',
        method: 'GET'
             
    };

    return Axios(requestOptions)
    .then(handleResponse)
    .then((data) => {
        console.log(data);
        // user details and jwt token stored in local storage
        //localStorage.setItem('ew-user', JSON.stringify(data.user));
        //localStorage.setItem('ew-token-auth', JSON.stringify(data.token));

        return data;
    });
}
function handleResponse(response:AxiosResponse<any>) {
    if (response && response.status === 401) {
        //logout();
        window.location.reload(true);
    }

    return response.data;
}