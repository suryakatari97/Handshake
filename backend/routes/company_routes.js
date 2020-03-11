"use strict";
const express = require("express");
const router = express.Router();
const {getCompanyDetails} = require('../controllers/company/getCompanyProfile');
const {updateCompanyProfile} = require('../controllers/company/updateCompanyProfile');

router.get("/getCompanyProfile", async (req, res) => {
     console.log("inside profile get request");
     var company_Id = req.query.id;
     console.log(company_Id);
     var resObj = {};
     try {
       resObj = await getCompanyDetails(company_Id);
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

router.post("/updateCompanyProfile", async (req, res) => {
    var resp = {};
    console.log("In update Company profile");
    let {
      company_name,
      location,
      description,
      contact_info,
      profile_pic
    } = req.body;
    let companyId = req.body.company_id;
    let companyProfile = {
      company_name: company_name,
      location: location,
      description: description,
      contact_info: contact_info,
      profile_pic: profile_pic
    };
    try {
      console.log("sending update company details to db");
      resp = await updateCompanyProfile(companyId, companyProfile);
    } catch (e) {
      console.log(e);
      resp.status = false;
      resp.message = "Unknown error at database";
    } finally {
      res.status(200).json({
        ...resp
      });
    }
});

module.exports = router;