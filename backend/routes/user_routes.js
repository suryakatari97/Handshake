"use strict";
const express = require("express");
const router = express.Router();
const sha1 = require('sha1');

const signup = require('../controllers/studentlogin');

router.get('/signUp', (req,res) => res.json(
    { msg:"signup" } ));



router.post('/signUpStudent', async function(req, res){
    let{email, fname, lname, college, password } =req.body;
    var resObj = {};
    console.log('in signupstudent route');
    console.log(req.body);
    try {
        password = sha1(password);
        email = email.toLowerCase().trim();
        let student = {
            first_name : fname,
            last_name : lname,
            email : email,
            password : password,
            college : college
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

router.post('/signUpCompany', async (req, res) => {
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

router.post("/signIn", async function (req, res) {
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
        let user_id = userType === "student" ? "student_id" : "company_id";
        // let user_name = userType === "owner" ? "owner_name" : "buyer_name";
        //let name = responseObj.name;

        console.log(responseObj);
        if (status) {
            res.cookie("user_type", userType, { maxAge: 900000, httpOnly: false, path: '/' });
            res.cookie(user_id, responseObj[user_id], { maxAge: 900000, httpOnly: false, path: '/' });
            res.cookie("name", responseObj.name, { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = email;
        }
        /* res.writeHead(200,{
             "status" : 200,
             'Content-Type' : 'text/plain'
         })*/
        console.log("responseObj....");
        console.log(responseObj);
    } catch (e) {
        console.log(e);
        status = false;
    }
    finally {
        // res.end(JSON.stringify({...responseObj,status:status}));
        res.status(200).json({
            ...responseObj
        });

    }
});



module.exports = router;