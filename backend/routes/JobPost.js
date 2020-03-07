const express = require("express");
const router = express.Router();

const jobPost = require('../controllers/JobPost');

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

module.exports = router;