import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import studentbasic from './studentProfile/studentbasic';
import viewProfile from './studentProfile/viewProfile'
 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/studentbasic" component={studentbasic} />
            <Route exact path="/viewprofile" component={viewProfile} />
          </div>
        );
    }
}

export default Main;