import React, { Component } from 'react';
import {userModel} from '../models/userModel';
import {userService} from '../Services/user.service';

class EditableRow extends Component<any, {user: userModel, submitted: boolean}> {

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
    }
    render() {
        const { email, role} = this.state.user;
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
            <td>{this.props.user.role}</td>
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
            this.state.user.email = value;
            this.setState({ user: this.state.user });
    }

    roleChange = (e: { target: { name: any; value: any; }; }) => {
        const {value } = e.target;
            this.state.user.role = value;
            this.setState({ user: this.state.user });
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