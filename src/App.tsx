import React, { Component } from 'react';
import './App.css';
import { LoginPage } from './Pages/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import {getLoggedInUser} from './helpers/localStorageService';
import httpService from './helpers/interceptors';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props:any) {
      super(props);

      httpService.setupInterceptors(null, null);
      
  }
    render(){
      const loggedInUser = getLoggedInUser();
      return (
        <div className="App">
              
                  <div>
                  {
                      !loggedInUser 
                      ? <LoginPage logginCallback/>
                      : <HomePage />
                  }
                  </div>
              
          </div>
      );
    }
  
}



export default App;
