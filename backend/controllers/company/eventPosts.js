const dbConnection = require("../dbconnection");

var addEventPost = async eventDetails => {
  let connection;
  // let insertId = -1;
  let message = "";
  let status = false;
  try {
    console.log("In add event mysql");
    connection = await dbConnection();
    if (connection) {
      await connection.query("START TRANSACTION");
      console.log("New event-post");
      console.log(eventDetails);
      var newPost = await connection.query("INSERT INTO event_post SET ?", [
        eventDetails
      ]);
      await connection.query("COMMIT");
      message = "Event posted successfully!";
      status = true;
      console.log(message);
    }
  } catch (e) {
    console.log(e);
    message = "Error! Please restart the system";
    status = false;
  } finally {
    if (connection) {
      await connection.release();
      await connection.destroy();
    }
    return {
      status: status,
      message: message
    };
  }
};

var getEventDetails = async user_id => {
  let connection;
  // let insertId = -1;
  let message = "";
  let status = false;
  try {
    console.log("In get event mysql");
    console.log(user_id);
    connection = await dbConnection();
    if (connection) {
      await connection.query("START TRANSACTION");
      console.log("Get event-posts");
      var events = await connection.query(
        "SELECT * FROM event_post where company_id = " + user_id
      );
      await connection.query("COMMIT");
      console.log(events);
      message = "Event retrieved successfully!";
      status = true;
      console.log(message);
    }
  } catch (e) {
    console.log(e);
    message = "Error! Please restart the system";
    status = false;
  } finally {
    if (connection) {
      await connection.release();
      await connection.destroy();
    }
    return {
      status: status,
      message: message,
      events: events
    };
  }
};

var getRegisteredStudentDetails = async event_id => {
  let conn;
  let message = "";
  let status = false;
  try {
    console.log("In get event mysql");
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      console.log("DB: Get students for a event");

      var studentsForEvent = await conn.query(`SELECT student_register.student_id, student_register.first_name, 
                student_register.last_name 
                FROM student_register INNER JOIN events_registered
                ON student_register.student_id = events_registered.student_id 
                where events_registered.event_id =${event_id}`);

      await conn.query("COMMIT");
      console.log(studentsForEvent);
      message = "Student retrieved successfully!";
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
      studentsForEvent: studentsForEvent
    };
  }
};

module.exports = {
  addEventPost,
  getEventDetails,
  getRegisteredStudentDetails
};
