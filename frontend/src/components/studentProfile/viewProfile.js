import React, { Component } from 'react';
import PropTypes from  'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';


 class viewProfile extends Component {
     componentDidMount() {
         this.props.getCurrentProfile();
     }
    render() {
        //to make sure that profile state is not equal to NULL before we render

        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let viewProfileContent;
        if(profile === null || loading){
            viewProfileContent = <Spinner />;
        }
        else {
            // check if logged in user has profile data
            if(Object.keys(profile).length > 0) {
                viewProfileContent = <h4>TODO :Display Profile</h4>
            } else {
                //user is logged in but has no profile
                viewProfileContent = (
                    <div>
                        <p className="lead text-muted">Welcome</p>
                        <p>create your profile</p>
                        <Link to="/studentbasic" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                ); 
            }
        }
        return (
            <div className="viewprofile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Profile</h1>
                            {viewProfileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

viewProfile.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth:state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(viewProfile);