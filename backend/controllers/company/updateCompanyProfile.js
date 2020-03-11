'use strict'

const dbConnection = require("../dbconnection");

var updateCompanyProfile = async(companyId, companyProfile) => {
    let conn;
    let msg;
    let status = false;
    let table = 'company_register';
    try {
      conn = await dbConnection();
      if (conn) {
        var userExists = await profileExists(companyId, table, conn);
        await conn.query("START TRANSACTION");
        if (userExists) {
          await connection.query(
            "UPDATE company_register SET ? where company_id = ?",
            [companyProfile, companyId]
          );
          await connection.query("COMMIT");
          status = true;
          msg = "company details updated";
          console.log(msg);
        } else {
          msg = "company not registerd cannot update profile";
          console.log(msg);
        }
      }
    } catch (error) {
      console.log(error);
      msg = "Error in connecting to db";
      status = false;
    } finally {
      if (conn) {
        await conn.release();
        await conn.destroy();
      }
      return {
        status: status,
        message: msg
      };
    }



};

let profileExists = async (id, table, conn) => {
  console.log(`Id is ${id} searching in table: ${table}`);
  if (conn) {
    result = await conn.query("Select * from ?? where company_id = ?", [
      table,
      id
    ]);
    console.log(result);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};


module.exports = {
  updateCompanyProfile
};