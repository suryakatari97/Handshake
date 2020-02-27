const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInput(data) {

let errors = {};

    data.company_name = !isEmpty(data.company_name) ? data.company_name : "";
    data.title = !isEmpty(data.title) ? data.title : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
    data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
    data.work_desc = !isEmpty(data.work_desc) ? data.work_desc : "";

if (Validator.isEmpty(data.company_name)) {
    errors.company_name = "this field is required";
}

if (Validator.isEmpty(data.title)) {
    errors.title = "this field is required";
}

if (Validator.isEmpty(data.location)) {
    errors.location = "this field is required";
}

if (Validator.isEmpty(data.start_date)) {
    errors.start_date = "this field is required";
}

if (Validator.isEmpty(data.end_date)) {
    errors.end_date = "this field is required";
}

if (Validator.isEmpty(data.work_desc)) {
    errors.work_desc = "this field is required";
}
return {
    errors,
    isValid: isEmpty(errors)
};
};
