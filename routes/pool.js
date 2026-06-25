const mysql=require('mysql2')
var pool=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'tushar1234',
    database:'HungerBuddy',
    multipleStatements:true,
})

module.exports = pool