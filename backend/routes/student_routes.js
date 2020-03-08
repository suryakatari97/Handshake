"use strict";
const express = require("express");
const router = express.Router();


const student = require("../controllers/studentProfile");
var {getStudentProfiles} = require("../controllers/studentProfile");

//validations
const validateBasicInput = require("../validation/studentbasic");
const validateInput = require("../validation/studentExperience");
const validateEduInput = require("../validation/studentEducation");

//profilepic
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//functions that determine where the file should be stored
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("in destination");
    callback(null, "./uploads/profilepics");
  },

  filename: (req, file, callback) => {
    fileExtension = file.originalname.split(".")[1];
    console.log("fileExtension", fileExtension);
    callback(
      null,
      file.originalname.split(".")[0] + "-" + Date.now() + "." + fileExtension
    );
  }
});

var upload = multer({ storage: storage });

var checkIfEmpty = item => {
  if (item == null || item == "" || typeof item == "undefined") {
    return true;
  } else {
    return false;
  }
};

let base64Image = student_profileImageName => {
  var bitmap = fs.readFileSync(student_profileImageName);
  return new Buffer(bitmap).toString("base64");
};

let getImageDirectory = student_profieImageName => {
  let pathName = path.join(
    __dirname,
    "./uploads/profilepics",
    student_profieImageName
  );
  return pathName;
};

//uploading profile image
router.post(
  "/studentProfileImage",
  upload.single("selectedFile"),
  async (req, res) => {
    console.log("in student ");
    let studentId = req.body.id;
    let responseObj = {};

    try {
      let student_profieImageName = req.file.filename;
      responseObj = await student.updatestudentProfileImage(
        studentId,
        student_profieImageName
      );
      if (responseObj.status) {
        //send base64 image to client
        //override message property
        console.log(__dirname);
        let filePath = getImageDirectory(student_profieImageName);
        console.log(filePath);
        responseObj.message.student_profileImage =
          "data:image/png;base64," + base64Image(filePath);
      }
    } catch (err) {
      responseObj.status = false;
      responseObj.message =
        "Unexpected error at server side! Please login and try again!!";
      console.log(err);
    } finally {
      res.status(200).json({
        ...responseObj
      });
    }
  }
);

router.get("/studentdetails", async (req, res) => {
  console.log("inside profile get request");
  let studentId = req.query.id;
  console.log("inside profile get request", studentId);
  var resObj = {};
  try {
    resObj = await student.getstudentdetails(studentId);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});


router.post("/studentdetails", async (req, res) => {
  console.log("in post student details");
  const { errors, isValid } = validateBasicInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let resObj = {};
  console.log("in student details");
  //let studentId = req.body.id;
  let studentId = req.body.student_id;
  console.log(studentId);

  var studentdet = {
    first_name: req.body.fname,
    last_name: req.body.lname,
    dob: req.body.dob,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    email: req.body.email,
    phone_num: req.body.phone_num,
    skill_set: req.body.skill_set,
    career_obj: req.body.careerObj
  };
  try {
    console.log("sending data to student_details");
    resObj = await student.studentdetails(studentId, studentdet);
  } catch (e) {
    console.log(e);
    resObj.status = false;
    resObj.message = "Unknown error at database";
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.get("/studentExperience", async (req, res) => {
  console.log("inside student get experience");
   let studentId = req.query.id;
   //let studentId = 16;
  var resObj = {};
  try {
    resObj = await student.getstudentExperience(studentId);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.post("/studentExperience", async (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

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
    student_id: req.body.id,
    company_name: req.body.company_name,
    title: req.body.title,
    location: req.body.location,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    work_desc: req.body.work_desc
  };
  try {
    console.log("student experience details");
    resObj = await student.studentExperience(studentExp);
  } catch (e) {
    console.log(e);
    resObj.status = false;
    resObj.message = "error at database";
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.get("/studentEducation", async (req, res) => {
  console.log("inside student get education");
  let studentId = req.query.id;
  // let studentId = 16;
  let resObj = {};
  try {
    resObj = await student.getstudentEducation(studentId);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.post("/studentEducation", async (req, res) => {
  const { errors, isValid } = validateEduInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let resObj = {};
  console.log("in student education");
  if (!req.body.id || !req.body.degree || !req.body.major) {
    console.log("Missing primary key");
    res.status(400).json({
      msg: "Missing primary key pls reenter"
    });
    return;
  }
  var studentEdu = {
    student_id: req.body.id,
    college_name: req.body.clgName,
    degree: req.body.degree,
    location: req.body.location,
    major: req.body.major,
    year_passing: req.body.passingYear,
    cgpa: req.body.cgpa
  };
  try {
    console.log("sending data to student education");
    resObj = await student.studentEducation(studentEdu);
  } catch (e) {
    console.log(e);
    resp.status = false;
    resp.message = "Unknown error at database";
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});


router.get("/viewStudentProfiles", getStudentProfiles);


module.exports = router;
