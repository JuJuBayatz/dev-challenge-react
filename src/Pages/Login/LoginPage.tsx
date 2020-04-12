import React from 'react';
import {userService} from '../../Services/user.service';
import SampleAppButtonLaunch from '../../components/SampleAppButtonLaunch';
import { IAccountInfo } from 'react-aad-msal';

interface LoginState{
    email: string,
    password: string,
    submitted: boolean,
    loggingIn: boolean,
    userInfo:any|null
};

class LoginPage extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state={
            email: '',
            password: '',
            submitted: false,
            loggingIn: false,
            userInfo: null
        };
    }

    handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        if(name === 'email'){
            this.setState({ email: value });
        }
        else{
            this.setState({ password: value });
        }
    }

    userInfoCallback = (userInfo:IAccountInfo) => {
        if(userInfo && !this.state.submitted)
        {
            this.setState({ 
                userInfo,
                submitted: true
            });
            console.log(userInfo);
            userService.loginOpenId(userInfo?.account.userName, userInfo?.jwtIdToken)
            .then(()=>{
                console.log('loggedIn');
                window.location.reload();
            })
            .finally(()=>{
                this.setState({loggingIn: false})
            });
        }
        
      }

    handleSubmit = (e:any) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password} = this.state;
        if (email && password) {
            this.setState({loggingIn: true});
            userService.login(email,password)
            .then(()=>{
                window.location.reload();
            })
            .finally(()=>{
                this.setState({loggingIn: false})
            });
        }
    }

    render() {
        const { email, password, submitted, loggingIn } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-6">
                        <h2>Login</h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                {
                                    submitted && !email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                           
                            <div className="form-group">
                                <button className="btn btn-primary">Login</button>
                                {
                                    loggingIn &&
                                    <img alt="test" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            <div className="SampleBox">
                                <h3 className="SampleHeader">AAD Login</h3>
                                <p>Azure Active Directory Authorization</p>
                                <SampleAppButtonLaunch userInfoCallback={this.userInfoCallback} />
                            </div>
                        </form>
                    </div>
                </div></div>
        );
    }
}

export { LoginPage }; 