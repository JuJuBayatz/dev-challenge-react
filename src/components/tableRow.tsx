import React, { Component } from 'react';
import {userModel} from '../models/userModel';
import EditableRow from './editableRow';

interface TableRowProps  {
    user:userModel, 
    role:string 
};

interface TableRowState  {
    editMode:boolean, 
    user:userModel,
    submitted: boolean
};

class TableRow extends Component<TableRowProps, TableRowState> {

    constructor(props:TableRowProps) {
        super(props);
        this.state = {
            user: this.props.user,
            editMode: false,
            submitted: false
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }  

    render() {
        if(!this.state)
            return null;

        const { email, role} = this.state.user;
        const submitted = this.state.submitted;
        return (
            this.state.editMode
            ?<EditableRow user={this.state.user} onToggleEditMode={this.toggleEditMode} onSaveUser={this.saveUser}/>
            :<tr>
                <td>{email}</td>
                <td>{role}</td>
                <td>
                    <button onClick={this.toggleEditMode}>EditMode</button>
                </td>
            </tr>
            
            
        );
    } 

    toggleEditMode = ()=>{
        this.setState({editMode: !this.state.editMode});
    }

    saveUser = (user:userModel)=> {
        this.setState({
            user:user,
            editMode: false
        });
    }
}

export default TableRow;