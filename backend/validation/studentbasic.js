const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBasicInput(data) {
  let errors = {};
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone_num = !isEmpty(data.phone_num) ? data.phone_num : "";
  data.skill_set = !isEmpty(data.skill_set) ? data.skill_set : "";
  careerObj = !isEmpty(data.careerObj) ? data.careerObj : "";

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.fname)) {
    errors.fname = "Name field is required";
  }

  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Name field is required";
  }

  if (Validator.isEmpty(data.dob)) {
    errors.dob = "DOB field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "This field is required";
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = "This field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "This field is required";
  }
  if (Validator.isEmpty(data.phone_num)) {
    errors.phone_num = "This field is required";
  }
  if (!Validator.isLength(data.phone_num, { min: 10, max: 10 })) {
    errors.phone_num = "phone number must be 10 digits";
  }
  if (Validator.isEmpty(data.skill_set)) {
    errors.skill_set = "This field is required";
  }
  if (Validator.isEmpty(data.careerObj)) {
    errors.careerObj = "This field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
