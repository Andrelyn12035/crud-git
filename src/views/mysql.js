const mysql = require('mysql');
const {bd} = require('./keys');
const {promisify} = require('util');
const conection = mysql.createPool(bd);

conection.getConnection((err, connection)=> {
    if (err) {
        console.error("ya valio m");
    }
    if (connection) {
        connection.release();
        console.log("No valio");
        return;
    }
});

conection.query = promisify(conection.query);
module.exports = conection;
