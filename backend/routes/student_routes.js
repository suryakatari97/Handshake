"use strict";
const express = require("express");
const router = express.Router();

const student = require('../controllers/studentProfile');

router.post("/studentdetails", async (req, res) => {
    var resObj ={};
    console.log("in student details");
    let studentId = req.body.id;
    var student = {
        "name":req.body.name,
        "dob": req.body.dob,
        "city": req.body.city,
        "state": req.body.state,
        "country": req.body.country,
        "career_obj": req.body.careerObj 
    }
    try {
        console.log("sending data to student_details");
        resObj = await student.
        
    }

})



module.exports = router;