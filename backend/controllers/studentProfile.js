const dbConnection = require('./dbconnection');

var studentdetails = async (studentId, student) => {
    let conn;
    let msg;
    let status = false;
    let table = 'student_details';
    try {
        conn = await dbConnection();
        if (conn) {
            var user = await profileExists(studentId, table, conn);
            await conn.query("START TRANSACTION");
            if (!user) {
                await conn.query('INSERT INTO ?? SET student_id = ?', [table, studentId]);
            }
            await conn.query('UPDATE ?? SET ? where student_id = ?', [table, student, studentId]);
            await conn.query("COMMIT");
            status = true;
            msg = "student details updated";
            console.log(msg);
        }
    }
    catch (e) {
        console.log(e);
        msg = "Error in connecting to db";
        status = false;
    }
    finally {
        if (conn) {
            await conn.release();
            await conn.destroy();
        }
        return {
            status: status,
            message: msg
        }
    }
}

var studentExperience = async (studentExp) => {
    let conn;
    let msg;
    let status = false;
    let table = 'student_experience';

    try {
        conn = await dbConnection();
        if (conn) {
            var user = await expprofileexists(table, studentExp, conn);
            console.log(user);
            await conn.query("START TRANSACTION");
            if (!user) {
                console.log("experience record does not exist ");
                await conn.query('INSERT INTO ?? SET ?', [table, studentExp]);
            } else {
                console.log("experience record exists ");
                await conn.query('UPDATE ?? SET  title=?, location=?,end_date=? where student_id =? AND company_name=? AND start_date = ?',
                    [table, studentExp.title, studentExp.location, studentExp.end_date,
                        studentExp.student_id, studentExp.company_name, studentExp.start_date]);
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
    }
    finally {
        if (conn) {
            await conn.release();
            await conn.destroy();
        }
        return {
            status: status,
            message: msg
        }
    }
}

let profileExists = async (id, table, conn) => {

    console.log(`Id is ${id} searching in table: ${table}`);
    if (conn) {
        result = await conn.query('Select * from ?? where student_id = ?', [table, id]);
        console.log(result);
        if (result.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

let expprofileexists = async (table, studentExp, conn) => {
    if (conn) {
        let result = await conn.query('select * from ?? where student_id = ? AND company_name =? AND start_date =?',
            [table, studentExp.student_id, studentExp.company_name, studentExp.start_date]);
        console.log(result.length);
        if (result.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = { studentdetails, studentExperience }