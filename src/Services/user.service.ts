import {AxiosRequestConfig, AxiosResponse} from 'axios';
import Axios from 'axios';
import {userModel} from '../models/userModel';


export const userService = {
    login,    
    get,
    update,
    create
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

function get() {
    const requestOptions: AxiosRequestConfig = {
        url: 'http://localhost:8080/user',
        method: 'GET'
             
    };

    return Axios(requestOptions)
    .then(handleResponse)
    .then((data) => {
        console.log(data);
        return data;
    });
}

function update(user: userModel) {
    const requestOptions: AxiosRequestConfig = {
        url: `http://localhost:8080/user/${user.id}`,
        method: 'PUT',
        data: user 
    };

    return Axios(requestOptions)
    .then(handleResponse)
    .then((data) => {
        console.log(data);
        return data;
    });
}

function create(user: userModel) {
    const requestOptions: AxiosRequestConfig = {
        url: 'http://localhost:8080/user',
        method: 'POST',
        data: user 
    };

    return Axios(requestOptions)
    .then(handleResponse)
    .then((data) => {
        console.log(data);
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