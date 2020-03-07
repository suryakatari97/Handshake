const dbConnection = require("./dbconnection");

var getJobDetails = async () => {
  let conn;
  // let insertId = -1;
  let message = "";
  let status = false;
  try {
    console.log("In get job model function");
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      console.log("Get job-posts");
      var jobs = await conn.query("SELECT * FROM job_post");
      await conn.query("COMMIT");
      console.log(jobs);
      message = "Job retrieved successfully!";
      status = true;
      console.log(message);
    }
  } catch (e) {
    console.log(e);
    message = "Error! Please restart the system";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      message: message,
      jobs: jobs
    };
  }
};

module.exports = {
    getJobDetails,
}