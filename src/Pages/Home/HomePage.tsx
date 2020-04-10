import React, { Component } from 'react';
import {userService} from '../../Services/user.service';
import {userModel} from '../../models/userModel';
import { getLoggedInUser } from '../../helpers/localStorageService';
import UserTable from '../../components/userTable';
interface HomepageState{users: userModel[]}

class HomePage extends Component<any, HomepageState> {

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
            <div>
                <header>Home</header>
                {this.getUserTable(loggedInUserRole)}  
                <button onClick={this.addNewUser}>Add new user</button>   
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
            this.setState({
                //users.add()
            })
        }


    }
}

export default HomePage;