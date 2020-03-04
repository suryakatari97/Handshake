import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../studentProfile/StudentNavbar";

class studentDashboard extends Component {
  render() {
    return (
      <div>
        <StudentNavbar />
        <h1>TODO</h1>
        <Link to="/studentbasic" className="btn btn-lg btn-info">
          Create Profile
        </Link>
        <Link to="/studentEducation" className="btn btn-lg btn-info">
          Add Education
        </Link>
        <Link to="/studentExperience" className="btn btn-lg btn-info">
          Add Experience
        </Link>
      </div>
    );
  }
}

export default studentDashboard;
