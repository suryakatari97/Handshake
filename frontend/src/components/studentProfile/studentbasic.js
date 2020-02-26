import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {createProfile} from '../../actions/profileActions';

 class studentbasic extends Component {
   constructor(props) {
     super(props);
     this.state = {
       fname: "",
       lname: "",
       dob: "",
       city: "",
       state: "",
       country: "",
       careerObj: "",
       email: "",
       phone_num: "",
       skill_set: "",
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }
   onSubmit(e) {
     e.preventDefault();
        const basicData = {
          fname: this.state.fname,
          lname: this.state.lname,
          dob: this.state.dob,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          careerObj: this.state.careerObj,
          email: this.state.email,
          phone_num: this.state.phone_num,
          skill_set: this.state.skill_set
        };
        //we call redux action using props
        this.props.createProfile(basicData, this.props.history);
     
   }
   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }

   render() {
     const { errors } = this.state;
     return (
       <div className="studentbasic">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">
                 Enter your basic details
               </h1>
               <form onSubmit={this.onSubmit}>
                 <TextFieldGroup
                   placeholder="fname"
                   name="fname"
                   value={this.state.fname}
                   onChange={this.onChange}
                   error={errors.fname}
                 />

                 <TextFieldGroup
                   placeholder="lname"
                   name="lname"
                   value={this.state.lname}
                   onChange={this.onChange}
                   error={errors.lname}
                 />
                 <TextFieldGroup
                   placeholder="dob"
                   name="dob"
                   value={this.state.dob}
                   onChange={this.onChange}
                   error={errors.dob}
                 />
                 <TextFieldGroup
                   placeholder="city"
                   name="city"
                   value={this.state.city}
                   onChange={this.onChange}
                   error={errors.city}
                 />
                 <TextFieldGroup
                   placeholder="state"
                   name="state"
                   value={this.state.state}
                   onChange={this.onChange}
                   error={errors.state}
                 />
                 <TextFieldGroup
                   placeholder="country"
                   name="country"
                   value={this.state.country}
                   onChange={this.onChange}
                   error={errors.country}
                 />
                 <TextFieldGroup
                   placeholder="email"
                   name="email"
                   value={this.state.email}
                   onChange={this.onChange}
                   error={errors.email}
                 />
                 <TextFieldGroup
                   placeholder="Phone Number"
                   name="phone_num"
                   value={this.state.phone_num}
                   onChange={this.onChange}
                   error={errors.phone_num}
                 />
                 <TextAreaFieldGroup
                   placeholder="skill_set"
                   name="skill_set"
                   value={this.state.skill_set}
                   onChange={this.onChange}
                   error={errors.skill_set}
                 />
                 <TextAreaFieldGroup
                   placeholder="careerObj"
                   name="careerObj"
                   value={this.state.careerObj}
                   onChange={this.onChange}
                   error={errors.careerObj}
                 />
                 <input
                   type="submit"
                   value="Submit"
                   className="btn btn-info btn-block mt-4"
                 />
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
studentbasic.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//mapping state to props
const mapStateToProps = state => ({
profile: state.profile,
errors: state.erros
});

export default connect(mapStateToProps, { createProfile })(withRouter(studentbasic));
