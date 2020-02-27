const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEduInput(data) {

    let errors = {};

    data.clgName = !isEmpty(data.clgName) ? data.clgName : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.major = !isEmpty(data.major) ? data.major : "";
    data.passingYear = !isEmpty(data.passingYear) ? data.passingYear : "";
    data.cgpa = !isEmpty(data.cgpa) ? data.cgpa : "";

    if (Validator.isEmpty(data.clgName)) {
        errors.clgName = "this field is required";
    }

    if (Validator.isEmpty(data.major)) {
        errors.major = "this field is required";
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = "this field is required";
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = "this field is required";
    }
    if (Validator.isEmpty(data.passingYear)) {
        errors.passingYear = "this field is required";
    }
    if (Validator.isEmpty(data.cgpa)) {
        errors.cgpa = "this field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}