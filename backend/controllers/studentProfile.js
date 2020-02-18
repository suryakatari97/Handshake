const dbConnection = require('./dbConnectionPool');

var studentdetails = async(studentId,student) => {
    let conn;
    let msg;
    let status = false;
    let table = 'student_details';
    try {
        conn = await dbConnection();
        if(conn) {
            var user = await profileExists(studentId, table, conn)
        }
    }
}