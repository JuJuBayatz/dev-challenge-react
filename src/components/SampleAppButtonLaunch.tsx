import * as React from 'react';
import { AzureAD, LoginType,MsalAuthProvider } from 'react-aad-msal';
import { userService } from '../Services/user.service';

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
                provider={new MsalAuthProvider({
                    auth:{
                        clientId: 'd9ca585f-7e82-481d-bace-a4f141d7fd90',
                        authority:'https://login.microsoftonline.com/common' ,
                        postLogoutRedirectUri:'http://localhost:3000/'
                    }
                },
                {
                    scopes: ["openid", "offline_access", "https://graph.microsoft.com/mail.read"]
                },
                {
                    loginType:LoginType.Popup
                }
                                 )}
                unauthenticatedFunction={this.unauthenticatedFunction}
                authenticatedFunction={this.authenticatedFunction}
                accountInfoCallback={this.userJustLoggedIn} 
                />
        );
    }
}

export default SampleAppButtonLaunch;