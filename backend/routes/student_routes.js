"use strict";
const express = require("express");
const router = express.Router();

const student = require('../controllers/studentProfile');

router.post("/studentdetails", async (req, res) => {
    let resObj = {};
    console.log("in student details");
    let studentId = req.body.id;
    var studentdet = {
        "name": req.body.name,
        "dob": req.body.dob,
        "city": req.body.city,
        "state": req.body.state,
        "country": req.body.country,
        "career_obj": req.body.careerObj
    }
    try {
        console.log("sending data to student_details");
        resObj = await student.studentdetails(studentId, studentdet);
    } catch (e) {
        console.log(e);
        resObj.status = false;
        resObj.message = "Unknown error at database";
    }
    finally {
        res.status(200).json(
            {
                ...resObj
            });
    }
});

router.post("/studentExperience", async (req, res) => {
    let resObj = {};
    console.log("in student experience");
    if (!req.body.id || !req.body.company_name || !req.body.start_date) {
        console.log("missing primary key");
        res.status(400).json({
            msg: "missing primary key "
        });
        return;
    }
    var studentExp = {
        "student_id": req.body.id,
        "company_name": req.body.company_name,
        "title": req.body.title,
        "location": req.body.location,
        "start_date": req.body.start_date,
        "end_date": req.body.work_desc
    }
    try {
        console.log("student experience details");
        resObj = await student.studentExperience(studentExp);

    } catch (e) {
        console.log(e);
        resObj.status = false;
        resObj.message = "error at database";
    }
    finally {
        res.status(200).json(
            {
                ...resObj
            });
    }
});



module.exports = router;