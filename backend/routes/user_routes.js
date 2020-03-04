"use strict";
const express = require("express");
const router = express.Router();
const sha1 = require("sha1");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const signup = require("../controllers/studentlogin");

router.get("/signUp", (req, res) => res.json({ msg: "signup" }));

router.post("/signUpStudent", async function(req, res) {
  console.log("enter signup backend");

  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(isValid);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  let { email, fname, lname, cname, password } = req.body;

  var resObj = {};
  console.log("in signupstudent route");
  console.log(req.body);
  try {
    password = sha1(password);
    email = email.toLowerCase().trim();
    let student = {
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
      college: cname
    };
    resObj = await signup.signUpStudent(student);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.post("/signUpCompany", async (req, res) => {
  let { email, password, name, location } = req.body;
  var resObj = {};
  console.log("In signup company route");
  console.log(req.body);
  try {
    password = sha1(password);
    email = email.toLowerCase().trim();
    let company = {
      email: email,
      password: password,
      company_name: name,
      location: location
    };
    console.log("before calling Models(DB) signup");
    resObj = await signup.signUpCompany(company);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.post("/signIn", async function(req, res) {

  const { errors, isValid } = validateLoginInput(req.body);
  console.log(isValid);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("in signin route..");
  console.log(req.body);
  let { email, password, userType } = req.body;
  email = email.toLowerCase().trim();
  password = sha1(password);
  let status = false;
  console.log("In signin route..");
  try {
    let userData = {
      email: email,
      password: password,
      userType: userType
    };
    var responseObj = await signup.signIn(userData);
    status = responseObj.status;
    console.log(responseObj);
    console.log("responseObj....");
    console.log(responseObj);
  } catch (e) {
    console.log(e);
    status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

module.exports = router;
