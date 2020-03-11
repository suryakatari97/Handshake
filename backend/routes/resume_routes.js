"use strict";
const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const resume = require("../controllers/resume");
//../uploads/resume

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/resume");
  },
  filename: (req, file, callback) => {
    // fileExtension = file.originalname.split(".")[1];
    // console.log("fileExtension", fileExtension);
    callback(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        path.extname(file.originalname)
    );
  }
    // callback(null,file.originalname);}
});
var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("In upload resume");

  let filename = req.file.filename; //fieldname property ??
  let responseObj = {};
  try {
    let inputData = {
      job_id: req.body.job_id,
      student_id: req.body.student_id,
      file_name: filename
    };
    responseObj = await resume.createNewUser(inputData);
    console.log(responseObj);
  } catch (error) {
    console.log(error);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

module.exports = router;
