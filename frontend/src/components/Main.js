import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import studentbasic from './studentProfile/studentbasic';
import studentEducation from './studentProfile/studentEducation';
import studentExperience from './studentProfile/studentExperience';
import viewProfile from './studentProfile/viewProfile';
import studentDashboard from './studentDashboard/studentDashboard';
import Landing from './layout/Landing';
import EditStudentProfileBasic from './studentProfile/EditStudentProfileBasic';
import eventPost from './eventPost/eventPost';
import viewevents from './studentProfile/studentviewevents';
import viewStudentProfiles from './studentProfile/viewStudentProfiles';
import studentRegisteredevents from './studentProfile/studentRegisteredevents';
import viewstudentjobs from './studentjobs/Jobs';
import CompanyHome from './company/CompanyHome';
import RegisterCompany from './auth/RegisterCompany';
import companyProfile from './company/CompanyProfile';
import JobPost from "./company/JobPost";

 class Main extends Component {
    render() {
        return (
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/jobPost" component={JobPost} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/registerCompany" component={RegisterCompany} />
            <Route path="/companyProfile" component={companyProfile} />
            <Route path="/companyHome" component={CompanyHome} />
            <Route exact path="/studentviewevents" component={viewevents} />
            <Route exact path="/viewstudentjobs" component={viewstudentjobs} />
            <Route
              exact
              path="/getStudentEvents"
              component={studentRegisteredevents}
            />
            <Route
              exact
              path="/viewStudentProfiles"
              component={viewStudentProfiles}
            />
            <Route
              exact
              path="/studentDashboard"
              component={studentDashboard}
            />
            <Route exact path="/eventPost" component={eventPost} />

            <Route exact path="/studentbasic" component={studentbasic} />
            <Route
              exact
              path="/studentEducation"
              component={studentEducation}
            />
            <Route
              exact
              path="/studentExperience"
              component={studentExperience}
            />
            <Route
              exact
              path="/editstudentbasic"
              component={EditStudentProfileBasic}
            />
            <Route exact path="/viewprofile" component={viewProfile} />
          </div>
        );
    }
}

export default Main;