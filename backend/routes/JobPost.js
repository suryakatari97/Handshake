const express = require("express");
const router = express.Router();

const jobPost = require('../controllers/JobPost');

router.post("/updateAppliedJob",async function (req, res){
  let { student_id, app_status, job_id } = req.body;
  console.log(req.body);
  var responseObj = {};
  console.log("In updateAppliedJobs route");
  try {
    var updateAppliedJob = {
      student_id: student_id,
      job_id: job_id,
      app_status: app_status
    };
    console.log("Before calling models updateAppliedJobs");
    responseObj = await jobPost.updateAppliedJob(updateAppliedJob);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({ ...responseObj });
  }

});
//studentviews
router.get("/getJobDetails", async function(req, res) {
  var responseObj = {};
  try {
    responseObj = await jobPost.getJobDetails();
    console.log(responseObj);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

router.get("/getAppliedStudentDetails", async function(req,res){
var responseObj = {};
try {
  console.log("In router getAppliedStudentDetails");
  console.log(req.query);
  let job_id = req.query.job_id;
  responseObj = await jobPost.getAppliedStudentDetails(job_id);
  console.log(responseObj);
} catch (e) {
  console.log(e);
  responseObj.status = false;
} finally {
  res.status(200).json({
    ...responseObj
  });
}

});
router.get("/getCompanyJobDetails", async function(req, res) {
  var responseObj = {};
  try {
    let company_id = 5;
    responseObj = await jobPost.getCompanyJobDetails(company_id);
    console.log(responseObj);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

//companyaddJob
router.post("/addJobPost", async function(req, res) {
  let {
    job_title,
    posting_date,
    app_deadline,
    salary,
    location,
    job_description,
    job_category,
    company_id
  } = req.body;
  var responseObj = {};
  console.log("In jobPosts route");
  console.log(req.body);
  //change the order in which date is being entered into the database
  try {
    let jobDetails = {
      job_title: job_title,
      posting_date: posting_date,
      app_deadline: app_deadline,
      location: location,
      salary: salary,
      job_description: job_description,
      job_category: job_category,
      company_id: company_id
    };
    console.log("before calling models jobPosts");
    console.log(jobDetails);
    responseObj = await jobPost.addJobPost(jobDetails);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

router.post("/getSearchedJobDetails", async function(req, res) {
  let { keyword, location } = req.body;
  console.log(req.body);
  console.log(keyword, location);
  var responseObj = {};
  try {
    responseObj = await jobPost.getSearchedJobDetails(keyword, location);
    console.log(responseObj);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});

router.post("/getAppliedJobDetails", async function(req, res) {
  let { user_id } = req.body;
  console.log(req.body);
  console.log(user_id);
  var responseObj = {};
  try {
    responseObj = await jobPost.getAppliedJobDetails(user_id);
    console.log(responseObj);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});
module.exports = router;