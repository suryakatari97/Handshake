const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput (data)  {

    let errors ={};

    data.fname =!isEmpty(data.fname) ? data.fname : '';
    data.lname =!isEmpty(data.lname) ? data.lname : '';
    data.email =!isEmpty(data.email) ? data.email : '';
    data.password =!isEmpty(data.password) ? data.password : '';
    data.cname =!isEmpty(data.cname) ? data.cname : '';
    
    if(!Validator.isLength(data.fname,{min:2, max:30})) {
        errors.fname ='Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.fname)) {
        errors.fname = 'Name field is required';
    }
    
    if(Validator.isEmpty(data.lname)) {
        errors.lname = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }
    if(Validator.isEmpty(data.cname)) {
        errors.cname = 'college field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid';
    }
    if(!Validator.isLength(data.password,{min :6,max:30})){
        errors.password = 'password must be atleast 6 characters';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

//module.exports = {validateRegisterInput}