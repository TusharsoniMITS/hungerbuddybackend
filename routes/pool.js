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

var pool = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    ssl: {
        minVersion: "TLSv1.2",
    },
    multipleStatements: true,
});

module.exports = pool;