const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT || 3001;

var dbConnection = require('./controllers/dbconnection')

const userRouter = require('./routes/user_routes');
const studentRouter = require('./routes/student_routes');

testDBConection = async () => {
    let con = await dbConnection();
    if (con) {
        console.log("Connected to Database");
    }
}
testDBConection();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/student', studentRouter);


// add database to req object.
// app.use((req, res, next) => { req.db = mysqlconnection; next() });


app.listen(port, () => console.log(`Handshake running on port ${port}`));