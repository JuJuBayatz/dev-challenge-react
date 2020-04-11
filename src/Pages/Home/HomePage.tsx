import React, { Component } from 'react';
import {userService} from '../../Services/user.service';
import {userModel} from '../../models/userModel';
import { getLoggedInUser } from '../../helpers/localStorageService';
import UserTable from '../../components/userTable';
interface HomepageState{
    users: userModel[] | null,
    canCreate: boolean;
}

class HomePage extends Component<any, HomepageState> {

    
    constructor(props: any) {
        super(props);
        this.logout = this.logout.bind(this);
        this.addNewUser = this.addNewUser.bind(this);

        this.state = {
            users: null,
            canCreate: false
        };
    }

    componentDidMount() {
        const loggedInUserRole = getLoggedInUser()?.role;
        userService.get()
        .then((users: userModel[])=>{
            this.setState({
                users: users,
                canCreate: loggedInUserRole === 'admin' || loggedInUserRole === 'manager'
            });
            console.log(users);
        });
    }
      
    render() {
      
        const canCreate = this.state.canCreate
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-6">
                        <h2>Users</h2>           
                        <button onClick={this.logout}>Logout</button>
                        {
                            this.state?.users &&
                            <UserTable users={this.state.users}/>                        
                        }  
                        <button onClick={this.addNewUser}>Add new user</button>   
                    </div>
                </div>
            </div>
        );
    }


    addNewUser = ()=>{

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