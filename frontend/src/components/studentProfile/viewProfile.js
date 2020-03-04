import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, getEducation } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

class viewProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(this.props.auth.user.id);
    //this.props.getEducation(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    //to make sure that profile state is not equal to NULL before we render

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let viewProfileContent;

    if (profile == null || loading) {
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
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/editstudentbasic"
                className="btn btn-light mb-3 float-left"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      );
    }

    return (
      <div className="viewprofile">
        <StudentNavbar />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h1 className="display-4">Profile</h1>
              {viewProfileContent}
            </div>

            <div className="col-md-9 align-middle">
              <div className="card w-75">
                <div className="card-body">
                  <h5 className="card-title">Education</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="/studentEducation" className="btn btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-3"></div>
            <div className="col-md-9 align-middle">
              <div className="card w-75">
                <div className="card-body">
                  <h5 className="card-title">Experience</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="/studentExperience" className="btn btn-primary">
                    Edit
                  </a>
                </div>
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

// export default connect(mapStateToProps, { getCurrentProfile, getEducation })(
//   viewProfile
// );
export default connect(mapStateToProps, { getCurrentProfile })(viewProfile);
