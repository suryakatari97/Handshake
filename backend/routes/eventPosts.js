const express = require("express");
const router = express.Router();

//Load jobPosts Model
const eventPost = require("../controllers/company/eventPosts");
const StudentEvents = require("../controllers/events/studentEvents");
var { getEvents } = require("../controllers/events/studentEvents");

router.get("/getRegisteredStudentDetails", async function (req,res){
  var responseObj = {};
  try {
    console.log("In router");
    console.log(req.query);
    let event_id = req.query.event_id;
    responseObj = await eventPost.getRegisteredStudentDetails(event_id);
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
    date_of_event,
    event_description,
    time,
    location,
    eligibility,
    company_id
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
      company_id: company_id
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

router.get("/getStudentEvents", async (req, res) => {
  var resObj = {};
  try {
    let user_id = req.query.user_id;
    resObj = await StudentEvents.getStudentEvents(user_id);
    console.log(resObj);
  } catch (e) {
    console.log(e);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});

router.post("/eventregister", async (req, res) => {
  console.log("in event register Route");
  let { event_id, user_id, Registration } = req.body;
  var resObj = {};
  try {
    let eventregister = {
      student_id: user_id,
      Registration: Registration,
      event_id: event_id
    };
    resObj = await StudentEvents.eventRegister(eventregister);
  } catch (error) {
    console.log(error);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});
router.get("/viewevents", async (req, res) => {
  var resObj = {};
  try {
    let user_id = req.query.user_id;
    resObj = await getEvents(user_id);
    console.log(resObj);
  } catch (error) {
    console.log(error);
    resObj.status = false;
  } finally {
    res.status(200).json({
      ...resObj
    });
  }
});
module.exports = router;
