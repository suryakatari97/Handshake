'use strict'
const dbConnection = require("../dbconnection");

var getCompanyDetails = async company_Id => {
    let conn;
    let msg;
    let status = false;
    try {
      conn = await dbConnection();
      if (conn) {
        var user = true;
        console.log("user: ", user);
        await conn.query("START TRANSACTION");
        if (user) {
          var companyDetails = await conn.query(
            "select * from company_register where company_id =" + company_Id
          );
        }
        await conn.query("COMMIT");
        status = true;
        msg = "Company details fetched";

        console.log(msg);
      }
    } catch (e) {
      console.log(e);
      msg = "error in connecting db";
      status = false;
    } finally {
      if (conn) {
        await conn.release();
        await conn.destroy();
      }
      return {
        status: status,
        message: msg,
        companyDetails: companyDetails
      };
    }
}

module.exports = {
  getCompanyDetails
};