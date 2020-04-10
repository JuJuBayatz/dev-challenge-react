import {userModel} from './userModel';

export interface loginModel{
    token:string,
    user: userModel
};