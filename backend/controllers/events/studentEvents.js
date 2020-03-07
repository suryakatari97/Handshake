const dbConnection = require("../dbconnection");

var getStudentEvents = async user_id => {
  let conn;
  let msg = "";
  let status = false;
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var studentevents = await conn.query(
        'select e.event_id,e.date_of_event,e.time,e.event_name,e.location,e.event_description,e.eligibility,e.timestamp,c.company_name from event_post AS e, events_registered AS r, company_register AS c WHERE c.company_id=e.company_id AND e.event_id = r.event_id  AND r.student_id=?  AND Registration="Registered"',
        [user_id]
      );
      await conn.query("COMMIT");
      //console.log(studentevents);
      msg = "student events retrieved";
      status = true;
      console.log(msg);
    }
  } catch (error) {
    console.log(error);
    msg = "ERROR IN STUDENTEVENTS";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      msg: msg,
      studentevents: studentevents
    };
  }
};

var eventRegister = async eventregister => {
  console.log("IN EVENT REGISTER");
  let conn;
  let msg = "";
  let status = false;
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var event = await conn.query("INSERT INTO events_registered SET ?", [
        eventregister
      ]);
      await conn.query("COMMIT");
      msg = "Event Registered successfully!";
      status = true;
      console.log(msg);
    }
  } catch (e) {
    console.log(e);
    msg = "Error In DB";
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
var getEvents = async user_id => {
  let conn;
  let msg;
  let status = false;
  let querys = `select e.event_id,e.date_of_event,e.time,e.event_name,e.location,e.event_description,e.eligibility,e.timestamp, c.company_name
 from event_post AS e, events_registered AS r, company_register AS c
WHERE  r.student_id = 16 AND e.event_id NOT IN (select p.event_id from events_registered as p where p.student_id = 16) AND c.company_id = e.company_id
GROUP BY e.event_id`;
  try {
    conn = await dbConnection();
    if (conn) {
      await conn.query("START TRANSACTION");
      var events = await conn.query(querys, [user_id,user_id]);
      await conn.query("COMMIT");
      console.log(events);
      msg = "All events Retrived";
      console.log(msg);
      status = true;
    }
  } catch (error) {
    console.log(error);
    msg = "Error in database";
    status = false;
  } finally {
    if (conn) {
      await conn.release();
      await conn.destroy();
    }
    return {
      status: status,
      msg: msg,
      events: events
    };
  }

  // conn = await dbConnection();
  // await conn.query("START TRANSACTION");
  // //await conn.query("SELECT * FROM ??",[table],(err, rowsOfTable) => {
  // await conn.query(
  //   "select e.event_id,e.date_of_event,e.time,e.event_name,e.location,e.event_description,e.eligibility,e.timestamp, c.company_name from event_post AS e, events_registered AS r, company_register AS c WHERE  r.student_id = ? AND e.event_id NOT IN (select p.event_id from events_registered as p where p.student_id = ?) AND c.company_id = e.company_id GROUP BY e.event_id",
  //   [user_id,user_id],
  //   (err, rowsOfTable) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).json({ responseMessage: "Database not responding" });
  //     } else {
  //       console.log(rowsOfTable);
  //       res.status(200).json({ events: rowsOfTable });
  //     }
  //   }
  // );
};

module.exports = { getStudentEvents, eventRegister, getEvents };
