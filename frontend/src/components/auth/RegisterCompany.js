import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerCompany } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class RegisterCompany extends Component {
  constructor() {
    super();
    this.state = {
      company_name: "",
      email: "",
      password: "",
      location: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.userType === "student")
        this.props.history.push("/studentHome");
      else if (this.props.auth.user.userType === "company")
        this.props.history.push("/companyHome");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("In Submit post");

    const newUser = {
      company_name: this.state.company_name,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location
    };

    console.log(newUser);

    this.props.registerCompany(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">
              Create your Handshake(Company) account
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Company Name"
                name="company_name"
                value={this.state.company_name}
                onChange={this.onChange}
                error={errors.company_name}
              />

              <TextFieldGroup
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <TextFieldGroup
                type="password"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <TextFieldGroup
                type="location"
                placeholder="location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.password}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterCompany.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerCompany })(
  withRouter(RegisterCompany)
);
