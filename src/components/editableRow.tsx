import React, { Component } from 'react';
import {userModel} from '../models/userModel';
import {userService} from '../Services/user.service';
import Select from 'react-select'
import { getLoggedInUser } from '../helpers/localStorageService';
class EditableRow extends Component<any, {user: userModel, submitted: boolean}> {

    options: { label: string }[];

    constructor(props: {user: userModel, toggleEditMode: any}) {
        super(props);
        this.state = {
            user: {
                email:props.user.email,
                role: props.user.role,
                id: props.user.id
            },
            submitted: false,
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        const loggedInUser = getLoggedInUser();
        this.options = [
            { label: 'user' },
            { label: 'manager' }
          ];

        if(loggedInUser?.role === 'admin'){
            this.options.push({ label: 'admin' });
        }
    }

    render() {
        const { email} = this.state.user;
        const submitted = this.state.submitted;
        return (
            <tr>
            <td>
                <input type="text" 
                    className="form-control" 
                    name="email" 
                    value={email} 
                    onChange={this.emailChange} 
                />
                        {
                            submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }

            </td>
            <td>
                <Select options={this.options} onChange={this.onRoleChange}/>
            </td>
            <td>
                <button onClick={this.toggleEditMode}>Cancel</button>
            </td>
            <td>
                <button onClick={this.saveUser}>Save</button>
            </td>
    </tr>
        );
    }

    emailChange = (e: { target: { name: any; value: any; }; }) => {
        const {value } = e.target;
        let user = this.state.user;
        user.email = value;
        this.setState({ user: user });
    }

    onRoleChange = (e: any) => {
        let user = this.state.user;
        user.role = e.label;
        this.setState({ user: user });
    }
  
    toggleEditMode = () =>{ 
        this.props.onToggleEditMode();
    }

    saveUser = () =>{

        console.log(this.state.user);
        if(this.state.user.id){
            userService.update(this.state.user)
            .then(()=>{this.props.onSaveUser(this.state.user);});
        }
        else{
            userService.create(this.state.user)
            .then(()=>{this.props.onSaveUser(this.state.user);});
        }
    }
}

export default EditableRow;