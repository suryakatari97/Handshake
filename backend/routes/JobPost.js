const express = require("express");
const router = express.Router();

const jobPost = require('../controllers/JobPost');

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

//companyaddJob
router.post("/addJobPost", async function(req, res) {
  let {
    job_title,
    posting_date,
    app_deadline,
    location,
    salary,
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