const dbConnection = require("./dbconnection");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

var signUpStudent = async student => {
  let conn;
  let msg = "";
  let status = false;
  try {
    console.log("student signup db");
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var userExists = await existingUser(student.email, "student");
      if (!userExists) {
        console.log("user does not exist...creating user");
        var newUser = await conn.query("INSERT INTO student_register SET ?", [
          student
        ]);
        await conn.query("COMMIT");
        msg = "SignUp Successful!";
        status = true;
      } else {
        console.log("in else signup");
        status = false;
        msg = "student already exists";
      }
      console.log(msg);
    }
  } catch (e) {
    console.log(e);
    msg = "DATABASE ERROR";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      msg: msg
    };
  }
};

var signUpCompany = async company => {
  let conn;
  let message = "";
  let status = false;
  try {
    console.log("In signup Company dbAccess..");
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var userExists = await existingUser(company.email, "company");
      if (!userExists) {
        console.log("in if...");
        var newUser = await conn.query("INSERT INTO company_register SET ?", [
          company
        ]);
        await conn.query("COMMIT");
        message = "Signup is successful!!";
        status = true;
      } else {
        console.log("in else..");
        status = false;
        message = "Company already exists! Please give another email id";
      }
      console.log(message);
    }
  } catch (e) {
    console.log(e);
    message = "Issue at database or server.Please restart the systems!";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      message: message
    };
  }
};

let existingUser = async (email, user) => {
  let conn = await dbConnection();
  console.log(" email==> " + email);
  let table = "";
  if (user == "student") {
    table = "student_register";
  } else {
    table = "company_register";
  }
  let result = await conn.query("Select * from ?? where email=?", [
    table,
    email
  ]);
  console.log(result.length);
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

var signIn = async userData => {
  let conn = await dbConnection();
  let table;
  let { email, password, userType } = userData;

  if (userType == "student") {
    table = "student_register";
  } else {
    table = "company_register";
  }
  var message = "Invalid Credentials";
  var status = false;
  var token;
  var payload;
  try {
    console.log("In signin dbAccess..");
    await conn.query("START TRANSACTION");
    let result = await conn.query("Select * from ?? where email=?", [
      table,
      email
    ]);
    await conn.query("COMMIT");
    if (result.length > 0) {
      let dbPassword = result[0]["password"];
      console.log("user password.." + password);
      console.log("dbPassword.." + dbPassword);
      if (password == dbPassword) {
        message = "Logged in successfully";
        console.log("DB RESULT STUDENT ID",result[0].student_id);
        
        let userID = result[0]["student_id"];
        let userProPic = result[0]["profile_pic"];
        let fname =
          userType == "student"
            ? result[0]["first_name"]
            : result[0]["company_name"];
        let lname =
          userType == "student"
            ? result[0]["last_name"]
            : result[0]["company_name"];

        payload = {
          id: userID,
          img: userProPic,
          first_name: fname,
          last_name: lname,
          userType: userType
        };
        console.log(payload);
        //JWT token
        token = jwt.sign(payload, keys.secret, { expiresIn: 3600 });
        status = true;
      } else {
        message = "Incorrect Password!!";
      }
    } else {
      message = "Invalid Email";
    }
    console.log(message);
  } catch (e) {
    console.log(e);
    message = "Issue at database or server.Please restart the systems!";
    throw e;
  } finally {
    if (conn) {
      conn.release();
      conn.destroy();
    }
    return {
      status: status,
      message: message,
      token: token
    };
  }
};

module.exports = {
  signUpStudent,
  signUpCompany,
  signIn
};
