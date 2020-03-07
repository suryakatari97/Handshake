import React, { Component } from "react";
import StudentNavbar from "../studentProfile/StudentNavbar";
import navbar from "./navbar";
import JobFilter from './JobFilter';

export default class Jobs extends Component {
  render() {
    let home = { home: "Job Search" };
    return (
      <div>
        <StudentNavbar />
        <navbar links={home}/>
        <JobFilter/>
      </div>
    );
  }
}
