import React, { Component } from 'react';
import {userService} from '../../Services/user.service';
import {userModel} from '../../models/userModel';
import { getLoggedInUser } from '../../helpers/localStorageService';
import UserTable from '../../components/userTable';
interface HomepageState{users: userModel[]}

class HomePage extends Component<any, HomepageState> {

    constructor(props: any) {
        super(props);
        this.logout = this.logout.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
    }

    componentDidMount() {
        userService.get()
        .then((users: userModel[])=>{
            this.setState({users: users});
            console.log(users);
        });
    }
      
    render() {
        const loggedInUserRole = getLoggedInUser()?.role;
        return (
            <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-6">
                    <h2>Users</h2>
       
                <button onClick={this.logout}>Logout</button>   
                {this.getUserTable(loggedInUserRole)}  
                <button onClick={this.addNewUser}>Add new user</button>   
            </div>
            </div>
            </div>
        );
    }

    getUserTable(loggedInUserRole = 'user'){
        if(this.state?.users){
            return <UserTable users={this.state?.users}/>
        }
    }

    addNewUser(){

        if(this.state?.users){
            this.state.users.push({
                id:'',
                email:'',
                role:''
            });
            this.setState({
                users: this.state.users
            })
        }
    }

    logout(){
        userService.logout();
        window.location.reload();
    }
}

export default HomePage;