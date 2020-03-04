const express = require("express");
const router = express.Router();

//Load jobPosts Model
const eventPost = require("../controllers/company/eventPosts");

router.get("/getEventDetails", async function(req, res) {
  var responseObj = {};
  try {
    let user_id = req.query.user_id;
    responseObj = await eventPost.getEventDetails(user_id);
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

router.post("/addEventPost", async function(req, res) {
  let {
    event_name,
    location,
    date_of_event,
    event_description,
    time,
    eligibility
  } = req.body;
  var responseObj = {};
  console.log("In EventPosts route");
  console.log(req.body);
  //change the order in which date is being entered into the database
  try {
    let eventDetails = {
      event_name: event_name,
      date_of_event: date_of_event,
      event_description: event_description,
      location: location,
      time: time,
      eligibility: eligibility,
      company_id: 1
    };
    console.log("before calling models eventPosts");
    console.log(eventDetails);
    responseObj = await eventPost.addEventPost(eventDetails);
  } catch (e) {
    console.log(e);
    responseObj.status = false;
  } finally {
    res.status(200).json({
      ...responseObj
    });
  }
});
