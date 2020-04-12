import * as React from 'react';
import { AzureAD } from 'react-aad-msal';
import { userService } from '../Services/user.service';
import {authProvider} from '../config/config'

class SampleAppButtonLaunch extends React.Component<any, any> {
    unauthenticatedFunction = (loginFunction:any) => {
        return (
            <button className="Button" onClick={loginFunction}>Login</button>
        );
    }

    userJustLoggedIn = (receivedUserInfo:any) => {
        if(this.props.userInfoCallback)
        {
            this.props.userInfoCallback(receivedUserInfo);
        }
        
    }

    logout = ()=>{
        userService.logout();
        window.location.reload();
    }

    authenticatedFunction = (logout:any) => {
        const click = ()=>{
            this.logout();
            logout();
        }
        return (<div>
            You're logged in through AAD!
            <br />
            <br />
            <button onClick={click} className="Button">Logout</button>
            <br />
        </div>) ;
    }

    render() {
        
        return (
            <AzureAD
                provider={authProvider}
                unauthenticatedFunction={this.unauthenticatedFunction}
                authenticatedFunction={this.authenticatedFunction}
                accountInfoCallback={this.userJustLoggedIn} 
                />
        );
    }
}

export default SampleAppButtonLaunch;