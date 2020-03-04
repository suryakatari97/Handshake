var mysql = require("promise-mysql");

var dbConfig = {
  connectionLimit: 500,
  host: "database-1.c5dglq60vjo4.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "suryakatari",
  database: "handshake-lab1",
  port: 3306,
  debug: false,
  multipleStatements: true
};

// var getConnection = async () => {
//   var pool = await mysql.createPool(dbConfig);
//   return new Promise(async (resolve, reject) => {
//     var pool = await mysql.createPool(dbConfig);
//     pool
//       .getConnection()
//       .then(function(conn) {
//         if (conn) {
//           console.log("connected!!@@");
//           resolve(conn);
//         }
//       })
//       .catch(function(err) {
//         reject(err);
//         console.log("in error...");
//         console.log(err);
//       });
//   });
// };

// var connectToDB = async function() {
//   var pool = await mysql.createPool(dbConfig);
//   pool
//     .getConnection()
//     .then(function(conn) {
//       if (conn) {
//         console.log("connected!!@@");
//         return conn;
//       }
//     })
//     .catch(function(err) {
//       console.log("in error...");
//       console.log(err);
//     });
// };
// module.exports.getConnection = getConnection;

module.exports = async () => {
  try {
    let pool;
    let con;
    if (pool) con = pool.getConnection();
    else {
      pool = await mysql.createPool(dbConfig);
      con = pool.getConnection();
    }
    return con;
  } catch (ex) {
    throw ex;
  }
};
