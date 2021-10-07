const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: "node-complete",
    password: "gogo989"
});
module.exports = pool.promise();