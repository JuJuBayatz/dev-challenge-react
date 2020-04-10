import React, { Component } from 'react';
import TableRow from './tableRow';

class UserTable extends Component<any, {users?:any}> {
    constructor(props: any) {
        super(props);
        this.state = { users: this.props.users};
       
    }

    render() {

        return <table>
                    <thead>
                        <th>Email</th>
                        <th>Role</th>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map((user:any, i:number) => {
                            return (<TableRow user={user} role={'admin'} ></TableRow>);
                        })
                    }               
                    </tbody>
                </table>
       

    }
}

export default UserTable;