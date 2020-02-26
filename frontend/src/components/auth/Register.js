import React, { Component } from "react";
import PropTypes from "prop-types";
//import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cname: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      cname: this.state.cname
    };
    //console.log(newUser);
    this.props.registerUser(newUser, this.props.history); //action called through props

    // axios.post("/user/signUpStudent", newUser)
    // .then(res => console.log(res.data))
  }

  render() {
    const { errors } = this.state;
    //const errors = this.state.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Handshake account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="firstName"
                  name="fname"
                  value={this.state.fname}
                  onChange={this.onChange}
                  error={errors.fname}
                />

                <TextFieldGroup
                  placeholder="lastName"
                  name="lname"
                  value={this.state.lname}
                  onChange={this.onChange}
                  error={errors.lname}
                />

                <TextFieldGroup
                  //type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="college Name"
                  name="cname"
                  value={this.state.cname}
                  onChange={this.onChange}
                  error={errors.cname}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//mapping react properties to proptypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//to get offstate to the component
const mapStateToProps = state => ({
  auth: state.auth, //rootreducer
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
