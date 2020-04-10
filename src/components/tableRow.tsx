import React, { Component } from 'react';
import {userModel} from '../models/userModel';
import { getLoggedInUser } from '../helpers/localStorageService';

type TableRowProps = {
    user:userModel, 
    role:string 
}

type TableRowState = {
    editMode:boolean, 
    user:userModel
}

class TableRow extends Component<TableRowProps, TableRowState> {
    constructor() {
        this.setState({
            editMode: false
        });
    }
    componentDidMount() {
        this.setState({
            user: this.props.user,
            editMode: false
        }); 
    }  
    render() {
        
        return (
            this.state.editMode
            ?
            <tr>
                    <td>{this.props.user.email}</td>
                    <td>{this.props.user.role}</td>
                    <td></td>
            </tr>
            :
            <tr>
                    <td>
                        {this.props.user.email}

                    </td>
                    <td>{this.props.user.role}</td>
                    <td></td>
            </tr>
            
     
        );
    }
}

export default TableRow;