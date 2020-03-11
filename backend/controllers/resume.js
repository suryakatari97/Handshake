const dbConnection = require("./dbconnection");

var createNewUser = async (inputData) => {
  console.log("In upload resume Method");
  
    let con = await dbConnection();
    let msg;
    let status = false;
    let table = "applied_jobs"
    try {
      if(con) {
      await con.query("START TRANSACTION");
      let savedUser = await con.query("INSERT INTO ?? SET ?", [
        table,
        inputData
      ]);
      await con.query("COMMIT");
      status = true;
      msg = "uploaded resume"
      console.log(msg);
    }
    } catch (error) {
      console.log(error);
      msg = "error in db";
      status = false;
      throw error;
    } finally {
      if(con){
         await con.release();
         await con.destroy();
      }return {
        status : status,
        msg : msg
      }
    }
}

module.exports = {
    createNewUser
}