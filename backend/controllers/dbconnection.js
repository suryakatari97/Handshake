var mysql = require('promise-mysql');

var dbConfig = {
    connectionLimit: 500,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'handshake',
    port: 3306,
    debug: false,
    multipleStatements: true
}

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
}