const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const cors = require("cors");
const path = require("path");

var dbConnection = require('./controllers/dbconnection')

const userRouter = require('./routes/user_routes');
const studentRouter = require('./routes/student_routes');
const companyRouter = require('./routes/company_routes');
const eventRouter = require('./routes/eventPosts');
const jobRouter = require('./routes/JobPost');
const resumeRouter = require('./routes/resume_routes');

app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

testDBConection = async () => {
    let con = await dbConnection();
    if (con) {
        console.log("Connected to Database");
    } else {
        console.log("Not Connected");
    }
}
testDBConection();

app.set('view engine', 'ejs');
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/student', studentRouter);
app.use('/company', companyRouter);
app.use('/events', eventRouter);
app.use('/jobs', jobRouter);
app.use("/resume", resumeRouter);


// add database to req object.
// app.use((req, res, next) => { req.db = mysqlconnection; next() });


app.listen(port, () => console.log(`Handshake running on port ${port}`));