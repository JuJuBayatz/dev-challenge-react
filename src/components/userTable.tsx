import React, { Component } from 'react';
import TableRow from './tableRow';

class UserTable extends Component<any, {users?:any}> {
    constructor(props: any) {
        super(props);
        this.state = { users: this.props.users};
       
    }

    render() {

        return <div className="row justify-content-center align-items-center vh-100">
             <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    
                </thead>
                <tbody>
                {
                    this.state.users.map((user:any, i:number) => {
                        return (<TableRow user={user} role={'admin'} key={i}></TableRow>);
                    })
                }               
                </tbody>
            </table>
        </div>
    }
}

export default UserTable;