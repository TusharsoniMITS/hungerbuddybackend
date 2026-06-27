// const mysql=require('mysql2')
// var pool=mysql.createConnection({
//     host:'localhost',
//     port:3306,
//     user:'root',
//     password:'tushar1234',
//     database:'HungerBuddy',
//     multipleStatements:true,
// })

// module.exports = pool

require('dotenv').config();
const mysql = require('mysql2');
const fs = require("fs");

var pool = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    ssl: {
        ca: fs.readFileSync(process.env.MYSQLSSL),
    },
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true,
});

module.exports = pool;