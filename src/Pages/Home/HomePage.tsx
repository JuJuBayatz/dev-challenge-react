import React, { Component } from 'react';
import {userService} from '../../Services/user.service';
import TableRow from '../../components/tableRow';
import {userModel} from '../../models/userModel';
import { getLoggedInUser } from '../../helpers/localStorageService';
class HomePage extends Component<any, any> {

    componentDidMount() {
        const users = userService.getAll()
        .then((users: any)=>{
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
            </div>
        );
    }

    getUserTable(loggedInUserRole = 'user'){
        if(this.state?.users){
            return <table>
                    <thead>
                        <th>Email</th>
                        <th>Role</th>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map((user:userModel, i:number) => {
                            return (<TableRow user={user} role={loggedInUserRole} ></TableRow>);
                        })
                    }               
                    </tbody>
                </table>
        }
    }
}

export default HomePage;