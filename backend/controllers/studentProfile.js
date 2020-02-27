const dbConnection = require("./dbconnection");

var getstudentdetails = async studentId => {
  let conn;
  let msg;
  let status = false;
  let table = "student_details";
  try {
    conn = await dbConnection();
    if (conn) {
      var user = await profileExists(studentId, table, conn);
      await conn.query("START TRANSACTION");
      if (user) {
      var result = await conn.query("select * from ?? where student_id = ?", [
          table,
          studentId
        ]);
      }
      await conn.query("COMMIT");
      status = true;
      msg = "student details fetched";
      console.log(msg);
      console.log(result);
      
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
      message: msg
    };
  }
};

var studentdetails = async (studentId, student) => {
  let conn;
  let msg;
  let status = false;
  let table = "student_details";
  try {
    conn = await dbConnection();
    if (conn) {
      var user = await profileExists(studentId, table, conn);
      await conn.query("START TRANSACTION");
      if (!user) {
        await conn.query("INSERT INTO ?? SET student_id = ?", [
          table,
          studentId
        ]);
      }
      await conn.query("UPDATE ?? SET ? where student_id = ?", [
        table,
        student,
        studentId
      ]);
      await conn.query("COMMIT");
      status = true;
      msg = "student details updated";
      console.log(msg);
    }
  } catch (e) {
    console.log(e);
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

var getstudentExperience = async studentId => {
  let conn;
  let msg;
  let status = false;
  let table = "student_experience";
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var result = await conn.query("select * from ?? where student_id = ?", [
        table,
        studentId
      ]);
      await conn.query("COMMIT");
      status = true;
      msg = "student exp_details fetched";
      console.log(msg);
      console.log(result);
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
      message: msg
    };
  }
};

var studentExperience = async studentExp => {
  let conn;
  let msg;
  let status = false;
  let table = "student_experience";

  try {
    conn = await dbConnection();
    if (conn) {
      var user = await expprofileexists(table, studentExp, conn);
      console.log(user);
      await conn.query("START TRANSACTION");
      if (!user) {
        console.log("experience record does not exist ");
        await conn.query("INSERT INTO ?? SET ?", [table, studentExp]);
      } else {
        console.log("experience record exists ");
        await conn.query(
          "UPDATE ?? SET  title=?, location=?,end_date=? where student_id =? AND company_name=? AND start_date = ?",
          [
            table,
            studentExp.title,
            studentExp.location,
            studentExp.end_date,
            studentExp.student_id,
            studentExp.company_name,
            studentExp.start_date
          ]
        );
      }
      await conn.query("COMMIT");
      status = true;
      msg = "student experience updated";
      console.log(msg);
    }
  } catch (e) {
    console.log(e);
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

var getstudentEducation = async studentId => {
  let conn;
  let msg;
  let status = false;
  let table = "student_education";
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var result = await conn.query("select * from ?? where student_id=?", [
        table,
        studentId
      ]);
      await conn.query("COMMIT");
      status = true;
      msg = "student edu_details fetched";
      console.log(msg);
      console.log(result);
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
      message: msg
    };
  }
};

var studentEducation = async studentEdu => {
  let conn;
  let msg;
  let status = false;
  let table = "student_education";
  try {
    conn = await dbConnection();
    if (conn) {
      var user = await eduprofileexists(table, studentEdu, conn);
      console.log(user);
      await conn.query("START TRANSACTION");
      if (!user) {
        console.log("Education Record does not exists ");
        await conn.query("INSERT INTO ?? SET ?", [table, studentEdu]);
      } else {
        console.log("Education Record exists ");
        await conn.query(
          "UPDATE ?? SET college_name=?, location=?, year_passing=?, cgpa=? where student_id = ? AND degree = ? AND major =?",
          [
            table,
            studentEdu.college_name,
            studentEdu.location,
            studentEdu.year_passing,
            studentEdu.cgpa,
            studentEdu.student_id,
            studentEdu.degree,
            studentEdu.major
          ]
        );
      }
      await conn.query("COMMIT");
      status = true;
      msg = "student education details updated";
      console.log(msg);
    }
  } catch (e) {
    console.log(e);
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
    result = await conn.query("Select * from ?? where student_id = ?", [
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

let expprofileexists = async (table, studentExp, conn) => {
  if (conn) {
    let result = await conn.query(
      "select * from ?? where student_id = ? AND company_name =? AND start_date =?",
      [
        table,
        studentExp.student_id,
        studentExp.company_name,
        studentExp.start_date
      ]
    );
    console.log(result.length);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

let eduprofileexists = async (table, studentEdu, conn) => {
  if (conn) {
    let result = await conn.query(
      "Select * from ?? where student_id = ? AND degree = ? AND major = ?",
      [table, studentEdu.student_id, studentEdu.degree, studentEdu.major]
    );
    console.log("Here");
    console.log(result.length);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};
module.exports = {
  studentdetails,
  studentExperience,
  studentEducation,
  getstudentdetails,
  getstudentExperience,
  getstudentEducation
};
