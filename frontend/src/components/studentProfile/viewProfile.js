import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  getStudentEducation,
  getStudentExperience
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentEducation from "./viewStudentEducation";
import StudentExperience from "./viewStudentExperience";

class viewProfile extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.getCurrentProfile(this.props.auth.user.id);
      this.props.getStudentEducation(this.props.auth.user.id);
      this.props.getStudentExperience(this.props.auth.user.id);
    }
  }


  render() {
    //to make sure that profile state is not equal to NULL before we render

    const { user } = this.props.auth;
    const { profile = [], loading } = this.props.profile;
    const { education = [], eduLoading } = this.props.education;
    const { experience = [], expLoading } = this.props.experience;

    let viewProfileContent;

    if (
      profile == null ||
      loading ||
      education === null ||
      eduLoading ||
      experience === null ||
      expLoading
    ) {
      //viewProfileContent = <Spinner />;
      viewProfileContent = (
        <Link to="/studentbasic" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      );
    } // check if logged in user has profile data
    else {
      //user is logged in but has no profile
      viewProfileContent = (
        <div>
          <p className="lead text-muted">Welcome {user.first_name}</p>

          <Link to="/editstudentbasic" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      );
    }

    return (
      <div>
        <StudentNavbar />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h1 className="">Profile</h1>
              {viewProfileContent}
            </div>
            <div className="col-8">
              <div>
                <StudentEducation education={education} />
                <div id="edu"></div>
                <StudentExperience experience={experience} />
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

viewProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getStudentEducation: PropTypes.func.isRequired,
  getStudentExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  education: state.education,
  experience: state.experience,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getStudentEducation,
  getStudentExperience
})(viewProfile);
